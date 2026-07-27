import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Food Quality Classifier - AI-Powered Image Analysis',
  description: 'Upload food images and get instant AI-powered quality analysis',
  keywords: 'food, classifier, AI, image analysis, quality detection',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {children}
      </body>
    </html>
  );
}
