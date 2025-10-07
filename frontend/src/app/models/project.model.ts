export interface Project {
  id?: number;
  title: string;
  description?: string;
  detailContent?: string;
  imageUrl?: string;
  additionalImages?: string[];
  categoryId?: number;
  categoryName?: string;
  clientName?: string;
  projectUrl?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
