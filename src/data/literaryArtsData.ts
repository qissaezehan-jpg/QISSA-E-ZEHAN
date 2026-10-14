import { CalligraphyStyle, PoeticDevice, LiteraryFigure } from '../types/poetry';

export const CALLIGRAPHY_STYLES: CalligraphyStyle[] = [
  {
    id: 'nastaliq',
    nameUrdu: 'خطِ نستعلیق',
    nameEnglish: 'Nasta’liq Script',
    originEra: '14th – 15th Century CE',
    originRegion: 'Persia & South Asia (Mughal Courts)',
    description: 'The undisputed soul of Urdu typography and calligraphy. Formed by blending Naskh and Ta’liq ("Naskh-Ta’liq"), it cascades gracefully from top-right to bottom-left with hanging words, fluid cursive swoops, and teardrop nuqtas.',
    features: [
      'Slanted descending baselines (Hanging style)',
      'Variable stroke contrast using traditional Qalam (reed pen)',
      'Sublime balance between geometric discipline and lyrical organic curvature',
      'The definitive national standard script for Urdu poetry and literature'
    ],
    visualSpecimen: 'فروغِ حسن سے ہوتا ہے رونقِ چمن پیدا',
    significanceInUrdu: 'Invented by Mir Ali Tabrizi and perfected during the Mughal Renaissance in Delhi and Lahore. No Urdu diwan feels complete without the flowing rhythm of Nastaliq.'
  },
  {
    id: 'naskh',
    nameUrdu: 'خطِ نسخ',
    nameEnglish: 'Naskh Script',
    originEra: '8th – 10th Century CE',
    originRegion: 'Baghdad (Abbasid Era)',
    description: 'A crisp, balanced, horizontal linear script designed for unparalleled legibility, clarity, and precision. Commonly used in classical Arabic and modern digital print.',
    features: [
      'Clear horizontal baseline alignment',
      'Open circular letter bowls for effortless reading',
      'Standardized by Ibn Muqla and Ibn al-Bawwab',
      'Widely used in scientific manuscripts, religious treatises, and modern newspapers'
    ],
    visualSpecimen: 'العلم نور والجهل ظلام — سخن کا سفر',
    significanceInUrdu: 'Historically used for early Urdu translations, Quranic exegesis, and academic printing (such as Fort William College publications).'
  },
  {
    id: 'shikasta',
    nameUrdu: 'خطِ شکستہ',
    nameEnglish: 'Shikasta (Broken / Rapid Script)',
    originEra: '17th Century CE',
    originRegion: 'Safavid & Mughal Royal Secretariats',
    description: 'Literally meaning "broken", Shikasta evolved as a high-speed cursive evolution of Nastaliq for royal chancelleries, confidential firmans, and intimate poet correspondence.',
    features: [
      'Joined letters that are conventionally detached',
      'Dense, compressed, rhythmically interlocked strokes',
      'Demands an initiated eye to decipher its breathless elegance',
      'Reflects the spontaneous rush of court scribes and poets'
    ],
    visualSpecimen: 'شکستہ نویسی — اسرارِ دربار و دل',
    significanceInUrdu: 'Many original personal letters of Mirza Ghalib and royal Mughal decrees (firmans) were written in graceful Shikasta.'
  },
  {
    id: 'thuluth',
    nameUrdu: 'خطِ ثلث',
    nameEnglish: 'Thuluth Script',
    originEra: '10th Century CE',
    originRegion: 'Islamic Architectural Monuments',
    description: 'The king of grand monumental calligraphy. Characterized by dramatic vertical ascenders, sweeping barbed flourishes, and majestic architectural dignity.',
    features: [
      'Towering vertical strokes with curved crown heads',
      'Dynamic interlocking composition suitable for domes and stone archways',
      'Historically used for mosque facades and grand diwan frontispieces',
      'Commands awe and reverence'
    ],
    visualSpecimen: 'تاجِ خطاطی — ثلثِ جلی',
    significanceInUrdu: 'Adorns the inscriptions of Mughal masterpieces such as the Taj Mahal, Badshahi Mosque, and ornamental chapter titles in classical lithographed diwans.'
  },
  {
    id: 'diwani',
    nameUrdu: 'خطِ دیوانی',
    nameEnglish: 'Diwani Script',
    originEra: '16th Century CE',
    originRegion: 'Ottoman Chancellery (Bab-ı Ali)',
    description: 'An ornamental, intensely harmonious cursive style where letters intertwine like delicate vines and flowers.',
    features: [
      'Dense, swooping ascending loops',
      'No diacritical spacing between words',
      'Pure rhythmic visual poetry',
      'Often composed in calligrams (birds, crescent moons, teardrops)'
    ],
    visualSpecimen: 'دیوانِ سخن — فنِ خط',
    significanceInUrdu: 'Favored by Urdu calligraphers for book covers, poetic seals (Muhr), and decorative illuminated title pages.'
  }
];

