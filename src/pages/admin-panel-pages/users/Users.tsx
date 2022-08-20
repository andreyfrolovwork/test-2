import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import  { getUsers, updateUser } from "@/processes/services/AdminService";
import { queryClient } from '@/app/main'
import NothingData from '@/widgets/NothingData'
import Loading from '@/widgets/Loading'
import { Form, Table } from 'antd'
import getColumnsUsers from '@/pages/admin-panel-pages/users/getColumnsUsers'
import Error from '@/widgets/Error'
import EditableCell from '@/shared/EditableCell'
import { getResCountRows } from "@/processes/models/response/getResCountRows";
import { IUserFull } from "@/processes/models/IUser";

const Users: React.FC = () => {
  const pageSize = 10
  const [edKey, setEdKey] = useState(null)
  const [page, setPage] = useState(1)

  const mutation = useMutation(updateUser, {
    onSuccess: () => queryClient.invalidateQueries('admin/get-users'),
  })

  const [form] = Form.useForm()

  function edit(record: any) {
    setEdKey(record.key)
    form.setFieldsValue({
      ...record,
    })
  }
  function cancel() {
    setEdKey(null)
  }
  async function save() {
    const artist = await form.validateFields()
    mutation.mutate(artist)
    setEdKey(null)
  }
  const { isLoading, error, data } = useQuery<getResCountRows<IUserFull[]>>(
    ['admin/get-users', page,pageSize],
    () => getUsers({ page: page, limit: pageSize }),
    { keepPreviousData: true },
  )
  if (isLoading) return <Loading />
  if (error) {
    if (error instanceof Error) {
      return <Error />
    }
  }

  const columns = getColumnsUsers(edKey, edit, cancel, save)

  if (data) {
    if (data.count !== 0)
      return (
        <div>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              rowKey={'id_user'}
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

export default Users
