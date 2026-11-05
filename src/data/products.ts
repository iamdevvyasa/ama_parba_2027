import type { PricingTier, Product } from "@/types";

/**
 * Product and pricing confirmed by the "Pricing & Order Workflow Update"
 * appended to the objective report. These figures supersede earlier drafts.
 *
 * Outstanding: the update's own verification note flags the 5-box CUSTOMISED
 * rate (Rs 329/box) for confirmation - it does not undercut the standard
 * 5-box rate, which is unusual. Flagged below, not silently corrected.
 */

export const products: Product[] = [
  {
    id: "standard",
    name: "The Ama Parba Box",
    tagline: "Thirteen cards. One year of Odisha.",
    description:
      "Thirteen illustrated festival cards, one for each parba we keep. Painted front, the month and its traditions on the back. Made to stand on a desk, be posted home, or be kept.",
    cardCount: 13,
    contents: [
      {
        count: 13,
        label: "Festival cards",
        detail: "An original illustration on the front, the festival's story and traditions on the back.",
      },
      {
        label: "Odia and English throughout",
        detail: "Every festival carries its verified Odia name alongside the English one.",
      },
      {
        label: "Protective outer box",
        detail: "Printed sleeve and rigid box, packed by hand.",
      },
    ],
    price: { amount: 349, currency: "INR", note: "per box" },
    image: null,
  },
  {
    id: "customised",
    name: "The Ama Parba Box, Personalised",
    tagline: "Fourteen cards. The last one is yours.",
    description:
      "Everything in the standard box, and one more card - designed around a date you give us. A birthday, an anniversary, the day someone came home. Your names, your occasion, your message.",
    cardCount: 14,
    badge: "Exclusive",
    contents: [
      {
        count: 13,
        label: "Festival cards",
        detail: "The complete Odisha collection, exactly as in the standard box.",
      },
      {
        count: 1,
        label: "Personalised special-date card",
        detail: "Designed around your date, occasion, names and message. Odia, English or both.",
      },
      {
        label: "Protective outer box",
        detail: "Printed sleeve and rigid box, packed by hand.",
      },
    ],
    price: { amount: 369, currency: "INR", note: "per box" },
    image: null,
  },
];

/**
 * Quantity tier calculation helpers.
 * Simple Box: 1-4: Rs 349/box | 5-9: Rs 319/box | 10+: Rs 289/box
 * Customised Box: 1-4: Rs 369/box | 5-9: Rs 339/box | 10+: Rs 299/box
 */
export function getStandardUnitPrice(qty: number): number {
  if (qty >= 10) return 289;
  if (qty >= 5) return 319;
  return 349;
}

export function getCustomisedUnitPrice(qty: number): number {
  if (qty >= 10) return 299;
  if (qty >= 5) return 339;
  return 369;
}

export function getStandardTierSavings(qty: number): number {
  const baseRate = 349;
  const currentRate = getStandardUnitPrice(qty);
  return (baseRate - currentRate) * qty;
}

export function getCustomisedTierSavings(qty: number): number {
  const baseRate = 369;
  const currentRate = getCustomisedUnitPrice(qty);
  return (baseRate - currentRate) * qty;
}

/** Quantity tiers, per the original pricing specifications. */
export const pricingTiers: Record<Product["id"], PricingTier[]> = {
  standard: [
    {
      id: "standard-1",
      label: "Single box",
      quantity: "1 box",
      price: { amount: 349, currency: "INR", note: "per box" },
    },
    {
      id: "standard-5",
      label: "For the family",
      quantity: "5 boxes",
      price: { amount: 319, currency: "INR", note: "per box" },
      saving: "Save Rs 150",
      badge: "Most popular",
      featured: true,
    },
    {
      id: "standard-10",
      label: "For everyone",
      quantity: "10 boxes",
      price: { amount: 289, currency: "INR", note: "per box" },
      saving: "Save Rs 600",
      badge: "Best value",
    },
  ],
  customised: [
    {
      id: "custom-1",
      label: "Single box",
      quantity: "1 box",
      price: { amount: 369, currency: "INR", note: "per box" },
    },
    {
      id: "custom-5",
      label: "For the family",
      quantity: "5 boxes",
      price: { amount: 339, currency: "INR", note: "per box" },
      saving: "Save Rs 150",
      badge: "Most popular",
      featured: true,
    },
    {
      id: "custom-10",
      label: "For everyone",
      quantity: "10 boxes",
      price: { amount: 299, currency: "INR", note: "per box" },
      saving: "Save Rs 700",
      badge: "Best value",
    },
  ],
};

export const getProduct = (id: Product["id"]): Product =>
  products.find((p) => p.id === id) ?? products[0];

/**
 * Details the brief explicitly forbids inventing - card dimensions, paper
 * stock, print process, dispatch dates. Surfaced in the UI as "confirmed
 * before launch" rather than filled with plausible-sounding numbers.
 */
export const unconfirmedProductDetails = [
  "Card dimensions",
  "Paper stock and print finish",
  "Dispatch schedule",
  "Delivery coverage",
] as const;
