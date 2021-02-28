import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& svg': {
      color: theme.palette.error.main
    },
    '&:hover': {
      '& svg': {
        color: theme.palette.error.dark,
        cursor: 'pointer'
      }
    }
  }
}))

export default function DeleteNoteIcon(props) {
  const { onClick } = props
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <IconButton onClick={onClick} className={classes.root}>
      <DeleteIcon />
    </IconButton>
  )
}
