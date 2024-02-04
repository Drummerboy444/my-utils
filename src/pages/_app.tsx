import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { type AppType } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Header } from "~/components/Header";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ClerkProvider
      {...pageProps}
      {...(isDarkMode ? { appearance: { baseTheme: dark } } : {})}
    >
      <Theme appearance={isDarkMode ? "dark" : "light"}>
        <Head>
          <title>My Utils</title>
          <meta name="description" content="App containing useful utils" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Component {...pageProps} />
      </Theme>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
