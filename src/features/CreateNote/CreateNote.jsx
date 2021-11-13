import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import categories_ from '../../constant/categories'
import routes from '../../constant/routes'
import { useCurrentViewTitle } from '../../shared/hook'
import NoteForm from './component/NoteForm/NoteForm'
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

  const saveNote = ({
    title,
    description,
    categoryId,
    createdAt,
    files,
    isPrivate
  }) => {
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
      isPrivate,
      navigateHome,
      setError,
      messageOnSuccess,
      messageOnError,
      messageOnFileUploadError
    })
  }

  return (
    <Grid container>
      <Grid item xs={10} md={8} lg={4}>
        <h3>{t('notes.createNote.title')}</h3>
        <h5>{t('notes.createNote.description')}</h5>
        <NoteForm
          isSendingData={isSendingData}
          onSubmitNote={saveNote}
          error={error}
          categories={categories}
        />
      </Grid>
    </Grid>
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
