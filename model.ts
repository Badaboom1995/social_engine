export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

interface Database {
  public: {
    Tables: {
      IsMember: {
        Row: {
          isMember: string | null
          telegram: string | null
          testGroup: boolean | null
        }
        Insert: {
          isMember?: string | null
          telegram?: string | null
          testGroup?: boolean | null
        }
        Update: {
          isMember?: string | null
          telegram?: string | null
          testGroup?: boolean | null
        }
        Relationships: []
      }
      Pairs: {
        Row: {
          Created: string | null
          created_at: string | null
          id: string
          impression_partner: string | null
          impression_user: string | null
          partner: string | null
          user: string | null
        }
        Insert: {
          Created?: string | null
          created_at?: string | null
          id?: string
          impression_partner?: string | null
          impression_user?: string | null
          partner?: string | null
          user?: string | null
        }
        Update: {
          Created?: string | null
          created_at?: string | null
          id?: string
          impression_partner?: string | null
          impression_user?: string | null
          partner?: string | null
          user?: string | null
        }
        Relationships: []
      }
      Requests: {
        Row: {
          created_at: string | null
          format: string | null
          id: number
          location: string | null
          profit_level: number | null
          telegram: string | null
        }
        Insert: {
          created_at?: string | null
          format?: string | null
          id?: number
          location?: string | null
          profit_level?: number | null
          telegram?: string | null
        }
        Update: {
          created_at?: string | null
          format?: string | null
          id?: number
          location?: string | null
          profit_level?: number | null
          telegram?: string | null
        }
        Relationships: []
      }
      Users: {
        Row: {
          bali: string | null
          chat_id: string | null
          description: string | null
          email: string | null
          groups: string | null
          hobbies: string | null
          id: string
          is_member: boolean | null
          is_ready: boolean | null
          is_updated: boolean | null
          name: string | null
          post: string | null
          profile_photo_url: string | null
          requests: string | null
          skills: string | null
          submitted_at: string | null
          superpower: string | null
          tags: string | null
          telegram: string | null
          token: string | null
        }
        Insert: {
          bali?: string | null
          chat_id?: string | null
          description?: string | null
          email?: string | null
          groups?: string | null
          hobbies?: string | null
          id?: string
          is_member?: boolean | null
          is_ready?: boolean | null
          is_updated?: boolean | null
          name?: string | null
          post?: string | null
          profile_photo_url?: string | null
          requests?: string | null
          skills?: string | null
          submitted_at?: string | null
          superpower?: string | null
          tags?: string | null
          telegram?: string | null
          token?: string | null
        }
        Update: {
          bali?: string | null
          chat_id?: string | null
          description?: string | null
          email?: string | null
          groups?: string | null
          hobbies?: string | null
          id?: string
          is_member?: boolean | null
          is_ready?: boolean | null
          is_updated?: boolean | null
          name?: string | null
          post?: string | null
          profile_photo_url?: string | null
          requests?: string | null
          skills?: string | null
          submitted_at?: string | null
          superpower?: string | null
          tags?: string | null
          telegram?: string | null
          token?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type UserType = Database['public']['Tables']['Users']['Row']
type PairType = Database['public']['Tables']['Pairs']['Row']
type RequestType = Database['public']['Tables']['Requests']['Row']

export type { UserType, PairType, RequestType }
