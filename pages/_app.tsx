import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Header, Footer } from '../components';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import { store } from '../store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/style.scss';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  type Props = StoreProvider['props'] & { children: React.ReactNode };
  const StoreProviderCasted =
    StoreProvider as unknown as React.ComponentType<Props>;

  return (
    <React.Fragment>
      <Head>
        <title>Phoenix Mint</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
        <StoreProviderCasted store={store}>
          <Header />
          <ToastContainer position="top-left" toastClassName="info-alert" />
          <Component {...pageProps} />
          <Analytics />
          <Footer />
        </StoreProviderCasted>
      </ThemeProvider>
    </React.Fragment>
  );
}
