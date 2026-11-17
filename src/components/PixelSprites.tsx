import React from 'react';

interface SpriteProps {
  className?: string;
  size?: number;
}

export const PixelPokeball: React.FC<SpriteProps & { active?: boolean }> = ({
  className = '',
  size = 24,
  active = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    shapeRendering="crispEdges"
    className={className}
    aria-hidden="true"
  >
    <rect x="5" y="1" width="6" height="1" fill="#1B232E" />
    <rect x="3" y="2" width="2" height="1" fill="#1B232E" />
    <rect x="11" y="2" width="2" height="1" fill="#1B232E" />
    <rect x="2" y="3" width="1" height="2" fill="#1B232E" />
    <rect x="13" y="3" width="1" height="2" fill="#1B232E" />
    <rect x="1" y="5" width="1" height="6" fill="#1B232E" />
    <rect x="14" y="5" width="1" height="6" fill="#1B232E" />
    <rect x="2" y="11" width="1" height="2" fill="#1B232E" />
    <rect x="13" y="11" width="1" height="2" fill="#1B232E" />
    <rect x="3" y="13" width="2" height="1" fill="#1B232E" />
    <rect x="11" y="13" width="2" height="1" fill="#1B232E" />
    <rect x="5" y="14" width="6" height="1" fill="#1B232E" />

    <rect x="5" y="2" width="6" height="1" fill={active ? '#DC2626' : '#94A3B8'} />
    <rect x="3" y="3" width="10" height="2" fill={active ? '#DC2626' : '#94A3B8'} />
    <rect x="2" y="5" width="12" height="2" fill={active ? '#DC2626' : '#94A3B8'} />
    <rect x="4" y="3" width="2" height="1" fill={active ? '#FCA5A5' : '#CBD5E1'} />

    <rect x="2" y="9" width="12" height="2" fill={active ? '#FFFFFF' : '#E2E8F0'} />
    <rect x="3" y="11" width="10" height="2" fill={active ? '#FFFFFF' : '#E2E8F0'} />
    <rect x="5" y="13" width="6" height="1" fill={active ? '#E2E8E8' : '#CBD5E1'} />

    <rect x="2" y="7" width="12" height="2" fill="#1B232E" />
    <rect x="6" y="6" width="4" height="4" fill="#1B232E" />
    <rect x="7" y="7" width="2" height="2" fill={active ? '#FEF08A' : '#CBD5E1'} />
  </svg>
);

export const PixelHealingTray: React.FC<{ activeCount: number }> = ({ activeCount }) => {
  const slots = [0, 1, 2, 3, 4, 5];
  const clampedCount = Math.max(0, Math.min(6, activeCount));

  return (
    <div
      className="inline-flex items-center gap-1.5 bg-[#1B232E] px-2.5 py-1.5 border-2 border-[#1B232E]"
      title={`${activeCount} aktif rahatsızlık kaydı (6 slot göstergesi)`}
    >
      {slots.map((slot) => (
        <PixelPokeball key={slot} size={18} active={slot < clampedCount} />
      ))}
    </div>
  );
};

export const PixelBook: React.FC<SpriteProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    shapeRendering="crispEdges"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="11" height="12" fill="#1B232E" />
    <rect x="3" y="3" width="9" height="10" fill="#DC2626" />
    <rect x="3" y="3" width="2" height="10" fill="#991B1B" />
    <rect x="6" y="5" width="5" height="2" fill="#FEF08A" />
    <rect x="4" y="12" width="9" height="1" fill="#F8FAFC" />
  </svg>
);

