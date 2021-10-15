import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function HBDatePicker({
  id,
  label,
  name,
  register,
  fullWidth
}) {
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
