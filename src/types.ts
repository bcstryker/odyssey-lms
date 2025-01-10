import {Types} from "mongoose";

export interface JwtPayload {
  role: string;
  email: string;
  courses: ICourse[];
  exp?: number;
}

export interface ICourse {
  _id: string;
  code: string;
  title: string;
  description: string;
}

export interface ISection {
  _id: string;
  number: number;
  sectionId: string;
  title: string;
  description?: string;
}

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
  sectionId: string;
  reference?: {
    type: "code" | "image";
    content: string;
  };
  question: string;
  options: string[];
  answer: string[];
  explanation?: string;
}
export interface ITopic {
  _id: string;
  topicId: string;
  sectionId: string;
  title: string;
  contentBlocks: IContentBlock[];
  resources: IResource[];
}
export interface IContentBlock {
  type: "text" | "image" | "code";
  content: string;
  description?: string;
}

export interface IResource {
  url: string;
  description?: string;
}
