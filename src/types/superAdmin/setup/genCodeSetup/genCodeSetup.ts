export interface genCodeApiResponse {
  data: {
    total: any;
    status(status: any): string;
    genName: string;
    genCode: string;
    groupCode: string;
    data: genCodeApiResAll[];
  };
}

export interface genCodeApiResAll {
  id: string;
  groupCode: string;
  genCode: string;
  genName: string;
  status: number | null;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface GenCodeGroup {
  value: string;
  label: string;
};

export interface ModalState {
  open: boolean;
  title: string;
  subText: string;
  actionText: string;
  onAction: () => void;
};