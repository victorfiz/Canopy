export function transformCategoriesToTable ({
    categoriesState
}){


    let categories = [];
    categoriesState.Categories.forEach((category) => {
        categories.push([
            category.career_id || "",
            <a 
                href={category.logo}
                target="_blank"
                className="underline"
            > {"..." + category?.name?.slice(0, 4).trim() + ".png" || "..."} </a>,
            category.name || "",
            category.number==="∞"? <div className="generator-categories-edit"> ∞</div> :( category.number || "")
        ])
    })

    return categories;
}