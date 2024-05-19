import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { DataTypeTable } from "./table-antd/data-type";
import EditActivityModal from "./modal/edit-activity";

export const ActionButton = ({ record }: { record: DataTypeTable }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecord, setSelectedRecord] = useState<DataTypeTable | null>(
    null
  );

  const handleEditClick = () => {
    setSelectedRecord(record);
    onOpen();
  };

  const handleEdit = (editedRecord: DataTypeTable) => {};

  return (
    <>
      <Flex gap={2} direction={{ base: "column", md: "row" }}>
        <Button
          size={"xs"}
          variant={"solid"}
          colorScheme="yellow"
          onClick={handleEditClick}
        >
          <EditIcon />
        </Button>
        <Button size={"xs"} variant={"solid"} colorScheme="red">
          <DeleteIcon />
        </Button>
      </Flex>
      {selectedRecord && (
        <EditActivityModal
          isOpen={isOpen}
          onClose={onClose}
          onEdit={handleEdit}
          record={selectedRecord}
        />
      )}
    </>
  );
};
