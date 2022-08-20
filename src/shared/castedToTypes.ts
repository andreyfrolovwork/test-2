import moment from 'moment'

function castedToTypes(payload: any) {
  const resultPayload = { ...payload }
  for (let prop in payload) {
    if (payload[prop] instanceof moment) {
      resultPayload[prop] = payload[prop].format('YYYY-MM-DD')
    }
  }
  return resultPayload
}
export default castedToTypes
