"use client";
import { useContext } from "react";

import { BookingContext } from "@/app/context/BookingContext";

export const useBookings = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "Check if useBookings is used within the BookingProvider component"
    );
  }

  return context;
};
