export interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserForm
  extends Omit<User, 'id' | 'is_admin' | 'created_at' | 'updated_at'> {
  password: string;
  password_confirmation: string;
}
