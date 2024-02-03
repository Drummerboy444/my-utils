import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.post.hello.useQuery({ text: "from tRPC" });

  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>My Utils</title>
        <meta name="description" content="App containing useful utils" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UserButton afterSignOutUrl="/" />
        <div>{isLoaded && isSignedIn ? user.fullName : "No user"}</div>
        <div>{data?.greeting}</div>
      </main>
    </>
  );
}
