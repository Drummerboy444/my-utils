import { UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Flex, Separator, Switch } from "@radix-ui/themes";
import Link from "next/link";
import { HOME_ROUTE, RECIPE_COLLECTIONS_ROUTE } from "~/utils/routing";

export const Header = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}) => {
  return (
    <>
      <Flex gap="2" align="center" px="4" py="2">
        <Flex gap="4">
          <Link href={HOME_ROUTE}>Home</Link>
          <Link href={RECIPE_COLLECTIONS_ROUTE}>Recipe collections</Link>
        </Flex>

        <Box grow="1"></Box>

        <SunIcon />
        <Switch
          checked={isDarkMode}
          onCheckedChange={() => {
            setIsDarkMode(!isDarkMode);
          }}
        />
        <MoonIcon />

        <UserButton afterSignOutUrl="/" />
      </Flex>

      <Separator size="4" />
    </>
  );
};
