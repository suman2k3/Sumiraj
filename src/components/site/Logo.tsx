import logoImg from "@/assets/logo.webp";
import logoLightImg from "@/assets/logo-light.webp";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export function Logo({ className = "", lightText = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={lightText ? logoLightImg : logoImg}
        alt="Sumiraj - Fabricating Your Future"
        className="h-12 sm:h-14 w-auto object-contain shrink-0"
      />
    </div>
  );
}
