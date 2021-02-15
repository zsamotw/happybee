import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SET_SEARCHBAR_CONFIG } from '../store/actions/sync-actions'

export default function useSearch() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(SET_SEARCHBAR_CONFIG({ isVisible: true }))

    return () => {
      dispatch(SET_SEARCHBAR_CONFIG({ isVisible: false }))
    }
  }, [dispatch])
}
