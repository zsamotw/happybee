import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import categories_ from '../../../constants/categories'
import routes from '../../../constants/routes'
import { useCurrentViewTitle } from '../../../hooks'
import { CREATE_NOTE_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest } from '../../../store/selectors'
import CreateNoteForm from './CreateNoteForm'

function CreateNote(props) {
  const { isSendingData, saveNoteRequest } = props
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')
  const history = useHistory()

  useCurrentViewTitle(t('notes.createNote.pageTitle'))

  const categories = categories_.map(c => {
    return { ...c, label: t(`data.categories.${c.slug}`) }
  })

  const saveNote = ({ title, description, categoryId, createdAt, files }) => {
    const category = categories.find(c => c.id === categoryId)
    const file = files ? files[0] : null
    const messageOnSuccess = t('notes.createNote.messageOnCreateNoteSuccess')
    const messageOnError = t('notes.createNote.messageOnCreateNoteError')
    const messageOnFileUploadError = t(
      'notes.createNote.messageOnFileUploadError'
    )
    const pickers = []
    const navigateHome = () => history.push(routes.home)
    saveNoteRequest({
      title,
      description,
      category,
      createdAt: new Date(createdAt),
      pickers,
      file,
      navigateHome,
      setError,
      messageOnSuccess,
      messageOnError,
      messageOnFileUploadError
    })
  }

  return (
    <div>
      <CreateNoteForm
        isSendingData={isSendingData}
        onCreateNote={saveNote}
        error={error}
        categories={categories}
      />
    </div>
  )
}

function mapStateToProps(state) {
  const { isSendingData } = getIsAsyncRequest(state)
  return { isSendingData }
}

function mapDispatchToState(dispatch) {
  return {
    saveNoteRequest: noteData => dispatch(CREATE_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(CreateNote)
