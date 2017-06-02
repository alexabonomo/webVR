AFRAME.registerComponent('sin-y', {
  schema: {
    offsetA: {type: 'float', default: 0},
    speedX: {type: 'float', default: .1},
    totalSizeX: {type: 'float'},
    height: {type: 'float', default: 0}
  },
  tick: function(time, timeDelta) {
    let position = this.el.object3D.position;
    this.el.object3D.position.setX(this.data.speedX + this.el.object3D.position.x);
    this.el.object3D.position.setY(this.data.height * Math.sin((time * 0.001) + this.data.offsetA));

    if (this.el.object3D.position.x >= this.data.totalSizeX) {
      this.el.object3D.position.setX(0);
    }
  }
});

let scene = document.querySelector('a-scene');

let objectCount = 10;
let elementRadius = 1.5;
let elementSpacing = 1.5;

let size = (elementRadius * 2) + elementSpacing;
let totalSize = objectCount * size;

let containerElement = document.createElement('a-entity');
containerElement.setAttribute('position', `${-totalSize / 2} 0 ${-totalSize / 2}`);
scene.appendChild(containerElement);

function create3DObject(x, y, z) {
  let element = document.createElement('a-entity');
  element.setAttribute('position', `${x} ${y} ${z}`);
  element.setAttribute('geometry', 'primitive: sphere; radius: 1.5;');
  element.setAttribute('material', `color:#${getRandomColor()}; metalness: 0; roughness: 0`);
  element.setAttribute('sin-y', `height: 5; offsetA: ${y}; totalSizeX: ${totalSize}`);
  containerElement.appendChild(element);
}

function addObjects() {
  for (let i = 0; i < objectCount; i++) {
    for (let j = 0; j < 10; j++) {
      create3DObject(i * size, 2*Math.PI*i/objectCount + 2*Math.PI*j/objectCount, j * size);
    }
  }
}

addObjects();

// get random hex color
function getRandomColor() {

  let letters = '0123456789abcdef';

  let randomColor = '';

  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }

  return randomColor;

}
