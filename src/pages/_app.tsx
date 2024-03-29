import type { AppProps, AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import trpc from "@/lib/trpc";

const App: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
