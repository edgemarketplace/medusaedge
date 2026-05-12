import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const CommerceFooter: React.FC<{
  siteName: string;
  description?: string;
  links?: { label: string; href: string }[];
  socialLinks?: { platform: string; href: string }[];
}> = ({ siteName, description, links = [], socialLinks = [] }) => {
  return (
    <footer className="commerce-footer border-t border-border bg-surface py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">{siteName}</h3>
            {description && <p className="text-muted text-sm">{description}</p>}
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              {links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href} className="text-muted hover:text-primary">
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const commerceFooterMeta: SectionMeta = {
  category: "footers",
  variation: "commerce",
  verticals: ["retail"],
  required: true,
  singleton: true,
  recommendedOrder: 8,
};

export const CommerceFooterConfig = {
  fields: {
    siteName: { type: "text" as const, label: "Site Name" },
    description: { type: "text" as const, label: "Footer Description" },
    links: {
      type: "array" as const,
      label: "Footer Links",
      subFields: {
        label: { type: "text" as const, label: "Label" },
        href: { type: "text" as const, label: "Link" },
      }
    },
    socialLinks: {
      type: "array" as const,
      label: "Social Links",
      subFields: {
        platform: { type: "text" as const, label: "Platform" },
        href: { type: "text" as const, label: "Link" },
      }
    },
  },
  render: CommerceFooter,
  meta: commerceFooterMeta,
};
