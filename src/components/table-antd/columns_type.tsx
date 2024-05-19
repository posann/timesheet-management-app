import { TableColumnsType } from "antd";
import { ActionButton } from "../button-action";
import { ActivityResponseData } from "@/types";
import { GetProject } from "@/utils/network/get-project";

const GetDataProject = async () => {
  const data = await GetProject();
  return data.data;
};

export const columns_type: TableColumnsType<ActivityResponseData> = [
  {
    title: "Judul Kegiatan",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    width: "15%",
  },
  {
    title: "Nama Proyek",
    dataIndex: "id_project",
    sorter: (a, b) => a.id_project - b.id_project,
    // filters: [
    //   {
    //     text: "Desain UI",
    //     value: "Desain UI",
    //   },
    //   {
    //     text: "Coding",
    //     value: "Coding",
    //   },
    // ],
    // filterMode: "tree",
    // filterSearch: true,
    // onFilter: (value, record) => record.id_project.includes(value as string),
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
