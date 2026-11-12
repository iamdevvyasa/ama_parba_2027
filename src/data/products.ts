import type { PricingTier, Product } from "@/types";

/**
 * Product and pricing confirmed by the "Pricing & Order Workflow Update"
 * appended to the objective report. These figures supersede earlier drafts.
 *
 * Current pricing supplied for launch.
 */

export const products: Product[] = [
  {
    id: "standard",
    name: "The Ama Parba Box",
    tagline: "Thirteen cards. One Barsha (ବର୍ଷ) of Odisha.",
    description:
      "Thirteen illustrated festival cards, one for each parba we keep. Painted front, the month and its traditions on the back. Made to stand on a desk, be posted home, or be kept.",
    cardCount: 13,
    contents: [
      {
        count: 13,
        label: "Parba (ପର୍ବ) cards",
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
    price: { amount: 249, currency: "INR", note: "per box" },
    image: null,
  },
  {
    id: "customised",
    name: "The Ama Parba Box, Personalised",
    tagline: "Fourteen cards. The last one is Nijara (ନିଜର).",
    description:
      "Everything in the standard box, and one more card - designed around a date you give us. A birthday, an anniversary, the day someone came home. Your names, your occasion, your message.",
    cardCount: 14,
    badge: "Exclusive",
    contents: [
      {
        count: 13,
        label: "Parba (ପର୍ବ) cards",
        detail: "The complete Odisha collection, exactly as in the standard box.",
      },
      {
        count: 1,
        label: "Nijara (ନିଜର) special-date card",
        detail: "Designed around your date, occasion, names and message. Odia, English or both.",
      },
      {
        label: "Protective outer box",
        detail: "Printed sleeve and rigid box, packed by hand.",
      },
    ],
    price: { amount: 279, currency: "INR", note: "per box" },
    image: null,
  },
];

/**
 * Quantity tier calculation helpers.
 * Simple Box: 1-4: Rs 249/box | 5-9: Rs 219/box | 10+: Rs 199/box
 * Customised Box: 1-4: Rs 279/box | 5-9: Rs 229/box | 10+: Rs 219/box
 */
export function getStandardUnitPrice(qty: number): number {
  if (qty >= 10) return 199;
  if (qty >= 5) return 219;
  return 249;
}

export function getCustomisedUnitPrice(qty: number): number {
  if (qty >= 10) return 219;
  if (qty >= 5) return 229;
  return 279;
}

export function getStandardTierSavings(qty: number): number {
  const baseRate = 249;
  const currentRate = getStandardUnitPrice(qty);
  return (baseRate - currentRate) * qty;
}

export function getCustomisedTierSavings(qty: number): number {
  const baseRate = 279;
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
      price: { amount: 249, currency: "INR", note: "per box" },
    },
    {
      id: "standard-5",
      label: "For the family",
      quantity: "5 boxes",
      price: { amount: 219, currency: "INR", note: "per box" },
      saving: "Save Rs 150",
      badge: "Most popular",
      featured: true,
    },
    {
      id: "standard-10",
      label: "For everyone",
      quantity: "10 boxes",
      price: { amount: 199, currency: "INR", note: "per box" },
      saving: "Save Rs 500",
      badge: "Best value",
    },
  ],
  customised: [
    {
      id: "custom-1",
      label: "Single box",
      quantity: "1 box",
      price: { amount: 279, currency: "INR", note: "per box" },
    },
    {
      id: "custom-5",
      label: "For the family",
      quantity: "5 boxes",
      price: { amount: 229, currency: "INR", note: "per box" },
      saving: "Save Rs 250",
      badge: "Most popular",
      featured: true,
    },
    {
      id: "custom-10",
      label: "For everyone",
      quantity: "10 boxes",
      price: { amount: 219, currency: "INR", note: "per box" },
      saving: "Save Rs 600",
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
