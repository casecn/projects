/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2303-ftb-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;



const fetchAllPlayers = async () => {
    let apiURL = `${APIURL}players`;
    try {
        const response = await fetch (apiURL);
        const jsonData = await response.json();
        
        if(jsonData.error){
            throw jsonData.error;
        }
        return jsonData.data.players
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
};

const fetchSinglePlayer = async (playerId) => {
    let apiURL = `${APIURL}/players/${playerId}`;
    try{
        const playerData = await fetch (apiURL);
            
        const playerJSON = await playerData.json();
        let response = playerJSON.data.player;
        if(playerJSON.error){
            throw playerJSON.error;
        }
        return response;
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
};

const addNewPlayer = async (playerObj) => {
    try{
        const apiOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerObj)
        }
        const response = await fetch(`${APIURL}/players`, apiOptions);
        const result = await response.json();
        return result;
    }catch (error){
        console.error(error);
    }
};

const removePlayer = async (playerId) => {
    try{
        const apiOptions = {
            method: 'DELETE'};
        const response = await fetch (`${APIURL}/players/${playerId}`, apiOptions);
        const result = await response.json();
        console.log(result);
    }catch (error){
        console.error(error);
    }
};




/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "refreshPage": () => (/* binding */ refreshPage),
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="remove-button" data-id=${pup.id}>Remove from Roster</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];

    button.addEventListener('click', async() => {
    /*****MY CODE *******/
      let puppyID = button.dataset.id
      const puppyInfo = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(puppyID);
      renderSinglePlayer(puppyInfo);
      
      try{
        //return to list after back click
        const returnButton = document.getElementById('see-all');
        returnButton.addEventListener ('click', async() => {
          refreshPage();
        });
      } catch (error)
      {
        console.log(error)
      }
    });
    /**********************/
  }
  let removeButtons = [...document.getElementsByClassName('remove-button')];
  for (let i = 0; i < removeButtons.length; i++) {
    const removeBotton = removeButtons[i];
    removeBotton.addEventListener('click', async() => {
      try{
      let puppyID = removeBotton.dataset.id;
      await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(puppyID);
      refreshPage();
      } catch(error) {
        console.log(`REMOVE ERROR: ${error}`)
      }
    })
  }
};

const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }
  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;

  playerContainer.innerHTML = pupHTML;
};

const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;
  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    /*   MY CODE   */
    event.preventDefault();
    console.log(form.elements.name.value + " -- " +form.elements.breed.value)
    //if(!form.elements.name.value && !form.elements.breed.value){
    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value
    }
    ;(0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
    
    refreshPage();
    /*********************/
  //}
  });
};


/** ADDED to DRY out refresh */
async  function refreshPage() {
  try{
    let form = document.querySelector('#new-player-form > form');
    const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
    renderAllPlayers(players)
    form.elements.breed.value = "";
    form.elements.name.value = "";
  } catch (error) {
      console.log(`refreshPage ERROR: ${error}`)
  }
  }


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}

