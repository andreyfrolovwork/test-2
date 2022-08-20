export interface PageLimit {
  page?: number | undefined
  limit?: number | undefined
}

export interface PageLimitWithIdArtist extends PageLimit {
  fk_id_artist_contract: number | string
}
