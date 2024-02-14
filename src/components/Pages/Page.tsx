import { Box, Container, Heading, Section } from "@radix-ui/themes";
import { type PropsWithChildren } from "react";

export const Page = ({
  children,
  header,
  subheader,
}: PropsWithChildren & {
  header?: string;
  subheader?: string;
}) => (
  <main>
    <Section size={{ initial: "1", sm: "2", lg: "3" }}>
      <Container size="3" px="4">
        {header !== undefined && (
          <Box pb="6">
            <Heading size="9" as="h1">
              {header}
            </Heading>
            {subheader !== undefined && (
              <Heading size="6" color="gray" as="h2">
                {subheader}
              </Heading>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Section>
  </main>
);
