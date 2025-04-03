import { Booking } from "@/app/types/bookings";
import { BookingCard } from "@/app/components/BookingCard/BookingCard";
import styles from "./BookingCardList.module.css";

type Props = {
  bookings: Booking[];
  onSelectBookingToEdit: (booking: Booking) => void;
  onSelectBookingIdToDelete: (bookingId: string) => void;
};

export const BookingCardList = ({
  bookings,
  onSelectBookingToEdit,
  onSelectBookingIdToDelete,
}: Props) => {
  return (
    <div className={styles.bookingCardList}>
      {bookings.map((booking) => (
        <BookingCard
          booking={booking}
          key={`${booking.id}-card`}
          onSelectBookingIdToDelete={onSelectBookingIdToDelete}
          onSelectBookingToEdit={onSelectBookingToEdit}
        />
      ))}
    </div>
  );
};
