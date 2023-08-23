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
    PointLight,
    DirectionalLight,
    Quaternion,
    MeshStandardMaterial,
} from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {
    World,
    Vec3,
    Body,
    Sphere,
    Plane,
    Material,
    Trimesh,
    Box,
} from "cannon-es";
import type { IPlane } from "@/interface/PlaneInterface";

export class Viewer {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    controls: OrbitControls;
    element: HTMLElement;
    world: World;
    // pmremGenerator: PMREMGenerator;
    constructor(element: HTMLElement, optinos?: any) {
        this.element = element;
        const fov = 60;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            fov,
            this.element.clientWidth / this.element.clientHeight,
            0.01,
            1000
        );
        this.renderer = new WebGLRenderer({
            // 抗锯齿
            antialias: true,
            // 使用Three进行加载模型时，总会遇到模型相接处或某些区域出现频闪问题或内容被相邻近元素覆盖掉的情况,对数缓存开启可解决
            // 使用对数缓存
            logarithmicDepthBuffer: true,
        });
        // this.renderer.useLegacyLights = false;
        this.renderer.setClearColor(0xcccccc);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(
            this.element.clientWidth,
            this.element.clientHeight
        );
        this.element.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.initControls();

        this.world = new World();
        this.world.gravity.set(0, -9.82, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            this.world.fixedStep();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
        // window.addEventListener("resize", this.resize.bind(this), false);
    }

    initControls() {
        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        // this.controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.controls.enableZoom = true;
        //是否自动旋转
        this.controls.autoRotate = false;
        //是否开启右键拖拽
        // this.controls.enablePan = true;
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

    loadGlb(url: string, plane: IPlane, callback?: (gltf: GLTF) => void) {
        const loader = new GLTFLoader();
        loader.load(
            url,
            (gltf) => {
                this.scene.add(gltf.scene);
                this.initStats();
                this.addLights();
                this.setModelCenter();
                this.createLand();
                this.linkCannon(gltf, plane);
                callback && callback(gltf);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.log("An error happened");
            }
        );
    }

    addLights() {
        const ambientLight = new AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
        // const lightOptions = [
        //     {
        //         type: "point", // 灯光类型：1. point点光源、2. directional平行光源
        //         color: 0xfff0bf, // 灯光颜色
        //         intensity: 0.4, // 灯光强度
        //         distance: 30, // 光照距离
        //         decay: 2, // 衰减速度
        //         position: {
        //             // 光源位置
        //             x: 2,
        //             y: 6,
        //             z: 0,
        //         },
        //     },
        // ];
        // lightOptions.forEach((option) => {
        //     const light =
        //         option.type === "point"
        //             ? new PointLight(
        //                   option.color,
        //                   option.intensity,
        //                   option.distance,
        //                   option.decay
        //               )
        //             : new DirectionalLight(option.color, option.intensity);
        //     const position = option.position;
        //     light.position.set(position.x, position.y, position.z);
        //     this.scene.add(light);
        // });
    }

    setModelCenter() {
        // 通过传入的object3D对象来返回当前模型的最小大小，值可以使一个mesh也可以使group
        // scene.scale.set(25, 25, 25)
        const box = new Box3().setFromObject(this.scene);
        const size = box.getSize(new Vector3()).length();
        const center = box.getCenter(new Vector3());

        this.controls.reset();
        // this.scene.position.x = 0;
        // this.scene.position.y = 0;
        // this.scene.position.z = 0;
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

    resize() {
        const { clientHeight, clientWidth } = this.element;
        this.camera.aspect = clientWidth / clientHeight;
        this.renderer.setSize(clientWidth, clientHeight);
        this.camera.updateProjectionMatrix();
    }

    createLand() {
        const floorMat = new MeshStandardMaterial({
            color: 0xa9a9a9, // 材质的颜色
        });
        const floorGeometry = new BoxGeometry(1000, 300, 0.01, 1, 1, 1);
        const floorMesh = new Mesh(floorGeometry, floorMat);
        floorMesh.receiveShadow = true;
        floorMesh.rotation.x = -Math.PI / 2.0;
        this.scene.add(floorMesh);
    }

    linkCannon(gltf: GLTF, plane: IPlane) {
        const scene = gltf.scene || gltf.scenes[0];
        scene.castShadow = true;
        scene.receiveShadow = true;
        console.log("scene", scene);

        const halfExtents = new Vec3(plane.length, plane.span, plane.height);

        const boxShape = new Box(halfExtents);
        const boxBody = new Body({ mass: plane.weight, shape: boxShape });
        this.world.addBody(boxBody);

        const groundBody = new Body({
            type: Body.STATIC, // can also be achieved by setting the mass to 0
            shape: new Plane(),
        });
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
        this.world.addBody(groundBody);
    }
}
