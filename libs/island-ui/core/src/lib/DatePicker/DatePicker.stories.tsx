import React from 'react'
import { DatePicker } from './DatePicker'

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
}

export const Basic = () => {
  return (
    <DatePicker
      label="Date"
      placeholderText="Pick a date"
      minDate={new Date()}
      handleChange={(date: Date) => console.log(date)}
    />
  )
}

export const Locales = () => {
  return (
    <>
      <div
        style={{
          width: 530,
          marginBottom: 32,
          marginTop: 200,
          marginLeft: 200,
        }}
      >
        <DatePicker
          label="Dagsetning"
          placeholderText="Veldu dagsetningu"
          locale="is"
          handleChange={(date: Date) => console.log(date)}
        />
      </div>
      <div>
        <DatePicker
          label="Data"
          placeholderText="Wybierz datę"
          locale="pl"
          handleChange={(date: Date) => console.log(date)}
        />
      </div>
    </>
  )
}
