import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import appStore from '../store/app-reducer'

export default function useCurrentViewTitle(title) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(appStore.actions.currentViewTitleChange(title))

    return () => {
      dispatch(appStore.actions.currentViewTitleChange(''))
    }
  }, [dispatch, title])
}
