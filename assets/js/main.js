/* ─────────────────────────────────────────────
   UI strings — add a key per language here
───────────────────────────────────────────── */
const UI = {
  de: {
    btnLabel:    'Neue Losung',
    labelLang:   'Sprache',
    labelTrans:  'Übersetzung',
    tagOT:       'Altes Testament',
    tagNT:       'Neues Testament',
    loading:     'Lade Verse …',
    dateLocale:  'de-DE',
  },
  en: {
    btnLabel:    'New Verse',
    labelLang:   'Language',
    labelTrans:  'Translation',
    tagOT:       'Old Testament',
    tagNT:       'New Testament',
    loading:     'Loading verses …',
    dateLocale:  'en-GB',
  },
};

/* ─────────────────────────────────────────────
   Translation registry
   Each entry: { lang, label, ot[], nt[] }

   DB-READY: replace fetchVerses() below with an
   API/fetch call when the backend is connected.
───────────────────────────────────────────── */
const TRANSLATIONS = {

  elberfelder: {
    lang: 'de', label: 'Elberfelder 1905',
    ot: [
      { text: "Der HERR ist mein Hirte, mir wird nichts mangeln.", ref: "Psalm 23,1" },
      { text: "Der Himmel erzählt die Herrlichkeit Gottes.", ref: "Psalm 19,2" },
      { text: "Ruf mich an in der Not, so will ich dich erretten.", ref: "Psalm 50,15" },
      { text: "Vertrau auf den HERRN mit deinem ganzen Herzen und verlass dich nicht auf deinen Verstand.", ref: "Sprüche 3,5" },
      { text: "Denn ich weiß, was ich für euch plane, spricht der HERR, Pläne zum Wohlergehen.", ref: "Jeremia 29,11" },
    ],
    nt: [
      { text: "Jesus Christus ist derselbe gestern und heute und in Ewigkeit.", ref: "Hebräer 13,8" },
      { text: "Ich bin der Weg und die Wahrheit und das Leben.", ref: "Johannes 14,6" },
      { text: "Denn also hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab.", ref: "Johannes 3,16" },
      { text: "Ich vermag alles durch den, der mich stärkt.", ref: "Philipper 4,13" },
      { text: "Die Liebe höret nimmer auf.", ref: "1. Korinther 13,8" },
    ],
  },

  luther: {
    lang: 'de', label: 'Luther 1984',
    ot: [
      { text: "Der HERR ist mein Hirte, mir wird nichts mangeln.", ref: "Psalm 23,1" },
      { text: "Die Himmel erzählen die Ehre Gottes.", ref: "Psalm 19,2" },
      { text: "Rufe mich an in der Not, so will ich dich erretten.", ref: "Psalm 50,15" },
      { text: "Verlass dich auf den HERRN von ganzem Herzen, und verlass dich nicht auf deinen Verstand.", ref: "Sprüche 3,5" },
      { text: "Denn ich weiß wohl, was ich für Gedanken über euch habe, spricht der HERR.", ref: "Jeremia 29,11" },
    ],
    nt: [
      { text: "Jesus Christus gestern und heute und derselbe auch in Ewigkeit.", ref: "Hebräer 13,8" },
      { text: "Ich bin der Weg und die Wahrheit und das Leben.", ref: "Johannes 14,6" },
      { text: "Denn also hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab.", ref: "Johannes 3,16" },
      { text: "Ich vermag alles durch den, der mich mächtig macht.", ref: "Philipper 4,13" },
      { text: "Die Liebe hört niemals auf.", ref: "1. Korinther 13,8" },
    ],
  },

  kjv: {
    lang: 'en', label: 'King James Version',
    ot: [
      { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1" },
      { text: "The heavens declare the glory of God.", ref: "Psalm 19:1" },
      { text: "Call upon me in the day of trouble: I will deliver thee.", ref: "Psalm 50:15" },
      { text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
      { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace.", ref: "Jeremiah 29:11" },
    ],
    nt: [
      { text: "Jesus Christ the same yesterday, and to day, and for ever.", ref: "Hebrews 13:8" },
      { text: "I am the way, the truth, and the life.", ref: "John 14:6" },
      { text: "For God so loved the world, that he gave his only begotten Son.", ref: "John 3:16" },
      { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13" },
      { text: "Charity never faileth.", ref: "1 Corinthians 13:8" },
    ],
  },

  niv: {
    lang: 'en', label: 'New International Version',
    ot: [
      { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
      { text: "The heavens declare the glory of God.", ref: "Psalm 19:1" },
      { text: "Call on me in the day of trouble; I will deliver you.", ref: "Psalm 50:15" },
      { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
      { text: "For I know the plans I have for you, declares the LORD, plans to prosper you.", ref: "Jeremiah 29:11" },
    ],
    nt: [
      { text: "Jesus Christ is the same yesterday and today and forever.", ref: "Hebrews 13:8" },
      { text: "I am the way and the truth and the life.", ref: "John 14:6" },
      { text: "For God so loved the world that he gave his one and only Son.", ref: "John 3:16" },
      { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
      { text: "Love never fails.", ref: "1 Corinthians 13:8" },
    ],
  },

};

/* ─────────────────────────────────────────────
   State
   otIndex / ntIndex are set ONLY on page load
   and when the "Neue Losung" button is clicked.
   Changing language or translation reuses them.
───────────────────────────────────────────── */
let currentLang        = 'de';
let currentTranslation = 'elberfelder';
let otIndex            = 0;
let ntIndex            = 0;

/* ─────────────────────────────────────────────
   Data layer
   Swap this body for a fetch() call when your
   database / API is ready, e.g.:
     const res = await fetch(`/api/verses?t=${key}`);
     return await res.json();
───────────────────────────────────────────── */
async function fetchVerses(translationKey) {
  return TRANSLATIONS[translationKey] ?? TRANSLATIONS['elberfelder'];
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function formatDate(lang) {
  return new Date().toLocaleDateString(UI[lang].dateLocale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

/* ─────────────────────────────────────────────
   Render cards — uses stored indices, never
   re-randomises on its own
───────────────────────────────────────────── */
async function renderCards() {
  const container = document.getElementById('losungen');
  const ui        = UI[currentLang];
  container.innerHTML = `<p class="loading">${ui.loading}</p>`;

  const data   = await fetchVerses(currentTranslation);
  const otVerse = data.ot[otIndex % data.ot.length];
  const ntVerse = data.nt[ntIndex % data.nt.length];

  container.innerHTML = '';

  const makeCard = (tag, verse) => {
    const card = document.createElement('div');
    card.className = 'verse-card';
    card.innerHTML = `
      <span class="verse-tag">${tag}</span>
      <p class="verse-text">„${verse.text}"</p>
      <p class="verse-ref">${verse.ref}</p>
    `;
    return card;
  };

  container.appendChild(makeCard(ui.tagOT, otVerse));
  container.appendChild(makeCard(ui.tagNT, ntVerse));
}

/* ─────────────────────────────────────────────
   Randomise — pick new indices, then render
   Called ONLY on page load and button click
───────────────────────────────────────────── */
async function randomise() {
  const data = await fetchVerses(currentTranslation);
  otIndex = randomIndex(data.ot);
  ntIndex = randomIndex(data.nt);
  renderCards();
}

/* ─────────────────────────────────────────────
   Translation <select> — populated per language
───────────────────────────────────────────── */
function buildTranslationSelect() {
  const sel = document.getElementById('trans-select');
  sel.innerHTML = '';

  const options = Object.entries(TRANSLATIONS)
    .filter(([, v]) => v.lang === currentLang);

  /* if current translation doesn't belong to new lang, reset */
  if (!TRANSLATIONS[currentTranslation] || TRANSLATIONS[currentTranslation].lang !== currentLang) {
    currentTranslation = options[0][0];
  }

  options.forEach(([key, meta]) => {
    const opt = document.createElement('option');
    opt.value    = key;
    opt.textContent = meta.label;
    opt.selected = key === currentTranslation;
    sel.appendChild(opt);
  });
}

/* ─────────────────────────────────────────────
   UI string refresh (date, button, labels)
───────────────────────────────────────────── */
function refreshUI() {
  const ui = UI[currentLang];
  document.getElementById('date-display').textContent = formatDate(currentLang);
  document.getElementById('btn-new').textContent      = ui.btnLabel;
  document.getElementById('label-lang').textContent   = ui.labelLang;
  document.getElementById('label-trans').textContent  = ui.labelTrans;
  document.documentElement.lang = currentLang;
}

/* ─────────────────────────────────────────────
   Event listeners
───────────────────────────────────────────── */
document.getElementById('lang-select').addEventListener('change', function () {
  currentLang = this.value;
  buildTranslationSelect();
  refreshUI();
  renderCards();   /* re-render same indices in new language — no new randomisation */
});

document.getElementById('trans-select').addEventListener('change', function () {
  currentTranslation = this.value;
  renderCards();   /* re-render same indices in new translation — no new randomisation */
});

document.getElementById('btn-new').addEventListener('click', randomise);

/* ─────────────────────────────────────────────
   Boot — randomise once on page load
───────────────────────────────────────────── */
buildTranslationSelect();
refreshUI();
randomise();
