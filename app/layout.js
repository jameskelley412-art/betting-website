import './globals.css'

export const metadata = {
  title: 'SBS Picks - Data-Driven Sports Betting',
  description: 'Professional sports betting picks using sharp market analysis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