export const POETIC_DEVICES: PoeticDevice[] = [
  {
    nameUrdu: 'تشبیہ (Tashbeeh)',
    nameEnglish: 'Simile',
    category: 'Ma\'nawi',
    explanationUrdu: 'کسی ایک چیز کو کسی خاص صفت کی بنا پر دوسری چیز کے مانند قرار دینا۔ اس کے ارکان میں مشبہ، مشبہ بہ، وجہِ شبہ اور حرفِ تشبیہ شامل ہیں۔',
    explanationEnglish: 'Comparing one entity directly to another based on a shared vivid attribute using comparative particles (like / as).',
    exampleSher: {
      misra1: 'نازکی اس کے لب کی کیا کہئے',
      misra2: 'پنکھڑی اک گلاب کی سی ہے',
      poet: 'میر تقی میر',
      explanation: 'Mir compares the delicate crimson fragility of the beloved’s lips directly to a rose petal ("gulab ki si hai").'
    }
  },
  {
    nameUrdu: 'استعارہ (Isti’ara)',
    nameEnglish: 'Metaphor',
    category: 'Ma\'nawi',
    explanationUrdu: 'کسی لفظ کو اس کے حقیقی معنوں کی بجائے مجازی معنوں میں اس طرح استعمال کرنا کہ دونوں میں تشبیہ کا تعلق ہو۔ تشبیہ کے برعکس، یہاں شے کو بعینہٖ دوسری شے مان لیا جاتا ہے۔',
    explanationEnglish: 'Borrowing a word to signify something else entirely without using comparative markers, directly asserting that A is B.',
    exampleSher: {
      misra1: 'پلکوں سے گر نہ جائے یہ لعلِ بدخشاں',
      misra2: 'دل کی تپش سے آنسو جو خوں ہو گیا ہے',
      poet: 'مرزا غالب',
      explanation: 'Ghalib calls a tear of blood a "ruby of Badakhshan" without saying "like a ruby", directly transmuting the sorrow into a precious gem.'
    }
  },
  {
    nameUrdu: 'تلمیح (Talmeeh)',
    nameEnglish: 'Poetic Allusion',
    category: 'Ma\'nawi',
    explanationUrdu: 'شعر میں کسی مشہور تاریخی، مذہبی، قرآنی یا روایتی قصے اور واقعے کی طرف ایک یا دو لفظوں میں مختصر اشارہ کرنا۔',
    explanationEnglish: 'An implicit or explicit reference to a famous historical event, mythical legend, or sacred story in just a single phrase.',
    exampleSher: {
      misra1: 'بے خطر کود پڑا آتشِ نمرود میں عشق',
      misra2: 'عقل ہے محوِ تماشائے لبِ بام ابھی',
      poet: 'علامہ محمد اقبال',
      explanation: 'Iqbal invokes the trial of Prophet Ibrahim (Abraham) being cast into Nimrod’s furnace, illustrating intuitive faith versus cautious intellect.'
    }
  },
  {
    nameUrdu: 'حسنِ تعلیل (Husn-e-Ta’leel)',
    nameEnglish: 'Poetic Etiology (Artistic Causation)',
    category: 'Ma\'nawi',
    explanationUrdu: 'کسی بات کی ایسی شاعرانہ، لطیف اور خیالی وجہ بیان کرنا جو اس کی حقیقی وجہ نہ ہو لیکن شعر کے حسن کو دوبالا کر دے۔',
    explanationEnglish: 'Inventing a delightfully imaginative, romantic poetic reason for a natural phenomenon that is completely unscientific yet aesthetically breathtaking.',
    exampleSher: {
      misra1: 'پھول مہکتے ہیں ترے آنے کی سن کر آہٹ',
      misra2: 'شبنمِ صبح جو چمکی ہے وہ آنسو تو نہیں',
      poet: 'نامعلوم استاد',
      explanation: 'Explaining the morning dew not as physical condensation, but as weeping droplets of yearning awaiting the beloved’s arrival.'
    }
  },
  {
    nameUrdu: 'تضاد / طباق (Tazad / Mutabaqat)',
    nameEnglish: 'Antithesis (Oxymoron / Contrast)',
    category: 'Lafzi',
    explanationUrdu: 'کلام میں ایسے دو یا دو سے زیادہ الفاظ لانا جن کے معانی ایک دوسرے کی ضد یا متضاد ہوں۔ اس سے شعر کا تاثر گہرا ہوتا ہے۔',
    explanationEnglish: 'Juxtaposing opposing terms or concepts (night vs day, poison vs nectar, joy vs grief) to create intellectual tension and emotional depth.',
    exampleSher: {
      misra1: 'کہاں مے خانے کا دروازہ غالبؔ اور کہاں واعظ',
      misra2: 'پر اتنا جانتے ہیں کل وہ جاتا تھا کہ ہم نکلے',
      poet: 'مرزا غالب',
      explanation: 'Contrast between the ascetic preacher (Wa’iz) and the tavern door (Maikhana), revealing hypocrisy through ironic encounter.'
    }
  },
  {
    nameUrdu: 'ایہام (Ihaam)',
    nameEnglish: 'Double Entendre / Ambiguity',
    category: 'Lafzi',
    explanationUrdu: 'شعر میں ایسا لفظ لانا جس کے دو معنی ہوں: ایک قریب کے اور دوسرے دور کے، اور شاعر کی مراد دور کے غیر متوقع معنوں سے ہو۔',
    explanationEnglish: 'Using a word with two meanings (one immediate and obvious, one remote and subtle), intentionally leading the listener into surprising double meaning.',
    exampleSher: {
      misra1: 'شب جو مسجد میں جا پھنسے مومنؔ',
      misra2: 'رات کاٹی خدا خدا کر کے',
      poet: 'مومن خاں مومن',
      explanation: '"Khuda Khuda kar ke" idiomatically means "with great difficulty / barely survived", but in a mosque it also literally means chanting God’s name all night!'
    }
  }
];

