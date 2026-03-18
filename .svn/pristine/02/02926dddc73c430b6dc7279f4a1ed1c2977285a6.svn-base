"use client";

import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { getRequest, postRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { COMMON_MESSAGE } from "@/utils/constants";
import { SocietyAmenityMap } from "@/components";
import {
  AmenityCheckedMap,
  CatAmenityMapApiResponse,
  CategoryWithAmenities,
  SocietyOption,
} from "@/components/SocietyAmenityMap/SocietyAmenityMap.types";


interface SocietyAmenityMapPageProps {
  type: "site_admin" | "soc_admin";
  societyId?: string;
  societyName?: string;
}


export default function SocietyAmenityMapPage({
  type,
  societyId: defaultSocietyId,
  societyName: defaultSocietyName,
}: SocietyAmenityMapPageProps) {

  const [societies,       setSocieties]       = useState<SocietyOption[]>([]);
  const [activeSocietyId, setActiveSocietyId] = useState(defaultSocietyId ?? "");
  const [categories,      setCategories]      = useState<CategoryWithAmenities[]>([]);
  const [savedCheckedMap, setSavedCheckedMap] = useState<AmenityCheckedMap>({});
  const [isLoading,       setIsLoading]       = useState(false);
  const [isSaving,        setIsSaving]        = useState(false);

  const notifyError   = (msg: string) => notifications.show({ title: "Error",   message: msg, color: "red"   });
  const notifySuccess = (msg: string) => notifications.show({ title: "Success", message: msg, color: "green" });


  useEffect(() => {
    if (type === "site_admin") {
      fetchSocieties();
    } else if (defaultSocietyId) {
      fetchCategoryAmenities(defaultSocietyId);
    }
  }, []);

  const fetchSocieties = async () => {
    try {
      const res = await getRequest<{ data: { data: { societyId: string; societyName: string }[] } }>(
        API_PATH.GET_SOCITIES
      );
      const list = res?.data?.data ?? [];
      setSocieties(list.map((s) => ({ value: s.societyId, label: s.societyName })));
    } catch {
      notifyError(COMMON_MESSAGE.SOCIETY_FETCH_FAIL);
    }
  };

  const fetchCategoryAmenities = async (societyId: string) => {
    setIsLoading(true);
    setCategories([]);
    setSavedCheckedMap({});
    try {
      const res = (await getRequest(
        `${API_PATH.SOCIETY_AMENITY_MAPPING}?SocietyId=${societyId}`
      )) as CatAmenityMapApiResponse;

      const cats: CategoryWithAmenities[] = res?.data?.data ?? [];
      setCategories(cats);

      const initial: AmenityCheckedMap = {};
      cats.forEach((cat) =>
        cat.amenityDetails.forEach((a) => {
          initial[a.id] = a.isAmenityActive === 1;
        })
      );
      setSavedCheckedMap(initial);
    } catch {
      notifyError(COMMON_MESSAGE.SOCIETY_FETCH_FAIL);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocietyChange = (societyId: string) => {
    setActiveSocietyId(societyId);
    fetchCategoryAmenities(societyId);
  };


  const handleSave = async (societyId: string, checkedMap: AmenityCheckedMap) => {
    // if (!societyId) return;
    // setIsSaving(true);
    // try {
    //   const payload = Object.entries(checkedMap).map(([amenityId, checked]) => ({
    //     amenityId,
    //     isActive: checked ? 1 : 0,
    //     societyId,
    //   }));

    //   await postRequest(API_PATH.CATEGORY_AMENITY_MAPPING, { mappings: payload });

    //   setSavedCheckedMap({ ...checkedMap });
    //   notifySuccess("Amenity mappings saved successfully.");
    // } catch {
    //   notifyError("Failed to save mappings. Please try again.");
    // } finally {
    //   setIsSaving(false);
    // }
    console.log('saved')
  };

  return (
    <SocietyAmenityMap
      type={type}
      societies={societies}
      selectedSocietyId={activeSocietyId}
      selectedSocietyName={defaultSocietyName}
      categories={categories}
      savedCheckedMap={savedCheckedMap}
      onSave={handleSave}
      onSocietyChange={handleSocietyChange}
      isSaving={isSaving}
      isLoading={isLoading}
    />
  );
}