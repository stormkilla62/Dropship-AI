import type { ResearchProvider, ResearchResponse } from "./provider";

const unavailableSections = [
  {
    key: "demand-signals" as const,
    title: "Demand Signals",
  },
  {
    key: "competition" as const,
    title: "Competition",
  },
  {
    key: "customer-angle" as const,
    title: "Customer Angle",
  },
];

export class UnavailableResearchProvider implements ResearchProvider {
  async research(query: string): Promise<ResearchResponse> {
    return {
      status: "unavailable",
      provider: "unavailable",
      query,
      note:
        "Live research is unavailable until a research provider is connected. No web sources or AI analysis were used.",
      sections: unavailableSections.map((section) => ({
        ...section,
        status: "unavailable" as const,
        summary: null,
        claims: [],
        sources: [],
      })),
    };
  }
}

export const researchProvider: ResearchProvider =
  new UnavailableResearchProvider();