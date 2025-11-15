import { getXMonthsAgo } from "./time.js";

export const getIsCachedSearchStale = (timestamp: Date): boolean => {
  const sixMonthsAgo = getXMonthsAgo(6);
  const sixMonthsAgoMs = new Date(sixMonthsAgo).getTime();
  const timestampMs = new Date(timestamp).getTime();
  return sixMonthsAgoMs > timestampMs;
};
