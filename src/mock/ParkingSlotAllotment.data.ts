import { ParkingBlock } from "@/components/ParkingSlotAllotment/ParkingSlotAllotment.types";

// ─── Helper to build a slot id ────────────────────────────────────────────────

const sid = (block: string, row: string, n: number) =>
  `${block}-${row}${String(n).padStart(2, "0")}`;

// ─── Static blocks ────────────────────────────────────────────────────────────

export const STATIC_PARKING_BLOCKS: ParkingBlock[] = [
  // ── A-Block ────────────────────────────────────────────────────────────────
  {
    blockId: "A",
    blockName: "A-Block",
    totalSlots: 30,
    slots: [
      // Row A — 6 slots
      { slotId: sid("A","A",1), slotLabel:"A-01", row:"Row A", status:"occupied",  resident:{ residentId:"r1",  name:"Rohan Mehta",    flatNumber:"A-101", phone:"9876543210", vehicleNumber:"OD05AB1234", vehicleType:"4-wheeler", allottedDate:"2026-01-10" }},
      { slotId: sid("A","A",2), slotLabel:"A-02", row:"Row A", status:"occupied",  resident:{ residentId:"r2",  name:"Priya Nair",     flatNumber:"A-204", phone:"9123456789", vehicleNumber:"KA03CD5678", vehicleType:"4-wheeler", allottedDate:"2026-02-01" }},
      { slotId: sid("A","A",3), slotLabel:"A-03", row:"Row A", status:"available" },
      { slotId: sid("A","A",4), slotLabel:"A-04", row:"Row A", status:"available" },
      { slotId: sid("A","A",5), slotLabel:"A-05", row:"Row A", status:"occupied",  resident:{ residentId:"r3",  name:"Suresh Patel",   flatNumber:"A-305", phone:"9000011122", vehicleNumber:"MH12GH9012", vehicleType:"2-wheeler", allottedDate:"2026-03-01" }},
      { slotId: sid("A","A",6), slotLabel:"A-06", row:"Row A", status:"available" },
      // Row B — 6 slots
      { slotId: sid("A","B",1), slotLabel:"B-01", row:"Row B", status:"occupied",  resident:{ residentId:"r4",  name:"Anita Sharma",   flatNumber:"A-402", phone:"9988776655", vehicleNumber:"DL8CAF1234", vehicleType:"4-wheeler", allottedDate:"2026-01-20" }},
      { slotId: sid("A","B",2), slotLabel:"B-02", row:"Row B", status:"available" },
      { slotId: sid("A","B",3), slotLabel:"B-03", row:"Row B", status:"available" },
      { slotId: sid("A","B",4), slotLabel:"B-04", row:"Row B", status:"blocked"   },
      { slotId: sid("A","B",5), slotLabel:"B-05", row:"Row B", status:"occupied",  resident:{ residentId:"r5",  name:"Karan Singh",    flatNumber:"A-501", phone:"9871234560", vehicleNumber:"RJ14GH7890", vehicleType:"4-wheeler", allottedDate:"2026-02-15" }},
      { slotId: sid("A","B",6), slotLabel:"B-06", row:"Row B", status:"available" },
      // Row C — 6 slots
      { slotId: sid("A","C",1), slotLabel:"C-01", row:"Row C", status:"available" },
      { slotId: sid("A","C",2), slotLabel:"C-02", row:"Row C", status:"occupied",  resident:{ residentId:"r6",  name:"Meena Iyer",     flatNumber:"A-203", phone:"9445566778", vehicleNumber:"TN09PQ2233", vehicleType:"2-wheeler", allottedDate:"2026-03-05" }},
      { slotId: sid("A","C",3), slotLabel:"C-03", row:"Row C", status:"available" },
      { slotId: sid("A","C",4), slotLabel:"C-04", row:"Row C", status:"occupied",  resident:{ residentId:"r7",  name:"Deepak Verma",   flatNumber:"A-108", phone:"9312233445", vehicleNumber:"GJ01KL4567", vehicleType:"4-wheeler", allottedDate:"2026-03-10" }},
      { slotId: sid("A","C",5), slotLabel:"C-05", row:"Row C", status:"available" },
      { slotId: sid("A","C",6), slotLabel:"C-06", row:"Row C", status:"available" },
      // Row D — 6 slots
      { slotId: sid("A","D",1), slotLabel:"D-01", row:"Row D", status:"occupied",  resident:{ residentId:"r8",  name:"Sunita Rao",     flatNumber:"A-410", phone:"9654321098", vehicleNumber:"OD01XY5678", vehicleType:"4-wheeler", allottedDate:"2026-01-05" }},
      { slotId: sid("A","D",2), slotLabel:"D-02", row:"Row D", status:"available" },
      { slotId: sid("A","D",3), slotLabel:"D-03", row:"Row D", status:"available" },
      { slotId: sid("A","D",4), slotLabel:"D-04", row:"Row D", status:"blocked"   },
      { slotId: sid("A","D",5), slotLabel:"D-05", row:"Row D", status:"available" },
      { slotId: sid("A","D",6), slotLabel:"D-06", row:"Row D", status:"occupied",  resident:{ residentId:"r9",  name:"Amit Joshi",     flatNumber:"A-302", phone:"9776655443", vehicleNumber:"UP32AB4321", vehicleType:"2-wheeler", allottedDate:"2026-02-20" }},
      // Row E — 6 slots
      { slotId: sid("A","E",1), slotLabel:"E-01", row:"Row E", status:"available" },
      { slotId: sid("A","E",2), slotLabel:"E-02", row:"Row E", status:"available" },
      { slotId: sid("A","E",3), slotLabel:"E-03", row:"Row E", status:"occupied",  resident:{ residentId:"r10", name:"Fatima Khan",    flatNumber:"A-601", phone:"9900887766", vehicleNumber:"MH43CD8765", vehicleType:"4-wheeler", allottedDate:"2026-03-12" }},
      { slotId: sid("A","E",4), slotLabel:"E-04", row:"Row E", status:"available" },
      { slotId: sid("A","E",5), slotLabel:"E-05", row:"Row E", status:"occupied",  resident:{ residentId:"r11", name:"Ravi Shankar",   flatNumber:"A-304", phone:"9833221100", vehicleNumber:"KA05MN6543", vehicleType:"2-wheeler", allottedDate:"2026-03-01" }},
      { slotId: sid("A","E",6), slotLabel:"E-06", row:"Row E", status:"available" },
    ],
  },

  // ── B-Block ────────────────────────────────────────────────────────────────
  {
    blockId: "B",
    blockName: "B-Block",
    totalSlots: 24,
    slots: [
      { slotId: sid("B","A",1), slotLabel:"A-01", row:"Row A", status:"occupied",  resident:{ residentId:"b1",  name:"Neha Gupta",     flatNumber:"B-101", phone:"9567890123", vehicleNumber:"DL3CX1122", vehicleType:"4-wheeler", allottedDate:"2026-01-18" }},
      { slotId: sid("B","A",2), slotLabel:"A-02", row:"Row A", status:"available" },
      { slotId: sid("B","A",3), slotLabel:"A-03", row:"Row A", status:"available" },
      { slotId: sid("B","A",4), slotLabel:"A-04", row:"Row A", status:"occupied",  resident:{ residentId:"b2",  name:"Vijay Kumar",    flatNumber:"B-202", phone:"9711223344", vehicleNumber:"HR26AB9900", vehicleType:"4-wheeler", allottedDate:"2026-02-10" }},
      { slotId: sid("B","A",5), slotLabel:"A-05", row:"Row A", status:"available" },
      { slotId: sid("B","A",6), slotLabel:"A-06", row:"Row A", status:"occupied",  resident:{ residentId:"b3",  name:"Lakshmi Devi",   flatNumber:"B-303", phone:"9822334455", vehicleNumber:"TN22CD3344", vehicleType:"2-wheeler", allottedDate:"2026-03-08" }},
      { slotId: sid("B","B",1), slotLabel:"B-01", row:"Row B", status:"available" },
      { slotId: sid("B","B",2), slotLabel:"B-02", row:"Row B", status:"blocked"   },
      { slotId: sid("B","B",3), slotLabel:"B-03", row:"Row B", status:"occupied",  resident:{ residentId:"b4",  name:"Arjun Reddy",    flatNumber:"B-404", phone:"9933445566", vehicleNumber:"AP29EF5566", vehicleType:"4-wheeler", allottedDate:"2026-01-25" }},
      { slotId: sid("B","B",4), slotLabel:"B-04", row:"Row B", status:"available" },
      { slotId: sid("B","B",5), slotLabel:"B-05", row:"Row B", status:"available" },
      { slotId: sid("B","B",6), slotLabel:"B-06", row:"Row B", status:"occupied",  resident:{ residentId:"b5",  name:"Pooja Mishra",   flatNumber:"B-505", phone:"9044556677", vehicleNumber:"CG04GH7788", vehicleType:"2-wheeler", allottedDate:"2026-02-28" }},
      { slotId: sid("B","C",1), slotLabel:"C-01", row:"Row C", status:"available" },
      { slotId: sid("B","C",2), slotLabel:"C-02", row:"Row C", status:"available" },
      { slotId: sid("B","C",3), slotLabel:"C-03", row:"Row C", status:"available" },
      { slotId: sid("B","C",4), slotLabel:"C-04", row:"Row C", status:"occupied",  resident:{ residentId:"b6",  name:"Sanjay Dubey",   flatNumber:"B-201", phone:"9155667788", vehicleNumber:"MP09IJ9900", vehicleType:"4-wheeler", allottedDate:"2026-03-03" }},
      { slotId: sid("B","C",5), slotLabel:"C-05", row:"Row C", status:"blocked"   },
      { slotId: sid("B","C",6), slotLabel:"C-06", row:"Row C", status:"available" },
      { slotId: sid("B","D",1), slotLabel:"D-01", row:"Row D", status:"occupied",  resident:{ residentId:"b7",  name:"Rekha Singh",    flatNumber:"B-102", phone:"9266778899", vehicleNumber:"RJ45KL1122", vehicleType:"4-wheeler", allottedDate:"2026-01-30" }},
      { slotId: sid("B","D",2), slotLabel:"D-02", row:"Row D", status:"available" },
      { slotId: sid("B","D",3), slotLabel:"D-03", row:"Row D", status:"occupied",  resident:{ residentId:"b8",  name:"Mohan Das",      flatNumber:"B-402", phone:"9377889900", vehicleNumber:"OD02MN3344", vehicleType:"2-wheeler", allottedDate:"2026-03-11" }},
      { slotId: sid("B","D",4), slotLabel:"D-04", row:"Row D", status:"available" },
      { slotId: sid("B","D",5), slotLabel:"D-05", row:"Row D", status:"available" },
      { slotId: sid("B","D",6), slotLabel:"D-06", row:"Row D", status:"available" },
    ],
  },

  // ── Q-Block ────────────────────────────────────────────────────────────────
  {
    blockId: "Q",
    blockName: "Q-Block",
    totalSlots: 18,
    slots: [
      { slotId: sid("Q","A",1), slotLabel:"A-01", row:"Row A", status:"occupied",  resident:{ residentId:"q1",  name:"Chandan Roy",    flatNumber:"Q-101", phone:"9488990011", vehicleNumber:"WB06OP5566", vehicleType:"4-wheeler", allottedDate:"2026-02-05" }},
      { slotId: sid("Q","A",2), slotLabel:"A-02", row:"Row A", status:"available" },
      { slotId: sid("Q","A",3), slotLabel:"A-03", row:"Row A", status:"available" },
      { slotId: sid("Q","A",4), slotLabel:"A-04", row:"Row A", status:"blocked"   },
      { slotId: sid("Q","A",5), slotLabel:"A-05", row:"Row A", status:"occupied",  resident:{ residentId:"q2",  name:"Divya Pillai",   flatNumber:"Q-205", phone:"9599001122", vehicleNumber:"KL07QR7788", vehicleType:"2-wheeler", allottedDate:"2026-02-18" }},
      { slotId: sid("Q","A",6), slotLabel:"A-06", row:"Row A", status:"available" },
      { slotId: sid("Q","B",1), slotLabel:"B-01", row:"Row B", status:"available" },
      { slotId: sid("Q","B",2), slotLabel:"B-02", row:"Row B", status:"occupied",  resident:{ residentId:"q3",  name:"Gaurav Tiwari",  flatNumber:"Q-301", phone:"9600112233", vehicleNumber:"UP80ST9900", vehicleType:"4-wheeler", allottedDate:"2026-03-07" }},
      { slotId: sid("Q","B",3), slotLabel:"B-03", row:"Row B", status:"available" },
      { slotId: sid("Q","B",4), slotLabel:"B-04", row:"Row B", status:"occupied",  resident:{ residentId:"q4",  name:"Hema Nair",      flatNumber:"Q-402", phone:"9711223300", vehicleNumber:"KA19UV1122", vehicleType:"4-wheeler", allottedDate:"2026-01-15" }},
      { slotId: sid("Q","B",5), slotLabel:"B-05", row:"Row B", status:"available" },
      { slotId: sid("Q","B",6), slotLabel:"B-06", row:"Row B", status:"available" },
      { slotId: sid("Q","C",1), slotLabel:"C-01", row:"Row C", status:"available" },
      { slotId: sid("Q","C",2), slotLabel:"C-02", row:"Row C", status:"available" },
      { slotId: sid("Q","C",3), slotLabel:"C-03", row:"Row C", status:"occupied",  resident:{ residentId:"q5",  name:"Irfan Sheikh",   flatNumber:"Q-103", phone:"9822334400", vehicleNumber:"MH15WX3344", vehicleType:"4-wheeler", allottedDate:"2026-02-22" }},
      { slotId: sid("Q","C",4), slotLabel:"C-04", row:"Row C", status:"available" },
      { slotId: sid("Q","C",5), slotLabel:"C-05", row:"Row C", status:"blocked"   },
      { slotId: sid("Q","C",6), slotLabel:"C-06", row:"Row C", status:"available" },
    ],
  },
];