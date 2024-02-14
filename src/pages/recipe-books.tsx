import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { CreateRecipeCollectionButton } from "~/components/CreateRecipeCollectionForm/CreateRecipeCollectionButton";
import { EditRecipeCollectionButton } from "~/components/CreateRecipeCollectionForm/EditRecipeCollectionButton";
import { DeleteRecipeCollectionButton } from "~/components/DeleteRecipeCollectionButton";
import { PageHeading } from "~/components/Headers/PageHeading";
import { PageSubHeading } from "~/components/Headers/PageSubHeading";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { api } from "~/utils/api";
import { getRecipeCollectionRoute } from "~/utils/routing";

const RecipeCollectionCard = ({
  id,
  name,
  description,
  refetch,
}: {
  id: string;
  name: string;
  description: string;
  refetch: () => Promise<void>;
}) => {
  return (
    <Card>
      <Flex gap="2" direction="column">
        <Flex gap="3" align="center">
          <Link style={{ flexGrow: 1 }} href={getRecipeCollectionRoute(id)}>
            <Text weight="bold">{name}</Text>
          </Link>

          <EditRecipeCollectionButton
            recipeCollectionId={id}
            defaultValues={{ name, description }}
            refetch={refetch}
          />

          <DeleteRecipeCollectionButton
            recipeCollectionId={id}
            refetch={refetch}
          />
        </Flex>

        <Link href={getRecipeCollectionRoute(id)}>
          <Text color="gray" size="2">
            {description}
          </Text>
        </Link>
      </Flex>
    </Card>
  );
};

export default function RecipeCollectionsPage() {
  const {
    data: recipeCollectionData,
    isLoading: isLoadingRecipeCollections,
    refetch: refetchRecipeCollections,
  } = api.recipeCollection.getAll.useQuery();

  if (isLoadingRecipeCollections) return <LoadingPage />;

  if (recipeCollectionData === undefined)
    return (
      <ErrorPage message="We couldn't find your recipe books, please try again later" />
    );

  return (
    <Page>
      <Box pb="6">
        <PageHeading heading="Recipe books" />
        <PageSubHeading subHeading="The place for all your recipes" />
      </Box>

      <Box pb="6">
        <CreateRecipeCollectionButton
          refetch={async () => {
            await refetchRecipeCollections();
          }}
        />
      </Box>

      {recipeCollectionData.recipeCollections.length > 0 ? (
        // @ts-expect-error At the time of writing, the type of columns is coming through as never
        <Grid gap="4" columns={{ initial: "1", sm: "2", lg: "3" }}>
          {recipeCollectionData.recipeCollections.map((recipeCollection) => (
            <RecipeCollectionCard
              key={recipeCollection.id}
              id={recipeCollection.id}
              name={recipeCollection.name}
              description={recipeCollection.description}
              refetch={async () => {
                await refetchRecipeCollections();
              }}
            />
          ))}
        </Grid>
      ) : (
        <Text color="gray" style={{ fontStyle: "italic" }}>
          You don&apos;t have any recipe books...
        </Text>
      )}
    </Page>
  );
}
