import { Status } from "@/app/types/bookings";
import { statusOptions } from "@/app/utils/constants";

import styles from "./StatusFilter.module.css";

type Props = {
  selectedStatus: Status | "";
  onStatusChange: (status: Status | "") => void;
};

export const StatusFilter = ({ selectedStatus, onStatusChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as Status | "");
  };

  return (
    <div className={styles.statusFilter}>
      <select
        value={selectedStatus}
        onChange={handleChange}
        className={styles.select}
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {selectedStatus && (
        <button
          className={styles.clearButton}
          onClick={() => onStatusChange("")}
          aria-label="Clear status filter"
        >
          Clear
        </button>
      )}
    </div>
  );
};