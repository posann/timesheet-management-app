import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EditActivityModal from "./modal/edit-activity";
import { ActivityResponseData } from "@/types";
import { DeleteActivity } from "@/utils/network/delete-activity";
import { UpdateActivity } from "@/utils/network/update-activity";
import ToastComponent from "./toast";

export const ActionButton = ({ record }: { record: ActivityResponseData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecord, setSelectedRecord] =
    useState<ActivityResponseData | null>(null);

  const [status, setStatus] = useState<number | null>(null);

  const handleSuccess = () => setStatus(1);
  const handleError = () => setStatus(2);
  const handleLoading = () => setStatus(3);

  const handleEditClick = () => {
    setSelectedRecord(record);
    onOpen();
  };

  const handleEdit = async (editedRecord: ActivityResponseData) => {
    await handleLoading();
    try {
      const updateData = await UpdateActivity(record.id, editedRecord);
      onClose();
      await handleSuccess();
    } catch {
      await handleError();
    }
  };

  const handleDelete = async () => {
    await handleLoading();
    try {
      await DeleteActivity(record.id);
      await handleSuccess();
    } catch {
      await handleError();
    }
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
      {status !== null && <ToastComponent status={status} />}
    </>
  );
};
