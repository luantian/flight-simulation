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

        const loader = new GLTFLoader();

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        console.log("init viewer");
    }
}
