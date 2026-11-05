import type { Festival } from "@/types";

/**
 * The twelve festivals named in the objective report (section 9).
 *
 * Dates: every entry is "unconfirmed". Odia festival dates follow the lunar
 * calendar and shift each year; the report requires edition-specific dates to
 * be verified before publishing, so the UI shows a disclaimer instead.
 *
 * Imagery: `festivalImage` and `cardIllustration` are null until final artwork
 * is supplied. Components render a themed illustrated placeholder, so dropping
 * real assets in later is a one-line change per festival.
 */
export const festivals: Festival[] = [
  {
    id: "makar-sankranti",
    month: "January",
    monthIndex: 1,
    name: "Makar Sankranti",
    odiaName: "ମକର ସଂକ୍ରାନ୍ତି",
    date: { status: "unconfirmed" },
    shortDescription: "The first harvest, sweetened and shared.",
    story:
      "The year turns and the sun begins its northward walk. In Odia homes the new rice is not cooked but soaked - grated coconut, jaggery, banana and chhena folded cold into makara chaula, offered first and eaten after. Outside, the sky fills with paper and string.",
    significance:
      "Marks the sun's passage into Capricorn and the start of the harvest calendar. The first grain of the season is offered before it is eaten.",
    traditionalFood: ["Makara chaula", "Til laddu", "Rasagola"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#F3E7D0", ink: "#7A4A12", accent: "#D88945" },
  },
  {
    id: "basanta-panchami",
    month: "February",
    monthIndex: 2,
    name: "Basanta Panchami",
    odiaName: "ବସନ୍ତ ପଞ୍ଚମୀ",
    date: { status: "unconfirmed" },
    shortDescription: "Yellow everywhere, and books put down for a day.",
    story:
      "Saraswati arrives in schools and para pandals, and for one morning every student in Odisha is dressed in yellow. Books and instruments are laid at her feet - nobody studies today, that is the rule. The khechudi comes late and nobody minds.",
    significance:
      "Dedicated to Saraswati, goddess of learning. Children are often taught to write their first letters on this day.",
    traditionalFood: ["Khechudi", "Kheeri", "Bundia"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#FBF0CE", ink: "#8A6A10", accent: "#E0A93C" },
  },
  {
    id: "dola-purnima",
    month: "March",
    monthIndex: 3,
    name: "Dola Purnima",
    odiaName: "ଦୋଳ ପୂର୍ଣ୍ଣିମା",
    date: { status: "unconfirmed" },
    shortDescription: "The deities come out, and the colour begins.",
    story:
      "Dolagobinda leaves the temple and is carried through the village on a decorated swing, stopping at every doorstep. Phagu - dry colour - is thrown over the palanquin and over everyone near it. The village walks with him until the colour has run out.",
    significance:
      "Odisha's Holi, centred on the swing procession of Dolagobinda rather than on bonfires. Each village hosts the deity in turn.",
    traditionalFood: ["Phagu", "Malpua", "Kheeri"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#F7DCD9", ink: "#8C2A31", accent: "#C8475C" },
  },
  {
    id: "pana-sankranti",
    month: "April",
    monthIndex: 4,
    name: "Pana Sankranti",
    odiaName: "ପଣା ସଂକ୍ରାନ୍ତି",
    date: { status: "unconfirmed" },
    shortDescription: "The Odia new year, poured cold.",
    story:
      "Bela pana - wood apple, jaggery, milk, black pepper, a little curd - is made in the morning and given to anyone who passes. A clay pot hangs above the tulsi with a hole in its base, dripping water through the hottest weeks, so nothing stands thirsty. The year starts by giving something to drink.",
    significance:
      "Maha Bisuba Sankranti, the Odia New Year. Also observed as the start of summer's first full heat.",
    traditionalFood: ["Bela pana", "Dahi pakhala", "Chhatua"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#E8EEDC", ink: "#44532F", accent: "#7A8669" },
  },
  {
    id: "akshaya-tritiya",
    month: "May",
    monthIndex: 5,
    name: "Akshaya Tritiya",
    odiaName: "ଅକ୍ଷୟ ତୃତୀୟା",
    date: { status: "unconfirmed" },
    shortDescription: "First seed in the field, first axe to the chariot wood.",
    story:
      "Farmers sow a ceremonial first handful before the real sowing begins. On the same day, in Puri, the carpenters cut the first timber for the chariots - Rath Yatra starts two months before anyone sees a wheel. Two beginnings, one morning.",
    significance:
      "Considered a day on which nothing begun is diminished. Both the agricultural year and chariot construction are inaugurated.",
    traditionalFood: ["Pana", "Chhena poda", "Sweet pitha"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#F6E9D1", ink: "#8A5A1E", accent: "#CE8A3A" },
  },
  {
    id: "raja-parba",
    month: "June",
    monthIndex: 6,
    name: "Raja Parba",
    odiaName: "ରଜ ପର୍ବ",
    date: { status: "unconfirmed" },
    shortDescription: "Three days when the earth rests, and so does everyone.",
    story:
      "Ropes go up in the mango trees and stay there for three days. No one digs, no one ploughs - the earth is said to be resting and is left alone. Girls wear new saris, feet painted with alata, and the poda pitha is passed around under the swing until it is finished.",
    significance:
      "Celebrates the earth's fertility and womanhood. Agricultural work is suspended entirely for three days.",
    traditionalFood: ["Poda pitha", "Manda pitha", "Arisa pitha"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#E6E9D5", ink: "#4E5A31", accent: "#8A9658" },
  },
  {
    id: "rath-yatra",
    month: "July",
    monthIndex: 7,
    name: "Rath Yatra",
    odiaName: "ରଥଯାତ୍ରା",
    date: { status: "unconfirmed" },
    shortDescription: "The one day the gods come down to the road.",
    story:
      "Three chariots stand on the Bada Danda, taller than the houses beside them. The Gajapati sweeps the platform with a golden broom - the king, sweeping. Then the ropes are taken up and the whole street pulls, and for a few hours nobody on that road is a stranger.",
    significance:
      "Jagannath, Balabhadra and Subhadra travel from the temple to Gundicha. The one occasion when darshan requires no entry at all.",
    traditionalFood: ["Khaja", "Poda pitha", "Mahaprasad"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#F6DCCB", ink: "#8C2A31", accent: "#D4502F" },
  },
  {
    id: "gamha-purnima",
    month: "August",
    monthIndex: 8,
    name: "Gamha Purnima",
    odiaName: "ଗହ୍ମା ପୂର୍ଣ୍ଣିମା",
    date: { status: "unconfirmed" },
    shortDescription: "A thread on the wrist, and horns painted bright.",
    story:
      "Sisters tie rakhi, and in the same morning the cattle are washed, their horns oiled and coloured, garlands put on them. The bullocks that worked the field all year are fed first and rested. Balabhadra's birthday - the farmer's god, the elder brother.",
    significance:
      "Combines Rakhi Purnima with Gamha, a thanksgiving to cattle, and marks the appearance day of Balabhadra.",
    traditionalFood: ["Gamha pitha", "Mudhi", "Kheeri"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#EFE5D3", ink: "#6B5120", accent: "#C09040" },
  },
  {
    id: "nuakhai",
    month: "September",
    monthIndex: 9,
    name: "Nuakhai",
    odiaName: "ନୂଆଖାଇ",
    date: { status: "unconfirmed" },
    shortDescription: "The new rice, eaten together or not at all.",
    story:
      "Western Odisha waits for the nua - the first rice of the season - to be offered to Samaleswari before a single grain is eaten at home. The hour is announced in advance so that everyone eats at the same time. Then juhar: the younger touch the feet of the elder, and whatever was carried from last year is set down.",
    significance:
      "The agrarian new year of western Odisha. Families return home for it the way others return for Durga Puja.",
    traditionalFood: ["Nua anna", "Arisa pitha", "Kheeri"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#EFEBD2", ink: "#5E5A20", accent: "#A79A3E" },
  },
  {
    id: "durga-puja",
    month: "October",
    monthIndex: 10,
    name: "Durga Puja",
    odiaName: "ଦୁର୍ଗା ପୂଜା",
    date: { status: "unconfirmed" },
    shortDescription: "Four nights of light, and a moon to finish.",
    story:
      "The pandals go up street by street and the city stops sleeping. Cuttack's silver filigree catches every bulb pointed at it. Then Kumar Purnima closes the month - young women fast, look for the full moon in a plate of water, and play puchi in the courtyard until it rises.",
    significance:
      "Odisha's largest public celebration, closing with Kumar Purnima - a harvest moon festival observed chiefly by young women.",
    traditionalFood: ["Khechudi", "Chhena jhili", "Chanda powder"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#F5DBD6", ink: "#7A1F2A", accent: "#C4414F" },
  },
  {
    id: "bali-jatra",
    month: "November",
    monthIndex: 11,
    name: "Bali Jatra",
    odiaName: "ବାଲିଯାତ୍ରା",
    date: { status: "unconfirmed" },
    shortDescription: "Paper boats for the ships that went to Bali.",
    story:
      "On Kartika Purnima, before light, boats of cork and banana stem carry a lamp and a coin onto the Mahanadi. Aa ka ma boi, the children sing. Once, real ships left this coast for Java and Bali and Sumatra, and the women stood at the river counting them out. The counting never stopped.",
    significance:
      "Boita Bandana commemorates Odisha's maritime trade with Southeast Asia. Cuttack's fair on the Gadagadia Ghat is among the largest in India.",
    traditionalFood: ["Boita pitha", "Thunka puri", "Dahi bara aloo dum"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#DCE4E2", ink: "#2F4A52", accent: "#5D8089" },
  },
  {
    id: "prathamastami",
    month: "December",
    monthIndex: 12,
    name: "Prathamastami",
    odiaName: "ପ୍ରଥମାଷ୍ଟମୀ",
    date: { status: "unconfirmed" },
    shortDescription: "A whole festival for the eldest child.",
    story:
      "Enduri pitha is steamed in turmeric leaf - the smell is the festival. The eldest child sits, is given new clothes, and the mother and aunts wave the lamp and drop mustard and husk into the fire for a long life. No other state keeps a day only for the first-born.",
    significance:
      "Observed for the firstborn child's long life and wellbeing, with enduri pitha as the day's defining offering.",
    traditionalFood: ["Enduri pitha", "Haladi patra pitha", "Kheeri"],
    festivalImage: null,
    cardIllustration: null,
    theme: { base: "#E7EBD6", ink: "#4A5526", accent: "#879453" },
  },
];

/**
 * The box holds 13 standard festival cards, but the report names only 12
 * festivals and section 16 flags the count as a decision still to be made.
 * We model the gap explicitly instead of inventing a thirteenth festival.
 * `isPending` keeps it out of the customer-facing carousel.
 */
export const pendingThirteenthCard = {
  id: "festival-13",
  isPending: true as const,
  internalNote:
    "Standard box contains 13 cards; the objective report names 12 festivals. " +
    "Thirteenth festival awaiting client confirmation (report section 16, 'Product contents'). " +
    "Add it to the `festivals` array once confirmed - no component changes needed.",
};

export const festivalDateDisclaimer =
  "Odia festival dates follow the lunar calendar and shift each year. Edition dates are confirmed before each collection goes to print.";

export const getFestivalById = (id: string): Festival | undefined =>
  festivals.find((f) => f.id === id);
