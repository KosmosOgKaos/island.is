import React, { FC } from 'react'
import FormField from './FormField'
import { MultiFieldScreen } from '../types'
import { Box } from '@island.is/island-ui/core'
import { ExternalData, FormValue } from '@island.is/application/template'
import ConditionHandler from './ConditionHandler'

const FormMultiField: FC<{
  applicationId: string
  errors: object
  externalData: ExternalData
  formValue: FormValue
  multiField: MultiFieldScreen
  answerQuestions(Answers): void
}> = ({
  applicationId,
  answerQuestions,
  errors,
  externalData,
  formValue,
  multiField,
}) => {
  return (
    <div>
      <ConditionHandler
        answerQuestions={answerQuestions}
        formValue={formValue}
        screen={multiField}
      />
      {multiField.children.map((field, index) => (
        <Box key={field.id} paddingTop={2}>
          <FormField
            applicationId={applicationId}
            showFieldName
            field={field}
            key={field.id}
            autoFocus={index === 0}
            errors={errors}
            externalData={externalData}
            formValue={formValue}
          />
        </Box>
      ))}
    </div>
  )
}

export default FormMultiField
