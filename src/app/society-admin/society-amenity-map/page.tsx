"use client";

import SocietyAmenityMapPage from "@/app/shared/SocietyAmenityMapPage";
import { useSocietyStore } from "@/store/useSocietyStore";
import { ACCESS_TYPE } from "@/utils/constants";
import { useShallow } from "zustand/react/shallow";

const SocietyAmenityMap = () => {

  const { societyId, societyName } = useSocietyStore(
  useShallow((s) => ({ societyId: s.societyId, societyName: s.societyName }))
);

  return (
    <>
      <SocietyAmenityMapPage
        type={ACCESS_TYPE.SOCIETY_ADMIN as any}
        societyId={societyId || 'default-society-id'}
        societyName={societyName || 'Default Society Name'}
      />
    </>
  );
};

export default SocietyAmenityMap;
