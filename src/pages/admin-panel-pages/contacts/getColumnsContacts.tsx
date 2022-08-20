import React, { useState } from 'react'
import { IContact, IContactSearch } from "@/processes/models/IContact";
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { queryClient } from "@/app/main";

function getColumnsContacts(
  edKey: number | null,
  edit :(record: IContact) => void,
  cancel :() => void,
  save :() => void,
  searchProps: {[key:string]: string},
  setSearchProps: (props:IContactSearch) => void,
  GET_CONTACT:string,
  deletef:() => void
) {
  const isEditing = (record: IContact) => record.id_contact === edKey
  function clearFilter(dataIndex: string) {
    let newSearchProps = searchProps
    delete newSearchProps[dataIndex]
    setSearchProps(newSearchProps)
    console.log(newSearchProps)
    console.log(searchProps)
    queryClient.invalidateQueries(GET_CONTACT)
  }

  function handleSearch(search: string, dataIndex: string) {
    let newSearch = {
      ...searchProps,
    }
    newSearch[dataIndex] = search
    console.log(newSearch)
    setSearchProps(newSearch)
    queryClient.invalidateQueries(GET_CONTACT)
    console.log(GET_CONTACT);
  }

  function FilterDropDownComponent({ dataIndex }: { dataIndex: string }) {
    const [search, setSearch] = useState('')
    return (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
           value={searchProps[dataIndex]}
          onChange={e => {
            console.log(e.target.value)
            setSearch(e.target.value)
          }}
          onPressEnter={() => handleSearch(search, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(search, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilter(dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    )
  }

  const filterIcon = {
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
  }

  const columns = [
    {
      title: 'id_contact',
      dataIndex: 'id_contact',
      key: 'id_contact',
      dataType: 'text',
      editable: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      dataType: 'text',
      editable: true,
      filterDropdown: () => <FilterDropDownComponent dataIndex={'name'} />,
      ...filterIcon,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
      dataType: 'text',
      editable: true,
      filterDropdown: () => <FilterDropDownComponent dataIndex={'phone'} />,
      ...filterIcon,
    },

    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      dataType: 'date',
      editable: false,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      dataType: 'date',
      editable: false,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      dataType: 'operation',
    },
  ]

  return columns.map(col => {
    return {
      ...col,
      onCell: (record: IContact) => {
        return {
          record,
          dataType: col.dataType,
          dataIndex: col.dataIndex,
          title: col.title,
          edit: edit,
          save: save,
          deletef:deletef,
          cancel: cancel,
          edKey: edKey,
          editable: col.editable,
          editing: isEditing(record),
        }
      },
    }
  })
}

export default getColumnsContacts
