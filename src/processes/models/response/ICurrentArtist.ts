import { IArtist } from '@/processes/models/IArtist'
import { IAct } from '../IAct'

export interface ICurrentArtist extends IArtist {
  acts: IAct[]
}
