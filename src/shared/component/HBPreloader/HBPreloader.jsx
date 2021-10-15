import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function HBPreloader({ isVisible }) {
  const theme = useTheme()
  const classes = useStyles(theme)
  return (
    <>
      <Backdrop className={classes.backdrop} open={isVisible}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  )
}
