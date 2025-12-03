import Image from "next/image";
import { useMemo, useState } from "react";

import { Booking } from "@/app/types/bookings";
import { StatusTag } from "@/app/components/StatusTag/StatusTag";
import { Menu } from "@/app/components/common/Menu/Menu";
import styles from "./BookingsTable.module.css";

type SortColumn = {
  key: keyof Booking;
  order: "asc" | "desc";
};

type Props = {
  bookings: Booking[];
  onSelectBookingToEdit: (booking: Booking) => void;
  onSelectBookingIdToDelete: (bookingId: string) => void;
};

export const BookingsTable = ({
  bookings,
  onSelectBookingToEdit,
  onSelectBookingIdToDelete,
}: Props) => {
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([
    { key: "id", order: "desc" },
  ]);

  const sortedBookings = useMemo(() => {
    if (sortColumns.length === 0) return bookings;

    return [...bookings].sort((bookingA, bookingB) => {
      for (const { key, order } of sortColumns) {
        const aValue = bookingA[key] ?? "";
        const bValue = bookingB[key] ?? "";

        const comparison = aValue.localeCompare(bValue);

        if (comparison !== 0) {
          return order === "asc" ? comparison : -comparison;
        }
      }
      return 0;
    });
  }, [bookings, sortColumns]);

  const handleSort = (key: keyof Booking, isMultiSort: boolean) => {
    setSortColumns((prev) => {
      const existingIndex = prev.findIndex((col) => col.key === key);

      if (existingIndex !== -1) {
        // Column already in sort - toggle its direction
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          order: updated[existingIndex].order === "asc" ? "desc" : "asc",
        };
        return updated;
      }

      if (isMultiSort) {
        // Add as secondary sort
        return [...prev, { key, order: "asc" }];
      }

      // Replace with single column sort
      return [{ key, order: "asc" }];
    });
  };

  const getSortInfo = (column: keyof Booking) => {
    const index = sortColumns.findIndex((col) => col.key === column);
    if (index === -1) return null;
    return { priority: index + 1, order: sortColumns[index].order };
  };

  const renderSortIndicator = (column: keyof Booking) => {
    const sortInfo = getSortInfo(column);
    if (!sortInfo) return null;

    const arrow = sortInfo.order === "asc" ? "↑" : "↓";
    const priority = sortColumns.length > 1 ? sortInfo.priority : null;

    return (
      <span className={styles.sortIndicator}>
        {arrow}
        {priority && <span className={styles.sortPriority}>{priority}</span>}
      </span>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.bookingTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th
              onClick={(e) => handleSort("id", e.shiftKey)}
              className={styles.clickable}
            >
              Id {renderSortIndicator("id")}
            </th>
            <th
              onClick={(e) => handleSort("customerName", e.shiftKey)}
              className={styles.clickable}
            >
              Customer {renderSortIndicator("customerName")}
            </th>
            <th
              onClick={(e) => handleSort("origin", e.shiftKey)}
              className={styles.clickable}
            >
              Origin {renderSortIndicator("origin")}
            </th>
            <th
              onClick={(e) => handleSort("destination", e.shiftKey)}
              className={styles.clickable}
            >
              Destination {renderSortIndicator("destination")}
            </th>
            <th
              onClick={(e) => handleSort("status", e.shiftKey)}
              className={styles.clickable}
            >
              Status {renderSortIndicator("status")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <Image
                  src={booking.imageUrl || "/default-package.png"}
                  alt="product"
                  width={120}
                  height={120}
                  className={styles.productImage}
                />
              </td>
              <td>{booking.id}</td>
              <td>{booking.customerName}</td>
              <td className={styles.origin}>{booking.origin}</td>
              <td className={styles.destination}>{booking.destination}</td>
              <td>
                <StatusTag status={booking.status} />
              </td>
              <td>
                <Menu
                  items={[
                    {
                      label: "Edit",
                      onClick: () => onSelectBookingToEdit(booking),
                    },
                    {
                      label: "Delete",
                      onClick: () => onSelectBookingIdToDelete(booking.id),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
