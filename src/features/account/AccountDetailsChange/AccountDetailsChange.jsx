import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'
import AppInput from '../../../components/AppInput'
import { UPDATE_USER_ACCOUNT_DETAILS_REQUEST } from '../../../store/actions/async-actions'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

function AccountDetailsChange(props) {
  const {
    currentUser,
    isFetchingUpdateUserAccountData,
    updateUserProfile
  } = props

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors, setValue } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingUpdateUserAccountData)
  }, [isFetchingUpdateUserAccountData])

  const onSubmit = data => {
    const { displayName } = data
    const messageOnError = t('accountDetailsChange.messageOnDetailsChangeError')
    const messageOnSuccess = t(
      'accountDetailsChange.messageOnDetailsChangeSuccess'
    )
    updateUserProfile({
      displayName,
      setError,
      messageOnSuccess,
      messageOnError
    })
  }

  const displayNameInputProps = {
    id: 'displayName-input',
    label: t('accountDetailsChange.inputs.displayName.label'),
    variant: 'outlined',
    name: 'displayName',
    type: 'text',
    placeholder: t('accountDetailsChange.inputs.displayName.placeholder'),
    register: register({
      required: t('accountDetailsChange.inputs.displayName.error.required')
    }),
    error: errors.displayName,
    fullWidth: true
  }

  useEffect(() => {
    setValue('displayName', currentUser.displayName)
  }, [currentUser, setValue])

  return (
    <>
      <h3>{t('accountDetailsChange.title')}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {AppInput(displayNameInputProps)}
        <ButtonWithProgress
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          text={t('accountDetailsChange.button')}
          isLoading={isLoading}
        />

        <div className={classes.errorBar}>
          {error && <p>{t('accountDetailsChange.formError')}</p>}
        </div>
      </form>
    </>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  const { isFetchingUpdateUserAccountData } = getIsAsyncRequest(state)
  return { currentUser, isFetchingUpdateUserAccountData }
}

function mapDispatchToState(dispatch) {
  return {
    updateUserProfile: userData =>
      dispatch(UPDATE_USER_ACCOUNT_DETAILS_REQUEST(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToState
)(AccountDetailsChange)
