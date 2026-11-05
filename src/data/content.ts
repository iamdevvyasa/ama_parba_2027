import type {
  CustomerStory,
  FooterLinkGroup,
  GiftingAudience,
  NavItem,
  Occasion,
} from "@/types";

export const brand = {
  name: "Ama Parba",
  odiaName: "ଆମ ପର୍ବ",
  promise: "A little piece of Odisha, made personal.",
  positioning:
    "A little box of Odisha, filled with stories — and made personal for someone you love.",
} as const;

export const announcement = {
  // Placeholder: replace once the dispatch schedule is confirmed (report section 16).
  message: "Free delivery across India · Dispatch dates announced soon",
  href: "#collection",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Inside the Box", href: "#collection" },
  { label: "Pricing", href: "#pricing" },
  { label: "Personalise", href: "#personalise" },
  { label: "Gifting", href: "#gifting" },
  { label: "Stories", href: "#stories" },
];

export const hero = {
  eyebrow: "The Odisha Festival Card Collection",
  headline: ["Every Month Has a Story.", "Make It Yours."],
  supporting:
    "Thirteen celebrations. Countless memories. A little box of Odisha, made for you and the people you love.",
  primaryCta: { label: "Explore Collection", href: "#collection" },
  secondaryCta: { label: "Buy Now", href: "#pricing" },
  stats: [
    { value: "13", label: "Festival cards" },
    { value: "12", label: "Months of Odisha" },
    { value: "1", label: "Card that is only yours" },
  ],
} as const;

export const belonging = {
  eyebrow: "Why we made this",
  heading: "Some traditions never leave us.",
  lead: "You can move a thousand kilometres away. The calendar still finds you.",
  passages: [
    {
      id: "missed",
      text: "Raja came and went. You found out from a cousin's story, two days late, in a city where nobody tied a rope to a mango tree.",
    },
    {
      id: "watched",
      text: "You watched the chariots move on a screen held at arm's length. Everyone in the frame was somebody's family.",
    },
    {
      id: "kept",
      text: "A festival is not only a date. It is a grandmother's hand folding pitha, a street that smells of turmeric leaf, a house that fills up and empties again.",
    },
  ],
  closing:
    "So we put the year into thirteen cards. Not to replace the festival — to keep the date where you can see it.",
} as const;

export const festivalExplorer = {
  eyebrow: "The collection",
  heading: "Thirteen parba, one year.",
  lead: "Every card carries an original illustration, the festival's Odia name, its story and what is cooked for it. Browse the year below.",
} as const;

export const unboxing = {
  eyebrow: "Inside the box",
  heading: "Made to be opened slowly.",
  lead: "Printed, cut and packed by hand. What is confirmed is below — the rest we will publish once it is final rather than guess at it.",
} as const;

export const personalise = {
  eyebrow: "The signature card",
  heading: "A Date Worth Remembering.",
  lead: "Have a date that means something? Tell us the occasion and date when you order, and we will design one card around it — the fourteenth card in your box.",
  steps: [
    { step: "01", title: "Give us the date", detail: "The day itself, and what happened on it." },
    { step: "02", title: "Tell us the occasion", detail: "Birthday, anniversary, wedding — or something only you have a name for." },
    { step: "03", title: "Add the names", detail: "Who it is for, and a short message to go with it." },
    { step: "04", title: "Choose a style", detail: "Traditional, minimal, floral, festive — or let our illustrator decide." },
  ],
  cta: { label: "Personalise a card", href: "#gifting" },
  phaseNote: "The personalisation form opens with checkout in the next release.",
} as const;

export const occasions: Occasion[] = [
  { id: "birthday", title: "Birthday", description: "The day they arrived.", icon: "Cake", image: null },
  { id: "anniversary", title: "Anniversary", description: "Counted in years, felt in days.", icon: "Heart", image: null },
  { id: "wedding", title: "Wedding", description: "The date two families learned by heart.", icon: "Flower2", image: null },
  { id: "engagement", title: "Engagement", description: "The yes, before everything else.", icon: "Sparkles", image: null },
  { id: "housewarming", title: "Housewarming", description: "The first lamp in a new room.", icon: "Home", image: null },
  { id: "graduation", title: "Graduation", description: "The end of the long part.", icon: "GraduationCap", image: null },
  { id: "other", title: "Something else", description: "A date only your family would recognise.", icon: "CalendarHeart", image: null },
];

export const giftingAudiences: GiftingAudience[] = [
  {
    id: "parents",
    title: "Parents and family",
    line: "For the ones who taught you the dates.",
    body: "They kept every festival so you would know what to keep. Give the year back to them, printed.",
    image: null,
    span: "tall",
  },
  {
    id: "away",
    title: "Odias living away",
    line: "For everyone who misses Odisha without saying it.",
    body: "Bengaluru, Dubai, Berlin. A desk looks different with Rath Yatra standing on it.",
    image: null,
    span: "wide",
  },
  {
    id: "friends",
    title: "Friends",
    line: "For the group chat that only wakes up at Raja.",
    body: "The one gift nobody re-gifts, because it has their month in it.",
    image: null,
    span: "square",
  },
  {
    id: "someone-special",
    title: "Someone special",
    line: "For the person your year revolves around.",
    body: "Thirteen festivals, and a fourteenth card with the only date that matters to you both.",
    image: null,
    span: "square",
  },
  {
    id: "weddings",
    title: "Weddings and celebrations",
    line: "For a return gift guests will keep.",
    body: "A box at every seat, with your date printed on the card inside.",
    image: null,
    span: "wide",
  },
  {
    id: "corporate",
    title: "Corporate gifting",
    line: "For a team that is more Odia than it looks.",
    body: "New Year hampers that get used for twelve months. Bulk pricing and custom messages available on request.",
    image: null,
    span: "tall",
  },
];

