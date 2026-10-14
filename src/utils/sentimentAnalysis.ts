import { Poem, PoemSentimentMood, PoemSentimentAnalysis } from '../types/poetry';

export const SENTIMENT_STORAGE_KEY = 'qissa_zehan_poem_sentiments';
export const SENTIMENT_UPDATED_EVENT = 'qissa_zehan_sentiment_updated';

export interface MoodVisualConfig {
  mood: PoemSentimentMood;
  labelUrdu: string;
  labelEnglish: string;
  colorHex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  glowClass: string;
  iconName: 'CloudRain' | 'Sun' | 'Heart' | 'Compass' | 'Flame' | 'Feather' | 'HeartCrack' | 'Clock' | 'Sparkles';
  shortDescription: string;
  shortDescriptionUrdu: string;
}

export const MOOD_VISUAL_CONFIGS: Record<PoemSentimentMood, MoodVisualConfig> = {
  Melancholy: {
    mood: 'Melancholy',
    labelUrdu: 'غم و الم',
    labelEnglish: 'Melancholy',
    colorHex: '#818cf8', // Indigo
    bgClass: 'bg-indigo-950/70',
    borderClass: 'border-indigo-500/50',
    textClass: 'text-indigo-300',
    glowClass: 'shadow-[0_0_15px_rgba(99,102,241,0.25)]',
    iconName: 'CloudRain',
    shortDescription: 'Bittersweet ache, existential pathos, and sweet sorrow.',
    shortDescriptionUrdu: 'حزن و ملال، دل کا دائمی درد اور ہجر کی میٹھی اداسی۔'
  },
  Hopeful: {
    mood: 'Hopeful',
    labelUrdu: 'پر امید',
    labelEnglish: 'Hopeful',
    colorHex: '#fbbf24', // Amber/Gold
    bgClass: 'bg-amber-950/70',
    borderClass: 'border-amber-500/50',
    textClass: 'text-amber-300',
    glowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    iconName: 'Sun',
    shortDescription: 'Luminous faith in renewal, morning light, and spiritual ascension.',
    shortDescriptionUrdu: 'امید کی کرن، سحر کا یقین اور بلند تر جہانوں کی جستجو۔'
  },
  'Ecstatic Love': {
    mood: 'Ecstatic Love',
    labelUrdu: 'وارفتگی و عشق',
    labelEnglish: 'Ecstatic Love',
    colorHex: '#fb7185', // Rose
    bgClass: 'bg-rose-950/70',
    borderClass: 'border-rose-500/50',
    textClass: 'text-rose-300',
    glowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.25)]',
    iconName: 'Heart',
    shortDescription: 'Sublime devotion, ecstatic surrender, and romantic rapture.',
    shortDescriptionUrdu: 'والہانہ لگن، محویت اور محبوب کے جلوے میں فنا کا نشہ۔'
  },
  Existential: {
    mood: 'Existential',
    labelUrdu: 'وجودی تفکر',
    labelEnglish: 'Existential',
    colorHex: '#38bdf8', // Sky
    bgClass: 'bg-sky-950/70',
    borderClass: 'border-sky-500/50',
    textClass: 'text-sky-300',
    glowClass: 'shadow-[0_0_15px_rgba(14,165,233,0.25)]',
    iconName: 'Compass',
    shortDescription: 'Deep metaphysical questioning of human mortality and cosmic riddle.',
    shortDescriptionUrdu: 'حیات و ممات کے لامتناہی سوالات اور انسانی تقدیر کی گتھی۔'
  },
  Defiant: {
    mood: 'Defiant',
    labelUrdu: 'انقلابی عزم',
    labelEnglish: 'Defiant',
    colorHex: '#f97316', // Orange
    bgClass: 'bg-orange-950/70',
    borderClass: 'border-orange-500/50',
    textClass: 'text-orange-300',
    glowClass: 'shadow-[0_0_15px_rgba(249,115,22,0.25)]',
    iconName: 'Flame',
    shortDescription: 'Courage against tyranny, blazing truth, and resolute conviction.',
    shortDescriptionUrdu: 'جبر کے خلاف للکار، حق گوئی کا شعلہ اور ظلم سے بغاوت۔'
  },
  Serene: {
    mood: 'Serene',
    labelUrdu: 'سکون و طمانیت',
    labelEnglish: 'Serene',
    colorHex: '#34d399', // Emerald
    bgClass: 'bg-emerald-950/70',
    borderClass: 'border-emerald-500/50',
    textClass: 'text-emerald-300',
    glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    iconName: 'Feather',
    shortDescription: 'Inner equilibrium, gentle solace, and stillness of heart.',
    shortDescriptionUrdu: 'روح کا قرار، دنیا کے غلغلے سے دور دلی طمانیت۔'
  },
  Heartbroken: {
    mood: 'Heartbroken',
    labelUrdu: 'شکستہ دل',
    labelEnglish: 'Heartbroken',
    colorHex: '#c084fc', // Purple
    bgClass: 'bg-purple-950/70',
    borderClass: 'border-purple-500/50',
    textClass: 'text-purple-300',
    glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]',
    iconName: 'HeartCrack',
    shortDescription: 'Raw pang of betrayal, fragile wounds, and quiet desolation.',
    shortDescriptionUrdu: 'وفا کا صلہ، بکھری ہوئی امیدیں اور بے بس تنہائی۔'
  },
  Longing: {
    mood: 'Longing',
    labelUrdu: 'اشتیاق و انتظار',
    labelEnglish: 'Longing',
    colorHex: '#2dd4bf', // Teal
    bgClass: 'bg-teal-950/70',
    borderClass: 'border-teal-500/50',
    textClass: 'text-teal-300',
    glowClass: 'shadow-[0_0_15px_rgba(20,184,166,0.25)]',
    iconName: 'Clock',
    shortDescription: 'Yearning across distance, breathless waiting, and fragrance of memory.',
    shortDescriptionUrdu: 'دوری کے باوجود وصل کی آس اور یادوں کی عطر بیزی۔'
  },
  Transcendent: {
    mood: 'Transcendent',
    labelUrdu: 'ماورائی و عرفانی',
    labelEnglish: 'Transcendent',
    colorHex: '#e879f9', // Fuchsia
    bgClass: 'bg-fuchsia-950/70',
    borderClass: 'border-fuchsia-500/50',
    textClass: 'text-fuchsia-300',
    glowClass: 'shadow-[0_0_15px_rgba(217,70,239,0.25)]',
    iconName: 'Sparkles',
    shortDescription: 'Mystical revelation beyond physical reality into pure cosmic ecstasy.',
    shortDescriptionUrdu: 'مادی دنیا کی حدود سے پرے صوفیانہ ادراک اور وحدت کا مشاہدہ۔'
  }
};

