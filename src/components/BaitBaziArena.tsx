import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Swords, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Mic, 
  MicOff, 
  Radio, 
  Wand2, 
  Globe, 
  VolumeX,
  Play,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ambienceEngine } from '../utils/audioAmbience';

interface BaitVerse {
  misra1: string;
  misra2: string;
  poet: string;
  startHarf: string;
  endHarf: string;
}

const BAIT_BAZI_VAULT: BaitVerse[] = [
  // الف (Alif / Alif Madda)
  {
    misra1: 'ابھی نہ چھیڑ محبت کے گیت اے مطرب',
    misra2: 'ابھی حیات کا ماحول سازگار نہیں',
    poet: 'ساحر لدھیانوی',
    startHarf: 'ا',
    endHarf: 'ں'
  },
  {
    misra1: 'اک عمر سے ہوں لذتِ گریہ سے بھی محروم',
    misra2: 'اے راحتِ جاں مجھ کو رلانے کے لیے آ',
    poet: 'احمد فراز',
    startHarf: 'ا',
    endHarf: 'ا'
  },
  {
    misra1: 'آہ کو چاہیے اک عمر اثر ہونے تک',
    misra2: 'کون جیتا ہے تری زلف کے سر ہونے تک',
    poet: 'مرزا غالب',
    startHarf: 'آ',
    endHarf: 'ک'
  },
  // ب (Bay)
  {
    misra1: 'بول کہ لب آزاد ہیں تیرے',
    misra2: 'بول زباں اب تک تیری ہے',
    poet: 'فیض احمد فیض',
    startHarf: 'ب',
    endHarf: 'ے'
  },
  {
    misra1: 'بہت نزدیک آتی جا رہی ہو',
    misra2: 'بچھڑنے کی علامت ہے؟ نہیں ہے',
    poet: 'جون ایلیا',
    startHarf: 'ب',
    endHarf: 'ے'
  },
  // پ (Pay)
  {
    misra1: 'پہلے بھی تو جیتے تھے مگر یوں نہ کبھی تھا',
    misra2: 'جیسے یہ تری یاد سے آباد ہے اب دل',
    poet: 'پروین شاکر',
    startHarf: 'پ',
    endHarf: 'ل'
  },
  // ت (Tay)
  {
    misra1: 'تو شاہیں ہے پرواز ہے کام تیرا',
    misra2: 'تیرے سامنے آسماں اور بھی ہیں',
    poet: 'علامہ اقبال',
    startHarf: 'ت',
    endHarf: 'ں'
  },
  {
    misra1: 'تیرے وعدے پر جیے ہم تو یہ جان جھوٹ جانا',
    misra2: 'کہ خوشی سے مر نہ جاتے اگر اعتبار ہوتا',
    poet: 'مرزا غالب',
    startHarf: 'ت',
    endHarf: 'ا'
  },
  // چ (Chay)
  {
    misra1: 'چراغِ طور جلاؤ بڑا اندھیرا ہے',
    misra2: 'نوائے سوختہ ساماں سنو تو کیا ہے',
    poet: 'ناصر کاظمی',
    startHarf: 'چ',
    endHarf: 'ے'
  },
  // ج (Jeem)
  {
    misra1: 'جب ظلم و ستم کے کوہِ گراں',
    misra2: 'روئی کی طرح اڑ جائیں گے',
    poet: 'فیض احمد فیض',
    startHarf: 'ج',
    endHarf: 'ے'
  },
  {
    misra1: 'جہاں میں دانش و بینش کی ہے کمی ورنہ',
    misra2: 'ہر اک نگاہ میں روشن کوئی سویرا ہے',
    poet: 'علامہ اقبال',
    startHarf: 'ج',
    endHarf: 'ا'
  },
  // خ (Khay)
  {
    misra1: 'خوب روؤں سے بچھڑنا ہے قیامت لیکن',
    misra2: 'اب وہ بات کہاں جو ترے رخسار میں تھی',
    poet: 'میر تقی میر',
    startHarf: 'خ',
    endHarf: 'ی'
  },
  // د (Daal)
  {
    misra1: 'دلِ ناداں تجھے ہوا کیا ہے',
    misra2: 'آخر اس درد کی دوا کیا ہے',
    poet: 'مرزا غالب',
    startHarf: 'د',
    endHarf: 'ے'
  },
  {
    misra1: 'دو گز سہی مگر یہ مری ملکیت تو ہے',
    misra2: 'اے موت تو نے مجھ کو زمیندار کر دیا',
    poet: 'قتیل شفائی',
    startHarf: 'د',
    endHarf: 'ا'
  },
  // ر (Ray)
  {
    misra1: 'رنجش ہی سہی دل ہی دکھانے کے لیے آ',
    misra2: 'آ پھر سے مجھے چھوڑ کے جانے کے لیے آ',
    poet: 'احمد فراز',
    startHarf: 'ر',
    endHarf: 'ا'
  },
  {
    misra1: 'رات پھیلی ہے تیرے سرمئی آنچل کی طرح',
    misra2: 'چاند نکلا ہے تجھے ڈھونڈنے پاگل کی طرح',
    poet: 'محسن نقوی',
    startHarf: 'ر',
    endHarf: 'ہ'
  },
  // س (Seen)
  {
    misra1: 'ستاروں سے آگے جہاں اور بھی ہیں',
    misra2: 'ابھی عشق کے امتحان اور بھی ہیں',
    poet: 'علامہ اقبال',
    startHarf: 'س',
    endHarf: 'ں'
  },
  // ش (Sheen)
  {
    misra1: 'شام ہی سے بجھا سا رہتا ہے',
    misra2: 'دل ہے گویا چراغِ مفلس ہے',
    poet: 'میر تقی میر',
    startHarf: 'ش',
    endHarf: 'ے'
  },
  {
    misra1: 'شاید مجھے کسی سے محبت نہیں ہوئی',
    misra2: 'لیکن یقین سب کو دلاتا رہا ہوں میں',
    poet: 'جون ایلیا',
    startHarf: 'ش',
    endHarf: 'ں'
  },
  // ع (Ayn)
  {
    misra1: 'عمر بھر کا ساتھ تھا شاید کسی کے خواب میں',
    misra2: 'ہم بچھڑ کر بھی رہے ہیں ایک مدت ساتھ ساتھ',
    poet: 'احمد فراز',
    startHarf: 'ع',
    endHarf: 'ت'
  },
  // غ (Ghayn)
  {
    misra1: 'غیر لیں محفل میں بوسے جام کے',
    misra2: 'ہم رہیں یوں تشنۂ لب نام کے',
    poet: 'مرزا غالب',
    startHarf: 'غ',
    endHarf: 'ے'
  },
  // ف (Fay)
  {
    misra1: 'فیضؔ کیا جانے وہ کس کس کا ہے دلدار مگر',
    misra2: 'ہم نے دیکھا ہے کہ دنیا اسے اپنا سمجھی',
    poet: 'فیض احمد فیض',
    startHarf: 'ف',
    endHarf: 'ی'
  },
  // ق (Qaaf)
  {
    misra1: 'قفس اداس ہے یارو صبا سے کچھ تو کہو',
    misra2: 'کہیں تو بہرِ خدا آج ذکرِ یار چلے',
    poet: 'فیض احمد فیض',
    startHarf: 'ق',
    endHarf: 'ے'
  },
  // ک (Kaaf)
  {
    misra1: 'کتنا ہے بد نصیب ظفرؔ دفن کے لیے',
    misra2: 'دو گز زمیں بھی نہ ملی کوئے یار میں',
    poet: 'بہادر شاہ ظفر',
    startHarf: 'ک',
    endHarf: 'ں'
  },
  {
    misra1: 'کو بہ کو پھیل گئی بات شناسائی کی',
    misra2: 'اس نے خوشبو کی طرح میری پذیرائی کی',
    poet: 'پروین شاکر',
    startHarf: 'ک',
    endHarf: 'ی'
  },
  // گ (Gaaf)
  {
    misra1: 'گلوں میں رنگ بھرے بادِ نوبہار چلے',
    misra2: 'چلے بھی آؤ کہ گلشن کا کاروبار چلے',
    poet: 'فیض احمد فیض',
    startHarf: 'گ',
    endHarf: 'ے'
  },
  // ل (Laam)
  {
    misra1: 'لازم تھا کہ دیکھو مرے بعد اور کبوتر',
    misra2: 'خط لے کے اڑے ہیں تو ترے بام پہ اتریں',
    poet: 'مرزا غالب',
    startHarf: 'ل',
    endHarf: 'ں'
  },
  // م (Meem)
  {
    misra1: 'میں بھی منہ میں زبان رکھتا ہوں',
    misra2: 'کاش پوچھو کہ مدعا کیا ہے',
    poet: 'مرزا غالب',
    startHarf: 'م',
    endHarf: 'ے'
  },
  {
    misra1: 'میرؔ دوانے نے کر ڈالی آخر کو بربادی اپنی',
    misra2: 'عشق میں سودا کر کے ہم نے خوب کیا خسارہ کیا',
    poet: 'میر تقی میر',
    startHarf: 'م',
    endHarf: 'ا'
  },
  // ن (Noon)
  {
    misra1: 'نازکی اس کے لب کی کیا کہئے',
    misra2: 'پنکھڑی اک گلاب کی سی ہے',
    poet: 'میر تقی میر',
    startHarf: 'ن',
    endHarf: 'ے'
  },
  {
    misra1: 'نہ تم سمجھے نہ ہم سمجھے زمانہ بیت جاتا ہے',
    misra2: 'کہیں اک خواب کی تعبیر میں آنسو نکلتے ہیں',
    poet: 'ناصر کاظمی',
    startHarf: 'ن',
    endHarf: 'ں'
  },
  // و (Wao)
  {
    misra1: 'وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا',
    misra2: 'مسئلہ پھول کا ہے پھول کدھر جائے گا',
    poet: 'پروین شاکر',
    startHarf: 'و',
    endHarf: 'ا'
  },
  // ہ (Hay)
  {
    misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
    misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    poet: 'مرزا غالب',
    startHarf: 'ہ',
    endHarf: 'ے'
  },
  {
    misra1: 'ہم ہیں مشتاق اور وہ بیزار',
    misra2: 'یا الٰہی یہ ماجرا کیا ہے',
    poet: 'مرزا غالب',
    startHarf: 'ہ',
    endHarf: 'ے'
  },
  // ی / ے (Choti Yay / Badi Yay)
  {
    misra1: 'یہ غم کیا دل کی عادت ہے؟ نہیں ہے',
    misra2: 'کسی سے کچھ شکایت ہے؟ نہیں ہے',
    poet: 'جون ایلیا',
    startHarf: 'ی',
    endHarf: 'ے'
  },
  {
    misra1: 'یوں نہ تھی مجھ سے گفتگو پہلے',
    misra2: 'بے رخی کی ہے آرزو پہلے',
    poet: 'علامہ اقبال',
    startHarf: 'ی',
    endHarf: 'ے'
  }
];

interface BaitTurn {
  speaker: 'user' | 'opponent';
  misra1: string;
  misra2: string;
  poet: string;
  endHarf: string;
  wasRecitedAloud?: boolean;
}

export const BaitBaziArena: React.FC<{ fontPreference: string }> = ({ fontPreference }) => {
  const [history, setHistory] = useState<BaitTurn[]>([
    {
      speaker: 'opponent',
      misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
      misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
      poet: 'مرزا غالب',
      endHarf: 'ے'
    }
  ]);

  const [currentRequiredHarf, setCurrentRequiredHarf] = useState<string>('ے');
  const [customMisra1, setCustomMisra1] = useState('');
  const [customMisra2, setCustomMisra2] = useState('');
  const [customPoet, setCustomPoet] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [score, setScore] = useState(0);

  // Voice-to-text recitation state
  const [activeInputMode, setActiveInputMode] = useState<'voice' | 'text'>('voice');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [listeningTarget, setListeningTarget] = useState<'couplet' | 'misra1' | 'misra2'>('couplet');
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [speechLanguage, setSpeechLanguage] = useState<string>('ur-PK');
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(true);
  const [voiceVolumeLevel, setVoiceVolumeLevel] = useState<number>(0);
  const [audioMeterBars, setAudioMeterBars] = useState<number[]>([20, 45, 75, 30, 60, 85, 40]);

  // Ref to store speech recognition instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  const fontClass = 
    fontPreference === 'nastaliq' ? 'font-nastaliq' :
    fontPreference === 'gulzar' ? 'font-gulzar' : 'font-amiri';

  // Check speech recognition capability on mount
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechClass) {
      setIsSpeechSupported(false);
    }
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Animate audio waveform bars when listening
  useEffect(() => {
    let interval: number;
    if (isListening) {
      interval = window.setInterval(() => {
        setAudioMeterBars([
          Math.floor(Math.random() * 65) + 20,
          Math.floor(Math.random() * 85) + 15,
          Math.floor(Math.random() * 95) + 30,
          Math.floor(Math.random() * 90) + 25,
          Math.floor(Math.random() * 100) + 35,
          Math.floor(Math.random() * 80) + 20,
          Math.floor(Math.random() * 60) + 15
        ]);
        setVoiceVolumeLevel(Math.floor(Math.random() * 40) + 60);
      }, 120);
    } else {
      setAudioMeterBars([15, 20, 25, 20, 30, 20, 15]);
      setVoiceVolumeLevel(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  // Clean strings and determine end/start letters
  const getEndingHarf = (text: string): string => {
    const cleaned = text.trim().replace(/[.,!؟،۔'":;()]/g, '');
    const lastChar = cleaned.slice(-1);
    return lastChar || 'ا';
  };

  const getStartingHarf = (text: string): string => {
    const cleaned = text.trim().replace(/[.,!؟،۔'":;()]/g, '');
    return cleaned.slice(0, 1) || 'ا';
  };

  // Check if letter matches required active target
  const checkLetterMatch = (letter: string, target: string): boolean => {
    if (!letter || !target) return false;
    if (letter === target) return true;
    // Flexible handling for Arabic/Urdu variations
    if ((target === 'ے' || target === 'ی' || target === 'ئ') && (letter === 'ی' || letter === 'ے' || letter === 'ئ')) {
      return true;
    }
    if ((target === 'ا' || target === 'آ') && (letter === 'ا' || letter === 'آ')) {
      return true;
    }
    if ((target === 'ہ' || target === 'ھ' || target === 'ۂ') && (letter === 'ہ' || letter === 'ھ' || letter === 'ۂ')) {
      return true;
    }
    return false;
  };

  // Smart couplet splitter: separates a spoken couplet into Misra 1 and Misra 2
  const splitCoupletText = (fullText: string): { misra1: string; misra2: string } => {
    const cleaned = fullText.trim();
    if (!cleaned) return { misra1: '', misra2: '' };

    // 1. If contains newline
    if (cleaned.includes('\n')) {
      const parts = cleaned.split('\n').filter(p => p.trim().length > 0);
      return { misra1: parts[0] || '', misra2: parts.slice(1).join(' ') || '' };
    }

    // 2. If contains commas or Urdu punctuation like '،' or '۔'
    if (cleaned.includes('،') || cleaned.includes(',') || cleaned.includes('۔')) {
      const parts = cleaned.split(/[،,۔]+/).filter(p => p.trim().length > 0);
      if (parts.length >= 2) {
        return { misra1: parts[0].trim(), misra2: parts.slice(1).join(' ').trim() };
      }
    }

    // 3. If contains conjunctions like ' اور ' or ' لیکن ' or ' کہ '
    const words = cleaned.split(/\s+/);
    if (words.length >= 6) {
      const midpoint = Math.floor(words.length / 2);
      return {
        misra1: words.slice(0, midpoint).join(' '),
        misra2: words.slice(midpoint).join(' ')
      };
    }

    return { misra1: cleaned, misra2: '' };
  };

  // Stop active speech recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    ambienceEngine.playMicCue(false);
  }, []);

  // Start speech recognition
  const startListening = useCallback((target: 'couplet' | 'misra1' | 'misra2' = 'couplet') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechClass) {
      setIsSpeechSupported(false);
      setFeedback({
        message: 'آپ کے براؤزر میں براہ راست مائیک کی آواز کی شناخت دستیاب نہیں ہے۔ آپ نمونہ شعر آزما سکتے ہیں یا تحریری طور پر درج کریں۔',
        type: 'error'
      });
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    try {
      const recognition = new SpeechClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;

      setListeningTarget(target);
      setIsListening(true);
      setSpeechTranscript('');
      setInterimTranscript('');
      ambienceEngine.playMicCue(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let finalTx = '';
        let interimTx = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTx += item[0].transcript;
          } else {
            interimTx += item[0].transcript;
          }
        }

        const currentTotal = (finalTx || interimTx).trim();
        setSpeechTranscript(finalTx.trim() || interimTx.trim());
        setInterimTranscript(interimTx.trim());

        // Update corresponding fields
        if (target === 'misra1') {
          if (currentTotal) setCustomMisra1(currentTotal);
        } else if (target === 'misra2') {
          if (currentTotal) setCustomMisra2(currentTotal);
        } else {
          // Full couplet mode
          if (currentTotal) {
            const parsed = splitCoupletText(currentTotal);
            setCustomMisra1(parsed.misra1);
            if (parsed.misra2) {
              setCustomMisra2(parsed.misra2);
            }
          }
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setFeedback({
            message: 'مائیکروفون کی اجازت درکار ہے۔ براہ کرم براؤزر سیٹنگز میں مائیک کی اجازت دیں۔',
            type: 'error'
          });
        } else if (event.error !== 'no-speech') {
          setFeedback({
            message: `صوتی اندراج میں مسئلہ پیش آیا (${event.error})۔ دوبارہ کوشش کریں۔`,
            type: 'error'
          });
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setFeedback({
        message: 'مائیکروفون فعال نہ ہو سکا۔ اجازت چیک کریں۔',
        type: 'error'
      });
    }
  }, [isListening, speechLanguage, stopListening]);

  // Demo recital simulator for testing without microphone or on unsupported devices
  const handleSimulateRecital = (sample?: BaitVerse) => {
    const candidate = sample || availableBankVerses[0] || {
      misra1: 'یہ غم کیا دل کی عادت ہے؟ نہیں ہے',
      misra2: 'کسی سے کچھ شکایت ہے؟ نہیں ہے',
      poet: 'جون ایلیا',
      startHarf: 'ی',
      endHarf: 'ے'
    };

    setSpeechTranscript(`${candidate.misra1} ... ${candidate.misra2}`);
    setCustomMisra1(candidate.misra1);
    setCustomMisra2(candidate.misra2);
    setCustomPoet(candidate.poet);

    // Audio cue
    ambienceEngine.playMicCue(true);
    setFeedback({
      message: `آواز کی تلاوت کامیابی سے سمولیشن ہوئی۔ کلام: "${candidate.misra1}"`,
      type: 'success'
    });
  };

  // Find bank suggestions for the current required letter
  const availableBankVerses = BAIT_BAZI_VAULT.filter(v => {
    return checkLetterMatch(v.startHarf, currentRequiredHarf);
  });

  const handleUserPlayVerse = (verse: BaitVerse, wasRecited: boolean = false) => {
    ambienceEngine.playDaadChime();
    const userTurn: BaitTurn = {
      speaker: 'user',
      misra1: verse.misra1,
      misra2: verse.misra2,
      poet: verse.poet,
      endHarf: verse.endHarf,
      wasRecitedAloud: wasRecited
    };

    const nextEndHarf = verse.endHarf;
    setScore(prev => prev + (wasRecited ? 15 : 10)); // Extra bonus for reciting aloud!
    setHistory(prev => [...prev, userTurn]);
    setFeedback({
      message: wasRecited 
        ? `داد قبول ہو! آپ نے بآوازِ بلند شعر سنایا (+15 پوائنٹس)۔ حریف کا اگلا حرف "${nextEndHarf}" ہے...`
        : `بہترین! شعر قبول ہوا۔ اگلا حرف "${nextEndHarf}" بنتا ہے۔ حریف کی باری ہے...`,
      type: 'success'
    });

    // Opponent response after small thinking delay
    setTimeout(() => {
      const oppOptions = BAIT_BAZI_VAULT.filter(v => checkLetterMatch(v.startHarf, nextEndHarf));

      const selectedOpp = oppOptions.length > 0 
        ? oppOptions[Math.floor(Math.random() * oppOptions.length)]
        : BAIT_BAZI_VAULT[Math.floor(Math.random() * BAIT_BAZI_VAULT.length)];

      const oppTurn: BaitTurn = {
        speaker: 'opponent',
        misra1: selectedOpp.misra1,
        misra2: selectedOpp.misra2,
        poet: selectedOpp.poet,
        endHarf: selectedOpp.endHarf
      };

      setHistory(prev => [...prev, oppTurn]);
      setCurrentRequiredHarf(selectedOpp.endHarf);
      setFeedback({
        message: `حریف نے شعر پیش کیا۔ اب آپ کی باری ہے: اگلا شعر حرف "${selectedOpp.endHarf}" سے شروع ہونا چاہیے!`,
        type: 'info'
      });
    }, 1200);
  };

  const handleSubmitCustom = (e?: React.FormEvent, isVoiceSubmission: boolean = false) => {
    if (e) e.preventDefault();

    if (!customMisra1.trim() || !customMisra2.trim()) {
      setFeedback({ message: 'براہ کرم دونوں مصرعے درج کریں یا مائیک کے ذریعے تلاوت کریں', type: 'error' });
      return;
    }

    const startHarf = getStartingHarf(customMisra1);
    const endHarf = getEndingHarf(customMisra2);

    const matchesLetter = checkLetterMatch(startHarf, currentRequiredHarf);

    if (!matchesLetter) {
      setFeedback({
        message: `مصرعِ اوّل حرف "${currentRequiredHarf}" سے شروع ہونا چاہیے، جبکہ آپ کا شعر "${startHarf}" سے شروع ہو رہا ہے!`,
        type: 'error'
      });
      return;
    }

    const customVerse: BaitVerse = {
      misra1: customMisra1,
      misra2: customMisra2,
      poet: customPoet.trim() || 'نامعلوم شاعر',
      startHarf,
      endHarf
    };

    setCustomMisra1('');
    setCustomMisra2('');
    setCustomPoet('');
    setSpeechTranscript('');
    setInterimTranscript('');
    if (isListening) stopListening();

    handleUserPlayVerse(customVerse, isVoiceSubmission);
  };

  const handleResetGame = () => {
    if (isListening) stopListening();
    setHistory([
      {
        speaker: 'opponent',
        misra1: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
        misra2: 'بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
        poet: 'مرزا غالب',
        endHarf: 'ے'
      }
    ]);
    setCurrentRequiredHarf('ے');
    setScore(0);
    setCustomMisra1('');
    setCustomMisra2('');
    setSpeechTranscript('');
    setFeedback({ message: 'کھیل دوبارہ شروع ہوا۔ حرف "ے" سے شعر پیش کریں۔', type: 'info' });
  };

  const detectedStartHarf = customMisra1 ? getStartingHarf(customMisra1) : '';
  const detectedEndHarf = customMisra2 ? getEndingHarf(customMisra2) : '';
  const isStartLetterValid = detectedStartHarf ? checkLetterMatch(detectedStartHarf, currentRequiredHarf) : false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-medium mb-1">
            <Swords className="w-4 h-4" />
            <span>ادبی معرکہ و شعری مقابلہ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-100 font-normal">
            بیت بازی کا میدان — The Poetic Duel
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            The centuries-old poetic game of South Asia. The next sher must begin with the final letter of the previous verse!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-stone-500 uppercase block font-mono">اسکور (SCORE)</span>
            <span className="text-xl font-bold text-amber-400">{score}</span>
          </div>
          <button
            onClick={handleResetGame}
            className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-700 transition-colors"
            title="Reset Duel"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Letter Notification Ribbon */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/60 border-2 border-amber-600/50 flex flex-col sm:flex-row items-center justify-between gap-4 gold-glow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-600/30 border border-amber-400/50 flex items-center justify-center text-4xl font-bold text-amber-300 font-nastaliq shadow-inner">
            {currentRequiredHarf}
          </div>
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">مطلوبہ حرف (Active Target Letter)</span>
            <h3 className="font-nastaliq text-2xl text-stone-100">
              شعر حرف <span className="text-amber-300 font-bold">"{currentRequiredHarf}"</span> سے شروع کریں!
            </h3>
            <p className="text-xs text-stone-400">
              Recite aloud using voice-to-text, select from the vault, or type your own couplet.
            </p>
          </div>
        </div>

        {feedback && (
          <div className={`px-4 py-2.5 rounded-xl text-xs max-w-sm flex items-center gap-2 ${
            feedback.type === 'success' ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200' :
            feedback.type === 'error' ? 'bg-rose-950/80 border border-rose-700 text-rose-200' :
            'bg-amber-950/80 border border-amber-700 text-amber-200'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Main Duel Interface */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Duel Recital History Thread (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800 rounded-2xl p-6 flex flex-col h-[640px]">
          <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-4 pb-2 border-b border-stone-800 flex items-center justify-between">
            <span>رودادِ مشاعرہ (Duel History)</span>
            <span className="text-stone-500 font-mono">{history.length} اشعار</span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {history.map((turn, tIdx) => {
              const isUser = turn.speaker === 'user';
              return (
                <div
                  key={tIdx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUser
                      ? 'bg-amber-950/40 border-amber-700/60 ml-6 text-right'
                      : 'bg-stone-950/80 border-stone-800 mr-6 text-left'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-semibold ${isUser ? 'text-amber-400' : 'text-stone-300'}`}>
                        {isUser ? 'آپ (You)' : 'حریف / ادیبِ معزز (Literary Companion)'}
                      </span>
                      {turn.wasRecitedAloud && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-sans flex items-center gap-0.5">
                          <Mic className="w-2.5 h-2.5" />
                          <span>صوتی تلاوت (+15)</span>
                        </span>
                      )}
                    </div>
                    <span className="font-nastaliq text-amber-300/80">کلام: {turn.poet}</span>
                  </div>

                  <p dir="rtl" className={`${fontClass} text-lg sm:text-xl text-stone-100 leading-loose text-center`}>
                    {turn.misra1}
                  </p>
                  <p dir="rtl" className={`${fontClass} text-lg sm:text-xl text-amber-300 leading-loose text-center`}>
                    {turn.misra2}
                  </p>

                  <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                    <span>اختتام: حرف "{turn.endHarf}"</span>
                    <button
                      onClick={() => ambienceEngine.reciteText(`${turn.misra1} ... ${turn.misra2}`, 'ur')}
                      className="text-stone-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>سنیں</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input, Voice Studio & Suggestions Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-stone-900 border border-stone-800 p-1 rounded-xl">
            <button
              onClick={() => {
                setActiveInputMode('voice');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeInputMode === 'voice'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>صوتی تلاوت (Recite Aloud)</span>
            </button>
            <button
              onClick={() => {
                setActiveInputMode('text');
                if (isListening) stopListening();
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeInputMode === 'text'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>تحریری اندراج (Type Couplet)</span>
            </button>
          </div>

          {/* Dedicated Voice Recital Studio */}
          {activeInputMode === 'voice' && (
            <div className="bg-gradient-to-b from-stone-900/95 to-stone-950/95 border-2 border-amber-600/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              
              {/* Decorative background glow when listening */}
              {isListening && (
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse pointer-events-none" />
              )}

              {/* Recital Studio Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isListening ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    <Radio className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                      صوتی مشاعرہ • Live Recital Studio
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      Recite your verse into the microphone
                    </span>
                  </div>
                </div>

                {/* Language / Dialect selector */}
                <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg px-2 py-1 text-[11px] text-stone-300">
                  <Globe className="w-3 h-3 text-amber-400" />
                  <select
                    value={speechLanguage}
                    onChange={(e) => setSpeechLanguage(e.target.value)}
                    className="bg-transparent text-[11px] text-stone-300 focus:outline-none cursor-pointer"
                    title="Speech Recognition Language"
                  >
                    <option value="ur-PK" className="bg-stone-900 text-stone-100">اردو (پاکستان)</option>
                    <option value="ur-IN" className="bg-stone-900 text-stone-100">اردو (بھارت)</option>
                    <option value="hi-IN" className="bg-stone-900 text-stone-100">ہندی / تلفظ</option>
                    <option value="en-US" className="bg-stone-900 text-stone-100">Roman / English</option>
                  </select>
                </div>
              </div>

              {/* Active Required Letter Badge Reminder */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-between text-xs">
                <span className="text-stone-300">
                  شروع کرنے کا حرف:
                </span>
                <span className="font-nastaliq text-lg font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-900/50 border border-amber-600/50">
                  {currentRequiredHarf}
                </span>
              </div>

              {/* Main Recitation Mic Centerpiece */}
              <div className="my-5 flex flex-col items-center justify-center">
                
                {/* Visualizer Waveform Bars */}
                <div className="h-10 flex items-center justify-center gap-1 mb-3">
                  {audioMeterBars.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${isListening ? h : 12}%` }}
                      className={`w-1.5 rounded-full transition-all duration-100 ${
                        isListening 
                          ? 'bg-gradient-to-t from-amber-500 to-rose-400' 
                          : 'bg-stone-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Big Glowing Microphone Button */}
                <button
                  type="button"
                  onClick={() => startListening('couplet')}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 ${
                    isListening
                      ? 'bg-gradient-to-tr from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-600/50 ring-4 ring-rose-500/30 animate-pulse'
                      : 'bg-gradient-to-tr from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-lg shadow-amber-600/30'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start reciting aloud'}
                >
                  {isListening ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                  {isListening && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
                    </span>
                  )}
                </button>

                {/* Status text */}
                <p className="mt-3 text-xs font-medium text-center">
                  {isListening ? (
                    <span className="text-amber-300 font-nastaliq text-base flex items-center justify-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      سن رہے ہیں... اطمینان سے شعر تلاوت کیجیے
                    </span>
                  ) : (
                    <span className="text-stone-400">
                      مائیکروفون پر کلک کریں اور شعر بلند آواز سے پڑھیں
                    </span>
                  )}
                </p>

                {/* Interim speech transcript display */}
                {interimTranscript && (
                  <p dir="rtl" className="mt-2 text-xs text-amber-200 font-nastaliq italic animate-pulse">
                    "{interimTranscript}..."
                  </p>
                )}
              </div>

              {/* Transcribed Verse Review & Auto-Split Preview */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-semibold text-stone-300">شناخت شدہ کلام (Transcribed Verse):</span>
                  {detectedStartHarf && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 ${
                      isStartLetterValid
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                        : 'bg-rose-950 text-rose-300 border border-rose-700/60'
                    }`}>
                      {isStartLetterValid ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>شعر حرف "{detectedStartHarf}" سے درست ہے</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3" />
                          <span>شعر "{detectedStartHarf}" سے ہے، "{currentRequiredHarf}" درکار ہے</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Misra 1 Editable Box */}
                <div className="relative">
                  <input
                    type="text"
                    dir="rtl"
                    value={customMisra1}
                    onChange={(e) => setCustomMisra1(e.target.value)}
                    placeholder={`پہلا مصرع (حرف "${currentRequiredHarf}" سے)`}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 rounded-lg px-3 py-1.5 text-sm text-stone-100 font-nastaliq text-right focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => startListening('misra1')}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors ${
                      isListening && listeningTarget === 'misra1' ? 'text-rose-400 animate-pulse' : ''
                    }`}
                    title="Speak only Misra 1"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Misra 2 Editable Box */}
                <div className="relative">
                  <input
                    type="text"
                    dir="rtl"
                    value={customMisra2}
                    onChange={(e) => setCustomMisra2(e.target.value)}
                    placeholder="دوسرا مصرع (مصرعِ ثانی)"
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 rounded-lg px-3 py-1.5 text-sm text-amber-200 font-nastaliq text-right focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => startListening('misra2')}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors ${
                      isListening && listeningTarget === 'misra2' ? 'text-rose-400 animate-pulse' : ''
                    }`}
                    title="Speak only Misra 2"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Poet Name Input */}
                <div>
                  <input
                    type="text"
                    dir="rtl"
                    value={customPoet}
                    onChange={(e) => setCustomPoet(e.target.value)}
                    placeholder="شاعر کا نام (اختیاری)"
                    className="w-full bg-stone-900/60 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-1 text-xs text-stone-400 font-nastaliq text-right focus:outline-none"
                  />
                </div>

                {/* Voice Submit Button */}
                <button
                  type="button"
                  onClick={() => handleSubmitCustom(undefined, true)}
                  disabled={!customMisra1.trim() || !customMisra2.trim()}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    customMisra1.trim() && customMisra2.trim()
                      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 cursor-pointer'
                      : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <Swords className="w-4 h-4" />
                  <span>یہ شعر پیش کریں • Submit Recited Verse (+15 Points)</span>
                </button>
              </div>

              {/* Sample Recitation Testing Chips */}
              <div className="mt-3 pt-3 border-t border-stone-800/80">
                <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5">
                  <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>آواز کی آزمائش (Sample Recitals):</span>
                  </span>
                  <span className="text-[10px] text-stone-500">حرفِ {currentRequiredHarf}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {availableBankVerses.slice(0, 2).map((verse, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSimulateRecital(verse)}
                      className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-700 text-[10px] text-stone-300 hover:text-amber-200 transition-colors flex items-center gap-1 font-nastaliq"
                      title="Test recite this verse"
                    >
                      <Play className="w-2.5 h-2.5 text-amber-400" />
                      <span>{verse.poet}: {verse.misra1.slice(0, 18)}...</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleSimulateRecital()}
                    className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-700 text-[10px] text-stone-300 hover:text-amber-200 transition-colors flex items-center gap-1"
                  >
                    <Wand2 className="w-2.5 h-2.5 text-amber-400" />
                    <span>خودکار صوتی نمونہ</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Traditional Manual Text Entry Form */}
          {activeInputMode === 'text' && (
            <form onSubmit={(e) => handleSubmitCustom(e, false)} className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-stone-300 font-semibold flex items-center justify-between">
                <span>اپنا یادگار شعر درج کریں (Submit Your Own Sher)</span>
                <span className="text-[10px] text-stone-500 font-mono">حرف: {currentRequiredHarf}</span>
              </h4>

              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                  <button
                    type="button"
                    onClick={() => startListening('misra1')}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px]"
                    title="Dictate Misra 1 with voice"
                  >
                    <Mic className="w-3 h-3" />
                    <span>بولیں (Voice)</span>
                  </button>
                  <label className="text-right font-nastaliq">
                    مصرعِ اوّل (شروع بذریعہ: <strong className="text-amber-400">"{currentRequiredHarf}"</strong>)
                  </label>
                </div>
                <input
                  type="text"
                  dir="rtl"
                  value={customMisra1}
                  onChange={(e) => setCustomMisra1(e.target.value)}
                  placeholder={`حرفِ ${currentRequiredHarf} سے شروع ہونے والا مصرع`}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-1.5 text-base text-amber-100 font-nastaliq focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                  <button
                    type="button"
                    onClick={() => startListening('misra2')}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px]"
                    title="Dictate Misra 2 with voice"
                  >
                    <Mic className="w-3 h-3" />
                    <span>بولیں (Voice)</span>
                  </button>
                  <label className="text-right font-nastaliq">مصرعِ ثانی</label>
                </div>
                <input
                  type="text"
                  dir="rtl"
                  value={customMisra2}
                  onChange={(e) => setCustomMisra2(e.target.value)}
                  placeholder="دوسرا مصرع"
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-1.5 text-base text-amber-200 font-nastaliq focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">شاعر کا نام (اختیاری)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={customPoet}
                  onChange={(e) => setCustomPoet(e.target.value)}
                  placeholder="شاعر کا نام"
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-1 text-xs text-stone-300 font-nastaliq focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>شعر پیش کریں (Submit Couplet)</span>
              </button>
            </form>
          )}

          {/* Quick matching verses from vault */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 flex items-center justify-between">
              <span>حرف "{currentRequiredHarf}" کے منتخب اشعار ({availableBankVerses.length})</span>
              <Sparkles className="w-3.5 h-3.5" />
            </h4>

            {availableBankVerses.length === 0 ? (
              <p className="text-xs text-stone-500 italic p-3 text-center">
                اس حرف کا شعر اپنے حافظے سے بول کر یا لکھ کر اوپر درج کریں!
              </p>
            ) : (
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {availableBankVerses.map((verse, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-700/60 transition-all flex flex-col justify-between"
                  >
                    <div className="text-right">
                      <p dir="rtl" className="font-nastaliq text-sm text-stone-200 leading-loose">
                        {verse.misra1}
                      </p>
                      <p dir="rtl" className="font-nastaliq text-sm text-amber-300 leading-loose">
                        {verse.misra2}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
                      <span>{verse.poet} (ختم: {verse.endHarf})</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCustomMisra1(verse.misra1);
                            setCustomMisra2(verse.misra2);
                            setCustomPoet(verse.poet);
                            setActiveInputMode('voice');
                          }}
                          className="text-stone-400 hover:text-amber-300 flex items-center gap-0.5"
                          title="Load into recital studio"
                        >
                          <Mic className="w-3 h-3" />
                          <span>تلاوت</span>
                        </button>
                        <button
                          onClick={() => handleUserPlayVerse(verse, false)}
                          className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-200 font-medium transition-colors"
                        >
                          یہ شعر پیش کریں ➔
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
