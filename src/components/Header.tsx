import { UserButton } from "@clerk/nextjs";
import { AvatarIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Separator,
  Switch,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
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
  const accentColor = useThemeContext().accentColor;

  return (
    <>
      <Flex gap="2" align="center" px="4" py="2">
        <Flex gap="4">
          <Link href={HOME_ROUTE}>
            <Text {...(route === HOME_ROUTE ? { color: accentColor } : {})}>
              Home
            </Text>
          </Link>
          <Link href={RECIPE_COLLECTIONS_ROUTE}>
            <Text
              {...(route === RECIPE_COLLECTIONS_ROUTE
                ? { color: accentColor }
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

        {/*
          The user button doesn't render anything until the user has loaded.
          So, this is a workaround to ensure that the header always has a
          consistent height and doesn't flicker when the user button loads.
        */}
        <AvatarIcon width="32" height="32" />
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 16,
          }}
        >
          <UserButton afterSignOutUrl="/" />
        </div>
      </Flex>

      <Separator size="4" />
    </>
  );
};
