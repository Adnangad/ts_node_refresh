import { Request } from "express";
export interface TaskType {
    id: number;
    taskName: string;
    createdAt: Date;
    accomplished: boolean;
}
export interface UserType {
    id: number;
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface myRequest extends Request {
    user?: {
      id: string;
      role: string;
    };
}