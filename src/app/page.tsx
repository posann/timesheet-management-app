"use client";

import { TabsUI } from "@/components/tab";
import { EmployeeCheckResponse, EmployeeResponseData } from "@/types";
import { CheckEmployeeActive } from "@/utils/network/check-employee";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const getData = async (): Promise<EmployeeCheckResponse> => {
  try {
    const data = await CheckEmployeeActive();
    return data;
  } catch (error) {
    console.error("Error fetching active employees:", error);
    throw new Error("Failed to fetch active employees");
  }
};

export default function Home() {
  const [employees, setEmployees] = useState<EmployeeResponseData>({
    id: 0,
    name: "Tidak Ada Data",
    rate: 0,
    overtime: 0,
    earnings: 0,
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: EmployeeCheckResponse = await getData();
        setEmployees(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box px={8} bg={"backgrounds"}>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          Loading...
        </Flex>
      ) : (
        <TabsUI employees={employees} />
      )}
    </Box>
  );
}
