export interface DescriptionsSchema {
  span?: number // How many column units it spans
  field: string // Field name
  label?: string // Label name
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    label?: (...args: any[]) => JSX.Element | null
  }
}
