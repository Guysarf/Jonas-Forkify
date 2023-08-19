import { getJSON } from "./helpers";
import { API_URL } from "./config";
// console.log(API_URL);
// console.log(getJSON);

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
    }
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);
        const { recipe } = data.data;
        //   console.log(recipe);

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }

        //   console.log(state.recipe);
    } catch (err) {
        // Temp error handling
        console.error(`${err}💥💥💥`);
        throw err;
    }
}


export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.result = data.data.recipes.map( rec => {
            return {
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
            }
        
        });
        // console.log(state.search.result);
    }
    
    catch (err) {
        console.error(`${err}💥💥💥`);
        throw err;
    }
};
