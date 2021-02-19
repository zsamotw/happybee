import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TOGGLE_PICK_NOTE_REQUEST } from '../store/actions/async-actions'

export default function usePickNote(note) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const isPicked = n => {
    const { pickers } = n
    return pickers && pickers.some(p => p.uid === currentUser.uid)
  }

  const pickNote = () => {
    const messageOnError = t('notes.note.messageOnPickError')
    dispatch(
      TOGGLE_PICK_NOTE_REQUEST({
        note,
        messageOnError
      })
    )
  }

  return [pickNote, isPicked]
}
