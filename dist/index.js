/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./vanilla-js-match-height.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MatchHeight)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Match the heights of elements
 * 
 *  new MatchHeight(CHILD_CLASS, PARENT_CLASS ( Optional ), BY_ROW ( Optional, Default to true ));
 */
var MatchHeight = /*#__PURE__*/function () {
  function MatchHeight(element) {
    var _this = this;

    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var byrow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, MatchHeight);

    // The User Settings
    this.element = element;
    this.parent = parent ? document.querySelectorAll(parent) : document;
    this.byrow = byrow; // Set up for later use

    this.elements = []; // Run on load

    window.addEventListener("load", function () {
      _this.getParents();
    }); // Run on Resize

    window.addEventListener("resize", function () {
      setTimeout(function () {
        if (_this.elements) {
          _this.elements.forEach(function (elements) {
            _this.setLargestHeight(elements);
          });
        }
      });
    });
  } // If a parent is provided use this to get the elements


  _createClass(MatchHeight, [{
    key: "getParents",
    value: function getParents() {
      var _this2 = this;

      if (this.parent.length) {
        this.parent.forEach(function (wrapper) {
          var childElements = wrapper.querySelectorAll(_this2.element);

          if (childElements.length) {
            _this2.setRows(childElements);
          }
        });
      } else {
        var elements = document.querySelectorAll(this.element);

        if (elements.length) {
          this.setRows(elements);
        }
      }
    } // If rows are enabled then Match Height by Row

  }, {
    key: "setRows",
    value: function setRows(elements) {
      var _this3 = this;

      if (this.byrow) {
        var groups = [];
        elements.forEach(function (element) {
          var offset = element.getBoundingClientRect().top + window.scrollY;
          groups[offset] = [];
        });
        elements.forEach(function (element) {
          var offset = element.getBoundingClientRect().top + window.scrollY;
          groups[offset].push(element);
        });
        groups.forEach(function (elements) {
          _this3.setLargestHeight(elements);
        });
      } else {
        this.setLargestHeight(elements);
      }
    } // Set the heights of the elements

  }, {
    key: "setLargestHeight",
    value: function setLargestHeight(elements) {
      var heights = []; // Set to call on resize

      this.elements.push(elements);
      elements.forEach(function (element) {
        element.style.height = null;
        heights.push(element.offsetHeight);
      });
      var largest = Math.max.apply(Math, heights);
      elements.forEach(function (element) {
        element.style.height = largest + 'px';
      });
    }
  }]);

  return MatchHeight;
}();


/******/ })()
;