export const PixelBulbasaur: React.FC<SpriteProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    shapeRendering="crispEdges"
    className={className}
    role="img"
    aria-label="Piksel Bulbasaur karakteri"
  >
    {/* Ground Shadow */}
    <rect x="5" y="28" width="22" height="2" fill="#1B232E" opacity="0.24" />

    {/* Bulb Top Leafy Crown & Layered Ridges */}
    <rect x="16" y="2" width="3" height="1" fill="#1B232E" />
    <rect x="15" y="3" width="1" height="1" fill="#1B232E" />
    <rect x="19" y="3" width="2" height="1" fill="#1B232E" />
    <rect x="14" y="4" width="1" height="2" fill="#1B232E" />
    <rect x="21" y="4" width="2" height="1" fill="#1B232E" />
    <rect x="13" y="6" width="1" height="2" fill="#1B232E" />
    <rect x="23" y="5" width="2" height="2" fill="#1B232E" />
    <rect x="25" y="7" width="2" height="3" fill="#1B232E" />
    <rect x="27" y="10" width="1" height="5" fill="#1B232E" />

    {/* Bulb Fill & Shading */}
    <rect x="16" y="3" width="3" height="2" fill="#86EFAC" />
    <rect x="15" y="4" width="6" height="3" fill="#4ADE80" />
    <rect x="14" y="6" width="9" height="4" fill="#22C55E" />
    <rect x="13" y="8" width="12" height="7" fill="#16A34A" />
    <rect x="21" y="7" width="4" height="7" fill="#15803D" />
    <rect x="24" y="10" width="3" height="5" fill="#166534" />
    {/* Bulb Leaf Veins */}
    <rect x="17" y="5" width="2" height="6" fill="#86EFAC" />
    <rect x="15" y="9" width="2" height="4" fill="#4ADE80" />
    <rect x="21" y="6" width="1" height="6" fill="#166534" />

    {/* Head Outline & Ears */}
    <rect x="6" y="9" width="3" height="1" fill="#1B232E" />
    <rect x="13" y="9" width="3" height="1" fill="#1B232E" />
    <rect x="5" y="10" width="1" height="3" fill="#1B232E" />
    <rect x="9" y="10" width="4" height="1" fill="#1B232E" />
    <rect x="4" y="13" width="1" height="6" fill="#1B232E" />
    <rect x="16" y="10" width="1" height="4" fill="#1B232E" />

    {/* Head Fill & Highlights */}
    <rect x="6" y="10" width="3" height="3" fill="#5EEAD4" />
    <rect x="13" y="10" width="3" height="3" fill="#2DD4BF" />
    <rect x="5" y="11" width="11" height="9" fill="#5EEAD4" />
    <rect x="6" y="11" width="6" height="2" fill="#99F6E4" />
    <rect x="14" y="12" width="2" height="7" fill="#2DD4BF" />

    {/* Forehead Dark Teal Spot */}
    <rect x="10" y="12" width="3" height="2" fill="#0F766E" />
    <rect x="11" y="11" width="1" height="1" fill="#0F766E" />

    {/* Expressive GBA Crimson Eyes */}
    <rect x="6" y="14" width="3" height="3" fill="#FFFFFF" />
    <rect x="7" y="14" width="2" height="3" fill="#DC2626" />
    <rect x="7" y="14" width="1" height="1" fill="#FFFFFF" />
    <rect x="8" y="15" width="1" height="2" fill="#991B1B" />
    <rect x="6" y="13" width="3" height="1" fill="#1B232E" />

    <rect x="12" y="14" width="3" height="3" fill="#FFFFFF" />
    <rect x="12" y="14" width="2" height="3" fill="#DC2626" />
    <rect x="13" y="14" width="1" height="1" fill="#FFFFFF" />
    <rect x="12" y="15" width="1" height="2" fill="#991B1B" />
    <rect x="12" y="13" width="3" height="1" fill="#1B232E" />

    {/* Smile & Little Fangs */}
    <rect x="6" y="18" width="9" height="1" fill="#1B232E" />
    <rect x="7" y="19" width="7" height="1" fill="#F43F5E" />
    <rect x="7" y="19" width="1" height="1" fill="#FFFFFF" />
    <rect x="13" y="19" width="1" height="1" fill="#FFFFFF" />
    <rect x="8" y="20" width="5" height="1" fill="#1B232E" />

    {/* Body Outline & Teal Shading */}
    <rect x="27" y="15" width="1" height="6" fill="#1B232E" />
    <rect x="5" y="20" width="1" height="3" fill="#1B232E" />
    <rect x="15" y="14" width="12" height="8" fill="#2DD4BF" />
    <rect x="16" y="15" width="9" height="6" fill="#14B8A6" />
    <rect x="6" y="20" width="10" height="3" fill="#2DD4BF" />

    {/* Body Spots */}
    <rect x="18" y="16" width="3" height="2" fill="#0F766E" />
    <rect x="22" y="18" width="3" height="3" fill="#0F766E" />
    <rect x="17" y="19" width="2" height="2" fill="#115E59" />

    {/* Sturdy Legs & White Claws */}
    <rect x="6" y="22" width="4" height="5" fill="#2DD4BF" />
    <rect x="12" y="22" width="4" height="5" fill="#14B8A6" />
    <rect x="21" y="21" width="5" height="6" fill="#14B8A6" />
    <rect x="23" y="22" width="3" height="5" fill="#0D9488" />

    <rect x="5" y="23" width="1" height="4" fill="#1B232E" />
    <rect x="10" y="23" width="2" height="4" fill="#1B232E" />
    <rect x="16" y="23" width="1" height="4" fill="#1B232E" />
    <rect x="20" y="22" width="1" height="5" fill="#1B232E" />
    <rect x="26" y="21" width="1" height="6" fill="#1B232E" />
    <rect x="17" y="22" width="3" height="1" fill="#1B232E" />

    <rect x="6" y="27" width="4" height="1" fill="#1B232E" />
    <rect x="12" y="27" width="4" height="1" fill="#1B232E" />
    <rect x="21" y="27" width="5" height="1" fill="#1B232E" />

    {/* Claws */}
    <rect x="6" y="26" width="1" height="1" fill="#FFFFFF" />
    <rect x="8" y="26" width="1" height="1" fill="#FFFFFF" />
    <rect x="12" y="26" width="1" height="1" fill="#FFFFFF" />
    <rect x="14" y="26" width="1" height="1" fill="#FFFFFF" />
    <rect x="21" y="26" width="1" height="1" fill="#FFFFFF" />
    <rect x="23" y="26" width="1" height="1" fill="#FFFFFF" />
  </svg>
);

