"use client";

import { useForm } from "react-hook-form";

import { Modal } from "@/app/components/common/Modal/Modal";
import { Booking } from "@/app/types/bookings";
import { useBookings } from "@/app/hooks/useBookings";
import { Button } from "@/app/components/common/Button/Button";
import { Input } from "@/app/components/common/Input/Input";
import { Select } from "@/app/components/common/Select/Select";
import { statusOptions } from "@/app/utils/constants";
import styles from "./AddBookingModal.module.css";

type AddBookingFormValues = {
  customerName: string;
  origin: string;
  destination: string;
  status: Booking["status"];
  imageUrl: string;
};

type Props = {
  isOpen: boolean;
  onCloseModalAction: () => void;
};

export const AddBookingModal = ({ isOpen, onCloseModalAction }: Props) => {
  const { dispatch } = useBookings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookingFormValues>();

  const onSubmit = (data: AddBookingFormValues) => {
    const newBooking: Booking = {
      id: `#${Date.now()}`,
      ...data,
    };

    dispatch({ type: "CREATE_BOOKING", payload: newBooking });

    reset();
    onCloseModalAction();
  };

  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseModalAction}>
      <div className={styles.addBookingModal}>
        <h2>Add a booking</h2>
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
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
