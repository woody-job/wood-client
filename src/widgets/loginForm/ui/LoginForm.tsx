import { SubmitHandler, useForm } from 'react-hook-form'

import { Box, Button, TextField, Typography } from '@mui/material'

import { loginRegex } from '@/widgets/loginForm/constants'
import { LoginFormType } from '@/widgets/loginForm/model'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>()

  const handleLogin: SubmitHandler<LoginFormType> = () => {}

  return (
    <Box
      component='form'
      display='flex'
      flexDirection='column'
      p='30px'
      borderRadius='10px'
      border={theme => `1px solid ${theme.black['20']}`}
      gap='15px'
      maxWidth='500px'
      width='100%'
      onSubmit={handleSubmit(handleLogin)}
    >
      <Typography component='h1' variant='h5' textAlign='center' sx={{ mb: 4 }}>
        Вход в систему
      </Typography>

      <Box>
        <TextField
          label='Логин'
          inputProps={{
            ...register('login', {
              required: true,
              minLength: 4,
              maxLength: 16,
              pattern: loginRegex,
            }),
          }}
        />
        {errors.login?.type === 'minLength' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Минимальная длина логина - 4 символа
          </Typography>
        )}
        {errors.login?.type === 'maxLength' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Максимальная длина логина - 16 символов
          </Typography>
        )}
        {errors.login?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Поле логина обязательно для заполнения
          </Typography>
        )}
        {errors.login?.type === 'pattern' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Пароль должен содержать латинские буквы и цифры
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          label='Пароль'
          type='password'
          inputProps={{ ...register('password', { required: true, minLength: 6 }) }}
        />
        {errors.password?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Пароль обязателен
          </Typography>
        )}
        {errors.password?.type === 'minLength' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Минимальная длина пароля - 6 символов
          </Typography>
        )}
      </Box>
      <Button type='submit' sx={{ mt: 4 }}>
        Войти
      </Button>
    </Box>
  )
}
