export interface ITrack {
  id_track: number
  fk_id_album: number
  fk_id_release: number
  fk_id_act: number
  fk_id_user: number
  fk_id_artist: number
  id_for_dmg: string
  author_of_music: string
  author_of_text: string
  phonogram_timing: string
  date_of_registration: string
  share_of_copyright: string
  share_of_related_rights: string
  rao: boolean
  voice: boolean
  zaicev: boolean
  mix_upload: boolean
  createdAt: string
  updatedAt: string
}
