AFRAME.registerComponent('sin-y', {
  schema: {
    offsetY: {type: 'float', default: 0}
  },
  tick: function(time, timeDelta) {
    let position = this.el.object3D.position;
    this.el.object3D.position.setY(Math.sin( ( time * .001 ) + this.data.offsetY));
  }
});

let scene = document.querySelector('a-scene');


let objectCount = 10;
let elementRadius = 1.5;
let elementSpacing = 1.5;

let size = (elementRadius * 2) + elementSpacing;
let totalSize = objectCount * size;

let containerElement = document.createElement('a-entity');
containerElement.setAttribute('position', `${- (.5 * totalSize )} 0 ${- (.5 * totalSize )}` );
scene.appendChild( containerElement);


function create3DObject(x, y, z) {
  let element = document.createElement('a-entity');
  element.setAttribute("geometry", "primitive: sphere; radius: 1.5");
  element.setAttribute("material", `color:${ getRandomColor() }; metalness: 0; roughness: 0;`);
  element.setAttribute("position", `${x}, ${y}, ${z}`);
  element.setAttribute('sin-y', `offsetY: ${y}` );

  containerElement.appendChild(element);
}

function addObjects() {



  for( let i=0; i<objectCount; i++) {

    for( let j=0; j<objectCount; j++){

        let y = Math.sin( i + j ) * 5;
        create3DObject( ( i * size), y, j * size);
    }

  }
}

addObjects();

function getRandomColor() {
  // There are 16^6 possible hex colors (16777216)
  return "#" + Math.floor(Math.random() * 16777216).toString(16);
}
