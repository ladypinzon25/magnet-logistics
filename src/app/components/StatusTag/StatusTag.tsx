import cx from "classnames";

import { Status } from "@/app/types/bookings";
import styles from "./StatusTag.module.css";

export const StatusTag = ({ status }: { status: Status }) => {
  return (
    <span
      className={cx(styles.status, {
        [styles.pending]: status === "pending",
        [styles.inTransit]: status === "in-transit",
        [styles.delivered]: status === "delivered",
        [styles.cancelled]: status === "cancelled",
      })}
    >
      {status}
    </span>
  );
};
