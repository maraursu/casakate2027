/** Change these whenever you share a new password with the group. */
export const SITE_PASSWORD = "farmtotable";
export const PLANNING_PASSWORD = "sammywaves";

export const SITE_UNLOCK_KEY = "kate-bach-site";
export const PLANNING_UNLOCK_KEY = "kate-bach-planning";

export const event = {
  honoree: "Kate",
  title: "casa kate",
  place: "Santa Rosa, California",
  dates: "March 25–28, 2027",
  start: "Thursday, March 25",
  end: "Sunday, March 28",
};

export type Venue = {
  listed: boolean;
  nearby?: boolean;
  name: string;
  where: string;
  fee: string;
  group: string;
  extra: string;
};

export type Beat = {
  time: string;
  title: string;
  detail: string;
  venues?: Venue[];
};

export const dinnerOptions: Venue[] = [
  {
    listed: true,
    name: "Lo + Behold",
    where: "Healdsburg · ~30 min",
    fee: "Casual plates, roughly $20–40. Not a tasting fee.",
    group:
      "7–10: call (707) 756-5021. 11+: email friends@loandbeholdca.com (form on their site).",
    extra: "Thu–Mon; closed Tue–Wed.",
  },
  {
    listed: true,
    name: "Lagniappe",
    where: "Healdsburg plaza · ~30 min",
    fee: "For 7+ they want a ~$70/person 4-course family-style. That's the large-party price.",
    group:
      "No private room — they just take the whole group. OpenTable goes up to the high teens. Call or email if we want  the prix fixe locked.",
    extra: "Heated patio.",
  },
  {
    listed: true,
    name: "The Madrona",
    where: "Healdsburg · ~30 min",
    fee: "Sit-down, special-occasion. Confirm the menu when we book — not a tasting fee.",
    group:
      "OpenTable lists up to 20. No private dining room. Call if we want a parlor / big table. Hotel events can go way bigger.",
    extra: "Brunch, lunch, or Saturday dinner.",
  },
  {
    listed: true,
    name: "The Matheson",
    where: "Healdsburg plaza",
    fee: "Dinner à la carte or tasting — confirm. Private rooms have their own menus.",
    group:
      "8+: Mezzanine loft or Roof 106. Email info@thematheson.com or (707) 723-1106.",
    extra: "Reservations open 2 months out.",
  },
  {
    listed: true,
    name: "Little Saint",
    where: "Healdsburg",
    fee: "Vegan, all-day. Event space has its own food-and-bev minimums if we go that route.",
    group:
      "Restaurant plus a huge event floor. Email for our size — this is one of the easier yeses for a big table.",
    extra: "Vegan. Event space available.",
  },
  {
    listed: true,
    name: "Hazel Hill",
    where: "Montage Healdsburg",
    fee: "Hotel restaurant, brunch/lunch/dinner. Private rooms priced separately.",
    group:
      "Oak Room seats ~14 (tight). Madrone Room ~10. For all of us: email mhbprivatedining@montage.com or (707) 955-7919 and ask them to combine.",
    extra: "Better as brunch unless they combine rooms.",
  },
  {
    listed: true,
    name: "Acorn Cafe",
    where: "Healdsburg plaza",
    fee: "Cafe prices. No tasting, no prix fixe.",
    group:
      "Over 8: reservations Mon–Fri only. Weekends are walk-in — skip for the whole group on Saturday/Sunday.",
    extra: "Weekends are walk-in. Not a group sit-down.",
  },
  {
    listed: true,
    name: "Quail & Condor",
    where: "Healdsburg",
    fee: "Bakery. Pay for pastry.",
    group: "Not a restaurant. No reservation for a big table. Grab and go.",
    extra: "Saturday pastry or Sunday to-go.",
  },
  {
    listed: true,
    name: "Diavola",
    where: "Geyserville · farther north",
    fee: "Pizza / Italian. Private rooms have their own fees.",
    group:
      "Resos Mon–Thu for 8+. Private dining up to ~15–20, patio buyout bigger. Sister bar Gun Club next door.",
    extra: "Geyserville only. Private events: diavolapizzeria.com.",
  },
  {
    listed: true,
    name: "Catelli's",
    where: "Geyserville · farther north",
    fee: "Italian, full bar. Event spaces have site fees.",
    group:
      "Garden / indoor rooms are plenty big. Email catellisevents@gmail.com or (707) 857-3471.",
    extra: "Geyserville only.",
  },
];

