import { BookingProvider } from "@/app/context/BookingContext";
import { BookingDashboard } from "@/app/components/BookingDashboard/BookingDashboard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <BookingProvider>
      <div className={styles.homePage}>
        <BookingDashboard />
      </div>
    </BookingProvider>
  );
}