export const PixelTersLale: React.FC<SpriteProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 28"
    fill="none"
    shapeRendering="crispEdges"
    className={className}
    role="img"
    aria-label="Hakkari Ters Lale (Ağlayan Gelin)"
  >
    {/* Ground Shadow */}
    <rect x="7" y="26" width="10" height="1" fill="#1B232E" opacity="0.25" />

    {/* Top Leafy Crown (Pineapple-like tuft of Ters Lale) */}
    <rect x="11" y="1" width="2" height="2" fill="#16A34A" />
    <rect x="8" y="2" width="3" height="2" fill="#22C55E" />
    <rect x="13" y="2" width="3" height="2" fill="#16A34A" />
    <rect x="6" y="3" width="3" height="2" fill="#4ADE80" />
    <rect x="15" y="3" width="3" height="2" fill="#22C55E" />
    <rect x="9" y="4" width="6" height="2" fill="#15803D" />

    {/* Main Tall Shaded Stem */}
    <rect x="11" y="5" width="2" height="21" fill="#15803D" />
    <rect x="11" y="5" width="1" height="20" fill="#22C55E" />

    {/* Left Hanging Bell Blossom */}
    <rect x="5" y="6" width="6" height="1" fill="#1B232E" />
    <rect x="4" y="7" width="1" height="6" fill="#1B232E" />
    <rect x="9" y="8" width="1" height="5" fill="#1B232E" />
    <rect x="5" y="7" width="4" height="6" fill="#EA580C" />
    <rect x="6" y="7" width="1" height="5" fill="#FB923C" />
    <rect x="8" y="8" width="1" height="5" fill="#C2410C" />
    <rect x="5" y="13" width="1" height="1" fill="#FACC15" />
    <rect x="7" y="13" width="1" height="2" fill="#FEF08A" />

    {/* Right Hanging Bell Blossom */}
    <rect x="13" y="6" width="6" height="1" fill="#1B232E" />
    <rect x="19" y="7" width="1" height="6" fill="#1B232E" />
    <rect x="14" y="8" width="1" height="5" fill="#1B232E" />
    <rect x="15" y="7" width="4" height="6" fill="#DC2626" />
    <rect x="16" y="7" width="1" height="5" fill="#F87171" />
    <rect x="18" y="8" width="1" height="5" fill="#991B1B" />
    <rect x="16" y="13" width="1" height="2" fill="#FEF08A" />
    <rect x="18" y="13" width="1" height="1" fill="#FACC15" />

    {/* Center-Front Hanging Bell Blossom */}
    <rect x="9" y="9" width="6" height="1" fill="#1B232E" />
    <rect x="9" y="10" width="6" height="6" fill="#EA580C" />
    <rect x="10" y="10" width="2" height="5" fill="#FB923C" />
    <rect x="13" y="11" width="2" height="5" fill="#DC2626" />
    <rect x="10" y="16" width="1" height="1" fill="#FACC15" />
    <rect x="12" y="16" width="1" height="2" fill="#FEF08A" />

    {/* Lower Lance Leaves */}
    <rect x="7" y="19" width="4" height="2" fill="#22C55E" />
    <rect x="5" y="20" width="3" height="2" fill="#16A34A" />
    <rect x="13" y="18" width="4" height="2" fill="#22C55E" />
    <rect x="16" y="19" width="3" height="2" fill="#15803D" />
    <rect x="8" y="23" width="3" height="2" fill="#16A34A" />
    <rect x="13" y="23" width="3" height="2" fill="#166534" />
    <rect x="9" y="25" width="6" height="1" fill="#14532D" />
  </svg>
);

