export const theme = {
  colors: {
    primary: '#38b6ff',
    primaryLight: '#8cd8ff',
    primaryDark: '#0291e2',
    secondary: '#ff8c38',
    secondaryDark: '#e26c00',
    secondaryLight: '#ffd0b0',
    success: '#38d39f',
    warning: '#ffd233',
    error: '#ff5c5c',
    info: '#38b6ff',
    textPrimary: '#1e1e1e',
    textSecondary: '#5f5f5f',
    border: '#e0e0e0',
    background: '#ffffff',
    mutedBg: '#f7f9fb',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal' as const,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme; 