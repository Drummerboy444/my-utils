import { UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Flex, Separator, Switch } from "@radix-ui/themes";

export const Header = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}) => {
  return (
    <>
      <Flex justify="end" gap="2" align="center" p="2">
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
