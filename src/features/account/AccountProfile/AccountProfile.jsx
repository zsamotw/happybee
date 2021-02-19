import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import AccountDetailsChange from '../AccountDetailsChange'
import PasswordChange from '../PasswordChange'
import DeleteUserPage from '../DeleteUser'
import { useCurrentViewTitle } from '../../../hooks'

export default function AccountProfile() {
  const { t } = useTranslation('common')
  useCurrentViewTitle(t('accountProfile.pageTitle'))

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={1} md={2} lg={3} />
        <Grid item xs={10} md={8} lg={6}>
          <AccountDetailsChange />
          <PasswordChange />
          <DeleteUserPage />
        </Grid>
      </Grid>
    </>
  )
}
