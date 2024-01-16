export function transformCategoriesToTable({
    categoriesState
}) {


    let categories = [];
    console.log(categoriesState)
    categoriesState.codes.forEach((category) => {
        categories.push([
            category.club_name || "",
            category?.promo_code_tag_line?.slice(0, 77).trim()+"..." || "...",
            category.code || "",
        ])
    })

    return categories;
}