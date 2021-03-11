import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import { Controller } from 'react-hook-form'

export default ({
  id,
  labelId,
  name,
  variant,
  menuItems,
  control,
  inputLabel,
  rules,
  error
}) => (
  <FormControl error={error} variant={variant} style={{ width: '100%' }}>
    <InputLabel id={labelId}>{inputLabel}</InputLabel>
    <Controller
      as={
        <Select labelId={labelId} id={id}>
          {menuItems.map(({ id: menuItemId, label }) => (
            <MenuItem key={menuItemId} value={menuItemId}>
              {label}
            </MenuItem>
          ))}
        </Select>
      }
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
    />
    {error && <FormHelperText>{error.message}</FormHelperText>}
  </FormControl>
)
