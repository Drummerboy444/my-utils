import { HomeIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { Page } from "~/components/Pages/Page";

export default function HomePage() {
  return (
    <Page>
      <Flex align="center" gap="2">
        <HomeIcon />
        <Text>This is the home page...</Text>
      </Flex>
    </Page>
  );
}
