import { IUserFull } from '@/processes/models/IUser'
import React from 'react'

function getColumnsUsers(edKey: number | null, edit: unknown, cancel: unknown, save: unknown) {
  const isEditing = (record: IUserFull) => record.key === edKey

  const columns = [
    /*{
      title: 'ref',
      dataIndex: 'id_artist_contract',
      key: 'link',
      dataType: 'link',
      linkfield: 'id_artist_contract',
    },*/
    {
      title: 'id_user',
      dataIndex: 'id_user',
      key: 'id_user',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      dataType: 'text',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
      dataType: 'dropdown-role',
      editable: true,
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      dataType: 'date',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      dataType: 'operation',
    },
  ]

  const colsWithProps = columns.map(col => {
    return {
      ...col,
      onCell: (record: any) => {
        return {
          record,
          /*  linkfield: col.linkfield,*/
          dataType: col.dataType,
          dataIndex: col.dataIndex,
          title: col.title,
          edit: edit,
          save: save,
          cancel: cancel,
          edKey: edKey,
          editable: col.editable,
          editing: isEditing(record),
        }
      },
    }
  })

  return colsWithProps
}

export default getColumnsUsers
