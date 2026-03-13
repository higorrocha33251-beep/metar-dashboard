import './globals.css';

export const metadata = {
  title: 'METAR Command Center',
  description: 'Monitoramento meteorológico em tempo real',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-950">{children}</body>
    </html>
  );
}
