/**
 * Polish translations for maklowicz_stops data.
 * The DB stores English descriptions/location names; this map provides Polish overrides.
 * Keyed by English location_name (exact match from DB).
 */

interface StopTranslation {
  location_name_pl: string;
  description_pl: string;
  episode_pl: string;
  /** Fallback cover image if DB has none */
  fallback_cover_image?: string;
  /** Polish article slug for this stop */
  article_slug: string;
}

/** English article slug mapping (keyed by English location_name) */
export const MAKLOWICZ_EN_SLUGS: Record<string, string> = {
  "Valletta - Old Town": "en-valletta-following-maklowicz",
  "St. John's Co-Cathedral": "en-st-johns-co-cathedral",
  "Grand Master's Palace": "en-grand-masters-palace",
  "Upper Barrakka Gardens": "en-upper-barrakka-best-view",
  "Valletta Restaurants": "en-maltese-cuisine-complete-guide",
  "Birgu (Vittoriosa)": "en-birgu-vittoriosa-hidden-gem",
  "St. Paul's Bay": "en-st-pauls-bay-apostle",
  "Gozo Ferry Terminal (Cirkewwa)": "en-ferry-to-gozo",
  "Gozo - Victoria (Rabat)": "en-victoria-gozo-capital",
  "Citadella (Gozo)": "en-citadella-gozo-fortress",
  Rabat: "en-rabat-quiet-town",
  "St. Paul's Catacombs": "en-st-pauls-catacombs",
  "Pastizzi Shop in Rabat": "en-pastizzi-malta-street-food",
  "Mdina - The Silent City": "en-mdina-silent-city",
  "Restaurant in Rabat": "en-fenek-maltese-rabbit",
  "Mdina by Night": "en-mdina-night-wine-silence",
};

