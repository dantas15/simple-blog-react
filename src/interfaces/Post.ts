import { CommentWithUser } from './Comment';
import { User } from './User';

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

export interface PostWithUser extends Post {
  user: User;
}

export interface PostForm {
  id?: string;
  title: string;
  content: string;
  slug?: string;
}
