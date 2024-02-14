import { Heading } from "@radix-ui/themes";

export const PageSubHeading = ({ subHeading }: { subHeading: string }) => {
  return (
    <Heading size="6" color="gray" as="h2">
      {subHeading}
    </Heading>
  );
};
