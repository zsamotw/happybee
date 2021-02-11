import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SET_AUTH_USER } from '../../../store/actions/sync-actions'
import Firebase from '../../../firebase'

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
      setAuthUser: authUser => dispatch(SET_AUTH_USER(authUser))
    }
  }

  return connect(null, mapDispatchToState)(WithAuthentication)
}

export default withAuthentication
