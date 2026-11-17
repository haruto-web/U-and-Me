export type ContentKind =
  | "memory"
  | "letter"
  | "garden_message"
  | "compliment"
  | "surprise"
  | "special";

type SiteContentRow = {
  id: string;
  kind: ContentKind;
  title: string;
  body: string;
  recipient_id: string | null;
  prompt: string | null;
  event_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          is_member: boolean;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          is_member?: boolean;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          is_member?: boolean;
          is_admin?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: SiteContentRow;
        Insert: {
          id?: string;
          kind: ContentKind;
          title: string;
          body: string;
          recipient_id?: string | null;
          prompt?: string | null;
          event_date?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          kind?: ContentKind;
          title?: string;
          body?: string;
          recipient_id?: string | null;
          prompt?: string | null;
          event_date?: string | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_active_member: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_current_user_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
