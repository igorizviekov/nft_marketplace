import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Header, Footer } from '../components';
import { StoreProvider } from 'easy-peasy';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  type Props = StoreProvider['props'] & { children: React.ReactNode };
  const StoreProviderCasted =
    StoreProvider as unknown as React.ComponentType<Props>;

  return (
    <ThemeProvider attribute="class">
      <StoreProviderCasted store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StoreProviderCasted>
    </ThemeProvider>
  );
}
