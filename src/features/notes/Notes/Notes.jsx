import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { SYNC_NOTES_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest, getNotes } from '../../../store/selectors'
import Note from '../Note'
import AppPreloader from '../../../components/AppPreloader'
import { useSearch } from '../../../hooks'

function Notes(props) {
  const { syncNotes, notes, isProcessingNote } = props
  const { t } = useTranslation('common')

  useSearch()

  useEffect(() => {
    const messageOnError = t('notes.messageOnError')
    syncNotes(messageOnError)
  }, [syncNotes, t])

  return (
    <Grid container>
      <AppPreloader isVisible={isProcessingNote} />
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
    syncNotes: messageOnError => dispatch(SYNC_NOTES_REQUEST(messageOnError))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Notes)