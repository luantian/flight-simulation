import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    AmbientLight,
    Box3,
} from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Viewer {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    controls: OrbitControls;
    constructor(params: { element: HTMLElement }) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        params.element.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    initControls() {
        
    }

    loadGlb(url: string, callback?: (gltf: GLTF) => void) {
        const loader = new GLTFLoader();
        loader.load(
            url,
            (gltf) => {
                console.log("gltf", gltf);
                this.scene.add(gltf.scene);
                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
                this.addLights();
                this.setModelCenter(gltf);
                callback && callback(gltf);
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

    addLights() {
        const ambientLight = new AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
    }

    setModelCenter(gltf: GLTF) {
        var box = new Box3();
        //通过传入的object3D对象来返回当前模型的最小大小，值可以使一个mesh也可以使group
        box.expandByObject(gltf.scene);
    }
}
