// ─── Enums / literals ────────────────────────────────────────────────────────

export type GuardStatus    = "active" | "inactive" | "on_leave";
export type ShiftType      = "morning" | "evening" | "night";
export type LeaveStatus    = "pending" | "approved" | "rejected";
export type DayOfWeek      = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

// ─── Core entities ────────────────────────────────────────────────────────────

export interface SecurityGuard {
  guardId: string;
  name: string;
  phone: string;
  emergencyContact: string;
  idProofType: "aadhaar" | "pan" | "passport" | "voter_id";
  idProofNumber: string;
  address: string;
  joiningDate: string;
  assignedGate: string;       // current gate assignment
  currentShift: ShiftType;
  status: GuardStatus;
  photoUrl?: string;
}

export interface Gate {
  gateId: string;
  gateName: string;
}

export interface GateAssignment {
  assignmentId: string;
  gateId: string;
  gateName: string;
  guardId: string;
  guardName: string;
  shiftType: ShiftType;
  /** YYYY-MM-DD */
  date: string;
}

export interface ShiftSchedule {
  scheduleId: string;
  guardId: string;
  guardName: string;
  gateId: string;
  gateName: string;
  shiftType: ShiftType;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
  days: DayOfWeek[];
}

export interface GuardLeaveRequest {
  leaveId: string;
  guardId: string;
  guardName: string;
  assignedGate: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  reviewedBy?: string;
  reviewNote?: string;
}

// ─── Form values ──────────────────────────────────────────────────────────────

export interface GuardFormValues {
  guardId?: string;
  name: string;
  phone: string;
  emergencyContact: string;
  idProofType: SecurityGuard["idProofType"] | "";
  idProofNumber: string;
  address: string;
  joiningDate: string;
  assignedGate: string;
  currentShift: ShiftType | "";
  status: GuardStatus;
}

export interface ShiftScheduleFormValues {
  scheduleId?: string;
  guardId: string;
  gateId: string;
  shiftType: ShiftType | "";
  startDate: string;
  endDate: string;
  days: DayOfWeek[];
}

// ─── Static data ──────────────────────────────────────────────────────────────

export const STATIC_GATES: Gate[] = [
  { gateId: "g1", gateName: "Main Gate"   },
  { gateId: "g2", gateName: "Gate 2"      },
  { gateId: "g3", gateName: "Gate 3"      },
  { gateId: "g4", gateName: "Back Gate"   },
];

export const STATIC_GUARDS: SecurityGuard[] = [
  {
    guardId: "sg1", name: "Ramesh Kumar",    phone: "9876501001", emergencyContact: "9876500001",
    idProofType: "aadhaar", idProofNumber: "1234-5678-9012", address: "Patia, Bhubaneswar",
    joiningDate: "2024-01-15", assignedGate: "Main Gate",   currentShift: "morning", status: "active",
  },
  {
    guardId: "sg2", name: "Sunil Pradhan",   phone: "9876501002", emergencyContact: "9876500002",
    idProofType: "voter_id", idProofNumber: "OD/123/456789", address: "Nayapalli, Bhubaneswar",
    joiningDate: "2024-02-01", assignedGate: "Gate 2",       currentShift: "evening", status: "active",
  },
  {
    guardId: "sg3", name: "Ajay Singh",      phone: "9876501003", emergencyContact: "9876500003",
    idProofType: "aadhaar", idProofNumber: "2345-6789-0123", address: "Khandagiri, Bhubaneswar",
    joiningDate: "2024-03-10", assignedGate: "Gate 3",       currentShift: "night",   status: "active",
  },
  {
    guardId: "sg4", name: "Mohan Das",       phone: "9876501004", emergencyContact: "9876500004",
    idProofType: "aadhaar", idProofNumber: "3456-7890-1234", address: "Mancheswar, Bhubaneswar",
    joiningDate: "2024-01-20", assignedGate: "Back Gate",    currentShift: "morning", status: "on_leave",
  },
  {
    guardId: "sg5", name: "Bikash Nayak",    phone: "9876501005", emergencyContact: "9876500005",
    idProofType: "pan", idProofNumber: "ABCPN1234F", address: "Saheed Nagar, Bhubaneswar",
    joiningDate: "2024-04-05", assignedGate: "Main Gate",   currentShift: "evening", status: "active",
  },
  {
    guardId: "sg6", name: "Santosh Behera",  phone: "9876501006", emergencyContact: "9876500006",
    idProofType: "aadhaar", idProofNumber: "4567-8901-2345", address: "Rasulgarh, Bhubaneswar",
    joiningDate: "2024-02-15", assignedGate: "Gate 2",       currentShift: "night",   status: "active",
  },
  {
    guardId: "sg7", name: "Deepak Mahto",    phone: "9876501007", emergencyContact: "9876500007",
    idProofType: "voter_id", idProofNumber: "OD/456/789012", address: "IRC Village, Bhubaneswar",
    joiningDate: "2024-05-01", assignedGate: "Gate 3",       currentShift: "morning", status: "inactive",
  },
  {
    guardId: "sg8", name: "Prakash Sahu",    phone: "9876501008", emergencyContact: "9876500008",
    idProofType: "aadhaar", idProofNumber: "5678-9012-3456", address: "Damana, Bhubaneswar",
    joiningDate: "2024-03-20", assignedGate: "Back Gate",    currentShift: "evening", status: "active",
  },
];

