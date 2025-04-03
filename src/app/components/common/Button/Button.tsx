import cx from "classnames";

import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  variant: "primary" | "outline" | "transparent";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  variant,
  disabled,
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(styles.button, {
        [styles.primary]: variant === "primary",
        [styles.outline]: variant === "outline",
        [styles.transparent]: variant === "transparent",
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
