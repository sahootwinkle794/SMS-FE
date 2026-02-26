"use client";

import { useState, useEffect } from "react";
import moment from "moment";

function getGreeting(): string {
  const hour = moment().hours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
}

export function useGreeting(): string {
  const [greeting, setGreeting] = useState(getGreeting);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return greeting;
}
