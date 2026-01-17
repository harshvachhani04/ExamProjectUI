export interface UserImportResult {
  totalRecords: number;
  successCount: number;
  failureCount: number;
  errors?: UserImportError[];
}

export interface UserImportError {
  rowNumber: number;
  message: string;
}