export const STATIC_SCHEDULES: ShiftSchedule[] = [
  { scheduleId:"sc1", guardId:"sg1", guardName:"Ramesh Kumar",   gateId:"g1", gateName:"Main Gate", shiftType:"morning", startDate:"2026-03-17", endDate:"2026-03-23", days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
  { scheduleId:"sc2", guardId:"sg2", guardName:"Sunil Pradhan",  gateId:"g2", gateName:"Gate 2",    shiftType:"evening", startDate:"2026-03-17", endDate:"2026-03-23", days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
  { scheduleId:"sc3", guardId:"sg3", guardName:"Ajay Singh",     gateId:"g3", gateName:"Gate 3",    shiftType:"night",   startDate:"2026-03-17", endDate:"2026-03-23", days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
  { scheduleId:"sc4", guardId:"sg5", guardName:"Bikash Nayak",   gateId:"g1", gateName:"Main Gate", shiftType:"evening", startDate:"2026-03-17", endDate:"2026-03-23", days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
  { scheduleId:"sc5", guardId:"sg6", guardName:"Santosh Behera", gateId:"g2", gateName:"Gate 2",    shiftType:"night",   startDate:"2026-03-17", endDate:"2026-03-23", days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
  { scheduleId:"sc6", guardId:"sg8", guardName:"Prakash Sahu",   gateId:"g4", gateName:"Back Gate", shiftType:"evening", startDate:"2026-03-17", endDate:"2026-03-23", days:["Mon","Tue","Wed","Thu","Fri"] },
];

export const STATIC_LEAVE_REQUESTS: GuardLeaveRequest[] = [
  { leaveId:"l1", guardId:"sg4", guardName:"Mohan Das",      assignedGate:"Back Gate", fromDate:"2026-03-18", toDate:"2026-03-22", reason:"Family medical emergency",           status:"approved", appliedOn:"2026-03-17", reviewedBy:"Admin", reviewNote:"Approved. Cover arranged."        },
  { leaveId:"l2", guardId:"sg2", guardName:"Sunil Pradhan",  assignedGate:"Gate 2",    fromDate:"2026-03-25", toDate:"2026-03-26", reason:"Personal work",                       status:"pending",  appliedOn:"2026-03-20" },
  { leaveId:"l3", guardId:"sg1", guardName:"Ramesh Kumar",   assignedGate:"Main Gate", fromDate:"2026-03-28", toDate:"2026-03-29", reason:"Marriage in family",                  status:"pending",  appliedOn:"2026-03-21" },
  { leaveId:"l4", guardId:"sg7", guardName:"Deepak Mahto",   assignedGate:"Gate 3",    fromDate:"2026-03-10", toDate:"2026-03-11", reason:"Unwell, fever",                       status:"rejected", appliedOn:"2026-03-09", reviewedBy:"Admin", reviewNote:"Short notice, cannot approve."    },
  { leaveId:"l5", guardId:"sg5", guardName:"Bikash Nayak",   assignedGate:"Main Gate", fromDate:"2026-04-01", toDate:"2026-04-03", reason:"Out of station, annual leave",        status:"pending",  appliedOn:"2026-03-22" },
  { leaveId:"l6", guardId:"sg3", guardName:"Ajay Singh",     assignedGate:"Gate 3",    fromDate:"2026-04-05", toDate:"2026-04-05", reason:"Medical appointment",                 status:"pending",  appliedOn:"2026-03-23" },
  { leaveId:"l7", guardId:"sg8", guardName:"Prakash Sahu",   assignedGate:"Back Gate", fromDate:"2026-03-15", toDate:"2026-03-16", reason:"Village visit",                       status:"approved", appliedOn:"2026-03-13", reviewedBy:"Admin", reviewNote:"Approved."                        },
  { leaveId:"l8", guardId:"sg6", guardName:"Santosh Behera", assignedGate:"Gate 2",    fromDate:"2026-04-10", toDate:"2026-04-12", reason:"Sister's wedding",                    status:"pending",  appliedOn:"2026-03-23" },
];