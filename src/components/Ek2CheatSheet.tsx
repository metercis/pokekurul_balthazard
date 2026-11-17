import React, { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { EK2_BRANCHES, EK2_PDF_PATH } from '../data/ek2Branches';
import type { ImpairmentEntry } from '../utils/balthazard';
import { PixelBook } from './PixelSprites';

interface Ek2CheatSheetProps {
  onAddEntry: (entry: Omit<ImpairmentEntry, 'id'>) => void;
}

export const Ek2CheatSheet: React.FC<Ek2CheatSheetProps> = ({ onAddEntry }) => {
  const [query, setQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const normalizedQuery = query.trim().toLocaleLowerCase('tr-TR');

  const filteredBranches = useMemo(() => {
    if (!normalizedQuery) return EK2_BRANCHES;

    return EK2_BRANCHES.map((branch) => {
      const branchMatches =
        branch.title.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
        branch.summary.toLocaleLowerCase('tr-TR').includes(normalizedQuery);

      if (branchMatches) return branch;

      const matchingGroups = branch.groups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.name.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
              item.criteria.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
              (item.options?.some((opt) =>
                opt.label.toLocaleLowerCase('tr-TR').includes(normalizedQuery)
              ) ??
                false)
          ),
        }))
        .filter((group) => group.items.length > 0);

      if (matchingGroups.length === 0) return null;

      return {
        ...branch,
        groups: matchingGroups,
      };
    }).filter((b): b is NonNullable<typeof b> => b !== null);
  }, [normalizedQuery]);

  const toggleBranch = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    for (const branch of EK2_BRANCHES) {
      next[branch.id] = true;
    }
    setExpandedIds(next);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const handleQuickAdd = (branchTitle: string, itemName: string, rate: number) => {
    onAddEntry({
      label: itemName,
      rate,
      source: `Ek-2 · ${branchTitle}`,
    });
  };

  return (
    <section
      id="ek2-kilavuz"
      className="pixel-box bg-[#FFFFFF] p-4 sm:p-6 space-y-5"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#1B232E] pb-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#EEF2E6] border-2 border-[#1B232E] p-2 shrink-0">
            <PixelBook size={24} />
          </div>
          <div>
            <h2 className="font-pixel text-sm sm:text-base text-[#1B232E]">
              EK-2 ALAN KILAVUZU — BRANŞ HIZLI REFERANSI
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
              Resmî 168 sayfalık Erişkinler İçin Engelli Sağlık Kurulu Raporları Alan Kılavuzu’ndaki 16 ana branştan oranlar. Kademeli hastalıklarda her engel oranı için ayrı ekleme düğmesi yer alır.
            </p>
          </div>
        </div>

        <a
          href={EK2_PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn bg-[#2563EB] text-white px-3.5 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0"
        >
          <span>Tam Ek-2 PDF (168 Sayfa)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Search & Expand Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Branş veya hastalık ara (örn: baston, diyabet, işitme, böbrek, astım)..."
            className="pixel-input w-full pl-9 pr-9 py-2 text-sm text-[#1B232E]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Aramayı temizle"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1B232E] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="pixel-btn bg-[#EEF2E6] text-[#1B232E] px-3 py-2 text-xs font-bold cursor-pointer"
          >
            Tümünü Aç
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="pixel-btn bg-[#EEF2E6] text-[#1B232E] px-3 py-2 text-xs font-bold cursor-pointer"
          >
            Tümünü Kapat
          </button>
        </div>
      </div>

      {/* Branch Accordions */}
      {filteredBranches.length === 0 ? (
        <div className="bg-[#F7FAF1] border-2 border-[#1B232E] p-6 text-center text-sm text-[#475569]">
          <p className="font-bold text-[#1B232E] mb-1">
            “{query}” için eşleşen kılavuz maddesi bulunamadı.
          </p>
          <p>
            Farklı bir anahtar kelime deneyebilir veya tüm tablolar için{' '}
            <a
              href={EK2_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC2626] font-bold underline"
            >
              Ek-2 PDF dokümanını
            </a>{' '}
            açabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBranches.map((branch) => {
            const isOpen = normalizedQuery ? true : !!expandedIds[branch.id];
            const totalItems = branch.groups.reduce(
              (acc, g) => acc + g.items.length,
              0
            );

            return (
              <div
                key={branch.id}
                className="border-2 border-[#1B232E] bg-[#F7FAF1]"
              >
                <button
                  type="button"
                  onClick={() => toggleBranch(branch.id)}
                  aria-expanded={isOpen}
                  className="w-full px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-left bg-[#EEF2E6] hover:bg-[#E2E8D8] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-[#1B232E] shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#1B232E] shrink-0" />
                    )}
                    <span className="font-pixel text-xs sm:text-sm text-[#1B232E]">
                      {branch.title}
                    </span>
                  </div>

                  <div className="text-xs text-[#475569] font-mono-tabular">
                    {branch.pageRange} · {totalItems} başlık
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 border-t-2 border-[#1B232E] space-y-4 bg-white">
                    <div className="text-xs sm:text-sm text-[#334155] space-y-1.5">
                      <p>{branch.summary}</p>
                      {branch.generalRule && (
                        <p className="bg-[#FEF9C3] border border-[#CA8A04] px-3 py-2 text-[#713F12] text-xs sm:text-sm">
                          <strong>Kılavuz Notu:</strong> {branch.generalRule}
                        </p>
                      )}
                    </div>

                    {branch.groups.map((group) => (
                      <div key={group.title} className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-[#475569] border-b border-[#E2E8D8] pb-1">
                          {group.title}
                        </h3>
                        <ul className="divide-y divide-[#E2E8D8]">
                          {group.items.map((item) => {
                            const hasOptions =
                              item.options && item.options.length > 0;

                            return (
                              <li
                                key={item.id}
                                className="py-3 flex flex-col gap-2.5"
                              >
                                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                                  <div className="min-w-0 space-y-0.5">
                                    <div className="font-bold text-sm text-[#1B232E]">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-[#475569]">
                                      {item.criteria}
                                    </div>
                                    {item.rateNote && (
                                      <div className="text-xs text-[#64748B] font-mono-tabular">
                                        {item.rateNote}
                                      </div>
                                    )}
                                  </div>

                                  {!hasOptions && (
                                    <div className="flex items-center gap-2.5 shrink-0">
                                      <span className="font-pixel font-mono-tabular text-sm bg-[#EEF2E6] border-2 border-[#1B232E] px-2.5 py-1 min-w-[58px] text-center">
                                        %{item.rate}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleQuickAdd(
                                            branch.title,
                                            item.name,
                                            item.rate
                                          )
                                        }
                                        className="pixel-btn bg-[#16A34A] text-white px-3 py-1.5 text-xs font-bold cursor-pointer flex items-center gap-1"
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Ekle</span>
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {hasOptions && (
                                  <div className="flex flex-wrap gap-2 pt-0.5">
                                    {item.options!.map((opt) => (
                                      <button
                                        key={`${item.id}-${opt.label}-${opt.rate}`}
                                        type="button"
                                        onClick={() =>
                                          handleQuickAdd(
                                            branch.title,
                                            `${item.name} — ${opt.label}`,
                                            opt.rate
                                          )
                                        }
                                        className="pixel-btn bg-[#EEF2E6] hover:bg-[#DCFCE7] text-[#1B232E] px-2.5 py-1.5 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                                      >
                                        <span>{opt.label}</span>
                                        <span className="font-pixel font-mono-tabular bg-[#16A34A] text-white px-1.5 py-0.5">
                                          %{opt.rate}
                                        </span>
                                        <Plus className="w-3.5 h-3.5 text-[#166534]" />
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
