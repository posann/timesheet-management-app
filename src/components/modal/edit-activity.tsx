import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DataTypeTable } from "../table-antd/data-type";

const EditActivityModal = ({
  isOpen,
  onClose,
  onEdit,
  record,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (activity: DataTypeTable) => void;
  record: DataTypeTable;
}) => {
  const [editedActivity, setEditedActivity] = useState<DataTypeTable>(record);

  useEffect(() => {
    setEditedActivity(record);
  }, [record]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    onEdit(editedActivity);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Kegiatan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Judul Kegiatan</FormLabel>
            <Input
              name="title"
              value={editedActivity.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Nama Proyek</FormLabel>
            <Input
              name="name"
              value={editedActivity.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <Flex mt={4} gap={4} direction={"row"}>
            <FormControl>
              <FormLabel>Tanggal Mulai</FormLabel>
              <Input
                type="date"
                name="dateStart"
                value={editedActivity.dateStart}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tanggal Selesai</FormLabel>
              <Input
                type="date"
                name="dateEnd"
                value={editedActivity.dateEnd}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <Flex mt={4} gap={4} direction={"row"}>
            <FormControl mt={4}>
              <FormLabel>Waktu Mulai</FormLabel>
              <Input
                type="time"
                name="timeStart"
                value={editedActivity.timeStart}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Waktu Selesai</FormLabel>
              <Input
                type="time"
                name="timeEnd"
                value={editedActivity.timeEnd}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button colorScheme="blue" ml={3} onClick={handleEdit}>
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditActivityModal;