/**
 * SAMPLE content. The brief forbids presenting invented testimonials as real.
 * Every entry carries `sample: true`, and the UI labels the whole section as
 * a sample layout until permissioned customer content is supplied.
 */
export const customerStories: CustomerStory[] = [
  {
    id: "story-1",
    name: "Sample story",
    handle: "@placeholder",
    location: "Bhubaneswar",
    quote: "Sample testimonial text. Replace with permissioned customer content before launch.",
    preview: "Unboxing",
    image: null,
    hasVideo: true,
    sample: true,
  },
  {
    id: "story-2",
    name: "Sample story",
    handle: "@placeholder",
    location: "Bengaluru",
    quote: "Sample testimonial text. Replace with permissioned customer content before launch.",
    preview: "First look",
    image: null,
    hasVideo: false,
    sample: true,
  },
  {
    id: "story-3",
    name: "Sample story",
    handle: "@placeholder",
    location: "Cuttack",
    quote: "Sample testimonial text. Replace with permissioned customer content before launch.",
    preview: "Gifting",
    image: null,
    hasVideo: true,
    sample: true,
  },
  {
    id: "story-4",
    name: "Sample story",
    handle: "@placeholder",
    location: "Dubai",
    quote: "Sample testimonial text. Replace with permissioned customer content before launch.",
    preview: "Sent home",
    image: null,
    hasVideo: false,
    sample: true,
  },
  {
    id: "story-5",
    name: "Sample story",
    handle: "@placeholder",
    location: "Sambalpur",
    quote: "Sample testimonial text. Replace with permissioned customer content before launch.",
    preview: "Nuakhai",
    image: null,
    hasVideo: true,
    sample: true,
  },
  {
    id: "story-6",
    name: "Sample story",
    handle: "@placeholder",
    location: "Pune",
    quote: "Sample testimonial text. Replace with permissioned customer content before launch.",
    preview: "Desk setup",
    image: null,
    hasVideo: false,
    sample: true,
  },
];

export const whyAmaParba = [
  {
    id: "illustrated",
    title: "Illustrated, not printed over a photo",
    body: "Every festival is drawn from scratch. No stock imagery, no filters over somebody else's photograph.",
  },
  {
    id: "verified",
    title: "Odia names, verified",
    body: "Each card carries the festival's Odia name set in a typeface built for the script — not a transliteration.",
  },
  {
    id: "keepsake",
    title: "Made to keep",
    body: "Thirteen cards that outlast the year they were printed for. Stand them, post them, or keep the set.",
  },
  {
    id: "personal",
    title: "One card only you have",
    body: "The personalised card turns a collection into a gift. Your date, your names, your occasion.",
  },
];

export const footerGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Festival Collection", href: "#collection" },
      { label: "Personalise a Card", href: "#personalise" },
      { label: "Pricing & Packs", href: "#pricing" },
      { label: "Bulk Gifting", href: "#gifting" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Replacement Policy", href: "#replacement-policy" },
      { label: "Shipping Policy", href: "#shipping-policy" },
      { label: "Privacy Policy", href: "#privacy-policy" },
    ],
  },
];

export const contactPlaceholders = {
  email: "amaparba84@gmail.com",
  phone: "+91 82493 99817",
  address: "",
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/ama_parba_.official?psln=MTFibnJtbGEzbHZ4NQ==",
    },
  ],
} as const;

export const faqs = [
  {
    q: "Why should I choose Ama Parba?",
    a: "Ama Parba brings traditional Odia culture and modern creativity together to make your festival wishes more personal and memorable.",
  },
  {
    q: "What is inside the box?",
    a: "Thirteen illustrated festival cards. The personalised box adds a fourteenth card designed around a date you give us. Card dimensions and paper stock are confirmed before launch.",
  },
  {
    q: "How does the personalised card work?",
    a: "Choose the personalised box, then give us the date, occasion, names and a short message. Our illustrator designs one card around it. The form opens with checkout in the next release.",
  },
  {
    q: "Can I customize the card in Odia?",
    a: "Yes! You can personalize your Ama Parba card with beautiful Odia text, traditional greetings, names, and heartfelt messages. We celebrate Odisha's culture and traditions through every design, making your festival wishes more meaningful and special.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery time depends on your location and the type of card you order. Once your order is confirmed, we will share the estimated delivery date with you. We always aim to deliver your happiness on time.",
  },
  {
    q: "Can I order for an office or an event?",
    a: "Yes. Bulk pricing starts at ten boxes, and larger orders can carry your own message. Get in touch for a quote.",
  },
];
