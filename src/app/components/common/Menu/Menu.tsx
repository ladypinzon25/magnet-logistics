import cx from "classnames";
import { useEffect, useRef, useState } from "react";

import styles from "./Menu.module.css";

type MenuItem = {
  label: string;
  onClick: () => void;
  isMobile?: boolean;
};

type Props = {
  items: MenuItem[];
  isMobile?: boolean;
};

export const Menu = ({ items, isMobile = false }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cx(styles.menuWrapper, {
        [styles.menuWrapperMobile]: isMobile,
      })}
      ref={ref}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        ⋯
      </button>

      {open && (
        <ul className={styles.menu}>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                item.onClick();
                closeMenu();
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
