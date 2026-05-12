/**
 * Puck Config Factory - Minimal Version
 */

export interface EdgeRootProps {
  siteName: string;
  businessType: string;
  templateFamily: string;
}

export async function createEdgePuckConfig(ctx: any): Promise<any> {
  return {
    root: {
      fields: {
        siteName: { type: "text", label: "Site Name" },
        businessType: {
          type: "select",
          label: "Business Type",
          options: [
            { label: "Retail", value: "retail" },
            { label: "Service", value: "service" },
          ],
        },
      },
    },
    categories: [],
    components: {},
  };
}
