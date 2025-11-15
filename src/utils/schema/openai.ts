import { z } from "zod";
import { STIM_TYPES } from "../../constants/stimuli";

const StimSchema = z.object({
  title: z.string(),
  desc: z.string(),
  date: z.coerce.date(),
  coordinates: z.array(z.number()).min(2).max(2),
  apprStatus: z.enum(["approved", "pending", "cancelled"]),
  stimType: z.enum(STIM_TYPES as [string, ...string[]]),
  dirtIndex: z.number(),
  url: z.string(),
});

const StimuliSchema = z.object({
  rationale: z.string(),
  longRationale: z.array(z.string()),
  stimuli: z.array(StimSchema),
});
export const StimuliDataSchemaLLM = z.object({
  data: StimuliSchema,
});
