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

  // problemDescription?: string;
  // solution?: string;
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
  custom_fields?: CustomField[];
}

export interface Address {
  kind?: string; // e.g., 'work', 'home'
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
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
  //name?: string;
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

// export interface LeadApiResponse {
//   result: {
//     lead: Lead[];
//   };
//   error: string | null;
//   id: string;
//   callCount: string;
//   queryLimit: string;
// }

export interface Lead {
  id: string;
  accountID: string | null;
  ownerID: string;
  companyName: string;
  title: string | null;
  firstName: string;
  lastName: string;
  street: string | null;
  city: string | null;
  country: string;
  state: string | null;
  zipcode: string | null;
  emailAddress: string;
  website: string;
  phoneNumber: string;
  officePhoneNumber: string | null;
  phoneNumberExtension: string | null;
  mobilePhoneNumber: string | null;
  faxNumber: string | null;
  description: string;
  campaignID: string;
  trackingID: string;
  industry: string | null;
  active: string;
  isQualified: string;
  isContact: string;
  isCustomer: string;
  status: string;
  updateTimestamp: string;
  createTimestamp: string;
  leadScoreWeighted: string;
  leadScore: string;
  isUnsubscribed: string;
  leadStatus: string;
  persona: string;

  // Dynamic custom fields - all appear to be strings or empty strings
  load_cells_607ef32084b39: string;
  truck_solutions_607ef397d711a: string;
  crane_scale_solutions_607ef3fd8f327: string;
  scale_indicators_607ef4f45ddc5: string;
  instrumentation_607ef53da2a71: string;
  active_status_60afba3684c0d: string;
  customer_type_60afba3687db8: string;
  rep_60afba368a1b2: string;
  zb_status_60afba368c8f8: string;
  how_did_you_hear_about_us__60e749d7d719d: string;
  is_weigh_data_management_important_for_your_farm__61142d07bb98e: string;
  what_size_farm_do_you_operate__acres___61142d8b058fd: string;
  please_select_what_size_trucks_will_you_want_to_we_611432074b9ee: string;
  what_weighing_applications_are_important_to_you____6114327a2bb57: string;
  do_you_have_scales_on_your_grain_cart__6114329e52251: string;
  will_there_be_someone_to_operate_the_scale_at_all__611432ed60a82: string;
  how_frequently_do_you_intend_to_use_the_farm_scale_61267e6d179dc: string;
  product_enquiry_6127aa1d3654b: string;
  what_do_you_want_to_weigh__click_all_that_apply__6127faea8e4c8: string;
  how_many_axles_do_you_want_to_weigh_at_the_same_a__6127fb7490d20: string;
  do_you_require_axle_weight_accumulation_options__6127fbec79518: string;
  what_ground_conditions_will_the_wheel_load_scale_b_6127fc5e61f9c: string;
  what_is_the_estimate_frequency_of_use__6127fcde9f3e9: string;
  will_wheel_levelling_track_be_desired_for_improved_6127fedd8330b: string;
  what_weight_display_would_you_prefer___check_all_t_6127ff36c9218: string;
  is_data_capture_and_data_logging_important__6127ff57ef140: string;
  in_which_province_is_your_farm_located__621e6ec6e14b5: string;
  how_many_acres_do_you_farm__including_leased_land__621e701c546f8: string;
  what_crops_do_you_farm__621e7b8b48b19: string;
  what_weigh_scales__if_any__do_you_presently_have_o_621e7dcb955ec: string;
  what_is_the_length_of_the_scale__621e8033621c8: string;
  for_how_many_years_approximately_has_the_axle_scal_621e81325e8fd: string;
  on_what_foundation_is_the_axle_scale_installed__621e8aea34117: string;
  for_what_is_the_truck_axle_scale_being_used__621e8e276e2bb: string;
  what_was_the_approx_cost_of_the_scale__621e8f6207706: string;
  what_is_the_brand_of_the_axle_scale_621e8f9a9da97: string;
  why_did_you_choose_that_brand__621e91c3dcf35: string;
  would_you_consider_acquiring_a_truck_axle_scale_in_621e9222a89d2: string;
  if_you_answered_no_to_consider_getting_a_truck_axl_621e9449a1a05: string;
  on_what_foundation_would_the_axle_scale_be_install_621e9a3a8a270: string;
  what_price_range_would_put_it_beyond_the_reach_of__621e9aab3bad8: string;
  if_you_have_a_full_length_weighbridge_scale__is_yo_621e9b66b01e7: string;
  what_is_the_weighbridge_being_used_for__621e9bf5c98dd: string;
  if_you_do_not_have_a_full_length_weighbridge_scale_621e9c3962174: string;
  if_yes__what_is_the_need_driving_this__621e9c992522c: string;
  if_yes__how_many_years_in_the_future_do_you_antici_621e9d1c16bf2: string;
  product_enquiry__1__6287d110291d6: string;
  how_did_you_hear_about_us___new_2022__628e6d9d763a0: string;
  is_data_capture_and_data_logging_important___1__628e72a42660d: string;
  will_there_be_someone_to_adjust_the_wheel_scale_po_628e7a71ca487: string;
  application_enquiry_628e7d4f62b9b: string;
  select_a_case_study_628e7ff4df6f1: string;
  type_of_product_628e858cea14c: string;
  please_contact_me_by__628e86006c519: string;
  type_of_service_628e874937393: string;
  form_request_628ff44f572a2: string;
  dropdown_test_62950b19b6015: string;
  product_enquiry__truck_scale__629fa7533cc9e: string;
  product_enquiry__ultraslim___1__629fa99b01b98: string;
  product_enquiry__extended___1__629fad6d21ee8: string;
  product_enquiry__truck_scale___1__629fc62947ee5: string;
  product_enquiry__weigh_modules___1__629fc838ea8bb: string;
  product_enquiry__lifting___1__629fcaf18c0fc: string;
  product_enquiry__lifting___1__629fccdc4c8e6: string;
  product_enquiry__farm_scale___1__629fcf21b117d: string;
  product_enquiry__interconnect___1__629fd17604a34: string;
  product_enquiry__traffic___1__62a0b183d9fe0: string;
  sector_62b23d2183751: string;
  application_1_62b23df3c4ab0: string;
  application_1__1__62b23dfb01b15: string;
  application_2__1__62b23e0b1802e: string;
  form_request__1__62f6ab20ab181: string;
  position_applying_for_634d9ca6895a6: string;
  resume_634d9cb5e72ac: string;
  cover_letter_634d9cc4b1fdb: string;
  myers_briggs_test_results_634d9cd9b0807: string;
  career_inquiry_message_634d9cfc0960a: string;
  referring_url_63653339d2a33: string;
  tido_chat_636d18ea40170: string;
  quote_priority_638f50598b9ce: string;
  shsp_lead_source_6453fe4e6942f: string;
  valid_email_648089390b6b9: string;
  opt_in_6759b4a6be0e7: string;
  rma_problem_description_68a7316a04c8b: string;
  rma_problem_description__1__68ae256a0b0c1: string;
  model_number__1__68ae25a87b3e8: string;
  model_number__1__68ae25e6eb239: string;
  model_number__1__68b08d5866aab: string;
  rma_type_of_service__1__68c09ab274cdb: string;
  rma_pin_diameter__1__68c09fbed834a: string;
  rma_serial_number__1__68c0a0cb34d47: string;
  rma_type_of_product__1__68c19e6d5010d: string;
}

export interface SharpSpringResult {
  opportunityList: Opportunity[];
  dataFromLeadsFromLead: Lead;
  isSuccess: boolean;
  errorMessage: string;
}
export interface Opportunity {
  id: string;
  ownerID: string;
  dealStageID: string;
  accountID: string;
  campaignID: string;
  campaignAttributionOverride: string | null;
  opportunityName: string;
  probability: string;
  amount: string;
  isClosed: string;
  isWon: string;
  closeDate: string;
  createTimestamp: string;
  updateTimestamp: string;
  originatingLeadID: string;
  isActive: string;
  primaryLeadID: string;

  // Custom fields
  opportunity_type_60c9fe6c0023a: string | null;
  product_enquiry_633487faea1c8: string | null;
  contact_by_633489cc3366e: string | null;
  type_of_service_633489e2066cb: string | null;
  message_633489f949d24: string | null;
  rfq_data_dump_6334bf377f7f6: string | null;
  quote_source_634de14fe2552: string | null;
  opportunity_6398afa43a373: string | null;
  type_of_service_2_6399f5c17374b: string | null;
  rma_6399f5cc9d114: string | null;
  send_follow_up_after_solution_provided_6399f5da8e8e7: string | null;
  quote_priority_6399f6d54048a: string | null;
  no_automated_follow_ups_6399f74b3670d: string | null;
  it_is_a_repeated_costumer__65c3f04a3f982: string | null;
  reasons_for_loss__outbound_sales___6859ca4e19edb: string | null;
  it_is_a_repeated_costumer___1__68dc2e285d5d0: string | null;
}
