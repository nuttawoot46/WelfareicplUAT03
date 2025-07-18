import React, { createContext, useContext, useState, useEffect } from 'react';
import { WelfareRequest, WelfareType, StatusType } from '@/types';
import { BenefitLimit, getBenefitLimits } from '@/services/welfareApi';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface WelfareContextType {
  welfareRequests: WelfareRequest[];
  getRequestsByUser: (userId: string) => WelfareRequest[];
  getRequestsByStatus: (status: StatusType) => WelfareRequest[];
  getRequestsByType: (type: WelfareType) => WelfareRequest[];
  submitRequest: (requestData: Omit<WelfareRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<WelfareRequest | null>;
  updateRequest: (id: number, data: Partial<WelfareRequest>) => Promise<void>;
  updateRequestStatus: (id: number, status: StatusType, comment?: string) => Promise<{ success: boolean; data?: any; error?: string; details?: any }>;
  isLoading: boolean;
  getWelfareLimit: (type: WelfareType) => { amount: number | null, condition?: string, monthly?: boolean };
  getRemainingBudget: (userId: string, type?: WelfareType) => number;
  trainingBudget: number | null;
}

const WelfareContext = createContext<WelfareContextType | undefined>(undefined);

export const WelfareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [welfareRequests, setWelfareRequests] = useState<WelfareRequest[]>([]);
  const [benefitLimits, setBenefitLimits] = useState<BenefitLimit[]>([]);
  const [trainingBudget, setTrainingBudget] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('welfare_requests')
          .select('*, Employee:employee_id ( Team )');
        if (error) {
          toast({ title: 'โหลดข้อมูลล้มเหลว', description: error.message, variant: 'destructive' });
        } else {
          setWelfareRequests(
            (data || []).map((row: any) => {
              let attachments: string[] = [];
              if (Array.isArray(row.attachment_url)) {
                attachments = row.attachment_url;
              } else if (typeof row.attachment_url === 'string') {
                try {
                  // Try parse JSON string
                  const parsed = JSON.parse(row.attachment_url);
                  attachments = Array.isArray(parsed) ? parsed : [parsed];
                } catch {
                  attachments = row.attachment_url ? [row.attachment_url] : [];
                }
              }
              return {
                id: row.id,
                userId: row.employee_id?.toString(),
                userName: row.employee_name || '',
                userDepartment: row.Employee?.Team || '',
                type: row.request_type,
                status: row.status?.toLowerCase() || 'pending',
                amount: row.amount,
                date: row.created_at,
                details: row.details,
                attachments,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                title: row.title,
                approverId: row.approver_id,
                notes: row.manager_notes || '',
                managerId: row.manager_id?.toString(),
              };
            })
          );
        }
      } catch (err) {
        console.error('Exception fetching data:', err);
        toast({ title: 'โหลดข้อมูลล้มเหลว', description: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchBenefitLimits = async () => {
      if (!user) return;
      try {
        const limits = await getBenefitLimits();
        setBenefitLimits(limits);
      } catch (error) {
        console.error("Failed to fetch benefit limits", error);
        toast({
          title: 'ไม่สามารถโหลดข้อมูลวงเงินสวัสดิการได้',
          variant: 'destructive',
        });
      }
    };

    const fetchTrainingBudget = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('Employee')
          .select('Original_Budget_Training')
          .eq('"email_user"', user.email)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setTrainingBudget(data.Original_Budget_Training);
          console.log('Fetched training budget:', data.Original_Budget_Training);
        }
      } catch (error) {
        console.error('Error fetching training budget:', error);
      }
    };

    fetchRequests();
    fetchBenefitLimits();
    fetchTrainingBudget();
  }, [user, toast]);

  const getRequestsByUser = (userId: string) => {
    return welfareRequests.filter(request => request.userId === userId);
  };

  const getRequestsByStatus = (status: StatusType) => {
    return welfareRequests.filter(request => request.status === status);
  };

  const getRequestsByType = (type: WelfareType) => {
    return welfareRequests.filter(request => request.type === type);
  };

  const getWelfareLimit = (type: WelfareType) => {
    const limits = {
      dental: { amount: 2000, condition: "หลังทำงานครบ 180 วัน" },
      glasses: { amount: 2000, condition: "หลังทำงานครบ 180 วัน" },
      childbirth: { 
        natural: 4000, 
        caesarean: 6000, 
        condition: "จำกัด 3 คนต่อครอบครัว" 
      },
      training: { amount: trainingBudget },
      wedding: { amount: 3000 },
      medical: { amount: 1000 },
      fitness: { amount: 300, monthly: true, yearlyTotal: 3600 },
      funeral: { amount: null }
    };
    return limits[type] || { amount: 10000 };
  };

  const getRemainingBudget = (userId: string, type?: WelfareType) => {
    if (!type || !user || user.id !== userId) return 0;

    const limitInfo = benefitLimits.find(limit => limit.type === type);
    return limitInfo ? limitInfo.remaining : 0;
  };

  const submitRequest = async (requestData: Omit<WelfareRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      let managerId: number | null = null;
      if (user?.id) {
        try {
          const userId = parseInt(user.id, 10);
          if (!isNaN(userId)) {
            const { data: employeeData, error: employeeError } = await supabase
              .from('Employee')
              .select('manager_id')
              .eq('id', userId)
              .single();
              
            if (!employeeError && employeeData) {
              managerId = employeeData.manager_id as number;
            }
          }
        } catch (error) {
          console.error('Error fetching manager ID:', error);
        }
      }
      
      // Always save attachments as JSON string in attachment_url
      let attachmentsToSave: string = '[]';
      if (Array.isArray(requestData.attachments)) {
        attachmentsToSave = JSON.stringify(requestData.attachments);
      } else if (typeof requestData.attachments === 'string') {
        attachmentsToSave = JSON.stringify([requestData.attachments]);
      }
      // สร้าง object โดยไม่รวม id
      const { id, ...requestDataWithoutId } = requestData;
      const requestDataObj = {
        employee_id: parseInt(requestData.userId, 10),
        employee_name: requestData.userName,
        request_type: requestData.type,
        status: 'pending_manager',
        amount: requestData.amount,
        created_at: new Date().toISOString(),
        details: requestData.details,
        attachment_url: attachmentsToSave,
        title: requestData.title,
        manager_id: managerId,
        start_date: requestData.start_date,
        end_date: requestData.end_date,
        total_days: requestData.total_days,
        birth_type: requestData.birth_type,
        training_topics: requestData.training_topics,
        total_amount: requestData.total_amount,
        tax7_percent: requestData.tax7_percent,
        withholding_tax3_percent: requestData.withholding_tax3_percent,
        excess_amount: requestData.excess_amount,
        company_payment: requestData.company_payment,
        employee_payment: requestData.employee_payment,
        course_name: requestData.course_name,
        organizer: requestData.organizer,
        department_user: requestData.department_user,
      };
      // ป้องกัน id ติดไปกับ insert object
      if ('id' in requestDataObj) delete requestDataObj.id;
      
      const { data, error } = await supabase
        .from('welfare_requests')
        .insert(requestDataObj)
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      
      const newRequestId = data[0].id;
      const newRequest: WelfareRequest = {
        ...requestData,
        id: newRequestId,
        status: 'pending_manager',
        createdAt: data[0].created_at,
        managerId: managerId?.toString() || null
      };
      
      setWelfareRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err: any) {
      toast({
        title: "ส่งคำร้องล้มเหลว",
        description: err.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequest = async (id: number, data: Partial<WelfareRequest>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('welfare_requests')
        .update(data)
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      setWelfareRequests(prev => 
        prev.map(req => req.id === id ? { ...req, ...data } : req)
      );
    } catch (err: any) {
      toast({
        title: "อัปเดตล้มเหลว",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (id: number, status: StatusType, comment?: string) => {
    setIsLoading(true);
    try {
      const updateObj: any = { status };

      if (user?.id) updateObj.approver_id = user.id;
      updateObj.approver_at = new Date().toISOString();
      if (comment) updateObj.manager_notes = comment;
      
      const { data, error } = await supabase
        .from('welfare_requests')
        .update(updateObj)
        .eq('id', id)
        .select();
      
      if (error) {
        throw new Error(error.message);
      }

      setWelfareRequests(prev => {
        return prev.map(req => 
          req.id === id ? { 
            ...req, 
            status, 
            notes: comment,
            manager_notes: comment,
            approverId: user?.id 
          } : req
        );
      });
      
      return { success: true, data };
    } catch (err: any) {
      toast({ title: 'อัพเดทสถานะล้มเหลว', description: err.message, variant: 'destructive' });
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value: WelfareContextType = {
    welfareRequests,
    getRequestsByUser,
    getRequestsByStatus,
    getRequestsByType,
    submitRequest,
    updateRequest,
    updateRequestStatus,
    isLoading,
    getWelfareLimit,
    getRemainingBudget,
    trainingBudget
  };

  return <WelfareContext.Provider value={value}>{children}</WelfareContext.Provider>;
};

export const useWelfare = (): WelfareContextType => {
  const context = useContext(WelfareContext);
  if (context === undefined) {
    throw new Error('useWelfare must be used within a WelfareProvider');
  }
  return context;
};
