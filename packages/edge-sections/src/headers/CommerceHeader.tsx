import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const CommerceHeader: React.FC<{ 
  logoUrl?: string; 
  siteName: string; 
  navLinks?: { label: string; href: string }[] 
}> = ({ logoUrl, siteName, navLinks = [] }) => {
  return (
    <header className="commerce-header border-b border-border bg-surface py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {logoUrl && <img src={logoUrl} alt={siteName} className="h-8 w-auto" />}
          <span className="text-xl font-bold">{siteName}</span>
        </div>
        <nav>
          <ul className="flex gap-6">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="text-text hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export const commerceHeaderMeta: SectionMeta = {
  category: "headers",
  variation: "commerce",
  verticals: ["retail"],
  required: true,
  singleton: true,
  recommendedOrder: 2,
};

export const CommerceHeaderConfig = {
  fields: {
    logoUrl: { type: "text" as const, label: "Logo URL" },
    siteName: { type: "text" as const, label: "Site Name" },
    navLinks: { 
      type: "array" as const, 
      label: "Nav Links",
      subFields: {
        label: { type: "text" as const, label: "Label" },
        href: { type: "text" as const, label: "Link" },
      }
    },
  },
  render: CommerceHeader,
  meta: commerceHeaderMeta,
};
