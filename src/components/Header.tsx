import { UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Flex, Separator, Switch, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { HOME_ROUTE, RECIPE_COLLECTIONS_ROUTE } from "~/utils/routing";

export const Header = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}) => {
  const { route } = useRouter();

  return (
    <>
      <Flex gap="2" align="center" px="4" py="2">
        <Flex gap="4">
          <Link href={HOME_ROUTE}>
            {/* @ts-expect-error This should set the accent colour, but the types don't line up at the moment */}
            <Text {...(route === HOME_ROUTE ? { color: "accent" } : {})}>
              Home
            </Text>
          </Link>
          <Link href={RECIPE_COLLECTIONS_ROUTE}>
            {/* @ts-expect-error This should set the accent colour, but the types don't line up at the moment */}
            <Text
              {...(route === RECIPE_COLLECTIONS_ROUTE
                ? { color: "accent" }
                : {})}
            >
              Recipe Books
            </Text>
          </Link>
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
