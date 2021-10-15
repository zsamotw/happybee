import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { selectUserNotes } from '../../selector/notesSelectors'
import Note from '../../component/Note'
import HBPreloader from '../../../../shared/component/HBPreloader'
import { useSearch, useCurrentViewTitle } from '../../../../shared/hook'
import notesStore from '../../reducer/notesReducer'
import { syncUserNotesRequest } from '../../action/notesActions'
import { selectIsAsyncRequest } from '../../../../shared/selector/appSelectors'

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
      <HBPreloader
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
