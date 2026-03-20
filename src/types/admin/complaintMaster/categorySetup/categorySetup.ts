export interface Category {
  categoryCode: string;
  categoryName: string;
  description: string;
  status: string ;
}
export type CategoryFormState = {
  categoryName: string;
  description?: string;
  status?: string;
};

export interface ApiError {
  message: string;
  response?: {
    data?: {
      status?: number;
      message?: string;
      data?: unknown[];
    };
  };
}
