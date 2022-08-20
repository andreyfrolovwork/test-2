export interface IAct {
  id_act: number
  fk_id_user: number
  fk_id_artist_contract: number | string
  createdAt: string
  updatedAt: string
}
