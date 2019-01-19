export const schemaMarkup = (title, description, image, postURL, postDate, category, lang, meta, keywords, recipe) => {

    let seoSchema = [
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            url: "www.livingWithAnnah.com",
            name: title,
        }, {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{
                "@type": "ListItem",
                position: 1,
                item: {
                    "@id": postURL,
                    name: title,
                    image
                }
            }]
        }, {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: "https://www.livingwithannah.com",
            author: "Annah Isenberg",
            name: title,
            alternateName: title,
            headline: title,
            datePublished: postDate,
            dateModified: postDate,
            image: {
                "@type": "ImageObject",
                url: `https://www.livingwithannah.com${image}`
            },
            mainEntityOfPage: "https://www.livingwithannah.com",
            description
        },
    ];


    if (category === "recipes" || category === "Recipes") {

        try {
            seoSchema.push(
                {
                    "@context": "http://schema.org",
                    "@type": "Recipe",
                    "name": title,
                    "description": `${recipe.description}`,
                    "author": {
                        "@type": "Person",
                        "name": "Annah Isenberg"
                    },
                    "image": [`https://www.livingwithannah.com${image}`],
                    "url": `https://www.livingwithannah.com/${postURL}`,
                    "recipeIngredient": [recipe.ingredients],
                    "recipeInstructions": [recipe.instructions],
                    "prepTime": recipe.prepTime,
                    "cookTime": recipe.cookTime,
                    "totalTime": recipe.totalTime,
                    "recipeYield": recipe.recipeYield,
                    "recipeCategory": recipe.recipeCategory,
                    "cookingMethod": recipe.cookingMethod,
                    "recipeCuisine": recipe.recipeCuisine,
                    "datePublished": postDate,
                    "keywords": recipe.keywords,
                }
            );
        } catch (error) { return error }

    }
    console.log(seoSchema);

    return seoSchema
}
