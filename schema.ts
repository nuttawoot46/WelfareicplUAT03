export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dbchildbirth: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbchildbirth_Email.user_fkey"
            columns: ["Email.user"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Email.user"]
          },
        ]
      }
      dbdentalglasses: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbdentalglasses_Email.user_fkey"
            columns: ["Email.user"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Email.user"]
          },
        ]
      }
      dbfitness: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbfitness_Email.user_fkey"
            columns: ["Email.user"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Email.user"]
          },
        ]
      }
      dbfuneral: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: []
      }
      dbmedical: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbmedical_Email.user_fkey"
            columns: ["Email.user"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Email.user"]
          },
        ]
      }
      dbtraining: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbtraining_Email.user_fkey"
            columns: ["Email.user"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Email.user"]
          },
        ]
      }
      dbwedding: {
        Row: {
          amount: number | null
          created_at: string
          Date: string | null
          "Email.user": string
          id: number
          Name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user": string
          id?: number
          Name: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          Date?: string | null
          "Email.user"?: string
          id?: number
          Name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbwedding_Email.user_fkey"
            columns: ["Email.user"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Email.user"]
          },
        ]
      }
      Employee: {
        Row: {
          auth_uid: string | null
          budget_childbirth: number | null
          budget_dentalglasses: number | null
          budget_fitness: number | null
          budget_funeral_child: number
          budget_funeral_employee: number
          budget_funeral_family: number
          budget_medical: number
          Budget_Training: number
          budget_wedding: number
          "Email.Manager": string
          "Email.user": string
          id: number
          Name: string
          Original_Budget_Training: number | null
          Pin: string | null
          Position: string | null
          Role: string | null
          Team: string
        }
        Insert: {
          auth_uid?: string | null
          budget_childbirth?: number | null
          budget_dentalglasses?: number | null
          budget_fitness?: number | null
          budget_funeral_child?: number
          budget_funeral_employee?: number
          budget_funeral_family?: number
          budget_medical?: number
          Budget_Training?: number
          budget_wedding?: number
          "Email.Manager": string
          "Email.user": string
          id?: number
          Name: string
          Original_Budget_Training?: number | null
          Pin?: string | null
          Position?: string | null
          Role?: string | null
          Team: string
        }
        Update: {
          auth_uid?: string | null
          budget_childbirth?: number | null
          budget_dentalglasses?: number | null
          budget_fitness?: number | null
          budget_funeral_child?: number
          budget_funeral_employee?: number
          budget_funeral_family?: number
          budget_medical?: number
          Budget_Training?: number
          budget_wedding?: number
          "Email.Manager"?: string
          "Email.user"?: string
          id?: number
          Name?: string
          Original_Budget_Training?: number | null
          Pin?: string | null
          Position?: string | null
          Role?: string | null
          Team?: string
        }
        Relationships: []
      }
      welfare_requests: {
        Row: {
          amount: number | null
          approver_at: string | null
          approver_id: string | null
          attachment_url: string | null
          created_at: string
          details: string | null
          employee_id: number | null
          employee_name: string | null
          id: number
          manager_notes: string | null
          request_type: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          amount?: number | null
          approver_at?: string | null
          approver_id?: string | null
          attachment_url?: string | null
          created_at?: string
          details?: string | null
          employee_id?: number | null
          employee_name?: string | null
          id?: number
          manager_notes?: string | null
          request_type?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          amount?: number | null
          approver_at?: string | null
          approver_id?: string | null
          attachment_url?: string | null
          created_at?: string
          details?: string | null
          employee_id?: number | null
          employee_name?: string | null
          id?: number
          manager_notes?: string | null
          request_type?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "welfare_request_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welfare_requests_employee_name_fkey"
            columns: ["employee_name"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["Name"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_budget: {
        Args: { col_name: string; amount_to_decrement: number; emp_id: number }
        Returns: undefined
      }
      hash_pin: {
        Args: { pin: string }
        Returns: string
      }
      hash_password: {
        Args: { password: string }
        Returns: string
      }
      reset_fitness_budget: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_employee_pin: {
        Args: { employee_name: string; new_pin: number }
        Returns: undefined
      }
      verify_employee_pin: {
        Args: { employee_name: string; pin_to_verify: number }
        Returns: boolean
      }
      update_employee_password: {
        Args: { employee_name: string; new_password: string }
        Returns: undefined
      }
      verify_employee_password: {
        Args: { employee_name: string; password_to_verify: string }
        Returns: boolean
      }
    }
    Enums: {
      request_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      request_status: ["Pending", "Approved", "Rejected"],
    },
  },
} as const
