import React, { useMemo, useState } from 'react';
import {
  Calculator,
  Check,
  Delete,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  calculateBalthazard,
  formatTrDecimal,
  type ImpairmentEntry,
} from '../utils/balthazard';
import {
  PixelConsoleMascot,
  PixelHealingTray,
  PixelPokeball,
} from './PixelSprites';

interface BalthazardCalculatorProps {
  entries: ImpairmentEntry[];
  onAddEntry: (entry: Omit<ImpairmentEntry, 'id'>) => void;
  onUpdateRate: (id: string, nextRate: number) => void;
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
  onLoadExample: () => void;
  applyAge65: boolean;
  onToggleAge65: () => void;
}

function getRateBarVisualState(totalRate: number) {
  if (totalRate === 0) {
    return {
      barColor: 'bg-[#94A3B8]',
      badgeText: 'Kayıt Bekleniyor',
      badgeTone: 'text-[#334155] border-[#64748B] bg-[#F1F5F9]',
    };
  }
  if (totalRate < 40) {
    return {
      barColor: 'bg-[#16A34A]',
      badgeText: 'Hafif Düzey (< %40)',
      badgeTone: 'text-[#166534] border-[#16A34A] bg-[#DCFCE7]',
    };
  }
  if (totalRate < 80) {
    return {
      barColor: 'bg-[#D97706]',
      badgeText: 'Orta–İleri Düzey (%40–%79)',
      badgeTone: 'text-[#92400E] border-[#D97706] bg-[#FEF3C7]',
    };
  }
  return {
    barColor: 'bg-[#DC2626]',
    badgeText: totalRate >= 100 ? 'Tam Engel Oranı (%100)' : 'Ağır Düzey (%80+)',
    badgeTone: 'text-[#991B1B] border-[#DC2626] bg-[#FEE2E2]',
  };
}

