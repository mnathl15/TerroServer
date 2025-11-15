import { StimuliData, StimuliDataWithIds } from "../../../types/stimuli.js";
import { MongoStimuliData } from "../../schema/mongo.js";
export const getStimuliDataMongo = async (
  localeKey: string
): Promise<StimuliDataWithIds | null> =>
  await MongoStimuliData.findOne({ "locale.localeKey": localeKey });

export const storeStimuliDataInMongo = async (
  data: StimuliData
): Promise<StimuliDataWithIds> => await MongoStimuliData.insertOne(data);
