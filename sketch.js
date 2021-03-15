const key = 'pk.eyJ1Ijoic3I5Njc5MTciLCJhIjoiY2ttMHRuM2E1MWF2ejJ1cWV1a2IxYWtqdiJ9.dJPCZgAEwmxwHyBws2VJOA';

const options = {
  lat: 39.3292,
  lng: -82.1013,
  zoom: 4,
  style: 'mapbox://styles/sr967917/ckm0tg6xr9kgt17lkigwfyk0x',
  pitch: 0,
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  airports = loadTable('airports.csv','csv','header');
    //text = ("Airports I've visited", 20,20);
    //textSize = 48;
    //color = '#fff';
}

function draw() {
  clear();
  
  //noFill();
  stroke(255);
  strokeWeight(3);
  const zoom = myMap.zoom();
  //const athens = myMap.latLngToPixel(39.3292,-82.1013);

  for(let i=0; i < airports.getRowCount(); i++){
    const latitude = Number(airports.getString(i, 'reclat'));
    const longitude = Number(airports.getString(i, 'reclong'));
    const pos = myMap.latLngToPixel(latitude, longitude);
    let place = airports.getString(i, 'Name');
    
    let size = 20;
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();  ellipse(pos.x, pos.y, size, size);
    
    if(dist(pos.x,pos.y, mouseX, mouseY) < size) {
     textSize(32);
     text(place, pos.x, pos.y);
    }
    
  }
}

$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});

