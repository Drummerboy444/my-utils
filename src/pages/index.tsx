import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Home() {
  const { data, isLoading } = api.recipe.getAll.useQuery();
  const { isLoaded } = useUser();

  if (!isLoaded || isLoading || data === undefined)
    return <div>Loading...</div>;

  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      {data.recipes.map((recipe) => {
        console.log(typeof recipe.name);
        return (
          <div key={recipe.id}>
            {recipe.name} - {recipe.body}
          </div>
        );
      })}
    </main>
  );
}
