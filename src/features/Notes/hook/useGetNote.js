import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { syncNoteRequest } from '../action/notesActions'
import notesStore from '../reducer/notesReducer'

const useGetNote = messageOnError => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    const noteData = { id, messageOnError }
    dispatch(syncNoteRequest(noteData))

    return () => {
      dispatch(notesStore.actions.unselectNoteSuccess())
    }
  }, [id, dispatch, messageOnError])
}

export default useGetNote
