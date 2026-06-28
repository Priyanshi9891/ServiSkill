import { getDistance } from "geolib";

export default function recommendProviders(
  providers,
  customerLocation
) {
  return providers
    .map((provider) => {

      let distance = 9999;

      if (
        customerLocation &&
        provider.latitude &&
        provider.longitude
      ) {
        distance =
          getDistance(
            {
              latitude:
                customerLocation.lat,
              longitude:
                customerLocation.lng,
            },
            {
              latitude:
                provider.latitude,
              longitude:
                provider.longitude,
            }
          ) / 1000;
      }

      const score =
        (provider.rating || 0) * 20 +
        (provider.experience || 0) * 3 -
        distance;

      return {
        ...provider,
        score,
        distance,
      };
    })
    .sort(
      (a, b) => b.score - a.score
    );
}