import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: CustomUser;
}

interface CustomUser {
  // Define the user properties you need
  // For example:
  id: string;
  name: string;
  role: string;
  // ...
}
