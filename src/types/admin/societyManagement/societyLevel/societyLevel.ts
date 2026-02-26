export interface RuleDefinition {
  maxMembers: number;
  flatCriteria?: {
    minAvgFlatSizeSqFt: number;
    allowedFlatTypes: string[];
  };
  societyScale?: {
    minTotalFlats: number;
    minBlocks: number;
    maxMembers: number;
  };
}
export interface FormState {
  levelCode: string;
  levelName: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  ruleDefinition: RuleDefinition;
}

export interface SocietyLevels {
  societyLevelId: string;
  levelCode: string;
  levelName: string;
  description: string;
  ruleDefinition: RuleDefinition;
  displayOrder: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
}

export interface SocietyLevelResponse {
  status: number;
  message: string;
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: SocietyLevels[];
    message: string;
  };
}