import { Flex, Section, Text } from "@radix-ui/themes";
import { Page } from "~/components/Page";

export default function Custom404Page() {
  return (
    <Page>
      <Section>
        <Flex justify="center">
          <Text size="9">404</Text>
        </Flex>
      </Section>
    </Page>
  );
}
