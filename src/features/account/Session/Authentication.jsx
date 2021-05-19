import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Firebase from '../../../firebase'
import appStore from '../../../store/app-reducer'

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const { setAuthUser } = props

    useEffect(() => {
      const unsubscribe = Firebase.onAuthUserListener(
        user => {
          const currentUser = Firebase.transformDbUserToSafeUser(user)
          setAuthUser(currentUser)
        },

        () => {
          setAuthUser(null)
        }
      )
      return () => {
        unsubscribe()
      }
    })

    return <Component {...props} />
  }

  function mapDispatchToState(dispatch) {
    return {
      setAuthUser: authUser =>
        dispatch(appStore.actions.authUserSuccess(authUser))
    }
  }

  return connect(null, mapDispatchToState)(WithAuthentication)
}

export default withAuthentication
