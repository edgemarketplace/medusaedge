/**
 * Natural Language Business Intake API
 * 
 * POST /api/intake
 * Body: { description: string }
 * 
 * AI analyzes the text and returns:
 * - businessType (retail/service/food/artisan/event)
 * - extracted entities (name, location, services)
 * - recommended template
 * - starter root props
 */

import { NextRequest, NextResponse } from "next/server";

interface IntakeRequest {
  description: string;
}

interface IntakeResponse {
  businessType: "retail" | "service" | "food" | "artisan" | "event";
  businessName?: string;
  location?: string;
  services: string[];
  templateFamily: string;
  confidence: number;
  extractedInfo: {
    ownerName?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  starterRootProps: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description } = body as IntakeRequest;

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a longer business description (at least 10 characters)" },
        { status: 400 }
      );
    }

    // Analyze the business description
    const analysis = analyzeBusinessDescription(description);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Intake analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze business description" },
      { status: 500 }
    );
  }
}

function analyzeBusinessDescription(description: string): IntakeResponse {
  const lowerDesc = description.toLowerCase();

  // Default response
  const response: IntakeResponse = {
    businessType: "retail",
    services: [],
    templateFamily: "retail-core",
    confidence: 0.5,
    extractedInfo: {},
    starterRootProps: {
      checkoutMode: "native",
      currency: "USD",
      locale: "en-US",
      primaryCtaLabel: "Learn More",
    },
  };

  // ===== BUSINESS TYPE DETECTION =====
  
  // Service keywords
  const serviceKeywords = [
    "electrician", "plumber", "contractor", "remodel", "repair", "install",
    "service", "consulting", "consultant", "agency", "marketing", "design",
    "lawyer", "accountant", "therapist", "coach", "trainer", "tutor",
    "cleaning", "landscaping", "maintenance", "repair", "fix", "build",
    "renovation", "construction", "hvac", "handyman", "painter", "roofer",
  ];

  // Retail keywords
  const retailKeywords = [
    "store", "shop", "sell", "product", "clothing", "apparel", "fashion",
    "electronics", "gadget", "device", "furniture", "home decor", "retail",
    "boutique", "shop", "market", "merchandise", "inventory", "wholesale",
  ];

  // Food keywords
  const foodKeywords = [
    "restaurant", "cafe", "bakery", "catering", "food", "drink", "beverage",
    "chef", "cook", "meal", "delivery", "takeout", "dine", "eat",
  ];

  // Artisan keywords
  const artisanKeywords = [
    "art", "craft", "handmade", "artisan", "artist", "studio", "gallery",
    "pottery", "jewelry", "woodwork", "textile", "painting", "sculpture",
  ];

  // Event keywords
  const eventKeywords = [
    "event", "wedding", "party", "planning", "florist", "floral", "venue",
    "catering", "decoration", "celebration", "conference", "meeting",
  ];

  // Count matches for each type
  const serviceScore = serviceKeywords.filter(kw => lowerDesc.includes(kw)).length;
  const retailScore = retailKeywords.filter(kw => lowerDesc.includes(kw)).length;
  const foodScore = foodKeywords.filter(kw => lowerDesc.includes(kw)).length;
  const artisanScore = artisanKeywords.filter(kw => lowerDesc.includes(kw)).length;
  const eventScore = eventKeywords.filter(kw => lowerDesc.includes(kw)).length;

  // Determine business type
  const scores = [
    { type: "service" as const, score: serviceScore },
    { type: "retail" as const, score: retailScore },
    { type: "food" as const, score: foodScore },
    { type: "artisan" as const, score: artisanScore },
    { type: "event" as const, score: eventScore },
  ];

  scores.sort((a, b) => b.score - a.score);
  const topScore = scores[0].score;
  
  if (topScore > 0) {
    response.businessType = scores[0].type;
    response.confidence = Math.min(0.5 + (topScore * 0.1), 0.95);
  }

  // ===== TEMPLATE FAMILY MAPPING =====
  const templateMap: Record<string, string> = {
    "service": "service-pro",
    "retail": "retail-core",
    "food": "food-catering",
    "artisan": "artisan-market",
    "event": "event-floral",
  };
  response.templateFamily = templateMap[response.businessType] || "retail-core";

  // ===== EXTRACT LOCATION =====
  const locationMatch = lowerDesc.match(/(?:in|at|near|serving)\s+([a-z\s]+)(?:,|\.|$)/i);
  if (locationMatch) {
    response.location = locationMatch[1].trim();
  }

  // ===== EXTRACT BUSINESS NAME =====
  // Look for patterns like "owned by [Name]", "I'm [Name]", "[Name] here"
  const namePatterns = [
    /(?:i'm|i am|this is)\s+([a-z\s]+)(?:\s+(?:and|here|,|\.|$))/i,
    /(?:owned by|run by|from)\s+([a-z\s]+)(?:\s+(?:and|here|,|\.|$))/i,
    /^([a-z\s]+)(?:\s+is\s+(?:a|an|my|our))/i,
  ];
  
  for (const pattern of namePatterns) {
    const match = description.match(pattern);
    if (match) {
      response.extractedInfo.ownerName = match[1].trim();
      break;
    }
  }

  // ===== EXTRACT SERVICES =====
  const servicePhrases = [
    "specialize in", "specializing in", "focus on", "focused on",
    "offer", "providing", "do", "handle",
  ];

  for (const phrase of servicePhrases) {
    const idx = lowerDesc.indexOf(phrase);
    if (idx !== -1) {
      const after = lowerDesc.substring(idx + phrase.length);
      const endPunct = after.search(/[.,;]/);
      const serviceText = endPunct === -1 ? after : after.substring(0, endPunct);
      response.services = serviceText.split(/,|and/).map(s => s.trim()).filter(s => s.length > 2);
      break;
    }
  }

  // ===== STARTER ROOT PROPS =====
  const siteName = extractBusinessName(description);
  response.starterRootProps = {
    siteName: siteName || "My Business",
    businessType: response.businessType,
    templateFamily: response.templateFamily,
    stylePreset: getDefaultStylePreset(response.businessType),
    colorScheme: "default",
    typographyPreset: "balanced",
    primaryCtaLabel: response.businessType === "service" ? "Get a Quote" : "Shop Now",
    primaryCtaHref: response.businessType === "service" ? "#quote" : "/checkout",
    checkoutMode: response.businessType === "service" ? "quote-only" : "native",
    currency: "USD",
    locale: "en-US",
    seoTitle: `${siteName || "My Business"} - ${response.businessType === "service" ? "Professional Services" : "Online Store"}`,
    seoDescription: `${siteName || "My Business"} - ${description.substring(0, 150)}`,
  };

  return response;
}

function extractBusinessName(description: string): string | undefined {
  // Look for "I'm [Name]" or "This is [Business Name]"
  const patterns = [
    /I'm\s+([A-Z][A-Za-z\s]+?)(?:\s+(?:and|here|,|\.|$))/,
    /I am\s+([A-Z][A-Za-z\s]+?)(?:\s+(?:and|here|,|\.|$))/,
    /([A-Z][A-Za-z\s]+?)\s+is\s+(?:a|an|my|our)\s+/,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

function getDefaultStylePreset(businessType: string): string {
  const presets: Record<string, string> = {
    "service": "professional-agency",
    "retail": "modern-commerce",
    "food": "boutique-luxury",
    "artisan": "creative-studio",
    "event": "boutique-luxury",
  };
  return presets[businessType] || "modern-commerce";
}

export const dynamic = "force-dynamic";
