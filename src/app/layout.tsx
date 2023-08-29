import Header from '@/components/Header';
import EarthImage from '@/components/EarthImage';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.scss';
const helvetica = localFont({
  src: [
    { path: './font/Helvetica.woff2', weight: '400' },
    { path: './font/Helvetica-Bold.woff2', weight: '700' },
  ],
});

export const metadata: Metadata = {
  title: 'Armageddon 2023',
  description: 'Тестовое задание для компании Квартирка',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={helvetica.className}>
        <Header />
        <div className="main" id="main">
          <EarthImage />
          {children}
        </div>
        <footer className="footer">© Все права и планета защищены</footer>
      </body>
    </html>
  );
}
