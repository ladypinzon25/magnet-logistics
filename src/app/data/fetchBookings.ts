import { Booking } from "@/app/types/bookings";
import { User } from "@/app/types/users";
import {
  API_URL,
  destinations,
  imageUrls,
  origins,
  statuses,
} from "@/app/utils/constants";

export const fetchBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();

  const bookings = users.slice(0, 9).map((user: User, index: number) => ({
    id: `#${Date.now()}${user.id}`,
    customerName: user.name,
    origin: origins[index],
    destination: destinations[index],
    status: statuses[index % statuses.length],
    imageUrl: imageUrls[index],
  }));

  return bookings;
};