export const wineryOptions: Venue[] = [
  {
    listed: true,
    nearby: false,
    name: "Ryme",
    where: "Forestville · ~20 min · closest on our original list",
    fee: "Confirm on Tock — usually in the $25–40 range.",
    group: "Book the large-party tasting on Tock, or email. Do not walk everyone in.",
    extra: "Italian grapes. Closest listed winery to the Airbnb.",
  },
  {
    listed: true,
    nearby: false,
    name: "Lioco",
    where: "Healdsburg plaza tasting room",
    fee: "$40–$60 tasting. Food add-on can hit ~$75. $25 if you no-show inside 24 hours.",
    group:
      "Call (707) 395-0148 for a large group. Buyout is expensive; ask for a reserved block or two seatings.",
    extra: "Reservations recommended.",
  },
  {
    listed: true,
    nearby: false,
    name: "Martha Stoumen",
    where: "325 Center St, Healdsburg",
    fee: "Six-wine flight ~$40. Also by-the-glass.",
    group:
      "Walk-ins for small groups. Full group: email / (707) 473-8266.",
    extra: "Natural wine. Open later Fri/Sat.",
  },
  {
    listed: true,
    nearby: false,
    name: "BloodRoot",
    where: "Healdsburg tasting room (Reeve family)",
    fee: "Guided flight — confirm current price. Also glasses + snacks.",
    group:
      "More than 6: email info@bloodrootwines.com or (707) 387-7058. Open 1–7. No same-day reservations.",
    extra: "Chill downtown. Good if we split the plaza rooms.",
  },
  {
    listed: true,
    nearby: false,
    name: "Maison",
    where: "Healdsburg wine bar",
    fee: "Wine bar — glasses and bottles, not a tasting appointment.",
    group: "Call for a big group, or go in waves. Better as a nightcap than a tasting slot.",
    extra: "After dinner, or instead of a third winery.",
  },
  {
    listed: true,
    nearby: false,
    name: "Reeve",
    where: "4551 Dry Creek Rd, Healdsburg",
    fee: "Estate tasting, appointment. Confirm the number — not a cheap plaza pour.",
    group:
      "Email info@reevewines.com or (707) 235-6345. Intimate, so we may split or book private. Kids / energetic pets: no.",
    extra: "Same family as BloodRoot. Estate tasting.",
  },
  {
    listed: true,
    nearby: false,
    name: "Preston",
    where: "Dry Creek, Healdsburg",
    fee: "$35/person for 5–6 wines, 60–75 min, non-refundable.",
    group:
      "Standard tastings max 6 (kids count). Picnic tables max 8. Email tastingroom@prestonfarmandwinery.com — unless they custom it, this is probably a no for the whole group.",
    extra: "Farm store and picnic tables.",
  },
  {
    listed: true,
    nearby: false,
    name: "Aperture",
    where: "12291 Old Redwood Hwy, Healdsburg",
    fee: "Prepaid seated, often $50–75+. Private lounge with food is more. 48-hour cancel.",
    group:
      "More than 6: email hospitality@aperture-cellars.com or (707) 200-7891. Extra fees likely. 21+ only, no pets.",
    extra: "Possible if they quote a private tasting.",
  },
  {
    listed: true,
    nearby: false,
    name: "Flowers",
    where: "Healdsburg tasting (the coast vineyard is farther)",
    fee: "Healdsburg from $75; other experiences $130–$150.",
    group:
      "More than 6: email reservations@flowerswinery.com or (707) 723-4800. 21+ only. Book ahead.",
    extra: "The expensive option.",
  },
  {
    listed: false,
    nearby: true,
    name: "Matanzas Creek",
    where: "6097 Bennett Valley Rd · ~10–15 min · closest to the Airbnb",
    fee: "Hosted tasting $35 (5 wines). Library $55. Picnic / bottle service is a $25–$50 table fee, not a tasting.",
    group:
      "Online tastings up to 8; picnic/bocce up to 12. Larger: TastingRoom@matanzascreek.com or (707) 521-7019. Private groups up to 70.",
    extra: "Bennett Valley, same area as the Airbnb. Dogs/kids OK on picnic.",
  },
  {
    listed: false,
    nearby: true,
    name: "Balletto Vineyards",
    where: "5700 Occidental Rd, Santa Rosa · ~20 min",
    fee: "Estate seated $30 (5 wines, ~60 min). Other flights around $40.",
    group:
      "Standard cap is 10. Larger needs a yes + extra fee: tastingroom@ballettovineyards.com or (707) 568-2455 x101. Outdoor tables for 4–30. Strong Google reviews.",
    extra: "Family- and dog-friendly.",
  },
  {
    listed: false,
    nearby: true,
    name: "Kunde",
    where: "Kenwood · ~20–25 min southeast",
    fee: "Public tastings ~$25–$100. Private: barrel tour $45 (10 min), reserve $60, waterside $20 (10–30 people).",
    group:
      "8+ often 20% auto-gratuity. 10+: email tours@kunde.com or (707) 833-5501. Waterside 10–30 is our size. Google ~4.6, caves + views.",
    extra: "Sonoma Valley — south of 101.",
  },
  {
    listed: false,
    nearby: true,
    name: "Imagery Estate",
    where: "Glen Ellen / Sonoma Valley · ~25 min",
    fee: "Bar ~$25. Seated $35–$45. Large-group private $60/person (9–50 guests).",
    group:
      "9–50 private tasting. Call (707) 935-3000. Walk-ins for small groups.",
    extra: "Art gallery, bocce. Easy for a large group.",
  },
];

