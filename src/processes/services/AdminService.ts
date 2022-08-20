import $api from '../http/api'
import { AuthResponse } from '@/processes/models/response/AuthResponse'
import { IArtist } from '@/processes/models/IArtist'
import { IUserFull } from '@/processes/models/IUser'
import { PageLimit } from '@/processes/models/PageLimit'
import moment from 'moment'

export async function getArtists(props: PageLimit) {
  const artists = await $api.get('/admin/get-artists', { params: props })
  const rows = artists?.data.rows.map((artist: IArtist) => {
    return {
      ...artist,
      contract_agreement: moment(artist.contract_agreement),
      contract_expiration_date: moment(artist.contract_expiration_date),
    }
  })
  return {
    rows: rows,
    count: artists.data.count,
  }
}

export async function updateArtist(artist: IArtist) {
  return $api.put<AuthResponse>('/admin/put-artist', { ...artist })
}

export async function addArtist(artist: IArtist) {
  return $api.post<AuthResponse>('/admin/post-artist', { ...artist })
}

export async function getUsers(props: PageLimit) {
  const data = await $api.get('/admin/get-users', { params: props })
  const rows = data?.data.rows.map((user: IUserFull) => {
    return {
      ...user,
      createdAt: moment(user.createdAt),
      updatedAt: moment(user.updatedAt),
    }
  })
  return {
    rows: rows,
    count: data.data.count,
  }
}

export async function getAboutArtist(prop: { id_artist_contract: string | undefined }) {
  return $api.post('/admin/get-about-artist', prop)
}
export async function updateUser(user: IUserFull) {
  return $api.put<AuthResponse>('/admin/put-user', { ...user })
}
