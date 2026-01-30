// Shared Makłowicz video clips config — single source of truth for both EN and PL article pages
export type MaklowiczClip = {
  youtube_id: string;
  timestamp: number;
  label: { en: string; pl: string };
  quote: string; // Always in Polish (original Makłowicz quotes)
};

export const MAKLOWICZ_CLIPS: Record<string, MaklowiczClip[]> = {
  restaurants: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 922,
      label: {
        en: "Maklowicz explores Valletta's restaurants",
        pl: "Makłowicz odkrywa restauracje Valletty",
      },
      quote: "Kuchnia maltańska to najlepszy sposób, żeby zrozumieć historię tej wyspy.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 1964,
      label: {
        en: "Maklowicz tastes fenek (rabbit) in Rabat",
        pl: "Makłowicz próbuje fenka (królika) w Rabacie",
      },
      quote: "Królik po maltańsku to nie tylko danie — to akt buntu i smak wolności.",
    },
  ],
  beaches: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1048,
      label: {
        en: "Maklowicz sails to Gozo & Comino",
        pl: "Makłowicz płynie na Gozo i Comino",
      },
      quote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
    },
  ],
  sightseeing: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 40,
      label: {
        en: "Maklowicz discovers Valletta's history",
        pl: "Makłowicz odkrywa historię Valletty",
      },
      quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu.",
    },
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 1867,
      label: {
        en: "Inside St John's Co-Cathedral with Caravaggio",
        pl: "Wewnątrz Konkatedry św. Jana z Caravaggio",
      },
      quote: "Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 926,
      label: {
        en: "Maklowicz enters Mdina — The Silent City",
        pl: "Makłowicz wchodzi do Mdiny — Cichego Miasta",
      },
      quote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
    },
  ],
  transport: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1048,
      label: {
        en: "Taking the ferry to Gozo",
        pl: "Prom na Gozo",
      },
      quote: "Płyniemy na Gozo. Nie jest to specjalnie wycieńczający rejs, bo trwa około 25 minut.",
    },
  ],
  accommodation: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 926,
      label: {
        en: "Maklowicz stays in a Mdina palazzo",
        pl: "Makłowicz w pałacu w Mdinie",
      },
      quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować.",
    },
  ],
  gozo: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1048,
      label: {
        en: "Maklowicz arrives on Gozo",
        pl: "Makłowicz przybywa na Gozo",
      },
      quote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
    },
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1364,
      label: {
        en: "Exploring the Citadella fortress",
        pl: "Odkrywanie twierdzy Cytadela",
      },
      quote: "Z Cytadeli widać całe Gozo jak na dłoni.",
    },
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1567,
      label: {
        en: "Gozitan food & Victoria market",
        pl: "Kuchnia Gozo i rynek w Victorii",
      },
      quote: "Gozo to wyspa, gdzie jedzenie nadal smakuje tak, jak powinno — prosto, uczciwie, z serca.",
    },
  ],
  events: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 2570,
      label: {
        en: "Maklowicz experiences Mdina at night",
        pl: "Makłowicz doświadcza Mdiny nocą",
      },
      quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować — cisza, światło i wieczność w kamieniu.",
    },
  ],
  tips: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 425,
      label: {
        en: "Maklowicz's tip: rest at Upper Barrakka",
        pl: "Porada Makłowicza: odpoczynek w Upper Barrakka",
      },
      quote: "Rozsądny zwiedzający powinien co jakiś czas przycupnąć, a do tego przycupnięcia wybierać miejsca, w których siedząc również można zwiedzać.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: {
        en: "The essential pastizzi experience",
        pl: "Obowiązkowe pastizzi",
      },
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju.",
    },
  ],
  prices: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: {
        en: "Pastizzi — Malta's €0.50 street food",
        pl: "Pastizzi — maltańskie street food za €0,50",
      },
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju.",
    },
  ],
  // Makłowicz-themed article topics (deeper dives)
  valletta: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 40,
      label: {
        en: "Maklowicz walks through Valletta",
        pl: "Makłowicz spaceruje po Valletcie",
      },
      quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu.",
    },
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 425,
      label: {
        en: "Upper Barrakka Gardens",
        pl: "Upper Barrakka Gardens",
      },
      quote: "Rozsądny zwiedzający powinien co jakiś czas przycupnąć.",
    },
  ],
  mdina: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 926,
      label: {
        en: "Maklowicz enters the Silent City",
        pl: "Makłowicz wchodzi do Cichego Miasta",
      },
      quote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 2570,
      label: {
        en: "Mdina at night",
        pl: "Mdina nocą",
      },
      quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować.",
    },
  ],
  caravaggio: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 1867,
      label: {
        en: "Caravaggio at St John's Co-Cathedral",
        pl: "Caravaggio w Konkatedrze św. Jana",
      },
      quote: "Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki.",
    },
  ],
  cuisine: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: {
        en: "Pastizzi — Malta's culinary icon",
        pl: "Pastizzi — ikona kuchni maltańskiej",
      },
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 1964,
      label: {
        en: "Fenek — Maltese rabbit stew",
        pl: "Fenek — królik po maltańsku",
      },
      quote: "Królik po maltańsku to nie tylko danie — to akt buntu i smak wolności.",
    },
  ],
  knights: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 700,
      label: {
        en: "The Grand Master's Palace",
        pl: "Pałac Wielkiego Mistrza",
      },
      quote: "Rycerze Maltańscy to jedni z najciekawszych graczy w historii Europy.",
    },
  ],
  birgu: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 79,
      label: {
        en: "Maklowicz discovers Birgu",
        pl: "Makłowicz odkrywa Birgu",
      },
      quote: "Birgu to miejsce, gdzie rycerze maltańscy naprawdę mieszkali — zanim zbudowali Vallettę.",
    },
  ],
  wine: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1567,
      label: {
        en: "Wine & local produce on Gozo",
        pl: "Wino i lokalne produkty na Gozo",
      },
      quote: "Gozo to wyspa, gdzie jedzenie nadal smakuje tak, jak powinno.",
    },
  ],
  history: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 40,
      label: {
        en: "7,000 years of Malta's history",
        pl: "7000 lat historii Malty",
      },
      quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu.",
    },
  ],
  fortifications: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 700,
      label: {
        en: "Valletta's fortifications",
        pl: "Fortyfikacje Valletty",
      },
      quote: "Te mury pamiętają Wielkie Oblężenie — i do dziś stoją niewzruszenie.",
    },
  ],
  catacombs: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 701,
      label: {
        en: "St. Paul's Catacombs — early Christian burial",
        pl: "Katakumby św. Pawła — wczesnochrześcijańskie pochówki",
      },
      quote: "Katakumby Świętej Agaty, datowane na okres pomiędzy II a V wiekiem.",
    },
  ],
  stpaul: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 679,
      label: {
        en: "St. Paul's Bay — the shipwreck legend",
        pl: "Zatoka św. Pawła — legenda o rozbiciu",
      },
      quote: "Zatoki Świętego Pawła — nazwa dotyczy nie tylko zatoki, ale również miasta.",
    },
  ],
  pastizzi: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: {
        en: "The pastizzi revolution",
        pl: "Rewolucja pastizzi",
      },
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju.",
    },
  ],
  fenek: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 1964,
      label: {
        en: "Fenek — rabbit as rebellion",
        pl: "Fenek — królik jako bunt",
      },
      quote: "Królik po maltańsku to nie tylko danie — to akt buntu i smak wolności.",
    },
  ],
};

/** Get clips for a topic in a specific language */
export function getClipsForTopic(
  topic: string,
  lang: "en" | "pl"
): { youtube_id: string; timestamp: number; label: string; quote: string }[] {
  const clips = MAKLOWICZ_CLIPS[topic];
  if (!clips) return [];
  return clips.map((c) => ({
    youtube_id: c.youtube_id,
    timestamp: c.timestamp,
    label: c.label[lang],
    quote: c.quote,
  }));
}