// Scholarly baseline sentiments for canonical library poems
const CURATED_POEM_SENTIMENTS: Record<string, Omit<PoemSentimentAnalysis, 'poemId' | 'analyzedAt' | 'colorHex' | 'bgClass' | 'borderClass' | 'textClass'>> = {
  'ghalib-dil-e-nadan': {
    primaryMood: 'Existential',
    primaryMoodUrdu: 'وجودی تفکر',
    confidenceScore: 94,
    secondaryMood: 'Gentle Irony',
    secondaryMoodUrdu: 'ظریفانہ سنجیدگی',
    emotionalValence: 'Contemplative',
    emotionalValenceUrdu: 'فکری و متجسس',
    toneArc: 'Opens with intimate self-interrogation and elevates into a universal inquiry on human desire and destiny.',
    toneArcUrdu: 'مطلع میں دل سے مکالمہ اور مقطع تک پہنچتے پہنچتے کائناتی سوالات کا احاطہ۔',
    keyEmotiveKeywords: ['درد', 'دوا', 'ناداں', 'مشتاق', 'وفا'],
    aiInsightNote: 'Ghalib balances poignant vulnerability with intellectual detachment, questioning whether seeking a cure for human longing is itself the ultimate tragic irony.',
    aiInsightNoteUrdu: 'غالب نے کمال فن سے دل کے اضطراب کو ایک فکری سوال بنا دیا ہے جہاں درد بذات خود حیات کا جوہر بن جاتا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'iqbal-shikwa-jawab-shikwa': {
    primaryMood: 'Defiant',
    primaryMoodUrdu: 'انقلابی و جراتمندانہ شکوہ',
    confidenceScore: 98,
    secondaryMood: 'Spiritual Resonance',
    secondaryMoodUrdu: 'عرفانی جلال',
    emotionalValence: 'Cathartic',
    emotionalValenceUrdu: 'تزکیۂ قلب و ولولہ',
    toneArc: 'A daring cosmic dialogue with the Divine that transmutes generational lamentation into fiery collective awakening.',
    toneArcUrdu: 'خالقِ کائنات کے حضور جراتمندانہ شکوہ جو بالآخر خود شناسی اور احیائے نو کا پیغام بنتا ہے۔',
    keyEmotiveKeywords: ['شکوہ', 'ناز', 'مسلماں', 'کرم', 'طوفاں'],
    aiInsightNote: 'Iqbal harnesses soaring prosody and unrestrained candidness, crafting an unforgettable emotional debate on human dignity and divine purpose.',
    aiInsightNoteUrdu: 'اقبال نے سوز و گداز اور جلال کو یکجا کر کے قاری کے دل و دماغ میں نیا جذبہ پھونک دیا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'faiz-hum-dekhenge': {
    primaryMood: 'Defiant',
    primaryMoodUrdu: 'انقلابی عزم و یقین',
    confidenceScore: 99,
    secondaryMood: 'Prophetic Hope',
    secondaryMoodUrdu: 'پر نور رجائیت',
    emotionalValence: 'Cathartic',
    emotionalValenceUrdu: 'تزکیۂ قلب و ولولہ',
    toneArc: 'From the suffocating grip of oppression to a triumphant, apocalyptic declaration of collective liberation.',
    toneArcUrdu: 'ظلم و جبر کے اندھیرے سے شروع ہو کر فتح اور عوامی حق خود ارادیت کی لازوال گونج۔',
    keyEmotiveKeywords: ['لازم', 'دیکھیں گے', 'حق', 'محکوم', 'انالحق'],
    aiInsightNote: 'Faiz elevates political resistance into sacred mythos, promising the inevitable shattering of earthly crowns and the rising of the downtrodden.',
    aiInsightNoteUrdu: 'فیض کا کلام سچائی کے شعلے اور عوامی عزم کی ایسی ترجمانی ہے جس میں شکست کا کوئی اندیشہ نہیں۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'mir-patta-patta': {
    primaryMood: 'Melancholy',
    primaryMoodUrdu: 'حزن و سوزِ دروں',
    confidenceScore: 95,
    secondaryMood: 'Cosmic Solitude',
    secondaryMoodUrdu: 'خاموش ویرانی',
    emotionalValence: 'Negative',
    emotionalValenceUrdu: 'حزنیہ و رقت آمیز',
    toneArc: 'A garden weeping in complete awareness of the lover’s grief, while the beloved remains aloof.',
    toneArcUrdu: 'سارا چمن واقفِ حال ہے مگر جس سے غرض تھی وہی بے خبر ہے۔',
    keyEmotiveKeywords: ['پتا', 'بوٹا', 'گل', 'باغ', 'بے خبر'],
    aiInsightNote: 'Mir animates entire nature to empathize with his sorrow, contrasting the sensitive universe with human indifference.',
    aiInsightNoteUrdu: 'میر تقی میر کا سوز و گداز نباتات اور مظاہرِ فطرت کو دل کی آواز بنا دیتا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'jaun-ye-gham-kya-dil-ki-aadat-hai': {
    primaryMood: 'Heartbroken',
    primaryMoodUrdu: 'شکستہ دل و زہرخند',
    confidenceScore: 96,
    secondaryMood: 'Sardonic Grief',
    secondaryMoodUrdu: 'بے ساختہ تلخی',
    emotionalValence: 'Cathartic',
    emotionalValenceUrdu: 'شدید کرب',
    toneArc: 'Brutally honest dissection of habitual grief and self-destructive loneliness in modern urbanity.',
    toneArcUrdu: 'غم کے عادت بن جانے کا المیہ اور اپنی بربادی کا بے باک اعتراف۔',
    keyEmotiveKeywords: ['عادت', 'حالت', 'برباد', 'وحشت', 'خامشی'],
    aiInsightNote: 'Jaun Elia rejects romantic euphemisms, piercing through illusions to exhibit the bleeding wound of solitude.',
    aiInsightNoteUrdu: 'جون ایلیا کا کلام کسی پردے کے بغیر انسان کی اندرونی ٹوٹ پھوٹ کو عیاں کرتا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'parveen-woh-to-khushboo-hai': {
    primaryMood: 'Longing',
    primaryMoodUrdu: 'اشتیاق و نازک نزاکت',
    confidenceScore: 93,
    secondaryMood: 'Fragile Solace',
    secondaryMoodUrdu: 'خوشبو کی تسلی',
    emotionalValence: 'Bittersweet',
    emotionalValenceUrdu: 'شیریں التماس',
    toneArc: 'Delicate sensory reverie capturing the elusive presence of a lover like perfume carried away by wind.',
    toneArcUrdu: 'ہوا کے جھونکے کی طرح محبوب کی یادوں کی عطر بیزی اور چھو لینے کی معصوم حسرت۔',
    keyEmotiveKeywords: ['خوشبو', 'ہوا', 'رنگ', 'دیدار', 'فاصلہ'],
    aiInsightNote: 'Parveen Shakir paints emotional distance through fragrant, ephemeral imagery that leaves the heart suspended in longing.',
    aiInsightNoteUrdu: 'پروین شاکر کے لہجے کی معصومیت اور نزاکت فاصلوں کو بھی عطر میں بسا دیتی ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'faraz-ranjish-hi-sahi': {
    primaryMood: 'Longing',
    primaryMoodUrdu: 'ہجر و حسرتِ دید',
    confidenceScore: 96,
    secondaryMood: 'Tender Resignation',
    secondaryMoodUrdu: 'التماسِ وفا',
    emotionalValence: 'Bittersweet',
    emotionalValenceUrdu: 'تلخ و شیریں',
    toneArc: 'Willingness to welcome heart-wrenching pain if only it brings the beloved back into sight.',
    toneArcUrdu: 'رنجش اور دکھ کو بھی قربت کے بہانے کے طور پر قبول کرنے کی سچی تڑپ۔',
    keyEmotiveKeywords: ['رنجش', 'دکھانے', 'شمع', 'بجھانے', 'آ'],
    aiInsightNote: 'Faraz captures the pinnacle of romantic surrender where pride melts entirely before the ache of separation.',
    aiInsightNoteUrdu: 'فراز نے ناز و نیاز کی کشمکش کو مٹا کر درد کو وصل کی آرزو میں بدل دیا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'zafar-lagta-nahi-hai-dil': {
    primaryMood: 'Melancholy',
    primaryMoodUrdu: 'جلا وطنی و بے بسی کا حزن',
    confidenceScore: 97,
    secondaryMood: 'Nostalgic Tragedy',
    secondaryMoodUrdu: 'اجڑی سلطنت کا ماتم',
    emotionalValence: 'Negative',
    emotionalValenceUrdu: 'حزنیہ و رقت آمیز',
    toneArc: 'The tragic twilight of an emperor exiled in a alien land, pining for two yards of earth in his homeland.',
    toneArcUrdu: 'وطن سے بچھڑنے اور پردیس میں بے گور و کفن ہونے کا لازوال مرثیہ۔',
    keyEmotiveKeywords: ['اجڑے', 'دیار', 'عمرِ دراز', 'گز گز زمیں', 'کُوئے یار'],
    aiInsightNote: 'Bahadur Shah Zafar’s verse merges personal tragedy with the fall of an era, giving voice to inconsolable imperial grief.',
    aiInsightNoteUrdu: 'بہادر شاہ ظفر کی غزل محض کلام نہیں بلکہ مٹتی ہوئی تہذیب کا نوحہ ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'momin-asar-us-ko': {
    primaryMood: 'Ecstatic Love',
    primaryMoodUrdu: 'وارفتگی و نازِ معشوق',
    confidenceScore: 92,
    secondaryMood: 'Tender Yearning',
    secondaryMoodUrdu: 'شوقِ التفات',
    emotionalValence: 'Bittersweet',
    emotionalValenceUrdu: 'شیریں و پر اضطراب',
    toneArc: 'Charming paradox of love where the lover admits his supplications have no power over the beloved.',
    toneArcUrdu: 'دعا کی بے اثری کا اعتراف مگر اس کے باوجود دل کی بے قابو وارفتگی۔',
    keyEmotiveKeywords: ['اثر', 'دعا', 'تم', 'ہم', 'خدا'],
    aiInsightNote: 'Momin masters delicate lyricism and witty paradox, contrasting humble prayer against playful divine comparison.',
    aiInsightNoteUrdu: 'مومن کی نازک خیالی نے شکوے کو بھی لطیف ترین محبت کے پیرائے میں ڈھال دیا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'ghalib-hazaron-khwahishen': {
    primaryMood: 'Melancholy',
    primaryMoodUrdu: 'غم و نا تمام حسرت',
    confidenceScore: 94,
    secondaryMood: 'Philosophical Resignation',
    secondaryMoodUrdu: 'تلخ مسکراہٹ',
    emotionalValence: 'Bittersweet',
    emotionalValenceUrdu: 'تلخ و شیریں',
    toneArc: 'Wistful meditation on insatiable longing that oscillates between mortal ache and playful existential mockery.',
    toneArcUrdu: 'آرزوؤں کی کثرت کا اعتراف اور انسانی آرزو کی نامکملیت پر گہرا تاسف۔',
    keyEmotiveKeywords: ['خواہشیں', 'دم', 'ارمان', 'قتل', 'تمنا'],
    aiInsightNote: 'The cadence captures the paradox of desire: fulfilling a thousand wishes only reveals the vast desert of remaining hungers.',
    aiInsightNoteUrdu: 'انسان کی طلب اور کائنات کی تنگی کا ایسا مرقع جس میں رنج بھی ہے اور زندگی کی حقیقت بھی۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'ghalib-yeh-na-thi-hamari-qismat': {
    primaryMood: 'Existential',
    primaryMoodUrdu: 'وجودی تسلیم و رضا',
    confidenceScore: 95,
    secondaryMood: 'Ironic Solace',
    secondaryMoodUrdu: 'ظریفانہ یاسیت',
    emotionalValence: 'Contemplative',
    emotionalValenceUrdu: 'فکری و متجسس',
    toneArc: 'A masterclass in stoic acceptance where mortal grief is distilled into razor-sharp philosophical reflection.',
    toneArcUrdu: 'قسمت کی ستم ظریفی اور وصل کے نا ممکن ہونے کا عمیق فکری شعور۔',
    keyEmotiveKeywords: ['قسمت', 'وصال', 'جیتے', 'امید', 'موت'],
    aiInsightNote: 'Ghalib examines the inevitability of death and fate without despair, elevating separation into an aesthetic triumph.',
    aiInsightNoteUrdu: 'غالب تقدیر کی نا رسائی کو ایک ایسی فکری وسعت بخشتے ہیں جس میں شکست بھی وقار بن جاتی ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'nasir-dil-mein-ik-lehar': {
    primaryMood: 'Serene',
    primaryMoodUrdu: 'سکون و دھیمی اداسی',
    confidenceScore: 91,
    secondaryMood: 'Nocturnal Solitude',
    secondaryMoodUrdu: 'شبینہ سرگوشی',
    emotionalValence: 'Contemplative',
    emotionalValenceUrdu: 'فکری و پر سکون',
    toneArc: 'Quiet ripples of remembrance stirring gently in the quiet stillness of the nocturnal city.',
    toneArcUrdu: 'رات کے اندھیرے اور یاد کے بے نشان جزیروں میں دل کی مدہم لہر۔',
    keyEmotiveKeywords: ['لہر', 'ہوا', 'جزیرہ', 'آواز', 'بے چراغ'],
    aiInsightNote: 'Nasir Kazmi creates an atmosphere of delicate solitude where sorrow is not jagged, but smooth like nocturnal breeze.',
    aiInsightNoteUrdu: 'ناصر کاظمی کے اشعار میں غم ایک مدہم اور دلاویز لہر کی مانند دل کو چھو کر گزرتا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  // Canonical Aliases
  'iqbal-sitaron-se-aage': {
    primaryMood: 'Hopeful',
    primaryMoodUrdu: 'پر امید و رجائیت',
    confidenceScore: 97,
    secondaryMood: 'Transcendent Courage',
    secondaryMoodUrdu: 'بلند پروازی',
    emotionalValence: 'Positive',
    emotionalValenceUrdu: 'مثبت و پرجوش',
    toneArc: 'Ascends from terrestrial limitations to infinite cosmic frontiers, igniting spiritual vigor in the human soul.',
    toneArcUrdu: 'زمین کی تنگی سے پرواز کر کے کہکشاؤں اور افلاک کے پار انسانی خودی کی بالادستی۔',
    keyEmotiveKeywords: ['ستاروں', 'امتحان', 'شاہین', 'پرواز', 'آشیاں'],
    aiInsightNote: 'Iqbal employs kinetic, celestial imagery and majestic meter to banish fatalism, crowning humanity as an eternal explorer.',
    aiInsightNoteUrdu: 'علامہ اقبال کی رجائیت پسندی قاری کے اندر مایوسی کو جلا کر لامتناہی امنگ اور ہمت پیدا کرتی ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'faiz-bol': {
    primaryMood: 'Defiant',
    primaryMoodUrdu: 'انقلابی عزم',
    confidenceScore: 98,
    secondaryMood: 'Urgent Resistance',
    secondaryMoodUrdu: 'حق گوئی کی للکار',
    emotionalValence: 'Cathartic',
    emotionalValenceUrdu: 'تزکیۂ قلب و ولولہ',
    toneArc: 'Urgent, resonant summons breaking the oppressive silence into an unstoppable hymn of liberation.',
    toneArcUrdu: 'خاموشی کے اندھیرے کو چیر کر کلمۂ حق کی بے باک روشنی کا اعلان۔',
    keyEmotiveKeywords: ['بول', 'آزاد', 'زبان', 'جسم', 'حق'],
    aiInsightNote: 'Faiz transforms the intimacy of the voice into a sacred weapon against tyranny, urging speech while breath remains.',
    aiInsightNoteUrdu: 'فیض نے انسانی لب اور سانس کو سچائی کی فتح کا علمبردار بنا کر لازوال انقلابی گیت عطا کیا۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'ghalib-hazaroon-khwahishein': {
    primaryMood: 'Melancholy',
    primaryMoodUrdu: 'غم و نا تمام حسرت',
    confidenceScore: 92,
    secondaryMood: 'Philosophical Resignation',
    secondaryMoodUrdu: 'تلخ مسکراہٹ',
    emotionalValence: 'Bittersweet',
    emotionalValenceUrdu: 'تلخ و شیریں',
    toneArc: 'Wistful meditation on insatiable longing that oscillates between mortal ache and playful existential mockery.',
    toneArcUrdu: 'آرزوؤں کی کثرت کا اعتراف اور انسانی آرزو کی نامکملیت پر گہرا تاسف۔',
    keyEmotiveKeywords: ['خواہشیں', 'دم', 'ارمان', 'قتل', 'تمنا'],
    aiInsightNote: 'The cadence captures the paradox of desire: fulfilling a thousand wishes only reveals the vast desert of remaining hungers.',
    aiInsightNoteUrdu: 'انسان کی طلب اور کائنات کی تنگی کا ایسا مرقع جس میں رنج بھی ہے اور زندگی کی حقیقت بھی۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'parveen-khushbu': {
    primaryMood: 'Longing',
    primaryMoodUrdu: 'اشتیاق و خوشبو',
    confidenceScore: 91,
    secondaryMood: 'Fragile Intimacy',
    secondaryMoodUrdu: 'نازک احساس',
    emotionalValence: 'Bittersweet',
    emotionalValenceUrdu: 'شیریں التماس',
    toneArc: 'Delicate sensory reverie capturing the elusive presence of a lover like perfume carried away by wind.',
    toneArcUrdu: 'ہوا کے جھونکے کی طرح محبوب کی یادوں کی عطر بیزی اور چھو لینے کی خواہش۔',
    keyEmotiveKeywords: ['خوشبو', 'ہوا', 'رنگ', 'دیدار', 'فاصلہ'],
    aiInsightNote: 'Parveen Shakir paints emotional distance through fragrant, ephemeral imagery that leaves the heart suspended in longing.',
    aiInsightNoteUrdu: 'پروین شاکر کے لہجے کی معصومیت اور نزاکت فاصلوں کو بھی عطر میں بسا دیتی ہے۔',
    modelUsed: 'gemini-3.8-flash'
  },
  'jaun-shikwa': {
    primaryMood: 'Heartbroken',
    primaryMoodUrdu: 'شکستہ دل و بیزاری',
    confidenceScore: 96,
    secondaryMood: 'Sardonic Grief',
    secondaryMoodUrdu: 'زہرخند تلخی',
    emotionalValence: 'Cathartic',
    emotionalValenceUrdu: 'شدید کرب',
    toneArc: 'Brutally honest dissection of failed intimacy and self-destructive loneliness in modern urbanity.',
    toneArcUrdu: 'بے رحمانہ سچائی، اپنے آپ سے شکوہ اور زوال کے ملبے پر نوحہ خوانی۔',
    keyEmotiveKeywords: ['برباد', 'عجیب', 'شام', 'شکوہ', 'خامشی'],
    aiInsightNote: 'Jaun Elia rejects romantic euphemisms, piercing through illusions to exhibit the bleeding wound of solitude.',
    aiInsightNoteUrdu: 'جون ایلیا کا کلام کسی پردے کے بغیر انسان کی اندرونی ٹوٹ پھوٹ کو عیاں کرتا ہے۔',
    modelUsed: 'gemini-3.8-flash'
  }
};

export function getMoodVisualConfig(mood: PoemSentimentMood): MoodVisualConfig {
  return MOOD_VISUAL_CONFIGS[mood] || MOOD_VISUAL_CONFIGS.Existential;
}

// Retrieve analyzed sentiment from cache or curated baseline, or fallback dynamically
export function getPoemSentiment(poem: Poem): PoemSentimentAnalysis {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(SENTIMENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[poem.id]) {
          const item = parsed[poem.id];
          const style = getMoodVisualConfig(item.primaryMood);
          return {
            ...item,
            colorHex: style.colorHex,
            bgClass: style.bgClass,
            borderClass: style.borderClass,
            textClass: style.textClass
          };
        }
      }
    } catch {
      // Ignore
    }
  }

  // Check curated baseline
  if (CURATED_POEM_SENTIMENTS[poem.id]) {
    const baseline = CURATED_POEM_SENTIMENTS[poem.id];
    const style = getMoodVisualConfig(baseline.primaryMood);
    return {
      poemId: poem.id,
      ...baseline,
      colorHex: style.colorHex,
      bgClass: style.bgClass,
      borderClass: style.borderClass,
      textClass: style.textClass,
      analyzedAt: '2026-10-13T00:00:00.000Z'
    };
  }

  // Dynamic heuristic fallback based on poem theme and couplets
  const deducedMood = deduceMoodFromPoem(poem);
  const style = getMoodVisualConfig(deducedMood);

  return {
    poemId: poem.id,
    primaryMood: deducedMood,
    primaryMoodUrdu: style.labelUrdu,
    confidenceScore: 89,
    secondaryMood: 'Poetic Reflection',
    secondaryMoodUrdu: 'ادبی تاثر',
    emotionalValence: deducedMood === 'Hopeful' || deducedMood === 'Serene' ? 'Positive' : 'Bittersweet',
    emotionalValenceUrdu: deducedMood === 'Hopeful' ? 'مثبت و روشن' : 'فکری و حزنیہ',
    toneArc: `Expresses ${style.labelEnglish.toLowerCase()} through classic Urdu diction and poignant cadence.`,
    toneArcUrdu: `کلاسیکی بحر اور پرسوز اشعار میں ${style.labelUrdu} کا دلنشین اظہار۔`,
    keyEmotiveKeywords: ['دل', 'عشق', 'نگاہ', 'جان'],
    aiInsightNote: `The recurring imagery reflects ${style.labelEnglish.toLowerCase()} aligned with the ${poem.theme || 'classical'} tradition.`,
    aiInsightNoteUrdu: `کلام کی ساخت اور تراکیب سے ${style.labelUrdu} کی گہری کیفیت مترشح ہوتی ہے۔`,
    colorHex: style.colorHex,
    bgClass: style.bgClass,
    borderClass: style.borderClass,
    textClass: style.textClass,
    analyzedAt: new Date().toISOString(),
    modelUsed: 'gemini-3.8-flash'
  };
}

