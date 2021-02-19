import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { GET_PICKED_NOTES_REQUEST } from '../../../store/actions/async-actions'
import {
  getIsAsyncRequest,
  getPickedNotes,
  getCurrentUser
} from '../../../store/selectors'
import Note from '../Note'
import AppPreloader from '../../../components/AppPreloader'
import { useSearch, useCurrentViewTitle } from '../../../hooks'

function PickedNotes(props) {
  const {
    syncPickedNotes,
    pickedNotes,
    isFetchingData,
    isUpdatingData,
    isDeletingData,
    currentUser
  } = props
  const { t } = useTranslation('common')

  useCurrentViewTitle(t('pickedNotes.pageTitle'))

  useSearch()

  useEffect(() => {
    const messageOnError = t('pickedNotes.messageOnError')
    syncPickedNotes({ userUid: currentUser.uid, messageOnError })
  }, [syncPickedNotes, t, currentUser])

  return (
    <Grid container>
      <AppPreloader
        isVisible={(isFetchingData, isUpdatingData || isDeletingData)}
      />
      {pickedNotes
        ? pickedNotes.map(note => <Note note={note} key={note.id} />)
        : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isFetchingData, isUpdatingData, isDeletingData } = getIsAsyncRequest(
    state
  )
  const pickedNotes = getPickedNotes(state)
  const currentUser = getCurrentUser(state)
  return {
    isFetchingData,
    isUpdatingData,
    isDeletingData,
    pickedNotes,
    currentUser
  }
}

function mapDispatchToState(dispatch) {
  return {
    syncPickedNotes: notesData => dispatch(GET_PICKED_NOTES_REQUEST(notesData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(PickedNotes)
