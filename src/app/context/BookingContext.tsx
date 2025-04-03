"use client";

import { createContext, useReducer, ReactNode } from "react";
import { Booking } from "@/app/types/bookings";

type BookingAction =
  | { type: "LOAD_BOOKINGS"; payload: Booking[] }
  | { type: "CREATE_BOOKING"; payload: Booking }
  | { type: "DELETE_BOOKING"; payload: string }
  | { type: "UPDATE_BOOKING"; payload: Booking };

type BookingState = {
  bookings: Booking[];
};

const initialState: BookingState = {
  bookings: [],
};

export const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

const bookingReducer = (
  state: BookingState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case "LOAD_BOOKINGS":
      return { bookings: action.payload };
    case "CREATE_BOOKING":
      return { bookings: [action.payload, ...state.bookings] };
    case "DELETE_BOOKING":
      return {
        bookings: state.bookings.filter((b) => b.id !== action.payload),
      };
    case "UPDATE_BOOKING":
      return {
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        ),
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};