function named(list: Venue[], names: string[]) {
  return names
    .map((name) => list.find((item) => item.name === name))
    .filter((item): item is Venue => Boolean(item));
}

export const barOptions: Venue[] = [
  {
    listed: true,
    name: "John & Zeke's",
    where: "Healdsburg dive",
    fee: "Bar prices. No tasting fee.",
    group: "Walk-in. Go in waves if we're a mob.",
    extra: "Nightcap.",
  },
  {
    listed: true,
    name: "Gun Club",
    where: "Geyserville · farther north",
    fee: "Bar prices. Next to Diavola.",
    group: "If we're already north for dinner.",
    extra: "Sister bar to Diavola.",
  },
];

export const days: {
  key: string;
  name: string;
  date: string;
  label: string;
  color: string;
  beats: Beat[];
}[] = [
  {
    key: "thu",
    name: "Thursday",
    date: "March 25",
    label: "arrive and chill at house",
    color: "olive",
    beats: [
      {
        time: "Afternoon / evening",
        title: "Arrive at the Airbnb",
        detail: "Bennett Valley, Santa Rosa. Check in around Xpm.",
      },
      {
        time: "Night",
        title: "Pizza at the Airbnb",
        detail: "Dinner in. Parking on site.",
      },
    ],
  },
  {
    key: "fri",
    name: "Friday",
    date: "March 26",
    label: "hike and pool day",
    color: "butter",
    beats: [
      {
        time: "Morning",
        title: "Breakfast at the house",
        detail:
          "Put any preferences for food / coffee in the survey!!",
      },
      {
        time: "Morning",
        title: "Hike Healdsburg Ridge",
        detail: "Hike is ~30 min. Or stay at the Airbnb.",
      },
      {
        time: "Morning–afternoon",
        title: "Pool and house",
        detail:
          "Cards, games, crafts. Optional: Yoga on Center sound bath at the Airbnb.",
      },
      {
        time: "Night",
        title: "Dinner options",
        detail:
          "Email for the group. Confirm fees when booking. Maybe also a private chef at the house.",
        venues: [
          {
            listed: false,
            name: "Private chef at the house",
            where: "Airbnb",
            fee: "TBD — we split.",
            group: "Whole group. No restaurant cap.",
            extra: "Maybe. Not booked.",
          },
          ...named(dinnerOptions, [
            "Lo + Behold",
            "Lagniappe",
            "Little Saint",
            "The Madrona",
            "The Matheson",
          ]),
        ],
      },
      {
        time: "After dinner",
        title: "Bach game",
        detail: "At the Airbnb. Also possible: games, karaoke in the karaoke room.",
      },
    ],
  },
  {
    key: "sat",
    name: "Saturday",
    date: "March 27",
    label: "winery and out on the town",
    color: "sky",
    beats: [
      {
        time: "Morning",
        title: "Breakfast at the house",
        detail:
          "Put any preferences for food / coffee in the survey!!",
      },
      {
        time: "Day · pick 2–3",
        title: "Winery options",
        detail:
          "Listed wineries plus nearby spots with strong Google reviews. Large groups usually need email. Preston standard tasting max 6. Easiest large-party options near the Airbnb: Matanzas Creek, Imagery, Kunde, Balletto.",
        venues: wineryOptions,
      },
      {
        time: "Night",
        title: "Dinner options",
        detail:
          "Easier to eat in town after tastings. Geyserville only if already north.",
        venues: named(dinnerOptions, [
          "The Madrona",
          "The Matheson",
          "Little Saint",
          "Lo + Behold",
          "Lagniappe",
          "Diavola",
          "Catelli's",
        ]),
      },
      {
        time: "After dinner",
        title: "Dive bar options",
        detail: "If we're already out.",
        venues: named(barOptions, ["John & Zeke's", "Gun Club"]),
      },
      {
        time: "Later",
        title: "Bach game",
        detail: "At the Airbnb. Also possible: games, karaoke in the karaoke room.",
      },
    ],
  },
  {
    key: "sun",
    name: "Sunday",
    date: "March 28",
    label: "chill and leave",
    color: "cream",
    beats: [
      {
        time: "Morning",
        title: "Leave",
        detail:
          "South to SFO/OAK: skip Healdsburg.",
        venues: named(dinnerOptions, [
          "Acorn Cafe",
          "Quail & Condor",
          "Hazel Hill",
          "Little Saint",
          "The Madrona",
        ]),
      },
    ],
  },
];

