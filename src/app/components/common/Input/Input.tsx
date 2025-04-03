import { InputHTMLAttributes, forwardRef } from "react";

import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, className = "", ...rest }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input ref={ref} className={`${styles.input} ${className}`} {...rest} />
      </div>
    );
  }
);

Input.displayName = "Input";
