"use client";

import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type EventCountdownProps = {
  target: string;
  label: string;
  arrivedLabel: string;
  ariaLabel: string;
};

function calculateTimeLeft(targetTime: number): TimeLeft | null {
  const difference = targetTime - Date.now();

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60)
  };
}

function formatNumber(value: number | undefined) {
  return value === undefined ? "--" : String(value).padStart(2, "0");
}

export function EventCountdown({
  target,
  label,
  arrivedLabel,
  ariaLabel
}: EventCountdownProps) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>();

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(calculateTimeLeft(targetTime));

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [targetTime]);

  return (
    <section className="countdown-panel" aria-label={ariaLabel}>
      {timeLeft === null ? (
        <p className="countdown-arrived">{arrivedLabel}</p>
      ) : (
        <>
          <p>{label}</p>
          <div className="countdown-grid" aria-live="off">
            <span>
              <strong>{formatNumber(timeLeft?.days)}</strong>
              <small>दिन</small>
            </span>
            <span>
              <strong>{formatNumber(timeLeft?.hours)}</strong>
              <small>घंटे</small>
            </span>
            <span>
              <strong>{formatNumber(timeLeft?.minutes)}</strong>
              <small>मिनट</small>
            </span>
            <span>
              <strong>{formatNumber(timeLeft?.seconds)}</strong>
              <small>सेकंड</small>
            </span>
          </div>
        </>
      )}
    </section>
  );
}
