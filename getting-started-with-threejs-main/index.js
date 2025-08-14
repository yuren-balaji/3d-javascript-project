import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w =  window.innerWidth;
const h =  window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;


//mesh 
const geo = new THREE.IcosahedronGeometry(1.0,2);
// materials for mesh.
const mat = new THREE.MeshStandardMaterial({
    color: 0x454faa,
    flatShading: true
}
);
// creating mesh with material.
const mesh1 = new THREE.Mesh(geo,mat);
// creating material for wireframe.
const wiremat = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true
}
);
// reusing the same mesh as icohedron but with wwireframe.
const wiremesh = new THREE.Mesh(geo,wiremat);
// and god said will there be light.
const hemilight = new THREE.HemisphereLight(0xffffff,0x000000);


scene.add(mesh1);
scene.add(hemilight);
scene.add(wiremesh);

function animate(t = 0){
    requestAnimationFrame(animate);
    mesh1.scale.setScalar(Math.cos((t * 0.001) - 1.0));
    wiremesh.rotation.z = Math.cos(t * 0.001);
    mesh1.rotation.x = Math.tan(t * 0.0007);
    wiremesh.rotation.x = Math.sin(t * 0.001);
    mesh1.rotation.y = Math.sin(-t * 0.001);
    renderer.render(scene, camera);
    controls.update();
}
animate();

