import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { ActivityResponseData, ProjectResponseData } from "@/types";
import { TotalDuration } from "@/utils/total-duration";
import { ActionButton } from "./button-action";
import { GetProject } from "@/utils/network/get-project";

const TableUIAntd = ({
  data,
  rate,
}: {
  data: ActivityResponseData[];
  rate: number;
}) => {
  const [projectData, setProjectData] = useState<ProjectResponseData[]>([]);

  useEffect(() => {
    GetProject().then((res) => {
      setProjectData(res.data);
    });
  }, []); // Run this effect only once (on mount)

  const columns: TableColumnsType<ActivityResponseData> = [
    {
      title: "Judul Kegiatan",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      width: "15%",
    },
    {
      title: "Nama Proyek",
      dataIndex: "id_project",
      filters: projectData.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => {
        console.log("====================================");
        console.log(value, record.id_project);
        console.log("====================================");
        return record.id_project === value;
      },
      width: "15%",
    },
    {
      title: "Tanggal Mulai",
      dataIndex: "dateStart",
      width: "15%",
    },
    {
      title: "Tanggal Berakhir",
      dataIndex: "dateEnd",
      width: "15%",
    },
    {
      title: "Waktu Mulai",
      dataIndex: "timeStart",
      width: "15%",
    },
    {
      title: "Waktu Berakhir",
      dataIndex: "timeEnd",
      width: "15%",
    },
    {
      title: "Durasi",
      dataIndex: "duration",
      width: "10%",
    },
    {
      title: "Action",
      key: "operation",
      width: "10%",
      render: (record) => {
        return <ActionButton record={record} />;
      },
    },
  ];

  const onChange: TableProps<ActivityResponseData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
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
              Rp. {rate * TotalDuration(data)}
            </Text>
          </Flex>
        </Box>
      )}
    />
  );
};

export default TableUIAntd;
