import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Viewer {
    init() {
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        console.log("init viewer");

        this.loadGlb("/models/F35Plane.glb", scene);
    }

    loadGlb(url: string, scene: Scene) {
        const loader = new GLTFLoader();
        loader.load(
            url,
            function (gltf) {
                console.log('gltf', gltf)
                // scene.add(gltf.scene);
                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
            },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            // called when loading has errors
            function (error) {
                console.log("An error happened");
            }
        );
    }
}
