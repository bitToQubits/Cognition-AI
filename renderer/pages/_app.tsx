// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@gfazioli/mantine-marquee/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css'

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import { FooterSocial } from './FooterSocial';
import {HeaderSimple} from './HeaderSimple';
import { Notifications } from '@mantine/notifications';


const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <HeaderSimple />
      <Component {...pageProps} />
      <FooterSocial />
    </MantineProvider>
  );
}