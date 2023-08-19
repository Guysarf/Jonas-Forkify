import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'


// if (module.hot) {
//   module.hot.accept();
// }
///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id2 = window.location;
    // console.log(id2);

    if (!id) return;

    // Render Spinner
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
}
// showRecipe();

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);
    
    // 3) Render results
    resultsView.render(model.state.search.result);
  } catch (err) {
    console.log(err);
  }
};

const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();


