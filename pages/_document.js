import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="  h-[100vh]">
      <Head />

      <body className={" antialiased"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
