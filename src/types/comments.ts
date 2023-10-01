import { Profile } from "types/profile";

export interface CommentOwner extends Profile {
  accept_rate: number;
}

export interface Comment {
  body: string;
  comment_id: number;
  content_license: string;
  creation_date: number;
  edited: boolean;
  owner: CommentOwner;
  post_id: number;
  score: number;
}

export interface CommentsData {
  items: Comment[];
}
