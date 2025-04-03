"use client";

import { ReactNode, useEffect } from "react";

import styles from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onCloseAction, children }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onCloseAction]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCloseAction}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onCloseAction}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
