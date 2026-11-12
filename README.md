# Ama Parba — Phase 1 Frontend

Premium cultural gifting storefront for the Odisha festival card collection.
The storefront includes Razorpay order creation and server-side payment
signature verification.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

Other scripts: `npm run build` (production build), `npm run typecheck`
(`tsc --noEmit`), `npm run lint`.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 3 ·
Framer Motion · GSAP (installed for Phase 2 scroll sequences) · Lucide icons.

Fonts load through `next/font/google`: **Fraunces** (display serif),
**Inter** (body), **Baloo Bhaina 2** (Odia script — the Latin fonts do not
carry the Odia block, so this one is required for `ଆମ ପର୍ବ` to render).

## Project structure

```
src/
  app/
    layout.tsx            Root layout, fonts, metadata, skip link
    page.tsx              Homepage section order
  components/
    layout/               AnnouncementBar, Header (+ mobile drawer), Logo, Footer
    home/                 Hero, Belonging, Personalise, Gifting,
                          WhyAmaParba, Stories, Faq, ClosingCta
    festivals/            FestivalExplorer, FestivalCard, CardArtwork
    products/             Collection (variants, contents, pricing tiers)
    ui/                   Button, SectionHeading, Reveal, Motif
  data/                   festivals.ts, products.ts, content.ts  ← all copy
  types/                  Shared content types
  lib/                    utils.ts (cn, formatINR), motion.ts (variants)
  styles/globals.css      Tokens, motif patterns, reduced-motion
tailwind.config.ts        Colour, type scale, spacing, shadow, motion tokens
```

All copy, pricing and festival content lives in `src/data`. No component
hard-codes a price, a name or a description.

## Design system

Tokens are defined once in `tailwind.config.ts` and mirrored as CSS custom
properties in `src/styles/globals.css`.

| Token | Value |
| --- | --- |
| Warm ivory | `#F8F3E9` (`ivory`) |
| Deep maroon | `#751F25` (`maroon`) |
| Muted saffron | `#D88945` (`saffron`) |
| Earthy brown | `#46362F` (`earth`) |
| Soft sage | `#7A8669` (`sage`) |

Type is a fluid `clamp()` scale (`text-fluid-xs` → `text-fluid-5xl`) — it
resizes continuously rather than stepping at breakpoints. Spacing uses
`px-gutter` and `py-section`, also fluid. Shadows are warm-tinted (neutral grey
reads cold against ivory). Motion uses two easings, `editorial` and `entrance`,
shared between CSS and Framer so both feel like one system.

### Odisha motifs

Drawn as CSS/SVG geometry in `globals.css` and `ui/Motif.tsx` — original
geometry inspired by temple friezes, ikat weaving and pata-chitra borders,
nothing traced from existing artwork. `.motif-band` (woven divider),
`.motif-ikat` (cross-hatch), `.motif-frieze` (arch repeat), `.motif-dots`,
plus `MotifRosette`, `MotifDivider` and `MotifShikhara` components.

## Placeholder assets — and how to replace them

No final artwork or photography was supplied, so Phase 1 ships **original
generated concept visuals**, each visibly labelled in the UI.

| Placeholder | Where | How to replace |
| --- | --- | --- |
| Festival card art | `festivals/CardArtwork.tsx` | Set `cardIllustration` on the festival in `data/festivals.ts`. `FestivalCard` then renders the image and bypasses the SVG entirely. |
| Packaging shot | `BoxMockup` in `home/Hero.tsx` | Replace that one component with the product photograph. |
| Customer stories | `data/content.ts` → `customerStories` | Replace the sample entries. Every entry carries `sample: true` and the section is labelled "awaiting permissioned customer content". |
| Occasion / gifting imagery | `data/content.ts` | `image` fields are `null`; tiles are typography-led and will accept images without layout change. |

`CardArtwork` picks one of six compositions by month index and recolours it
from the festival's own theme, so the rail reads as a varied set rather than
one card twelve times.

## Responsive and accessibility

Verified at 360, 430, 768, 1024, 1440 and 1536 px: **zero horizontal
overflow at every width**. Decorative elements that bleed off-edge are clipped
deliberately.

- Fluid type and spacing — no clipped headings at any width
- Touch targets at or above 44 px (`min-h` on every button)
- Skip-to-content link, visible `:focus-visible` rings, semantic landmarks
- Mobile drawer: Escape to close, scroll lock, focus moved to the close button
- FAQ uses native `<details>` — keyboard accessible with no JS
- `prefers-reduced-motion` honoured twice over: Framer's `useReducedMotion` in
  components, plus a global CSS override

## Content integrity

The brief forbids inventing business facts. Where something is not confirmed,
the UI says so instead of guessing:

- **Festival dates** are never rendered. Every entry is `status: "unconfirmed"`
  and the explorer shows the lunar-calendar disclaimer. The type makes a date
  unrenderable unless `status === "confirmed"`.
- **The thirteenth card** is not invented. The box holds 13 cards but the report
  names 12 festivals, so the rail closes with a "sealed until announced" card
  and `pendingThirteenthCard` in `data/festivals.ts` records why.
- **Product specifics** (dimensions, paper stock, print finish, dispatch,
  delivery coverage) are listed as "confirmed before launch".
- **Contact and legal details** are bracketed placeholders.
- **Testimonials** are visibly sample content.

## Pricing

From the "Pricing & Order Workflow Update" appended to the objective report,
which supersedes earlier drafts.

| Quantity | Standard | Customised |
| --- | --- | --- |
| 1 box | ₹249 | ₹279 |
| 5 boxes | ₹219 | ₹229 |
| 10 boxes | ₹199 | ₹219 |

Standard box = 13 festival cards. Customised box = 14 cards (13 + 1
personalised special-date card).

> Prices are supplied by the Ama Parba team and are used for both the website
> display and server-side Razorpay order amounts.

## Razorpay payments

Add these values to `.env.local` (never commit this file):

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_SECRET_ID=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
ADMIN_PASSWORD=use_a_long_random_admin_password
ADMIN_SESSION_SECRET=use_a_different_long_random_secret
```

Use the **Test** API keys while developing and switch to the **Live** keys
only in the production deployment environment. The secret is used only by the
server route and must never be exposed in client code. The payment buttons
create a Razorpay order through `src/app/api/payments/order/route.ts`, then
verify the returned signature through `src/app/api/payments/verify/route.ts`.
Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor before testing.
Customers enter delivery details before payment; paid orders appear at
`/admin`. The Supabase service-role key, admin password and session secret must
remain server-only and must never be committed.

In Razorpay Dashboard, create a webhook pointing to
`https://your-domain.example/api/payments/webhook`, use the same secret in
`RAZORPAY_WEBHOOK_SECRET`, and subscribe to `payment.captured`. The webhook
signature is verified against the raw request body and duplicate event IDs are
ignored.

## Ready for Phase 2

The data layer is already shaped for commerce: `Product`, `PricingTier` and
`Price` types exist, pricing tiers are keyed by variant, and the personalisation
steps and occasion list are typed data. Adding cart state, the special-date form
and checkout should not require restructuring components.

GSAP is installed but not yet driving anything — Phase 1 uses Framer Motion for
all reveals. The unboxing section is laid out so a ScrollTrigger timeline can be
attached without changing its markup.
