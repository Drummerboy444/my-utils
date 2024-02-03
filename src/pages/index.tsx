import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.post.hello.useQuery({ text: "from tRPC" });

  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      <div>{isLoaded && isSignedIn ? user.fullName : "No user"}</div>
      <div>{data?.greeting}</div>
    </main>
  );
}
