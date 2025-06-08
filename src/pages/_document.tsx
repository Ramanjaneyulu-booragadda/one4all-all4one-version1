import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {/* 🔥 Load env.js before the app starts */}
        <script src="/env.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
