/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

$(document).ready(function(){
  
  const VAL_X = 5, VAL_0 = 1; 
  var turn = 1, 
  player1 = "human",
  player2 = "computer",
  player1Score = 0,
  player2Score = 0, 
  currentValue = VAL_X, 
  nonCurrentValue = VAL_0, 
  currentSymbol = "X", 
  gameSituation = "in progress",
      
  gameBoard = [0,0,0,0,0,0,0,0,0],
  generalStrategyArray = [0,0,0,0,0,0,0,0,0],
  row1, row2, row3, col1, col2, col3, diag1, diag2, sides,
  winArray = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],[0,0,0]],
  
  btnIndex = [["#btn0", "#btn1", "#btn2"], ["#btn3", "#btn4", "#btn5"], ["#btn6", "#btn7", "#btn8"], ["#btn0", "#btn3", "#btn6"], ["#btn1", "#btn4", "#btn7"], ["#btn2", "#btn5", "#btn8"], ["#btn0", "#btn4", "#btn8"], ["#btn2", "#btn4", "#btn6"]],
  
  generalStrategyBtns = ["#btn4", "#btn0", "#btn2", "#btn6", "#btn8", "#btn1", "#btn3", "#btn5", "#btn7"],
      oppositeSideBtns = ["#btn7", "#btn5", "#btn3", "#btn1"];
  
  
  
  /*--------------------------------------------------------------
  BUTTON CLICK EVENTS 
  ---------------------------------------------------------------*/

  $("#player1").on('click', function(){
    if ($(this).html() == "Human - X") {
      $(this).html("Skynet - X");
      player1 = "computer";
    } else {
       $(this).html("Human - X");
      player1 = "human";
    }
    resetScore();
    $("#newGame").click();
  });
  
   $("#player2").on('click', function(){
    if ($( this ).html() == "O - Human") {
      $(this).html("O - Skynet");
      player2 = "computer";
    } else {
       $(this).html("O - Human");
      player2 = "human";
    }
     resetScore(); 
     $("#newGame").click();
  });
  
  $("#newGame").on('click', function(){
    turn = 1;
    gameSituation = "in progress";
    currentValue = VAL_X; 
    currentSymbol = "X"; 
    underlinePlayerToPlay();
    gameBoard = [0,0,0,0,0,0,0,0,0];
    generalStrategyArray = [0,0,0,0,0,0,0,0,0];
    winArray = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]];
    $("#scoreBoard").html(`${player1Score} : ${player2Score}`);
    $(".boardButton").html("").removeClass("player1Style player2Style winAnimation").prop("disabled", false);
    $("#newGame").html("New Game");
    if (player1 == "computer") {
      console.log("computer should play now!!");
      computerAI(); 
    } else {
      return; 
    }
  }) //newgame
  
  $(".boardButton").on("click", function(){
   $(this).html(currentSymbol);
   let tempStyle = turn % 2 === 0 ? "player2Style" : "player1Style"; 
   $(this).addClass(tempStyle); 
   $(this).prop("disabled", true);
   let btnClicked = $(this).data("num"); 
   updateGameBoard(btnClicked); 
   evaluateWin(); 
   turnUpdate();
 });
  
  /*--------------------------------------------------------------
  END OF TURN FUNCTIONS 
  ---------------------------------------------------------------*/ 
  
  function underlinePlayerToPlay() {
    if (currentSymbol == "X") {
      $("#player1").addClass("underline");
      $("#player2").removeClass("underline");     
    } else {
      $("#player2").addClass("underline");
      $("#player1").removeClass("underline");
    }
  }
  
  function turnUpdate(){
    if (turn < 9 && gameSituation == "in progress") {
      turn += 1; 
      currentSymbol = turn % 2 === 0 ? "O" : "X";
      currentValue = turn % 2 === 0 ? VAL_0 : VAL_X;
      nonCurrentValue = turn % 2 === 0 ? VAL_X : VAL_0;
      underlinePlayerToPlay();
        if (player1 == "computer" && turn % 2 !== 0 || player2 == "computer" && turn % 2 === 0) {
          computerAI(); 
        } else {
          return; 
        }
    } else if (turn == 9 && gameSituation == "in progress") {
      $("#newGame").html("Play again?");
    }  
  }
   
  function evaluateWin () {
    for (let i = 0; i < winArray.length; i++) {
      if ((winArray[i][0] + winArray[i][1] + winArray[i][2]) == currentValue * 3)  {
        $(".boardButton").prop("disabled", true);
        highlightWin(i);
        updateScore(); 
        gameSituation = "winner"; 
        $("#newGame").html("Play again?");
      } 
    }      
  }
  
  function highlightWin(arrayNo){
    $(btnIndex[arrayNo][0]).addClass("winAnimation");
    $(btnIndex[arrayNo][1]).addClass("winAnimation");
    $(btnIndex[arrayNo][2]).addClass("winAnimation");
  }
  
 /*--------------------------------------------------------------
 SCORE UPDATE FUNCTIONS
 ---------------------------------------------------------------*/
  
  function updateScore() {
    if (currentSymbol == "X") {
      player1Score += 1; 
    } else {
      player2Score += 1; 
    }
    $("#scoreBoard").html(`${player1Score} : ${player2Score}`);
  }
  
  function resetScore() {
    player1Score = 0; 
    player2Score = 0;
    $("#scoreBoard").html(`${player1Score} : ${player2Score}`);
  }
  
  /*--------------------------------------------------------------
  GAMEBOARD MODELLING FUNCTION
  ---------------------------------------------------------------*/
  
  function updateGameBoard(btnNo){
    gameBoard[btnNo] = currentValue; 
    row1 = [gameBoard[0], gameBoard[1], gameBoard[2]];
    row2 = [gameBoard[3], gameBoard[4], gameBoard[5]];
    row3 = [gameBoard[6], gameBoard[7], gameBoard[8]];
    col1 = [gameBoard[0], gameBoard[3], gameBoard[6]];
    col2 = [gameBoard[1], gameBoard[4], gameBoard[7]];
    col3 = [gameBoard[2], gameBoard[5], gameBoard[8]];
    diag1 = [gameBoard[0], gameBoard[4], gameBoard[8]];
    diag2 = [gameBoard[2], gameBoard[4], gameBoard[6]];
    sides = [gameBoard[1], gameBoard[3], gameBoard[5], gameBoard[7]];
    winArray = [row1, row2, row3, col1, col2, col3, diag1, diag2];   
    generalStrategyArray = [gameBoard[4], gameBoard[0], gameBoard[2], gameBoard[6], gameBoard[8], gameBoard[1], gameBoard[3], gameBoard[5], gameBoard[7]];
  } 
  
  /*----------------------------------------------------------
  AI AUXILIARY FUNCTIONS
  -----------------------------------------------------------*/

  function canIWinThisTurn() {
    for (let i = 0, x = winArray.length; i < x; i++) {
      if ((winArray[i][0] + winArray[i][1] + winArray[i][2]) == currentValue * 2) { 
        let winBtn = btnIndex[i][winArray[i].indexOf(0)]; 
        $(winBtn).click();
        return true; 
      } 
    }  return false; 
  }  
    
  function canYouWinNextTurn() {
    for (let i = 0, x = winArray.length; i < x; i++) {
      if ((winArray[i][0] + winArray[i][1] + winArray[i][2]) == nonCurrentValue * 2) {
        let blockBtn = btnIndex[i][winArray[i].indexOf(0)];
        $(blockBtn).click();
        return true; 
      } 
    } return false; 
}
  
  function generalStrategy() {
    console.log("GS CALL");
    for (let i in generalStrategyArray) {
      if (generalStrategyArray[i] === 0) {
        $(generalStrategyBtns[i]).click(); 
         break; 
      } 
    } 
  }

  function equalArrays(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

  function sumArray(array) {
    var count = 0;
   for (var i=array.length; i--;) {
     count += array[i];
   }
    return count; 
  }
 
  /*---------------------------------------------------------
  AI CONTROL FUNCTION
  ----------------------------------------------------------*/
   
  function computerAI() {   

    setTimeout(function(){
      
  var didWin =  canIWinThisTurn(); 
    console.log("didwin" + didWin); 
    if (didWin) {
      return; 
    }

  var didBlock = canYouWinNextTurn();
      console.log("didblock" + didBlock);
    if (didBlock) {
      return; 
    }

     if (turn == 5 && gameBoard[1] == 1 && gameBoard[6] === 0) {
     $("#btn6").click();
     return;
   }    
    if (turn == 4 && (equalArrays(diag1, [5,1,5]) || equalArrays(diag2, [5,1,5]))) {
       $("#btn1").click();
        return;
   } 
   
     if (turn == 4 && sumArray(row1) == 6 && sumArray(row3) == 5) {
        $("#btn8").click(); 
        return; 
      }
     if (turn == 4 && sumArray(row1) == 5 && sumArray(row3) == 6) {
        $("#btn0").click(); 
        return; 
      }
     if (turn == 4 && sumArray(col1) == 6 && sumArray(col3) == 5) {
        $("#btn2").click(); 
        return; 
      }
     if (turn == 4 && sumArray(col1) == 5 && sumArray(col3) == 6) {
        $("#btn6").click(); 
        return; 
      }
     
      if (turn == 4 && (equalArrays(sides, [1,0,5,5]) || equalArrays(sides, [1,5,0,5]) || equalArrays(sides, [5,5,1,0]) || equalArrays(sides, [0,5,1,5]))) {
        $("#btn6").click(); 
        return;
      }
      
      if (turn == 4 && (equalArrays(sides, [5,1,5,0]) || equalArrays(sides, [0,1,5,5]) || equalArrays(sides, [5,0,5,1]) || equalArrays(sides, [5,5,0,1]))) {
        $("#btn2").click(); 
        return;
      }
      
     if (turn == 2) {
       for (let i in sides) {
        if (sides[i] == 5) {
          let btn = oppositeSideBtns[i]; 
          $(btn).click();
          return; 
        }  
      } 
     } 
      
     generalStrategy(); 
   
 }, 200);
     
  } //computerAI func
 
   
}); //docready

