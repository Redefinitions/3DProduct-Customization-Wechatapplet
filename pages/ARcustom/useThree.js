import * as THREE from '../../libs/three.min.js';
import { OrbitControls } from '../../libs/jsm/controls/OrbitControls';
import { OBJLoader } from '../../libs/jsm/loaders/OBJLoader';

const RESOURCE_URL = 'https://dcdn.it120.cc/2022/03/18/'
const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls, cube, model, color,rerender
console.log(model)
console.log(color)

function renderGL(_canvas){
  canvas = _canvas;
  canvas.width = windowWidth * pixelRatio/2;
  canvas.height = windowHeight * pixelRatio/2;

  // 适配点击事件
  canvas.clientHeight = canvas.height;
  canvas.clientWidth = canvas.width;

  // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小
  canvas.style = {} 
  canvas.style.width = windowWidth * pixelRatio/2;
  canvas.style.height = windowHeight * pixelRatio/2; 

  initRenender(); // 初始化渲染器
  initCamera(); // 初始化相机
  initScene(); // 初始化场景
  initControl(); // 初始化控制器
  initLight(); // 初始化光线
  initGeometrys() // 初始化物体
  initOthers(); // 初始化其他参数

  /**
   * 初始化渲染器
   */
  function initRenender() {
    renderer = new THREE.WebGLRenderer({
      alpha:true,
      antialias:true,
      canvas
    });
    renderer.setClearColor(0xffffff, 1)
    renderer.outputEncoding = THREE.sRGBEncoding; // 
    renderer.toneMapping = THREE.ReinhardToneMapping; // 色彩映射
    renderer.toneMappingExposure = 2; // 色调映射的曝光级别
  }

  /**
   * 初始化相机
   */
  function initCamera() {
    camera = new THREE.PerspectiveCamera(
      90,
      canvas.width / canvas.height,
      0.1,
      100
    );
    camera.position.set(-0.6,0.8,0.8);
  }

  /**
   * 初始化场景
   */
  function initScene() {
    scene = new THREE.Scene();
  }
  
  /**
   * 渲染控制器
   */
  function initControl() {
    controls = new OrbitControls(camera, renderer.domElement);
    //是否可以缩放 
    controls.enableZoom = true; 
    controls.addEventListener('change', render);
  }

  /**
   * 初始化物体
   */
  function initGeometrys() {
    const material = new THREE.MeshStandardMaterial({side:THREE.DoubleSide});
    new OBJLoader().setPath(RESOURCE_URL).load('25ee5fe5-40bb-4b44-afa1-2ce7c8f15576.obj',  ( group ) => {
      const textureLoader = new THREE.TextureLoader(undefined, canvas).setPath(RESOURCE_URL);
      group.children[0].material.map = textureLoader.load('bbdfbe39-f34b-4873-9228-41882e99af38.jpg', render);
      group.children[0].material.normalMap = textureLoader.load('1c383cbb-9226-42d9-be53-d33edff88a31.jpg', render);
      group.children[0].material.aoMap = textureLoader.load('5f5035d5-8586-4706-9211-f8bd6a95f6be.jpg', render);
      group.children[0].material.roughness = 1.0;
      group.children[0].material.needsUpdate = true;
      
      group.children[1].material.map = textureLoader.load('e54027b1-ef3f-4dba-8a77-7b1c4fd59a4d.jpg', render);
      group.children[1].material.normalMap = textureLoader.load('35274e8f-e5e0-4723-9c09-17656fc128a0.jpg', render);
      group.children[1].material.aoMap = textureLoader.load('a2e577aa-b8c7-43db-8666-7b3d4cb2da10.jpg', render);
      group.children[1].material.roughness = 1.0;
      group.children[1].material.needsUpdate = true;

      group.children[2].material.map = textureLoader.load('967d9d83-a82f-4f62-acff-2a16d14bfd95.jpg', render);
      group.children[2].material.map.wrapS = THREE.RepeatWrapping;
      group.children[2].material.normalMap = textureLoader.load('bdd94270-acca-4846-a0c8-2e2b0bd0dcbb.jpg', render);
      group.children[2].material.aoMap = textureLoader.load('bdd94270-acca-4846-a0c8-2e2b0bd0dcbb.jpg', render);
      group.children[2],material.needsUpdate = true;
     
      group.children[3].material.map = textureLoader.load('4737f5ba-8447-4f77-89f6-f7bd0ba11c26.jpg', render);
      group.children[3].material.normalMap = textureLoader.load('5241215d-4f6a-4106-9964-95bfc04cd2c0.jpg', render);
      group.children[3].material.aoMap = textureLoader.load('183f32ae-a9e0-43f9-adfe-2ecbffe5193f.png', render);
      group.children[3].material.needsUpdate = true;

      group.children[4].material.map = textureLoader.load('d500beeb-7f37-4c30-8b6d-c5e30179b05d.jpg', render);
      group.children[4].material.normalMap = textureLoader.load('290d4f31-d93a-474e-b5f4-c79c72c90570.jpg', render);
      group.children[4].material.aoMap = textureLoader.load('41663b39-1d0e-4f8b-8e52-ccbde8502165.jpg', render);
      group.children[4].material.needsUpdate = true;
      
      group.children[5].material.map = textureLoader.load('5c5d68c9-67d4-4e6d-a25a-85ac194f199f.jpg', render);
      group.children[5].material.normalMap = textureLoader.load('5f585074-6f2c-4af5-b01c-7f1cd74155f3.jpg', render);
      group.children[5].material.aoMap = textureLoader.load('f36f0b57-22af-47d4-b44f-79e0331bccbc.jpg', render);
      group.children[5].material.roughness = 0.8;
      group.children[5].material.needsUpdate = true;
      
      group.scale.set(-0.5,0.5,-0.5);

      cube = group;
      scene.add(group);

      render();
          })
  }

  function initLight() {
    var ambientLight = new THREE.AmbientLight( 0xd5d5d5 );
    ambientLight.intensity=1.2;
    scene.add( ambientLight );

    var bottomRightDirLight = new THREE.DirectionalLight();
    bottomRightDirLight.position.x=5;
    bottomRightDirLight.position.y=3;
    bottomRightDirLight.position.z=-5;
    bottomRightDirLight.intensity=.8;
    // var helper=new THREE.DirectionalLightHelper(bottomRightDirLight,1);
    // scene.add( helper );
    scene.add( bottomRightDirLight );
    var frontDirLight = new THREE.DirectionalLight(0xffffff);
    frontDirLight.position.x=-5;
    frontDirLight.position.y=3;
    frontDirLight.position.z=5;
    frontDirLight.intensity=.8;
    //directionalLight.castShadow=true;
    // var helper=new THREE.DirectionalLightHelper(frontDirLight,1);
    // scene.add( helper );
    scene.add( frontDirLight );
  }

  function initOthers() {}

  function animation() {}

  function render() {
    renderer.render(scene, camera)
  }

  rerender = render()

  render()
}

function changeColor(_model,_color){
  model = _model;
  color = _color;
  switch (model) {
    case "head":
        cube.children[2].material.color.set(color);
        rerender;
        break;
    case "insider":
      cube.children[3].material.color.set(color);
        break;
    case "lock":
      cube.children[4].material.color.set(color);
        break;
    case "strip":
      cube.children[5].material.color.set(color);
        break;
    case "backbone":
      cube.children[0].material.color.set(color);
        break;
    case "base":
      cube.children[1].material.color.set(color);
    default:
        break;
  }
}

module.exports = {
  changeColor,
  renderGL,
}