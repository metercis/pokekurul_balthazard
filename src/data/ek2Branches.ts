export interface Ek2RateOption {
  label: string;
  rate: number;
}

export interface Ek2ConditionItem {
  id: string;
  name: string;
  criteria: string;
  rate: number;
  rateNote?: string;
  options?: Ek2RateOption[];
}

export interface Ek2SubGroup {
  title: string;
  items: Ek2ConditionItem[];
}

export interface Ek2Branch {
  id: string;
  title: string;
  pageRange: string;
  summary: string;
  generalRule?: string;
  groups: Ek2SubGroup[];
}

export const EK2_PDF_PATH = '/assets/aistudio/Ek-2_Alan_Kilavuzu_3.1.2019_4f39686f.pdf';

export const EK2_BRANCHES: Ek2Branch[] = [
  {
    id: 'kbb',
    title: 'Kulak Burun Boğaz',
    pageRange: 'Sayfa 1–12',
    summary: 'İşitme kayıpları, konuşma ve ses bozuklukları, vestibüler denge, yüz şekil bozuklukları, hava yolu defektleri, koku/tat ve yutma.',
    generalRule: 'İşitme kaybına eşlik eden konuşma bozukluğu oranı Balthazard formülü ile birleştirilir. Kalıcı trakeotomi (%40) ile konuşma engeli Balthazard ile toplanır.',
    groups: [
      {
        title: 'İşitme Engeli (Tablo 2 — İşitme Engeli % karşılığı)',
        items: [
          { id: 'kbb-i-1', name: 'Binaural İşitme Kaybı (%1,8 – %4,2)', criteria: 'Tablo 1 kesişim sonucu %1,8–%4,2 işitme kaybı', rate: 2 },
          { id: 'kbb-i-2', name: 'Binaural İşitme Kaybı (%13,2 – %15,9)', criteria: 'Tablo 1 kesişim sonucu %13,2–%15,9 işitme kaybı', rate: 10 },
          { id: 'kbb-i-3', name: 'Binaural İşitme Kaybı (%27,2 – %30,0)', criteria: 'Tablo 1 kesişim sonucu %27,2–%30,0 işitme kaybı', rate: 20 },
          { id: 'kbb-i-4', name: 'Binaural İşitme Kaybı (%50,0 – %53,1)', criteria: 'Tablo 1 kesişim sonucu %50,0–%53,1 işitme kaybı', rate: 34 },
          { id: 'kbb-i-5', name: 'Binaural İşitme Kaybı (%67,2 – %70,0)', criteria: 'Tablo 1 kesişim sonucu %67,2–%70,0 işitme kaybı', rate: 40 },
          { id: 'kbb-i-6', name: 'Tam İki Taraflı İşitme Kaybı (%98,9 – %100)', criteria: 'Her iki kulakta dört frekans toplamı ≥370 dB', rate: 52 },
        ],
      },
      {
        title: 'Konuşma ve Ses (Tablo 5), Denge, Hava Yolu & Yutma',
        items: [
          {
            id: 'kbb-k-1',
            name: 'Konuşma Engeli (Tablo 5 Puan Kademeleri)',
            criteria: 'Konuşma engeli puanına göre kademeli engel oranları',
            rate: 10,
            options: [
              { label: '4–5 Puan', rate: 10 },
              { label: '22–24 Puan', rate: 30 },
              { label: '38–40 Puan (Afoni)', rate: 40 },
            ],
          },
          {
            id: 'kbb-d-1',
            name: 'Vestibüler Bozukluk — Sınıflar',
            criteria: 'Günlük aktivitelerde bağımsızlık düzeyine göre Sınıf 1–4',
            rate: 15,
            options: [
              { label: 'Sınıf 1', rate: 5 },
              { label: 'Sınıf 2', rate: 15 },
              { label: 'Sınıf 3', rate: 25 },
              { label: 'Sınıf 4', rate: 35 },
            ],
          },
          { id: 'kbb-h-1', name: 'Kalıcı Trakeotomi / Stoma', criteria: 'Konuşma engeli oranı Balthazard ile ayrıca eklenir', rate: 40 },
          { id: 'kbb-kt-1', name: 'Koku veya Tat Duyusu Kaybı', criteria: 'Objektif nedenlerle bilateral kayıp (her biri için %3)', rate: 3 },
          {
            id: 'kbb-y-1',
            name: 'Çiğneme ve Yutma Bozukluğu',
            criteria: 'Rehabilitasyondan en az 6 ay sonra beslenme düzeyine göre',
            rate: 30,
            options: [
              { label: 'Sınırlı diyet', rate: 10 },
              { label: 'Sıvı / yarı katı', rate: 30 },
              { label: 'Nazogastrik / Gastrostomi', rate: 50 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ruhsal',
    title: 'Zihinsel, Ruhsal, Davranışsal',
    pageRange: 'Sayfa 13–15',
    summary: 'Zekâ işlev bozuklukları, şizofreni, şizoaffektif, yaygın gelişimsel bozukluklar, duygudurum, anksiyete ve OKB.',
    generalRule: 'Engellilik oranları belirtilere göre değil, işlevsellik düzeylerine göre verilir. Geçici fonksiyon kaybı grubundaki hastalıklar 1 yıl sonra kontrol gerektirir.',
    groups: [
      {
        title: 'Zekâ İşlevleri & Yaygın Gelişimsel Bozukluklar',
        items: [
          {
            id: 'ruh-z-1',
            name: 'Zekâ İşlev Bozuklukları (IQ Düzeyine Göre)',
            criteria: 'Sınırda mental kapasiteden ağır zekâ geriliğine kadar kademeler',
            rate: 50,
            options: [
              { label: 'Sınırda (IQ 70–80)', rate: 25 },
              { label: 'Hafif (IQ 50–69)', rate: 50 },
              { label: 'Orta (IQ 35–49)', rate: 70 },
              { label: 'Ağır (IQ 20–34)', rate: 90 },
            ],
          },
          {
            id: 'ruh-z-5',
            name: 'Yaygın Gelişimsel Bozukluklar',
            criteria: 'Eşlik eden bozukluklar ayrıca değerlendirilir',
            rate: 40,
            options: [
              { label: 'Asperger / Atipik Otizm', rate: 40 },
              { label: 'Otizm / Rett / Disintegratif', rate: 80 },
            ],
          },
        ],
      },
      {
        title: 'Psikotik, Duygudurum ve Anksiyete Bozuklukları',
        items: [
          {
            id: 'ruh-p-1',
            name: 'Şizofreni / Şizoaffektif / Sanrısal Bozukluk',
            criteria: 'Tedavi ile işlevsellik düzeyine göre',
            rate: 45,
            options: [
              { label: 'Tedaviyle düzelen', rate: 45 },
              { label: 'Kısmi düzelen', rate: 65 },
              { label: 'Düzelmeyen', rate: 80 },
            ],
          },
          {
            id: 'ruh-d-1',
            name: 'Bipolar / Manik Nöbet',
            criteria: '1 yıl sonra kontrol gerektirir (Tam düzelen: %0)',
            rate: 40,
            options: [
              { label: 'Kısmen düzelen', rate: 40 },
              { label: 'Düzelmeyen', rate: 70 },
            ],
          },
          {
            id: 'ruh-d-2',
            name: 'Yineleyen Depresif Bozukluk',
            criteria: 'Remisyonda olanlara engel oranı verilmez',
            rate: 20,
            options: [
              { label: 'Kısmen düzelen', rate: 20 },
              { label: 'Düzelmeyen', rate: 40 },
            ],
          },
          {
            id: 'ruh-a-1',
            name: 'Anksiyete / Panik / Somatoform Bozukluk',
            criteria: 'Tedavi ile işlevsellik düzeyine göre',
            rate: 20,
            options: [
              { label: 'Kısmen düzelen', rate: 20 },
              { label: 'Düzelmeyen', rate: 40 },
            ],
          },
          {
            id: 'ruh-a-2',
            name: 'OKB / TSSB / Yeme Bozukluğu',
            criteria: 'Tedavi ile işlevsellik düzeyine göre',
            rate: 40,
            options: [
              { label: 'Kısmen düzelen', rate: 40 },
              { label: 'Düzelmeyen', rate: 60 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'deri',
    title: 'Deri Hastalıkları',
    pageRange: 'Sayfa 16–22',
    summary: 'Psoriasis, atopik dermatit, hidradenitis supurativa, vitiligo, Behçet, otoimmün büllü hastalıklar ve deri tümörleri.',
    generalRule: 'Vücut yüzeyini kaplama oranına veya hastalık şiddeti tablosuna (Hafif–Çok Şiddetli) göre belirlenir.',
    groups: [
      {
        title: 'İnflamatuvar & Ekzematöz Hastalıklar',
        items: [
          {
            id: 'der-1',
            name: 'Psoriasis (Vücut Yüzey Tutulumuna Göre)',
            criteria: 'Hafif (%0–19) · Orta (%20–49) · Şiddetli (%50–79) · Çok şiddetli (%80–100)',
            rate: 15,
            options: [
              { label: 'Hafif (%0–19)', rate: 5 },
              { label: 'Orta (%20–49)', rate: 15 },
              { label: 'Şiddetli (%50–79)', rate: 30 },
              { label: 'Çok şiddetli (%80+)', rate: 40 },
            ],
          },
          {
            id: 'der-3',
            name: 'Atopik Dermatit',
            criteria: 'Vücut yüzeyini kaplama oranına göre kademeli',
            rate: 20,
            options: [
              { label: 'Hafif', rate: 5 },
              { label: 'Orta', rate: 10 },
              { label: 'Şiddetli (%50–79)', rate: 20 },
              { label: 'Çok şiddetli (%80–100)', rate: 40 },
            ],
          },
          { id: 'der-4', name: 'Eritroderma', criteria: 'Altta yatan primer hastalık için ayrıca puan verilmez', rate: 40 },
          {
            id: 'der-5',
            name: 'Vitiligo',
            criteria: 'Vücut yüzeyi %50–100 tutulumu ve yüz/el lokalizasyonu',
            rate: 10,
            options: [
              { label: 'Yüz ve ele lokalize', rate: 5 },
              { label: '%50–100 vücut yüzeyi', rate: 10 },
            ],
          },
          {
            id: 'der-6',
            name: 'Behçet Hastalığı (Mukokutanöz)',
            criteria: 'Hafif/Orta ile tedaviye dirençli şiddetli mukokutanöz tutulum',
            rate: 10,
            options: [
              { label: 'Hafif / Orta', rate: 10 },
              { label: 'Şiddetli (Dirençli)', rate: 20 },
            ],
          },
          {
            id: 'der-7',
            name: 'Otoimmün Büllü Hastalıklar (Pemfigus vb.)',
            criteria: 'Hastalık şiddeti tablosuna göre',
            rate: 20,
            options: [
              { label: 'Hafif', rate: 10 },
              { label: 'Orta', rate: 20 },
              { label: 'Şiddetli', rate: 40 },
              { label: 'Çok şiddetli', rate: 60 },
            ],
          },
          {
            id: 'der-8',
            name: 'Epidermolizis Büllosa',
            criteria: 'Klinik tutulum şiddetine göre kademeli',
            rate: 40,
            options: [
              { label: 'Hafif', rate: 20 },
              { label: 'Orta', rate: 40 },
              { label: 'Şiddetli', rate: 60 },
              { label: 'Çok şiddetli', rate: 80 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hematoloji',
    title: 'Hematolojik Hastalıklar',
    pageRange: 'Sayfa 23–26',
    summary: 'Anemiler, talasemi, orak hücreli anemi, lösemiler, lenfomalar, koagülasyon bozuklukları ve kök hücre nakli.',
    groups: [
      {
        title: 'Anemiler, Hemoglobinopatiler & Lösemiler',
        items: [
          {
            id: 'hem-1',
            name: 'Talasemi Sendromları',
            criteria: 'Intermedia, Major ve ağır/terminal olgular',
            rate: 40,
            options: [
              { label: 'Intermedia', rate: 40 },
              { label: 'Major', rate: 70 },
              { label: 'Ağır / Terminal', rate: 80 },
            ],
          },
          {
            id: 'hem-3',
            name: 'Orak Hücreli Anemi',
            criteria: 'Yıllık kriz sıklığı ve organ komplikasyonuna göre',
            rate: 40,
            options: [
              { label: 'Yılda ≤1 kriz', rate: 40 },
              { label: 'Yılda >1 kriz / Stroke', rate: 80 },
            ],
          },
          {
            id: 'hem-4',
            name: 'Akut Lösemi',
            criteria: 'Remisyon süresi ve tedavi durumuna göre',
            rate: 60,
            options: [
              { label: 'Remisyon >5 yıl', rate: 40 },
              { label: 'Tam remisyon ≤5 yıl', rate: 60 },
              { label: 'Tedavisi devam eden', rate: 70 },
              { label: 'Remisyona girmeyen', rate: 90 },
            ],
          },
          {
            id: 'hem-5',
            name: 'Kronik Myelositik Lösemi (KML)',
            criteria: 'Sitogenetik yanıt ve hastalık fazına göre',
            rate: 30,
            options: [
              { label: 'Tam sitogenetik yanıt', rate: 30 },
              { label: '6. ayda major yanıt yok', rate: 60 },
              { label: 'Akselere / Blastik faz', rate: 90 },
            ],
          },
          {
            id: 'hem-6',
            name: 'Hodgkin Lenfoma',
            criteria: 'Evre ve remisyon süresine göre',
            rate: 60,
            options: [
              { label: '5 yıl sonra / III–IV remisyon', rate: 40 },
              { label: 'Evre I–II remisyon ≤5 yıl', rate: 60 },
              { label: 'Remisyona girmeyen', rate: 80 },
            ],
          },
          {
            id: 'hem-7',
            name: 'Hemofili / Koagülopati',
            criteria: 'Faktör aktivite yüzdesine göre',
            rate: 40,
            options: [
              { label: 'Faktör >%5', rate: 20 },
              { label: 'Faktör %2–5', rate: 40 },
              { label: 'Faktör <%2', rate: 80 },
            ],
          },
          {
            id: 'hem-8',
            name: 'Allojenik Kök Hücre Nakli',
            criteria: 'Nakil sonrası remisyon ve immünosüpresif tedavi durumuna göre',
            rate: 30,
            options: [
              { label: 'Komplikasyonsuz', rate: 30 },
              { label: 'Tedavisi devam eden', rate: 60 },
              { label: 'Ağır komplikasyon', rate: 80 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kardiyovaskuler',
    title: 'Kardiyovasküler Sistem',
    pageRange: 'Sayfa 27–32',
    summary: 'Hipertansiyon, koroner arter hastalığı, kalp yetmezliği, kapak hastalıkları, aritmiler, pulmoner hipertansiyon ve damar hastalıkları.',
    generalRule: 'Kalp transplantasyonu %70 oranındadır; transplante kalbin fonksiyonları ayrıca değerlendirilip Balthazard ile birleştirilir.',
    groups: [
      {
        title: 'Hipertansiyon, Kalp Yetmezliği & Koroner Arter',
        items: [
          {
            id: 'kard-1',
            name: 'Hipertansiyon (Klas 1–3)',
            criteria: 'Hedef organ hasarı (Proteinüri / LVH / Retinopati / SVO) durumuna göre',
            rate: 10,
            options: [
              { label: 'Klas 1 (Komplikasyonsuz)', rate: 10 },
              { label: 'Klas 2 (1 hedef organ)', rate: 20 },
              { label: 'Klas 3 (≥2 bulgu / DKB>120)', rate: 50 },
            ],
          },
          {
            id: 'kard-4',
            name: 'Koroner Arter Hastalığı (Klas 1–4)',
            criteria: 'Anjiyo darlığı, MI öyküsü, NYHA sınıfı ve EF değerine göre',
            rate: 30,
            options: [
              { label: 'Klas 1 (<%50 darlık)', rate: 10 },
              { label: 'Klas 2 (EF >%50)', rate: 30 },
              { label: 'Klas 3 (EF %30–50)', rate: 50 },
              { label: 'Klas 4 (EF <%30)', rate: 100 },
            ],
          },
          {
            id: 'kard-8',
            name: 'Kalp Yetmezliği (Evre I–IV)',
            criteria: 'NYHA fonksiyonel sınıfı ve ejeksiyon fraksiyonuna (EF) göre',
            rate: 30,
            options: [
              { label: 'Evre I', rate: 10 },
              { label: 'Evre II (EF %50–60)', rate: 30 },
              { label: 'Evre III (EF %30–50)', rate: 50 },
              { label: 'Evre IV (EF <%30)', rate: 100 },
            ],
          },
          {
            id: 'kard-9',
            name: 'Aritmiler (Pil / İCD / İlaç)',
            criteria: 'Tedavi biçimi ve klinik sınıfa göre',
            rate: 20,
            options: [
              { label: 'Klas 1', rate: 10 },
              { label: 'Klas 2 (İlaç / Pil)', rate: 20 },
              { label: 'Klas 2 (İCD)', rate: 30 },
              { label: 'Klas 3', rate: 40 },
              { label: 'Klas 3 (İleri)', rate: 50 },
            ],
          },
          {
            id: 'kard-10',
            name: 'Venöz Yetmezlik / ASO (Damar Hastalıkları)',
            criteria: 'DVT sekeli ve staz ülseri yaygınlığına göre',
            rate: 20,
            options: [
              { label: 'Ülsersiz DVT sekeli', rate: 20 },
              { label: 'Tek ekstremite staz ülseri', rate: 40 },
              { label: 'İki ekstremite staz ülseri', rate: 70 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'gorme',
    title: 'Görme Sistemi',
    pageRange: 'Sayfa 33–63',
    summary: 'Görme keskinliği puanı (GKP), İşlevsel Görme Puanı (İGP = İKP×İAP/100), tek gözlülük (monokülarite) ve görme alanı.',
    generalRule: 'İKP = (3×Binoküler + Sağ + Sol) / 5. GSYO = 100 - İGP. GSYO ≤50 ise Engel Oranı = GSYO; GSYO >50 ise (GSYO - 50) × 0,8 + 50 (üst tam sayıya yuvarlanır).',
    groups: [
      {
        title: 'Sık Karşılaşılan Görme Engel Oranları (Kılavuz Örnekleri & Tablo 3)',
        items: [
          { id: 'goz-1', name: 'Tek Gözün Tam Körlüğü (Diğer Göz Tam / 20/20)', criteria: 'Monoküler durum: İKP = 80, İAP = 85 → İGP = 68 → GSYO = 32', rate: 32 },
          { id: 'goz-2', name: 'Hafif Görme Kaybı (Her İki Göz 20/40)', criteria: 'İKP = 85 → GSYO = 15 (Tablo 1: 0,50 ondalık = 85 GKP)', rate: 15 },
          { id: 'goz-3', name: 'Tek Göz 20/60, Diğer Göz 20/800 (Katarakt Örneği)', criteria: 'Binoküler 20/60 → İKP = 64 → GSYO = 36 (2 yıl süreli rapor)', rate: 36 },
          { id: 'goz-4', name: 'Homonim Hemianopi (Keskinlik Normal)', criteria: 'İAP = 50, İKP = 100 → GSYO = 50', rate: 50 },
          { id: 'goz-5', name: 'Bitemporal Hemianopi (Keskinlik Normal)', criteria: 'İAP = 80, İKP = 100 → GSYO = 20', rate: 20 },
          { id: 'goz-6', name: 'Her İki Gözde Tam Körlük (GSYO = 100)', criteria: 'Tablo 3 karşılığı: (100 - 50) × 0,8 + 50 = 90', rate: 90 },
          { id: 'goz-7', name: 'Her İki Gözün Ekzanterasyonu / Yokluğu', criteria: 'Hesaplama yapılmadan doğrudan kabul edilen oran', rate: 92 },
        ],
      },
    ],
  },
  {
    id: 'sindirim',
    title: 'Sindirim Sistemi',
    pageRange: 'Sayfa 64–70',
    summary: 'Üst sindirim kanalı, kolon/rektum, anal hastalıklar, stomalar, karaciğer, safra yolları, cerrahi yapılamayan herniler ve splenektomi.',
    groups: [
      {
        title: 'Sindirim Kanalı, Stoma, Karaciğer & Splenektomi',
        items: [
          {
            id: 'sin-1',
            name: 'Üst Sindirim Kanalı Hastalıkları',
            criteria: 'Sürekli tedavi, diyet gereksinimi ve kilo kaybı sınıflaması',
            rate: 25,
            options: [
              { label: 'Sınıf 1', rate: 10 },
              { label: 'Sınıf 2', rate: 25 },
              { label: 'Sınıf 3', rate: 50 },
              { label: 'Sınıf 4', rate: 75 },
            ],
          },
          {
            id: 'sin-2',
            name: 'Kolonik / Rektal Hastalıklar',
            criteria: 'Gİ semptom şiddeti, anemi ve kilo kaybına göre',
            rate: 25,
            options: [
              { label: 'Sınıf 1', rate: 10 },
              { label: 'Sınıf 2', rate: 25 },
              { label: 'Sınıf 3', rate: 50 },
              { label: 'Sınıf 4', rate: 75 },
            ],
          },
          {
            id: 'sin-3',
            name: 'Kalıcı Stomalar (Kolostomi / Gastrostomi / İleostomi)',
            criteria: 'Organ bozukluğu varsa Balthazard ile toplanır',
            rate: 10,
            options: [
              { label: 'Kolostomi', rate: 10 },
              { label: 'Gastrostomi / Özefagostomi', rate: 15 },
              { label: 'İleostomi / Jejunostomi', rate: 20 },
            ],
          },
          {
            id: 'sin-5',
            name: 'Kronik Karaciğer Hastalığı (Sınıf 1–4)',
            criteria: 'Minimal bulgudan varis/asit/ensefalopatiye kadar sınıflar',
            rate: 30,
            options: [
              { label: 'Sınıf 1', rate: 15 },
              { label: 'Sınıf 2', rate: 30 },
              { label: 'Sınıf 3', rate: 50 },
              { label: 'Sınıf 4', rate: 95 },
            ],
          },
          { id: 'sin-6', name: 'Karaciğer / Pankreas Transplantasyonu (Taban)', criteria: 'Taban %70 üzerine organ fonksiyon bozukluğu Balthazard ile eklenir', rate: 70 },
          { id: 'sin-7', name: 'Splenektomi', criteria: 'Kalıcı organ kaybı oranı', rate: 10 },
        ],
      },
    ],
  },
  {
    id: 'kadin',
    title: 'Kadın Hastalıkları ve Doğum',
    pageRange: 'Sayfa 71–72',
    summary: 'Vulva/vagina, serviks/uterus ve fallopian tüp/overlerin kalıcı fonksiyonel ve anatomik kayıpları.',
    groups: [
      {
        title: 'Jinekolojik Kalıcı Bozukluklar',
        items: [
          {
            id: 'kad-1',
            name: 'Serviks / Uterus Anatomik & Fonksiyonel Kaybı',
            criteria: '1. Derece (Postmenapozal) · 2. Derece (Darlık/tedavi) · 3. Derece (Premenapozal)',
            rate: 5,
            options: [
              { label: '1. Derece (Postmenapozal)', rate: 2 },
              { label: '2. Derece (Periyodik tedavi)', rate: 5 },
              { label: '3. Derece (Premenapozal)', rate: 15 },
            ],
          },
          {
            id: 'kad-4',
            name: 'Over / Tüp Kaybı',
            criteria: 'Premenapozal tek veya çift taraflı kayıp',
            rate: 2,
            options: [
              { label: 'Tek over / Postmenapozal', rate: 2 },
              { label: 'Premenapozal çift taraflı', rate: 20 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'urogenital',
    title: 'Ürogenital Sistem',
    pageRange: 'Sayfa 73–77',
    summary: 'Nefroloji (kronik böbrek hastalığı evreleri, diyaliz, nakil), nefrektomi, mesane, üretra ve üriner inkontinans.',
    groups: [
      {
        title: 'Nefroloji & Üriner Sistem',
        items: [
          {
            id: 'uro-1',
            name: 'Kronik Böbrek Hastalığı Evre 1 (GFR >90)',
            criteria: 'Proteinüri / hipertansiyon alt sınıflarına göre',
            rate: 25,
            options: [
              { label: 'Evre 1', rate: 25 },
              { label: 'Evre 1A', rate: 40 },
              { label: 'Evre 1B', rate: 50 },
            ],
          },
          {
            id: 'uro-2',
            name: 'Kronik Böbrek Hastalığı Evre 2 (GFR 60–89)',
            criteria: 'Alt kademelerine göre Evre 2, 2A, 2B',
            rate: 30,
            options: [
              { label: 'Evre 2', rate: 30 },
              { label: 'Evre 2A', rate: 40 },
              { label: 'Evre 2B', rate: 50 },
            ],
          },
          {
            id: 'uro-3',
            name: 'Kronik Böbrek Hastalığı Evre 3 (GFR 30–59)',
            criteria: 'Alt kademelerine göre Evre 3, 3A, 3B',
            rate: 50,
            options: [
              { label: 'Evre 3', rate: 50 },
              { label: 'Evre 3A', rate: 55 },
              { label: 'Evre 3B', rate: 65 },
            ],
          },
          {
            id: 'uro-4',
            name: 'Kronik Böbrek Hastalığı Evre 4 (GFR 15–29)',
            criteria: 'Alt kademelerine göre Evre 4 / 4A / 4B',
            rate: 70,
            options: [
              { label: 'Evre 4 / 4A', rate: 70 },
              { label: 'Evre 4B', rate: 75 },
            ],
          },
          {
            id: 'uro-5',
            name: 'Evre 5 KBH ve Diyaliz (GFR <15)',
            criteria: 'Diyaliz öncesi Evre 5 ve hemodiyaliz / periton diyalizi',
            rate: 90,
            options: [
              { label: 'Diyaliz öncesi 5', rate: 80 },
              { label: 'Diyaliz öncesi 5B', rate: 85 },
              { label: 'Diyaliz gerektiren', rate: 90 },
            ],
          },
          { id: 'uro-6', name: 'Böbrek Nakli (GFR >30 ml/dk)', criteria: 'GFR <30 ise KBH evresine göre değerlendirilir', rate: 70 },
          {
            id: 'uro-7',
            name: 'Tek Böbrek (Nefrektomi / Soliter)',
            criteria: 'Diğer böbreğin durumuna göre',
            rate: 10,
            options: [
              { label: 'Diğer böbrek normal', rate: 10 },
              { label: 'Taş hastalığı varsa', rate: 15 },
              { label: 'Üst üriner (Hafif)', rate: 20 },
              { label: 'Üst üriner (Orta)', rate: 30 },
            ],
          },
          {
            id: 'uro-8',
            name: 'Üriner İnkontinans',
            criteria: 'İnkontinans tipi ve tedavi yanıtına göre',
            rate: 25,
            options: [
              { label: 'Urge', rate: 5 },
              { label: 'Hafif stres', rate: 10 },
              { label: 'Şiddetli stres', rate: 15 },
              { label: 'Yetersiz yanıt', rate: 25 },
              { label: 'Total inkontinans', rate: 50 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'endokrin',
    title: 'Endokrin ve Metabolizma',
    pageRange: 'Sayfa 78–81',
    summary: 'Diyabet (Tip I ve Tip II), tiroid hastalıkları, hipofiz, paratiroid, adrenal hastalıklar, obezite ve metabolizma bozuklukları.',
    generalRule: 'Komplikasyonlar (nöropati, retinopati, nefropati vb.) ilgili branşlarca değerlendirilip Balthazard formülü ile eklenir.',
    groups: [
      {
        title: 'Diabetes Mellitus, Tiroid & Obezite',
        items: [
          {
            id: 'end-1',
            name: 'Diabetes Mellitus (Tip I & Tip II)',
            criteria: 'Kontrol durumu, açlık kan şekeri ve ketoz/hipoglisemiye göre',
            rate: 20,
            options: [
              { label: 'Tip II (Komplikasyonsuz)', rate: 20 },
              { label: 'Tip I (AKŞ <200)', rate: 30 },
              { label: 'Tip I (AKŞ ≥200 / Ketoz)', rate: 40 },
            ],
          },
          {
            id: 'end-4',
            name: 'Kalıcı Hipotiroidi',
            criteria: 'Tedaviye yanıt durumuna göre',
            rate: 10,
            options: [
              { label: 'Tedaviye cevap veren', rate: 10 },
              { label: 'Yanıtsız / ≥400 mcg', rate: 40 },
            ],
          },
          {
            id: 'end-5',
            name: 'Obezite (VKİ Değerine Göre)',
            criteria: 'Vücut Kitle İndeksi 40–50 kg/m² ve >50 kg/m²',
            rate: 20,
            options: [
              { label: 'Ciddi (VKİ 40–50)', rate: 20 },
              { label: 'Morbid (VKİ >50)', rate: 30 },
            ],
          },
          { id: 'end-7', name: 'Ailevi Akdeniz Ateşi (FMF)', criteria: 'Komplikasyon (amiloidoz vb.) varsa ayrıca oran eklenir', rate: 20 },
          { id: 'end-8', name: 'Addison Hastalığı / Akondroplazi', criteria: 'Adrenal korteks yetersizliği veya akondroplazi', rate: 40 },
        ],
      },
    ],
  },
  {
    id: 'gogus',
    title: 'Göğüs Hastalıkları ve Cerrahisi',
    pageRange: 'Sayfa 82',
    summary: 'Solunum Fonksiyon Testlerine (SFT) göre akciğer/plevra/göğüs kafesi hastalıkları, pnömonektomi ve akciğer nakli.',
    groups: [
      {
        title: 'Solunum Fonksiyon Bozuklukları',
        items: [
          {
            id: 'gog-1',
            name: 'Solunum / Dolaşım Fonksiyon Etkilenmesi (SFT)',
            criteria: 'FVC, FEV1 ve FEV1/FVC değerlendirmesi ile az, orta ve ağır etkilenme',
            rate: 20,
            options: [
              { label: 'Az etkilenme', rate: 20 },
              { label: 'Orta etkilenme', rate: 40 },
              { label: 'Ağır / Kor pulmonale', rate: 80 },
            ],
          },
          { id: 'gog-4', name: 'Tek Taraflı Pnömonektomi', criteria: 'Ek solunum fonksiyon kaybı varsa ayrıca değerlendirilir', rate: 10 },
          { id: 'gog-5', name: 'Akciğer Transplantasyonu (Taban)', criteria: 'Nakil sonrası SFT etkilenmesi Balthazard ile eklenir', rate: 70 },
        ],
      },
    ],
  },
  {
    id: 'yaniklar',
    title: 'Yanıklar',
    pageRange: 'Sayfa 83–84',
    summary: 'Deri ile ilgili yanık keloid/hipertrofi oranları; organ sekelleri ilgili branşlarca ayrıca değerlendirilir.',
    groups: [
      {
        title: 'Deri İle İlgili Yanık Arızaları',
        items: [
          {
            id: 'yan-1',
            name: 'Yanık Sekelleri (Yüzey Yaygınlığına Göre)',
            criteria: 'Keloid hipertrofi ve vücut yüzeyi yanık oranları',
            rate: 20,
            options: [
              { label: 'Keloid (%10 vücut)', rate: 20 },
              { label: 'Saçlı deri (>%50)', rate: 25 },
              { label: 'Vücut yüzeyinin %50’si', rate: 30 },
              { label: 'Vücut yüzeyinin >%50’si', rate: 40 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'onkoloji',
    title: 'Onkoloji',
    pageRange: 'Sayfa 85',
    summary: 'Tümörlerin evre ve remisyon durumuna göre engellilik sınıflaması.',
    generalRule: 'Tedaviye cevap veren Evre I–II malign tümörlerde primer organ/fonksiyon kayıplarına net %20 ilave edilir (yıllık nüks/metastaz kontrolü ile).',
    groups: [
      {
        title: 'Tümörlerin Sınıflaması',
        items: [
          {
            id: 'onk-1',
            name: 'Malign Tümörler (Evre ve Remisyon Durumu)',
            criteria: 'Remisyon süresi, evre ve aktif tedavi durumuna göre',
            rate: 60,
            options: [
              { label: 'Evre I–II (>5 yıl remisyon)', rate: 40 },
              { label: 'Evre III–IV (Remisyonda)', rate: 40 },
              { label: 'Evre I–II (≤5 yıl remisyon)', rate: 60 },
              { label: 'Evre III–IV (Aktif/Nüks)', rate: 80 },
            ],
          },
          {
            id: 'onk-5',
            name: 'Yüksek Dereceli Opere Beyin Tümörü (G4 GBM vb.)',
            criteria: 'İlk 2 yıl ve 2 yıldan sonraki remisyon süreci',
            rate: 80,
            options: [
              { label: 'İlk 2 yıl', rate: 80 },
              { label: '2 yıldan sonra remisyon', rate: 40 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sinir',
    title: 'Sinir Sistemi',
    pageRange: 'Sayfa 86–91',
    summary: 'Afaziler, epilepsi, uyku bozuklukları (uyku apnesi dahil), nörojenik ağrı, demans (KDS) ve kranial sinir bozuklukları.',
    groups: [
      {
        title: 'Epilepsi, Afazi, Uyku Apnesi, Demans & Fasiyal Paralizi',
        items: [
          {
            id: 'nor-1',
            name: 'Epilepsi (Nöbet Kontrolü ve Sıklığına Göre)',
            criteria: 'Risk altından tam engele kadar tüm kademeler',
            rate: 15,
            options: [
              { label: 'Nöbet yok (Risk)', rate: 5 },
              { label: 'Güçleştiren', rate: 15 },
              { label: 'Seyrek nöbet', rate: 20 },
              { label: 'Sık nöbet', rate: 40 },
              { label: 'Yardımla aktivite', rate: 70 },
              { label: 'Tam engel', rate: 90 },
            ],
          },
          {
            id: 'nor-4',
            name: 'Obstrüktif Uyku Apnesi / Hipersomni (PSG)',
            criteria: 'Polisomnografi (PSG) sonucuna göre uykuda solunum bozukluğu',
            rate: 35,
            options: [
              { label: 'Hafif', rate: 5 },
              { label: 'Orta', rate: 10 },
              { label: 'Ağır (PSG tanılı)', rate: 35 },
            ],
          },
          {
            id: 'nor-5',
            name: 'Demans (Klinik Demans Skoru — KDS)',
            criteria: 'KDS puanına göre hafiften ağıra tüm evreler',
            rate: 25,
            options: [
              { label: 'Hafif (KDS 4–7)', rate: 25 },
              { label: 'Hafif-Orta (KDS 8–11)', rate: 50 },
              { label: 'Orta (KDS 12–15)', rate: 70 },
              { label: 'Ağır (KDS 16–18)', rate: 90 },
            ],
          },
          {
            id: 'nor-7',
            name: 'Periferik Fasiyal Paralizi',
            criteria: 'Yüz siniri tutulum şiddetine göre',
            rate: 15,
            options: [
              { label: 'Hafif', rate: 5 },
              { label: 'Orta', rate: 15 },
              { label: 'Ağır (Plejik)', rate: 30 },
            ],
          },
          {
            id: 'nor-8',
            name: 'Afazi (Motor ve Sensöriyel)',
            criteria: 'Konuşma / anlama kaybı derecesine göre',
            rate: 25,
            options: [
              { label: 'Motor Hafif', rate: 10 },
              { label: 'Motor Orta', rate: 25 },
              { label: 'Motor Ağır', rate: 45 },
              { label: 'Sensöriyel Hafif', rate: 20 },
              { label: 'Sensöriyel Orta', rate: 40 },
              { label: 'Sensöriyel Ağır', rate: 60 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kas-iskelet',
    title: 'Kas-İskelet Sistemi',
    pageRange: 'Sayfa 92–167',
    summary: 'Omurga yaralanma/EHA modelleri, üst ve alt ekstremite hareket kısıtlılığı, artroplastiler, amputasyonlar, yürüyüş ve santral sinir hareket bozuklukları.',
    generalRule: 'Bu bölümde hesaplanan değerlerde virgülden sonraki sayı 0,5 ve üzerindeyse bir üst tam sayıya yuvarlanır. Yürüyüş bozukluğu tablosu (Tablo 3.4) diğer alt ekstremite tablolarıyla birleştirilmez.',
    groups: [
      {
        title: 'Omurga, Artroplasti, Amputasyon & Yürüyüş Bozukluğu',
        items: [
          {
            id: 'kas-1',
            name: 'Lomber Omurga Yaralanma (Kategori II–V)',
            criteria: 'Konservatif fıtık/spazmdan radikülopati ve instabiliteye',
            rate: 8,
            options: [
              { label: 'Kategori II', rate: 8 },
              { label: 'Kategori III', rate: 13 },
              { label: 'Kategori IV', rate: 23 },
              { label: 'Kategori V', rate: 25 },
            ],
          },
          {
            id: 'kas-2',
            name: 'Servikal Omurga Yaralanma (Kategori II–V)',
            criteria: 'Spazm/herni ile opere disk/radikülopati kademeleri',
            rate: 18,
            options: [
              { label: 'Kategori II', rate: 8 },
              { label: 'Kategori III', rate: 18 },
              { label: 'Kategori IV', rate: 28 },
              { label: 'Kategori V', rate: 38 },
            ],
          },
          {
            id: 'kas-3',
            name: 'Total Kalça veya Diz Protezi (Tablo 3.31 / 3.32)',
            criteria: 'Protez fonksiyonel puanına göre iyi, orta ve kötü sonuçlar',
            rate: 19,
            options: [
              { label: 'İyi sonuç (85–100 puan)', rate: 19 },
              { label: 'Orta sonuç (50–84 puan)', rate: 25 },
              { label: 'Kötü sonuç (<50 puan)', rate: 38 },
            ],
          },
          {
            id: 'kas-5',
            name: 'Alt Ekstremite Amputasyonu',
            criteria: 'Amputasyon seviyesine göre',
            rate: 40,
            options: [
              { label: 'Diz altı orta/distal', rate: 40 },
              { label: 'Proksimal diz altı', rate: 43 },
              { label: 'Diz üstü orta/distal', rate: 48 },
              { label: 'Proksimal / Kalça', rate: 50 },
            ],
          },
          {
            id: 'kas-6',
            name: 'Yürüyüş Bozukluğu (Sürekli — Tablo 3.4)',
            criteria: 'Yardımcı cihaz gereksinimine göre tüm kademeler',
            rate: 24,
            options: [
              { label: 'Tek baston / Koltuk değneği', rate: 24 },
              { label: 'Tek baston + AFO', rate: 36 },
              { label: 'Çift baston / Değnek', rate: 48 },
              { label: 'Tekerlekli sandalye', rate: 96 },
            ],
          },
          {
            id: 'kas-7',
            name: 'Ayakta Durabilme / Yürüme Bozukluğu (Tablo 4.1)',
            criteria: 'Santral sinir / spinal kord yaralanması düzeyine göre',
            rate: 40,
            options: [
              { label: 'Hafif', rate: 20 },
              { label: 'Hafif-Orta', rate: 40 },
              { label: 'Ağır-Orta', rate: 60 },
              { label: 'Ağır', rate: 80 },
            ],
          },
          { id: 'kas-8', name: 'Üst Ekstremite (Omuz Dezartikülasyonu / Kol)', criteria: 'Dominant/genel tablo: %60 (Parmak amputasyonları için Tablo 2.7)', rate: 60 },
        ],
      },
    ],
  },
  {
    id: 'romatizmal',
    title: 'Sistemik Romatizmal Hastalıklar',
    pageRange: 'Sayfa 168',
    summary: 'Aktif dönem dışında, en az 1 yıl uygun tedavi sonrası kalan organ ve fonksiyon sekellerine göre değerlendirme.',
    groups: [
      {
        title: 'Değerlendirme İlkesi',
        items: [
          { id: 'rom-1', name: 'Sistemik Romatizmal Hastalık Sekeli (Örnek Eklem/Organ)', criteria: 'Aktif dönemde belirlenmez; en az 1 yıl tedavi sonrası ilgili sistem (kas-iskelet, böbrek, akciğer vb.) ölçütleri kullanılır.', rate: 20, rateNote: 'Oran, etkilenen hedef organ/eklem tablosundan alınır' },
        ],
      },
    ],
  },
];
