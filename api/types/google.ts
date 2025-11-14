export type GooglePlace = google.maps.places.PlaceResult | null;

/* For some reason the google.maps.GeocoderGeometry has a lat() and lng() parameter 
but the results returned are just number types, so I needed to overwrite it with this type */

export type ReformedGeocoderResponse = Omit<
  google.maps.GeocoderResponse,
  "results"
> & {
  results: ReformedGeocoderResult[];
};

type ReformedGeocoderResult = Omit<google.maps.GeocoderResult, "geometry"> & {
  geometry: ReformedGeocoderGeometry;
};
export type ReformedGeocoderGeometry = Omit<
  google.maps.GeocoderGeometry,
  "location"
> & {
  location: Omit<LatLng, "lat" | "lng"> & {
    lat: number;
    lng: number;
  };
};

export type LatLng = google.maps.LatLng;
export type GoogleAutocompleteType = google.maps.places.Autocomplete | null;
