interface FloatingSocialItem {
  id: string;
  name: string;
  href: string;
  bgClass: string;
  hoverClass: string;
  icon: (props: { className?: string }) => JSX.Element;
  tooltip: string;
  sizeClass?: string;
  pulse?: boolean;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.24 16C12.83 16.26 13.28 16.41 13.64 16.53C14.23 16.72 14.77 16.69 15.2 16.63C15.68 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 13.99C16.32 13.86 15.12 13.28 14.9 13.2C14.67 13.11 14.51 13.07 14.35 13.31C14.18 13.56 13.71 14.11 13.56 14.27C13.42 14.44 13.27 14.46 13.03 14.34C12.78 14.21 11.99 13.95 11.06 13.12C10.33 12.47 9.84 11.67 9.7 11.42C9.55 11.17 9.68 11.04 9.81 10.92C9.92 10.81 10.06 10.63 10.18 10.48C10.31 10.34 10.35 10.24 10.43 10.07C10.51 9.91 10.47 9.76 10.41 9.64C10.35 9.52 9.86 8.32 9.66 7.83C9.46 7.36 9.25 7.42 9.1 7.41C8.95 7.41 8.79 7.33 8.53 7.33Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 0 0-1.64 1.63 1.64 1.64 0 0 0 1.64 1.63 1.64 1.64 0 0 0 1.63-1.63A1.64 1.64 0 0 0 7.83 6.2z" />
    </svg>
  );
}

const socialLinks: FloatingSocialItem[] = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/sumirajindustries",
    bgClass: "bg-[#1877F2]",
    hoverClass: "hover:bg-[#166fe5]",
    icon: FacebookIcon,
    tooltip: "Follow on Facebook",
    sizeClass: "h-11 w-11 sm:h-12 sm:w-12",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/sumirajindustries?originalSubdomain=in",
    bgClass: "bg-[#0A66C2]",
    hoverClass: "hover:bg-[#095196]",
    icon: LinkedInIcon,
    tooltip: "Connect on LinkedIn",
    sizeClass: "h-11 w-11 sm:h-12 sm:w-12",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    href: "https://wa.me/9997904348",
    bgClass: "bg-[#25D366]",
    hoverClass: "hover:bg-[#20ba59]",
    icon: WhatsAppIcon,
    tooltip: "Chat on WhatsApp",
    sizeClass: "h-12 w-12 sm:h-14 sm:w-14",
    pulse: true,
  },
];

export function FloatingSocials() {
  return (
    <aside
      aria-label="Floating social contacts"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3"
    >
      {socialLinks.map((item) => {
        const IconComponent = item.icon;
        return (
          <div key={item.id} className="group relative flex items-center">
            {/* Tooltip Label (Desktop) */}
            <span
              className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-xs transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 sm:inline-block"
            >
              {item.tooltip}
            </span>

            {/* Subtle Pulse ring for WhatsApp */}
            {item.pulse && (
              <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
            )}

            {/* Floating Action Button */}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.tooltip}
              className={`flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 ${item.sizeClass} ${item.bgClass} ${item.hoverClass}`}
            >
              <IconComponent />
            </a>
          </div>
        );
      })}
    </aside>
  );
}
