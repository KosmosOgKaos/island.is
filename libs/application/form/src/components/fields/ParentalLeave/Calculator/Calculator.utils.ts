const MAXIMUM_PATERNAL_MONTHLY_INCOME = 600000

export const calculateMonthly = (
  totalMonthlyIncome: number,
  monthsToUse: number,
  monthsToSpread: number,
) => {
  const paternalLeaveMonthlyIncome = Math.round(
    Math.min(MAXIMUM_PATERNAL_MONTHLY_INCOME, totalMonthlyIncome * 0.8),
  )

  const totalIncomeDuringPaternalLeave =
    paternalLeaveMonthlyIncome * monthsToUse

  return Math.round(totalIncomeDuringPaternalLeave / monthsToSpread)
}

export const formatValue = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
