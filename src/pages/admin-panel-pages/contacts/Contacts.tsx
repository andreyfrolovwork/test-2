import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from '@/processes/services/AdminService'
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import { Form, Input, Table } from 'antd'
import getColumnsContacts from '@/pages/admin-panel-pages/contacts/getColumnsContacts'
import Error from '@/widgets/Error'
import EditableCell from '@/shared/EditableCell'
import { getResCountRows } from '@/processes/models/response/getResCountRows'
import AddRowButton from '@/shared/AddRowButton'
import { IContact } from '@/processes/models/IContact'

const GET_CONTACT = 'getContactKey'

const Contacts: React.FC = () => {
  const pageSize = 10
  const [edKey, setEdKey] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [searchProps, setSearchProps] = useState({})

  const mutation = useMutation(updateContact, {
    onSuccess: () => queryClient.invalidateQueries(GET_CONTACT),
  })
  const addContactMutation = useMutation(addContact, {
    onSuccess: () => queryClient.invalidateQueries(GET_CONTACT),
  })

  const deleteContactMutation = useMutation(deleteContact, {
    onSuccess: () => queryClient.invalidateQueries(GET_CONTACT),
  })
  const [form] = Form.useForm()

  function edit(record: IContact) {
    console.log('132',record);
    console.log(edKey);
    setEdKey(record.id_contact)
    form.setFieldsValue({
      ...record,
    })
  }

  function cancel() {
    setEdKey(null)
  }

  async function save() {
    const contact = await form.validateFields()
    mutation.mutate(contact)
    setEdKey(null)
  }

  const { isLoading, error, data } = useQuery<getResCountRows<IContact[]>>(
    [GET_CONTACT, page, pageSize, searchProps],
    () => getContacts({ page: page, limit: pageSize, searchObj: searchProps }),
    { keepPreviousData: true },
  )
  if (isLoading) return <Loading />
  if (error) {
    if (error instanceof Error) {
      return <Error />
    }
  }

  async function deletef(){
    setEdKey(null)
    const contact = await form.validateFields()
    deleteContactMutation.mutate(contact)
  }

  function addHandle(){
    console.log('add handle');
    addContactMutation.mutate()
  }

  const columns = getColumnsContacts(edKey, edit, cancel, save, searchProps, setSearchProps, GET_CONTACT, deletef)

  if (data) {
    const notEmpty = data.count !== 0
    return (
      <div>
        <Form form={form} component={false}>
          <div className={'searchBox'}>
            <AddRowButton  handle={addHandle} label={'Добавить контакт'}/>
          </div>

          {notEmpty ? (
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              rowKey={'id_contact'}
              dataSource={data.rows}
              columns={columns}
              pagination={{
                pageSize: pageSize,
                total: data.count,
                onChange: page => {
                  setPage(page)
                },
              }}
            />

          ) : (
            <Table
              components={{
              }}
              rowKey={'id_contact'}
              dataSource={[]}
              columns={columns}
              pagination={{
                pageSize: pageSize,
                total: data.count,
                onChange: page => {
                  setPage(page)
                },
              }}
            />
          )}
        </Form>
      </div>
    )
  }
  return (
    <div>
      <NothingData />
    </div>
  )
}

export default Contacts
