export interface User {
  budget_fitness: number;
  id: string;
  email: string;
  name: string;
  position: string;
  role: 'employee' | 'admin' | 'manager';
  department: string;
  avatar?: string;
  training_budget?: number; // Current available training budget
  original_training_budget?: number; // Original/Maximum training budget
  budget_dentalglasses?: number; // Current available glasses/dental budget
  budget_medical?: number; // Current available medical budget
  budget_wedding?: number; // Current available wedding budget
  hasPasswordSet?: boolean; // Whether the user has set up a password
  isPasswordVerified?: boolean; // Whether the password has been verified in the current session
}

export interface Employee {
  Team: string | null;
  Name: string | null;
  'email_user': string | null;
  'Email.Manager'?: string | null;
  'Position'?: string | null;
  Pin?: string; // Password stored in the Pin column
  Role?: number;
  Budget_Training?: number;
  Original_Budget_Training?: number;
  budget_dentalglasses?: number;
  budget_medical?: number;
  budget_wedding?: number;
  budget_fitness?: number;
  manager_id?: number; // ID reference to the employee's manager
}

export type StatusType =
  | 'pending_manager'
  | 'pending_accounting'
  | 'completed'
  | 'rejected_manager'
  | 'rejected_accounting';

export type WelfareType = 
  | 'wedding'
  | 'training'
  | 'childbirth'
  | 'funeral' 
  | 'glasses'
  | 'dental'
  | 'fitness'
  | 'medical';

export interface WelfareRequest {
  id: number;
  userId: string;
  userName: string;
  userDepartment: string;
  type: WelfareType;
  status: StatusType;
  amount: number;
  date: string;
  details: string;
  attachments?: string[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  title?: string;
  approverId?: string;
  managerId?: string; // ID of the employee's manager
  // ฟิลด์ใหม่สำหรับ training และอื่น ๆ
  start_date?: string;
  end_date?: string;
  total_days?: number;
  birth_type?: string;
  training_topics?: string;
  total_amount?: number;
  tax7_percent?: number;
  withholding_tax3_percent?: number;
  excess_amount?: number;
  company_payment?: number;
  employee_payment?: number;
  course_name?: string;
  organizer?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
