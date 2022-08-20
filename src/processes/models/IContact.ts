import { Moment } from "moment";

export interface IContact {
  id_contact: number
  name : string
  phone : string
  createdAt: Moment | string
  updatedAt: Moment | string
}
export interface IContactSearch {
  name?:string,
  phone?:string
}
