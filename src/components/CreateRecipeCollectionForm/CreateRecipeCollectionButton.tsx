import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Callout, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import {
  RecipeCollectionForm,
  type RecipeCollectionFormState,
} from "./RecipeCollectionForm";

export const CreateRecipeCollectionButton = ({
  refetch,
}: {
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState<RecipeCollectionFormState>({
    name: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    mutate: createRecipeCollection,
    isLoading: isCreatingRecipeCollection,
  } = api.recipeCollection.create.useMutation({
    onSuccess: async ({ type }) => {
      switch (type) {
        case "SUCCESS": {
          await refetch();
          setOpen(false);
          toast.success("Successfully created recipe book");
          return;
        }

        case "RECIPE_COLLECTION_ALREADY_EXISTS": {
          setErrorMessage("A recipe book with this name already exists");
          return;
        }

        case "EMPTY_NAME": {
          setErrorMessage("Name cannot be empty");
          return;
        }

        case "EMPTY_DESCRIPTION": {
          setErrorMessage("Description cannot be empty");
          return;
        }

        default: {
          absurd(type);
        }
      }
    },
    onError: () => {
      setErrorMessage(
        "Something went wrong while creating this recipe book, please try again later"
      );
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setFormState({ name: "", description: "" });
        setErrorMessage(undefined);
      }}
    >
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          New recipe book
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>New Recipe Book</Dialog.Title>

        <Flex direction="column" gap="5">
          <RecipeCollectionForm
            formState={formState}
            onFormStateChange={(formStateChange) => {
              setFormState({ ...formState, ...formStateChange });
            }}
          />

          {errorMessage !== undefined && (
            <Callout.Root color="red">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{errorMessage}</Callout.Text>
            </Callout.Root>
          )}

          <Flex gap="3" justify="end" align="center">
            {isCreatingRecipeCollection && <LoadingSpinner />}
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                disabled={isCreatingRecipeCollection}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                setErrorMessage(undefined);
                createRecipeCollection(formState);
              }}
              disabled={isCreatingRecipeCollection}
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
