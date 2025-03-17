export default function YoutubeIcon() {
    return (
      <svg
        width="34"
        height="35"
        viewBox="0 0 34 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Latar belakang hitam dengan border putih */}
        <rect x="0.5" y="1" width="33" height="33" rx="16.5" fill="black" />
        <rect x="0.5" y="1" width="33" height="33" rx="16.5" stroke="white" />
  
        {/* Ikon YouTube */}
        <g clipPath="url(#clip0_1_887)">
          <path
            d="M25.6667 13.3333C25.5 12.6667 25 12.1667 24.3333 12C23 11.6667 17 11.6667 17 11.6667C17 11.6667 11 11.6667 9.66667 12C9 12.1667 8.5 12.6667 8.33333 13.3333C8 14.6667 8 17 8 17C8 17 8 19.3333 8.33333 20.6667C8.5 21.3333 9 21.8333 9.66667 22C11 22.3333 17 22.3333 17 22.3333C17 22.3333 23 22.3333 24.3333 22C25 21.8333 25.5 21.3333 25.6667 20.6667C26 19.3333 26 17 26 17C26 17 26 14.6667 25.6667 13.3333ZM15 19.6667V14.3333L20.3333 17L15 19.6667Z"
            fill="white"
          />
        </g>
  
        {/* Definisi clipPath (opsional, bisa dihapus jika tidak diperlukan) */}
        <defs>
          <clipPath id="clip0_1_887">
            <rect
              width="18"
              height="18"
              fill="white"
              transform="translate(8 8)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }