import { ITrack } from './ITrack'

export interface ITrackWithFiles extends ITrack {
  path_to_mp3: any
  path_to_wav: any
  path_to_cover: any
}
