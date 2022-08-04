import { User } from './User';

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  updated_at: string;
}

export interface CommentWithUser extends Comment {
  user: User;
}
