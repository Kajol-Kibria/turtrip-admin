import './globals.css';

export const metadata = {
  title: 'Manjaro Admin',
  description: 'Multirole Management System',
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
