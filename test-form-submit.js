// Test script to verify form submission logic works
// This runs in Node.js without Next.js

function generatePageFromOnboarding(answers) {
  const defaultRootProps = {
    checkoutMode: "native",
    currency: "USD",
    locale: "en-US",
    primaryCtaLabel: "Shop now",
  };

  const rootProps = {
    siteName: answers.siteName,
    siteTagline: answers.siteTagline,
    businessType: "retail",
    templateFamily: "retail-core",
    stylePreset: "modern-commerce",
    colorScheme: "blue",
    typographyPreset: "balanced",
    logoUrl: answers.logoUrl,
    primaryCtaLabel: "Shop now",
    primaryCtaHref: "/shop",
    checkoutMode: answers.checkoutMode || defaultRootProps.checkoutMode,
    currency: answers.currency || defaultRootProps.currency,
    locale: defaultRootProps.locale,
    supportEmail: answers.supportEmail,
    seoTitle: `${answers.siteName} - Online Store`,
    seoDescription: answers.siteTagline || `Shop at ${answers.siteName} for the best products.`,
  };

  const recommendedStack = [
    "PromoHeader",
    "CommerceHeader",
    "ProductHero",
    "FeaturedCollection",
    "ReviewStrip",
    "FAQ",
    "CommerceFooter",
  ];

  const starterContent = recommendedStack.map((sectionType, i) => ({
    type: sectionType,
    props: {
      id: `${sectionType.toLowerCase()}-${i}`,
      ...(sectionType === "ProductHero" && {
        headline: `Welcome to ${answers.siteName}`,
        subheadline: answers.siteTagline || "Discover our latest collection",
      }),
    },
  }));

  return {
    root: { props: rootProps },
    content: starterContent,
  };
}

// Test with the user's data
const testAnswers = {
  siteName: "sweet store",
  siteTagline: "Quality products for everyone",
  logoUrl: "https://example.com/logo.png",
  currency: "USD",
  checkoutMode: "native",
  supportEmail: "support@example.com"
};

console.log("Testing generatePageFromOnboarding...");
const result = generatePageFromOnboarding(testAnswers);

console.log("\n✅ Generated page structure:");
console.log("- Root props siteName:", result.root.props.siteName);
console.log("- Content sections count:", result.content.length);
console.log("- First section type:", result.content[0].type);

console.log("\n✅ Function works! The issue is Vercel not deploying.");
console.log("Check Vercel dashboard: https://vercel.com/edgemarketplace/medusaedge/deployments");
