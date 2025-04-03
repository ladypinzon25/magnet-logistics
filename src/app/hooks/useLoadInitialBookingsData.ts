"use client";
import { useEffect } from "react";

import { useBookings } from "@/app/hooks/useBookings";
import { fetchBookings } from "@/app/data/fetchBookings";
import { Booking } from "@/app/types/bookings";

export const useLoadInitialBookingsData = () => {
  const { dispatch } = useBookings();

  useEffect(() => {
    const bookingsFromLocalStorage = localStorage.getItem("bookings");
    const parsedBookingsFromLocalStorage: Booking[] | undefined =
      bookingsFromLocalStorage
        ? JSON.parse(bookingsFromLocalStorage)
        : undefined;

    if (parsedBookingsFromLocalStorage?.length) {
      dispatch({
        type: "LOAD_BOOKINGS",
        payload: parsedBookingsFromLocalStorage,
      });
    } else {
      fetchBookings().then((data) => {
        dispatch({ type: "LOAD_BOOKINGS", payload: data });
        localStorage.setItem("bookings", JSON.stringify(data));
      });
    }
  }, [dispatch]);
};
