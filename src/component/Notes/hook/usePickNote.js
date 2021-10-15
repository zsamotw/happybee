import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { togglePickNoteRequest } from '../action/notesActions'

export default function usePickNote(note) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.app.currentUser)

  const isPicked = n => {
    const { pickers } = n
    return pickers && pickers.some(p => p.uid === currentUser.uid)
  }

  const pickNote = () => {
    const messageOnError = t('notes.note.messageOnPickError')
    dispatch(
      togglePickNoteRequest({
        note,
        messageOnError
      })
    )
  }

  return [pickNote, isPicked]
}
