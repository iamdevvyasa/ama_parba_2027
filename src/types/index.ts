/** Shared content types. All site copy is typed and lives in src/data. */

export type Month =
  | "January" | "February" | "March" | "April" | "May" | "June"
  | "July" | "August" | "September" | "October" | "November" | "December";

/**
 * How much we actually know about a festival date.
 * Dates are never rendered unless status is "confirmed" — the brief forbids
 * publishing unverified festival dates.
 */
export type DateStatus = "confirmed" | "unconfirmed";

export interface FestivalDate {
  status: DateStatus;
  /** ISO date, present only when status is "confirmed". */
  iso?: string;
  /** Human label, e.g. "14 January 2027". Present only when confirmed. */
  label?: string;
  year?: number;
}

export interface ColourTheme {
  /** Card background. */
  base: string;
  /** Headline / primary ink on the card. */
  ink: string;
  /** Accent for rules, dots and small marks. */
  accent: string;
}

export interface Festival {
  id: string;
  month: Month;
  /** 1–12, used for ordering. */
  monthIndex: number;
  name: string;
  /** Verified Odia name. Leave empty rather than transliterating by guess. */
  odiaName: string;
  date: FestivalDate;
  shortDescription: string;
  story: string;
  significance: string;
  traditionalFood: string[];
  /** Photographic imagery for the festival. null until supplied. */
  festivalImage: ImageAsset | null;
  /** The illustrated card artwork. null until supplied. */
  cardIllustration: ImageAsset | null;
  theme: ColourTheme;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True while this is a development stand-in, not final artwork. */
  placeholder?: boolean;
}

export type ProductVariant = "standard" | "customised";

export interface Product {
  id: ProductVariant;
  name: string;
  tagline: string;
  description: string;
  /** Total cards in the box. */
  cardCount: number;
  contents: ProductContent[];
  /**
   * Pricing is not confirmed in the brief we hold. `null` renders as
   * "Pricing to be announced" rather than an invented number.
   */
  price: Price | null;
  badge?: string;
  image: ImageAsset | null;
}

export interface ProductContent {
  label: string;
  detail: string;
  /** Quantity shown as a numeral beside the label. */
  count?: number;
}

export interface Price {
  amount: number;
  currency: "INR";
  note?: string;
}

export interface PricingTier {
  id: string;
  label: string;
  quantity: string;
  price: Price | null;
  saving?: string;
  badge?: string;
  featured?: boolean;
}

export interface Occasion {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: ImageAsset | null;
}

export interface GiftingAudience {
  id: string;
  title: string;
  line: string;
  body: string;
  image: ImageAsset | null;
  /** Drives the editorial gallery's varied composition. */
  span: "tall" | "wide" | "square";
}

export interface CustomerStory {
  id: string;
  name: string;
  handle?: string;
  location: string;
  quote: string;
  preview: string;
  image: ImageAsset | null;
  hasVideo: boolean;
  /** Sample content flag — never present sample stories as real reviews. */
  sample: true;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}
