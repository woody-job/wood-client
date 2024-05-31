export const validateUser = (user: unknown): boolean => {
  const now = new Date().getTime() / 1000
  return !!(
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'login' in user &&
    'fullName' in user &&
    'role' in user &&
    'iat' in user &&
    'exp' in user &&
    user.id &&
    typeof user.id === 'number' &&
    user.login &&
    typeof user.login === 'string' &&
    user.fullName &&
    typeof user.fullName === 'string' &&
    user.role &&
    typeof user.role === 'object' &&
    'id' in user.role &&
    'name' in user.role &&
    'description' in user.role &&
    user.role.id &&
    typeof user.role.id === 'number' &&
    user.role.name &&
    typeof user.role.name === 'string' &&
    user.role.description &&
    typeof user.role.description === 'string' &&
    user.iat &&
    typeof user.iat === 'number' &&
    user.exp &&
    typeof user.exp === 'number' &&
    user.exp >= now
  )
}
