'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Yupix Task Management</title>
        <meta name="description" content="Full-Stack Task Management Application" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
} 