import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '80vh'
  },
  alert: {
    color: theme.palette.error.main,
    fontWidth: '600',
    fontSize: theme.typography.display3.fontSize,
    marginBottom: '4rem'
  }
}))
const NoMatch = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.root}>
      <div className={classes.alert}>No context data</div>
    </div>
  )
}

export default NoMatch
