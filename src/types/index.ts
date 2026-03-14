export interface CoverImage {
  id: number;
  name: string;
  url: string;
}

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  topic: string;
  author: string;
  readTime: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImg: CoverImage;
}

export interface RelatedPost {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: string;
}
