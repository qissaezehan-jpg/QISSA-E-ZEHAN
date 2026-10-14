import { Poem } from '../types/poetry';

export const POEMS: Poem[] = [
  {
    id: 'ghalib-dil-e-nadan',
    title: 'Dil-e-Nadan Tujhe Hua Kya Hai',
    titleUrdu: 'دلِ ناداں تجھے ہوا کیا ہے',
    poetId: 'ghalib',
    genre: 'Ghazal',
    theme: 'Falsafa-o-Hayaat',
    themeUrdu: 'فلسفہ و حیات و محبت',
    mood: 'falsafa',
    moods: ['falsafa', 'ishq'],
    moodUrdu: 'فلسفہ و عشق',
    meter: 'بحرِ ہزج مسدس محذوف (مفاعیلن مفاعیلن فعولن)',
    radif: 'کیا ہے',
    qafia: 'ہوا، دوا، ماجرا، مدعا، وفا',
    featured: true,
    year: '1850s',
    historicalContext: 'One of Ghalib’s most widely sung and analyzed ghazals, posing profound existential questions about pain, medicine, and human destiny under the guise of an intimate self-dialogue.',
    couplets: [
      {
        misra1: 'دلِ ناداں تجھے ہوا کیا ہے',
        misra2: 'آخر اس درد کی دوا کیا ہے',
        roman1: 'Dil-e-nadaan tujhe hua kya hai',
        roman2: 'Aakhir is dard ki dawa kya hai',
        englishTranslation: 'O foolish heart, what has befallen you? What ultimate cure exists for this enduring ache?',
        tashreeh: 'Ghalib addresses his own naive, longing heart. The pain of living and love is existential—no physical physician can cure the longing of the soul.',
        vocab: [
          { word: 'ناداں', roman: 'Nadaan', meaning: 'Inexperienced, naive, innocent' },
          { word: 'دوا', roman: 'Dawa', meaning: 'Cure, remedy' }
        ]
      },
      {
        misra1: 'ہم ہیں مشتاق اور وہ بیزار',
        misra2: 'یا الٰہی یہ ماجرا کیا ہے',
        roman1: 'Hum hain mushtaaq aur woh bezaar',
        roman2: 'Ya Ilahi yeh maajra kya hai',
        englishTranslation: 'Here we are, brimming with intense yearning, while they remain utterly aloof. O God, what strange affair is this?',
        tashreeh: 'The eternal dilemma of unrequited yearning: the lover overflows with desire (Mushtaaq), while the beloved is indifferent or weary (Bezaar). Ghalib elevates this to a cosmic inquiry before the Divine.',
        vocab: [
          { word: 'مشتاق', roman: 'Mushtaaq', meaning: 'Yearning, eager, deeply desirous' },
          { word: 'بیزار', roman: 'Bezaar', meaning: 'Aloof, disaffected, indifferent' },
          { word: 'ماجرا', roman: 'Maajra', meaning: 'Incident, unfolding scenario' }
        ]
      },
      {
        misra1: 'میں بھی منہ میں زبان رکھتا ہوں',
        misra2: 'کاش پوچھو کہ مدعا کیا ہے',
        roman1: 'Main bhi munh mein zubaan rakhta hoon',
        roman2: 'Kaash poochho ke mudda’a kya hai',
        englishTranslation: 'I too possess an articulate tongue in my mouth; if only you would deign to ask what my heart truly pleads for.',
        tashreeh: 'A playful yet sharp assertion of self-worth. Silence in love is out of reverence, not lack of eloquence. The lover craves being asked.',
        vocab: [
          { word: 'مدعا', roman: 'Mudda’a', meaning: 'Objective, underlying plea, desire' }
        ]
      },
      {
        misra1: 'ہم کو ان سے وفا کی ہے امید',
        misra2: 'جو نہیں جانتے وفا کیا ہے',
        roman1: 'Hum ko un se wafa ki hai umeed',
        roman2: 'Jo nahin jaante wafa kya hai',
        englishTranslation: 'We foolishly harbor hopes of faithfulness from those who do not even know what fidelity means.',
        tashreeh: 'The pinnacle of classical irony. The lover is acutely aware of the futility of his expectations, yet human love remains perpetually obstinate.',
        vocab: [
          { word: 'وفا', roman: 'Wafa', meaning: 'Fidelity, loyal devotion' }
        ]
      },
      {
        misra1: 'جان تم پر نثار کرتا ہوں',
        misra2: 'میں نہیں جانتا دعا کیا ہے',
        roman1: 'Jaan tum par nisaar karta hoon',
        roman2: 'Main nahin jaanta dua kya hai',
        englishTranslation: 'I surrender my very life as a tribute upon you; I know not what empty formal prayers could ever compare.',
        tashreeh: 'Surrender in love replaces verbal rituals. The ultimate prayer is total self-sacrifice (Nisaar) for the beloved.',
        vocab: [
          { word: 'نثار', roman: 'Nisaar', meaning: 'Sacrifice, offering, devotion' }
        ]
      }
    ]
  },
  {
    id: 'iqbal-shikwa-jawab-shikwa',
    title: 'Sitaron Se Aage Jahan Aur Bhi Hain',
    titleUrdu: 'ستاروں سے آگے جہاں اور بھی ہیں',
    poetId: 'iqbal',
    genre: 'Ghazal',
    theme: 'Tasawwuf',
    themeUrdu: 'تصوف، خودی اور کائناتی پرواز',
    mood: 'tasawwuf',
    moods: ['tasawwuf', 'falsafa'],
    moodUrdu: 'تصوف و خودی',
    meter: 'بحرِ رمل مثمن محذوف (فاعلاتن فاعلاتن فاعلاتن فاعلن)',
    radif: 'اور بھی ہیں',
    qafia: 'جہاں، امتحاں، آشیاں، کارواں',
    featured: true,
    year: '1935',
    historicalContext: 'Featured in Iqbal’s magnum opus "Baal-e-Jibreel" (Gabriel’s Wing). A cosmic hymn urging the human soul to break all physical frontiers and soar toward limitless self-realization.',
    couplets: [
      {
        misra1: 'ستاروں سے آگے جہاں اور بھی ہیں',
        misra2: 'ابھی عشق کے امتحان اور بھی ہیں',
        roman1: 'Sitaaron se aage jahaan aur bhi hain',
        roman2: 'Abhi ishq ke imtehaan aur bhi hain',
        englishTranslation: 'Beyond the distant stars, still other infinite realms await! There are yet countless trials for cosmic love to conquer.',
        tashreeh: 'Iqbal urges humanity never to rest satisfied with modest achievements. The cosmos is infinite, and Ishq (dynamic creative passion) is an eternal journey without destination.',
        vocab: [
          { word: 'جہاں', roman: 'Jahaan', meaning: 'Worlds, universes' },
          { word: 'امتحان', roman: 'Imtehaan', meaning: 'Ordeals, trials of fortitude' }
        ]
      },
      {
        misra1: 'تہی زندگی سے نہیں یہ فضائیں',
        misra2: 'یہاں سینکڑوں کارواں اور بھی ہیں',
        roman1: 'Tahi zindagi se nahin yeh fazaayein',
        roman2: 'Yahaan sainkdon kaarwaan aur bhi hain',
        englishTranslation: 'These interstellar expanses are not desolate of vital life; hundreds of ethereal caravans traverse this space even now.',
        tashreeh: 'The universe is alive and bustling with spiritual striving. Human consciousness is not alone; it is part of a grand tapestry of evolving spirits.',
        vocab: [
          { word: 'تہی', roman: 'Tahi', meaning: 'Void, empty, hollow' },
          { word: 'کارواں', roman: 'Kaarwaan', meaning: 'Caravan, traveling collective' }
        ]
      },
      {
        misra1: 'قناعت نہ کر عالمِ رنگ و بو پر',
        misra2: 'چمن اور بھی آشیاں اور بھی ہیں',
        roman1: 'Qana’at na kar aalam-e-rang-o-boo par',
        roman2: 'Chaman aur bhi aashiyaan aur bhi hain',
        englishTranslation: 'Do not settle contentedly within this fleeting material world of colors and scents; there are myriad gardens and nests beyond this horizon!',
        tashreeh: 'A direct warning against complacency (Qana’at) in worldly illusions. The human spirit belongs to higher transcendent spheres.',
        vocab: [
          { word: 'قناعت', roman: 'Qana’at', meaning: 'Passive contentment, settling' },
          { word: 'آشیاں', roman: 'Aashiyaan', meaning: 'Nest, sanctuary' }
        ]
      },
      {
        misra1: 'تو شاہیں ہے پرواز ہے کام تیرا',
        misra2: 'تیرے سامنے آسماں اور بھی ہیں',
        roman1: 'Tu shaheen hai parwaaz hai kaam tera',
        roman2: 'Tere saamne aasmaan aur bhi hain',
        englishTranslation: 'You are the sovereign falcon (Shaheen); your sole vocation is soaring high! Before your sight lie heavens yet untrod.',
        tashreeh: 'The pinnacle of Iqbalian imagery: The Shaheen (falcon) embodies self-reliance, high-flying ambition, free spirit, and disdain for worldly scavenger mentality.',
        vocab: [
          { word: 'شاہیں', roman: 'Shaheen', meaning: 'Royal falcon / eagle' },
          { word: 'پرواز', roman: 'Parwaaz', meaning: 'High flight, soaring' }
        ]
      }
    ]
  },
  {
    id: 'faiz-hum-dekhenge',
    title: 'Hum Dekhenge (Wa Yabqa Wajhu Rabbik)',
    titleUrdu: 'ہم دیکھیں گے — لازم ہے کہ ہم بھی دیکھیں گے',
    poetId: 'faiz',
    genre: 'Nazm',
    theme: 'Inqilab-o-Baghaawat',
    themeUrdu: 'انقلاب، مزاحمت اور امیدِ سحر',
    mood: 'inqilab',
    moods: ['inqilab', 'falsafa'],
    moodUrdu: 'انقلاب و مزاحمت',
    featured: true,
    year: '1979',
    historicalContext: 'Written in 1979 during General Zia-ul-Haq’s military regime. Made globally legendary when Iqbal Bano sang it in front of 50,000 defying citizens at Alhamra Arts Council in Lahore in 1986.',
    couplets: [
      {
        misra1: 'ہم دیکھیں گے',
        misra2: 'لازم ہے کہ ہم بھی دیکھیں گے',
        roman1: 'Hum dekhenge',
        roman2: 'Laazim hai ke hum bhi dekhenge',
        englishTranslation: 'We shall witness! It is decreed that we, too, shall see that dawn!',
        tashreeh: 'An unshakeable manifesto of hope and historical inevitability against tyranny and censorship.',
        vocab: [
          { word: 'لازم', roman: 'Laazim', meaning: 'Inevitable, decreed, imperative' }
        ]
      },
      {
        misra1: 'وہ دن کہ جس کا وعدہ ہے',
        misra2: 'جو لوحِ ازل میں لکھا ہے',
        roman1: 'Woh din ke jis ka waada hai',
        roman2: 'Jo lauh-e-azal mein likha hai',
        englishTranslation: 'That promised day engraved upon the eternal tablet of destiny from the dawn of time.',
        tashreeh: 'Faiz harnesses Quranic and mystical eschatology (Lauh-e-Azal) to proclaim that divine justice will inevitably topple human autocracy.',
        vocab: [
          { word: 'لوحِ ازل', roman: 'Lauh-e-Azal', meaning: 'The eternal celestial slate of destiny' }
        ]
      },
      {
        misra1: 'جب ظلم و ستم کے کوہِ گراں',
        misra2: 'روئی کی طرح اڑ جائیں گے',
        roman1: 'Jab zulm-o-sitam ke koh-e-giraan',
        roman2: 'Rooee ki tarah ud jaayenge',
        englishTranslation: 'When the oppressive towering mountains of tyranny will scatter away like wisps of weightless cotton.',
        tashreeh: 'Direct literary allusion (Talmeeh) to Surah Al-Qariah: oppressive military structures will crumble effortlessly when the masses rise.',
        vocab: [
          { word: 'کوہِ گراں', roman: 'Koh-e-Giraan', meaning: 'Colossal mountain, heavy peak' }
        ]
      },
      {
        misra1: 'جب ارضِ خدا کے کعبے سے',
        misra2: 'سب بت اٹھوائے جائیں گے',
        roman1: 'Jab arz-e-khuda ke ka’abe se',
        roman2: 'Sab but uthwaaye jaayenge',
        englishTranslation: 'When from the consecrated sanctuary of God’s earth, every counterfeit idol of power shall be cast out.',
        tashreeh: 'Idols symbolize authoritarian leaders, corruption, and false gods of feudal power.',
        vocab: [
          { word: 'ارضِ خدا', roman: 'Arz-e-Khuda', meaning: 'Earth of the Divine' }
        ]
      },
      {
        misra1: 'اور راج کرے گی خلقِ خدا',
        misra2: 'جو میں بھی ہوں اور تم بھی ہو',
        roman1: 'Aur raaj karegi khalq-e-khuda',
        roman2: 'Jo main bhi hoon aur tum bhi ho',
        englishTranslation: 'And sovereign rule shall belong solely to the people of God—who are you, and who am I!',
        tashreeh: 'The democratic proclamation: the true sovereign on earth is "Khalq-e-Khuda" (the working masses), equal and dignifying.',
        vocab: [
          { word: 'خلقِ خدا', roman: 'Khalq-e-Khuda', meaning: 'The collective creations / people of God' }
        ]
      }
    ]
  },
  {
    id: 'mir-patta-patta',
    title: 'Patta Patta Boota Boota Hal Hamara Jane Hai',
    titleUrdu: 'پتا پتا بوٹا بوٹا حال ہمارا جانے ہے',
    poetId: 'mir',
    genre: 'Ghazal',
    theme: 'Hijr-o-Firaaq',
    themeUrdu: 'ہجر، اداسی اور دلی واردات',
    mood: 'gham',
    moods: ['gham', 'ishq'],
    moodUrdu: 'غم و ہجر',
    meter: 'بحرِ ہزج مثمن اخرب مقبوض محذوف',
    radif: 'جانے ہے',
    qafia: 'ہمارا، بے پروا، باغ، دانستہ',
    featured: true,
    year: '1780s',
    historicalContext: 'A landmark in Urdu lyricism. Mir Taqi Mir uses botanical garden imagery to mirror human heartbreak and universal sympathy in nature.',
    couplets: [
      {
        misra1: 'پتا پتا بوٹا بوٹا حال ہمارا جانے ہے',
        misra2: 'جانے نہ جانے گل ہی نہ جانے باغ تو سارا جانے ہے',
        roman1: 'Patta patta boota boota haal hamaara jaane hai',
        roman2: 'Jaane na jaane gul hi na jaane baagh to saara jaane hai',
        englishTranslation: 'Every leaf, every bush is privy to our tragic state; only the beloved rose remains heedless, while the entire garden knows!',
        tashreeh: 'Mir contrasts the sympathy of the entire natural universe with the cold indifference of the singular beloved (the Rose).',
        vocab: [
          { word: 'بوٹا', roman: 'Boota', meaning: 'Shrub, budding plant' },
          { word: 'گل', roman: 'Gul', meaning: 'Rose, the elusive beloved' }
        ]
      },
      {
        misra1: 'لگے نہ دل کو کیا جانیے کیوں نین ملے اس چتون سے',
        misra2: 'سینہ چھدا تلواری چلی یا تیر جگر کے پار ہوئے',
        roman1: 'Lage na dil ko kya jaaniye kyun nain mile us chitwan se',
        roman2: 'Seena chhida talwaari chali ya teer jigar ke paar huye',
        englishTranslation: 'Why did my gaze ever cross that glancing look? It was as though a sword pierced my chest and arrows split my heart.',
        tashreeh: 'The immediate wound of falling in love portrayed through classical imagery of archery and swordcraft.',
        vocab: [
          { word: 'چتون', roman: 'Chitwan', meaning: 'Amorous glance, coquettish gaze' }
        ]
      },
      {
        misra1: 'میرؔ دوانے نے کر ڈالی آخر کو بربادی اپنی',
        misra2: 'عشق میں سودا کر کے ہم نے خوب کیا خسارہ کیا',
        roman1: 'Mir deewane ne kar daali aakhir ko barbaadi apni',
        roman2: 'Ishq mein sauda kar ke hum ne khoob kiya khasaara kiya',
        englishTranslation: 'Mad Mir finally brought about his own total ruin! By trading in the marketplace of love, what a grand loss we willingly bought.',
        tashreeh: 'Self-deprecation in the Maqta: love is an unprofitable merchant transaction where the only gain is glorious spiritual ruin.',
        vocab: [
          { word: 'خسارہ', roman: 'Khasaara', meaning: 'Deficit, loss' }
        ]
      }
    ]
  },
  {
    id: 'jaun-ye-gham-kya-dil-ki-aadat-hai',
    title: 'Ye Gham Kya Dil Ki Aadat Hai',
    titleUrdu: 'یہ غم کیا دل کی عادت ہے نہیں ہے',
    poetId: 'jaun',
    genre: 'Ghazal',
    theme: 'Yaas-o-Tanhaee',
    themeUrdu: 'یاس، تشکیک اور جدید تنہائی',
    mood: 'gham',
    moods: ['gham', 'falsafa', 'tanhaee'],
    moodUrdu: 'غم و تشکیک',
    meter: 'بحرِ متقارب مثمن سالم',
    radif: 'نہیں ہے',
    qafia: 'عادت، راحت، ضرورت، رخصت',
    featured: true,
    year: '1989',
    historicalContext: 'Published in Jaun Elia’s breakthrough collection "Shayad". Captures the bitter post-modern disillusionment with love, society, and existence.',
    couplets: [
      {
        misra1: 'یہ غم کیا دل کی عادت ہے؟ نہیں ہے',
        misra2: 'کسی سے کچھ شکایت ہے؟ نہیں ہے',
        roman1: 'Yeh gham kya dil ki aadat hai? Nahin hai',
        roman2: 'Kisi se kuchh shikaayat hai? Nahin hai',
        englishTranslation: 'Has this sorrow become merely a habit of the heart? No, it has not. Do I harbor a grievance against anyone? No, I do not.',
        tashreeh: 'Jaun engages in a ruthless self-interrogation. By rejecting conventional victimhood, he strips human suffering down to raw nihilism.',
        vocab: [
          { word: 'عادت', roman: 'Aadat', meaning: 'Habitual disposition' },
          { word: 'شکایت', roman: 'Shikaayat', meaning: 'Grievance, reproach' }
        ]
      },
      {
        misra1: 'بہت نزدیک آتی جا رہی ہو',
        misra2: 'بچھڑنے کی علامت ہے؟ نہیں ہے',
        roman1: 'Bahut nazdeek aati jaa rahi ho',
        roman2: 'Bichhadne ki alaamat hai? Nahin hai',
        englishTranslation: 'You keep drawing so alarmingly close... Is this the ominous omen of an impending separation? Or is it not?',
        tashreeh: 'Psychological brilliance: extreme intimacy often portends the climax and inevitable fracture of love.',
        vocab: [
          { word: 'علامت', roman: 'Alaamat', meaning: 'Omen, indicator, sign' }
        ]
      },
      {
        misra1: 'جو اب ہم میں تم میں ہے وہ اک تعلق ہے',
        misra2: 'مگر کیا یہ محبت ہے؟ نہیں ہے',
        roman1: 'Jo ab hum mein tum mein hai woh ik ta’alluq hai',
        roman2: 'Magar kya yeh mohabbat hai? Nahin hai',
        englishTranslation: 'What lingers between us now is indeed an acquaintance, a tie; but is this passionate love? No, it is not.',
        tashreeh: 'Jaun distinguishes between routine interpersonal relationship (Ta’alluq) and authentic transcendent love (Mohabbat).',
        vocab: [
          { word: 'تعلق', roman: 'Ta’alluq', meaning: 'Connection, formal tie' }
        ]
      }
    ]
  },
  {
    id: 'parveen-woh-to-khushboo-hai',
    title: 'Woh To Khushboo Hai Hawaon Mein Bikhar Jayega',
    titleUrdu: 'وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا',
    poetId: 'parveen',
    genre: 'Ghazal',
    theme: 'Ishq-o-Muhabbat',
    themeUrdu: 'رومان، نسائی احساس اور نازک جذبات',
    mood: 'ishq',
    moods: ['ishq', 'gham'],
    moodUrdu: 'عشق و احساس',
    meter: 'بحرِ رمل مثمن مقطوع',
    radif: 'جائے گا',
    qafia: 'بکھر، کدھر، نظر، گزر',
    featured: true,
    year: '1976',
    historicalContext: 'From Parveen Shakir’s phenomenal debut "Khushboo" (1976), which won the Adamjee Literary Award and brought a fresh feminine dawn to Urdu literature.',
    couplets: [
      {
        misra1: 'وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا',
        misra2: 'مسئلہ پھول کا ہے پھول کدھر جائے گا',
        roman1: 'Woh to khushboo hai hawaaon mein bikhar jaayega',
        roman2: 'Masla phool ka hai phool kidhar jaayega',
        englishTranslation: 'He is merely fragrance; he will drift effortlessly into the open winds. The tragedy belongs to the flower—where shall the blossom turn now?',
        tashreeh: 'The lover (the flower) remains rooted, bound to endure the fading of its core essence, while the fleeting beloved (the aroma) departs free.',
        vocab: [
          { word: 'خوشبو', roman: 'Khushboo', meaning: 'Fragrance, scent' },
          { word: 'بکھر', roman: 'Bikhar', meaning: 'Disperse, scatter' }
        ]
      },
      {
        misra1: 'ہم تو سمجھے تھے کہ اک زخم ہے بھر جائے گا',
        misra2: 'کیا خبر تھی کہ رگِ جاں میں اتر جائے گا',
        roman1: 'Hum to samjhe the ke ik zakhm hai bhar jaayega',
        roman2: 'Kya khabar thi ke rag-e-jaan mein utar jaayega',
        englishTranslation: 'We assumed it was merely a surface wound that time would heal; little did we know it would seep into the very jugular vein of existence.',
        tashreeh: 'Emotional hurt that transcends physical injury to become the lifeblood of identity itself.',
        vocab: [
          { word: 'رگِ جاں', roman: 'Rag-e-Jaan', meaning: 'Jugular / life-artery' }
        ]
      },
      {
        misra1: 'میں نے چاہا تھا کہ اندوہ کے بادل چھٹ جائیں',
        misra2: 'کس کو معلوم تھا یہ درد ٹھہر جائے گا',
        roman1: 'Main ne chaaha tha ke andoh ke baadal chhat jaayein',
        roman2: 'Kis ko ma’loom tha yeh dard theher jaayega',
        englishTranslation: 'I prayed that these dark clouds of grief would dissipate; who knew this ache had come to stay forever?',
        tashreeh: 'The permanence of emotional melancholia despite every conscious wish for relief.',
        vocab: [
          { word: 'اندوہ', roman: 'Andoh', meaning: 'Gloom, heavy sorrow' }
        ]
      }
    ]
  },
  {
    id: 'faraz-ranjish-hi-sahi',
    title: 'Ranjish Hi Sahi Dil Hi Dukhane Ke Liye Aa',
    titleUrdu: 'رنجش ہی سہی دل ہی دکھانے کے لیے آ',
    poetId: 'faraz',
    genre: 'Ghazal',
    theme: 'Hijr-o-Firaaq',
    themeUrdu: 'ہجر، ارمان اور التجا',
    mood: 'gham',
    moods: ['gham', 'ishq'],
    moodUrdu: 'غم و التجا',
    meter: 'بحرِ رمل مثمن مقصور',
    radif: 'کے لیے آ',
    qafia: 'دکھانے، جانے، زمانے، جلانے',
    featured: true,
    year: '1970',
    historicalContext: 'Immortalized in the subcontinent by Mehdi Hassan’s definitive rendition. Regarded as one of the most emotionally charged ghazals of modern romantic despair.',
    couplets: [
      {
        misra1: 'رنجش ہی سہی دل ہی دکھانے کے لیے آ',
        misra2: 'آ پھر سے مجھے چھوڑ کے جانے کے لیے آ',
        roman1: 'Ranjish hi sahi dil hi dukhaane ke liye aa',
        roman2: 'Aa phir se mujhe chhod ke jaane ke liye aa',
        englishTranslation: 'Even if it be in resentment, even if only to wound my heart again, come! Come once more, if only to abandon me all over again.',
        tashreeh: 'The ultimate desperation of romantic withdrawal: even agony inflicted by the beloved’s presence is infinitely sweeter than cold absence.',
        vocab: [
          { word: 'رنجش', roman: 'Ranjish', meaning: 'Estrangement, bitter resentment' }
        ]
      },
      {
        misra1: 'پہلے سے مراسم نہ سہی پھر بھی کبھی تو',
        misra2: 'رسم و رہِ دنیا ہی نبھانے کے لیے آ',
        roman1: 'Pehle se maraasim na sahi phir bhi kabhi to',
        roman2: 'Rasm-o-rah-e-dunya hi nibhaane ke liye aa',
        englishTranslation: 'Even if our old intimacy is broken, come at least to maintain the polite decorum of the world.',
        tashreeh: 'A pleading bargain: if love cannot bring you back, let societal courtesy be the pretext for seeing each other.',
        vocab: [
          { word: 'مراسم', roman: 'Maraasim', meaning: 'Intimate ties, relations' },
          { word: 'رسم و رہ', roman: 'Rasm-o-Rah', meaning: 'Customs and etiquette' }
        ]
      },
      {
        misra1: 'اک عمر سے ہوں لذتِ گریہ سے بھی محروم',
        misra2: 'اے راحتِ جاں مجھ کو رلانے کے لیے آ',
        roman1: 'Ik umr se hoon lazzat-e-girya se bhi mehroom',
        roman2: 'Aye raahat-e-jaan mujh ko rulaane ke liye aa',
        englishTranslation: 'For ages I have been starved even of the sweet catharsis of weeping; O delight of my soul, come, if only to make me weep!',
        tashreeh: 'Numbness is worse than sorrow. The poet craves tears because tears at least signify feeling alive.',
        vocab: [
          { word: 'لذتِ گریہ', roman: 'Lazzat-e-Girya', meaning: 'The sweet taste/pleasure of weeping' },
          { word: 'راحتِ جاں', roman: 'Raahat-e-Jaan', meaning: 'Solace of my soul' }
        ]
      }
    ]
  },
  {
    id: 'zafar-lagta-nahi-hai-dil',
    title: 'Lagta Nahin Hai Dil Mera Ujde Dayar Mein',
    titleUrdu: 'لگتا نہیں ہے دل مرا اجڑے دیار میں',
    poetId: 'zafar',
    genre: 'Ghazal',
    theme: 'Yaas-o-Tanhaee',
    themeUrdu: 'زوال، جلاوطنی اور المیہ',
    mood: 'gham',
    moods: ['gham', 'tanhaee', 'falsafa'],
    moodUrdu: 'غم و زوال',
    meter: 'بحرِ ہزج مثمن اشتر',
    radif: 'میں',
    qafia: 'دیار، روزگار، اختیار، مزار',
    featured: true,
    year: '1860',
    historicalContext: 'Composed by Emperor Bahadur Shah Zafar in Rangoon prison while in British exile, mourning the fall of Mughal Delhi.',
    couplets: [
      {
        misra1: 'لگتا نہیں ہے دل مرا اجڑے دیار میں',
        misra2: 'کس کی بنی ہے عالمِ ناپائیدار میں',
        roman1: 'Lagta nahin hai dil mira ujde dayaar mein',
        roman2: 'Kis ki bani hai aalam-e-naa-paayedaar mein',
        englishTranslation: 'My desolate heart finds no solace in this ruined land; who has ever found lasting permanence in this ephemeral universe?',
        tashreeh: 'A shattered sovereign contemplates both the physical ruin of his empire (Delhi) and the metaphysical transience of life itself.',
        vocab: [
          { word: 'اجڑے دیار', roman: 'Ujde Dayaar', meaning: 'Ruined homeland / desolate place' },
          { word: 'ناپائیدار', roman: 'Naa-paayedaar', meaning: 'Ephemeral, fleeting, impermanent' }
        ]
      },
      {
        misra1: 'عمرِ دراز مانگ کے لائے تھے چار دن',
        misra2: 'دو آرزو میں کٹ گئے دو انتظار میں',
        roman1: 'Umr-e-daraaz maang ke laaye the chaar din',
        roman2: 'Do aarzoo mein kat gaye do intezaar mein',
        englishTranslation: 'We begged for a long lifespan and were granted merely four brief days: two were spent in futile yearning, and two in weary waiting.',
        tashreeh: 'One of the most famous metaphors for human existence: life is compressed into four days of wishing and waiting.',
        vocab: [
          { word: 'عمرِ دراز', roman: 'Umr-e-Daraaz', meaning: 'Extended longevity / long life' },
          { word: 'آرزو', roman: 'Aarzoo', meaning: 'Deep longing, wish' }
        ]
      },
      {
        misra1: 'کتنا ہے بد نصیب ظفرؔ دفن کے لیے',
        misra2: 'دو گز زمیں بھی نہ ملی کوئے یار میں',
        roman1: 'Kitna hai bad-naseeb Zafar dafn ke liye',
        roman2: 'Do gaz zameen bhi na mili koo-e-yaar mein',
        englishTranslation: 'How ill-fated is Zafar! For his final rest, he could not even secure two yards of earth in the lane of his beloved homeland.',
        tashreeh: 'The heartbreak of dying in foreign exile away from ancestral soil.',
        vocab: [
          { word: 'کوئے یار', roman: 'Koo-e-Yaar', meaning: 'The beloved’s street / ancestral homeland' }
        ]
      }
    ]
  },
  {
    id: 'momin-asar-us-ko',
    title: 'Asar Us Ko Zara Nahin Hota',
    titleUrdu: 'اثر اس کو ذرا نہیں ہوتا',
    poetId: 'momin',
    genre: 'Ghazal',
    theme: 'Ishq-o-Muhabbat',
    themeUrdu: 'عشق، سوزِ دروں اور ناز و ادا',
    mood: 'ishq',
    moods: ['ishq', 'gham'],
    moodUrdu: 'عشق و سوز',
    meter: 'بحرِ ہزج مثمن اخرب مقبوض محذوف',
    radif: 'نہیں ہوتا',
    qafia: 'ہوتا، فزا، دوا، وفا',
    featured: true,
    year: '1830s',
    historicalContext: 'Momin Khan Momin’s most renowned ghazal of delicate romantic intimacy. Revered by Ghalib, who famously wished to trade his whole Diwan for its signature couplet.',
    couplets: [
      {
        misra1: 'اثر اس کو ذرا نہیں ہوتا',
        misra2: 'رنج راحت فزا نہیں ہوتا',
        roman1: 'Asar us ko zara nahin hota',
        roman2: 'Ranj raahat-faza nahin hota',
        englishTranslation: 'It has not the slightest effect upon the beloved; my suffering never turns into comforting solace.',
        tashreeh: 'The lover laments the stone-hearted indifference of the beloved towards prayers and sighs.',
        vocab: [
          { word: 'اثر', roman: 'Asar', meaning: 'Effect, emotional impact' },
          { word: 'راحت فزا', roman: 'Raahat-faza', meaning: 'Solace-increasing, soothing' }
        ]
      },
      {
        misra1: 'تم مرے پاس ہوتے ہو گویا',
        misra2: 'جب کوئی دوسرا نہیں ہوتا',
        roman1: 'Tum mere paas hote ho goya',
        roman2: 'Jab koi doosra nahin hota',
        englishTranslation: 'You seem to be right beside me in intimate presence, whenever no one else is around.',
        tashreeh: 'The crown jewel of Urdu romantic verse. The lover experiences the vivid, spiritual presence of the beloved in solitary silence.',
        vocab: [
          { word: 'گویا', roman: 'Goya', meaning: 'As though, as if' }
        ]
      },
      {
        misra1: 'حالِ دل یار کو لکھوں کیوں کر',
        misra2: 'ہاتھ دل سے جدا نہیں ہوتا',
        roman1: 'Haal-e-dil yaar ko likhoon kyun kar',
        roman2: 'Haath dil se juda nahin hota',
        englishTranslation: 'How could I possibly write the state of my heart to the beloved, when my hand cannot even detach from clutching my aching chest?',
        tashreeh: 'Poetic hyperbole (Mubaligha) depicting acute physical and emotional heartache.',
        vocab: [
          { word: 'حالِ دل', roman: 'Haal-e-dil', meaning: 'Condition of the heart' }
        ]
      }
    ]
  },
  {
    id: 'ghalib-hazaron-khwahishen',
    title: 'Hazaron Khwahishen Aisi Ke Har Khwahish Pe Dam Nikle',
    titleUrdu: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
    poetId: 'ghalib',
    genre: 'Ghazal',
    theme: 'Falsafa-o-Hayaat',
    themeUrdu: 'فلسفہ، آرزو اور بے پایاں تمنا',
    mood: 'falsafa',
    moods: ['falsafa', 'gham'],
    moodUrdu: 'فلسفہ و تمنا',
    meter: 'بحرِ رمل مثمن مقصور',
    radif: 'پہ دم نکلے',
    qafia: 'خواہش، کم، سم، غم',
    featured: true,
    year: '1854',
    historicalContext: 'One of the ultimate masterpieces of Urdu philosophical verse. Ghalib probes the boundless depth of human longing against the finite boundaries of mortality.',
    couplets: [
      {
        misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
        misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
        roman1: 'Hazaaron khwahishein aisi ke har khwahish pe dam nikle',
        roman2: 'Bahut nikle mire armaan lekin phir bhi kam nikle',
        englishTranslation: 'Thousands of desires, each so overpowering that every desire would take one’s breath away; countless longings were fulfilled, yet so few they still seem.',
        tashreeh: 'The infinite nature of human yearning contrasted with the tragedy of finite earthly fulfillment. No matter how many wishes come true, the soul’s hunger remains unquenched.',
        vocab: [
          { word: 'خواہشیں', roman: 'Khwahishein', meaning: 'Desires, yearnings' },
          { word: 'ارمان', roman: 'Armaan', meaning: 'Longings, unfulfilled aspirations' }
        ]
      },
      {
        misra1: 'نکلنا خلد سے آدم کا سنتے آئے ہیں لیکن',
        misra2: 'بہت بے آبرو ہو کر ترے کوچے سے ہم نکلے',
        roman1: 'Nikalna khuld se aadam ka sunte aaye hain lekin',
        roman2: 'Bahut be-aabroo ho kar tire kooche se hum nikle',
        englishTranslation: 'We have long heard tales of Adam being cast out from Paradise, yet far more disgraced and humbled did we depart from your lane.',
        tashreeh: 'Ghalib uses the primordial expulsion from Eden (Talmeeh) to compare his own humiliating exile from the beloved’s alley.',
        vocab: [
          { word: 'خلد', roman: 'Khuld', meaning: 'Paradise, Eden' },
          { word: 'بے آبرو', roman: 'Be-aabroo', meaning: 'Humiliated, stripped of honor' }
        ]
      },
      {
        misra1: 'محبت میں نہیں ہے فرق جینے اور مرنے کا',
        misra2: 'اسی کو دیکھ کر جیتے ہیں جس کافر پہ دم نکلے',
        roman1: 'Mohabbat mein nahin hai farq jeene aur marne ka',
        roman2: 'Usi ko dekh kar jeete hain jis kaafir pe dam nikle',
        englishTranslation: 'In passionate love there remains no boundary between living and dying: we breathe life solely by gazing at the very cruel charmer for whom our breath departs.',
        tashreeh: 'The paradox of love: life and death become synonymous. The source of mortality is simultaneously the sole sustenance of existence.',
        vocab: [
          { word: 'کافر', roman: 'Kaafir', meaning: 'Cruel, infidel, bewitching beloved' }
        ]
      }
    ]
  },
  {
    id: 'ghalib-yeh-na-thi-hamari-qismat',
    title: 'Yeh Na Thi Hamari Qismat Ke Visal-e-Yar Hota',
    titleUrdu: 'یہ نہ تھی ہماری قسمت کہ وصالِ یار ہوتا',
    poetId: 'ghalib',
    genre: 'Ghazal',
    theme: 'Hijr-o-Firaaq',
    themeUrdu: 'عشق، ہجر، مقدر اور مایوسی',
    mood: 'ishq',
    moods: ['ishq', 'gham', 'falsafa'],
    moodUrdu: 'عشق و ہجر',
    meter: 'بحرِ ہزج مثمن سالم',
    radif: 'ہوتا',
    qafia: 'یار، انتظار، اعتبار، نثار',
    featured: true,
    year: '1850',
    historicalContext: 'A towering elegy of eternal heartbreak, unfulfilled destiny, and ironic stoicism.',
    couplets: [
      {
        misra1: 'یہ نہ تھی ہماری قسمت کہ وصالِ یار ہوتا',
        misra2: 'اگر اور جیتے رہتے یہی انتظار ہوتا',
        roman1: 'Yeh na thi hamaari qismat ke wisaal-e-yaar hota',
        roman2: 'Agar aur jeete rehte yahi intezaar hota',
        englishTranslation: 'It was never written in our destiny that union with the beloved should be attained; had we lived longer, it would still have been this same endless waiting.',
        tashreeh: 'Unwavering realization of fate. Death is not what prevented union—union was never part of destiny.',
        vocab: [
          { word: 'وصالِ یار', roman: 'Wisaal-e-Yaar', meaning: 'Union with the beloved' },
          { word: 'قسمت', roman: 'Qismat', meaning: 'Destiny, fate' }
        ]
      },
      {
        misra1: 'ترے وعدے پر جیے ہم تو یہ جان جھوٹ جانا',
        misra2: 'کہ خوشی سے مر نہ جاتے اگر اعتبار ہوتا',
        roman1: 'Tire waade par jiye hum to yeh jaan jhooth jaana',
        roman2: 'Ke khushi se mar na jaate agar e’tibaar hota',
        englishTranslation: 'If I survived trusting your promise, know well that it was a falsehood—for would I not have died of sheer ecstasy had I truly believed it?',
        tashreeh: 'Ingenious logical deduction: survival itself proves lack of belief, because true trust in such joy would have stopped the lover’s heart.',
        vocab: [
          { word: 'اعتبار', roman: 'E’tibaar', meaning: 'Trust, faith, belief' }
        ]
      },
      {
        misra1: 'کوئی میرے دل سے پوچھے ترے تیرِ نیم کش کو',
        misra2: 'یہ خلش کہاں سے ہوتی جو جگر کے پار ہوتا',
        roman1: 'Koi mere dil se poochhe tire teer-e-neem-kash ko',
        roman2: 'Yeh khalish kahaan se hoti jo jigar ke paar hota',
        englishTranslation: 'Ask my aching heart of your half-drawn arrow! Whence would this lingering torment come, had the arrow passed clean through my heart?',
        tashreeh: 'The metaphor of the half-drawn arrow (Teer-e-neem-kash): a fatal wound that pierces halfway leaves an eternal exquisite ache (Khalish).',
        vocab: [
          { word: 'تیرِ نیم کش', roman: 'Teer-e-neem-kash', meaning: 'Half-drawn arrow' },
          { word: 'خلش', roman: 'Khalish', meaning: 'Prickling ache, lingering torment' }
        ]
      }
    ]
  },
  {
    id: 'nasir-dil-mein-ik-lehar',
    title: 'Dil Mein Ik Lehar Si Uthi Hai Abhi',
    titleUrdu: 'دل میں اک لہر سی اٹھی ہے ابھی',
    poetId: 'nasir',
    genre: 'Ghazal',
    theme: 'Yaas-o-Tanhaee',
    themeUrdu: 'غم، تنہائی، یادِ رفتگاں اور شبینہ سکوت',
    mood: 'gham',
    moods: ['gham', 'tanhaee'],
    moodUrdu: 'غم و اداسی',
    meter: 'بحرِ رمل مسدس مقصور',
    radif: 'ابھی',
    qafia: 'اٹھی، چلی، جلی، ملی',
    featured: true,
    year: '1952',
    historicalContext: 'Nasir Kazmi’s signature ghazal encapsulating post-partition nostalgic melancholy and the solitude of evening dusk (شام کا شاعر).',
    couplets: [
      {
        misra1: 'دل میں اک لہر سی اٹھی ہے ابھی',
        misra2: 'کوئی تازہ ہوا چلی ہے ابھی',
        roman1: 'Dil mein ik lehar si uthi hai abhi',
        roman2: 'Koi taaza hawa chali hai abhi',
        englishTranslation: 'A gentle surge has just stirred within the heart; a crisp fresh breeze has just brushed by.',
        tashreeh: 'The sudden awakening of deep suppressed memories through the physical sensation of an evening breeze.',
        vocab: [
          { word: 'لہر', roman: 'Lehar', meaning: 'Wave, sudden emotion' }
        ]
      },
      {
        misra1: 'یاد کے بے نشان جزیروں سے',
        misra2: 'تیری آواز سی سنی ہے ابھی',
        roman1: 'Yaad ke be-nishaan jazeeron se',
        roman2: 'Teri aawaaz si suni hai abhi',
        englishTranslation: 'From the uncharted islands of distant memory, I fancied hearing an echo of your voice just now.',
        tashreeh: 'Memory represented as uncharted islands—distant, foggy, yet capable of transmitting haunting sounds.',
        vocab: [
          { word: 'جزیرہ', roman: 'Jazeera', meaning: 'Island, solitary realm' }
        ]
      },
      {
        misra1: 'شہر کی بے چراغ گلیوں میں',
        misra2: 'زندگی تجھ کو ڈھونڈتی ہے ابھی',
        roman1: 'Shehr ki be-charaagh galiyon mein',
        roman2: 'Zindagi tujh ko dhoondti hai abhi',
        englishTranslation: 'Through the lampless, darkened alleys of this city, life continues searching for you even now.',
        tashreeh: 'The poet walks through desolate urban lanes looking for lost love and warmth in an uncaring metropolis.',
        vocab: [
          { word: 'بے چراغ', roman: 'Be-charaagh', meaning: 'Unlit, extinguished, lampless' }
        ]
      }
    ]
  }
];

