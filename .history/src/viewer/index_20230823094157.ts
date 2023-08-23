import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Viewer {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
    }

    loadGlb(url: string) {
        const loader = new GLTFLoader();
        loader.load(
            url,
            (gltf) => {
                console.log("gltf", gltf);
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
