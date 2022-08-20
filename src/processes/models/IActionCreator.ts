export interface IActionCreator<T = any> {
  type: 'post' | 'put' | 'delete'
  payload: T
}
