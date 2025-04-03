"use client";

import { Modal } from "@/app/components/common/Modal/Modal";
import { useBookings } from "@/app/hooks/useBookings";
import { Button } from "@/app/components/common/Button/Button";
import styles from "./ConfirmDeletionModal.module.css";

type Props = {
  isOpen: boolean;
  onCloseModalAction: () => void;
  bookingId: string;
};

export const ConfirmDeletionModal = ({
  isOpen,
  onCloseModalAction,
  bookingId,
}: Props) => {
  const { dispatch } = useBookings();

  const onDeleteBooking = () => {
    dispatch({ type: "DELETE_BOOKING", payload: bookingId });

    onCloseModalAction();
  };

  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseModalAction}>
      <div className={styles.deleteBookingModal}>
        <h2>Delete booking</h2>
        <p className={styles.description}>
          Are you sure you want to delete this booking
        </p>
        <div className={styles.footer}>
          <Button variant="transparent" onClick={onCloseModalAction}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={onDeleteBooking}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
