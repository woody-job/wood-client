export type SidebarPath =
  | {
      path: string
      name: string
    }
  | {
      children: {
        path: string
        name: string
      }[]
      name: string
    }
