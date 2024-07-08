export const MapStyle = [
  //base
  { elementType: "geometry", stylers: [{ color: "#434954" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
    // stylers: [{ color: "#181818" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  //ruas
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#777F91" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  //avenidas secundárias
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#777F91" }],
  },
  //avenidas principais
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#777F91" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#4e4e4e" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
  //água
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  },
];
