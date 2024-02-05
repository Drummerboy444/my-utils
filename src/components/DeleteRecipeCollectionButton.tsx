import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";

export const DeleteRecipeCollectionButton = ({
  recipeCollectionId,
  refetch,
}: {
  recipeCollectionId: string;
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const {
    mutate: deleteRecipeCollection,
    isLoading: isDeletingRecipeCollection,
  } = api.recipeCollection.delete.useMutation({
    onSuccess: async ({ type }) => {
      switch (type) {
        case "SUCCESS": {
          await refetch();
          setOpen(false);
          toast.success("Successfully deleted recipe book");
          return;
        }

        case "NO_RECIPE_COLLECTION_FOUND": {
          toast.error("This recipe book does not exist");
          return;
        }

        case "ACCESS_DENIED": {
          toast.error("You do not have permission to delete this recipe book");
          return;
        }

        default: {
          absurd(type);
        }
      }
    },
    onError: () => {
      toast.error(
        "Something went wrong while deleting this recipe book, please try again later"
      );
    },
  });

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <IconButton color="red" variant="ghost">
          <TrashIcon />
        </IconButton>
      </AlertDialog.Trigger>

      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Recipe Book</AlertDialog.Title>

        <AlertDialog.Description mb="3">
          This action cannot be undone.
        </AlertDialog.Description>

        <Flex gap="3" justify="end" align="center">
          {isDeletingRecipeCollection && <LoadingSpinner />}
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              disabled={isDeletingRecipeCollection}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            color="red"
            onClick={() => {
              deleteRecipeCollection({ recipeCollectionId });
            }}
            disabled={isDeletingRecipeCollection}
          >
            Delete
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
