require('dotenv').config();

api_call = "https://api.spoonacular.com/recipes/random?apiKey=" + process.env.API_KEY + "&number=100";
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
    return apiResults;
}


let BR = {'breakfast':[]};
let LR = {'lunch':[]};
let DR = {'dinner':[]};
let SR = {'side':[]};
let AR = {'all':[]};   


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
                AR.all.push(data);

                switch (choice) {
                    case 'breakfast':
                        BR.breakfast.push(data)
                        console.log(`Added data to breakfast`)
                        break;

                    case 'lunch':
                        LR.lunch.push(data)
                        console.log(`Added data to lunch`)
                        break;

                    case 'dinner':
                        DR.dinner.push(data)
                        console.log(`Added data to dinner`)
                        break;

                    case ('snack' || 'side dish'):
                        SR.side.push(data)
                        console.log(`Added data to sides`)
                        break;

                    default:
                        console.log("No meal Type received from API")
                        break;
                }       
            })
        });
    })
    .catch(err => {
        // Handle errors
        console.error("Error processing API results", err);
    });








//    --Go through each recipe called by the api



console.log("Breakfast recipes: ", BR.breakfast.length);
console.log("Lunch recipes: ", LR.lunch.length);
console.log("Dinner recipes: ", DR.dinner.length);
console.log("Side dish Recipes: ", SR.side.length);
console.log("All recipes: ", AR.all.length);
