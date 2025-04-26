import { FC, memo } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type ActivityMapProps = {
  venue: string;
  country: string;
  position: [number, number];
};

const ActivityMap: FC<ActivityMapProps> = memo(props => {
  const { country, position, venue } = props;

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position}>
        <Popup>
          {venue}, {country}
        </Popup>
      </Marker>
    </MapContainer>
  );
});

ActivityMap.displayName = 'ActivityMap';

export default ActivityMap;
