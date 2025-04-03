import Image from "next/image";

import { Booking } from "@/app/types/bookings";
import { StatusTag } from "@/app/components/StatusTag/StatusTag";
import { Menu } from "@/app/components/common/Menu/Menu";
import styles from "./BookingCard.module.css";

type Props = {
  booking: Booking;
  onSelectBookingToEdit: (booking: Booking) => void;
  onSelectBookingIdToDelete: (bookingId: string) => void;
};

export const BookingCard = ({
  booking,
  onSelectBookingIdToDelete,
  onSelectBookingToEdit,
}: Props) => {
  return (
    <div className={styles.bookingCard}>
      <Image
        src={booking.imageUrl || "/default-package.png"}
        alt="product"
        width={200}
        height={120}
        className={styles.productImage}
      />
      <div className={styles.content}>
        <p className={styles.item}>
          <span className={styles.title}>Id: </span> {booking.id}
        </p>
        <p className={styles.item}>
          <span className={styles.title}>Customer: </span>{" "}
          {booking.customerName}
        </p>
        <p className={styles.item}>
          <span className={styles.title}>Origin: </span> {booking.origin}
        </p>
        <p className={styles.item}>
          <span className={styles.title}>Destination: </span>{" "}
          {booking.destination}
        </p>
        <p className={styles.item}>
          <span className={styles.title}>Status: </span>{" "}
          <StatusTag status={booking.status} />
        </p>
      </div>
      <div className={styles.menuContainer}>
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
          isMobile
        />
      </div>
    </div>
  );
};
