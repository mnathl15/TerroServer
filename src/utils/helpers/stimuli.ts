import {
  NEIGHBORHOOD,
  STATE,
  SUBLOCALITY,
  TOWNSHIP,
} from "../../constants/maps.js";
import { STIM_INFLUENCES } from "../../constants/stimuli.js";
import {
  LLMStim,
  LLMStimuli,
  LLMStimuliData,
  StimuliData,
  StimuliDataWithIds,
} from "../../types/stimuli.js";

export const getMarketWeight = (stimuli: LLMStimuli) =>
  stimuli?.reduce((weights, currStim) => {
    weights += STIM_INFLUENCES[currStim.stimType]
      ? STIM_INFLUENCES[currStim.stimType].weight
      : 0;
    return weights;
  }, 0) / stimuli.length;

const checkLocationTypes = (
  types: string[],
  locale:
    | typeof TOWNSHIP
    | typeof SUBLOCALITY
    | typeof STATE
    | typeof NEIGHBORHOOD
) => types.find((type) => type === locale);

export const getLocale = (
  addressComponents: google.maps.GeocoderAddressComponent[],
  locale:
    | typeof TOWNSHIP
    | typeof SUBLOCALITY
    | typeof STATE
    | typeof NEIGHBORHOOD
) =>
  addressComponents.find((addressComponent) =>
    checkLocationTypes(addressComponent.types, locale)
  );

export const findTownshipLocale = (
  addressComponents: google.maps.GeocoderAddressComponent[]
) => {
  const subLocality = getLocale(addressComponents, SUBLOCALITY);
  const neighborhood = getLocale(addressComponents, NEIGHBORHOOD);
  const township = getLocale(addressComponents, TOWNSHIP);

  if (neighborhood) return neighborhood.long_name;
  if (subLocality) return subLocality.long_name;
  if (township) return township.long_name;
};

export const getAverageDirt = (stimuli: LLMStimuli) =>
  stimuli.reduce((dirtIndexSum, currStim) => {
    dirtIndexSum += currStim.dirtIndex;
    return dirtIndexSum;
  }, 0) / stimuli.length;

interface addLocationParamsToLLMStimuliProps {
  llmStimuliData: LLMStimuliData;
  localeKey: string;
  upperLocale: string | undefined;
}
export const addPropsToLLMStimuliData = ({
  llmStimuliData,
  localeKey,
  upperLocale,
}: addLocationParamsToLLMStimuliProps): StimuliData => {
  return {
    ...llmStimuliData,
    locale: { localeKey, upperLocale },
    timestamp: new Date(),
    averageDirt: getAverageDirt(llmStimuliData.stimuli),
  };
};

export const sortStimuli = (stimuliData: StimuliDataWithIds) => {
  const sortedStimuli = stimuliData.stimuli.sort((a: LLMStim, b: LLMStim) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });

  stimuliData.stimuli = sortedStimuli;
  return stimuliData;
};
