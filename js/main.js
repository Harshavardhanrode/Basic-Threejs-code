
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let controls;
const loader = new GLTFLoader();


loader.load(
  `models/hammer.glb`,
  function (gltf){                                                        //If the file is loaded, add it to the scene
    let object = gltf.scene;
    scene.add(object);
  },
  function (error) {                                                  //If there is an error, log it
    console.error(error);
  }
);


const renderer = new THREE.WebGLRenderer({ alpha: true });                         //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);        //Add the renderer to the DOM


camera.position.z = 30;                                                         //Set how far the camera will be from the 3D model
//Add lights to the scene
const topLight = new THREE.DirectionalLight('white', 1);                                        // (color, intensity)
topLight.position.set(500, 500, 500)                                                             //top-left-ish
topLight.castShadow = true;
scene.add(topLight);
const ambientLight = new THREE.AmbientLight(0x333333,1);
scene.add(ambientLight);

                                                                 //This adds controls to the camera, so we can rotate / zoom it with the mouse
controls = new OrbitControls(camera, renderer.domElement);

function animate() {                                          //Render the scene
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {                                   //Add a listener to the window, so we can resize the window and the camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();