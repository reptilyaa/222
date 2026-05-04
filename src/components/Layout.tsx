import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  noFooter?: boolean;
}

export default function Layout({ children, noFooter }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
    </div>
  );
}
