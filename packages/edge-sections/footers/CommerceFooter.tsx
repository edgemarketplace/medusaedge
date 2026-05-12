import React from "react";
import { EdgeSectionProps } from "../types";

export const CommerceFooter: React.FC<EdgeSectionProps> = ({
  siteName = "Store",
  description = "Your trusted retail destination",
  links = [],
  socialLinks = [],
  theme,
}) => {
  const bgColor = theme?.colors?.bg || "#ffffff";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";
  const borderColor = theme?.colors?.border || "#dee2e6";

  return (
    <footer style={{ backgroundColor: bgColor, borderTop: `1px solid ${borderColor}` }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 style={{ color: textColor, fontFamily: theme?.typography?.headingFont }} className="font-bold text-lg mb-4">
            {siteName}
          </h3>
          <p style={{ color: mutedColor }} className="text-sm">{description}</p>
        </div>
        {(links || []).map((group: any, i: number) => (
          <div key={i}>
            <h4 style={{ color: textColor }} className="font-medium mb-3">{group.title}</h4>
            <ul className="space-y-2">
              {(group.items || []).map((item: any, j: number) => (
                <li key={j}>
                  <a href={item.href} style={{ color: mutedColor }} className="text-sm hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 style={{ color: textColor }} className="font-medium mb-3">Follow Us</h4>
          <div className="flex gap-4">
            {(socialLinks || []).map((link: any, i: number) => (
              <a key={i} href={link.href} style={{ color: mutedColor }} className="hover:opacity-75">
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{ color: mutedColor, borderColor }}
        className="max-w-7xl mx-auto mt-8 pt-8 border-t text-center text-sm"
      >
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
};

export const commerceFooterMeta = {
  category: "footers",
  variation: "commerce",
  verticals: ["retail"],
  required: true,
  singleton: true,
  recommendedOrder: 7,
};

export default CommerceFooter;
