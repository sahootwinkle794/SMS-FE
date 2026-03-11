export type RequestStatus = "pending" | "scheduled" | "rejected";

export type ScheduleForm = {
    target: GuestUser | null;
    date: string | null;
    time: string;
    note: string;
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

export interface GuestUser {
    guest_Id: string;
    full_Name: string;
    mobile_No: string;
    email: string;
    city: string;
    projectDescription: string | null;
    source: string;
    status: number;
    metadata: Record<string, unknown>;
    createdAt: string
}

export interface GuestUserList {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: GuestUser[];
}

export interface GuestUserResponse {
    status: number;
    message: string;
    data: GuestUserList;
}

export interface DemoRequestFormState {
    fullName: string;
    mobileNo: string;
    email: string;
    city: string;
    projectDescription: string;
}