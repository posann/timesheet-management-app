"use client";

import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { columns_type } from "./table-antd/columns_type";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { ActivityResponseData } from "@/types";
import { TotalDuration } from "@/utils/total-duration";

const onChange: TableProps<ActivityResponseData>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TableUIAntd = ({
  data,
  rate,
}: {
  data: ActivityResponseData[];
  rate: number;
}) => (
  <Table
    columns={columns_type}
    dataSource={data}
    onChange={onChange}
    bordered
    size="middle"
    pagination={{ pageSize: 5 }}
    scroll={{ x: "max-content" }}
    footer={() => (
      <Box>
        <Flex mt={4} rounded={"lg"} justify="space-between" direction={"row"}>
          <Text fontWeight={"400"}>Total Durasi</Text>
          <Text fontWeight={"bold"} color={"blue.400"}>
            {TotalDuration(data)} Jam
          </Text>
        </Flex>
        <Divider my={2} h={0.6} orientation="horizontal" bg={"blue.400"} />
        <Flex rounded={"lg"} justify="space-between" direction={"row"}>
          <Text fontWeight={"bold"} fontSize={"md"}>
            Total Pendapatan
          </Text>
          <Text fontWeight={"bold"} fontSize={"md"} color={"blue.400"}>
            Rp.{rate * TotalDuration(data)}
          </Text>
        </Flex>
      </Box>
    )}
  />
);

export default TableUIAntd;