export const LITERARY_FIGURES: LiteraryFigure[] = [
  {
    nameUrdu: 'سعادت حسن منٹو',
    nameEnglish: 'Saadat Hasan Manto',
    field: 'Afsana (Short Story)',
    era: '1912 – 1955',
    masterpieceUrdu: 'ٹوبہ ٹیک سنگھ، ٹھنڈا گوشت، کھول دو',
    masterpieceEnglish: 'Toba Tek Singh, Thanda Gosht, Khol Do',
    description: 'The fearless iconoclast of Urdu short fiction. Manto exposed the brutal psychic fractures of the 1947 Partition and hypocritical moral facades with unflinching honesty.'
  },
  {
    nameUrdu: 'عصمت چغتائی',
    nameEnglish: 'Ismat Chughtai',
    field: 'Afsana (Short Story)',
    era: '1915 – 1991',
    masterpieceUrdu: 'لحاف، ٹیڑھی لکیر، چھوئی موئی',
    masterpieceEnglish: 'Lihaaf (The Quilt), Terhi Lakeer, Chhui Mui',
    description: 'A revolutionary feminist voice in Urdu literature who shattered patriarchal taboos, chronicling middle-class Muslim domesticity, female desire, and societal double standards.'
  },
  {
    nameUrdu: 'قرۃ العین حیدر',
    nameEnglish: 'Qurratulain Hyder',
    field: 'Afsana (Short Story)',
    era: '1927 – 2007',
    masterpieceUrdu: 'آگ کا دریا، کارِ جہاں دراز ہے',
    masterpieceEnglish: 'Aag Ka Darya (River of Fire), Kaar-e-Jahan Daraaz Hai',
    description: 'Often called the "Grand Dame of Urdu Fiction", her magnum opus "Aag Ka Darya" traverses 2,500 years of subcontinent civilization from Chandragupta Maurya to Partition.'
  },
  {
    nameUrdu: 'میر انیس و مرزا دبیر',
    nameEnglish: 'Mir Babar Ali Anis & Mirza Dabeer',
    field: 'Dastangoi (Epic Oratory)',
    era: '19th Century (Lucknow)',
    masterpieceUrdu: 'مرثیہ نگاری و مسدسِ انیس',
    masterpieceEnglish: 'The Lucknow Marsiya Epic & Oratory Tradition',
    description: 'Masters of the Urdu Marsiya who elevated the Lucknow school to dizzying heights of poetic imagery, pathos, horse anatomy, battle heraldry, and vocal dramatic recitation.'
  },
  {
    nameUrdu: 'منشی پریم چند',
    nameEnglish: 'Munshi Premchand',
    field: 'Afsana (Short Story)',
    era: '1880 – 1936',
    masterpieceUrdu: 'کفن، عید گاہ، سوزِ وطن',
    masterpieceEnglish: 'Kafan, Eidgah, Soz-e-Watan',
    description: 'The pioneer of modern realism in Urdu and Hindi prose, immortalizing the struggles of rural peasantry, caste oppression, and human empathy.'
  }
];

