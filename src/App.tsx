import React, { useEffect, useState } from 'react';
import { ExternalLink, Scale } from 'lucide-react';
import { BalthazardCalculator } from './components/BalthazardCalculator';
import { Ek2CheatSheet } from './components/Ek2CheatSheet';
import { PixelPokeball } from './components/PixelSprites';
import { EK2_PDF_PATH } from './data/ek2Branches';
import type { ImpairmentEntry } from './utils/balthazard';

const ENTRIES_STORAGE_KEY = 'pokekurul_entries_v1';
const AGE65_STORAGE_KEY = 'pokekurul_age65_v1';

const MEVZUAT_URL =
  'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=31275&MevzuatTur=7&MevzuatTertip=5';

const SAMPLE_ENTRIES: Omit<ImpairmentEntry, 'id'>[] = [
  {
    label: 'Tip II Diabetes Mellitus (Komplikasyonsuz)',
    rate: 20,
    source: 'Örnek · Endokrin',
  },
  {
    label: 'Hipertansiyon — Klas 2',
    rate: 20,
    source: 'Örnek · Kardiyovasküler',
  },
  {
    label: 'Lomber Omurga Yaralanma — Kategori II',
    rate: 8,
    source: 'Örnek · Kas-İskelet',
  },
];

function createEntryId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [entries, setEntries] = useState<ImpairmentEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(ENTRIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [applyAge65, setApplyAge65] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(AGE65_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore storage errors
    }
  }, [entries]);

  useEffect(() => {
    try {
      window.localStorage.setItem(AGE65_STORAGE_KEY, String(applyAge65));
    } catch {
      // ignore storage errors
    }
  }, [applyAge65]);

  const handleAddEntry = (newEntry: Omit<ImpairmentEntry, 'id'>) => {
    setEntries((prev) => [...prev, { ...newEntry, id: createEntryId() }]);
  };

  const handleUpdateRate = (id: string, nextRate: number) => {
    setEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rate: nextRate } : item))
    );
  };

  const handleRemoveEntry = (id: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setEntries([]);
  };

  const handleLoadExample = () => {
    setEntries(
      SAMPLE_ENTRIES.map((item) => ({
        ...item,
        id: createEntryId(),
      }))
    );
  };

  const handleToggleAge65 = () => {
    setApplyAge65((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Strict 3-Zone Top Bar */}
      <header className="bg-[#FFFFFF] border-b-[3px] border-[#1B232E] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-12 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hesaplayici"
            className="flex items-center gap-2.5 shrink-0 whitespace-nowrap"
          >
            <PixelPokeball size={26} active />
            <span className="font-pixel text-base sm:text-lg text-[#1B232E] tracking-tight">
              PokéKurul
            </span>
          </a>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav
            aria-label="Ana gezinme"
            className="hidden md:flex items-center gap-6 text-sm font-bold text-[#334155]"
          >
            <a
              href="#hesaplayici"
              className="whitespace-nowrap shrink-0 hover:text-[#DC2626] transition-colors"
            >
              Hesaplayıcı
            </a>
            <a
              href="#formul-dokumu"
              className="whitespace-nowrap shrink-0 hover:text-[#DC2626] transition-colors"
            >
              Formül Dökümü
            </a>
            <a
              href="#ek2-kilavuz"
              className="whitespace-nowrap shrink-0 hover:text-[#DC2626] transition-colors"
            >
              Ek-2 Kılavuzu
            </a>
            <a
              href="#yasal-bilgi"
              className="whitespace-nowrap shrink-0 hover:text-[#DC2626] transition-colors"
            >
              Yasal Bilgi
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <a
            href={EK2_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn bg-[#DC2626] text-white px-3.5 py-2 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Ek-2 PDF Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-6 py-2.5 sm:py-8 space-y-5 sm:space-y-8">
        <BalthazardCalculator
          entries={entries}
          onAddEntry={handleAddEntry}
          onUpdateRate={handleUpdateRate}
          onRemoveEntry={handleRemoveEntry}
          onClearAll={handleClearAll}
          onLoadExample={handleLoadExample}
          applyAge65={applyAge65}
          onToggleAge65={handleToggleAge65}
        />

        <Ek2CheatSheet onAddEntry={handleAddEntry} />

        {/* Legal Basis & Reference Footer Section */}
        <footer
          id="yasal-bilgi"
          className="pixel-box bg-[#FFFFFF] p-4 sm:p-6 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1B232E] pb-3">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[#DC2626]" />
              <h2 className="font-pixel text-xs sm:text-sm text-[#1B232E]">
                MEVZUAT DAYANAĞI VE BALTHAZARD KURALLARI
              </h2>
            </div>

            <a
              href={MEVZUAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn bg-[#EEF2E6] text-[#1B232E] px-3 py-1.5 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Resmî Mevzuat (No: 31275)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#334155]">
            <div className="bg-[#F7FAF1] border-2 border-[#1B232E] p-3.5 space-y-1.5">
              <h3 className="font-bold text-[#1B232E]">
                Yönetmelik Madde 11/(2) Uygulama Sırası
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Engel oranları ayrı ayrı tespit edilir (a).</li>
                <li>Oranlar en yükseğinden başlanarak sıraya konulur (b).</li>
                <li>En yüksek oran %100’den çıkarılır (c).</li>
                <li>
                  Kalan miktar ikinci oran ile çarpılıp 100’e bölünür ve en yüksek orana eklenir (ç).
                </li>
                <li>
                  İkiden fazla engel varsa bileşik oran birinci sıraya alınarak işlem tekrarlanır (d).
                </li>
              </ol>
            </div>

            <div className="bg-[#F7FAF1] border-2 border-[#1B232E] p-3.5 space-y-2">
              <h3 className="font-bold text-[#1B232E]">
                Bilgilendirme ve Sorumluluk Notu
              </h3>
              <p>
                Bu araç, 20 Şubat 2019 tarihli ve 30692 sayılı Resmî Gazete’de yayımlanan{' '}
                <em>
                  Erişkinler İçin Engellilik Değerlendirmesi Hakkında Yönetmelik
                </em>{' '}
                (Mevzuat No: 31275) ve Ek-2 Alan Kılavuzu esas alınarak sade hesaplama kolaylığı sağlamak amacıyla hazırlanmıştır.
              </p>
              <p className="text-[#475569]">
                Kesin engel oranı ve bağımlılık değerlendirmesi yalnızca yetkili Sağlık Bakanlığı Engelli Sağlık Kurulu tarafından muayene ve tetkik bulgularına göre düzenlenir.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
