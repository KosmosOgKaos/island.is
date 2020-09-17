import React, { FC } from 'react'
import { SelectField } from '@island.is/application/template'
import { SelectController, Typography, Box } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import { getValueViaPath } from '../../utils'

interface Props extends FieldBaseProps {
  field: SelectField
}
const SelectFormField: FC<Props> = ({
  errors,
  showFieldName = false,
  field,
}) => {
  const { id, name, options, placeholder, disabled } = field

  return (
    <div>
      {showFieldName && <Typography variant="p">{name}</Typography>}
      <Box paddingTop={2}>
        <SelectController
          label={name}
          name={id}
          error={getValueViaPath(errors, id, undefined)}
          disabled={disabled}
          id={id}
          options={options}
          placeholder={placeholder}
        />
      </Box>
    </div>
  )
}

export default SelectFormField
