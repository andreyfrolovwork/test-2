import $api from '../http/api'
import { AuthResponse } from '@/processes/models/response/AuthResponse'
import { PageLimit } from '@/processes/models/PageLimit'
import moment from 'moment'
import { IContact } from '../models/IContact'

export async function getContacts(props: PageLimit) {
  const data = await $api.post('/admin/get-contacts', props)
  console.log('props', props)
  const rows = data?.data.rows.map((user: IContact) => {
    return {
      ...user,
      createdAt: moment(user.createdAt),
      updatedAt: moment(user.updatedAt),
    }
  })

  console.log('Запрос', rows)
  return {
    rows: rows,
    count: data.data.count,
  }
}

export async function updateContact(contact: IContact) {
  console.log(contact);
  return $api.put<AuthResponse>('/admin/put-contact', { ...contact })
}

export async function addContact(){
  return $api.post('/admin/add-contact')
}

export async function deleteContact(props:IContact){
  return $api.post('/admin/delete-contact',props)
}

