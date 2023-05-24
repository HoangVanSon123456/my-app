export interface Paging {
  countItem: number;
  totalPage: number;
  currentPage: number;
  limit: number;
}

export interface DataListResponse<T> {
  items: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  messages: string[];
  data: T;
}
