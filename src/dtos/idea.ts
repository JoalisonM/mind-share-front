import type { Comment } from "./comment";
import type { User } from "./user";
import type { Vote } from "./vote";

export interface Idea {
  id: string;
  title: string;
  description?: string | null;
  author?: User;
  countVotes?: number;
  authorId: string;
  createdAt: string;
  updatedAt?: string;
  votes?: Vote[];
  comments?: Comment[];
}
