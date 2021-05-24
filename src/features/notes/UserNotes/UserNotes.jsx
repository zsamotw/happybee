import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { syncUserNotesRequest } from '../../../store/actions/async-actions'
import { selectIsAsyncRequest, selectUserNotes } from '../../../store/selectors'
import Note from '../Note'
import AppPreloader from '../../../components/AppPreloader'
import { useSearch, useCurrentViewTitle } from '../../../hooks'
import notesStore from '../../../store/notes-reducer'

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
  const {
    isFetchingData,
    isUpdatingData,
    isDeletingData
  } = selectIsAsyncRequest(state)
  const userNotes = selectUserNotes(state)
  return {
    isFetchingData,
    isUpdatingData,
    isDeletingData,
    userNotes
  }
}

function mapDispatchToState(dispatch) {
  return {
    syncUserNotes: notesData => dispatch(syncUserNotesRequest(notesData)),
    resetUserNotes: () => dispatch(notesStore.actions.userNotesSuccess([]))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(UserNotes)
