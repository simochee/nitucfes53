let map;
function initMap() {
  const elem = document.getElementById('mapCanvas');
  const styles = [
    {
      stylers: [
        { hue: '#fff' },
        { saturation: -100 }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi.school',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'road',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'transit.station',
      stylers: [
        { hue: '#00f' },
        { saturation: 50 },
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'transit.line',
      stylers: [
        { hue: '#b02857' },
        { saturation: 50 },
        { visibility: 'on' }
      ]
    },
    {

    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        { hue: '#00f' },
        { saturation: 50 }
      ]
    }
  ]
  const opts = {
    center: { lat: 33.952831, lng: 131.275345 },
    zoom: 14,
    disableDefaultUI: true,
    styles: styles
  };
  map = new google.maps.Map(elem, opts);
}