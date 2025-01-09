import {Types} from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  courses: Array<{
    courseId: Types.ObjectId;
    code: string;
  }>;
}
export interface IQuestion {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ISection {
  _id: string;
  number: number;
  sectionId: string;
  title: string;
  description?: string;
}
export interface ICourse {
  _id: string;
  code: string;
  title: string;
  description: string;
}

export interface JwtPayload {
  role: string;
  email: string;
  courses: ICourse[];
  exp?: number;
}
