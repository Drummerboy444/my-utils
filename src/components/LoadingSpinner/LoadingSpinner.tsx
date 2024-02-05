import { CookieIcon } from "@radix-ui/react-icons";
import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner = ({ size }: { size?: string }) => {
  return (
    <CookieIcon
      className={styles.rotate}
      {...(size === undefined ? {} : { width: size, height: size })}
    />
  );
};
