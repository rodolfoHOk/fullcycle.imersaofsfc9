import { CacheProvider, EmotionCache } from '@emotion/react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { Navbar } from '../components/NavBar';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Navbar />
          <Container>
            <Box marginTop={1}>
              <Component {...pageProps} />
            </Box>
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
