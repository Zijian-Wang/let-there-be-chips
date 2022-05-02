import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as lilGUI from "lil-gui"
import World from "./subscripts/world"

function init() {
    // create the GUI
    const gui = new lilGUI.GUI()

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene()

    // Init World
    const world = new World(scene)

    // test cube
    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: "white" })
    )
    // scene.add(cube)

    // create a camera, which defines where we're looking at
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    )
    camera.position.set(0, 1, 4)
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.pixelRatio = Math.min(window.devicePixelRatio, 2)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.outputEncoding = THREE.sRGBEncoding
    // add the output of the render function to the HTML
    document.body.appendChild(renderer.domElement)

    // Create Controler
    const control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    control.dampingFactor = 0.5

    // On resize event, update sizes and camera
    window.addEventListener("resize", () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        // console.log("resize: " + sizes.width + " x " + sizes.height)
    })

    const clock = new THREE.Clock()
    let elapsedTime,
        deltaTime = 0

    // function for re-rendering/animating the scene
    function tick() {
        deltaTime = clock.getDelta()
        elapsedTime = clock.getElapsedTime()
        // console.log(elapsedTime)

        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }
    tick()
}
init()
