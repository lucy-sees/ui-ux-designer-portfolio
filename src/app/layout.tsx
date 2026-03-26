// Root layout for Ameli Portfolio

import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Ameli Portfolio',
  description: 'Showcasing my work and projects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}