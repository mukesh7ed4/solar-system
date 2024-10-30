import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sunTexture = '/img/sun.jpg';
const mercuryTexture = '/img/mercury.jpg';
const venusTexture = '/img/venus.jpg';
const earthTexture = '/img/earth.jpg';
const marsTexture = '/img/mars.jpg';
const jupiterTexture = '/img/jupiter.jpg';
const saturnTexture = '/img/saturn.jpg';
const saturnRingTexture = '/img/saturn ring.png';
const uranusTexture = '/img/uranus.jpg';
const uranusRingTexture = '/img/uranus ring.png';
const neptuneTexture = '/img/neptune.jpg';
const plutoTexture = '/img/pluto.jpg';

// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio( window.devicePixelRatio );

document.body.appendChild(renderer.domElement)

// scene
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-90, 140, 140)
orbit.update()

// light
const ambientLight = new THREE.AmbientLight('#333333')
scene.add(ambientLight)

// loaders
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

// scene background
renderer.setClearColor('#111111')


// sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)
//sun's light
const pointLight = new THREE.PointLight('#ffffff', 2, 300)
scene.add(pointLight)

// func that creates planets
const createPlanet = (size, texture, position, ring) => {
    const geo = new THREE.SphereGeometry(size, 30, 30)
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    })
    const mesh = new THREE.Mesh(geo, mat)
    const obj = new THREE.Object3D()
    obj.add(mesh)
    if(ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        })
        const ringMesh = new THREE.Mesh(ringGeo, ringMat)
        obj.add(ringMesh)
        ringMesh.position.x = position
        ringMesh.rotation.x = -0.5 * Math.PI
    }
    scene.add(obj)
    mesh.position.x  = position
    return {mesh, obj}
}

// planets
const mercury = createPlanet(3.2, mercuryTexture, 28)
const venus = createPlanet(5.8, venusTexture, 44)
const earth = createPlanet(6, earthTexture, 62)
const mars = createPlanet(6, marsTexture, 78)
const jupiter = createPlanet(12, jupiterTexture, 100)
const saturn = createPlanet(10, saturnTexture, 132, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
})
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
})
const neptune = createPlanet(7, neptuneTexture, 200)
const pluto = createPlanet(2.8, plutoTexture, 216)



// animate loop
function animate () {

    //self-rotation
    sun.rotateY(0.004)

    mercury.mesh.rotateY(0.004)
    venus.mesh.rotateY(0.002)
    earth.mesh.rotateY(0.02)
    mars.mesh.rotateY(0.018)
    jupiter.mesh.rotateY(0.004)
    saturn.mesh.rotateY(0.038)
    uranus.mesh.rotateY(0.03)
    neptune.mesh.rotateY(0.032)
    pluto.mesh.rotateY(0.008)

    //orbital-rotation
    mercury.obj.rotateY(0.004)
    venus.obj.rotateY(0.015)
    earth.obj.rotateY(0.01)
    mars.obj.rotateY(0.008)
    jupiter.obj.rotateY(0.002)
    saturn.obj.rotateY(0.0009)
    uranus.obj.rotateY(0.0004)
    neptune.obj.rotateY(0.0001)
    pluto.obj.rotateY(0.00007)

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

export default App;