export const MAKLOWICZ_PL: Record<string, StopTranslation> = {
  "Valletta - Old Town": {
    location_name_pl: "Valletta — Stare Miasto",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl:
      "Makłowicz rozpoczyna swoją maltańską podróż w twierdzy stołecznej Valletty, założonej przez Wielkiego Mistrza Jeana de Valette po Wielkim Oblężeniu w 1565 roku. Spaceruje ulicą Republiki, podziwia budynki z miodowego wapienia i przedstawia Maltę jako skrzyżowanie, gdzie arabskie, normańskie, aragońskie i brytyjskie wpływy zderzają się na każdym talerzu i w każdym kamieniu.",
    article_slug: "pl-valletta-sladami-maklowicza",
  },
  "St. John's Co-Cathedral": {
    location_name_pl: "Współkatedra św. Jana",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl:
      "Za zwodniczo prostą fasadą kryje się jedno z najbardziej zapierających dech w piersiach barokowych wnętrz w Europie. Makłowicz zachwyca się arcydziełem Caravaggia 'Ścięcie św. Jana Chrzciciela' — największym obrazem, jaki artysta kiedykolwiek namalował i jedynym, który podpisał. Podłoga wyłożona jest 400 marmurowymi płytami nagrobnymi Kawalerów z całej Europy.",
    article_slug: "pl-konkatedra-sw-jana",
  },
  "Grand Master's Palace": {
    location_name_pl: "Pałac Wielkiego Mistrza",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl:
      "Siedziba władzy 21 kolejnych Wielkich Mistrzów Zakonu Kawalerów św. Jana, ten pałac jest dziś rezydencją Prezydenta Malty. Makłowicz przechodzi przez Sale Reprezentacyjne i Zbrojownię — jedną z największych kolekcji średniowiecznej broni na świecie, z ponad 5000 eksponatami broni i zbroi z XVI–XVIII wieku.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    article_slug: "pl-palac-wielkiego-mistrza",
  },
  "Upper Barrakka Gardens": {
    location_name_pl: "Ogrody Górnej Barrakki",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl:
      "Z tych eleganckich arkadowych ogrodów Makłowicz pokazuje nam najbardziej ikoniczny widok na Malcie — Wielki Port, Trzy Miasta i Fort św. Anioła lśniący w śródziemnomorskim słońcu. Ogląda południowy strzał z armaty, tradycję sięgającą czasów kolonii brytyjskiej, i zastanawia się, jak ten port kształtował historię Morza Śródziemnego przez tysiąclecia.",
    article_slug: "pl-upper-barrakka-najlepszy-widok",
  },
  "Valletta Restaurants": {
    location_name_pl: "Restauracje w Valletcie",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl:
      "Makłowicz odkrywa scenę restauracyjną Valletty, od skromnych pastizzerii po eleganckie winiarnie. Próbuje kapunatę — maltańską kuzynkę ratatouille z bakłażana, oliwek i kaparów — i tłumaczy, jak kuchnia maltańska łączy sycylijską hojność, arabskie przyprawy i brytyjski pragmatyzm. Punkt kulminacyjny: tradycyjny maltański talerz z suszonymi pomidorami, bigillą (pasta z bobu), serem gbejniet i lokalnymi oliwkami.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    article_slug: "pl-kuchnia-maltanska-kompletny-przewodnik",
  },
  "Birgu (Vittoriosa)": {
    location_name_pl: "Birgu (Vittoriosa)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl:
      "Przeprawiając się przez Wielki Port tradycyjną łodzią dghajsa, Makłowicz dociera do Birgu — pierwotnej siedziby Kawalerów św. Jana, starszej od Valletty o kilkadziesiąt lat. Wędruje wąskimi, klimatycznymi uliczkami najstarszego ufortyfikowanego miasta na Malcie, odwiedza Pałac Inkwizytora (jeden z zaledwie trzech zachowanych na świecie) i odkrywa miasto, które czas potraktował łagodniej niż jego słynną sąsiadkę.",
    article_slug: "pl-birgu-vittoriosa-ukryta-perla",
  },
  "St. Paul's Bay": {
    location_name_pl: "Zatoka św. Pawła",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl:
      "Makłowicz podąża śladem Apostoła Pawła, którego statek rozbił się u wybrzeży Malty w 60 roku naszej ery. Według tradycji Paweł przeżył ukąszenie żmii, uzdrowił ojca rzymskiego namiestnika i osobiście nawrócił Maltańczyków na chrześcijaństwo podczas swojego trzymiesięcznego pobytu. Zatoka nazwana jego imieniem jest dziś tętniącym życiem kurortem, ale spuścizna świętego wpleciona jest w każdy aspekt maltańskiej tożsamości.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2ead1?w=800&q=80",
    article_slug: "pl-st-pauls-bay-swiety-pawel",
  },
  "Gozo Ferry Terminal (Cirkewwa)": {
    location_name_pl: "Terminal Promowy na Gozo (Ċirkewwa)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl:
      "Makłowicz wsiada na prom na Gozo z północno-zachodniego krańca Malty w Ċirkewwie. Dwudziestopięciominutowa przeprawa oferuje zapierające dech widoki na wyspę Comino i słynną Błękitną Lagunę. Opisuje Gozo jako 'to, czym Malta była pięćdziesiąt lat temu' — zieleńsze, cichsze i bardziej tradycyjne. Napięcie rośnie, gdy wapienne klify Gozo stają się coraz bliższe.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1602519060498-d761efde0086?w=800&q=80",
    article_slug: "pl-prom-na-gozo",
  },
  "Gozo - Victoria (Rabat)": {
    location_name_pl: "Gozo — Victoria (Rabat)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl:
      "W uroczej stolicy Gozo Makłowicz zanurza się w kulinarnych tradycjach wyspy. Odwiedza kryty targ, gdzie rolnicy sprzedają świeże produkty, próbuje ręcznie robionej kiełbasy gozitańskiej i lokalnego sera owczego (gbejniet), po czym zasiada w tradycyjnej restauracji do miecznika w sosie pomidorowym z czarnymi oliwkami — dania, które doskonale oddaje fuzję morza i lądu na Gozo.",
    article_slug: "pl-victoria-stolica-gozo",
  },
  "Citadella (Gozo)": {
    location_name_pl: "Cytadela (Gozo)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl:
      "Wspinając się na ufortyfikowaną koronę Gozo, Makłowicz zwiedzał starożytną Cytadelę — naturalną twierdzę zamieszkaną od ponad 5000 lat. Wchodzi do Katedry Wniebowzięcia, której sufit to mistrzowski trompe l'oeil (planowana kopuła nigdy nie powstała z braku funduszy). Z murów obronnych rozciąga się widok na całą wyspę — tarasowe wzgórza, kopulaste kościoły i błękitne Morze Śródziemne we wszystkich kierunkach.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1599922407878-c3483cba5640?w=800&q=80",
    article_slug: "pl-cytadela-gozo-twierdza",
  },
  Rabat: {
    location_name_pl: "Rabat",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl:
      "Wracając na główną wyspę, Makłowicz odkrywa Rabat — miasto okalające mury starożytnej Mdiny. Odwiedza wspaniały klasztor dominikanów ze światowej klasy kolekcją obrazów barokowych (w tym dzieła Mattii Pretiego), zwiedza Willę Rzymską z pięknymi podłogami mozaikowymi i rozpoczyna poszukiwania idealnych pastizzi — ukochanych maltańskich ciastek z ciasta francuskiego.",
    article_slug: "pl-rabat-ciche-miasteczko",
  },
  "St. Paul's Catacombs": {
    location_name_pl: "Katakumby św. Pawła",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl:
      "Schodząc pod ulice Rabatu, Makłowicz wchodzi do jednego z najwspanialszych wczesnochrześcijańskich stanowisk w Europie — katakumb z III wieku naszej ery, gdzie pierwsi maltańscy chrześcijanie chowali swoich zmarłych. Podziemne komnaty ciągną się labiryntem połączonych pomieszczeń, z kamiennymi stołami, przy których żałobnicy urządzali uczty pogrzebowe. Tradycja głosi, że sam św. Paweł nauczał w tych jaskiniach podczas pobytu na Malcie.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1569587112025-0d460e81a126?w=800&q=80",
    article_slug: "pl-katakumby-swietego-pawla",
  },
  "Pastizzi Shop in Rabat": {
    location_name_pl: "Sklep z Pastizzi w Rabacie",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl:
      "Makłowicz znajduje to, czego szukał — autentyczny sklep z pastizzi, gdzie chrupiące, diamentowe ciastka wypiekane są świeżo przez cały dzień. Próbuje obu odmian: rikotta (z ricottą) i piżelli (z musem z groszku) i ogłasza je jednym z wielkich ulicznych dań kuchni śródziemnomorskiej. Za zaledwie 50 centów pastizzi to demokratyczne jedzenie Malty — jedzone zarówno przez robotników budowlanych, jak i ministrów.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    article_slug: "pl-pastizzi-street-food-malty",
  },
  "Mdina - The Silent City": {
    location_name_pl: "Mdina — Ciche Miasto",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl:
      "Wchodząc przez wspaniałą barokową bramę, Makłowicz wkracza do Mdiny — 'Cichego Miasta' i dawnej stolicy Malty, położonej na wzgórzu i otoczonej średniowiecznymi murami. W obrębie murów nie wolno jeździć samochodami (tylko mieszkańcy), co tworzy niemal nadprzyrodzoną ciszę. Odkrywa wąskie uliczki otoczone arystokratycznymi pałacami, odwiedza średniowieczną katedrę i znajduje butikowy hotel w przebudowanym normańskim palazzo. Mdina o zmierzchu, jak mówi, to najbardziej klimatyczne miejsce na Malcie.",
    article_slug: "pl-mdina-ciche-miasto",
  },
  "Restaurant in Rabat": {
    location_name_pl: "Restauracja w Rabacie",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl:
      "Na swój ostatni maltański posiłek Makłowicz zasiada do narodowego dania wyspy — fenku (królika), wolno duszonego w bogatym sosie z wina, czosnku i pomidorów. Tłumaczy, że królik jest dla Malty tym, czym pierogi dla Polski — daniem definiującym narodowe podniebienie. Przepis sięga wieków wstecz, pierwotnie kłusowany z prywatnych łowisk Kawalerów przez zbuntowanych rolników. Królikowa rewolucja, jak zauważa Makłowicz z uśmiechem, była jednym z pierwszych aktów niepodległości Malty.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    article_slug: "pl-fenek-krolik-maltanski",
  },
  "Mdina by Night": {
    location_name_pl: "Mdina nocą",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl:
      "Gdy zapada zmrok, Makłowicz wraca do Mdiny na ostatnią, magiczną sekwencję. Ciche Miasto naprawdę zasługuje na swoją nazwę po zmroku — wąskie uliczki oświetlone są kutymi latarniami, kroki odbijają się echem od wapienianych ścian, a miasto odsłania swoje najbardziej romantyczne oblicze. Z bastionów migoczą światła Malty, a Morze Śródziemne rozciąga się ciemne i nieskończone aż po horyzont. To idealne zakończenie niezapomnianej podróży po 7000 lat historii, wiary i jedzenia na wyspie.",
    fallback_cover_image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    article_slug: "pl-mdina-noca-wino-cisza",
  },
};

/** Fallback cover images for stops missing them in the DB (keyed by English location_name) */
export const STOP_FALLBACK_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(MAKLOWICZ_PL)
    .filter(([, v]) => v.fallback_cover_image)
    .map(([k, v]) => [k, v.fallback_cover_image!])
);
