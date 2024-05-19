"use client";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CardUI } from "./card";
import { ActivityList } from "./tab-item/activity-list";
import { Pengaturan } from "./tab-item/setting";
import { ActivityResponseData, EmployeeResponseData } from "@/types";
import { useEffect, useState } from "react";
import { GetActivity } from "@/utils/network/get-activity";

export const TabsUI = ({ employees }: { employees: EmployeeResponseData }) => {
  const [activities, setActivities] = useState<ActivityResponseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetActivity(13);
        setActivities(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            <Text fontSize={"sm"} fontWeight={"600"}>
              Daftar Kegiatan
            </Text>
          </Tab>
          <Tab>
            <Text fontSize={"sm"} fontWeight={"600"}>
              Pengaturan
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CardUI>
              <ActivityList
                name={employees.name}
                rate={employees.rate}
                id={employees.id}
                data={activities}
              />
            </CardUI>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyItems={"center"}
              direction={"column"}
              alignItems={"center"}
            >
              <Pengaturan name={employees.name} rate={employees.rate} />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
