/**
 * AI Product Generation API
 * 
 * POST /api/ai-generate-products
 * Body: { siteId, businessDescription, businessType }
 * Returns generated products based on description
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteId, businessDescription, businessType = "retail" } = body;

    if (!businessDescription) {
      return NextResponse.json(
        { error: "Missing businessDescription" },
        { status: 400 }
      );
    }

    // Generate products based on business type and description
    // In production, this would call OpenAI API
    // For now, use template-based generation
    const products = generateProductsFromDescription(businessDescription, businessType);

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error("AI generate error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

function generateProductsFromDescription(description: string, businessType: string) {
  const lowerDesc = description.toLowerCase();
  const products = [];

  // Simple keyword-based generation
  if (businessType === "retail") {
    if (lowerDesc.includes("clothing") || lowerDesc.includes("apparel") || lowerDesc.includes("fashion")) {
      products.push(
        { name: "Classic T-Shirt", price: "$24.99", description: "Comfortable cotton t-shirt in various colors" },
        { name: "Denim Jeans", price: "$59.99", description: "Premium denim jeans with perfect fit" },
        { name: "Hoodie Sweatshirt", price: "$44.99", description: "Warm fleece hoodie for casual wear" }
      );
    } else if (lowerDesc.includes("electronics") || lowerDesc.includes("tech")) {
      products.push(
        { name: "Wireless Headphones", price: "$79.99", description: "Noise-canceling wireless headphones" },
        { name: "Smart Watch", price: "$199.99", description: "Feature-rich smartwatch with health tracking" },
        { name: "Portable Charger", price: "$29.99", description: "10000mAh power bank for on-the-go charging" }
      );
    } else {
      // Generic retail products
      products.push(
        { name: "Featured Product", price: "$49.99", description: "Our most popular item" },
        { name: "Best Seller", price: "$79.99", description: "Customer favorite product" },
        { name: "New Arrival", price: "$59.99", description: "Check out our latest addition" }
      );
    }
  } else if (businessType === "services") {
    products.push(
      { name: "Consultation Session", price: "$99.00", description: "1-hour professional consultation" },
      { name: "Premium Package", price: "$299.00", description: "Complete service package" },
      { name: "Starter Package", price: "$149.00", description: "Essential services to get started" }
    );
  } else {
    // Default
    products.push(
      { name: "Product 1", price: "$29.99", description: "Quality product for your needs" },
      { name: "Product 2", price: "$49.99", description: "Another great option" },
      { name: "Product 3", price: "$19.99", description: "Budget-friendly choice" }
    );
  }

  return products;
}

export const dynamic = "force-dynamic";
