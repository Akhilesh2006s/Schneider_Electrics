function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.2" y="4.8" width="17.6" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.2 9.4h17.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.2v3.6M16 3.2v3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.4V12l3.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21.2s6.2-5.3 6.2-10.1a6.2 6.2 0 1 0-12.4 0c0 4.8 6.2 10.1 6.2 10.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function EventInfo() {
  return (
    <ul className="event-info">
      <li>
        <CalendarIcon />
        <span>9th October</span>
      </li>
      <li className="event-divider" aria-hidden="true" />
      <li>
        <ClockIcon />
        <span>06:00 PM onwards</span>
      </li>
      <li className="event-divider" aria-hidden="true" />
      <li>
        <PinIcon />
        <span>Grand by GRT, Vijayawada</span>
      </li>
    </ul>
  );
}
