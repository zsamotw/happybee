import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { useCurrentViewTitle } from '../../../../shared/hook'
import categories_ from '../../../../constant/categories'
import routes from '../../../../constant/routes'
import NoteForm from '../../component/NoteForm'
import { selectIsAsyncRequest } from '../../../../shared/selector/appSelectors'
import { selectSelectedNote } from '../../selector/notesSelectors'
import { useGetNote } from '../../hook'
import { updateNoteRequest } from '../../action/notesActions'

function UpdateNote(props) {
  const { isSendingData, saveNoteRequest, note } = props
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')
  const history = useHistory()
  const { id } = useParams()
  const messageOnGetNoteError = t('notes.noteDetails.messageOnError')

  useGetNote(messageOnGetNoteError)
  useCurrentViewTitle(t('notes.updateNote.pageTitle'))

  const categories = categories_.map(category => {
    return { ...category, label: t(`data.categories.${category.slug}`) }
  })

  const updateNote = ({
    title,
    description,
    categoryId,
    createdAt,
    files,
    isPrivate
  }) => {
    const category = categories.find(c => c.id === categoryId)
    const file = files ? files[0] : null
    const messageOnSuccess = t('notes.updateNote.messageOnCreateNoteSuccess')
    const messageOnError = t('notes.updateNote.messageOnCreateNoteError')
    const messageOnFileUploadError = t(
      'notes.updateNote.messageOnFileUploadError'
    )
    const { pickers } = note
    const navigateHome = () => history.push(routes.home)
    saveNoteRequest({
      id,
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
        <h3>{t('notes.updateNote.title')}</h3>
        <h5>{t('notes.updateNote.description')}</h5>
        <NoteForm
          isSendingData={isSendingData}
          onSubmitNote={updateNote}
          error={error}
          categories={categories}
          initialValues={note}
          editMode
        />
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isSendingData } = selectIsAsyncRequest(state)
  const note = selectSelectedNote(state)
  return { isSendingData, note }
}

function mapDispatchToState(dispatch) {
  return {
    saveNoteRequest: noteData => dispatch(updateNoteRequest(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(UpdateNote)
