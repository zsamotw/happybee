import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../../../constant/routes'

export default function MainPage() {
  const history = useHistory()

  useEffect(() => {
    history.push(`${routes.home}${routes.notes}`)
  })

  return <div />
}
