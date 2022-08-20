import React from 'react'
import { Button } from 'antd'
interface IAddRowButton {
  handle: any
  label: string
}

const AddRowButton: React.FC<IAddRowButton> = ({ handle, label }) => {
  return (
    <>
      <Button
        onClick={handle}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        {label}
      </Button>
    </>
  )
}

export default AddRowButton
