export interface ImpairmentEntry {
  id: string;
  label: string;
  rate: number;
  source?: string;
}

export interface BalthazardStep {
  stepNumber: number;
  type: 'combine' | 'age65';
  firstLabel: string;
  firstValue: number;
  secondLabel: string;
  secondValue: number;
  remainingCapacity: number;
  addedAmount: number;
  resultExact: number;
}

export interface LegalThresholdInfo {
  code: string;
  title: string;
  description: string;
  met: boolean;
  target: number;
}

export interface BalthazardResult {
  sortedEntries: ImpairmentEntry[];
  steps: BalthazardStep[];
  rawTotal: number;
  roundedTotal: number;
  remainingFunction: number;
  age65Applied: boolean;
  thresholds: LegalThresholdInfo[];
}

export function roundBalthazardRate(value: number): number {
  const clamped = Math.max(0, Math.min(100, value));
  // Mevzuat gereği virgülden sonraki kısım 0,5 ve üzerindeyse üst tam sayıya yuvarlanır
  return Math.min(100, Math.floor(clamped + 0.5 + 1e-9));
}

export function calculateBalthazard(
  entries: ImpairmentEntry[],
  applyAge65Bonus: boolean
): BalthazardResult {
  const validEntries = entries.filter((e) => Number.isFinite(e.rate) && e.rate > 0);
  const sortedEntries = [...validEntries].sort((a, b) => b.rate - a.rate);

  if (sortedEntries.length === 0) {
    return {
      sortedEntries: [],
      steps: [],
      rawTotal: 0,
      roundedTotal: 0,
      remainingFunction: 100,
      age65Applied: false,
      thresholds: buildThresholds(0),
    };
  }

  const steps: BalthazardStep[] = [];
  let currentExact = Math.min(100, sortedEntries[0].rate);

  for (let i = 1; i < sortedEntries.length; i++) {
    const nextEntry = sortedEntries[i];
    const remainingCapacity = 100 - currentExact;
    const addedAmount = (remainingCapacity * nextEntry.rate) / 100;
    const nextExact = Math.min(100, currentExact + addedAmount);

    steps.push({
      stepNumber: i,
      type: 'combine',
      firstLabel: i === 1 ? sortedEntries[0].label : `${i}. Ara Bileşik Oran`,
      firstValue: currentExact,
      secondLabel: nextEntry.label,
      secondValue: nextEntry.rate,
      remainingCapacity,
      addedAmount,
      resultExact: nextExact,
    });

    currentExact = nextExact;
  }

  let age65Applied = false;
  if (applyAge65Bonus && currentExact < 100) {
    const remainingCapacity = 100 - currentExact;
    const addedAmount = (remainingCapacity * 10) / 100;
    const nextExact = Math.min(100, currentExact + addedAmount);

    steps.push({
      stepNumber: steps.length + 1,
      type: 'age65',
      firstLabel: sortedEntries.length === 1 ? sortedEntries[0].label : 'Ara Bileşik Oran',
      firstValue: currentExact,
      secondLabel: '65 Yaş Üzeri İlavesi (%10)',
      secondValue: 10,
      remainingCapacity,
      addedAmount,
      resultExact: nextExact,
    });

    currentExact = nextExact;
    age65Applied = true;
  } else if (applyAge65Bonus && currentExact >= 100) {
    age65Applied = true;
  }

  const roundedTotal = roundBalthazardRate(currentExact);
  const remainingFunction = Math.max(0, 100 - roundedTotal);

  return {
    sortedEntries,
    steps,
    rawTotal: currentExact,
    roundedTotal,
    remainingFunction,
    age65Applied,
    thresholds: buildThresholds(roundedTotal),
  };
}

function buildThresholds(roundedTotal: number): LegalThresholdInfo[] {
  return [
    {
      code: '%40',
      title: 'Engelli Birey Sınırı',
      description: 'Engelli kimlik kartı, EKPSS, vergi indirimi ve temel sosyal haklar eşiği',
      met: roundedTotal >= 40,
      target: 40,
    },
    {
      code: '%70',
      title: 'İleri Düzey Engellilik Eşiği',
      description: 'Bakıma muhtaç / ileri düzey engelli aylığı ve sosyal destek üst basamağı',
      met: roundedTotal >= 70,
      target: 70,
    },
    {
      code: '%90',
      title: 'ÖTV İstisnası Üst Eşiği',
      description: 'Özel tertibat gerekmeksizin ÖTV muafiyetli araç alımı ve tam bağımlı değerlendirme sınırı',
      met: roundedTotal >= 90,
      target: 90,
    },
  ];
}

export function formatTrDecimal(value: number): string {
  return value.toLocaleString('tr-TR', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
