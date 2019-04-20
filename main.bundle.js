/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Canvas/Canvas.js":
/*!******************************!*\
  !*** ./src/Canvas/Canvas.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Canvas {\n  constructor(document) {\n    this.canvas = document.getElementById('my-canvas');\n    this.ctx = this.canvas.getContext('2d');\n    this.ctx.lineWidth = 1;\n    this.vertexSize = 10;\n    this.fillStyle = \"rgb(209, 127, 46)\";\n    this.ctx.strokeStyle = \"white\";\n    this.delay = 0;\n  }\n\n  drawVertices(vertices) {\n    checkValidVertices(vertices);\n    let x, y;\n    this.ctx.fillStyle = 'white';\n    x = vertices[0].x - this.vertexSize / 2;\n    y = vertices[0].y - this.vertexSize / 2;\n    this.ctx.fillRect(x, y, this.vertexSize, this.vertexSize);\n    this.ctx.rect(x, y, this.vertexSize, this.vertexSize);\n    this.ctx.fillStyle = this.fillStyle;\n\n    for (let i = 1; i < vertices.length; i++) {\n      x = vertices[i].x - this.vertexSize / 2;\n      y = vertices[i].y - this.vertexSize / 2;\n      this.ctx.beginPath();\n      this.ctx.fillRect(x, y, this.vertexSize, this.vertexSize);\n      this.ctx.rect(x, y, this.vertexSize, this.vertexSize);\n      this.ctx.stroke();\n      this.ctx.closePath();\n    }\n  }\n\n  drawEdgesBetweenVertices(v1, v2) {\n    checkValidVertex(v1);\n    checkValidVertex(v2);\n    this.ctx.beginPath();\n    this.ctx.moveTo(v1.x, v1.y);\n    this.ctx.lineTo(v2.x, v2.y);\n    this.ctx.stroke();\n    this.ctx.closePath();\n  }\n\n  drawTour(vertices, edges) {\n    return new Promise((resolve, reject) => {\n      setTimeout(() => {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n        for (let i = 0; i < edges.length; i++) {\n          this.drawEdgesBetweenVertices(edges[i].v1, edges[i].v2);\n        }\n\n        this.drawVertices(vertices);\n        resolve();\n      }, this.delay);\n    });\n  }\n\n  setDelay(delay) {\n    if (delay < 0 || typeof delay !== 'number') {\n      throw \"Delay must be a positive number\";\n    }\n\n    this.delay = delay;\n  }\n\n} // Validation check\n\n\nconst checkValidVertices = vertices => {\n  if (!Array.isArray(vertices)) {\n    throw \"Vertices must be an array\";\n  }\n\n  vertices.every(vertex => {\n    checkValidVertex(vertex);\n  });\n};\n\nconst checkValidVertex = vertex => {\n  if (typeof vertex !== 'object') {\n    throw 'Vertex must be an object';\n  }\n\n  if ('x' in vertex && 'y' in vertex) {\n    if (typeof vertex.x !== 'number' || typeof vertex.y !== 'number') {\n      throw \"Vertex x and y must be numbers\";\n    }\n  } else {\n    throw 'Vertex must contain x and y';\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Canvas);\n\n//# sourceURL=webpack:///./src/Canvas/Canvas.js?");

/***/ }),

/***/ "./src/Listeners/Listeners.js":
/*!************************************!*\
  !*** ./src/Listeners/Listeners.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Utilities_Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utilities/Utilities */ \"./src/Utilities/Utilities.js\");\n\n\nconst initializeFirstTour = tsp => {\n  const randomPoints = _Utilities_Utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateRandomVertexArray(_Utilities_Utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateRandomVertex, 20, 800, 800);\n  tsp.setupTour(randomPoints);\n};\n\nconst startStopSimulationListener = tsp => {\n  document.getElementById('start-simulation').addEventListener('click', e => tsp.runSimulation());\n  document.getElementById('stop-simulation').addEventListener('click', e => tsp.stopSimulation());\n};\n\nconst generateNewProblemListener = tsp => {\n  document.getElementById('random-problem-form').addEventListener('submit', e => {\n    e.preventDefault();\n    tsp.stopSimulation();\n    const points = document.getElementById('vertices').value;\n    const randomPoints = _Utilities_Utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateRandomVertexArray(_Utilities_Utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateRandomVertex, points, 800, 800);\n    tsp.setupTour(randomPoints);\n  });\n};\n\nconst fileUploadSubmitListener = tsp => {\n  const fileLoader = document.getElementById('user-file');\n  fileUploadListener(fileLoader);\n  document.getElementById('upload-problem').addEventListener('submit', async e => {\n    e.preventDefault();\n\n    if (fileLoader.files.length > 0) {\n      let vertices = await _Utilities_Utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].readFile(fileLoader.files[0]);\n      tsp.setupTour(vertices);\n    }\n  });\n};\n\nconst fileUploadListener = fileLoader => {\n  const label = document.getElementById('user-file-label');\n  fileLoader.addEventListener('change', e => {\n    if (fileLoader.files.length > 0) {\n      label.innerHTML = e.target.value.split('\\\\').pop();\n    } else {\n      label.innerHTML = '<i class=\"fas fa-upload\"></i> Upload .tsv File';\n    }\n  });\n};\n\nconst setDelayListener = canvas => {\n  document.getElementById('set-delay-form').addEventListener('submit', e => {\n    e.preventDefault();\n    const delay = document.getElementById('delay').value;\n    canvas.setDelay(Number(delay));\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  initializeFirstTour,\n  startStopSimulationListener,\n  generateNewProblemListener,\n  fileUploadSubmitListener,\n  setDelayListener\n});\n\n//# sourceURL=webpack:///./src/Listeners/Listeners.js?");

