import { LLMStimuli } from "../../types/stimuli";

export type getMidpointFromStimuliProps = {
  stimuli: LLMStimuli;
};

export const getMidpointFromStimuli = ({
  stimuli,
}: getMidpointFromStimuliProps): [number, number] | null => {
  const coordinateSums = stimuli.reduce(
    (coordinateSums, currStim) => {
      const coordinates = currStim.coordinates;
      coordinateSums[0] += coordinates[0];
      coordinateSums[1] += coordinates[1];
      return coordinateSums;
    },
    [0, 0]
  );

  let midpoint: [number, number] | null = null;
  if (coordinateSums[0] && coordinateSums[1]) {
    midpoint = [
      coordinateSums[0] / stimuli.length,
      coordinateSums[1] / stimuli.length,
    ];
  }

  return midpoint;
};
