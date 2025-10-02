export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  user: {
    name: string;
  };
}
