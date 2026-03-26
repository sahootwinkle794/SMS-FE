'use client'
import { GuestVehicleTracking } from "@/components";
import {
  GuestVehicleLog,
  STATIC_GUEST_LOGS,
} from "@/components/GuestVehicleTracking/GuestVehicleTracking.types";
import { PEACH } from "@/utils/constants";
import { Box } from "@mantine/core";
import { useState } from "react";

const VisitorMgt = () => {
  const [guestLogs] = useState<GuestVehicleLog[]>(STATIC_GUEST_LOGS);

  return (
    <>
    <Box style={{ background: PEACH, minHeight: "100vh" }} p="lg">
      <GuestVehicleTracking logs={guestLogs} />
      </Box>
    </>
  );
};

export default VisitorMgt;
