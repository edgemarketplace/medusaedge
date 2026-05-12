import React from "react";
import { EdgeSectionProps } from "../types";

export const CommerceHeader: React.FC<EdgeSectionProps> = ({
  siteName = "Store",
  logoUrl,
  navItems = [],
  primaryCtaLabel = "Shop Now",
  primaryCtaHref = "/shop",
  checkoutUrl,
  theme,
}) => {
  const bgColor = theme?.colors?.bg || "#ffffff";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const borderColor = theme?.colors?.border || "#dee2e6";
  
  // Use checkoutUrl if provided (from storefront), otherwise fall back to primaryCtaHref
  const finalCtaHref = checkoutUrl || primaryCtaHref;

  return (
    <header style={{ backgroundColor: bgColor, borderBottom: `1px solid ${borderColor}` }} className="px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoUrl && <img src={logoUrl} alt={siteName} className="h-8 w-auto" />}
          <span style={{ color: textColor, fontFamily: theme?.typography?.headingFont }} className="font-bold text-xl">
            {siteName}
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {(navItems || []).map((item: any, i: number) => (
            <a key={i} href={item.href} style={{ color: textColor }} className="hover:opacity-75">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={finalCtaHref}
          style={{ backgroundColor: theme?.colors?.primary, color: theme?.colors?.primaryContrast }}
          className="px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {primaryCtaLabel}
        </a>
      </div>
    </header>
  );
};

export const commerceHeaderMeta = {
  category: "headers",
  variation: "commerce",
  verticals: ["retail"],
  required: true,
  singleton: true,
  recommendedOrder: 1,
};

export default CommerceHeader;
