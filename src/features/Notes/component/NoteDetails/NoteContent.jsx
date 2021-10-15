import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { Box } from '@material-ui/core'
import { formattedDateTime } from '../../../../services/date-service'

const useStyles = makeStyles({
  title: {
    margin: 0
  },
  category: {
    marginTop: 0,
    marginBottom: '.07rem',
    display: 'flex',
    alignItems: 'center'
  },
  date: {
    fontSize: '.7em'
  }
})

export default function NoteContent(props) {
  const {
    title,
    category,
    description,
    createdAt,
    withImage,
    isPrivate
  } = props

  const classes = useStyles()

  return (
    <div
      style={{
        width: withImage ? '50%' : '100%',
        paddingLeft: withImage ? '2rem' : 0
      }}
    >
      <h1 className={classes.title}>{title}</h1>
      <h2 className={classes.category}>
        <Box mr={1}>{category.label}</Box>
        {isPrivate && <VisibilityOffIcon color="primary" />}
      </h2>
      <p>{description}</p>
      <div className={classes.date}>{formattedDateTime(createdAt)}</div>
    </div>
  )
}
