export const MapStyleEscuridao = [
  // Base
  { elementType: "geometry", stylers: [{ color: "#434954" }] }, // Altera a cor da geometria base do mapa para um tom de cinza escuro
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, // Oculta os ícones dos rótulos
  { elementType: "labels.text.fill", stylers: [{ visibility: "off" }] }, // Oculta o preenchimento do texto dos rótulos
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] }, // Oculta o contorno do texto dos rótulos

  // Administrativos
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  }, // Oculta a geometria das áreas administrativas
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de países
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  }, // Oculta os rótulos de parcelas de terra
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de localidades

  // Pontos de Interesse (POI)
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de pontos de interesse
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  }, // Oculta a geometria dos parques
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de parques

  // Ruas
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#777F91" }],
  }, // Altera a cor de preenchimento da geometria das ruas para um tom de cinza claro
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de ruas

  // Avenidas Secundárias
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#777F91" }],
  }, // Altera a cor da geometria das avenidas secundárias para um tom de cinza claro

  // Avenidas Principais
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#777F91" }],
  }, // Altera a cor da geometria das avenidas principais para um tom de cinza claro
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#4e4e4e" }],
  }, // Altera a cor da geometria das avenidas principais com acesso controlado para um tom de cinza médio

  // Ocultando rótulos de ruas locais
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de ruas locais

  // Ocultando rótulos de trânsito
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de trânsito

  // Água
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  }, // Altera a cor da geometria da água para preto
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "off" }],
  }, // Oculta o preenchimento do texto dos rótulos de áreas de água
];
