import React, { useState } from "react";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [bookingType, setBookingType] = useState("normal");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [events, setEvents] = useState([]);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleEventPriceChange = (e) => {
    setEventPrice(e.target.value);
  };

  const handleBookingTypeChange = (e) => {
    setBookingType(e.target.value);
  };

  const handleTermsAcceptedChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    if (
      !eventName ||
      !eventDate ||
      !eventDescription ||
      !eventPrice ||
      !termsAccepted
    ) {
      alert("Please fill in all the fields and accept the terms & conditions.");
      return;
    }

    // Create event object
    const newEvent = {
      id: new Date().getTime(), // Generate unique id for the event
      eventName,
      eventDate,
      eventDescription,
      eventPrice,
      bookingType,
      termsAccepted,
    };

    // Add new event to the events array
    setEvents([...events, newEvent]);

    // Reset form fields
    setEventName("");
    setEventDate("");
    setEventDescription("");
    setEventPrice("");
    setBookingType("normal");
    setTermsAccepted(false);

    // Store events array in local storage or send to backend API to store in a database
    localStorage.setItem("events", JSON.stringify([...events, newEvent]));
  };

  const handleEventEdit = (eventId, updatedEvent) => {
    // Update event in the events array
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, ...updatedEvent };
      }
      return event;
    });

    // Update events array in local storage or send to backend API to update in a database
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEventDelete = (eventId) => {
    // Remove event from the events array
    const updatedEvents = events.filter((event) => event.id !== eventId);

    // Update events array in local storage or send to backend API to update in a database
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  const totalBasePrice = events.reduce((total, event) => {
    console.log(event.eventPrice, total);
    return parseInt(total) + parseInt(event.eventPrice);
  }, 0);

  return (
    <>
      <h2>Create Event</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
        onSubmit={handleFormSubmit}
      >
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={handleEventNameChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </label>
        <br />
        <label>
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={handleEventDateChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </label>
        <br />
        <label>
          Event Description:
          <textarea
            value={eventDescription}
            onChange={handleEventDescriptionChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={eventPrice}
            onChange={handleEventPriceChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </label>
        <br />
        <label>
          Booking Type:
          <br />
          <input
            type="radio"
            value="normal"
            checked={bookingType === "normal"}
            onChange={handleBookingTypeChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
          Normal
          <br />
          <input
            type="radio"
            value="premium"
            checked={bookingType === "premium"}
            onChange={handleBookingTypeChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
          Premium
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={handleTermsAcceptedChange}
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
          I accept terms & conditions
        </label>
        <br />
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>

      <h2>Events Created by You</h2>
      <p>Total Base Price of All Events: {totalBasePrice}</p>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {/* Display event details */}
            <p>Event Name: {event.eventName}</p>
            <p>Event Date: {event.eventDate}</p>
            <p>Event Description: {event.eventDescription}</p>
            <p>Event Price: {event.eventPrice}</p>
            <p>
              Booking Type:{" "}
              {event.bookingType === "premium" ? "Premium" : "Normal"}
            </p>
            <p>Terms Accepted: {event.termsAccepted ? "Yes" : "No"}</p>
            {/* Edit and delete buttons */}
            <button
              onClick={() => {
                // Call function to edit event
                // Pass event id and current event object as arguments
                // UpdateEventForm is a function that you need to implement to handle editing of events
                //updateEventForm(event.id, event);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                // Call function to delete event
                // Pass event id as argument
                handleEventDelete(event.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventForm;
