import { useAppSelector } from '@/app/store.ts'

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth)
  return auth.user
}
