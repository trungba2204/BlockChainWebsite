export interface TeamMember {
  id?: number;
  fullName: string;
  position: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  displayOrder?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
