import {
  createContext,
  Dispatch,
  FC,
  FormEventHandler,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { Box, BoxProps } from '@mui/material'

export interface EditingFormState {
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const EditingFormContext = createContext<EditingFormState | null>(null)

export const useEditingForm = () => {
  const context = useContext(EditingFormContext)
  if (!context) throw new Error('useEditingForm must be used within a EditingFormProvider')
  return context
}

export const EditingForm: FC<BoxProps<'form'>> = props => {
  const [isEditing, setIsEditing] = useState(false)
  const { onSubmit, ...restProps } = props

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setIsEditing(false)
    onSubmit && onSubmit(e)
  }

  return (
    <EditingFormContext.Provider value={{ isEditing, setIsEditing }}>
      <Box
        component='form'
        display='flex'
        alignItems='center'
        gap={1}
        onSubmit={handleSubmit}
        {...restProps}
      />
    </EditingFormContext.Provider>
  )
}
