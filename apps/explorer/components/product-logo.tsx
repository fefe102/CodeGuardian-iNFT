export function ProductMark({ className = "" }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <path
          d="M16 3.5 26.5 9v8.3c0 5.1-3.9 9.4-10.5 11.2C9.4 26.7 5.5 22.4 5.5 17.3V9L16 3.5Z"
          fill="currentColor"
          opacity="0.22"
        />
        <path
          d="M16 6.4 23.8 10.5v6.4c0 3.6-2.8 6.8-7.8 8.4-5-1.6-7.8-4.8-7.8-8.4v-6.4L16 6.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12.1 18.8 16 10.4l3.9 8.4M13.4 16h5.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}
