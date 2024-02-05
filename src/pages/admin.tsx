import { useUser } from "@clerk/nextjs";
import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { api } from "~/utils/api";
import { isAdmin } from "~/utils/is-admin";

const AdminCard = ({ name, value }: { name: string; value: string }) => {
  return (
    <Card>
      <Flex direction="column" gap="2">
        <Text weight="bold">{name}:</Text>
        <Text color="gray" size="2">
          {value}
        </Text>
      </Flex>
    </Card>
  );
};

export default function AdminPage() {
  const { user, isLoaded: userIsLoaded } = useUser();

  const { data: statisticsData, isLoading: isLoadingStatistics } =
    api.admin.statistics.useQuery(undefined, {
      enabled: userIsLoaded && user !== null && isAdmin(user.publicMetadata),
    });

  if (!userIsLoaded) return <LoadingPage />;

  const userIsAdmin = user !== null && isAdmin(user.publicMetadata);

  if (!userIsAdmin)
    return <ErrorPage message="You really shouldn't be here..." />;

  if (isLoadingStatistics) return <LoadingPage />;

  if (statisticsData === undefined)
    return <ErrorPage message="Error fetching statistics" />;

  return (
    <Page>
      {/* @ts-expect-error At the time of writing, the type of columns is coming through as never */}
      <Grid columns={{ initial: "1", sm: "2", lg: "3" }} px="4" gap="4">
        <AdminCard name="Users" value={statisticsData.usersCount.toString()} />
        <AdminCard
          name="Recipe collections"
          value={statisticsData.recipeCollectionsCount.toString()}
        />
        <AdminCard
          name="Recipes"
          value={statisticsData.recipesCount.toString()}
        />
        <AdminCard
          name="Ingredients"
          value={statisticsData.ingredientsCount.toString()}
        />
      </Grid>
    </Page>
  );
}
