import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

export default function MainPage() {
  const history = useHistory()

  useEffect(() => {
    history.push(`${ROUTES.HOME}${ROUTES.NOTES}`)
  })

  return <div />
}