export const BalthazardCalculator: React.FC<BalthazardCalculatorProps> = ({
  entries,
  onAddEntry,
  onUpdateRate,
  onRemoveEntry,
  onClearAll,
  onLoadExample,
  applyAge65,
  onToggleAge65,
}) => {
  const [rateInput, setRateInput] = useState<string>('');
  const [labelInput, setLabelInput] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [isTouchDevice] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
  );
  const [keypadOpen, setKeypadOpen] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
  );

  const result = useMemo(
    () => calculateBalthazard(entries, applyAge65),
    [entries, applyAge65]
  );

  const barVisual = getRateBarVisualState(result.roundedTotal);

  const submitEntry = () => {
    const normalized = rateInput.replace(',', '.').trim();
    const parsed = Number(normalized);

    if (!normalized || !Number.isFinite(parsed) || parsed < 1 || parsed > 100) {
      setErrorText('Lütfen 1 ile 100 arasında geçerli bir engel oranı (%) giriniz.');
      return;
    }

    const cleanRate = Math.round(parsed);
    const cleanLabel =
      labelInput.trim() || `${entries.length + 1}. Rahatsızlık`;

    setErrorText('');
    onAddEntry({
      label: cleanLabel,
      rate: cleanRate,
      source: 'Manuel Giriş',
    });

    setRateInput('');
    setLabelInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEntry();
  };

  const handleKeypadDigit = (digit: string) => {
    if (errorText) setErrorText('');
    setRateInput((prev) => {
      if (prev === '' && digit === '0') return '';
      if (prev.length >= 3) return prev;
      return prev + digit;
    });
  };

  const handleKeypadBackspace = () => {
    if (errorText) setErrorText('');
    setRateInput((prev) => prev.slice(0, -1));
  };

  const handleKeypadClear = () => {
    if (errorText) setErrorText('');
    setRateInput('');
  };

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* GBA Pokémon Center Pokédex Console */}
      <section
        id="hesaplayici"
        className="pixel-box-crimson bg-[#DC2626] p-2 sm:p-5"
      >
        {/* Top Console Bezel & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 sm:gap-3 sm:pb-3 sm:mb-3 border-b-2 border-[#991B1B]">
          <div className="flex items-center gap-2 sm:gap-3">
            <PixelConsoleMascot />
            <div>
              <h1 className="font-pixel text-xs sm:text-lg text-white tracking-wide leading-tight">
                POKÉKURUL BALTHAZARD KONSOLU
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-[#FEE2E2] font-medium">
                Erişkinler İçin Engellilik Sağlık Kurulu Hesaplama Ünitesi
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <PixelHealingTray activeCount={result.sortedEntries.length} />

            <button
              type="button"
              onClick={onToggleAge65}
              aria-pressed={applyAge65}
              className={`pixel-btn px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-sm font-bold cursor-pointer flex items-center gap-1 ${
                applyAge65
                  ? 'bg-[#FEF08A] text-[#1B232E]'
                  : 'bg-[#FFFFFF] text-[#1B232E]'
              }`}
              title="Mevzuat gereği 65 yaş ve üzeri bireylere Balthazard ile %10 ilave edilir"
            >
              <span className="font-mono-tabular">
                {applyAge65 ? '[✓]' : '[ ]'}
              </span>
              <span>65+ Yaş (+%10)</span>
            </button>
          </div>
        </div>

        {/* Inner LCD Screen */}
        <div className="pixel-screen lcd-scanlines p-2.5 sm:p-6 space-y-3 sm:space-y-5">
          {/* Add Impairment Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border-2 border-[#1B232E] p-2.5 sm:p-4 space-y-2 sm:space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
              <h2 className="font-pixel text-[11px] sm:text-sm text-[#1B232E]">
                ENGEL ORANI EKLE (MADDE A)
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setKeypadOpen((prev) => !prev)}
                  aria-pressed={keypadOpen}
                  className={`pixel-btn px-2 py-1 sm:px-2.5 text-[11px] sm:text-xs font-bold cursor-pointer flex items-center gap-1 ${
                    keypadOpen
                      ? 'bg-[#FEF08A] text-[#1B232E]'
                      : 'bg-[#E2E8D8] text-[#1B232E]'
                  }`}
                  title="Sistem klavyesinden bağımsız uygulama içi sayısal tuş takımı"
                >
                  <Calculator className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Tuş Takımı</span>
                </button>
                <button
                  type="button"
                  onClick={onLoadExample}
                  className="pixel-btn bg-[#E2E8D8] text-[#1B232E] px-2 py-1 sm:px-2.5 text-[11px] sm:text-xs font-bold cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Örnek Yükle</span>
                </button>
                <button
                  type="button"
                  onClick={onClearAll}
                  disabled={entries.length === 0}
                  className="pixel-btn bg-[#FEE2E2] text-[#991B1B] px-2 py-1 sm:px-2.5 text-[11px] sm:text-xs font-bold cursor-pointer flex items-center gap-1 disabled:opacity-45 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Temizle</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 sm:gap-3">
              <div
                className={
                  keypadOpen
                    ? 'col-span-12 sm:col-span-4 sm:order-1'
                    : 'col-span-7 sm:col-span-3 sm:order-1'
                }
              >
                <label
                  htmlFor="rate-input"
                  className="block text-[11px] sm:text-xs font-bold text-[#334155] mb-0.5 sm:mb-1"
                >
                  Engel Oranı (%)
                </label>
                <input
                  id="rate-input"
                  type="text"
                  inputMode={keypadOpen && isTouchDevice ? 'none' : 'numeric'}
                  pattern="[0-9]*"
                  maxLength={3}
                  enterKeyHint="go"
                  autoComplete="off"
                  readOnly={keypadOpen && isTouchDevice}
                  value={rateInput}
                  onClick={() => {
                    if (isTouchDevice && !keypadOpen) {
                      setKeypadOpen(true);
                    }
                  }}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 3);
                    setRateInput(digitsOnly);
                    if (errorText) setErrorText('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitEntry();
                    }
                  }}
                  placeholder="Örn: 40"
                  className="pixel-input w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-base font-mono-tabular font-bold text-[#1B232E]"
                />
              </div>

              {!keypadOpen && (
                <div className="col-span-5 sm:col-span-3 sm:order-3 flex items-end">
                  <button
                    type="submit"
                    className="pixel-btn w-full bg-[#16A34A] text-white font-pixel text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>EKLE</span>
                  </button>
                </div>
              )}

              {/* In-App Pixel Numeric Keypad placed directly below rate input on mobile */}
              {keypadOpen && (
                <div
                  aria-label="Uygulama içi sayısal tuş takımı"
                  className="col-span-12 sm:order-4 bg-[#EEF2E6] border-2 border-[#1B232E] p-2 sm:p-3 space-y-1.5 sm:space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#334155]">
                    <span className="font-pixel text-[10px] sm:text-[11px] text-[#1B232E]">
                      PİKSEL TUŞ TAKIMI
                    </span>
                    <span className="font-mono-tabular font-bold text-[#1B232E]">
                      Girilen: {rateInput ? `%${rateInput}` : '—'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-md touch-manipulation select-none">
                    {['1', '2', '3'].map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        onClick={() => handleKeypadDigit(digit)}
                        className="pixel-btn bg-white text-[#1B232E] font-pixel font-mono-tabular text-base sm:text-lg py-1.5 sm:py-2.5 cursor-pointer"
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleKeypadBackspace}
                      aria-label="Son rakamı sil"
                      className="pixel-btn bg-[#E2E8D8] text-[#1B232E] font-bold text-xs sm:text-sm py-1.5 sm:py-2.5 cursor-pointer flex items-center justify-center"
                    >
                      <Delete className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {['4', '5', '6'].map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        onClick={() => handleKeypadDigit(digit)}
                        className="pixel-btn bg-white text-[#1B232E] font-pixel font-mono-tabular text-base sm:text-lg py-1.5 sm:py-2.5 cursor-pointer"
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleKeypadClear}
                      aria-label="Girilen oranı sıfırla"
                      className="pixel-btn bg-[#FEE2E2] text-[#991B1B] font-pixel text-xs sm:text-sm py-1.5 sm:py-2.5 cursor-pointer"
                    >
                      C
                    </button>

                    {['7', '8', '9'].map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        onClick={() => handleKeypadDigit(digit)}
                        className="pixel-btn bg-white text-[#1B232E] font-pixel font-mono-tabular text-base sm:text-lg py-1.5 sm:py-2.5 cursor-pointer"
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={submitEntry}
                      className="pixel-btn row-span-2 bg-[#16A34A] text-white font-pixel text-xs sm:text-sm py-1.5 sm:py-2.5 px-2 cursor-pointer flex flex-col items-center justify-center gap-0.5 sm:gap-1"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>EKLE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleKeypadDigit('0')}
                      className="pixel-btn col-span-3 bg-white text-[#1B232E] font-pixel font-mono-tabular text-base sm:text-lg py-1.5 sm:py-2.5 cursor-pointer"
                    >
                      0
                    </button>
                  </div>
                </div>
              )}

              <div
                className={
                  keypadOpen
                    ? 'col-span-12 sm:col-span-8 sm:order-2'
                    : 'col-span-12 sm:col-span-6 sm:order-2'
                }
              >
                <label
                  htmlFor="label-input"
                  className="block text-[11px] sm:text-xs font-bold text-[#334155] mb-0.5 sm:mb-1"
                >
                  Rahatsızlık / Branş Adı (İsteğe Bağlı)
                </label>
                <input
                  id="label-input"
                  type="text"
                  maxLength={80}
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  placeholder="Örn: Hipertansiyon Klas 2, Tip II Diyabet"
                  className="pixel-input w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-base text-[#1B232E]"
                />
              </div>
            </div>

            {errorText && (
              <p
                role="alert"
                className="text-xs sm:text-sm font-bold text-[#991B1B] bg-[#FEE2E2] border-2 border-[#DC2626] px-3 py-1.5 sm:py-2"
              >
                {errorText}
              </p>
            )}
          </form>

          {/* Result Summary + Balthazard Percentage Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-5 items-stretch">
            {/* Left: Main Result Card */}
            <div className="lg:col-span-5 bg-white border-2 border-[#1B232E] p-2.5 sm:p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 border-b border-[#E2E8D8] pb-1.5 sm:pb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Kurul Engel Oranı
                </span>
                <span className="font-mono-tabular text-[11px] sm:text-xs font-semibold text-[#475569]">
                  {result.sortedEntries.length} rahatsızlık
                  {result.age65Applied ? ' · 65+ Yaş Dahil' : ''}
                </span>
              </div>

              <div className="py-1.5 sm:py-3 flex items-baseline justify-between gap-3">
                <div>
                  <div className="font-pixel font-mono-tabular text-3xl sm:text-5xl text-[#1B232E] leading-none">
                    %{result.roundedTotal}
                  </div>
                  <div className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-[#475569] font-mono-tabular">
                    Kesin Balthazard Değeri: %{formatTrDecimal(result.rawTotal)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] sm:text-xs text-[#64748B] font-semibold">
                    En Yüksek Tek Oran
                  </div>
                  <div className="font-pixel font-mono-tabular text-lg sm:text-xl text-[#1B232E]">
                    %{result.sortedEntries[0]?.rate ?? 0}
                  </div>
                </div>
              </div>

              <div className="pt-1.5 sm:pt-2 border-t border-[#E2E8D8] flex items-center justify-between text-[11px] sm:text-xs text-[#475569]">
                <span>Yuvarlama Kuralı:</span>
                <span className="font-semibold text-[#1B232E]">
                  0,5 ve üzeri üst tam sayıya
                </span>
              </div>
            </div>

            {/* Right: Balthazard Rate Progress Bar (No HP / Can framing) */}
            <div className="lg:col-span-7 bg-[#EBF1E1] border-2 border-[#1B232E] p-2.5 sm:p-4 flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <PixelPokeball size={16} active={result.roundedTotal > 0} />
                  <span className="font-pixel text-[11px] sm:text-sm text-[#1B232E]">
                    BALTHAZARD ENGEL ORANI GÖSTERGESİ
                  </span>
                </div>
                <span
                  className={`border-2 px-1.5 py-0.5 sm:px-2 text-[11px] sm:text-xs font-bold ${barVisual.badgeTone}`}
                >
                  {barVisual.badgeText}
                </span>
              </div>

              <div className="my-2 sm:my-4">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#1B232E] mb-1 sm:mb-1.5 font-mono-tabular">
                  <span>BİRLEŞİK ENGEL ORANI: %{result.roundedTotal}</span>
                  <span>ÜST SINIR: %100</span>
                </div>
                <div className="bg-[#1B232E] p-1 border-2 border-[#1B232E]">
                  <div className="h-4 sm:h-6 bg-[#CBD5E1] relative overflow-hidden">
                    <div
                      className={`hp-fill-bar h-full ${barVisual.barColor} transition-[width] duration-300 ease-out`}
                      style={{ width: `${result.roundedTotal}%` }}
                    />
                    <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                      <div className="border-r border-[#1B232E]/35" />
                      <div className="border-r border-[#1B232E]/35" />
                      <div className="border-r border-[#1B232E]/35" />
                      <div className="border-r border-[#1B232E]/35" />
                      <div />
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Thresholds Quick Strip */}
              <div className="grid grid-cols-3 gap-2">
                {result.thresholds.map((th) => (
                  <div
                    key={th.code}
                    title={`${th.code} (${th.met ? 'Uygun' : 'Altında'}) — ${th.description}`}
                    aria-label={`${th.code}: ${th.met ? 'Uygun' : 'Altında'}`}
                    className={`border-2 px-2 py-1 sm:py-1.5 flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap ${
                      th.met
                        ? 'border-[#1B232E] bg-[#FEF08A] text-[#1B232E] font-bold'
                        : 'border-[#CBD5C0] bg-white/80 text-[#64748B] font-semibold'
                    }`}
                  >
                    {th.met && (
                      <Check className="w-3.5 h-3.5 text-[#166534] shrink-0" />
                    )}
                    <span className="font-mono-tabular">{th.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sorted Active Entries List (Madde b) */}
          <div className="bg-white border-2 border-[#1B232E] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8D8] pb-2">
              <h2 className="font-pixel text-xs sm:text-sm text-[#1B232E]">
                SIRALANMIŞ RAHATSIZLIK LİSTESİ (MADDE B: EN YÜKSEKTEN EN DÜŞÜĞE)
              </h2>
              <span className="text-xs text-[#475569]">
                Balthazard gereği oranlar otomatik büyükten küçüğe sıralanır
              </span>
            </div>

            {result.sortedEntries.length === 0 ? (
              <div className="py-8 text-center space-y-2 text-[#475569]">
                <p className="text-sm font-semibold text-[#1B232E]">
                  Henüz engel oranı eklenmedi.
                </p>
                <p className="text-xs sm:text-sm">
                  Yukarıdaki kutudan oran girebilir, <span className="font-bold">Örnek Yükle</span> ile test edebilir veya aşağıdaki{' '}
                  <a
                    href="#ek2-kilavuz"
                    className="font-bold text-[#DC2626] underline"
                  >
                    Ek-2 Alan Kılavuzu
                  </a>{' '}
                  branşlarından her kademedeki oranı tek tıkla ekleyebilirsiniz.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#E2E8D8]">
                {result.sortedEntries.map((entry, idx) => (
                  <li
                    key={entry.id}
                    className="py-2.5 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-pixel text-xs bg-[#1B232E] text-white px-2 py-1 shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-sm sm:text-base text-[#1B232E] truncate">
                          {entry.label}
                        </div>
                        {entry.source && (
                          <div className="text-xs text-[#64748B]">
                            Kaynak: {entry.source}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const next = Math.max(1, entry.rate - 1);
                          onUpdateRate(entry.id, next);
                        }}
                        disabled={entry.rate <= 1}
                        className="pixel-btn bg-[#E2E8D8] text-[#1B232E] p-1.5 cursor-pointer disabled:opacity-40"
                        aria-label={`${entry.label} oranını azalt`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-pixel font-mono-tabular text-base bg-[#EEF2E6] border-2 border-[#1B232E] px-3 py-1 min-w-[68px] text-center">
                        %{entry.rate}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const next = Math.min(100, entry.rate + 1);
                          onUpdateRate(entry.id, next);
                        }}
                        disabled={entry.rate >= 100}
                        className="pixel-btn bg-[#E2E8D8] text-[#1B232E] p-1.5 cursor-pointer disabled:opacity-40"
                        aria-label={`${entry.label} oranını artır`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveEntry(entry.id)}
                        className="pixel-btn bg-[#FEE2E2] text-[#991B1B] p-1.5 cursor-pointer ml-1"
                        aria-label={`${entry.label} kaydını sil`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Step-by-Step Formula Breakdown Section */}
      <section
        id="formul-dokumu"
        className="pixel-box bg-[#FFFFFF] p-4 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1B232E] pb-3">
          <div>
            <h2 className="font-pixel text-sm sm:text-base text-[#1B232E]">
              ADIM ADIM FORMÜL DÖKÜMÜ
            </h2>
          </div>
          {result.sortedEntries.length > 0 && (
            <div className="font-mono-tabular text-sm font-bold bg-[#EEF2E6] border-2 border-[#1B232E] px-3 py-1.5">
              Sonuç: %{formatTrDecimal(result.rawTotal)} → %{result.roundedTotal}
            </div>
          )}
        </div>

        {result.sortedEntries.length === 0 ? (
          <p className="text-sm text-[#475569]">
            Formül adımlarını görmek için en az bir engel oranı ekleyiniz. İki veya daha fazla oran eklendiğinde Balthazard çıkarma, çarpma ve ekleme işlemleri burada satır satır gösterilir.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Step a & b */}
            <div className="bg-[#F7FAF1] border-2 border-[#1B232E] p-3.5 space-y-1.5">
              <div className="font-pixel text-xs text-[#DC2626]">
                ADIM A & B — TESPİT VE BÜYÜKTEN KÜÇÜĞE SIRALAMA
              </div>
              <p className="text-sm text-[#1B232E]">
                Sıralanan oranlar:{' '}
                <span className="font-mono-tabular font-bold">
                  {result.sortedEntries
                    .map((e) => `%${e.rate} (${e.label})`)
                    .join('  →  ')}
                </span>
              </p>
            </div>

            {result.sortedEntries.length === 1 && !result.age65Applied ? (
              <div className="bg-[#F7FAF1] border-2 border-[#1B232E] p-3.5 text-sm text-[#1B232E]">
                Tek rahatsızlık girildiği için doğrudan en yüksek oran kabul edilir:{' '}
                <span className="font-mono-tabular font-bold">
                  %{result.roundedTotal}
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                {result.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-[#F7FAF1] border-2 border-[#1B232E] p-3.5 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-pixel text-xs text-[#1B232E]">
                        {step.type === 'age65'
                          ? `ADIM ${step.stepNumber} — 65 YAŞ ÜZERİ +%10 BALTHAZARD İLAVESİ`
                          : step.stepNumber === 1
                            ? 'ADIM 1 (MADDE C & Ç) — İLK İKİ ORANIN BİRLEŞTİRİLMESİ'
                            : `ADIM ${step.stepNumber} (MADDE D) — BİLEŞİK ORAN + SIRADAKİ RAHATSIZLIK`}
                      </span>
                      <span className="font-mono-tabular text-xs font-bold bg-[#FEF08A] border border-[#1B232E] px-2 py-0.5">
                        Ara Sonuç: %{formatTrDecimal(step.resultExact)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs sm:text-sm font-mono-tabular">
                      <div className="bg-white border border-[#CBD5C0] p-2">
                        <div className="text-[#64748B] text-xs font-sans">
                          c) %100’den Kalan Miktar
                        </div>
                        <div className="font-bold text-[#1B232E]">
                          100 − {formatTrDecimal(step.firstValue)} ={' '}
                          {formatTrDecimal(step.remainingCapacity)}
                        </div>
                      </div>

                      <div className="bg-white border border-[#CBD5C0] p-2">
                        <div className="text-[#64748B] text-xs font-sans">
                          ç) Kalan × İkinci Oran ÷ 100
                        </div>
                        <div className="font-bold text-[#1B232E]">
                          ({formatTrDecimal(step.remainingCapacity)} ×{' '}
                          {formatTrDecimal(step.secondValue)}) ÷ 100 ={' '}
                          {formatTrDecimal(step.addedAmount)}
                        </div>
                      </div>

                      <div className="bg-white border border-[#CBD5C0] p-2">
                        <div className="text-[#64748B] text-xs font-sans">
                          En Yüksek / Önceki Orana Ekleme
                        </div>
                        <div className="font-bold text-[#166534]">
                          {formatTrDecimal(step.firstValue)} +{' '}
                          {formatTrDecimal(step.addedAmount)} = %
                          {formatTrDecimal(step.resultExact)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Final Rounding */}
            <div className="bg-[#EEF2E6] border-2 border-[#1B232E] p-3.5 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>
                <strong className="font-pixel text-xs">NİHAİ YUVARLAMA:</strong>{' '}
                Kesin değer olan{' '}
                <span className="font-mono-tabular font-bold">
                  %{formatTrDecimal(result.rawTotal)}
                </span>{' '}
                mevzuat gereği 0,5 ve üzeri üst tam sayıya yuvarlanarak{' '}
                <span className="font-mono-tabular font-bold text-[#DC2626]">
                  %{result.roundedTotal}
                </span>{' '}
                olarak belirlenir.
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
