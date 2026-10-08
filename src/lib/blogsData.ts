export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  image: string;
  featuredImage?: string;
  readingTime: string;
  shortDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished?: boolean;
  fontStyle?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const blogPosts: BlogPost[] = [];
