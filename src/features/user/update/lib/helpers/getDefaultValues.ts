import { UserTableRow } from '@/widgets/userTable/types'

export const getDefaultValues = (user: UserTableRow) => {
  const nameArray = user.fullName.split(' ')

  const firstName = nameArray[1]
  const secondName = nameArray[0]
  const fatherName = nameArray[2]

  return {
    firstName,
    secondName,
    fatherName,
    role: user.role,
    login: user.login,
  }
}
