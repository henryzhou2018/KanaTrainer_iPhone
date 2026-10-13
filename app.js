
"use strict";

const $ = id => document.getElementById(id);

const BASIC = [
  ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
  ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
  ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
  ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
  ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
  ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
  ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
  ["や","ya"],["ゆ","yu"],["よ","yo"],["ら","ra"],["り","ri"],
  ["る","ru"],["れ","re"],["ろ","ro"],["わ","wa"],["を","wo"],["ん","n"],
  ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
  ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
  ["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
  ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
  ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
];

const COMBOS = [
  ["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
  ["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
  ["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
  ["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
  ["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],
  ["みゃ","mya"],["みゅ","myu"],["みょ","myo"],
  ["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],
  ["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
  ["じゃ","ja"],["じゅ","ju"],["じょ","jo"],
  ["びゃ","bya"],["びゅ","byu"],["びょ","byo"],
  ["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]
];

const KATA = {
  "あ":"ア","い":"イ","う":"ウ","え":"エ","お":"オ",
  "か":"カ","き":"キ","く":"ク","け":"ケ","こ":"コ",
  "さ":"サ","し":"シ","す":"ス","せ":"セ","そ":"ソ",
  "た":"タ","ち":"チ","つ":"ツ","て":"テ","と":"ト",
  "な":"ナ","に":"ニ","ぬ":"ヌ","ね":"ネ","の":"ノ",
  "は":"ハ","ひ":"ヒ","ふ":"フ","へ":"ヘ","ほ":"ホ",
  "ま":"マ","み":"ミ","む":"ム","め":"メ","も":"モ",
  "や":"ヤ","ゆ":"ユ","よ":"ヨ","ら":"ラ","り":"リ",
  "る":"ル","れ":"レ","ろ":"ロ","わ":"ワ","を":"ヲ","ん":"ン",
  "が":"ガ","ぎ":"ギ","ぐ":"グ","げ":"ゲ","ご":"ゴ",
  "ざ":"ザ","じ":"ジ","ず":"ズ","ぜ":"ゼ","ぞ":"ゾ",
  "だ":"ダ","ぢ":"ヂ","づ":"ヅ","で":"デ","ど":"ド",
  "ば":"バ","び":"ビ","ぶ":"ブ","べ":"ベ","ぼ":"ボ",
  "ぱ":"パ","ぴ":"ピ","ぷ":"プ","ぺ":"ペ","ぽ":"ポ",
  "きゃ":"キャ","きゅ":"キュ","きょ":"キョ",
  "しゃ":"シャ","しゅ":"シュ","しょ":"ショ",
  "ちゃ":"チャ","ちゅ":"チュ","ちょ":"チョ",
  "にゃ":"ニャ","にゅ":"ニュ","にょ":"ニョ",
  "ひゃ":"ヒャ","ひゅ":"ヒュ","ひょ":"ヒョ",
  "みゃ":"ミャ","みゅ":"ミュ","みょ":"ミョ",
  "りゃ":"リャ","りゅ":"リュ","りょ":"リョ",
  "ぎゃ":"ギャ","ぎゅ":"ギュ","ぎょ":"ギョ",
  "じゃ":"ジャ","じゅ":"ジュ","じょ":"ジョ",
  "びゃ":"ビャ","びゅ":"ビュ","びょ":"ビョ",
  "ぴゃ":"ピャ","ぴゅ":"ピュ","ぴょ":"ピョ"
};

const TEXT = {
  EN: {
    title:"Kana Trainer", settings:"Kana & Settings",
    hiragana:"Hiragana", katakana:"Katakana",
    dakuten:"Dakuten ゛", handakuten:"Handakuten ゜",
    combos:"Combination characters", count:"Prompts",
    duration:"Countdown (seconds)", auto:"Auto Next",
    pronunciation:"Automatic pronunciation", hint:"Show romaji hint",
    romajiOnly:"Romaji only", previous:"← Previous",
    next:"Next →", start:"▶ Start", pause:"Ⅱ Pause",
    resume:"▶ Resume", stop:"■ Stop", help:"Help & app information",
    noKana:"Select Hiragana and/or Katakana.",
    invalidDuration:"Enter a whole number from 1 to 60 for the countdown.",
    summary:(n,s)=>`${n} prompts · ${s} ${s===1?"second":"seconds"}`,
    prompt:(n,total)=>`Prompt ${n} / ${total}`,
    helpText:"Choose kana categories and the number of prompts, then tap Start. The kana appears first; its romaji answer appears after the countdown. Use the speaker button to hear pronunciation.\n\nAuthor: hao_yu_zhou@hotmail.com"
  },
  简: {
    title:"假名练习", settings:"假名与设置",
    hiragana:"平假名", katakana:"片假名",
    dakuten:"浊音 ゛", handakuten:"半浊音 ゜",
    combos:"拗音组合", count:"题目数量",
    duration:"倒计时（秒）", auto:"自动下一题",
    pronunciation:"自动发音", hint:"显示罗马音提示",
    romajiOnly:"仅显示罗马音", previous:"← 上一题",
    next:"下一题 →", start:"▶ 开始", pause:"Ⅱ 暂停",
    resume:"▶ 继续", stop:"■ 停止", help:"帮助与应用信息",
    noKana:"请至少选择平假名或片假名。",
    invalidDuration:"请输入 1 到 60 之间的整数作为倒计时。",
    summary:(n,s)=>`${n} 题 · ${s} 秒`,
    prompt:(n,total)=>`题目 ${n} / ${total}`,
    helpText:"选择假名类别和题目数量，然后点击开始。倒计时结束后显示罗马音答案。点击扬声器按钮可收听发音。\n\n作者：hao_yu_zhou@hotmail.com"
  },
  繁: {
    title:"假名練習", settings:"假名與設定",
    hiragana:"平假名", katakana:"片假名",
    dakuten:"濁音 ゛", handakuten:"半濁音 ゜",
    combos:"拗音組合", count:"題目數量",
    duration:"倒數計時（秒）", auto:"自動下一題",
    pronunciation:"自動發音", hint:"顯示羅馬字提示",
    romajiOnly:"只顯示羅馬字", previous:"← 上一題",
    next:"下一題 →", start:"▶ 開始", pause:"Ⅱ 暫停",
    resume:"▶ 繼續", stop:"■ 停止", help:"說明與應用程式資訊",
    noKana:"請至少選擇平假名或片假名。",
    invalidDuration:"請輸入 1 到 60 之間的整數作為倒數秒數。",
    summary:(n,s)=>`${n} 題 · ${s} 秒`,
    prompt:(n,total)=>`題目 ${n} / ${total}`,
    helpText:"選擇假名類別與題目數量，然後按開始。倒數結束後會顯示羅馬字答案。按喇叭按鈕可聆聽發音。\n\n作者：hao_yu_zhou@hotmail.com"
  },
  DE: {
    title:"Kana-Trainer", settings:"Kana & Einstellungen",
    hiragana:"Hiragana", katakana:"Katakana",
    dakuten:"Dakuten ゛", handakuten:"Handakuten ゜",
    combos:"Kombinationszeichen", count:"Aufgaben",
    duration:"Countdown (Sekunden)", auto:"Automatisch weiter",
    pronunciation:"Automatische Aussprache",
    hint:"Romaji-Hinweis anzeigen", romajiOnly:"Nur Romaji",
    previous:"← Zurück", next:"Weiter →", start:"▶ Start",
    pause:"Ⅱ Pause", resume:"▶ Fortsetzen", stop:"■ Stopp",
    help:"Hilfe & App-Informationen",
    noKana:"Bitte Hiragana und/oder Katakana auswählen.",
    invalidDuration:"Bitte eine ganze Zahl von 1 bis 60 eingeben.",
    summary:(n,s)=>`${n} Aufgaben · ${s} ${s===1?"Sekunde":"Sekunden"}`,
    prompt:(n,total)=>`Aufgabe ${n} / ${total}`,
    helpText:"Wähle Kana-Gruppen und die Anzahl der Aufgaben und tippe auf Start. Nach dem Countdown erscheint die Romaji-Antwort. Über die Lautsprechertaste kannst du die Aussprache hören.\n\nAutor: hao_yu_zhou@hotmail.com"
  },
  FR: {
    title:"Entraîneur de kana", settings:"Kana et paramètres",
    hiragana:"Hiragana", katakana:"Katakana",
    dakuten:"Dakuten ゛", handakuten:"Handakuten ゜",
    combos:"Caractères combinés", count:"Questions",
    duration:"Compte à rebours (secondes)",
    auto:"Passage automatique", pronunciation:"Prononciation automatique",
    hint:"Afficher l'indice romaji", romajiOnly:"Romaji uniquement",
    previous:"← Précédent", next:"Suivant →",
    start:"▶ Démarrer", pause:"Ⅱ Pause", resume:"▶ Reprendre",
    stop:"■ Arrêter", help:"Aide et informations",
    noKana:"Sélectionnez Hiragana et/ou Katakana.",
    invalidDuration:"Entrez un nombre entier entre 1 et 60.",
    summary:(n,s)=>`${n} questions · ${s} ${s===1?"seconde":"secondes"}`,
    prompt:(n,total)=>`Question ${n} / ${total}`,
    helpText:"Choisissez les catégories de kana et le nombre de questions, puis appuyez sur Démarrer. La réponse en romaji apparaît à la fin du compte à rebours. Utilisez le haut-parleur pour écouter la prononciation.\n\nAuteur : hao_yu_zhou@hotmail.com"
  },
  ไทย: {
    title:"ฝึกอักษรคานะ", settings:"คานะและการตั้งค่า",
    hiragana:"ฮิรางานะ", katakana:"คาตาคานะ",
    dakuten:"ดาคุเต็น ゛", handakuten:"ฮันดาคุเต็น ゜",
    combos:"อักษรผสม", count:"จำนวนข้อ",
    duration:"นับถอยหลัง (วินาที)", auto:"ไปข้อต่อไปอัตโนมัติ",
    pronunciation:"ออกเสียงอัตโนมัติ", hint:"แสดงคำใบ้โรมาจิ",
    romajiOnly:"แสดงโรมาจิเท่านั้น", previous:"← ก่อนหน้า",
    next:"ถัดไป →", start:"▶ เริ่ม", pause:"Ⅱ หยุดชั่วคราว",
    resume:"▶ ทำต่อ", stop:"■ หยุด", help:"วิธีใช้และข้อมูลแอป",
    noKana:"โปรดเลือกฮิรางานะหรือคาตาคานะอย่างน้อยหนึ่งชุด",
    invalidDuration:"โปรดป้อนจำนวนเต็มตั้งแต่ 1 ถึง 60",
    summary:(n,s)=>`${n} ข้อ · ${s} วินาที`,
    prompt:(n,total)=>`ข้อ ${n} / ${total}`,
    helpText:"เลือกชุดอักษรคานะและจำนวนข้อ แล้วกดเริ่ม คำตอบโรมาจิจะแสดงหลังนับถอยหลัง ใช้ปุ่มลำโพงเพื่อฟังการออกเสียง\n\nผู้เขียน: hao_yu_zhou@hotmail.com"
  },
  한국어: {
    title:"가나 트레이너", settings:"가나 및 설정",
    hiragana:"히라가나", katakana:"가타카나",
    dakuten:"탁음 ゛", handakuten:"반탁음 ゜",
    combos:"요음 조합", count:"문제 수",
    duration:"카운트다운 (초)", auto:"자동으로 다음 문제",
    pronunciation:"자동 발음", hint:"로마자 힌트 표시",
    romajiOnly:"로마자만 표시", previous:"← 이전",
    next:"다음 →", start:"▶ 시작", pause:"Ⅱ 일시정지",
    resume:"▶ 계속", stop:"■ 정지", help:"도움말 및 앱 정보",
    noKana:"히라가나 또는 가타카나를 하나 이상 선택하세요.",
    invalidDuration:"1부터 60까지의 정수를 입력하세요.",
    summary:(n,s)=>`${n}문항 · ${s}초`,
    prompt:(n,total)=>`문항 ${n} / ${total}`,
    helpText:"가나 종류와 문제 수를 선택한 다음 시작을 누르세요. 카운트다운이 끝나면 로마자 답이 표시됩니다. 스피커 버튼으로 발음을 들을 수 있습니다.\n\n작성자: hao_yu_zhou@hotmail.com"
  }
};

function T(key) {
  return (TEXT[$("language").value] || TEXT.EN)[key] ?? TEXT.EN[key] ?? key;
}

function getDuration() {
  const n = Number($("duration").value);
  return Number.isInteger(n) && n >= 1 && n <= 60 ? n : 2;
}

function toKatakana(kana) {
  return KATA[kana] || [...kana].map(ch => KATA[ch] || ch).join("");
}

function category(kana) {
  if (kana.length > 1) return "combo";
  if ("ぱぴぷぺぽ".includes(kana)) return "handaku";
  if ("がぎぐげござじずぜぞだぢづでどばびぶべぼ".includes(kana)) return "daku";
  return "basic";
}

function buildPool() {
  const scripts = [];
  if ($("hira").checked) scripts.push(false);
  if ($("kata").checked) scripts.push(true);

  const entries = [...BASIC, ...COMBOS].filter(([kana]) => {
    const type = category(kana);
    if (type === "daku") return $("daku").checked;
    if (type === "handaku") return $("handaku").checked;
    if (type === "combo") return $("combos").checked;
    return true;
  });

  return scripts.flatMap(isKata =>
    entries.map(([kana, romaji]) => [
      isKata ? toKatakana(kana) : kana,
      romaji
    ])
  );
}

function shuffle(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makePlaylist(pool, count) {
  const result = [];
  while (result.length < count) {
    result.push(...shuffle(pool).slice(0, count - result.length));
  }
  return result;
}

let playlist = [];
let index = 0;
let running = false;
let paused = false;
let phase = "idle";
let remaining = 2;
let deadline = 0;
let timerId = null;
let speechToken = 0;
let advanceToken = 0;
let cachedJapaneseVoice = null;
let speechReady = false;

// NEW: Play ん only once after the app is opened.
let hasPlayedFirstStartSound = false;

const ANSWER_WAIT_MS = 1000;
const SPEECH_FALLBACK_MS = 3000;

function cancelTimer() {
  if (timerId !== null) clearTimeout(timerId);
  timerId = null;
  advanceToken++;
}

function speechSupported() {
  return "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;
}

function prepareSpeech() {
  if (!speechSupported()) return;

  try {
    const synth = window.speechSynthesis;

    // Request the browser's available voice list without speaking.
    const voices = synth.getVoices();
    cachedJapaneseVoice =
      voices.find(v => /^ja(-|_)/i.test(v.lang)) || null;

    speechReady = true;
  } catch (error) {
    console.warn("Speech initialization failed:", error);
  }
}

function cancelSpeech() {
  speechToken++;

  if (speechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (error) {
      console.warn("Unable to cancel speech:", error);
    }
  }
}

function currentItem() {
  return playlist[index] || ["あ", "a"];
}

function update() {
  const item = currentItem();
  const total = playlist.length;
  const answerVisible = ["speaking", "answerWait", "finished"].includes(phase);
  const romajiOnly = $("romajiOnly").checked;

  $("kana").textContent = romajiOnly ? item[1] : item[0];
  $("romaji").textContent =
    !romajiOnly && (answerVisible || $("hint").checked) ? item[1] : "";

  $("timer").textContent = answerVisible
    ? ""
    : String(Math.max(0, remaining));

  $("progressText").textContent =
    T("prompt")(total ? index + 1 : 0, total);

  $("bar").max = total || 1;
  $("bar").value = total ? index + 1 : 0;

  $("summary").textContent =
    T("summary")($("count").value, getDuration());

  $("previous").disabled = !total || index <= 0;
  $("next").disabled = !total || index >= total - 1;
  $("start").disabled = running;
  $("pause").disabled = !running;
  $("stop").disabled = !running;
  $("pause").textContent = paused ? T("resume") : T("pause");

  for (const id of [
    "hira", "kata", "daku", "handaku", "combos", "count", "duration"
  ]) {
    $(id).disabled = running;
  }
}

function translate() {
  const ids = {
    appTitle:"title",
    settingsTitle:"settings",
    hiraLabel:"hiragana",
    kataLabel:"katakana",
    dakuLabel:"dakuten",
    handakuLabel:"handakuten",
    combosLabel:"combos",
    countLabel:"count",
    durationLabel:"duration",
    autoLabel:"auto",
    pronunciationLabel:"pronunciation",
    hintLabel:"hint",
    romajiOnlyLabel:"romajiOnly",
    previous:"previous",
    next:"next",
    start:"start",
    stop:"stop",
    help:"help"
  };

  for (const [id, key] of Object.entries(ids)) {
    $(id).textContent = T(key);
  }

  $("pause").textContent = paused ? T("resume") : T("pause");
  $("speak").setAttribute("aria-label", T("pronunciation"));
  $("speak").setAttribute("title", T("pronunciation"));
  update();
}

/*
 * A single guarded timer controls automatic advancement.
 * Speech callbacks never cancel or replace this timer.
 */
function scheduleAdvance(delay) {
  cancelTimer();

  if (!running || paused) return;

  const token = advanceToken;

  timerId = setTimeout(() => {
    if (token !== advanceToken) return;

    timerId = null;

    if (!running || paused) return;

    if ($("auto").checked && index < playlist.length - 1) {
      index++;
      startCountdown();
    } else {
      finishRound();
    }
  }, delay);
}

function speakCurrentKana(automatic = false) {
  if (!speechSupported()) return;

  const item = currentItem();
  const synth = window.speechSynthesis;

  // A manual speaker tap is a user gesture and can help activate speech.
  // Do not let a speech callback control the game timer.
  try {
    synth.cancel();
  } catch (error) {
    console.warn("Unable to cancel previous speech:", error);
  }

  speechToken++;
  const token = speechToken;

  const utterance = new SpeechSynthesisUtterance(item[0]);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  // Refresh voices because iOS may populate the list asynchronously.
  prepareSpeech();

  if (cachedJapaneseVoice) {
    utterance.voice = cachedJapaneseVoice;
  }

  utterance.onend = () => {
    if (token !== speechToken) return;
    // Intentionally do not schedule advancement here.
  };

  utterance.onerror = event => {
    if (token !== speechToken) return;
    console.warn("Speech playback failed:", event.error);
    // Intentionally do not stop or reschedule the game here.
  };

  try {
    synth.speak(utterance);
  } catch (error) {
    console.error("Speech playback failed:", error);
  }
}

function startCountdown() {
  cancelTimer();
  cancelSpeech();

  phase = "countdown";
  remaining = getDuration();
  deadline = Date.now() + remaining * 1000;

  update();
  timerId = setTimeout(tick, 100);
}

function tick() {
  timerId = null;

  if (!running || paused || phase !== "countdown") return;

  remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  update();

  if (Date.now() >= deadline) {
    revealAnswer();
    return;
  }

  timerId = setTimeout(tick, 100);
}

function revealAnswer() {
  cancelTimer();

  remaining = 0;
  phase = "answerWait";
  update();

  /*
   * Schedule the next step FIRST.
   * Automatic speech is attempted afterwards and cannot block advancement.
   */
  if ($("auto").checked && index < playlist.length - 1) {
    scheduleAdvance(SPEECH_FALLBACK_MS);
  } else {
    scheduleAdvance(ANSWER_WAIT_MS);
  }

  if ($("pronunciation").checked) {
    speakCurrentKana(true);
  }
}

function finishRound() {
  cancelTimer();
  cancelSpeech();

  running = false;
  paused = false;
  phase = "finished";

  update();
}

function start() {
  if (running) return;

  const duration = Number($("duration").value);
  const count = Number($("count").value);

  if (!Number.isInteger(duration) || duration < 1 || duration > 60) {
    alert(T("invalidDuration"));
    return;
  }

  const pool = buildPool();

  if (!pool.length) {
    alert(T("noKana"));
    return;
  }

  cancelTimer();
  cancelSpeech();

  playlist = makePlaylist(pool, count);
  index = 0;
  running = true;
  paused = false;

  // Refresh the available voices when the user starts.
  prepareSpeech();

  startCountdown();

  // NEW: Play ん on the first Start tap only.
  // This is triggered directly by the Start button's user gesture.
  if (!hasPlayedFirstStartSound && speechSupported()) {
    hasPlayedFirstStartSound = true;

    try {
      const utterance = new SpeechSynthesisUtterance(" ");
      utterance.lang = "en-US";
      utterance.rate = 2;
      utterance.pitch = 2;
      utterance.volume = 1;

      if (cachedJapaneseVoice) {
        utterance.voice = cachedJapaneseVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn("First-start speech failed:", error);
    }
  }

  update();
}

function pauseResume() {
  if (!running) return;

  if (!paused) {
    if (phase === "countdown") {
      remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    }

    paused = true;
    cancelTimer();
    cancelSpeech();
    update();
    return;
  }

  paused = false;

  if (phase === "countdown") {
    deadline = Date.now() + remaining * 1000;
    timerId = setTimeout(tick, 100);
  } else {
    phase = "answerWait";
    update();

    if ($("auto").checked && index < playlist.length - 1) {
      scheduleAdvance(SPEECH_FALLBACK_MS);
    } else {
      scheduleAdvance(ANSWER_WAIT_MS);
    }

    if ($("pronunciation").checked) {
      speakCurrentKana(true);
    }
  }

  update();
}

function navigate(delta) {
  if (!playlist.length) return;

  const nextIndex = Math.max(
    0,
    Math.min(playlist.length - 1, index + delta)
  );

  if (nextIndex === index) return;

  cancelTimer();
  cancelSpeech();

  index = nextIndex;

  if (running && !paused) {
    startCountdown();
  } else {
    phase = "idle";
    update();
  }
}

function stop() {
  cancelTimer();
  cancelSpeech();

  running = false;
  paused = false;
  phase = "idle";
  index = 0;
  playlist = [];
  remaining = getDuration();
  deadline = 0;

  update();
}

function resetGameOnLoad() {
  cancelTimer();
  cancelSpeech();

  playlist = [];
  index = 0;
  running = false;
  paused = false;
  phase = "idle";
  remaining = getDuration();
  deadline = 0;

  prepareSpeech();
  translate();
  update();
}

$("language").addEventListener("change", translate);
$("start").addEventListener("click", start);
$("pause").addEventListener("click", pauseResume);
$("stop").addEventListener("click", stop);
$("previous").addEventListener("click", () => navigate(-1));
$("next").addEventListener("click", () => navigate(1));

$("speak").addEventListener("click", () => {
  // This call happens directly from the user's tap.
  prepareSpeech();
  speakCurrentKana(false);
});

for (const id of [
  "hira", "kata", "daku", "handaku", "combos", "count", "duration",
  "auto", "pronunciation", "hint", "romajiOnly"
]) {
  $(id).addEventListener("change", update);
}

$("help").addEventListener("click", () => alert(T("helpText")));

if (speechSupported()) {
  // iOS may populate its voice list after initial page load.
  window.speechSynthesis.onvoiceschanged = prepareSpeech;
  prepareSpeech();
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.error("Service worker registration failed:", error);
    });
  });
}

// Reset the game without automatically starting it.
resetGameOnLoad();
