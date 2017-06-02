let scene = document.querySelector("a-scene");


let objectCount = 10;
let elementRadius = 1.5;
let elementSpacing = 1.5;

let size = (elementRadius * 2) + elementSpacing;
let totalSize = objectCount * size;

let containerElement = document.createElement('a-entity');
containerElement.setAttribute('position', `${- (.5 * totalSize )} 0 ${- (.5 * totalSize )}` );
scene.appendChild( containerElement);


function getRandomColor() {
  // There are 16^6 possible hex colors (16777216)
  return "#" + Math.floor(Math.random() * 16777216).toString(16);
}

function create3DObject(x, y, z) {
  let element = document.createElement("a-entity");
  element.setAttribute("geometry", "primitive: sphere; radius: 1.5");
  element.setAttribute("material", `color:${ getRandomColor() }; metalness: 0; roughness: 0;`);
  element.setAttribute("position", `${x}, ${y}, ${z}`);

  containerElement.appendChild(element);
}

function addObjects() {



  for( let i=0; i<objectCount; i++) {

    for( let j=0; j<objectCount; j++){

        create3DObject( ( i * size), 0, j * size);
    }



  }
}

addObjects();