export interface FeaturedSher {
  id: string;
  misra1: string;
  misra2: string;
  poet: string;
  poetId: string;
  theme: string;
  translation: string;
  tashreeh: string;
}

export const FAMOUS_ASHAAR: FeaturedSher[] = [
  {
    id: 's-1',
    misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
    misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    poet: 'مرزا اسد اللہ خاں غالب',
    poetId: 'ghalib',
    theme: 'فلسفہ و تمنا',
    translation: 'Thousands of desires, each so overpowering that every desire would take one’s breath away; countless longings were fulfilled, yet so few they still seem.',
    tashreeh: 'The infinite nature of human desire compared to finite earthly fulfillment.'
  },
  {
    id: 's-2',
    misra1: 'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے',
    misra2: 'خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے',
    poet: 'علامہ محمد اقبال',
    poetId: 'iqbal',
    theme: 'خودی و عزم',
    translation: 'Elevate your Selfhood so high that before every decree of destiny, God Himself inquires: What is your sovereign desire?',
    tashreeh: 'The supreme expression of human spiritual agency and destiny-shaping selfhood.'
  },
  {
    id: 's-3',
    misra1: 'بول کہ لب آزاد ہیں تیرے',
    misra2: 'بول زباں اب تک تیری ہے',
    poet: 'فیض احمد فیض',
    poetId: 'faiz',
    theme: 'مزاحمت و حق گوئی',
    translation: 'Speak! For your lips are unchained; speak, for your voice is still your own.',
    tashreeh: 'The rallying cry of free speech, intellectual courage, and defiance against tyranny.'
  },
  {
    id: 's-4',
    misra1: 'شام ہی سے بجھا سا رہتا ہے',
    misra2: 'دل ہے گویا چراغِ مفلس ہے',
    poet: 'میر تقی میر',
    poetId: 'mir',
    theme: 'اداسی و سادگی',
    translation: 'From the fall of dusk it remains extinguished and dim; this heart is like the flickering lamp in an impoverished hovel.',
    tashreeh: 'Heartbreak rendered with pure, heartbreaking simplicity through domestic imagery.'
  },
  {
    id: 's-5',
    misra1: 'عجیب ہے کہ وہ پاس ہو تو خوشی نہیں ہوتی',
    misra2: 'اور دور چلا جائے تو جیا نہیں جاتا',
    poet: 'جون ایلیا',
    poetId: 'jaun',
    theme: 'تضاد و کرب',
    translation: 'How strange that when they are near, no joy fills the heart; and when they drift away, living becomes unbearable.',
    tashreeh: 'The paradox of modern attachment: discomfort in closeness, devastation in distance.'
  },
  {
    id: 's-6',
    misra1: 'کو بہ کو پھیل گئی بات شناسائی کی',
    misra2: 'اس نے خوشبو کی طرح میری پذیرائی کی',
    poet: 'پروین شاکر',
    poetId: 'parveen',
    theme: 'خوشبو و پذیرائی',
    translation: 'From street to street, rumors of our acquaintance spread wide; for he welcomed me like fragrance spreading in the air.',
    tashreeh: 'Delicate feminine lyricism celebrating tenderness that cannot be concealed.'
  },
  {
    id: 's-7',
    misra1: 'تم مرے پاس ہوتے ہو گویا',
    misra2: 'جب کوئی دوسرا نہیں ہوتا',
    poet: 'مومن خاں مومن',
    poetId: 'momin',
    theme: 'قربت و خیال',
    translation: 'You seem to be right beside me in intimate presence, whenever no one else is around.',
    tashreeh: 'One of the most praised couplets in Urdu literary history; Ghalib famously said he would trade his entire Diwan for this single verse.'
  },
  {
    id: 's-8',
    misra1: 'رگوں میں دوڑتے پھرنے کے ہم نہیں قائل',
    misra2: 'جب آنکھ ہی سے نہ ٹپکا تو پھر لہو کیا ہے',
    poet: 'مرزا اسد اللہ خاں غالب',
    poetId: 'ghalib',
    theme: 'سوز و بیاں',
    translation: 'We do not believe in blood merely coursing through hidden veins; if it does not brim and fall from the weeping eye, what kind of blood is it?',
    tashreeh: 'True emotional anguish demands outward manifestation and uninhibited expression.'
  },
  {
    id: 's-9',
    misra1: 'نہیں تیرا نشیمن قصرِ سلطانی کے گنبد پر',
    misra2: 'تو شاہیں ہے بسیرا کر پہاڑوں کی چٹانوں میں',
    poet: 'علامہ محمد اقبال',
    poetId: 'iqbal',
    theme: 'غیرت و پرواز',
    translation: 'Your royal nest does not belong upon the gilded domes of emperor palaces; you are the sovereign falcon—make your dwelling amidst rugged mountain cliffs!',
    tashreeh: 'Iqbal inspires the youth to reject subservience and easy luxury, seeking high moral heights.'
  },
  {
    id: 's-10',
    misra1: 'دل میں اک لہر سی اٹھی ہے ابھی',
    misra2: 'کوئی تازہ ہوا چلی ہے ابھی',
    poet: 'ناصر کاظمی',
    poetId: 'nasir',
    theme: 'اداسی و سحر',
    translation: 'A gentle wave has just surged within the chambers of the heart; a crisp fresh breeze has just stirred through the twilight air.',
    tashreeh: 'Captures the delicate nostalgia and sudden emotional awakening of late evening solitary contemplation.'
  },
  {
    id: 's-11',
    misra1: 'عمرِ دراز مانگ کے لائے تھے چار دن',
    misra2: 'دو آرزو میں کٹ گئے دو انتظار میں',
    poet: 'بہادر شاہ ظفر',
    poetId: 'zafar',
    theme: 'حیات و بے ثباتی',
    translation: 'We begged for a long lifespan and were granted merely four brief days: two were spent in futile yearning, and two in weary waiting.',
    tashreeh: 'The ultimate tragic reflection on the ephemeral nature of earthly life.'
  },
  {
    id: 's-12',
    misra1: 'رنجش ہی سہی دل ہی دکھانے کے لیے آ',
    misra2: 'آ پھر سے مجھے چھوڑ کے جانے کے لیے آ',
    poet: 'احمد فراز',
    poetId: 'faraz',
    theme: 'التجا و رومان',
    translation: 'Even if it be in resentment, even if only to wound my heart again, come! Come once more, if only to abandon me all over again.',
    tashreeh: 'The peak of romantic yearning where even heartbreak in the presence of the beloved is sweeter than solitude.'
  }
];
