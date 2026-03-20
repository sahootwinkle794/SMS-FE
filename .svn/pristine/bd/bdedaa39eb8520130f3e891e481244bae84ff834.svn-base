// ─── Types ────────────────────────────────────────────────────────────────────

export type VehicleType   = "4-wheeler" | "2-wheeler";
export type VehicleStatus = "active" | "inactive";

export interface RegisteredVehicle {
  vehicleId: string;
  residentName: string;
  flatNumber: string;
  blockName: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleImageUrl?: string;
  status: VehicleStatus;
  registeredDate: string;
}

export interface VehicleFormValues {
  vehicleId?: string;        // present when editing
  residentName: string;
  flatNumber: string;
  blockName: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: VehicleType | "";
  vehicleModel: string;
  vehicleImageUrl?: string;
  status: VehicleStatus;
}

// ─── Static data ──────────────────────────────────────────────────────────────

export const STATIC_VEHICLES: RegisteredVehicle[] = [
  { vehicleId:"v1",  residentName:"Rohan Mehta",   flatNumber:"A-101", blockName:"A-Block", phone:"9876543210", vehicleNumber:"OD05AB1234", vehicleType:"4-wheeler", vehicleModel:"Maruti Swift",      status:"active",   registeredDate:"2026-01-10" },
  { vehicleId:"v2",  residentName:"Priya Nair",    flatNumber:"A-204", blockName:"A-Block", phone:"9123456789", vehicleNumber:"KA03CD5678", vehicleType:"4-wheeler", vehicleModel:"Honda City",        status:"active",   registeredDate:"2026-02-01" },
  { vehicleId:"v3",  residentName:"Suresh Patel",  flatNumber:"Q-305", blockName:"Q-Block", phone:"9000011122", vehicleNumber:"MH12GH9012", vehicleType:"2-wheeler", vehicleModel:"Honda Activa",      status:"active",   registeredDate:"2026-02-20" },
  { vehicleId:"v4",  residentName:"Anita Sharma",  flatNumber:"A-402", blockName:"A-Block", phone:"9988776655", vehicleNumber:"DL8CAF1234", vehicleType:"4-wheeler", vehicleModel:"Hyundai Creta",     status:"active",   registeredDate:"2026-01-20" },
  { vehicleId:"v5",  residentName:"Karan Singh",   flatNumber:"X-501", blockName:"X-Block", phone:"9871234560", vehicleNumber:"DL8CAB3421", vehicleType:"4-wheeler", vehicleModel:"Toyota Fortuner",   status:"active",   registeredDate:"2026-02-15" },
  { vehicleId:"v6",  residentName:"Meena Iyer",    flatNumber:"A-203", blockName:"A-Block", phone:"9445566778", vehicleNumber:"TN09PQ2233", vehicleType:"2-wheeler", vehicleModel:"TVS Jupiter",       status:"active",   registeredDate:"2026-03-05" },
  { vehicleId:"v7",  residentName:"Deepak Verma",  flatNumber:"B-108", blockName:"B-Block", phone:"9312233445", vehicleNumber:"RJ14GH7890", vehicleType:"4-wheeler", vehicleModel:"Tata Nexon",        status:"inactive", registeredDate:"2026-03-10" },
  { vehicleId:"v8",  residentName:"Sunita Rao",    flatNumber:"Q-410", blockName:"Q-Block", phone:"9654321098", vehicleNumber:"OD01XY5678", vehicleType:"4-wheeler", vehicleModel:"Mahindra XUV500",   status:"active",   registeredDate:"2026-01-05" },
  { vehicleId:"v9",  residentName:"Amit Joshi",    flatNumber:"A-302", blockName:"A-Block", phone:"9776655443", vehicleNumber:"UP32AB4321", vehicleType:"2-wheeler", vehicleModel:"Royal Enfield",     status:"active",   registeredDate:"2026-02-20" },
  { vehicleId:"v10", residentName:"Fatima Khan",   flatNumber:"X-601", blockName:"X-Block", phone:"9900887766", vehicleNumber:"MH43CD8765", vehicleType:"4-wheeler", vehicleModel:"Kia Seltos",        status:"active",   registeredDate:"2026-03-12" },
  { vehicleId:"v11", residentName:"Ravi Shankar",  flatNumber:"A-304", blockName:"A-Block", phone:"9833221100", vehicleNumber:"TN09PQ5544", vehicleType:"2-wheeler", vehicleModel:"Bajaj Pulsar",      status:"active",   registeredDate:"2026-03-01" },
  { vehicleId:"v12", residentName:"Neha Gupta",    flatNumber:"B-505", blockName:"B-Block", phone:"9567890123", vehicleNumber:"UP80KL7788", vehicleType:"4-wheeler", vehicleModel:"Volkswagen Polo",   status:"inactive", registeredDate:"2026-03-13" },
  { vehicleId:"v13", residentName:"Vijay Kumar",   flatNumber:"B-202", blockName:"B-Block", phone:"9711223344", vehicleNumber:"HR26AB9900", vehicleType:"4-wheeler", vehicleModel:"Ford EcoSport",     status:"active",   registeredDate:"2026-02-10" },
  { vehicleId:"v14", residentName:"Arjun Reddy",   flatNumber:"B-404", blockName:"B-Block", phone:"9933445566", vehicleNumber:"AP29EF5566", vehicleType:"4-wheeler", vehicleModel:"MG Hector",         status:"active",   registeredDate:"2026-01-25" },
  { vehicleId:"v15", residentName:"Chandan Roy",   flatNumber:"Q-101", blockName:"Q-Block", phone:"9488990011", vehicleNumber:"WB06OP5566", vehicleType:"4-wheeler", vehicleModel:"Tata Tiago",        status:"active",   registeredDate:"2026-02-05" },
];