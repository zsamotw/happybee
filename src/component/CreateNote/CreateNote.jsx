import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import categories_ from '../../constant/categories'
import routes from '../../constant/routes'
import { useCurrentViewTitle } from '../../shared/hook'
import CreateNoteForm from './component/CreateNoteForm/CreateNoteForm'
import { selectIsAsyncRequest } from '../../shared/selector/appSelectors'
import { createNoteRequest } from './action/createNoteActions'

function CreateNote(props) {
  const { isSendingData, saveNoteRequest } = props
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')
  const history = useHistory()

  useCurrentViewTitle(t('notes.createNote.pageTitle'))

  const categories = categories_.map(category => {
    return { ...category, label: t(`data.categories.${category.slug}`) }
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
  const { isSendingData } = selectIsAsyncRequest(state)
  return { isSendingData }
}

function mapDispatchToState(dispatch) {
  return {
    saveNoteRequest: noteData => dispatch(createNoteRequest(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(CreateNote)
