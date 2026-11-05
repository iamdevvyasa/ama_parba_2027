import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium tracking-tightish " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-base ease-editorial " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-ivory shadow-soft hover:bg-maroon-600 hover:shadow-lift",
  secondary:
    "border border-earth/25 bg-transparent text-earth-900 hover:border-maroon/50 hover:bg-maroon/[0.04]",
  ghost: "text-maroon hover:bg-maroon/[0.06]",
  onDark:
    "border border-ivory/30 bg-ivory/5 text-ivory backdrop-blur-sm hover:border-ivory/60 hover:bg-ivory/10",
};

const sizes: Record<Size, string> = {
  // min-h keeps every button at or above a 44px touch target.
  sm: "min-h-[40px] px-4 text-fluid-xs",
  md: "min-h-[46px] px-6 text-fluid-sm",
  lg: "min-h-[54px] px-7 text-fluid-sm xs:px-8",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: never;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href) {
    const { href, ...linkProps } = rest as { href: string };
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
