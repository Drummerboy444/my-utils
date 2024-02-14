import { Container, Section } from "@radix-ui/themes";
import { type PropsWithChildren } from "react";

export const Page = ({ children }: PropsWithChildren) => (
  <main>
    <Section size={{ initial: "1", sm: "2", lg: "3" }}>
      <Container size="3" px="4">
        {children}
      </Container>
    </Section>
  </main>
);