export const airports = [
  {
    code: "STS",
    name: "Santa Rosa (Charles M. Schulz)",
    note: "Closest. Small airport; fares vary.",
  },
  {
    code: "OAK",
    name: "Oakland",
    note: "~1.5–2 hours depending on traffic.",
  },
  {
    code: "SFO",
    name: "San Francisco",
    note: "Most flights. Extra time for Thursday/Sunday traffic.",
  },
];

export const stay = {
  status: "Booked",
  name: "Seventies Club Med Style Retreat",
  address: "[HOUSE ADDRESS]",
  vibe: "Bennett Valley, Santa Rosa. 6 bedrooms, grotto pool, sunken living room.",
  area: "~15 min to Whole Foods and Santa Rosa.",
  airbnb:
    "https://www.airbnb.com/rooms/853725256010982545?check_in=2027-03-25&check_out=2027-03-28&guests=15&adults=16",
};

export const rooms = [
  {
    name: "Bedroom 1 · Master",
    sleeps: "King · 2",
    who: "Anne and Kerrin",
    notes: "Main house, upstairs. Shares the stone fireplace with the living room. Photo is the ensuite — the king is through that door.",
    photo: "/rooms/bedroom-1-master.jpeg",
  },
  {
    name: "Bedroom 2 · Queen + balcony",
    sleeps: "Queen · 2",
    who: "Marisa and Molly M.",
    notes: "Upstairs in the main house, balcony, orange wall.",
    photo: "/rooms/bedroom-2-queen-balcony.jpeg",
  },
  {
    name: "Bedroom 3 · Pool house",
    sleeps: "King · 2",
    who: "Kate and Mara",
    notes: "Separate guest/pool house. King bed, living room, steam shower and sauna.",
    photo: "/rooms/bedroom-3-poolhouse-king.jpeg",
  },
  {
    name: "Bedroom 4 · Two queens",
    sleeps: "2 queens · 4",
    who: "Gen, Jess, Claire, and Shelbi",
    notes: "Upstairs in the main house. Best for a four-person pile-in.",
    photo: "/rooms/bedroom-4-two-queens.jpeg",
  },
  {
    name: "Bedroom 5 · Downstairs queen",
    sleeps: "Queen · 2",
    who: "Chan and Molly G.",
    notes: "Ground floor of the main house, wood wall.",
    photo: "/rooms/bedroom-5-downstairs-queen.jpeg",
  },
  {
    name: "Bedroom 6 · Double + ensuite",
    sleeps: "Double · 2",
    who: "Lynn and Lily",
    notes: "Ground floor of the main house, its own bath. Cozy / yellow room.",
    photo: "/rooms/bedroom-6-double.jpeg",
  },
  {
    name: "Sunken living room",
    sleeps: "Air mattresses · 2",
    who: "Thea and Ali",
    notes: "No bedroom left. Two air mattresses.",
    photo: "/rooms/house-living.jpeg",
  },
];

