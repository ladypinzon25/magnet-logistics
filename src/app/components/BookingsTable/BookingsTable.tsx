import Image from "next/image";
import { useMemo, useState } from "react";

import { Booking } from "@/app/types/bookings";
import { StatusTag } from "@/app/components/StatusTag/StatusTag";
import { Menu } from "@/app/components/common/Menu/Menu";
import styles from "./BookingsTable.module.css";

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
  const [sortBy, setSortBy] = useState<keyof Booking | undefined>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedBookings = useMemo(() => {
    if (!sortBy) return bookings;

    return [...bookings].sort((bookingA, bookingB) => {
      const aValue = bookingA[sortBy] ?? "";
      const bValue = bookingB[sortBy] ?? "";

      const comparison = aValue.localeCompare(bValue);

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [bookings, sortBy, sortOrder]);

  const handleSort = (key: keyof Booking) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const renderSortIndicator = (column: keyof Booking) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? "↑" : "↓";
    }

    return "";
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.bookingTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th onClick={() => handleSort("id")} className={styles.clickable}>
              Id {renderSortIndicator("id")}
            </th>
            <th
              onClick={() => handleSort("customerName")}
              className={styles.clickable}
            >
              Customer {renderSortIndicator("customerName")}
            </th>
            <th
              onClick={() => handleSort("origin")}
              className={styles.clickable}
            >
              Origin {renderSortIndicator("origin")}
            </th>
            <th
              onClick={() => handleSort("destination")}
              className={styles.clickable}
            >
              Destination {renderSortIndicator("destination")}
            </th>
            <th
              onClick={() => handleSort("status")}
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
