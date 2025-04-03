import { SelectHTMLAttributes, forwardRef } from "react";

import styles from "./Select.module.css";

type Option = {
  label: string;
  value: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  label?: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  (
    {
      options,
      label,
      placeholder = "Select an option",
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className={styles.selectWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <select ref={ref} className={`${styles.select} ${className}`} {...rest}>
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
