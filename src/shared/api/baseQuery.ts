import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3300',
})
