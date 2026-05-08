export const resolveMedusaBindings = async (section, sdk) => {
  const { source } = section;
  if (!source || source.provider !== 'medusa') return section;

  try {
    if (section.type === 'product-grid') {
      const { products } = await sdk.products.list({
        collection_id: [source.collection],
        limit: source.limit || 8
      });

      return {
        ...section,
        props: {
          ...section.props,
          products: products.map(p => ({
            id: p.id,
            title: p.title,
            thumbnail: p.thumbnail,
            price: p.variants?.[0]?.prices?.[0]?.amount 
              ? `$\${(p.variants[0].prices[0].amount / 100).toFixed(2)}`
              : "$0.00"
          }))
        }
      };
    }
  } catch (error) {
    console.error(`Medusa Hydration Error (\${section.type}):`, error);
  }

  return section;
};
