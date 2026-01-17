export interface BaseAuditableEntity {
  createdDate?: Date;
  preparedBy?: string;
  lastModifiedDate?: Date;
  lastUpdatedBy?: string;
  isDeleted?: boolean;
}