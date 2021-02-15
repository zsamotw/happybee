import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { SYNC_NOTES_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest, getNotes } from '../../../store/selectors'
import Note from '../Note'
import { useSearch } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

function NotesList(props) {
  const { getNotesList, notes, isProcessingNote } = props
  const theme = useTheme()
  const classes = useStyles(theme)
  const { t } = useTranslation('common')

  useSearch()

  useEffect(() => {
    const messageOnError = t('notesList.messageOnNoteLoadError')
    getNotesList(messageOnError)
  }, [getNotesList, t])

  return (
    <Grid container>
      <Backdrop className={classes.backdrop} open={isProcessingNote}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {notes ? notes.map(note => <Note note={note} key={note.id} />) : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isProcessingNote } = getIsAsyncRequest(state)
  const notes = getNotes(state)
  return { isProcessingNote, notes }
}

function mapDispatchToState(dispatch) {
  return {
    getNotesList: messageOnError => dispatch(SYNC_NOTES_REQUEST(messageOnError))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NotesList)
