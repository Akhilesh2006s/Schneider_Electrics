type SvelLogoProps = {
  className?: string;
};

export function SvelLogo({ className }: SvelLogoProps) {
  return (
    <span className={`svel-logo ${className ?? ""}`.trim()}>
      <svg className="svel-mark" viewBox="0 0 64 64" aria-hidden="true">
        <polygon points="32,1 38.2,22.5 32,16.5 25.8,22.5" fill="#E10600" />
        <polygon points="32,63 25.8,41.5 32,47.5 38.2,41.5" fill="#F0C419" />
        <polygon points="1,32 22.5,25.8 16.5,32 22.5,38.2" fill="#F0C419" />
        <polygon points="63,32 41.5,38.2 47.5,32 41.5,25.8" fill="#E10600" />
        <polygon points="9.2,9.2 24.2,22.2 20.2,26.2 22.2,20.2" fill="#C8102E" />
        <polygon points="54.8,9.2 41.8,20.2 43.8,26.2 39.8,22.2" fill="#E6B325" />
        <polygon points="9.2,54.8 22.2,43.8 26.2,43.8 20.2,41.8" fill="#E6B325" />
        <polygon points="54.8,54.8 39.8,41.8 43.8,37.8 41.8,43.8" fill="#C8102E" />
        <circle cx="32" cy="32" r="8.2" fill="#111111" stroke="#F5C518" strokeWidth="1.6" />
        <path d="M34.2 23.2 27.6 33.2h4.1L29.8 41.6 38.6 30.2h-4.2z" fill="#FFE14A" />
      </svg>
      <span className="svel-word">SVEL</span>
    </span>
  );
}
