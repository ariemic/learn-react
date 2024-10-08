import { useState } from "react";

export function useGeolocation(additionalAction) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
        if (additionalAction) additionalAction();
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return [getPosition, position, isLoading, error];
}
