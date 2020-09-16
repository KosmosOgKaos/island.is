import React, { FC } from 'react'
import { TextField } from '@island.is/application/template'
import { Box, InputController } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import { useFormContext } from 'react-hook-form'
import { getValueViaPath } from '../../utils'

interface Props extends FieldBaseProps {
  field: TextField
}
const TextFormField: FC<Props> = ({
  autoFocus,
  errors,
  field,
  showFieldName,
}) => {
  const { id, name } = field
  const { clearErrors } = useFormContext()
  const error = getValueViaPath(errors, id, undefined)
  return (
    <Box paddingTop={2}>
      <InputController
        id={id}
        label={showFieldName ? name : undefined}
        autoFocus={autoFocus}
        error={error}
        onChange={() => {
          if (error) {
            clearErrors(id)
          }
        }}
      />
    </Box>
  )
}

export default TextFormField
