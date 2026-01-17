export interface PagedRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export interface PagedResponse<T> {
  records: T[];
  totalRecords: number;
}