export const ASNAF_E_SUKHAN = [
  {
    nameUrdu: 'غزل (Ghazal)',
    nameEnglish: 'The Ghazal',
    origin: 'Arabic / Persian roots, perfected in Urdu',
    structure: 'Composed of couplets (Ash’aar), where each couplet is an autonomous universe. Opens with a Matla (both lines rhyming) and closes with a Maqta (poet’s takhallus). Rhyme scheme: AA, BA, CA, DA...',
    essence: 'Traditionally the language of love, longing, and wine, the Urdu ghazal evolved into a supreme vehicle for philosophy, politics, mysticism, and cosmic skepticism.'
  },
  {
    nameUrdu: 'نظم (Nazm)',
    nameEnglish: 'The Nazm',
    origin: 'Modern literary movement (late 19th c. onwards)',
    structure: 'Unlike the autonomous couplets of the ghazal, the Nazm possesses thematic unity, narrative progression, and a central conceptual spine. Can be rhymed, blank verse (Mu’arra), or free verse (Azad).',
    essence: 'Perfected by Iqbal, Faiz, Noon Meem Rashed, and Majeed Amjad to engage with history, modern existential angst, social justice, and philosophical meditation.'
  },
  {
    nameUrdu: 'رباعی (Rubai)',
    nameEnglish: 'The Rubaiyat',
    origin: 'Persian classical origin (Omar Khayyam)',
    structure: 'A strictly metered four-line stanza following specific melodic meters (24 traditional meters of Hazaj). Lines 1, 2, and 4 rhyme (AABA); line 3 builds dramatic suspense.',
    essence: 'Known for punchy wit, moral epigrams, existential reflection, and sudden lightning-strike philosophical realizations.'
  },
  {
    nameUrdu: 'مرثیہ (Marsiya)',
    nameEnglish: 'The Marsiya',
    origin: 'Awadh / Lucknow pinnacle (Mir Anis)',
    structure: 'Traditionally composed in six-line stanzas (Musaddas) with an AAAABB rhyme scheme. Features standard epic sections: Chehra, Sarapa, Rukhsat, Amad, Rajaz, Jang, Shahadat, Bain.',
    essence: 'A monumental epic elegy mourning the tragedy of Karbala, embodying South Asian poetic majesty, vivid characterization, and unparalleled emotional pathos.'
  },
  {
    nameUrdu: 'قصیدہ (Qasida)',
    nameEnglish: 'The Qasida',
    origin: 'Classical Arabic & Persian courtly praise',
    structure: 'A lengthy monorhymed ode opening with an ornate prologue (Tashbeeb), a clever transition (Gurez), followed by high praise (Madah) or spiritual reverence.',
    essence: 'Known for magnificent linguistic virtuosity, sweeping vocabulary, and grand rhetorical power (pioneered in Urdu by Sauda and Ghalib).'
  }
];
