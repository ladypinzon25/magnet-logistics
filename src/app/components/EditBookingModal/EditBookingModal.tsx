"use client";

import { useForm } from "react-hook-form";

import { Modal } from "@/app/components/common/Modal/Modal";
import { Booking } from "@/app/types/bookings";
import { useBookings } from "@/app/hooks/useBookings";
import { Button } from "@/app/components/common/Button/Button";
import { Input } from "@/app/components/common/Input/Input";
import { Select } from "@/app/components/common/Select/Select";
import { statusOptions } from "@/app/utils/constants";
import styles from "./EditBookingModal.module.css";

type EditBookingFormValues = {
  customerName: string;
  origin: string;
  destination: string;
  status: Booking["status"];
  imageUrl: string;
};

type Props = {
  isOpen: boolean;
  onCloseModalAction: () => void;
  booking: Booking;
};

export const EditBookingModal = ({
  isOpen,
  onCloseModalAction,
  booking,
}: Props) => {
  const { dispatch } = useBookings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditBookingFormValues>({
    defaultValues: booking,
  });

  // // Make sure the form updates when booking changes (e.g., switching between rows)
  // useEffect(() => {
  //   reset(booking);
  // }, [booking, reset]);

  const onSubmit = (data: EditBookingFormValues) => {
    dispatch({
      type: "UPDATE_BOOKING",
      payload: { ...booking, ...data },
    });

    reset();
    onCloseModalAction();
  };

  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseModalAction}>
      <div className={styles.editBookingModal}>
        <h2>Edit booking</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fieldContainer}>
            <Input
              {...register("customerName", {
                required: "Required",
                minLength: {
                  value: 2,
                  message: "Customer name must be at least 2 characters",
                },
              })}
              placeholder="Customer Name"
            />
            {errors.customerName && (
              <p className={styles.error}>{errors.customerName?.message}</p>
            )}
          </div>

          <div className={styles.fieldContainer}>
            <Input
              {...register("origin", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Only letters and spaces are allowed",
                },
              })}
              placeholder="Origin"
            />
            {errors.origin && (
              <p className={styles.error}>{errors.origin?.message}</p>
            )}
          </div>

          <div className={styles.fieldContainer}>
            <Input
              {...register("destination", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Only letters and spaces are allowed",
                },
              })}
              placeholder="Destination"
            />
            {errors.destination && (
              <p className={styles.error}>{errors.destination?.message}</p>
            )}
          </div>

          <div className={styles.fieldContainer}>
            <Select
              {...register("status", { required: "Required" })}
              options={statusOptions}
              placeholder="Select status"
            />
            {errors.status && (
              <p className={styles.error}>{errors.status?.message}</p>
            )}
          </div>

          <div className={styles.fieldContainer}>
            <Input
              {...register("imageUrl", {
                validate: (value) =>
                  !value ||
                  /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(value) ||
                  "Enter a valid image URL (jpg, png, svg, etc.)",
              })}
              placeholder="Image URL (Optional)"
            />
            {errors.imageUrl && (
              <p className={styles.error}>{errors.imageUrl?.message}</p>
            )}
          </div>

          <div className={styles.footer}>
            <Button variant="transparent" onClick={onCloseModalAction}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!isDirty}>
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
