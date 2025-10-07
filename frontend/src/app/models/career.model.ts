export interface Career {
  id?: number;
  title: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  jobType: string;
  workLocation: string;
  location?: string;
  salaryRange?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
