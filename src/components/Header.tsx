import { UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Flex, Switch } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const Header = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}) => {
  return (
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
  );
};
