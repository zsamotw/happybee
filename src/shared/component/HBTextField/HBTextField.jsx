import React from 'react'
import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginBottom: '2rem'
  }
})

export default function HBTextField({
  id,
  label,
  variant,
  name,
  value,
  onChange,
  type,
  placeholder,
  register,
  error,
  isMultiline,
  fullWidth
}) {
  const classes = useStyles()

  return (
    <TextField
      id={id}
      className={classes.root}
      label={label}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      inputRef={register}
      error={!!error}
      helperText={error ? error.message : ''}
      multiline={isMultiline}
      fullWidth={fullWidth}
    />
  )
}
