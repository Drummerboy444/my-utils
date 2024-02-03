import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { type AppType } from "next/app";
import Head from "next/head";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Theme
        accentColor="blue"
        grayColor="mauve"
        radius="large"
        appearance="dark"
      >
        <Head>
          <title>My Utils</title>
          <meta name="description" content="App containing useful utils" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Theme>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
