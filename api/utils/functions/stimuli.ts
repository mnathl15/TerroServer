import {
  LLMStimuliData,
  ServerSideLocationObject,
  StimuliDataWithIds,
  TerroMarketData,
} from "../../types/stimuli";
import { getMidpointFromStimuli } from "../helpers/maps";
import { getIsCachedSearchStale } from "../helpers/mongo";
import { addPropsToLLMStimuliData, sortStimuli } from "../helpers/stimuli";
import { getXMonthsAgo } from "../helpers/time";
import { testStimuliData } from "../test/stimuli";
import { getStimuliDataMongo, storeStimuliDataInMongo } from "./stimuli/mongo";
import { callGetStimuliLLM } from "./stimuli/openai";
interface getStimDataProps {
  locationObj: ServerSideLocationObject;
}

interface getStimuliLLMProps {
  isReal: boolean;
  localeKey: string;
  upperLocale?: string;
}
export const fetchFromLLMAndMongo = async ({
  locationObj,
}: getStimDataProps): Promise<TerroMarketData | null> => {
  const { localeKey, upperLocale, geometry } = locationObj;
  const { location } = geometry;
  const coordinates: [number, number] = [location.lng, location.lat];

  const mongoStimuliData = await getStimuliDataMongo(localeKey);
  const hasStoredMongoData =
    mongoStimuliData && mongoStimuliData.stimuli.length > 0;

  const isCachedSearchStale =
    hasStoredMongoData && getIsCachedSearchStale(mongoStimuliData.timestamp);

  let stimuliData: StimuliDataWithIds | null = null;

  if (!hasStoredMongoData || isCachedSearchStale) {
    console.log("Is fetching from the LLM");
    stimuliData = await getStimuliDataLLM({
      isReal: true,
      localeKey,
      upperLocale,
    });
    console.log(stimuliData);
  } else {
    console.log("Actually from Mongo: ");
    stimuliData = mongoStimuliData;
  }

  if (!stimuliData) return null;

  return {
    stimuliData: sortStimuli(stimuliData),
    mapData: {
      midpoint:
        getMidpointFromStimuli({
          stimuli: stimuliData.stimuli,
        }) || coordinates,
    },
  };
};

export const getStimuliDataLLM = async ({
  isReal,
  localeKey,
  upperLocale,
}: getStimuliLLMProps): Promise<StimuliDataWithIds | null> => {
  if (isReal) {
    const marketResponseLLM = await callGetStimuliLLM({
      address: `${localeKey},${upperLocale}`,
      quantity: (10).toString(),
      todays_date: getXMonthsAgo(0),
      date_limit: getXMonthsAgo(24),
    });

    const llmStimuliData = marketResponseLLM.output_parsed
      ?.data as LLMStimuliData;

    console.log("LLM DATA: ", llmStimuliData);

    const stimuliDataWithProps = addPropsToLLMStimuliData({
      llmStimuliData,
      localeKey,
      upperLocale,
    });

    if (stimuliDataWithProps.stimuli.length > 0) {
      const stimuliData = storeStimuliDataInMongo(stimuliDataWithProps);
      return stimuliData;
    }
    return null;
  } else {
    const sleep = () =>
      new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
    await sleep();
    const data = testStimuliData;
    return data;
  }
};
