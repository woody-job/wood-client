import { FC, Fragment, ReactNode } from 'react'

import { Button, TextField } from '@mui/material'

import { useEditingForm } from './EditingForm.tsx'

export interface EditingFormProps {
  value?: string
  children: ReactNode
  staticField?: ReactNode
  buttonSave?: ReactNode
  renderButtonEdit?: (onClick: () => void) => ReactNode
}

export const EditingField: FC<EditingFormProps> = props => {
  const { children, staticField, buttonSave, renderButtonEdit, value } = props

  const { setIsEditing, isEditing } = useEditingForm()

  const handleEdit = () => setIsEditing(prev => !prev)

  return (
    <>
      {isEditing ? (
        <Fragment key='editing-field'>{children}</Fragment>
      ) : (
        <Fragment key='static-field'>
          {staticField ?? <TextField fullWidth={false} value={value} disabled />}
        </Fragment>
      )}

      {isEditing ? (
        <Fragment key='button-save'>
          {buttonSave ?? (
            <Button size='small' type='submit'>
              Сохранить
            </Button>
          )}
        </Fragment>
      ) : (
        <Fragment key='button-edit'>
          {renderButtonEdit ? (
            renderButtonEdit(handleEdit)
          ) : (
            <Button size='small' variant='gray' onClick={handleEdit}>
              Редактировать
            </Button>
          )}
        </Fragment>
      )}
    </>
  )
}
