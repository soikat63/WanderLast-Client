"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

const BookingDelateAlert = ({ bookingId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancelBooking = async () => {
    try {
      setIsDeleting(true);
      setErrorMessage("");

      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!serverUrl) {
        throw new Error("Server URL is not configured.");
      }

      const response = await fetch(`${serverUrl}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Failed to delete booking. Status: ${response.status}. ${errorText}`,
        );
      }

      window.location.reload();
    } catch (error) {
      console.error("Cancel booking failed:", error);
      setErrorMessage(error.message || "Failed to cancel booking.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger" className="rounded-none">
        <TrashBin />
        Cancel booking
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>

              {errorMessage && (
                <p className="mt-3 rounded bg-red-100 p-2 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" disabled={isDeleting}>
                Keep booking
              </Button>

              <Button
                onClick={handleCancelBooking}
                variant="danger"
                isLoading={isDeleting}
                disabled={isDeleting}
              >
                {isDeleting ? "Cancelling..." : "Delete Booking"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingDelateAlert;
