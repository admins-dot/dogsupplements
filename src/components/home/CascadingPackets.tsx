import stickpacksBox from "@/assets/stickpacks-box.png";

interface CascadingPacketsProps {
  className?: string;
}

export const CascadingPackets = ({ className = "" }: CascadingPacketsProps) => {
  return (
    <div className={`absolute left-0 top-0 h-full pointer-events-none overflow-hidden ${className}`}>
      {/* Packet 1 - top */}
      <img 
        src={stickpacksBox} 
        alt="" 
        className="absolute -left-20 top-[5%] w-40 h-auto opacity-60 -rotate-12 blur-[1px]"
      />
      {/* Packet 2 */}
      <img 
        src={stickpacksBox} 
        alt="" 
        className="absolute -left-16 top-[25%] w-36 h-auto opacity-70 rotate-6"
      />
      {/* Packet 3 */}
      <img 
        src={stickpacksBox} 
        alt="" 
        className="absolute -left-24 top-[45%] w-44 h-auto opacity-50 -rotate-6 blur-[0.5px]"
      />
      {/* Packet 4 */}
      <img 
        src={stickpacksBox} 
        alt="" 
        className="absolute -left-12 top-[65%] w-32 h-auto opacity-65 rotate-12"
      />
      {/* Packet 5 - bottom */}
      <img 
        src={stickpacksBox} 
        alt="" 
        className="absolute -left-20 top-[85%] w-40 h-auto opacity-55 -rotate-3 blur-[1px]"
      />
    </div>
  );
};
