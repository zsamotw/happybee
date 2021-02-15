import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { PICK_NOTE_REQUEST } from '../store/actions/async-actions'

export default function usePickNote(note) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const canPick = n => {
    const { pickers } = n
    return (
      pickers &&
      (pickers.every(p => p.uid !== currentUser.uid) || pickers.length === 0)
    )
  }

  const pickNote = () => {
    if (canPick(note)) {
      const messageOnSuccess = t('note.messageOnPickSuccess')
      const messageOnError = t('note.messageOnPickError')
      const messageOnUserPickAccessError = t(
        'note.messageOnUserPickAccessError'
      )
      dispatch(
        PICK_NOTE_REQUEST({
          note,
          messageOnSuccess,
          messageOnError,
          messageOnUserPickAccessError
        })
      )
    }
  }

  return [pickNote, canPick]
}
