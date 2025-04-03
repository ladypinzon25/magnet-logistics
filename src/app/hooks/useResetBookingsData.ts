import { fetchBookings } from "@/app/data/fetchBookings";
import { useBookings } from "@/app/hooks/useBookings";

export const useResetBookingsData = () => {
  const { dispatch } = useBookings();

  const handleResetData = async () => {
    const freshData = await fetchBookings();

    localStorage.setItem("bookings", JSON.stringify(freshData));
    dispatch({ type: "LOAD_BOOKINGS", payload: freshData });
  };

  return {
    handleResetData,
  };
};
