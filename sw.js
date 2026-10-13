
"use strict";

/* =========================================================
   Kana Trainer — complete app.js
   Designed for iPhone Safari / installed PWA.
   ========================================================= */

const SPEECH_FALLBACK_MS = 3000;
const ANSWER_WAIT_MS = 1000;
const COUNTDOWN_TICK_MS = 100;

const $ = (id) => document.getElementById(id);

const KANA = {
  hiragana: [
    ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
    ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
    ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
    ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
    ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
    ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
    ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
    ["や","ya"],["ゆ","yu"],["よ","yo"],
    ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
    ["わ","wa"],["を","wo"],["ん","n"]
  ],
  katakana: [
    ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
    ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
    ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
    ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
    ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
    ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
    ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
    ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
    ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
    ["ワ","wa"],["ヲ","wo"],["ン","n"]
  ],
  dakutenHiragana: [
    ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
    ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
    ["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
    ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]
  ],
  dakutenKatakana: [
    ["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
    ["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
    ["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],
    ["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"]
  ],
  handakutenHiragana: [
    ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
  ],
  handakutenKatakana: [
    ["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]
  ],
  combosHiragana: [
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
  ],
  combosKatakana: [
    ["キャ","kya"],["キュ","kyu"],["キョ","kyo"],
    ["シャ","sha"],["シュ","shu"],["ショ","sho"],
    ["チャ","cha"],["チュ","chu"],["チョ","cho"],
    ["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"],
    ["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],
    ["ミャ","mya"],["ミュ","myu"],["ミョ","myo"],
    ["リャ","rya"],["リュ","ryu"],["リョ","ryo"],
    ["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],
    ["ジャ","ja"],["ジュ","ju"],["ジョ","jo"],
    ["ビャ","bya"],["ビュ","byu"],["ビョ","byo"],
    ["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"]
  ]
};

/* ---------------------- Translations ---------------------- */

const TEXT = {
  EN: {
    title: "Kana Trainer", settings: "Practice settings",
    summary: "Choose the kana you want to practise.",
    hira: "Hiragana", kata: "Katakana", daku: "Dakuten (が, ざ, だ, ば)",
    handaku: "Handakuten (ぱ)", combos: "Combination kana (きゃ, シュ)",
    count: "Number of questions", duration: "Seconds per question",
    auto: "Auto Next", pronunciation: "Automatic pronunciation",
    hint: "Show romaji after the countdown", romajiOnly: "Show romaji only",
    speak: "🔊 Speak", previous: "Previous", next: "Next",
    start: "Start", pause: "Pause", resume: "Resume", stop: "Stop",
    help: "Help", ready: "Ready", running: "Practise!", paused: "Paused",
    complete: "Practice complete!", question: "Question",
    of: "of", answer: "Answer", noKana: "Select at least one kana category.",
    helpText: "Choose your kana categories and settings, then tap Start. The kana appears first; its romaji is revealed when the countdown ends. Use the speaker button to hear the pronunciation."
  },
  "简": {
    title: "假名训练", settings: "练习设置",
    summary: "选择要练习的假名。",
    hira: "平假名", kata: "片假名", daku: "浊音（が、ざ、だ、ば）",
    handaku: "半浊音（ぱ）", combos: "拗音组合（きゃ、シュ）",
    count: "题目数量", duration: "每题秒数",
    auto: "自动下一题", pronunciation: "自动发音",
    hint: "倒计时结束后显示罗马字", romajiOnly: "只显示罗马字",
    speak: "🔊 发音", previous: "上一题", next: "下一题",
    start: "开始", pause: "暂停", resume: "继续", stop: "停止",
    help: "帮助", ready: "准备就绪", running: "开始练习！", paused: "已暂停",
    complete: "练习完成！", question: "题目",
    of: "/", answer: "答案", noKana: "请至少选择一种假名。",
    helpText: "选择假名类别和设置，然后点击“开始”。倒计时结束后显示罗马字。点击扬声器按钮可以听发音。"
  },
  "繁": {
    title: "假名訓練", settings: "練習設定",
    summary: "選擇要練習的假名。",
    hira: "平假名", kata: "片假名", daku: "濁音（が、ざ、だ、ば）",
    handaku: "半濁音（ぱ）", combos: "拗音組合（きゃ、シュ）",
    count: "題目數量", duration: "每題秒數",
    auto: "自動下一題", pronunciation: "自動發音",
    hint: "倒數結束後顯示羅馬字", romajiOnly: "只顯示羅馬字",
    speak: "🔊 發音", previous: "上一題", next: "下一題",
    start: "開始", pause: "暫停", resume: "繼續", stop: "停止",
    help: "說明", ready: "準備就緒", running: "開始練習！", paused: "已暫停",
    complete: "練習完成！", question: "題目",
    of: "/", answer: "答案", noKana: "請至少選擇一種假名。",
    helpText: "選擇假名類別和設定，然後點擊「開始」。倒數結束後會顯示羅馬字。點擊喇叭按鈕可以聽發音。"
  },
  DE: {
    title: "Kana-Trainer", settings: "Übungseinstellungen",
    summary: "Wähle die Kana aus, die du üben möchtest.",
    hira: "Hiragana", kata: "Katakana", daku: "Dakuten (が, ざ, だ, ば)",
    handaku: "Handakuten (ぱ)", combos: "Kana-Kombinationen (きゃ, シュ)",
    count: "Anzahl der Fragen", duration: "Sekunden pro Frage",
    auto: "Automatisch weiter", pronunciation: "Automatische Aussprache",
    hint: "Romaji nach dem Countdown anzeigen", romajiOnly: "Nur Romaji anzeigen",
    speak: "🔊 Anhören", previous: "Zurück", next: "Weiter",
    start: "Start", pause: "Pause", resume: "Fortsetzen", stop: "Stopp",
    help: "Hilfe", ready: "Bereit", running: "Übung läuft!", paused: "Pausiert",
    complete: "Übung abgeschlossen!", question: "Frage",
    of: "von", answer: "Antwort", noKana: "Bitte wähle mindestens eine Kana-Kategorie.",
    helpText: "Wähle Kategorien und Einstellungen und tippe auf Start. Nach dem Countdown wird Romaji angezeigt. Über die Lautsprechertaste kannst du die Aussprache hören."
  },
  FR: {
    title: "Entraîneur Kana", settings: "Paramètres",
    summary: "Choisissez les kana à réviser.",
    hira: "Hiragana", kata: "Katakana", daku: "Dakuten (が, ざ, だ, ば)",
    handaku: "Handakuten (ぱ)", combos: "Combinaisons de kana (きゃ, シュ)",
    count: "Nombre de questions", duration: "Secondes par question",
    auto: "Question suivante automatique", pronunciation: "Prononciation automatique",
    hint: "Afficher le romaji à la fin du compte à rebours", romajiOnly: "Afficher seulement le romaji",
    speak: "🔊 Écouter", previous: "Précédent", next: "Suivant",
    start: "Démarrer", pause: "Pause", resume: "Reprendre", stop: "Arrêter",
    help: "Aide", ready: "Prêt", running: "À vous de jouer !", paused: "En pause",
    complete: "Entraînement terminé !", question: "Question",
    of: "sur", answer: "Réponse", noKana: "Choisissez au moins une catégorie de kana.",
    helpText: "Choisissez les catégories et les paramètres, puis appuyez sur Démarrer. Le romaji apparaît à la fin du compte à rebours. Utilisez le haut-parleur pour écouter la prononciation."
  },
  "ไทย": {
    title: "ฝึกอักษรคานะ", settings: "ตั้งค่าการฝึก",
    summary: "เลือกอักษรคานะที่ต้องการฝึก",
    hira: "ฮิรางานะ", kata: "คาตาคานะ", daku: "เสียงขุ่น (が, ざ, だ, ば)",
    handaku: "เสียงกึ่งขุ่น (ぱ)", combos: "อักษรผสม (きゃ, シュ)",
    count: "จำนวนคำถาม", duration: "วินาทีต่อคำถาม",
    auto: "ไปข้อต่อไปอัตโนมัติ", pronunciation: "ออกเสียงอัตโนมัติ",
    hint: "แสดงโรมาจิเมื่อหมดเวลา", romajiOnly: "แสดงเฉพาะโรมาจิ",
    speak: "🔊 ฟังเสียง", previous: "ก่อนหน้า", next: "ถัดไป",
    start: "เริ่ม", pause: "หยุดชั่วคราว", resume: "ทำต่อ", stop: "หยุด",
    help: "ช่วยเหลือ", ready: "พร้อม", running: "เริ่มฝึก!", paused: "หยุดชั่วคราว",
    complete: "ฝึกเสร็จแล้ว!", question: "ข้อ",
    of: "จาก", answer: "คำตอบ", noKana: "โปรดเลือกหมวดอักษรคานะอย่างน้อยหนึ่งหมวด",
    helpText: "เลือกหมวดอักษรและตั้งค่า จากนั้นกดเริ่ม โรมาจิจะแสดงเมื่อหมดเวลา แตะปุ่มลำโพงเพื่อฟังเสียงอ่าน"
  },
  "한국어": {
    title: "가나 트레이너", settings: "연습 설정",
    summary: "연습할 가나를 선택하세요.",
    hira: "히라가나", kata: "가타카나", daku: "탁음 (が, ざ, だ, ば)",
    handaku: "반탁음 (ぱ)", combos: "요음 조합 (きゃ, シュ)",
    count: "문제 수", duration: "문제당 초",
    auto: "자동으로 다음 문제", pronunciation: "자동 발음",
    hint: "카운트다운 후 로마자 표시", romajiOnly: "로마자만 표시",
    speak: "🔊 발음 듣기", previous: "이전", next: "다음",
    start: "시작", pause: "일시정지", resume: "계속", stop: "정지",
    help: "도움말", ready: "준비", running: "연습 시작!", paused: "일시정지됨",
    complete: "연습 완료!", question: "문제",
    of: "/", answer: "정답", noKana: "가나 범주를 하나 이상 선택하세요.",
    helpText: "가나 범주와 설정을 선택한 뒤 시작을 누르세요. 카운트다운이 끝나면 로마자가 표시됩니다. 스피커 버튼을 눌러 발음을 들을 수 있습니다."
  }
};

/* ---------------------- Game state ---------------------- */

let language = "EN";
let playlist = [];
let currentIndex = 0;
let gameState = "idle"; // idle, running, paused, complete
let timerId = null;
let deadline = 0;
let remainingMs = 0;
let answerVisible = false;
let speechVoice = null;
let speechPrimed = false;
let speechRequestId = 0;

function t(key) {
  const pack = TEXT[language] || TEXT.EN;
  return pack[key] ?? TEXT.EN[key] ?? key;
}

function getElementValue(ids, fallback) {
  for (const id of ids) {
    const el = $(id);
    if (el) return el.value;
  }
  return fallback;
}

function isChecked(ids, fallback = false) {
  for (const id of ids) {
    const el = $(id);
    if (el && "checked" in el) return el.checked;
  }
  return fallback;
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function setVisible(id, visible) {
  const el = $(id);
  if (el) el.hidden = !visible;
}

function setDisabled(id, disabled) {
  const el = $(id);
  if (el) el.disabled = disabled;
}

function setStatus(message) {
  setText("status", message);
}

function getDurationSeconds() {
  const value = Number(getElementValue(
    ["duration", "seconds", "timePerQuestion", "questionDuration"],
    5
  ));
  return Number.isFinite(value) ? Math.max(1, Math.min(60, value)) : 5;
}

function getQuestionCount() {
  const value = Number(getElementValue(
    ["count", "questionCount", "numQuestions"],
    20
  ));
  return Number.isFinite(value) ? Math.max(1, Math.min(500, value)) : 20;
}

/* ---------------------- Kana selection ---------------------- */

function selectedKana() {
  const result = [];

  const hira = isChecked(["hiragana", "hira", "includeHiragana"], true);
  const kata = isChecked(["katakana", "kata", "includeKatakana"], false);
  const daku = isChecked(["daku", "dakuten", "includeDakuten"], false);
  const handaku = isChecked(["handaku", "handakuten", "includeHandakuten"], false);
  const combos = isChecked(["combos", "combo", "includeCombos"], false);

  if (hira) result.push(...KANA.hiragana);
  if (kata) result.push(...KANA.katakana);

  if (daku) {
    if (hira) result.push(...KANA.dakutenHiragana);
    if (kata) result.push(...KANA.dakutenKatakana);
    if (!hira && !kata) {
      result.push(...KANA.dakutenHiragana, ...KANA.dakutenKatakana);
    }
  }

  if (handaku) {
    if (hira) result.push(...KANA.handakutenHiragana);
    if (kata) result.push(...KANA.handakutenKatakana);
    if (!hira && !kata) {
      result.push(...KANA.handakutenHiragana, ...KANA.handakutenKatakana);
    }
  }

  if (combos) {
    if (hira) result.push(...KANA.combosHiragana);
    if (kata) result.push(...KANA.combosKatakana);
    if (!hira && !kata) {
      result.push(...KANA.combosHiragana, ...KANA.combosKatakana);
    }
  }

  // Remove duplicate kana while preserving order.
  return [...new Map(result.map((item) => [item[0], item])).values()];
}

function shuffle(items) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function makePlaylist() {
  const pool = selectedKana();

  if (!pool.length) {
    setStatus(t("noKana"));
    return false;
  }

  const count = getQuestionCount();
  const mixed = shuffle(pool);
  playlist = [];

  while (playlist.length < count) {
    playlist.push(...shuffle(mixed));
  }

  playlist = playlist.slice(0, count);
  currentIndex = 0;
  return true;
}

/* ---------------------- Speech handling ---------------------- */

function prepareSpeech() {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    speechVoice = null;
    return;
  }

  try {
    const voices = window.speechSynthesis.getVoices();
    speechVoice =
      voices.find((voice) => /^ja(?:-|_)/i.test(voice.lang)) ||
      voices.find((voice) => /japanese|日本語/i.test(voice.name)) ||
      null;
  } catch (error) {
    console.warn("Could not load speech voices:", error);
  }
}

function speakKana(kana, manual = false) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    if (manual) setStatus("Speech synthesis is not available in this browser.");
    return;
  }

  const requestId = ++speechRequestId;

  try {
    prepareSpeech();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(kana);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (speechVoice) utterance.voice = speechVoice;

    utterance.onstart = () => {
      if (requestId === speechRequestId) speechPrimed = true;
    };

    utterance.onerror = (event) => {
      // Speech errors must never stop or delay the game timer.
      console.warn("Speech synthesis error:", event.error || event);
    };

    window.speechSynthesis.speak(utterance);

    if (manual) {
      speechPrimed = true;
    }
  } catch (error) {
    console.warn("Unable to speak kana:", error);
  }
}

function speakCurrentKana(manual = false) {
  const item = playlist[currentIndex];
  if (!item) return;
  speakKana(item[0], manual);
}

/* ---------------------- Display ---------------------- */

function updateProgress() {
  const total = playlist.length;
  const number = total ? currentIndex + 1 : 0;

  setText("progressText", total ? `${t("question")} ${number} ${t("of")} ${total}` : "");
  const bar = $("bar");

  if (bar) {
    const progress = total ? (number / total) * 100 : 0;
    bar.style.width = `${progress}%`;
    bar.setAttribute("aria-valuenow", String(Math.round(progress)));
  }
}

function renderCurrentKana() {
  const item = playlist[currentIndex];

  if (!item) {
    setText("kana", "—");
    setText("romaji", "");
    setText("timer", "");
    updateProgress();
    return;
  }

  const kanaEl = $("kana");
  const romajiEl = $("romaji");

  const romajiOnly = isChecked(["romajiOnly", "romaji-only"], false);
  const showHint = isChecked(["hint", "showHint", "showRomaji"], true);

  if (kanaEl) {
    kanaEl.textContent = romajiOnly ? item[1] : item[0];
  }

  if (romajiEl) {
    romajiEl.textContent = answerVisible && showHint && !romajiOnly
      ? item[1]
      : "";
  }

  updateProgress();
}

function updateTimerDisplay(ms) {
  const seconds = Math.max(0, ms / 1000);
  setText("timer", seconds.toFixed(1));
}

function updateButtons() {
  const running = gameState === "running";
  const paused = gameState === "paused";
  const complete = gameState === "complete";

  const startButton = $("start");
  if (startButton) {
    startButton.textContent = paused ? t("resume") : t("start");
    startButton.disabled = running || complete;
  }

  setDisabled("pause", !running);
  setDisabled("stop", gameState === "idle" || complete);
  setDisabled("previous", !playlist.length || currentIndex <= 0);
  setDisabled("next", !playlist.length || currentIndex >= playlist.length - 1);
}

function translateInterface() {
  const languageEl = $("language");
  if (languageEl && TEXT[languageEl.value]) language = languageEl.value;

  const labels = {
    appTitle: "title",
    settingsTitle: "settings",
    summary: "summary",
    hiraLabel: "hira",
    kataLabel: "kata",
    dakuLabel: "daku",
    handakuLabel: "handaku",
    combosLabel: "combos",
    countLabel: "count",
    durationLabel: "duration",
    autoLabel: "auto",
    pronunciationLabel: "pronunciation",
    hintLabel: "hint",
    romajiOnlyLabel: "romajiOnly",
    speak: "speak",
    previous: "previous",
    next: "next",
    start: "start",
    pause: "pause",
    stop: "stop",
    help: "help"
  };

  for (const [id, key] of Object.entries(labels)) {
    const el = $(id);
    if (!el) continue;

    // Keep the active/resume label controlled by updateButtons().
    if (id === "start" && gameState === "paused") continue;

    el.textContent = t(key);
  }

  updateButtons();
}

/* ---------------------- Countdown and game flow ---------------------- */

function clearGameTimer() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

function startCountdown(durationMs) {
  clearGameTimer();

  remainingMs = Math.max(0, durationMs);
  deadline = Date.now() + remainingMs;
  updateTimerDisplay(remainingMs);

  const tick = () => {
    if (gameState !== "running") return;

    remainingMs = Math.max(0, deadline - Date.now());
    updateTimerDisplay(remainingMs);

    if (remainingMs <= 0) {
      timerId = null;
      revealAnswer();
      return;
    }

    timerId = setTimeout(tick, COUNTDOWN_TICK_MS);
  };

  timerId = setTimeout(tick, COUNTDOWN_TICK_MS);
}

function revealAnswer() {
  if (gameState !== "running") return;

  answerVisible = true;
  renderCurrentKana();

  const item = playlist[currentIndex];
  if (!item) return;

  const autoNext = isChecked(["autoNext", "auto", "auto-next"], true);
  const automaticPronunciation = isChecked(
    ["pronunciation", "autoPronunciation", "autoSpeak", "automaticPronunciation"],
    true
  );

  /*
   * Schedule the next action BEFORE requesting speech.
   * Speech callbacks never control the game timer.
   */
  clearGameTimer();

  if (autoNext && currentIndex < playlist.length - 1) {
    timerId = setTimeout(() => {
      timerId = null;
      if (gameState === "running") advanceQuestion(1);
    }, SPEECH_FALLBACK_MS);
  } else {
    timerId = setTimeout(() => {
      timerId = null;
      if (gameState === "running") {
        if (currentIndex >= playlist.length - 1) finishGame();
        else setStatus(t("answer"));
      }
    }, ANSWER_WAIT_MS);
  }

  if (automaticPronunciation) {
    speakKana(item[0], false);
  }
}

function advanceQuestion(direction) {
  clearGameTimer();

  const nextIndex = currentIndex + direction;

  if (nextIndex < 0) {
    currentIndex = 0;
  } else if (nextIndex >= playlist.length) {
    finishGame();
    return;
  } else {
    currentIndex = nextIndex;
  }

  answerVisible = false;
  renderCurrentKana();

  if (gameState === "running") {
    setStatus(t("running"));
    startCountdown(getDurationSeconds() * 1000);
  } else {
    updateTimerDisplay(getDurationSeconds() * 1000);
  }

  updateButtons();
}

function startGame() {
  if (gameState === "paused") {
    gameState = "running";
    setStatus(t("running"));
    startCountdown(remainingMs);
    updateButtons();
    return;
  }

  if (gameState === "running") return;

  if (!makePlaylist()) return;

  answerVisible = false;
  gameState = "running";

  /*
   * This call occurs inside the Start button's user interaction.
   * It helps initialise iOS speech, but iOS may still require
   * the user to tap the speaker once before automatic speech works.
   */
  prepareSpeech();

  renderCurrentKana();
  setStatus(t("running"));
  updateButtons();
  startCountdown(getDurationSeconds() * 1000);
}

function pauseGame() {
  if (gameState !== "running") return;

  remainingMs = Math.max(0, deadline - Date.now());
  clearGameTimer();
  gameState = "paused";

  updateTimerDisplay(remainingMs);
  setStatus(t("paused"));
  updateButtons();
}

function stopGame() {
  clearGameTimer();

  gameState = "idle";
  answerVisible = false;
  remainingMs = 0;

  try {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  } catch (_) {
    // Ignore speech cleanup errors.
  }

  renderCurrentKana();
  updateTimerDisplay(getDurationSeconds() * 1000);
  setStatus(t("ready"));
  updateButtons();
}

function finishGame() {
  clearGameTimer();
  gameState = "complete";
  answerVisible = true;

  const item = playlist[currentIndex];
  if (item) renderCurrentKana();

  setStatus(t("complete"));
  updateButtons();
}

function resetGameOnLoad() {
  clearGameTimer();

  gameState = "idle";
  playlist = [];
  currentIndex = 0;
  answerVisible = false;
  remainingMs = 0;

  prepareSpeech();
  translateInterface();
  renderCurrentKana();
  updateTimerDisplay(getDurationSeconds() * 1000);
  setStatus(t("ready"));
  updateButtons();
}

/* ---------------------- Event listeners ---------------------- */

function bindClick(id, callback) {
  const el = $(id);
  if (el) el.addEventListener("click", callback);
}

function bindChange(id, callback) {
  const el = $(id);
  if (el) el.addEventListener("change", callback);
}

function showHelp() {
  const message = t("helpText");

  // Use an existing help element if the page has one.
  const helpPanel = $("helpText");
  if (helpPanel) {
    helpPanel.textContent = message;
    helpPanel.hidden = !helpPanel.hidden;
  } else {
    window.alert(message);
  }
}

function init() {
  const languageEl = $("language");
  if (languageEl) {
    language = TEXT[languageEl.value] ? languageEl.value : "EN";
    bindChange("language", () => {
      language = TEXT[languageEl.value] ? languageEl.value : "EN";
      translateInterface();
      renderCurrentKana();
      updateButtons();
    });
  }

  bindClick("start", startGame);
  bindClick("pause", pauseGame);
  bindClick("stop", stopGame);

  bindClick("speak", () => {
    /*
     * A real tap on this button is the most reliable way to
     * activate iOS speech synthesis for the current session.
     */
    prepareSpeech();
    speakCurrentKana(true);
  });

  bindClick("previous", () => {
    if (playlist.length && currentIndex > 0) {
      advanceQuestion(-1);
    }
  });

  bindClick("next", () => {
    if (playlist.length && currentIndex < playlist.length - 1) {
      advanceQuestion(1);
    }
  });

  bindClick("help", showHelp);

  // Update visible kana and labels when practice settings change.
  [
    "hiragana", "hira", "includeHiragana",
    "katakana", "kata", "includeKatakana",
    "daku", "dakuten", "includeDakuten",
    "handaku", "handakuten", "includeHandakuten",
    "combos", "combo", "includeCombos",
    "count", "questionCount", "numQuestions",
    "duration", "seconds", "timePerQuestion", "questionDuration",
    "autoNext", "auto", "auto-next",
    "pronunciation", "autoPronunciation", "autoSpeak",
    "automaticPronunciation", "hint", "showHint", "showRomaji",
    "romajiOnly", "romaji-only"
  ].forEach((id) => {
    bindChange(id, () => {
      if (gameState === "idle") {
        updateTimerDisplay(getDurationSeconds() * 1000);
        renderCurrentKana();
      }
    });
  });

  // Safari may populate voices asynchronously.
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      prepareSpeech();
    };
  }

  resetGameOnLoad();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
