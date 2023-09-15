export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          complement: string | null
          created_at: string
          id: number
          neighborhood: string | null
          number: string | null
          postal_code: string | null
          street: string | null
          updated_at: string | null
        }
        Insert: {
          complement?: string | null
          created_at?: string
          id?: number
          neighborhood?: string | null
          number?: string | null
          postal_code?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Update: {
          complement?: string | null
          created_at?: string
          id?: number
          neighborhood?: string | null
          number?: string | null
          postal_code?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: number
          image_path: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      places: {
        Row: {
          address_id: number
          category_id: number | null
          city_id: number
          created_at: string
          description: string
          id: number
          image_path: string
          name: string
          updated_at: string
        }
        Insert: {
          address_id: number
          category_id?: number | null
          city_id: number
          created_at?: string
          description: string
          id?: number
          image_path: string
          name: string
          updated_at?: string
        }
        Update: {
          address_id?: number
          category_id?: number | null
          city_id?: number
          created_at?: string
          description?: string
          id?: number
          image_path?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "places_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "places_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "places_city_id_fkey"
            columns: ["city_id"]
            referencedRelation: "cities"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
