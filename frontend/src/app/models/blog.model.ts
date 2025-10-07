export interface Blog {
  id?: number;
  title: string;
  summary?: string;
  content: string;
  imageUrl?: string;
  author?: string;
  categoryId?: number;
  categoryName?: string;
  published?: boolean;
  viewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
