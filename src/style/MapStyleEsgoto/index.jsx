export const MapStyleEsgoto = [
  // Ocultando ícones de rótulos
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, // Remove os ícones dos rótulos
  { elementType: "labels.text.fill", stylers: [{ visibility: "off" }] }, // Remove o texto dos rótulos
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] }, // Remove o contorno do texto dos rótulos

  // Ocultando rótulos administrativos
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  }, // Remove a geometria das áreas administrativas
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de países
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  }, // Remove os rótulos de parcelas de terra
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de localidades

  // Ocultando pontos de interesse (POI)
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de pontos de interesse
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  }, // Remove a geometria dos parques
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de parques

  // Ocultando rótulos de ruas
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de ruas
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de ruas locais

  // Ocultando rótulos de trânsito
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de trânsito

  // Ocultando rótulos de água
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Remove o texto dos rótulos de áreas de água
];
