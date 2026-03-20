// ─── Types ────────────────────────────────────────────────────────────────────

export type GuestEntryStatus = "inside" | "exited";

export interface GuestVehicleLog {
  logId: string;
  vehicleNumber: string;
  vehicleType: "4-wheeler" | "2-wheeler" | "other";
  driverName: string;
  hostResidentName: string;
  hostFlatNumber: string;
  hostBlock: string;
  purpose: string;
  entryTime: string;    // ISO string
  exitTime?: string;    // ISO string — undefined if still inside
  status: GuestEntryStatus;
  gateNumber: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const d = (date: string) => new Date(date).toISOString();

export const STATIC_GUEST_LOGS: GuestVehicleLog[] = [
  { logId:"g1",  vehicleNumber:"MH04AB1234", vehicleType:"4-wheeler", driverName:"Ramesh Yadav",    hostResidentName:"Rohan Mehta",  hostFlatNumber:"A-101", hostBlock:"A-Block", purpose:"Family visit",       entryTime:d("2026-03-19T09:10:00"), exitTime:d("2026-03-19T11:30:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g2",  vehicleNumber:"KA05CD4321", vehicleType:"4-wheeler", driverName:"Swati Reddy",     hostResidentName:"Priya Nair",   hostFlatNumber:"A-204", hostBlock:"A-Block", purpose:"Delivery",           entryTime:d("2026-03-19T10:05:00"), exitTime:d("2026-03-19T10:25:00"), status:"exited",  gateNumber:"Gate 2" },
  { logId:"g3",  vehicleNumber:"DL3CX5566",  vehicleType:"2-wheeler", driverName:"Mohit Sharma",    hostResidentName:"Karan Singh",  hostFlatNumber:"X-501", hostBlock:"X-Block", purpose:"Friend visit",       entryTime:d("2026-03-19T11:00:00"),                                    status:"inside",  gateNumber:"Gate 1" },
  { logId:"g4",  vehicleNumber:"TN22GH7788", vehicleType:"4-wheeler", driverName:"Zomato Delivery", hostResidentName:"Anita Sharma", hostFlatNumber:"A-402", hostBlock:"A-Block", purpose:"Food delivery",      entryTime:d("2026-03-19T12:15:00"), exitTime:d("2026-03-19T12:22:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g5",  vehicleNumber:"UP32KL9900", vehicleType:"4-wheeler", driverName:"Vikram Singh",    hostResidentName:"Meena Iyer",   hostFlatNumber:"A-203", hostBlock:"A-Block", purpose:"AC repair service",  entryTime:d("2026-03-19T13:00:00"),                                    status:"inside",  gateNumber:"Gate 2" },
  { logId:"g6",  vehicleNumber:"OD02MN3344", vehicleType:"2-wheeler", driverName:"Pradeep Das",     hostResidentName:"Sunita Rao",   hostFlatNumber:"Q-410", hostBlock:"Q-Block", purpose:"Courier",            entryTime:d("2026-03-19T14:10:00"), exitTime:d("2026-03-19T14:18:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g7",  vehicleNumber:"GJ01PQ1122", vehicleType:"4-wheeler", driverName:"Manish Patel",    hostResidentName:"Amit Joshi",   hostFlatNumber:"A-302", hostBlock:"A-Block", purpose:"Family visit",       entryTime:d("2026-03-18T17:00:00"), exitTime:d("2026-03-18T20:30:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g8",  vehicleNumber:"RJ14AB5678", vehicleType:"4-wheeler", driverName:"Deepa Mishra",    hostResidentName:"Fatima Khan",  hostFlatNumber:"X-601", hostBlock:"X-Block", purpose:"Birthday party",     entryTime:d("2026-03-18T18:00:00"), exitTime:d("2026-03-18T22:45:00"), status:"exited",  gateNumber:"Gate 2" },
  { logId:"g9",  vehicleNumber:"WB04CD9876", vehicleType:"2-wheeler", driverName:"Sonu Kumar",      hostResidentName:"Chandan Roy",  hostFlatNumber:"Q-101", hostBlock:"Q-Block", purpose:"Grocery delivery",   entryTime:d("2026-03-19T08:30:00"), exitTime:d("2026-03-19T08:40:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g10", vehicleNumber:"AP29UV3344", vehicleType:"4-wheeler", driverName:"Rajeev Nair",     hostResidentName:"Arjun Reddy",  hostFlatNumber:"B-404", hostBlock:"B-Block", purpose:"Plumber visit",      entryTime:d("2026-03-19T10:30:00"),                                    status:"inside",  gateNumber:"Gate 2" },
  { logId:"g11", vehicleNumber:"HR26EF1234", vehicleType:"4-wheeler", driverName:"Sunil Tiwari",    hostResidentName:"Vijay Kumar",  hostFlatNumber:"B-202", hostBlock:"B-Block", purpose:"Doctor visit",       entryTime:d("2026-03-17T11:00:00"), exitTime:d("2026-03-17T12:30:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g12", vehicleNumber:"CG04GH5566", vehicleType:"2-wheeler", driverName:"Amazon Courier",  hostResidentName:"Rekha Singh",  hostFlatNumber:"B-102", hostBlock:"B-Block", purpose:"Package delivery",   entryTime:d("2026-03-19T15:00:00"), exitTime:d("2026-03-19T15:10:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g13", vehicleNumber:"MP09IJ7788", vehicleType:"4-wheeler", driverName:"Ashok Gupta",     hostResidentName:"Sanjay Dubey", hostFlatNumber:"B-201", hostBlock:"B-Block", purpose:"Office colleague",   entryTime:d("2026-03-19T16:00:00"),                                    status:"inside",  gateNumber:"Gate 2" },
  { logId:"g14", vehicleNumber:"KL07RS9900", vehicleType:"other",     driverName:"Society Van",     hostResidentName:"—",            hostFlatNumber:"—",     hostBlock:"—",       purpose:"Society maintenance",entryTime:d("2026-03-19T07:00:00"), exitTime:d("2026-03-19T17:00:00"), status:"exited",  gateNumber:"Gate 1" },
  { logId:"g15", vehicleNumber:"TN09WX2233", vehicleType:"4-wheeler", driverName:"Kavita Iyer",     hostResidentName:"Meena Iyer",   hostFlatNumber:"A-203", hostBlock:"A-Block", purpose:"Sister visit",       entryTime:d("2026-03-19T17:30:00"),                                    status:"inside",  gateNumber:"Gate 1" },
];