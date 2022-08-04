import { CommentWithUser } from './Comment';

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface PostWithComments extends Post {
  comments: CommentWithUser[];
}

export interface PostForm {
  id?: string;
  title: string;
  content: string;
  slug?: string;
}
