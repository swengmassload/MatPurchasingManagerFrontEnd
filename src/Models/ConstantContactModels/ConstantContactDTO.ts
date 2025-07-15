// Constant Contact API Response DTOs

export interface DetailContact {
  contact_id: string;
  email_address: EmailAddress;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  company_name?: string;
  create_source?: string;
  created_at?: string;
  updated_at?: string;
  list_memberships?: string[];
  phone_numbers?: PhoneNumber[];
  street_addresses?: Address[];
  custom_fields?: CustomField[];
  taggings?: Tagging[];
  birthday_month?: number;
  birthday_day?: number;
  anniversary?: string;
  fax_number?: string;
  notes?: string;
  source?: Source;
  opt_out_reason?: string;
  update_source?: string;
}

export interface Source {
  source_type: string;
  details?: string;
}

export interface EmailAddress {
  address: string;
  permission_to_send?: string;
  created_at?: string;
  updated_at?: string;
  opt_in_source?: string;
  opt_in_date?: string;
  confirm_status?: string;
}

export interface Contact {
  contact_id: string;
  email_address: EmailAddress;
  first_name?: string;
  last_name?: string;
  job_title?: string | null;
  company_name?: string | null;
  create_source?: string;
  created_at?: string;
  updated_at?: string;
  list_memberships?: string[];
  phone_numbers?: PhoneNumber[];
  street_addresses?: Address[];
}




export interface Address {
  kind?: string; // e.g., 'work', 'home'
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country_code?: string;
}
export interface PhoneNumber {
  phone_number: string;
  kind?: string; // e.g., 'work', 'home', etc.
}

export interface ConstantContactSearchResponse {
  contacts: Contact[];
  contact_count: number;
}

// Optional: More specific types for better type safety
export type PermissionToSend = "implicit" | "explicit" | "not_set";
export type ConfirmStatus = "off" | "on";
export type CreateSource = "Account" | "Import" | "API" | "Landing_Page" | "Other";

// Enhanced version with stricter typing
export interface EnhancedEmailAddress {
  address: string;
  permission_to_send: PermissionToSend;
  created_at: string;
  updated_at: string;
  opt_in_source: string;
  opt_in_date: string;
  confirm_status: ConfirmStatus;
}
export interface CustomField {
  custom_field_id: string;
  name?: string;
  value: string;
}

export interface Tagging {
  tag_id: string;
  tag_name: string;
}
export interface EnhancedContact {
  contact_id: string;
  email_address: EnhancedEmailAddress;
  first_name: string;
  last_name: string;
  job_title: string;
  create_source: CreateSource;
  created_at: string;
  updated_at: string;
}

export interface EnhancedConstantContactSearchResponse {
  contacts: EnhancedContact[];
}
