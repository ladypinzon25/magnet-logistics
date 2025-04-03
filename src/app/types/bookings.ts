export type Status = "pending" | "in-transit" | "delivered" | "cancelled";

export type Booking = {
  id: string;
  customerName: string;
  origin: string;
  destination: string;
  status: Status;
  imageUrl?: string;
};
