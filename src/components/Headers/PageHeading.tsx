import { Heading } from "@radix-ui/themes";

export const PageHeading = ({ heading }: { heading: string }) => {
  return (
    <Heading size="9" as="h1">
      {heading}
    </Heading>
  );
};
