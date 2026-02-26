import * as XLSX from "xlsx";
import { USER_ROLES } from "@/utils/constants";

export const excelToJsonData = (values: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const file = values.file;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const arrayBuffer = e.target.result;

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        let json = XLSX.utils.sheet_to_json(worksheet);

        json = json.map((row: any) => {
          const newRow: any = {};
          Object.keys(row).forEach((key) => {
            const newKey = key.trim().toLowerCase().replace(/\s+/g, "_");
            newRow[newKey] = row[key];
          });
          return newRow;
        });

        resolve(json);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};


export function maskPhone(phone?: string) {
  if (!phone) return "";

  const last4 = phone.slice(-4);
  return `******${last4}`;
}

export const getRoleShortName = (role?: number): string => {
  if (role == null) return "-";
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
      return "SA";

    case USER_ROLES.ADMIN:
      return "AD";

    case USER_ROLES.SOCIETY_ADMIN:
      return "SAD";

    case USER_ROLES.VISITOR:
      return "VIS";

    default:
      return "UNKNOWN";
  }
};
