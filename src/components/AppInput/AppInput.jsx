import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginBottom: '2rem'
  }
})

export default function AppInput(props) {
  const classes = useStyles()
  const {
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
  } = props

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
