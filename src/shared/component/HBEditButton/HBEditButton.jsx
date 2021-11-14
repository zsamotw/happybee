import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import React from 'react'

export default function HBEditButton({ onClick }) {

  return (
    <IconButton onClick={onClick}>
      <EditIcon />
    </IconButton>
  )
}
