import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { GET_NOTE_REQUEST } from '../../../store/actions/async-actions'
import { getSelectedNote } from '../../../store/selectors'

function NoteDetails(props) {
  const { getNote, note } = props
  const { t } = useTranslation('common')
  const { id } = useParams()

  const messageOnError = t('noteDetails.messageOnError')

  useEffect(() => {
    const noteData = { id, messageOnError }
    getNote(noteData)
  }, [id, getNote, messageOnError])

  return <div>NoteView: {JSON.stringify(note)}</div>
}

function mapStateToProps(state) {
  const note = getSelectedNote(state)
  return { note }
}

function mapDispatchToState(dispatch) {
  return {
    getNote: noteData => dispatch(GET_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NoteDetails)
