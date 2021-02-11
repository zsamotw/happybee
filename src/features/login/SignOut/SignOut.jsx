import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { LOGOUT_REQUEST } from '../../../store/actions/async-actions'

const SignOutButton = ({ logout }) => {
  const { t } = useTranslation('common')

  return (
    <button type="button" onClick={logout}>
      {t('signOut.title')}
    </button>
  )
}

const mapDispatchToState = dispatch => {
  return {
    logout: () => dispatch(LOGOUT_REQUEST())
  }
}

export default connect(null, mapDispatchToState)(SignOutButton)
