import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SET_CURRENT_VIEW_TITLE } from '../store/actions/sync-actions'

export default function useCurrentViewTitle(title) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(SET_CURRENT_VIEW_TITLE(title))

    return () => {
      dispatch(SET_CURRENT_VIEW_TITLE(''))
    }
  }, [dispatch, title])
}
