export interface AmenityTier {
  id: string;
  groupCode: string;
  genCode: string;
  genName: string;
  status: number;
}

export interface AmenityCategory {
  id: string;
  groupCode: string;
  genCode: string;
  genName: string;
  status: number;
}



export interface ApiResponse<T> {
  data: {
    data: T[];
    message: string;
  };
}

export interface TierCatApiResponse {
  data: {
    status: boolean;
    message: string;
    data: TierCategory[];
  };
}

export interface TierCategory {
  tierCode: string;
  tierName: string;
  categoryDetails: {
    id: string;
    categoryCode: string;
    categoryName: string | null;
    displayOrder: number;
    status: number;
  }[];
}

export interface Amenity {
  amenityId: string;
  amenityCode: string;
  amenityName: string;
  description: string;
  iconUrl: string;
  isChargeable: boolean;
  displayOrder: number;
  isActive: boolean;
  status: number;
}

export interface AmenityApiResponse {
  data: {
    page: number | null;
    limit: number | null;
    total: number;
    totalPages: number;
    data: Amenity[];
  };
}

export interface CatAmenityDetail {
  amenityId: string;
  amenityName: string;
  displayOrder: number;
  status: number;
}

export interface CatAmenityMapApiResponse {
  data: {
    data: {
      categoryCode: string;
      categoryName: string;
      amenityDetails: {
        id: string;
        amenityCode: string;
        amenityName: string;
        displayOrder: number;
        status: number;
      }[];
    }[];
  };
}