export const packing = [
  {
    title: "Vineyards & town",
    items: [
      "Walking shoes (gravel + tasting rooms)",
      "Daytime clothes + one nicer look for Saturday dinner",
      "Jacket (March can be 55° and windy)",
      "Sunglasses, hat, SPF",
    ],
  },
  {
    title: "Pool & house",
    items: [
      "Swimsuit + cover-up",
      "Sandals",
      "Something cozy for patio mornings",
      "Reusable water bottle",
    ],
  },
  {
    title: "If you want",
    items: [
      "A bottle to share",
      "Disposable camera",
      "Snacks you want in the house",
    ],
  },
];

export const recs = [
  {
    title: "Cars & parking",
    body: "Parking at the Airbnb. Some people are driving — carpool from the survey times. A few cars for winery day. Uber is thin in the hills at night.",
  },
];

export const places = {
  note: "Airbnb is Bennett Valley. Drive times are approximate. Healdsburg is the main cluster; Geyserville is farther north.",
  groups: [
    {
      title: "Eat",
      items: [
        { name: "Lo + Behold", where: "Healdsburg · ~30 min", note: "Lunch or dinner. Friday energy." },
        { name: "Lagniappe", where: "Healdsburg · ~30 min", note: "French-ish farmhouse. Friday backup." },
        { name: "The Madrona", where: "Healdsburg · ~30 min", note: "Brunch, lunch, or a nicer Saturday." },
        { name: "The Matheson", where: "Healdsburg plaza", note: "Saturday dinner, plaza-adjacent." },
        { name: "Little Saint", where: "Healdsburg", note: "Vegan. Brunch or Saturday dinner." },
        { name: "Hazel Hill", where: "Montage Healdsburg", note: "Brunch / lunch if people go north Sunday." },
        { name: "Acorn Cafe", where: "Healdsburg plaza", note: "Brunch. First-come on weekends." },
        { name: "Quail & Condor", where: "Healdsburg", note: "Bakery. Saturday pastry or Sunday to-go." },
        { name: "Diavola", where: "Geyserville · farther", note: "Only if we're already north." },
        { name: "Catelli's", where: "Geyserville · farther", note: "Same — north add-on." },
      ],
    },
    {
      title: "Drink",
      items: [
        { name: "Ryme", where: "Forestville · ~20 min", note: "Closest on the original list." },
        { name: "Lioco", where: "Healdsburg tasting room", note: "Plaza." },
        { name: "Martha Stoumen", where: "Healdsburg tasting room", note: "Plaza. Book." },
        { name: "BloodRoot", where: "Healdsburg tasting room", note: "Plaza. Pick two of these three." },
        { name: "Maison", where: "Healdsburg wine bar", note: "Nightcap, not a tasting appointment." },
        { name: "Reeve", where: "Dry Creek", note: "Estate if we leave the plaza." },
        { name: "Preston", where: "Dry Creek", note: "Picnic energy — too small for all of us as a standard tasting." },
        { name: "Aperture", where: "Healdsburg", note: "Third stop if we're still standing." },
        { name: "Flowers", where: "Healdsburg or coast", note: "Pretty and pricey. Splurge only." },
        { name: "John & Zeke's", where: "Healdsburg dive", note: "Nightcap." },
        { name: "Gun Club", where: "Geyserville · farther", note: "With a Diavola/Catelli's loop." },
      ],
    },
    {
      title: "To do",
      items: [
        { name: "Sound bath", where: "Yoga on Center, or at the Airbnb", note: "Friday, if they come to us." },
        { name: "Baking class", where: "Parker Hill Provisions", note: "Reach out to Lisl. Only if we skip a slow Saturday start." },
        { name: "Healdsburg Ridge", where: "Healdsburg · ~30 min", note: "Friday morning — hike, or hang at the house." },
      ],
    },
  ],
};

