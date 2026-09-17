export type ResearchStatus = "unavailable" | "no_results" | "ready";
export type ResearchSectionStatus = ResearchStatus;
export type ResearchSectionKey =
  | "demand-signals"
  | "competition"
  | "customer-angle";
export type ResearchClaimKind = "sourced_fact" | "ai_analysis";

export type ResearchClaim = {
  id: string;
  text: string;
  kind: ResearchClaimKind;
  sourceIds: string[];
};

export type ResearchSource = {
  id: string;
  title: string;
  url: string;
};

export type ResearchSection = {
  key: ResearchSectionKey;
  title: string;
  status: ResearchSectionStatus;
  summary: string | null;
  claims: ResearchClaim[];
  sources: ResearchSource[];
};

export type ResearchResponse = {
  status: ResearchStatus;
  provider: "unavailable";
  query: string;
  note: string;
  sections: ResearchSection[];
};

export interface ResearchProvider {
  research(query: string): Promise<ResearchResponse>;
}