import { NextFunction, Request, Response } from "express";
import { STATE } from "../constants/maps.js";
import { ReformedGeocoderResponse } from "../types/google.js";
import {
  ServerSideLocationObject,
  StimuliDataResponse,
} from "../types/stimuli.js";
import { fetchFromLLMAndMongo } from "../utils/functions/stimuli.js";
import { getGeocode } from "../utils/helpers/geocode.js";
import { findTownshipLocale, getLocale } from "../utils/helpers/stimuli.js";

export const getStimuli = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = req.query.address;

    if (typeof address === "string") {
      const geocodeURL = getGeocode(address);
      const geocode = await fetch(geocodeURL);
      const locationJson: ReformedGeocoderResponse = await geocode.json();

      if (locationJson.results.length === 0 || !locationJson) {
        throw new Error("No results");
      }
      const addressComponents = locationJson.results[0]?.address_components;
      const townshipLocale = findTownshipLocale(addressComponents);
      const localeKey = townshipLocale || address;
      const upperLocale = !!townshipLocale
        ? getLocale(addressComponents, STATE)?.long_name
        : "";
      const geometry = locationJson.results[0]?.geometry;

      const locationObj: ServerSideLocationObject = {
        upperLocale,
        localeKey,
        geometry,
      };

      const data = await fetchFromLLMAndMongo({ locationObj });
      const apiResponse: StimuliDataResponse = {
        data,
        status: 200,
        message: "Data fetched successfully",
      };

      return res.status(200).send(apiResponse);
    } else {
      throw new Error("Address unavailable");
    }
  } catch (error) {
    next(error);
  }
};
