import { ObjectId } from "mongodb";
import { APIResponse } from "./api.js";
import { ReformedGeocoderGeometry } from "./google.js";
export type StimType =
  | "Zoning"
  | "Planning"
  | "New Developments"
  | "Incentives"
  | "Infrastructure"
  | "Population Growth"
  | "Macro-Economic"
  | "Litigation"
  | "Property Assessments";

type ApprStatus = "approved" | "pending" | "cancelled";

type Influence = {
  weight: number;
  rationale: string;
};

export type MarketInfluenceLevels = "Emerging" | "Transitional" | "Dormant";
export type StimWeights = Record<StimType, Influence>;
export type ServerSideLocationObject = {
  upperLocale: string | undefined;
  localeKey: string;
  geometry: ReformedGeocoderGeometry;
};

//Response from ChatGPT/Claude/etc... but also a type for Stim without the location index for Mongo Geospatial Search
export type LLMStim = {
  title: string;
  desc: string;
  date: Date;
  coordinates: [number, number];
  apprStatus: ApprStatus;
  stimType: StimType;
  url: string;
  dirtIndex: number;
};

//For UI display
export type StimCard = {
  title: string;
  date: Date;
  stimType: StimType;
  address: string;
  apprStatus: ApprStatus;
  dirtIndex: number;
};

export type StimWithId = LLMStim & { _id: ObjectId | string };

export type LLMStimuli = LLMStim[];
export type StimuliWithIds = StimWithId[];
/*Data coming directly from LLM, needs to be changed:

1. stimuli property needs to have localeKey prop 
2. timestamp added

*/
export type LLMStimuliData = {
  rationale: string;
  longRationale: string[];
  stimuli: LLMStimuli;
};

export type StimuliData = {
  timestamp: Date;
  locale: {
    localeKey: string;
    upperLocale?: string;
  };
  rationale: string;
  longRationale: string[];
  stimuli: LLMStimuli;
  averageDirt: number;
};

export type StimuliDataWithIds = {
  timestamp: Date;
  locale: {
    localeKey: string;
    upperLocale?: string;
  };
  rationale: string;
  longRationale: string[];
  stimuli: StimuliWithIds;
  averageDirt: number;
};

export type TerroMarketData = {
  stimuliData: StimuliDataWithIds;
  mapData: {
    midpoint: [number, number];
  };
};
export type StimuliCardData = Record<string, StimCard[]>;

//Response we receive from the LLM
export type StimuliDataResponse = APIResponse<TerroMarketData | null>;
