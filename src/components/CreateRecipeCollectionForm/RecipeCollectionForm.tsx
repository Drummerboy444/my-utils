import { Box, Text, TextField } from "@radix-ui/themes";

export type RecipeCollectionFormState = {
  name: string;
  description: string;
};

export const RecipeCollectionForm = ({
  formState: { name, description },
  onFormStateChange,
}: {
  formState: RecipeCollectionFormState;
  onFormStateChange: (
    formStateChange: Partial<RecipeCollectionFormState>
  ) => void;
}) => {
  return (
    <>
      <Box>
        <Text>Name:</Text>
        <TextField.Input
          value={name}
          onChange={({ target: { value } }) => {
            onFormStateChange({ name: value });
          }}
        />
      </Box>
      <Box>
        <Text>Description:</Text>
        <TextField.Input
          value={description}
          onChange={({ target: { value } }) => {
            onFormStateChange({ description: value });
          }}
        />
      </Box>
    </>
  );
};
