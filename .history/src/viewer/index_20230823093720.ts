import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Viewer {
    url = '';

    init() {
        console.log('init viewer');
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
        // this.loadGlb("/models/F35Plane.glb", scene);
    }

    loadGlb(url: string, scene: Scene) {
        const loader = new GLTFLoader();
        loader.load(
            url,
            (gltf) => {
                console.log('gltf', gltf)
                // scene.add(gltf.scene);
                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
            },
            // called while loading is progressing
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            // called when loading has errors
            (error) => {
                console.log("An error happened");
            }
        );
    }
}
