require('dotenv').config();

// process.env.API_KEY
api_call = "https://api.spoonacular.com/recipes/random?apiKey=" + "97b0708ff3a644e8a4d4201dd23eadd7" + "&number=100";
let apiResults = {};

// Get API information for website
async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`API call error ${res.status}`);
        }
        const data = await res.json();
        if (!data) {
            console.warn("Body is empty");
        } else {
            console.log(`Server response: Successful`);
            return data;  // Return data from this function
        }
    } catch (err) {
        console.error("Error fetching data: ", err);
    }
}

// Use an async function to handle the result of fetchData
async function getApiData(api_call) {
    const apiResults = await fetchData(api_call);  // Wait for fetchData to resolve
    console.log(apiResults);  // Handle the resolved data here
    return apiResults;
}


let BR = {'breakfast':[]};
let LR = {'lunch':[]};
let DR = {'dinner':[]};
let SR = {'side':[]};
let allRecipes = {'all':[]};   


// Example usage
getApiData(api_call)
    .then(apiResults => {

        
        // Process apiResults here if needed
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
        return { breakfastRecipes, lunchRecipes, dinnerRecipes, sideRecipes, allRecipes }
    })
    .catch(err => {
        // Handle errors
        console.error("Error processing API results", err);
    });








//    --Go through each recipe called by the api



console.log("Breakfast recipes: ", breakfastRecipes.breakfast.length);
console.log("Lunch recipes: ", lunchRecipes.lunch.length);
console.log("Dinner recipes: ", dinnerRecipes.dinner.length);
console.log("Side dish Recipes: ", sideRecipes.side.length);
console.log("All recipes: ", allRecipes.all.length);
