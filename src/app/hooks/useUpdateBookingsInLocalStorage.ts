"use client";
import { useEffect } from "react";

import { useBookings } from "@/app/hooks/useBookings";

export const useUpdateBookingsInLocalStorage = () => {
  const { state } = useBookings();

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(state.bookings));
  }, [state.bookings]);
};
