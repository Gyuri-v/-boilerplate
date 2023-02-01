import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const DEBUG = location.search.indexOf('debug') > -1;

const App = function () {
  let ww, wh;
  let renderer, scene, camera, light, controls;
  let isRequestRender = false;

  const $container = document.querySelector('.container');
  let $canvas;

  const init = function () {
    // Window
    ww = window.innerWidth;
    wh = window.innerHeight;

    // Scene
    scene = new THREE.Scene();

    // Renderer
    renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor('#000', 1.0);
    renderer.setSize(ww, wh);
    $canvas = renderer.domElement;
    $container.appendChild($canvas);

    // Camera
    camera = new THREE.PerspectiveCamera(70, ww / wh, 1, 999);
    camera.position.set(0, 0, 10);
    scene.add(camera);

    // Light
    light = new THREE.AmbientLight('#fff', 1);
    scene.add(light);

    // Controls
    if (DEBUG) {
      controls = new OrbitControls(camera, $canvas);
      controls.addEventListener('change', renderRequest);
    }

    // Setting
    setModels();

    // Render
    renderRequest();
    render();

    // Loading
    THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      if (itemsLoaded === itemsTotal) {
        render();
      }
    };
  };

  const resize = function () {
    //
  };

  // Setting -------------------
  const setModels = function () {
    //
  };

  // Render -------------------
  const renderRequest = function () {
    isRequestRender = true;
  };

  const render = function () {
    if (isRequestRender) {
      renderer.setSize(ww, wh);
      renderer.render(scene, camera);
    }
    window.requestAnimationFrame(render);
  };

  window.addEventListener('load', init);
  window.addEventListener('resize', resize);
};
App();
