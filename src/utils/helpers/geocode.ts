import dotenv from "dotenv";
import { GEOCODE_API_PATH } from "../../constants/api-paths";

dotenv.config();

export const getGeocode = (address: string) =>
  `${GEOCODE_API_PATH}?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY_SERVER}`;
