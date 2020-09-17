import {
  Field,
  FormValue,
  MultiField,
  ExternalDataProvider,
  Repeater,, ExternalData
} from '@island.is/application/template'

export interface FieldBaseProps {
  applicationId?: string
  autoFocus?: boolean
  errors: object
  field: Field
  formValue: FormValue
  externalData: ExternalData
  showFieldName?: boolean
}

export type FieldDef = {
  isNavigable?: boolean
} & Field

export type MultiFieldScreen = {
  isNavigable?: boolean
} & MultiField & {
    children: FieldDef[]
  }

export type RepeaterScreen = {
  isNavigable?: boolean
  isExpanded?: boolean
} & Repeater & {
    children: (FieldDef | MultiFieldScreen | RepeaterScreen)[]
  }

export type ExternalDataProviderScreen = {
  isNavigable: true
} & ExternalDataProvider

export type FormScreen =
  | FieldDef
  | ExternalDataProviderScreen
  | MultiFieldScreen
  | RepeaterScreen
