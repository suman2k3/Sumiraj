import logoImg from "@/assets/logo.webp";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export function Logo({ className = "", iconOnly = false, lightText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoImg}
        alt="Sumiraj Logo"
        className="h-10 w-auto object-contain shrink-0"
      />
      {!iconOnly && (
        <span className={`font-display text-xl font-bold tracking-tight uppercase ${lightText ? "text-white" : "text-slate-900"}`}>
          SUMIRAJ<span className="text-accent font-black">.</span>
        </span>
      )}
    </div>
  );
}
