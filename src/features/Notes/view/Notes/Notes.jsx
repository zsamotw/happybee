import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { selectNotes } from '../../selector/notesSelectors'
import Note from '../Note'
import HBPreloader from '../../../../shared/component/HBPreloader'
import { useSearch, useCurrentViewTitle } from '../../../../shared/hook'
import { syncNotesRequest } from '../../action/notesActions'
import { selectIsAsyncRequest } from '../../../../shared/selector/appSelectors'

function Notes(props) {
  const {
    syncNotes,
    notes,
    isFetchingData,
    isUpdatingData,
    isDeletingData
  } = props
  const { t } = useTranslation('common')

  useSearch()
  useCurrentViewTitle(t('notes.notes.pageTitle'))

  useEffect(() => {
    const messageOnError = t('notes.notes.messageOnError')
    syncNotes(messageOnError)
  }, [syncNotes, t])

  return (
    <Grid container>
      <HBPreloader
        isVisible={isFetchingData || isUpdatingData || isDeletingData}
      />
      {notes ? notes.map(note => <Note note={note} key={note.id} />) : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const {
    isFetchingData,
    isUpdatingData,
    isDeletingData
  } = selectIsAsyncRequest(state)
  const notes = selectNotes(state)
  return { isFetchingData, isUpdatingData, isDeletingData, notes }
}

function mapDispatchToState(dispatch) {
  return {
    syncNotes: messageOnError => dispatch(syncNotesRequest(messageOnError))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Notes)