export const PixelConsoleMascot: React.FC = () => (
  <div
    aria-hidden="true"
    className="bg-[#EEF2E6] border-2 border-[#1B232E] shadow-[inset_2px_2px_0px_#FFFFFF,inset_-2px_-2px_0px_#CBD5C0] px-1.5 py-1 sm:px-2.5 sm:py-1.5 relative overflow-hidden shrink-0 flex items-center"
  >
    {/* Grand Cilo-Sat Mountain & Sunrise Pixel Backdrop */}
    <svg
      className="absolute inset-0 w-full h-full opacity-65"
      viewBox="0 0 168 64"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
    >
      {/* Layered Sky Bands */}
      <rect x="0" y="0" width="168" height="18" fill="#BAE6FD" />
      <rect x="0" y="18" width="168" height="16" fill="#E0F2FE" />
      <rect x="0" y="34" width="168" height="16" fill="#FEF9C3" />

      {/* Pixel Sun Glint */}
      <rect x="142" y="6" width="10" height="10" fill="#FEF08A" />
      <rect x="144" y="8" width="6" height="6" fill="#FDE047" />

      {/* Left Ridge */}
      <rect x="6" y="34" width="52" height="16" fill="#94A3B8" />
      <rect x="16" y="24" width="30" height="10" fill="#64748B" />
      <rect x="24" y="18" width="14" height="6" fill="#F8FAFC" />
      <rect x="20" y="24" width="22" height="3" fill="#E2E8F0" />

      {/* Central Grand Cilo Peak */}
      <rect x="46" y="22" width="76" height="28" fill="#475569" />
      <rect x="60" y="12" width="48" height="10" fill="#475569" />
      <rect x="70" y="5" width="28" height="7" fill="#F8FAFC" />
      <rect x="78" y="2" width="12" height="3" fill="#FFFFFF" />
      <rect x="64" y="12" width="38" height="4" fill="#E2E8F0" />
      <rect x="86" y="16" width="22" height="34" fill="#334155" opacity="0.45" />

      {/* Right Peak */}
      <rect x="114" y="28" width="52" height="22" fill="#64748B" />
      <rect x="126" y="18" width="28" height="10" fill="#475569" />
      <rect x="132" y="13" width="16" height="5" fill="#F8FAFC" />

      {/* Emerald Highland Meadow & Glacial Stream */}
      <rect x="0" y="50" width="168" height="14" fill="#4ADE80" />
      <rect x="0" y="56" width="168" height="8" fill="#22C55E" />
      <rect x="52" y="51" width="60" height="3" fill="#38BDF8" />
    </svg>

    <div className="relative z-10 flex items-end gap-1.5 sm:gap-2">
      <PixelBulbasaur className="w-10 h-10 sm:w-[54px] sm:h-[54px]" size={54} />
      <PixelTersLale className="w-8 h-8 sm:w-[44px] sm:h-[44px]" size={44} />
    </div>
  </div>
);
