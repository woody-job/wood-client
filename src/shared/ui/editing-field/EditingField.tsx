import { FC, Fragment, ReactNode } from 'react'
import { useEditingForm } from './EditingForm.tsx'
import { Button, TextField } from '@mui/material'

export interface EditingFormProps {
  value?: string
  renderEditingField: (ref: <T extends HTMLElement>(node: T) => void) => ReactNode
  staticField?: ReactNode
  buttonSave?: ReactNode
  renderButtonEdit?: (onClick: () => void) => ReactNode
}

export const EditingField: FC<EditingFormProps> = props => {
  const { renderEditingField, staticField, buttonSave, renderButtonEdit, value } = props

  const { setIsEditing, isEditing } = useEditingForm()

  const handleEdit = () => setIsEditing(prev => !prev)

  const focusRef = (node: HTMLElement) => node?.focus()

  return (
    <>
      {isEditing ? (
        <Fragment key='editing-field'>{renderEditingField(focusRef)}</Fragment>
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
