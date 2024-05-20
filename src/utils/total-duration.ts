import { ActivityResponseData } from "@/types";

export function TotalDuration(data: ActivityResponseData[]): number {
  let totalDurasi = 0;
  data.forEach((item) => {
    totalDurasi += Number(item.duration);
  });
  return totalDurasi;
}