// Style imports for Webpack 

__webpack_require__(4); 

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "body {\n  background-color: #000;\n  background: url(\"http://wallpapercave.com/wp/xoinmjE.jpg\");\n  background-size: cover;\n  font-family: Arial, sans-serif;\n  color: white;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n#main {\n  background-color: #0A2B54;\n  border-radius: 18px;\n  width: 320px;\n  height: 500px;\n  margin: 0 auto;\n  margin-top: 50px;\n  position: relative;\n  -moz-box-shadow: 0 0 5px 5px #888;\n  -webkit-box-shadow: 0 0 5px 5px #888;\n  box-shadow: 0 0 5px 5px #888; }\n\nh1 {\n  font-size: 0.6em;\n  text-align: center;\n  top: 20px;\n  position: relative; }\n\n.playerSelect {\n  background-color: #0A2B54;\n  color: #FFF;\n  font-size: 1.3em;\n  border: none;\n  width: 43%;\n  height: 40px;\n  top: 40px;\n  position: relative; }\n\n.playerSelect:nth-of-type(1) {\n  text-align: right;\n  padding-right: 10px;\n  text-shadow: 0 0 10px #f90404, 0 0 20px #f90404, 0 0 30px white, 0 0 40px white; }\n\n.playerSelect:nth-of-type(2) {\n  text-align: left;\n  float: right;\n  padding-left: 10px;\n  text-shadow: 0 0 10px #3ae05e, 0 0 20px #3ae05e, 0 0 30px white, 0 0 40px white; }\n\n#scoreBoard {\n  width: 12%;\n  display: inline-block;\n  text-align: center;\n  position: relative;\n  top: 38px; }\n\n.underline {\n  background-color: #154b8e; }\n\n.player1Style {\n  text-shadow: 0 0 10px #f90404, 0 0 20px #f90404, 0 0 30px white, 0 0 40px white; }\n\n.player2Style {\n  text-shadow: 0 0 10px #3ae05e, 0 0 20px #3ae05e, 0 0 30px white, 0 0 40px white; }\n\ntable {\n  position: relative;\n  margin: 0 auto;\n  top: 70px; }\n\n.boardButton {\n  background-color: #081C35;\n  height: 87px;\n  width: 87px;\n  font-size: 50px;\n  font-weight: bold;\n  transition: all 0.6s; }\n  .boardButton:disabled {\n    color: #FFF; }\n\nbutton:hover {\n  background-color: #154b8e; }\n\n#newGame {\n  font-size: 1.8em;\n  background-color: inherit;\n  position: absolute;\n  bottom: 15px;\n  color: white;\n  text-shadow: 0 0 10px green,  0 0 20px green, 0 0 30px white, 0 0 40px white;\n  border: 0;\n  width: 100%;\n  height: auto;\n  padding: 10px; }\n  #newGame:hover {\n    background-color: #124e98; }\n\n.winAnimation {\n  background-color: #1957a4; }\n", ""]);

// exports


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/lib/loader.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
(function webpackMissingModule() { throw new Error("Cannot find module \"dev-server\""); }());


/***/ })
/******/ ]);