import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { SYNC_NOTES_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest, getNotes } from '../../../store/selectors'
import Note from '../Note'
import AppPreloader from '../../../components/AppPreloader'
import { useSearch, useCurrentViewTitle } from '../../../hooks'

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
  useCurrentViewTitle(t('notes.pageTitle'))

  useEffect(() => {
    const messageOnError = t('notes.messageOnError')
    syncNotes(messageOnError)
  }, [syncNotes, t])

  return (
    <Grid container>
      <AppPreloader
        isVisible={isFetchingData || isUpdatingData || isDeletingData}
      />
      {notes ? notes.map(note => <Note note={note} key={note.id} />) : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isFetchingData, isUpdatingData, isDeletingData } = getIsAsyncRequest(
    state
  )
  const notes = getNotes(state)
  return { isFetchingData, isUpdatingData, isDeletingData, notes }
}

function mapDispatchToState(dispatch) {
  return {
    syncNotes: messageOnError => dispatch(SYNC_NOTES_REQUEST(messageOnError))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Notes)
