import { inter } from '../lib/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} antialiased`}>{children}</div>
  );

}

{/*
  <html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
  </html>
*/}
