import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function AppDatePicker(props) {
  const { id, label, name, register, fullWidth } = props

  return (
    <div>
      <TextField
        id={id}
        label={label}
        name={name}
        type="date"
        inputRef={register}
        fullWidth={fullWidth}
        InputLabelProps={{
          shrink: true
        }}
      />
    </div>
  )
}
