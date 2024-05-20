import { ActivityResponseData, ProjectResponseData } from "@/types";
import { GetProject } from "@/utils/network/get-project";
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
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const EditActivityModal = ({
  isOpen,
  onClose,
  onEdit,
  record,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (activity: ActivityResponseData) => void;
  record: ActivityResponseData;
}) => {
  const [editedActivity, setEditedActivity] =
    useState<ActivityResponseData>(record);
  const [project, setProject] = useState<ProjectResponseData[]>([]);

  const [selectedProject, setSelectedProject] = useState(record.id_project);

  useEffect(() => {
    setEditedActivity(record);
    const fetchDataNameProject = async () => {
      try {
        const response = await GetProject();
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataNameProject();
  }, [record]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    onEdit({
      ...editedActivity,
      id_project: selectedProject,
    });
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
            <Select
              placeholder="Pilih Nama Proyek"
              name="name"
              value={Number(selectedProject)}
              onChange={(e) => {
                setSelectedProject(Number(e.target.value));
              }}
              required
            >
              {project.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  selected={item.id === record.id_project}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Flex mt={4} gap={4} direction={"row"}>
            <FormControl>
              <FormLabel>Tanggal Mulai</FormLabel>
              <Input
                type="date"
                name="dateStart"
                value={editedActivity.dateStart.toString() || "2000-01-01"}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tanggal Selesai</FormLabel>
              <Input
                type="date"
                name="dateEnd"
                value={editedActivity.dateEnd.toString() || "2000-01-01"}
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
