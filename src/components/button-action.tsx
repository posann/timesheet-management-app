import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EditActivityModal from "./modal/edit-activity";
import { ActivityResponseData } from "@/types";
import { DeleteActivity } from "@/utils/network/delete-activity";
import { UpdateActivity } from "@/utils/network/update-activity";

export const ActionButton = ({ record }: { record: ActivityResponseData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecord, setSelectedRecord] =
    useState<ActivityResponseData | null>(null);

  const handleEditClick = () => {
    setSelectedRecord(record);
    onOpen();
  };

  const handleEdit = async (editedRecord: ActivityResponseData) => {
    const updateData = await UpdateActivity(record.id, editedRecord);
    onClose();
    location.reload();
  };

  const handleDelete = async () => {
    const res = await DeleteActivity(record.id);
    location.reload();
  };

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
        <Button
          size={"xs"}
          variant={"solid"}
          colorScheme="red"
          onClick={handleDelete}
        >
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
