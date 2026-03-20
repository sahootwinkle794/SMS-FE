"use client";

import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { getRequest, postRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { ACCESS_TYPE, COMMON_MESSAGE } from "@/utils/constants";
import { ResidentManagement } from "@/app/shared/ResidentManagement";
import { ResidentFormValues, ResidentRequest } from "@/app/shared/ResidentManagement/ResidentManagement.types";

const ResidentManagementPage = () => {

  const [requests,   setRequests]   = useState<ResidentRequest[]>([]);
  const [isLoading,  setIsLoading]  = useState(false);

  const notifyError   = (msg: string) => notifications.show({ title: "Error",   message: msg, color: "red"   });
  const notifySuccess = (msg: string) => notifications.show({ title: "Success", message: msg, color: "green" });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      // TODO: replace with real API response mapping
      // const res = await getRequest(API_PATH.RESIDENT_REQUESTS);
      // setRequests(res?.data?.data ?? []);
    } catch {
      notifyError(COMMON_MESSAGE.SOCIETY_FETCH_FAIL);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      // await postRequest(API_PATH.RESIDENT_APPROVE, { id });
      setRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: "approved" } : r)
      );
      notifySuccess("Resident approved successfully.");
    } catch {
      notifyError("Failed to approve. Please try again.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      // await postRequest(API_PATH.RESIDENT_REJECT, { id });
      setRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: "rejected" } : r)
      );
      notifySuccess("Resident request rejected.");
    } catch {
      notifyError("Failed to reject. Please try again.");
    }
  };

  const handleHold = async (id: string) => {
    try {
      // await postRequest(API_PATH.RESIDENT_HOLD, { id });
      setRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: "on_hold" } : r)
      );
      notifySuccess("Request put on hold.");
    } catch {
      notifyError("Failed to update. Please try again.");
    }
  };

  const handleAddResident = async (values: ResidentFormValues) => {
    try {
      // await postRequest(API_PATH.RESIDENT_ADD, values);
      console.log("Admin adding resident:", values);
      notifySuccess("Resident added successfully.");
    } catch {
      notifyError("Failed to add resident. Please try again.");
    }
  };

  return (
    <ResidentManagement
      role={ACCESS_TYPE.SOCIETY_ADMIN as any}
    //   requests={requests}
      onApprove={handleApprove}
      onReject={handleReject}
      onHold={handleHold}
      onSubmitForm={handleAddResident}
    />
  );
};

export default ResidentManagementPage;