export const expectedGuests = 15;

export const girls: {
  name: string;
  photo?: string;
  crop?: string;
  zoom?: number;
  bride?: boolean;
}[] = [
  { name: "Kate", photo: "/girls/kate.jpg", crop: "42% 42%", zoom: 1.05, bride: true },
  { name: "Mara", photo: "/girls/mara.jpg", crop: "48% 18%" },
  { name: "Lynn", photo: "/girls/lynn.jpg", crop: "50% 40%", zoom: 1.55 },
  { name: "Lily", photo: "/girls/lily.jpg", crop: "50% 28%", zoom: 1.5 },
  { name: "Thea", photo: "/girls/thea.jpg", crop: "50% 62%" },
  { name: "Ali", photo: "/girls/ali.jpg", crop: "50% 32%", zoom: 1.55 },
  { name: "Marisa", photo: "/girls/marisa.jpg", crop: "50% 30%", zoom: 1.6 },
  { name: "Kerrin", photo: "/girls/kerrin.jpg", crop: "88% 38%", zoom: 1.85 },
  { name: "Molly M.", photo: "/girls/molly.jpg", crop: "35% 42%" },
  { name: "Jess", photo: "/girls/jess.jpg", crop: "50% 42%" },
  { name: "Claire", photo: "/girls/claire.jpg", crop: "52% 62%", zoom: 1.55 },
  { name: "Gen", photo: "/girls/gen.jpg", crop: "40% 30%", zoom: 1.55 },
  { name: "Shelbi" },
  { name: "Chan" },
  { name: "Molly G." },
  { name: "Anne" },
];

export const costs = {
  how: "$200 house share if you're flying in, $300 if you live in California. Groceries and dinners extra. Venmo deposit, then true-up after.",
  lines: [
    {
      item: "House — out of town",
      estimate: "$200",
      note: "If you're flying in from another state!!! tysm for coming <3 ;)",
    },
    {
      item: "House — California",
      estimate: "$300",
    },
    {
      item: "House groceries and ordering in",
      estimate: "$20–30 / person",
    },
    {
      item: "Saturday tastings",
      estimate: "$40–80 / person",
    },
    {
      item: "Saturday dinner",
      estimate: "$75–120 / person",
    },
  ],
};

export const needs = [
  "Travel plans and dietary restrictions — survey on the welcome page.",
  "Must-dos or hard nos.",
];
