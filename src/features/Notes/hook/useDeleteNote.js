import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import routes from '../../../constant/routes'
import { deleteNoteRequest } from '../action/notesActions'

export default function useDeleteNote(
  note,
  setOpenDeleteDialog,
  shouldNavigateHome
) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const history = useHistory()

  const deleteNote = () => {
    const messageOnSuccess = t('notes.note.messageOnDeleteSuccess')
    const messageOnError = t('notes.note.messageOnDeleteError')
    const messageOnFileDeleteError = t('notes.note.messageOnFileDeleteError')
    const messageOnUserAccessError = t(
      'notes.note.messageOnUserNoteAccessError'
    )
    const navigateHome = shouldNavigateHome
      ? () => history.push(routes.home)
      : null

    dispatch(
      deleteNoteRequest({
        note,
        messageOnSuccess,
        messageOnError,
        messageOnFileDeleteError,
        messageOnUserAccessError,
        navigateHome
      })
    )

    setOpenDeleteDialog(false)
  }

  return deleteNote
}
