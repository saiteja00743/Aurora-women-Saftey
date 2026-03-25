import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SOSButton() {
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSOS = () => {
    if (status === "sending") return;

    const confirmSOS = window.confirm("🚨 EMERGENCY: Are you sure you want to send an SOS alert with your location?");
    if (!confirmSOS) return;

    setStatus("sending");

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Attempting to send SOS without location.");
      sendSOSWithoutLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        sendSOS(latitude, longitude);
      },
      (error) => {
        console.error("Location Error:", error);
        alert("Could not get your exact location. Sending SOS without exact coordinates.");
        sendSOSWithoutLocation();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const sendSOS = async (lat, lng) => {
    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
    const emailBody = `
🚨 EMERGENCY SOS ALERT TRIGGERED 🚨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The user has pressed the panic button from the Aurora application.

📍 Location Triggered:
Latitude: ${lat}
Longitude: ${lng}

🗺️ Google Maps Link:
${mapLink}

Immediate assistance may be required!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    await submitForm(emailBody);
  };

  const sendSOSWithoutLocation = async () => {
    const emailBody = `
🚨 EMERGENCY SOS ALERT TRIGGERED 🚨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The user has pressed the panic button from the Aurora application.

⚠️ Location Data Unavailable
The user's device did not provide GPS coordinates, but they need immediate assistance!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    await submitForm(emailBody);
  };

  const submitForm = async (emailBody) => {
    try {
      const formData = new FormData();
      formData.append("access_key", "8733db19-6f85-4906-b92b-1629fabb701a");
      formData.append("subject", "🚨 URGENT SOS ALERT 🚨");
      formData.append("from_name", "Aurora SOS System");
      // You can replace this email with multiple comma-separated emails if you have a premium Web3Forms account,
      // or send multiple requests if you want to notify multiple people on a free account.
      formData.append("email", "gajavellisaiteja123@gmail.com"); 
      formData.append("message", emailBody);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("SOS failed:", result);
        setStatus("error");
        alert("Failed to send SOS. Please call emergency services directly!");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("SOS Error:", error);
      setStatus("error");
      alert("Error sending SOS. Please call emergency services directly!");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <motion.button
      onClick={handleSOS}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className={`fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 flex items-center justify-center text-white font-extrabold text-xl shadow-[0_0_20px_rgba(255,0,0,0.8)]
        ${status === "sending" ? "bg-orange-600" :
          status === "success" ? "bg-green-600" :
          "bg-red-700 hover:bg-red-600"}`}
      title="Send Emergency SOS Alert"
    >
      {status === "sending" ? "..." : status === "success" ? "✅" : "SOS"}
    </motion.button>
  );
}
