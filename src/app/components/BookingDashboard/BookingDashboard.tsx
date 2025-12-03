"use client";
import { useEffect, useState } from "react";

import { useLoadInitialBookingsData } from "@/app/hooks/useLoadInitialBookingsData";
import { useUpdateBookingsInLocalStorage } from "@/app/hooks/useUpdateBookingsInLocalStorage";
import { useBookings } from "@/app/hooks/useBookings";
import { BookingsTable } from "@/app/components/BookingsTable/BookingsTable";
import { AddBookingModal } from "@/app/components/AddBookingModal/AddBookingModal";
import { Button } from "@/app/components/common/Button/Button";
import { Booking, Status } from "@/app/types/bookings";
import { EditBookingModal } from "@/app/components/EditBookingModal/EditBookingModal";
import { ConfirmDeletionModal } from "@/app/components/ConfirmDeletionModal/ConfirmDeletionModal";
import { useResetBookingsData } from "@/app/hooks/useResetBookingsData";
import { Search } from "@/app/components/Search/Search";
import { StatusFilter } from "@/app/components/StatusFilter/StatusFilter";
import { BookingCardList } from "@/app/components/BookingCardList/BookingCardList";
import styles from "./BookingDashboard.module.css";

export const BookingDashboard = () => {
  const { state } = useBookings();
  const { handleResetData } = useResetBookingsData();
  const [openAddBookingModal, setOpenAddBookingModal] = useState(false);
  const [selectedBookingToEdit, setSelectedBookingToEdit] = useState<
    Booking | undefined
  >();
  const [selectedBookingIdToDelete, setSelectedBookingIdToDelete] = useState<
    string | undefined
  >();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useLoadInitialBookingsData();
  useUpdateBookingsInLocalStorage();

  useEffect(() => {
    let results = state.bookings;

    // Apply status filter
    if (statusFilter) {
      results = results.filter((b) => b.status === statusFilter);
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      results = results.filter((b) =>
        [b.id, b.customerName, b.origin, b.destination, b.status].some((value) =>
          value.toLowerCase().includes(lower)
        )
      );
    }

    setFilteredBookings(results);
  }, [searchQuery, statusFilter, state.bookings]);

  return (
    <div className={styles.bookingList}>
      <h1>Magnet logistics</h1>

      <div className={styles.actions}>
        <div className={styles.filters}>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <StatusFilter
            selectedStatus={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>
        <div className={styles.actionButtons}>
          <Button onClick={handleResetData} variant="transparent">
            Reset data
          </Button>
          <Button
            onClick={() => setOpenAddBookingModal(true)}
            variant="primary"
          >
            Add booking
          </Button>
        </div>
      </div>

      {filteredBookings.length > 0 ? (
        <>
          <div className={styles.desktopList}>
            <BookingsTable
              bookings={filteredBookings}
              onSelectBookingToEdit={setSelectedBookingToEdit}
              onSelectBookingIdToDelete={setSelectedBookingIdToDelete}
            />
          </div>

          <div className={styles.mobileList}>
            <BookingCardList
              bookings={filteredBookings}
              onSelectBookingToEdit={setSelectedBookingToEdit}
              onSelectBookingIdToDelete={setSelectedBookingIdToDelete}
            />
          </div>
        </>
      ) : (
        <p className={styles.noBookingsFound}>No bookings found</p>
      )}

      <AddBookingModal
        isOpen={openAddBookingModal}
        onCloseModalAction={() => setOpenAddBookingModal(false)}
      />

      {selectedBookingToEdit && (
        <EditBookingModal
          isOpen={!!selectedBookingToEdit}
          onCloseModalAction={() => setSelectedBookingToEdit(undefined)}
          booking={selectedBookingToEdit}
        />
      )}

      {selectedBookingIdToDelete && (
        <ConfirmDeletionModal
          isOpen={!!selectedBookingIdToDelete}
          onCloseModalAction={() => setSelectedBookingIdToDelete(undefined)}
          bookingId={selectedBookingIdToDelete}
        />
      )}
    </div>
  );
};
