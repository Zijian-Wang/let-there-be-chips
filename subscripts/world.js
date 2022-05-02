import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default class World {
    constructor(scene) {
        this.loadModel(scene)
        this.addLights(scene)
    }

    // Models
    loadModel(scene) {
        const glTFLoader = new GLTFLoader()

        const gltf = glTFLoader.load(
            "../assets/models/Chips_LowPoly.gltf",
            // onLoad callback
            (gltf) => {
                // get chipModel
                const chipModel = gltf.scene.children[0]
                chipModel.scale.set(10, 10, 10)

                chipModel.material.metalness = 0.5
                console.log(chipModel.material)
                scene.add(chipModel)
            }
        )
    }

    // Lights
    addLights(scene) {
        const ambientLight = new THREE.AmbientLight("white", 2)

        const pointLight = new THREE.PointLight("white", 1, 0, 1)
        pointLight.position.set(-0.06, 0.4, 0.3)

        const directionalLight = new THREE.DirectionalLight("white", 1)
        directionalLight.castShadow = true
        directionalLight.position.set(-1, 1, 1)

        scene.add(ambientLight, pointLight, directionalLight)
    }
}
