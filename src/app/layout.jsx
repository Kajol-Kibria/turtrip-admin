import './globals.css';

export const metadata = {
  title: 'Manjaro Admin Panel',
  description: 'Comprehensive administrative dashboard for Manjaro, managing users, guides, bookings, payments, and content moderation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
