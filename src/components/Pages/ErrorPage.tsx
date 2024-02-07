import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout, Flex } from "@radix-ui/themes";
import { Page } from "./Page";

export const ErrorPage = ({ message }: { message: string }) => {
  return (
    <Page>
      <Flex justify="center">
        <Callout.Root color="red">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{message}</Callout.Text>
        </Callout.Root>
      </Flex>
    </Page>
  );
};
