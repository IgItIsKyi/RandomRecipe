require('dotenv').config();


api_call = "https://api.spoonacular.com/recipes/random?apiKey=" + process.env.API_KEY + "&number=100";
let apiResults = [];

// Get API information for website
async function fetchData(url) {
    try {
        res = await fetch(url)
        if(!res.ok) {
            throw new Error(`API call error ${res.status}`);
        } else {
            data = res.json();
            return data;
        }        
    } catch(err) {
        console.error("Error fetching data: ", err);
    }
}


var breakfastRecipes = {'breakfast':[]};
var lunchRecipes = {'lunch':[]};
let dinnerRecipes = {'dinner':[]};
let sideRecipes = {'side':[]};
let allRecipes = {'all':[]};

(async () => {
    apiResults = await fetchData(api_call);

    // --Go through each recipe called by the api
    apiResults.recipes.forEach( item => {

        //  --check each occasion and add it to the appropriate json data var 
        item.dishTypes.forEach(choice => {

            // Get the instructions, title, image
            data = {
                title: item.title,
                Image: item.image,
                Ingredients: item.ingredients,     
                Instructions: item.instructions
                          
            } 

            // console.log("Recipe Info: ", data)
            // --Push every recipe
            allRecipes.all.push(data);

            switch (choice) {
                case 'breakfast':
                    breakfastRecipes.breakfast.push(data)
                    break;

                case 'lunch':
                    lunchRecipes.lunch.push(data)
                    break;

                case 'dinner':
                    dinnerRecipes.dinner.push(data)
                    break;

                case ('snack' || 'side dish'):
                    sideRecipes.side.push(data)
                    break;

                default:
                    console.log("No meal Type received from API")
                    break;
            }       
        })
    });
    console.log("Breakfast recipes: ", breakfastRecipes.breakfast.length)
    console.log("Lunch recipes: ", lunchRecipes.lunch.length)
    console.log("Dinner recipes: ", dinnerRecipes.dinner.length)
    console.log("Side dish Recipes: ", sideRecipes.side.length)
    console.log("All recipes: ", allRecipes.all.length)
})();





