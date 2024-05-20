"use client";

import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import {
  FaDiagramProject,
  FaFileCirclePlus,
  FaMoneyBill1Wave,
  FaRegFaceSmile,
} from "react-icons/fa6";
import TableUIAntd from "../table-antd";
import { useState, useEffect } from "react";
import AddActivityModal from "../modal/add-activity";
import ExportButtons from "../button-export";
import AddProjectModal from "../modal/add-project";
import { ActivityResponseData } from "@/types";
import { GetProjectByID } from "@/utils/network/get-project-id";

export const ActivityList = ({
  name,
  rate,
  id,
  data,
}: {
  name: string;
  rate: number;
  id: number;
  data: ActivityResponseData[];
}) => {
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [updateData, setUpdateData] = useState<ActivityResponseData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onOpenModal1 = () => setIsOpenModal1(true);
  const onCloseModal1 = () => setIsOpenModal1(false);

  const onOpenModal2 = () => setIsOpenModal2(true);
  const onCloseModal2 = () => setIsOpenModal2(false);

  useEffect(() => {
    const updateDataAsync = async () => {
      const updatedData = await Promise.all(
        data.map(async (item) => {
          try {
            const res = await GetProjectByID(item.id_project);
            return { ...item, id_project: res.data.name };
          } catch (error) {
            console.log(error);
            return item; // return item as is if there's an error
          }
        })
      );
      setUpdateData(updatedData);
    };

    updateDataAsync();
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = updateData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Stack>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Tag variant="outline" colorScheme="blue">
          <FaRegFaceSmile />
          <TagLabel ml={2}>{name}</TagLabel>
        </Tag>
        <Tag variant="outline" colorScheme="red">
          <FaMoneyBill1Wave />
          <TagLabel ml={2}>{rate}</TagLabel>
        </Tag>
      </Flex>
      <Divider bg={"blue.400"} height={0.8} my={4} orientation="horizontal" />
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={4}
        justify="start"
        align="center"
      >
        {name === "" || name == null ? (
          <Badge colorScheme="red" size={"md"}>
            Silahkan isi data karyawan di pengaturan
          </Badge>
        ) : (
          <Heading fontSize={"xl"}>Daftar Kegiatan</Heading>
        )}
        <Button
          size={"sm"}
          variant={"outline"}
          colorScheme="blue"
          onClick={onOpenModal1}
          hidden={name === "" || name == null}
        >
          <FaFileCirclePlus />
          <Text ml={2}>Tambah Kegiatan</Text>
        </Button>
        <Button
          size={"sm"}
          variant={"outline"}
          colorScheme="green"
          onClick={onOpenModal2}
          hidden={name === "" || name == null}
        >
          <FaDiagramProject />
          <Text ml={2}>Tambah Proyek</Text>
        </Button>
      </Flex>
      <Stack mt={4} gap={4}>
        <Flex
          gap={4}
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
        >
          <ExportButtons filteredData={filteredData} />
          <Input
            size={"sm"}
            type="text"
            placeholder="Cari Kegiatan"
            width={{ base: "100%", md: "30%" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Flex>
        <TableUIAntd data={filteredData} rate={rate} />
      </Stack>

      <AddActivityModal isOpen={isOpenModal1} onClose={onCloseModal1} id={id} />
      <AddProjectModal isOpen={isOpenModal2} onClose={onCloseModal2} />
    </Stack>
  );
};
