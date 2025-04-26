export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          priority: string
          due_date: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      user_tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          priority: string
          due_date: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
      }
    }
  }
}

export type Task = Database["public"]["Tables"]["tasks"]["Row"]
export type NewTask = Omit<
  Database["public"]["Tables"]["tasks"]["Insert"],
  "id" | "created_at" | "updated_at" | "user_id"
>
export type UpdateTask = Omit<
  Database["public"]["Tables"]["tasks"]["Update"],
  "id" | "created_at" | "updated_at" | "user_id"
>
