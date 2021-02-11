import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import NotesList from '../NotesList'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '2rem 15rem',
    [theme.breakpoints.down('lg')]: {
      padding: '2rem 10rem'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 3rem'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 1rem'
    }
  }
}))

export default function NotesContainer() {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.container}>
      <NotesList />
    </div>
  )
}
