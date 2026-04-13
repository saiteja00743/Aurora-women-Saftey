import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2">
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white mb-2"
          >
            {status === "sending" ? "Sending Alert..." : status === "success" ? "Sent Successfully" : "Error Sending"}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full bg-red-600 blur-xl"
        />
        <motion.button
          onClick={handleSOS}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-white font-black shadow-2xl transition-colors duration-500 border-4 border-white/20
            ${status === "sending" ? "bg-orange-600" :
              status === "success" ? "bg-green-600" :
              "bg-red-700 hover:bg-red-600 shadow-[0_0_40px_rgba(220,38,38,0.5)]"}`}
        >
          {status === "sending" ? (
             <span className="text-xl animate-spin">🌀</span>
          ) : status === "success" ? (
             <span className="text-3xl">✅</span>
          ) : (
            <>
              <span className="text-2xl sm:text-3xl leading-none">SOS</span>
              <span className="text-[10px] sm:text-xs opacity-60 tracking-tighter">EMERGENCY</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
