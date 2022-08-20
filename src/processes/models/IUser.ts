import { Moment } from "moment";

export interface IUser {
  email: string | null
  id_user: number | null
  role: string | null
}


export interface IUserFull extends IUser {

  createdAt: Moment | string
  updatedAt: Moment | string
  deleted: boolean
  key: number
}