/***/ }),

/***/ "./src/TSP/TSP.js":
/*!************************!*\
  !*** ./src/TSP/TSP.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass TSP {\n  constructor(tour, tempTour, ui, canvas) {\n    this.tour = tour;\n    this.tempTour = tempTour;\n    this.running = false;\n    this.ui = ui;\n    this.canvas = canvas;\n  }\n\n  setupTour(vertices) {\n    this.tour.vertices = [...vertices];\n    this.tour.updateTourProperties();\n    this.canvas.drawTour(this.tour.vertices, this.tour.edges);\n    this.ui.displayTotalDistance(this.tour.totalDistance);\n    this.ui.displayGeneration(0);\n    this.tempTour.resetTour();\n  }\n\n  runSimulation() {\n    if (!this.running) {\n      this.running = true;\n      this.twoOpt();\n    }\n  }\n\n  stopSimulation() {\n    this.running = false;\n  }\n\n  twoOptSwap(i, k) {\n    // take route[0] to route[i - 1] and add them in order to new_route\n    for (let a = 0; a < i; a++) {\n      this.tempTour.vertices[a] = this.tour.vertices[a];\n    } // take route[i] to route[k] and add them in reverse order to new_route\n\n\n    let dec = 0;\n\n    for (let a = i; a <= k; a++) {\n      this.tempTour.vertices[a] = this.tour.vertices[k - dec];\n      dec++;\n    } // take route[k+1] to end and add them in order to new_route\n\n\n    for (let a = k + 1; a < this.tour.vertices.length; a++) {\n      this.tempTour.vertices[a] = this.tour.vertices[a];\n    }\n\n    this.tempTour.updateTourProperties();\n  }\n\n  async twoOpt() {\n    let improved = true;\n    let generation = 0;\n    this.ui.displayGeneration(generation);\n    this.ui.displayStatus(true);\n    const n = this.tour.vertices.length;\n\n    while (improved && this.running) {\n      improved = false;\n      generation++;\n\n      for (let i = 1; i < n - 1; i++) {\n        if (!this.running) break;\n\n        for (let k = i + 1; k < n; k++) {\n          if (!this.running) break;\n          this.twoOptSwap(i, k);\n          this.ui.displayGeneration(generation);\n\n          if (this.tempTour.totalDistance < this.tour.totalDistance) {\n            improved = true;\n\n            for (let i = 0; i < n; i++) {\n              this.tour.vertices[i] = this.tempTour.vertices[i];\n            }\n\n            this.tour.updateTourProperties();\n            this.ui.displayTotalDistance(this.tour.totalDistance);\n            await this.canvas.drawTour(this.tour.vertices, this.tour.edges);\n          }\n        }\n      }\n    }\n\n    this.ui.displayStatus(false);\n    this.running = false;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TSP);\n\n//# sourceURL=webpack:///./src/TSP/TSP.js?");

/***/ }),

/***/ "./src/Tour/Tour.js":
/*!**************************!*\
  !*** ./src/Tour/Tour.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Tour {\n  constructor() {\n    this.totalDistance = 0;\n    this.vertices = [];\n    this.edges = [];\n  }\n\n  resetTour() {\n    this.totalDistance = 0;\n    this.vertices = [];\n    this.edges = [];\n  }\n\n  calculateEdgeLength(edge) {\n    // calculate and return Euclidean distance between the two vertices\n    const deltaXsqaured = Math.pow(edge.v1.x - edge.v2.x, 2);\n    const deltaYsqaured = Math.pow(edge.v1.y - edge.v2.y, 2);\n    return Number(Math.sqrt(deltaXsqaured + deltaYsqaured).toFixed(2));\n  }\n\n  updateTourProperties() {\n    let edges = [];\n    let distance = 0; // create edges and calculate distance along the way (round trip)\n\n    for (let i = 0; i < this.vertices.length; i++) {\n      if (i < this.vertices.length - 1) {\n        edges.push({\n          v1: this.vertices[i],\n          v2: this.vertices[i + 1]\n        });\n        distance += this.calculateEdgeLength({\n          v1: this.vertices[i],\n          v2: this.vertices[i + 1]\n        });\n      } else {\n        edges.push({\n          v1: this.vertices[i],\n          v2: this.vertices[0]\n        });\n        distance += this.calculateEdgeLength({\n          v1: this.vertices[i],\n          v2: this.vertices[0]\n        });\n      }\n    }\n\n    this.edges = edges;\n    this.totalDistance = distance;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tour);\n\n//# sourceURL=webpack:///./src/Tour/Tour.js?");

/***/ }),

