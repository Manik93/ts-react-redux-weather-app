//get local position with geolocation browser api
export const getBrowserGeolocation = () => {
  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const successCallback = (position: any) => {
    const { latitude, longitude } = position.coords;
    localStorage.setItem('USER_LATITUDE', latitude);
    localStorage.setItem('USER_LONGITUDE', longitude);
  };

  const errorCallback = (error: any) => {
    console.error(error);
  };

  navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback,
    options
  );

  const coords: string = `${localStorage.getItem(
    'USER_LATITUDE'
  )} ${localStorage.getItem('USER_LONGITUDE')}`;

  return coords;
};
