import { Box } from "@radix-ui/themes";
import { PageHeading } from "~/components/Headers/PageHeading";
import { PageSubHeading } from "~/components/Headers/PageSubHeading";
import { Page } from "~/components/Pages/Page";

export default function HomePage() {
  return (
    <Page>
      <Box pb="6">
        <PageHeading heading="Home page" />
        <PageSubHeading subHeading="There's not much here yet..." />
      </Box>
    </Page>
  );
}
