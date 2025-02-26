export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      contact: {
        Row: {
          id: string;
          link: string;
          name: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          link: string;
          name: string;
          user_id?: string;
        };
        Update: {
          id?: string;
          link?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contact_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "musician_profile";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "contact_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      experience: {
        Row: {
          date: string;
          description: string;
          id: string;
          place: string;
        };
        Insert: {
          date: string;
          description: string;
          id?: string;
          place: string;
        };
        Update: {
          date?: string;
          description?: string;
          id?: string;
          place?: string;
        };
        Relationships: [];
      };
      instrument: {
        Row: {
          id: string;
          name: string;
          type: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
        };
        Relationships: [];
      };
      musician: {
        Row: {
          id: string;
          instrument_id: string;
          picture: string;
          time_playing: number;
          user_id: string;
        };
        Insert: {
          id?: string;
          instrument_id: string;
          picture?: string;
          time_playing: number;
          user_id: string;
        };
        Update: {
          id?: string;
          instrument_id?: string;
          picture?: string;
          time_playing?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "musician_instrument_id_fkey";
            columns: ["instrument_id"];
            isOneToOne: false;
            referencedRelation: "instrument";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "musician_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "musician_profile";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "musician_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      musician_experience: {
        Row: {
          experience_id: string;
          id: string;
          musician_id: string;
        };
        Insert: {
          experience_id?: string;
          id?: string;
          musician_id?: string;
        };
        Update: {
          experience_id?: string;
          id?: string;
          musician_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "musician_experience_experience_id_fkey";
            columns: ["experience_id"];
            isOneToOne: false;
            referencedRelation: "experience";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "musician_experience_musician_id_fkey";
            columns: ["musician_id"];
            isOneToOne: false;
            referencedRelation: "musician";
            referencedColumns: ["id"];
          },
        ];
      };
      skill: {
        Row: {
          id: string;
          Weighting_from: number;
          Weighting_since: number;
        };
        Insert: {
          id?: string;
          Weighting_from: number;
          Weighting_since: number;
        };
        Update: {
          id?: string;
          Weighting_from?: number;
          Weighting_since?: number;
        };
        Relationships: [
          {
            foreignKeyName: "skill_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "musician";
            referencedColumns: ["id"];
          },
        ];
      };
      user: {
        Row: {
          date: number;
          id: string;
          last_name: string;
          name: string;
          nick_name: string | null;
          province: Database["public"]["Enums"]["provinces"];
        };
        Insert: {
          date: number;
          id?: string;
          last_name: string;
          name: string;
          nick_name?: string | null;
          province: Database["public"]["Enums"]["provinces"];
        };
        Update: {
          date?: number;
          id?: string;
          last_name?: string;
          name?: string;
          nick_name?: string | null;
          province?: Database["public"]["Enums"]["provinces"];
        };
        Relationships: [];
      };
    };
    Views: {
      musician_profile: {
        Row: {
          contacts: Json;
          date: number;
          musicians: Json;
          nick_name: string;
          province: Database["public"]["Enums"]["provinces"];
          user_id: string;
          user_last_name: string;
          user_name: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      provinces:
        | "Buenos Aires"
        | "Catamarca"
        | "Chaco"
        | "Chubut"
        | "Córdoba"
        | "Corrientes"
        | "Entre Ríos"
        | "Formosa"
        | "Jujuy"
        | "La Pampa"
        | "La Rioja"
        | "Mendoza"
        | "Misiones"
        | "Neuquén"
        | "Río Negro"
        | "Salta"
        | "San Juan"
        | "San Luis"
        | "Santa Fe"
        | "Santiago del Estero"
        | "Tierra del Fuego, Antártida e Islas del Atlántico Sur"
        | "Tucumán";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export type User = Tables<"user">;
export type Musician = Tables<"musician">;
export type Instrument = Tables<"instrument">;
export type Experience = Tables<"experience">;
export type Skill = Tables<"skill">;
export type Contact = Tables<"contact">;
export type MusicianExperience = Tables<"musician_experience">;
export type ProfileView = Tables<"musician_profile">;
