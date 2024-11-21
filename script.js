require('dotenv').config();


api_call = "https://api.spoonacular.com/recipes/random?apiKey=" + process.env.API_KEY + "&number=10";
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

// Get the instructions, title, image

(async () => {
    apiResults = await fetchData(api_call);
    // console.log("All api results: ", apiResults)

    // console.log(`Recipes ${apiResults.recipes}`)
    apiResults.recipes.forEach( item => {
        console.log(`Title: ${item.title}\n\nImage: ${item.image}\n\nInstructions: ${item.instructions}`)
    });

    // viewResults = [
    //     "Title" = apiResults[0].title,
    //     "Image" = apiResults[0].image,
    //     "Instructions" = apiResults[0].instructions
    // ]

    // console.log("Grab one with necessary info test: ", viewResults)
})();



