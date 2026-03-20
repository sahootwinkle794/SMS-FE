export interface SubCategory {
    subCategoryCode: string;
    categoryCode: string;
    categoryName: string;
    subCategoryName: string;
    description?: string;
    status?: string;
}

export type SubCategoryFormState = {
    categoryCode: string;
    subCategoryName: string;
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