import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";

export const NewRecipeCollectionButton = ({
  refetch,
}: {
  refetch: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: createRecipeCollection } =
    api.recipeCollection.create.useMutation({
      onSuccess: ({ type }) => {
        switch (type) {
          case "SUCCESS": {
            toast.success("Success!");
            refetch();
            return;
          }

          case "RECIPE_COLLECTION_ALREADY_EXISTS": {
            toast.error("This recipe book already exists");
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
    <Dialog.Root
      onOpenChange={() => {
        setName("");
        setDescription("");
      }}
    >
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          New
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>New Recipe Book</Dialog.Title>

        <Flex direction="column" gap="5">
          <Box>
            <Text>Name:</Text>
            <TextField.Input
              value={name}
              onChange={({ target: { value } }) => {
                setName(value);
              }}
            />
          </Box>
          <Box>
            <Text>Description:</Text>
            <TextField.Input
              value={description}
              onChange={({ target: { value } }) => {
                setDescription(value);
              }}
            />
          </Box>

          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={() => {
                  createRecipeCollection({ name, description });
                }}
              >
                Create
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
