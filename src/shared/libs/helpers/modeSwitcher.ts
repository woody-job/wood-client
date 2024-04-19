export const modeSwitcher =
  <T>(itemLight: T, itemDark: T) =>
  (mode: 'light' | 'dark'): T => {
    const itemByColorMode = {
      light: itemLight,
      dark: itemDark,
    }
    return itemByColorMode[mode]
  }
