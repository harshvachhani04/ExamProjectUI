export interface BaseAuditableEntity {
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
  isDeleted?: boolean;
}