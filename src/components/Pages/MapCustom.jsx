import React, {useCallback, useRef} from 'react';
import {Map, Placemark, ZoomControl} from "@iminside/react-yandex-maps";

const MapCustom = ({state}) => {

  const map = useRef(null);

  const setMapRef = useCallback((instance) => {
    map.current = instance;
    // map.current?.behaviors?.disable('scrollZoom')
  }, []);

  const handleClickPlacemark = () => {
    if (map.current) {
      map.current.setCenter(state.center);
      map.current.options.set('maxAnimationZoomDifference', Infinity);
      map.current.setZoom(18, {duration: 500});
    }
  }


  return (

      <Map defaultState={state} width={'100%'} height={'20rem'} instanceRef={setMapRef}>
        <ZoomControl/>
        <Placemark
          geometry={state.center}
          onClick={handleClickPlacemark}
          options={{
            iconImageSize: [10, 10],
            preset: "islands#blueAutoIcon",
          }}
        />
      </Map>

  );
};

export default MapCustom;
