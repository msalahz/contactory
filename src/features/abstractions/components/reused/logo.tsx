export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="140"
      height="32"
      viewBox="0 0 140 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#FF8C00', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <circle cx="16" cy="10" r="5" fill="url(#goldGradient)" />
      <path
        d="M 8 22 Q 8 16 16 16 Q 24 16 24 22 L 24 25 L 8 25 Z"
        fill="url(#goldGradient)"
      />
      <text
        x="75"
        y="24"
        fontFamily="Arial, sansSerif"
        fontSize="20"
        fontWeight="bold"
        fill="url(#goldGradient)"
        text-anchor="middle"
      >
        Contacts
      </text>
    </svg>
  )
}
