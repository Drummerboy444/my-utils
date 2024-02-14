import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import Link from "next/link";
import { CreateRecipeCollectionButton } from "~/components/CreateRecipeCollectionButton";
import { DeleteRecipeCollectionButton } from "~/components/DeleteRecipeCollectionButton";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { api } from "~/utils/api";
import { getRecipeCollectionRoute } from "~/utils/routing";

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
    <Page header="Recipe books" subheader="The place for all your recipes">
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
            <Card key={recipeCollection.id}>
              <Flex gap="2" height="100%">
                <Flex grow="1" direction="column" gap="2">
                  <Text weight="bold">{recipeCollection.name}</Text>
                  <Text color="gray" size="2">
                    {recipeCollection.description}
                  </Text>
                </Flex>

                <Flex direction="column" justify="between">
                  <DeleteRecipeCollectionButton
                    recipeCollectionId={recipeCollection.id}
                    refetch={async () => {
                      await refetchRecipeCollections();
                    }}
                  />

                  <Link
                    href={getRecipeCollectionRoute(recipeCollection.id)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton variant="ghost">
                      <ArrowRightIcon />
                    </IconButton>
                  </Link>
                </Flex>
              </Flex>
            </Card>
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
