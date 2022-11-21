import { Schema } from 'mongoose';

export interface SerializedUser {
  _id: Schema.Types.ObjectId,
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UserType = SerializedUser & Document & {
  password: string;
  serialize(): SerializedUser;
  comparePassword(candidate_password: string): boolean;
};