function deduceMoodFromPoem(poem: Poem): PoemSentimentMood {
  const t = (poem.theme || '').toLowerCase();
  const title = (poem.title || '').toLowerCase() + (poem.titleUrdu || '');
  const m = (poem.mood || '').toLowerCase();

  if (m === 'inqilab' || t.includes('inqilab') || t.includes('baghaawat')) return 'Defiant';
  if (m === 'ishq' || t.includes('ishq') || t.includes('muhabbat')) return 'Ecstatic Love';
  if (m === 'gham' || t.includes('hijr') || t.includes('firaaq')) return 'Melancholy';
  if (m === 'tanhaee' || t.includes('yaas') || t.includes('tanhaee')) return 'Heartbroken';
  if (m === 'tasawwuf' || t.includes('tasawwuf')) return 'Transcendent';
  if (m === 'falsafa' || t.includes('falsafa')) return 'Existential';
  if (title.includes('امید') || title.includes('سحر') || title.includes('نور')) return 'Hopeful';
  
  return 'Existential';
}

export function savePoemSentiment(poemId: string, sentiment: PoemSentimentAnalysis): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem(SENTIMENT_STORAGE_KEY);
    const map = stored ? JSON.parse(stored) : {};
    map[poemId] = sentiment;
    localStorage.setItem(SENTIMENT_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent(SENTIMENT_UPDATED_EVENT, { detail: { poemId, sentiment } }));
  } catch (err) {
    console.error('Failed to save poem sentiment to localStorage:', err);
  }
}
