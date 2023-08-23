import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    AmbientLight,
    Box3,
    Vector3,
    PMREMGenerator,
} from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class Viewer {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    controls: OrbitControls;
    element: HTMLElement;
    // pmremGenerator: PMREMGenerator;
    constructor(element: HTMLElement, optinos: any) {
        this.element = element;
        const fov = 60;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            fov,
            this.element.clientWidth / this.element.clientHeight,
            0.01,
            1000
        );
        this.renderer = new WebGLRenderer();
        // this.renderer.useLegacyLights = false;
        this.renderer.setClearColor(0xcccccc);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(
            this.element.clientWidth,
            this.element.clientHeight
        );
        this.element.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.initControls();

        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    initControls() {
        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.controls.enableZoom = true;
        //是否自动旋转
        this.controls.autoRotate = false;
        //设置相机距离原点的最远距离
        this.controls.minDistance = 20;
        //设置相机距离原点的最远距离
        this.controls.maxDistance = 10000;
        //是否开启右键拖拽
        this.controls.enablePan = true;
        this.controls.screenSpacePanning = true;
    }

    initStats() {
        const stats = new Stats();
        this.element.appendChild(stats.dom);

        const render = () => {
            //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
            stats.update();
            this.renderer.render(this.scene, this.camera); //执行渲染操作
            requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
        };
        render();
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
                this.initStats();
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

    setModelCenter() {
        //通过传入的object3D对象来返回当前模型的最小大小，值可以使一个mesh也可以使group
        // scene.scale.set(25, 25, 25)
        const box = new Box3().setFromObject(this.scene);
        const size = box.getSize(new Vector3()).length();
        const center = box.getCenter(new Vector3());

        this.controls.reset();
        this.scene.position.x += this.scene.position.x - center.x;
        this.scene.position.y += this.scene.position.y - center.y;
        this.scene.position.z += this.scene.position.z - center.z;
        this.controls.maxDistance = size * 10;
        this.camera.near = size / 100;
        this.camera.far = size * 100;
        this.camera.updateProjectionMatrix();

        this.camera.position.copy(center);
        this.camera.position.x += size / 2.0;
        this.camera.position.y += size / 5.0;
        this.camera.position.z += size / 2.0;
        this.camera.lookAt(center);
    }
}
