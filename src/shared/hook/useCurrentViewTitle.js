import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import appStore from '../reducer/appReducer'

export default function useCurrentViewTitle(title) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(appStore.actions.currentViewTitleChange(title))

    return () => {
      dispatch(appStore.actions.currentViewTitleChange(''))
    }
  }, [dispatch, title])
}
