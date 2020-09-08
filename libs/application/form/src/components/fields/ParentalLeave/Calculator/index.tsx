import React, { FC, useState, useEffect } from 'react'
import { FieldBaseProps } from '../../../../types'
import { Typography, Box } from '@island.is/island-ui/core'
import Slider from '../Usage/components/Slider'

import { calculateMonthly } from './Calculator.utils'

const ParentalLeaveCalculations: FC<FieldBaseProps> = ({
  error,
  field,
  formValue,
}) => {
  const [amount, setAmount] = useState<number>(294.037)
  const [months, setMonths] = useState<number>(6)

  useEffect(() => {
    setAmount(calculateMonthly(950000.0, formValue.usage, months))
  }, [months])

  return (
    <Box marginBottom={6}>
      <Typography variant="h1" color="blue400">
        {amount} kr.
      </Typography>
      <Typography variant="h5" as="p">
        Áætlaður réttur þinn á mánuði í 6 mánuði.
      </Typography>
      <Typography variant="p">
        Miðað við 80% af stærsta tekjuþættinum frá viðkomandi fyrirtæki.
      </Typography>
      <Box marginTop={8}>
        <Slider
          showLabel={false}
          showToolTip={true}
          step={1}
          totalCells={24}
          sharedCells={0}
          // min={1}
          currentIndex={months}
          onChange={(selectedMonths: number) => {
            // clearErrors(id)
            // onChange(selectedMonths)
            setMonths(selectedMonths)
          }}
          label={{ singular: 'mánuður', plural: 'mánuðir' }}
        />
      </Box>
    </Box>
  )
}

export default ParentalLeaveCalculations
