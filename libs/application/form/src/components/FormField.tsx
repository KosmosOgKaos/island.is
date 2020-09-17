import React, { FC } from 'react'
import { FieldDef } from '../types'
import { getComponentByName } from './componentLoader'
import { ExternalData, FormValue } from '@island.is/application/template'

const FormField: FC<{
  applicationId: string
  autoFocus?: boolean
  field: FieldDef
  externalData: ExternalData
  formValue: FormValue
  showFieldName?: boolean
  errors: object
}> = ({
  applicationId,
  autoFocus,
  errors,
  externalData,
  field,
  formValue,
  showFieldName,
}) => {
  if (!field.isNavigable) {
    return null
  }

  const fieldProps = {
    applicationId,
    autoFocus,
    errors,
    externalData,
    field,
    formValue,
    showFieldName,
  }

  const Component = getComponentByName(field.component)
  if (Component === null) {
    return <p>We have not implemented this field yet {field.type}</p>
  }

  return <Component {...fieldProps} />
}

export default FormField
