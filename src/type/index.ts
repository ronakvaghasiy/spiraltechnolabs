export interface User {
  user: {
    writer: string;
    password: string;
  };
}

export interface BlogDataResponse {
  data: Blog[];
  status: number;
}

export interface Blog {
  title: string;
  text: string;
  writer: string;
  createdAt: Date;
  id: string;
}

export type BlogPayload = Omit<Blog, "createdAt" | "id">;
