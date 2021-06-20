import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()
dat.GUI.toggleHide();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const distance = THREE.Math.randFloatSpread(100)

const geometry = new THREE.BufferGeometry();


//vector particles
const vertices = [];

const vertex = new THREE.Vector3();

for ( let i = 0; i < 1500; i ++ ) {

    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.normalize();

    vertices.push( vertex.x, vertex.y, vertex.z );

    vertex.multiplyScalar( Math.random() * 0.005 + 1 );


}


//dot particles
const particlesCnt = 10000;
const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 2; i++){
    posArray[i] = Math.random() - 1

}

geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );



// Materials

const material = new THREE.PointsMaterial()
material.color = new THREE.Color(0xffff00)
material.size = 1.3
material.sizeAttenuation = false
material.alphaTest = 0.5
material.morphTargets = true

const particlesM = new THREE.PointsMaterial();
particlesM.size = 5
particlesM.color = "red"

// Mesh
const sphere = new THREE.Points(geometry,material)
scene.add(sphere)

const particle = new THREE.Mesh()

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height, 0.1, 300)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    clearAlpha:1,
    color:0x0,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .3 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// Orbital controls
const control = new OrbitControls(camera, renderer.domElement)
