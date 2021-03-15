import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { formattedDateTime } from '../../../services/date-service'

const useStyles = makeStyles(withImage => ({
  contentContainer: {
    width: withImage ? '50%' : '100%',
    paddingLeft: withImage ? '2rem' : 0
  },
  title: {
    margin: 0
  },
  category: {
    marginTop: 0
  },
  date: {
    fontSize: '.7em'
  }
}))

export default function NoteContent(props) {
  const { title, category, description, createdAt, withImage } = props

  const classes = useStyles(withImage)

  return (
    <div
      style={{
        width: withImage ? '50%' : '100%',
        paddingLeft: withImage ? '2rem' : 0
      }}
    >
      <h1 className={classes.title}>{title}</h1>
      <h2 className={classes.category}>{category.label}</h2>
      <p>{description}</p>
      <div className={classes.date}>{formattedDateTime(createdAt)}</div>
    </div>
  )
}