init()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2xCLEVBQUUsb0VBQW1CO0FBQ3JCOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2FqYXhIZWxwZXJzLmpzIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC8uL2NsaWVudC9yZW5kZXJIZWxwZXJzLmpzIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3Avd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC8uL2NsaWVudC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBZGQgeW91ciBjb2hvcnQgbmFtZSB0byB0aGUgY29ob3J0TmFtZSB2YXJpYWJsZSBiZWxvdywgcmVwbGFjaW5nIHRoZSAnQ09IT1JULU5BTUUnIHBsYWNlaG9sZGVyXG5jb25zdCBjb2hvcnROYW1lID0gJzIzMDMtZnRiLXdlYi1wdCc7XG4vLyBVc2UgdGhlIEFQSVVSTCB2YXJpYWJsZSBmb3IgZmV0Y2ggcmVxdWVzdHNcbmNvbnN0IEFQSVVSTCA9IGBodHRwczovL2ZzYS1wdXBweS1ib3dsLmhlcm9rdWFwcC5jb20vYXBpLyR7Y29ob3J0TmFtZX0vYDtcblxuXG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbFBsYXllcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGFwaVVSTCA9IGAke0FQSVVSTH1wbGF5ZXJzYDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoIChhcGlVUkwpO1xuICAgICAgICBjb25zdCBqc29uRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGpzb25EYXRhLmVycm9yKXtcbiAgICAgICAgICAgIHRocm93IGpzb25EYXRhLmVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uRGF0YS5kYXRhLnBsYXllcnNcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgRVJST1I6ICR7ZXJyb3J9YClcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hTaW5nbGVQbGF5ZXIgPSBhc3luYyAocGxheWVySWQpID0+IHtcbiAgICBsZXQgYXBpVVJMID0gYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YDtcbiAgICB0cnl7XG4gICAgICAgIGNvbnN0IHBsYXllckRhdGEgPSBhd2FpdCBmZXRjaCAoYXBpVVJMKTtcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBwbGF5ZXJKU09OID0gYXdhaXQgcGxheWVyRGF0YS5qc29uKCk7XG4gICAgICAgIGxldCByZXNwb25zZSA9IHBsYXllckpTT04uZGF0YS5wbGF5ZXI7XG4gICAgICAgIGlmKHBsYXllckpTT04uZXJyb3Ipe1xuICAgICAgICAgICAgdGhyb3cgcGxheWVySlNPTi5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVSUk9SOiAke2Vycm9yfWApXG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld1BsYXllciA9IGFzeW5jIChwbGF5ZXJPYmopID0+IHtcbiAgICB0cnl7XG4gICAgICAgIGNvbnN0IGFwaU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBsYXllck9iailcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0FQSVVSTH0vcGxheWVyc2AsIGFwaU9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfWNhdGNoIChlcnJvcil7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVQbGF5ZXIgPSBhc3luYyAocGxheWVySWQpID0+IHtcbiAgICB0cnl7XG4gICAgICAgIGNvbnN0IGFwaU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCAoYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YCwgYXBpT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxufTtcblxuXG4iLCJpbXBvcnQge2ZldGNoQWxsUGxheWVycywgZmV0Y2hTaW5nbGVQbGF5ZXIsIGFkZE5ld1BsYXllciwgcmVtb3ZlUGxheWVyfSBmcm9tICcuL2FqYXhIZWxwZXJzJztcbmNvbnN0IHBsYXllckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwtcGxheWVycy1jb250YWluZXInKTtcbmNvbnN0IG5ld1BsYXllckZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXBsYXllci1mb3JtJyk7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJBbGxQbGF5ZXJzID0gKHBsYXllckxpc3QpID0+IHtcbiAgLy8gRmlyc3QgY2hlY2sgaWYgd2UgaGF2ZSBhbnkgZGF0YSBiZWZvcmUgdHJ5aW5nIHRvIHJlbmRlciBpdCFcbiAgaWYgKCFwbGF5ZXJMaXN0IHx8ICFwbGF5ZXJMaXN0Lmxlbmd0aCkge1xuICAgIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGgzPk5vIHBsYXllcnMgdG8gZGlzcGxheSE8L2gzPic7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBsaXN0IG9mIHBsYXllcnMsIGFuZCBjb25zdHJ1Y3Qgc29tZSBIVE1MIHRvIGRpc3BsYXkgZWFjaCBvbmVcbiAgbGV0IHBsYXllckNvbnRhaW5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHVwID0gcGxheWVyTGlzdFtpXTtcbiAgICBsZXQgcHVwSFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzaW5nbGUtcGxheWVyLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1pbmZvXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwdXAtdGl0bGVcIj4ke3B1cC5uYW1lfTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInB1cC1udW1iZXJcIj4jJHtwdXAuaWR9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGltZyBzcmM9XCIke3B1cC5pbWFnZVVybH1cIiBhbHQ9XCJwaG90byBvZiAke3B1cC5uYW1lfSB0aGUgcHVwcHlcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRldGFpbC1idXR0b25cIiBkYXRhLWlkPSR7cHVwLmlkfT5TZWUgZGV0YWlsczwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLWJ1dHRvblwiIGRhdGEtaWQ9JHtwdXAuaWR9PlJlbW92ZSBmcm9tIFJvc3RlcjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBwbGF5ZXJDb250YWluZXJIVE1MICs9IHB1cEhUTUw7XG4gIH1cblxuICAvLyBBZnRlciBsb29waW5nLCBmaWxsIHRoZSBgcGxheWVyQ29udGFpbmVyYCBkaXYgd2l0aCB0aGUgSFRNTCB3ZSBjb25zdHJ1Y3RlZCBhYm92ZVxuICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcGxheWVyQ29udGFpbmVySFRNTDtcblxuICAvLyBOb3cgdGhhdCB0aGUgSFRNTCBmb3IgYWxsIHBsYXllcnMgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTSxcbiAgLy8gd2Ugd2FudCB0byBncmFiIHRob3NlIFwiU2VlIGRldGFpbHNcIiBidXR0b25zIG9uIGVhY2ggcGxheWVyXG4gIC8vIGFuZCBhdHRhY2ggYSBjbGljayBoYW5kbGVyIHRvIGVhY2ggb25lXG4gIGxldCBkZXRhaWxCdXR0b25zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RldGFpbC1idXR0b24nKV07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGV0YWlsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRldGFpbEJ1dHRvbnNbaV07XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYygpID0+IHtcbiAgICAvKioqKipNWSBDT0RFICoqKioqKiovXG4gICAgICBsZXQgcHVwcHlJRCA9IGJ1dHRvbi5kYXRhc2V0LmlkXG4gICAgICBjb25zdCBwdXBweUluZm8gPSBhd2FpdCBmZXRjaFNpbmdsZVBsYXllcihwdXBweUlEKTtcbiAgICAgIHJlbmRlclNpbmdsZVBsYXllcihwdXBweUluZm8pO1xuICAgICAgXG4gICAgICB0cnl7XG4gICAgICAgIC8vcmV0dXJuIHRvIGxpc3QgYWZ0ZXIgYmFjayBjbGlja1xuICAgICAgICBjb25zdCByZXR1cm5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlLWFsbCcpO1xuICAgICAgICByZXR1cm5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgYXN5bmMoKSA9PiB7XG4gICAgICAgICAgcmVmcmVzaFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICB9XG4gICAgfSk7XG4gICAgLyoqKioqKioqKioqKioqKioqKioqKiovXG4gIH1cbiAgbGV0IHJlbW92ZUJ1dHRvbnMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVtb3ZlLWJ1dHRvbicpXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW1vdmVCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcmVtb3ZlQm90dG9uID0gcmVtb3ZlQnV0dG9uc1tpXTtcbiAgICByZW1vdmVCb3R0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYygpID0+IHtcbiAgICAgIHRyeXtcbiAgICAgIGxldCBwdXBweUlEID0gcmVtb3ZlQm90dG9uLmRhdGFzZXQuaWQ7XG4gICAgICBhd2FpdCByZW1vdmVQbGF5ZXIocHVwcHlJRCk7XG4gICAgICByZWZyZXNoUGFnZSgpO1xuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgUkVNT1ZFIEVSUk9SOiAke2Vycm9yfWApXG4gICAgICB9XG4gICAgfSlcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclNpbmdsZVBsYXllciA9IChwbGF5ZXJPYmopID0+IHtcbiAgaWYgKCFwbGF5ZXJPYmogfHwgIXBsYXllck9iai5pZCkge1xuICAgIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBcIjxoMz5Db3VsZG4ndCBmaW5kIGRhdGEgZm9yIHRoaXMgcGxheWVyITwvaDM+XCI7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBwdXBIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJzaW5nbGUtcGxheWVyLXZpZXdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItaW5mb1wiPlxuICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cGxheWVyT2JqLm5hbWV9PC9wPlxuICAgICAgICA8cCBjbGFzcz1cInB1cC1udW1iZXJcIj4jJHtwbGF5ZXJPYmouaWR9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8cD5UZWFtOiAke3BsYXllck9iai50ZWFtID8gcGxheWVyT2JqLnRlYW0ubmFtZSA6ICdVbmFzc2lnbmVkJ308L3A+XG4gICAgICA8cD5CcmVlZDogJHtwbGF5ZXJPYmouYnJlZWR9PC9wPlxuICAgICAgPGltZyBzcmM9XCIke3BsYXllck9iai5pbWFnZVVybH1cIiBhbHQ9XCJwaG90byBvZiAke1xuICAgIHBsYXllck9iai5uYW1lXG4gIH0gdGhlIHB1cHB5XCI+XG4gICAgICA8YnV0dG9uIGlkPVwic2VlLWFsbFwiPkJhY2sgdG8gYWxsIHBsYXllcnM8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcHVwSFRNTDtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJOZXdQbGF5ZXJGb3JtID0gKCkgPT4ge1xuICBsZXQgZm9ybUhUTUwgPSBgXG4gICAgPGZvcm0+XG4gICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgLz5cbiAgICAgIDxsYWJlbCBmb3I9XCJicmVlZFwiPkJyZWVkOjwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYnJlZWRcIiAvPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgPC9mb3JtPlxuICBgO1xuICBuZXdQbGF5ZXJGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IGZvcm1IVE1MO1xuICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGxheWVyLWZvcm0gPiBmb3JtJyk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgLyogICBNWSBDT0RFICAgKi9cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKGZvcm0uZWxlbWVudHMubmFtZS52YWx1ZSArIFwiIC0tIFwiICtmb3JtLmVsZW1lbnRzLmJyZWVkLnZhbHVlKVxuICAgIC8vaWYoIWZvcm0uZWxlbWVudHMubmFtZS52YWx1ZSAmJiAhZm9ybS5lbGVtZW50cy5icmVlZC52YWx1ZSl7XG4gICAgbGV0IHBsYXllckRhdGEgPSB7XG4gICAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsXG4gICAgICBicmVlZDogZm9ybS5lbGVtZW50cy5icmVlZC52YWx1ZVxuICAgIH1cbiAgICBhZGROZXdQbGF5ZXIocGxheWVyRGF0YSk7XG4gICAgXG4gICAgcmVmcmVzaFBhZ2UoKTtcbiAgICAvKioqKioqKioqKioqKioqKioqKioqL1xuICAvL31cbiAgfSk7XG59O1xuXG5cbi8qKiBBRERFRCB0byBEUlkgb3V0IHJlZnJlc2ggKi9cbmV4cG9ydCBhc3luYyAgZnVuY3Rpb24gcmVmcmVzaFBhZ2UoKSB7XG4gIHRyeXtcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGxheWVyLWZvcm0gPiBmb3JtJyk7XG4gICAgY29uc3QgcGxheWVycyA9IGF3YWl0IGZldGNoQWxsUGxheWVycygpXG4gICAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKVxuICAgIGZvcm0uZWxlbWVudHMuYnJlZWQudmFsdWUgPSBcIlwiO1xuICAgIGZvcm0uZWxlbWVudHMubmFtZS52YWx1ZSA9IFwiXCI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhgcmVmcmVzaFBhZ2UgRVJST1I6ICR7ZXJyb3J9YClcbiAgfVxuICB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycyB9IGZyb20gJy4vYWpheEhlbHBlcnMnXG5pbXBvcnQgeyByZW5kZXJBbGxQbGF5ZXJzLCByZW5kZXJOZXdQbGF5ZXJGb3JtIH0gZnJvbSAnLi9yZW5kZXJIZWxwZXJzJ1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKClcbiAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKVxuICByZW5kZXJOZXdQbGF5ZXJGb3JtKClcbn1cblxuaW5pdCgpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=