import { Flex } from "@radix-ui/themes";
import { Page } from "./Page";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";

export const LoadingPage = () => {
  return (
    <Page>
      <Flex justify="center">
        <LoadingSpinner size="48" />
      </Flex>
    </Page>
  );
};
