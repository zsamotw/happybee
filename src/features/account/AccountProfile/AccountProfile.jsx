import React from 'react'
import Grid from '@material-ui/core/Grid'
import AccountDetailsChange from '../AccountDetailsChange'
import PasswordChange from '../PasswordChange'
import DeleteUserPage from '../DeleteUser'

export default function AccountProfile() {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={1} md={5} />
        <Grid item xs={10} md={3}>
          <AccountDetailsChange />
          <PasswordChange />
          <DeleteUserPage />
        </Grid>
      </Grid>
    </>
  )
}
