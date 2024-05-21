import { Button, Flex } from "@chakra-ui/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DataTypeTable } from "./table-antd/data-type";
import { ActivityResponseData } from "@/types";

const ExportButtons = ({
  filteredData,
}: {
  filteredData: ActivityResponseData[];
}) => {
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DaftarKegiatan");
    XLSX.writeFile(workbook, "DaftarKegiatan.xlsx");
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "ID",
          "Title",
          "Name",
          "Duration",
          "Time Start",
          "Time End",
          "Date Start",
          "Date End",
        ],
      ],
      body: filteredData.map((item) => [
        item.id,
        item.title,
        item.id_project,
        item.duration,
        item.timeStart,
        item.timeEnd,
        item.dateStart.toString(),
        item.dateEnd.toString(),
      ]),
    });
    doc.save("DaftarKegiatan.pdf");
  };

  return (
    <Flex gap={2}>
      <Button
        variant={"solid"}
        colorScheme="green"
        size={"xs"}
        onClick={handleExportToExcel}
      >
        EXCEL
      </Button>
      <Button
        variant={"solid"}
        colorScheme="red"
        size={"xs"}
        onClick={handleExportToPDF}
      >
        PDF
      </Button>
    </Flex>
  );
};

export default ExportButtons;
