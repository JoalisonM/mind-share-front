import type { User } from "./user";

export interface Comment {
  id: string;
  content: string;
  ideaId: string;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt?: string;
}
