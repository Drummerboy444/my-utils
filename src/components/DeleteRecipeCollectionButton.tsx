import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";

export const DeleteRecipeCollectionButton = ({
  recipeCollectionId,
  refetch,
}: {
  recipeCollectionId: string;
  refetch: () => void;
}) => {
  const { mutate: deleteRecipeCollection } =
    api.recipeCollection.delete.useMutation({
      onSuccess: ({ type }) => {
        switch (type) {
          case "SUCCESS": {
            toast.success("Success!");
            refetch();
            return;
          }

          case "NO_RECIPE_COLLECTION_FOUND": {
            toast.error("This recipe book does not exist...");
            return;
          }

          case "ACCESS_DENIED": {
            toast.error(
              "You do not have permission to delete this recipe book"
            );
            return;
          }

          default: {
            absurd(type);
          }
        }
      },
      onError: () => {
        toast.error("Something went wrong, please try again later...");
      },
    });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton color="red" variant="ghost">
          <TrashIcon />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Recipe Book</Dialog.Title>

        <Dialog.Description mb="3">
          This action cannot be undone.
        </Dialog.Description>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              color="red"
              onClick={() => {
                deleteRecipeCollection({ recipeCollectionId });
              }}
            >
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
