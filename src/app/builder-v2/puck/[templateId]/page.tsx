import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/styles.css";

// Sample data to prove it works
const initialData = {
  root: { props: {} },
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-1",
        headline: "THE FALL EDIT",
        subheadline: "Oversized silhouettes and tactile fabrics for the modern wardrobe.",
        ctaText: "SHOP THE LOOKBOOK",
        ctaHref: "#",
        backgroundImage: "https://placehold.co/1200x400/1a1a1a/ffffff",
      },
    },
    {
      type: "ProductGrid",
      props: {
        id: "products-1",
        title: "LATEST ARRIVALS",
        productCount: 3,
      },
    },
    {
      type: "Footer",
      props: {
        id: "footer-1",
        copyright: "© 2024 Studio Mode",
      },
    },
  ],
  zones: {},
};

const config = {
  components: {
    Hero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        ctaText: { type: "text" },
        ctaHref: { type: "text" },
        backgroundImage: { type: "text" },
      },
      render: ({ headline, subheadline, ctaText, ctaHref, backgroundImage }) => (
        <div 
          className="relative h-96 flex items-center justify-center bg-cover bg-center" 
          style={{ backgroundImage: `url(${backgroundImage || "https://placehold.co/1200x400"})` }}
        >
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{headline || "Hero Headline"}</h1>
            <p className="text-xl mb-8">{subheadline}</p>
            <a href={ctaHref || "#"} className="bg-white text-gray-900 px-8 py-3 font-semibold inline-block">
              {ctaText || "SHOP NOW"}
            </a>
          </div>
        </div>
      ),
    },

    ProductGrid: {
      fields: {
        title: { type: "text" },
        productCount: { type: "number" },
      },
      render: ({ title, productCount }) => (
        <div className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{title || "Latest Arrivals"}</h2>
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(productCount || 3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="bg-gray-200 h-48 mb-4 rounded"></div>
                <h3 className="font-semibold">Product Name</h3>
                <button className="mt-2 bg-gray-900 text-white px-4 py-2 text-sm w-full">ADD TO CART</button>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    Footer: {
      fields: {
        copyright: { type: "text" },
      },
      render: ({ copyright }) => (
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
              {copyright || "© 2024 Brand"}
            </div>
          </div>
        </footer>
      ),
    },
  },
};

export default function PuckEditorPage() {
  return (
    <div style={{ height: "100vh" }}>
      <Puck 
        config={config} 
        data={initialData}
        onPublish={(data) => {
          console.log("Published data:", data);
          alert("Data saved! Check console.");
        }}
      />
    </div>
  );
}
