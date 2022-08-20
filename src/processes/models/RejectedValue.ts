import IError from '@/processes/models/response/IError'

export default interface RejectedValue {
  response: {
    data: IError
  }
}
