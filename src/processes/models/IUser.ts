export interface IUser {
  email: string | null
  id_user: string | null
  role: string | null
}

export interface IUserFull extends IUser {
  createdAt: Date | string
  updatedAt: Date | string
  deleted: boolean
  key: number
}
