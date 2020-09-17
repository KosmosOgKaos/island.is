import React, { FC } from 'react'
import { RadioField } from '@island.is/application/template'
import { Typography, Box, RadioController } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import { getValueViaPath } from '../../utils'

interface Props extends FieldBaseProps {
  field: RadioField
}
const RadioFormField: FC<Props> = ({
  showFieldName = false,
  field,
  errors,
  formValue,
}) => {
  const { disabled, id, name, options } = field
  return (
    <div>
      {showFieldName && <Typography variant="p">{name}</Typography>}
      <Box paddingTop={2}>
        <RadioController
          id={id}
          error={getValueViaPath(errors, id, undefined)}
          disabled={disabled}
          name={`${id}`}
          defaultValue={getValueViaPath(formValue, id)}
          options={options}
        />
      </Box>
    </div>
  )
}

export default RadioFormField
