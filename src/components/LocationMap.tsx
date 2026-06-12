import MapView, {
  Marker,
} from "react-native-maps";

interface Props {
  latitude?: number;
  longitude?: number;
  title?: string;
}

export default function LocationMap({
  latitude,
  longitude,
  title,
}: Props) {
  if (!latitude || !longitude) {
    return null;
  }

  return (
    <MapView
      style={{
        width: "100%",
        height: 250,
        borderRadius: 12,
      }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title={title}
      />
    </MapView>
  );
}