export interface Project {
  _id?: string;
  id: string;
  slug?: string;
  title: string;
  category: string;
  location: string;
  workType?: string;
  builtUpArea?: string;
  duration?: string;
  status?: string;
  shortDescription?: string;
  description: string;
  image: string;
  thumbnail?: string;
  gallery: string[];
  images?: string[];
  clientName?: string;
  projectUrl?: string;
  technologies?: string[];
  featured?: boolean;
  isPublished?: boolean;
  displayOrder?: number;
  specifications: {
    process: string;
    materials: string;
    industry: string;
    area: string;
    duration?: string;
    status?: string;
  };
  highlights: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const portfolioProjects: Project[] = [];
