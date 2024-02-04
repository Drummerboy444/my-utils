import { ClerkProvider } from "@clerk/nextjs";
import { Switch, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { type AppType } from "next/app";
import Head from "next/head";
import { useState } from "react";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ClerkProvider {...pageProps}>
      <Theme appearance={isDarkMode ? "dark" : "light"}>
        <Head>
          <title>My Utils</title>
          <meta name="description" content="App containing useful utils" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Switch
          checked={isDarkMode}
          onCheckedChange={() => {
            setIsDarkMode(!isDarkMode);
          }}
        />
        <Component {...pageProps} />
      </Theme>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
