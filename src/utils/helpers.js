
//flatten
export function flattenProducts(data){
    return data.map(item=>{
        //cloudinary
        let image = item.image.url;
        return {...item, image}

    })
}
//helpers
export const featuredProducts = (data) => (data.filter(item=>{
    return item.featured === true;
}))