/***/ "./src/UI/UI.js":
/*!**********************!*\
  !*** ./src/UI/UI.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass UI {\n  constructor(document) {\n    this.totalDistance = document.getElementById('total-distance');\n    this.generation = document.getElementById('generation');\n    this.status = document.getElementById('status');\n  }\n\n  displayTotalDistance(distance) {\n    if (typeof distance !== 'number') {\n      throw 'Distance must be a number';\n    }\n\n    this.totalDistance.innerText = distance.toFixed(2).toString();\n  }\n\n  displayGeneration(generation) {\n    if (typeof generation !== 'number') {\n      throw 'Generation must be a number';\n    }\n\n    this.generation.innerText = generation.toString();\n  }\n\n  displayStatus(running) {\n    if (typeof running !== 'boolean') {\n      throw 'Running must be a boolean';\n    }\n\n    if (running) {\n      this.status.innerText = 'Running';\n      this.status.className = 'green';\n    } else {\n      this.status.innerText = 'Not running';\n      this.status.className = 'red';\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (UI);\n\n//# sourceURL=webpack:///./src/UI/UI.js?");

/***/ }),

/***/ "./src/Utilities/Utilities.js":
/*!************************************!*\
  !*** ./src/Utilities/Utilities.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst generateRandomVertex = (random, xMax, yMax) => {\n  const x = Math.ceil(random() * xMax);\n  const y = Math.ceil(random() * yMax);\n  return {\n    x,\n    y\n  };\n};\n\nconst generateRandomVertexArray = (vertexGenerator, count, xMax, yMax) => {\n  const result = [];\n\n  for (let i = 0; i < count; i++) {\n    result.push(vertexGenerator(Math.random, xMax, yMax));\n  }\n\n  return result;\n};\n\nconst readFile = async file => {\n  try {\n    const fileContents = await readUploadedFileAsText(file);\n    let points = [];\n    const lines = fileContents.split('\\n').map(line => {\n      return line.trim().split(' ');\n    });\n    points = lines.map(point => {\n      return {\n        x: Number(point[0]),\n        y: Number(point[1])\n      };\n    });\n    return points;\n  } catch (e) {\n    console.log(e);\n  }\n};\n\nconst readUploadedFileAsText = inputFile => {\n  const fileReader = new FileReader();\n  return new Promise((resolve, reject) => {\n    fileReader.onerror = () => {\n      fileReader.abort();\n      reject(new DOMException(\"Problem parsing input file.\"));\n    };\n\n    fileReader.onload = () => {\n      resolve(fileReader.result);\n    };\n\n    fileReader.readAsText(inputFile);\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  generateRandomVertex,\n  generateRandomVertexArray,\n  readFile\n});\n\n//# sourceURL=webpack:///./src/Utilities/Utilities.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TSP_TSP__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TSP/TSP */ \"./src/TSP/TSP.js\");\n/* harmony import */ var _Canvas_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas/Canvas */ \"./src/Canvas/Canvas.js\");\n/* harmony import */ var _UI_UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI/UI */ \"./src/UI/UI.js\");\n/* harmony import */ var _Tour_Tour__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tour/Tour */ \"./src/Tour/Tour.js\");\n/* harmony import */ var _Listeners_Listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Listeners/Listeners */ \"./src/Listeners/Listeners.js\");\n\n\n\n\n\nwindow.addEventListener('load', function () {\n  const tour = new _Tour_Tour__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n  const tempTour = new _Tour_Tour__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n  const canvas = new _Canvas_Canvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"](window.document);\n  const ui = new _UI_UI__WEBPACK_IMPORTED_MODULE_2__[\"default\"](window.document);\n  const tsp = new _TSP_TSP__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tour, tempTour, ui, canvas);\n  _Listeners_Listeners__WEBPACK_IMPORTED_MODULE_4__[\"default\"].initializeFirstTour(tsp);\n  _Listeners_Listeners__WEBPACK_IMPORTED_MODULE_4__[\"default\"].startStopSimulationListener(tsp);\n  _Listeners_Listeners__WEBPACK_IMPORTED_MODULE_4__[\"default\"].generateNewProblemListener(tsp);\n  _Listeners_Listeners__WEBPACK_IMPORTED_MODULE_4__[\"default\"].fileUploadSubmitListener(tsp);\n  _Listeners_Listeners__WEBPACK_IMPORTED_MODULE_4__[\"default\"].setDelayListener(canvas);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });