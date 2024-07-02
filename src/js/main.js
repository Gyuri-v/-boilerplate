import '../scss/style.scss'

import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { commonSetting } from './_common';

// common setting
commonSetting();

// app
const App = function () {
  // * DOM
  const $container = document.querySelector('.container');
  let $canvas;

  // * VALUE
	let areaWidth = window.innerWidth;
	let areaHeight = window.innerHeight;
  let isRequestRender = false;

  // * WORLD
  let renderer, scene, camera, controls;
	let model, modelSize, modelHeight, modelDepth, modelWidth;

  // ### INIT
  const onInit = function () {
    onResize();

    // Scene
    scene = new THREE.Scene();

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor('#000', 1.0);
    renderer.setSize(areaWidth, areaHeight);
    $canvas = renderer.domElement;
    $container.appendChild($canvas);

    // Camera
    camera = new THREE.PerspectiveCamera(70, areaWidth / areaHeight, 1, 999);
    camera.position.set(1, 1, 3);
    camera.lookAt(0, 0, 0)
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('#fff', 1);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -25;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.radius = 1;
    directionalLight.shadow.bias = -0.003;

    scene.add(ambientLight, directionalLight);

    // Controls
    if (_DEBUG) {
      controls = new OrbitControls(camera, $canvas);
      controls.addEventListener('change', renderRequest);
    }

    // Setting
    setModels();

    // Render
    renderRequest();
    gsap.ticker.add(animate);

    // Loading
    THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      if (itemsLoaded === itemsTotal) {
      }
    };
  };

  // ### SETTING
  const setModels = function () {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 'red' })
    );
    scene.add(mesh);
  };

  // ### RENDER
  const renderRequest = function () {
    isRequestRender = true;
  };
  const animate = function () {
    if (isRequestRender) {
      controls && controls.update();

      renderer.render(scene, camera);

      isRequestRender = false;
    }
  };

  // ### RESIZE
  const onResize = function () {
    // common
		areaWidth = $container.offsetWidth;
		areaHeight = $container.offsetHeight;

    // world
    if ( camera ) {
      camera.aspect = areaWidth / areaHeight;
      camera.updateProjectionMatrix();
    }
    if ( renderer ) {
      const pixelRatio = Math.min(2, window.devicePixelRatio);
      renderer.setSize(areaWidth, areaHeight);
      renderer.setPixelRatio(pixelRatio);
    }

    renderRequest();
  };

  // ### EVENT
  window.addEventListener('load', onInit);
  window.addEventListener('resize', onResize);
};
App();