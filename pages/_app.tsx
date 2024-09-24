import "@/styles/globals.css";
import type { AppProps } from "next/app";

import 'dotenv/config';

console.log('TEST ' + process.env.POSTGRES_HOST);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
