import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import appStore from '../store/app-reducer'

export default function useSearch() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(appStore.actions.searchBarConfigChange({ isVisible: true }))

    return () => {
      dispatch(appStore.actions.searchBarConfigChange({ isVisible: false }))
    }
  }, [dispatch])
}
