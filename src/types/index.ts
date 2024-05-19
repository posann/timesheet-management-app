export interface EmployeeCheckResponse {
  message: string;
  data: EmployeeResponseData;
}

export interface EmployeeResponseData {
  id: number;
  name: string;
  rate: number;
  overtime: number | null;
  earnings: number | null;
  active: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectResponse {
  message: string;
  data: ProjectResponseData[];
}

export interface ProjectResponseData {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityResponse {
  message: string;
  data: ActivityResponseData[];
}

export interface ActivityResponseData {
  id: number;
  id_project: number;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  timeStart: string;
  timeEnd: string;
  duration: string;
}
