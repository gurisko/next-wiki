import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import {LightTheme, BaseProvider} from 'baseui';
import React from 'react';
import {Provider as StyletronProvider} from 'styletron-react';

import '../../styles/globals.css';
import {debug, styletron} from '../lib/styletron';

function MyApp({Component, pageProps}) {
  return (
    <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
