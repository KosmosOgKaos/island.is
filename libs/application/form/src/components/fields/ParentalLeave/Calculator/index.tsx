import React, { FC, useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FieldBaseProps } from '../../../../types'
import { Typography, Box, RadioButton } from '@island.is/island-ui/core'
import Slider from '../components/Slider'

import { calculateMonthly, formatValue } from './Calculator.utils'

import * as styles from './Calculator.treat'
import { theme } from '@island.is/island-ui/theme'

const ParentalLeaveCalculations: FC<FieldBaseProps> = ({
  field,
  formValue,
}) => {
  const { id } = field
  const { clearErrors } = useFormContext()
  const [amount, setAmount] = useState<number>(294.037)
  const [monthsToUse] = useState<number>(formValue.usage || 1)
  const [monthsToSpread, setMonthsToSpread] = useState<number>(1)

  const maxMonths = 24

  useEffect(() => {
    setAmount(calculateMonthly(600000, monthsToUse, monthsToSpread))
  }, [monthsToSpread])

  const formatLabel = (count: number) =>
    count <= 1 ? `${count} mánuð` : `${count} mánuði`

  return (
    <Box marginBottom={6}>
      <Typography variant="h1" color="blue400">
        {formatValue(amount)} kr.
      </Typography>
      <Typography variant="h4" as="p">
        Áætlaður réttur þinn á mánuði í{' '}
        <span className={styles.monthsLabelWrapper}>
          <span className={styles.monthsLabel}>{formatLabel(monthsToUse)}</span>
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
              min={monthsToSpread}
              max={maxMonths}
              step={1}
              snap={false}
              trackStyle={{ gridTemplateRows: 8 }}
              calculateCellStyle={(index: number) => {
                const isActive =
                  (value && index < value) || index < monthsToSpread
                return {
                  background: isActive
                    ? theme.color.mint400
                    : theme.color.dark200,
                }
              }}
              showMinMaxLabels
              showToolTip
              label={{ singular: 'mánuður', plural: 'mánuðir' }}
              currentIndex={monthsToSpread}
              onChange={(selectedMonthsToSpread: number) => {
                clearErrors(id)
                onChange(selectedMonthsToSpread)
                setMonthsToSpread(selectedMonthsToSpread)
              }}
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
        <Controller
          defaultValue=""
          rules={{ required: true }}
          name={'approveSpreadCalculations'}
          render={({ onChange, value }) => (
            <Box display="flex" marginTop={3}>
              <Box marginRight={5}>
                <RadioButton
                  name="agree"
                  id="yes"
                  label="Já"
                  value={1}
                  onChange={() => {
                    clearErrors(id)
                    onChange(true)
                  }}
                  checked={value === true}
                />
              </Box>
              <Box>
                <RadioButton
                  name="agree"
                  id="no"
                  label="Nei, vil endurskoðun"
                  value={0}
                  onChange={() => {
                    clearErrors(id)
                    onChange(false)
                  }}
                  checked={value === false}
                />
              </Box>
            </Box>
          )}
        />
      </Box>
    </Box>
  )
}

export default ParentalLeaveCalculations
