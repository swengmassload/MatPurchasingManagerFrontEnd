export interface UsersCreateRequestDTO {
  email: string;
  password: string;
  lastName: string | null;
  firstName: string | null;
  theRole: string | null;
  userGroup: string | null;
}

export interface UsersResponseDTO {
  email: string;
  password: string;
  lastName: string | null;
  firstName: string | null;
  theRole: string | null;
  userGroup: string | null;
}

export interface RolesDTO {}

export interface UsersAndRoleDTO {
  email: string;
  firstName: string | null;
  lastName: string | null;
  theRole: string | null;
  userGroup: string | null;
  isUserActive: boolean;
  isBarcodeActive: boolean;
}
export interface UsersAndRole {
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  theRole?: string | undefined;
  userGroup?: string | undefined;
  isUserActive?: boolean;
  isBarcodeActive?: boolean;
}

// export interface UsersUpdateRequestDTO {
//   email: string;
//   lastName: string | null;
//   firstName: string | null;
//   theRole: string | null;
//   userGroup: string| null;
//   newValue: boolean;
//   newPassword:string | null;
//   actionTarget: "ChangeUserStatus" | "ChangeBarCodeStatus" | "NewBarCode"|"UserResetPassword"|"AdminResetPassword"|"ResetDetails";
// }

// export interface ResourceResponsibilityResponseDTO {
//   resourceName: string;
//   description: string;
//   email: string;
//   officialName: string;
//   designation: string;
//   guidId: string; // Using string for GUID in TypeScript
// }
