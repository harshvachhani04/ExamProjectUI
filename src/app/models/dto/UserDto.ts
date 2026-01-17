import { BaseAuditableEntity } from "../interfaces/BaseAuditableEntity";

export interface UserDto extends BaseAuditableEntity {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  role: number;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  tenantId: number;
}

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: number;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export interface UserUpdateDto {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: number;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}