import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { SYNC_USER_NOTES_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest, getUserNotes } from '../../../store/selectors'
import Note from '../Note'
import AppPreloader from '../../../components/AppPreloader'
import { useSearch, useCurrentViewTitle } from '../../../hooks'
import { SET_USER_NOTES } from '../../../store/actions/sync-actions'

function UserNotes(props) {
  const {
    syncUserNotes,
    resetUserNotes,
    userNotes,
    isFetchingData,
    isUpdatingData,
    isDeletingData
  } = props

  const { t } = useTranslation('common')
  const { userUid } = useParams()

  useCurrentViewTitle(t('notes.userNotes.pageTitle'))

  useSearch()

  useEffect(() => {
    const messageOnError = t('notes.userNotes.messageOnError')
    syncUserNotes({ userUid, messageOnError })
    return () => {
      resetUserNotes()
    }
  }, [syncUserNotes, t, userUid, resetUserNotes])

  return (
    <Grid container>
      <AppPreloader
        isVisible={isFetchingData || isUpdatingData || isDeletingData}
      />
      {userNotes
        ? userNotes.map(note => <Note note={note} key={note.id} />)
        : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isFetchingData, isUpdatingData, isDeletingData } = getIsAsyncRequest(
    state
  )
  const userNotes = getUserNotes(state)
  return {
    isFetchingData,
    isUpdatingData,
    isDeletingData,
    userNotes
  }
}

function mapDispatchToState(dispatch) {
  return {
    syncUserNotes: notesData => dispatch(SYNC_USER_NOTES_REQUEST(notesData)),
    resetUserNotes: () => dispatch(SET_USER_NOTES([]))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(UserNotes)
