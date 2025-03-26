import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
} 