import React, { FC, useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FieldBaseProps } from '../../../../types'
import { Typography, Box, RadioButton } from '@island.is/island-ui/core'
import Slider from './components/Slider'

import { calculateMonthly, formatValue } from './Calculator.utils'

import * as styles from './Calculator.treat'

const ParentalLeaveCalculations: FC<FieldBaseProps> = ({
  error,
  field,
  formValue,
}) => {
  const { id } = field
  const { clearErrors } = useFormContext()
  const [amount, setAmount] = useState<number>(294.037)
  const [months, setMonths] = useState<number>(6)

  useEffect(() => {
    setAmount(calculateMonthly(600000, formValue.usage, months))
  }, [months])

  return (
    <Box marginBottom={6}>
      <Typography variant="h1" color="blue400">
        {formatValue(amount)} kr.
      </Typography>
      <Typography variant="h4" as="p">
        Áætlaður réttur þinn á mánuði í{' '}
        <span className={styles.monthsLabelWrapper}>
          <span className={styles.monthsLabel}>6 mánuði</span>
        </span>{' '}
        miðað við 100% orlof.
      </Typography>
      <Typography variant="p">
        Miðað er við 80% af stærsta tekjuþættinum frá viðkomandi fyrirtæki.
      </Typography>
      <Box marginTop={8}>
        <Controller
          defaultValue=""
          name={id}
          render={({ onChange, value }) => (
            <Slider
              snap={false}
              step={1}
              min={6}
              max={24}
              currentIndex={value || months}
              onChange={(selectedMonths: number) => {
                clearErrors(id)
                onChange(selectedMonths)
                setMonths(selectedMonths)
              }}
              label={{ singular: 'mánuður', plural: 'mánuðir' }}
            />
          )}
        />
      </Box>
      <Box
        marginTop={15}
        background="blue100"
        borderRadius="large"
        width="full"
        padding={4}
      >
        <Typography variant="h5">Samþykkirðu þessa upphæð?</Typography>
        <Box display="flex" marginTop={3}>
          <Box marginRight={5}>
            <RadioButton
              // key={`${id}-${index}`}
              id="yes"
              key="yes"
              onChange={({ target }) => {
                // clearErrors(id)
                // onChange(target.value)
                // setValue(id, target.value)
              }}
              // checked={option.value === value}
              checked={false}
              // id={`${id}-${index}`}
              // name={`${id}`}
              name="yes"
              // label={option.label}
              label="Já"
              // value={option.value}
              value={1}
              // errorMessage={index === options.length - 1 ? error : undefined}
              // hasError={error !== undefined}
            />
          </Box>
          <Box>
            <RadioButton
              // key={`${id}-${index}`}
              id="no"
              key="no"
              onChange={({ target }) => {
                // clearErrors(id)
                // onChange(target.value)
                // setValue(id, target.value)
              }}
              // checked={option.value === value}
              checked={false}
              // id={`${id}-${index}`}
              // name={`${id}`}
              name="no"
              // label={option.label}
              label="Nei, vil endurskoðun"
              // value={option.value}
              value={0}
              // errorMessage={index === options.length - 1 ? error : undefined}
              // hasError={error !== undefined}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ParentalLeaveCalculations
