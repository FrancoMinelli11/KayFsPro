function getCats(arr){
        
        const categories = []
        arr.map((item) => {
            if(!categories.find(cat => cat.name === item.category)){
                categories.push({name: item.category})
            }
        })
        return categories
}

export async function getProducts (limit,skip){
    try {
        const response = await fetch(`http://localhost:8080/product`);
        (limit, skip)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || "Error fetching products");
    }
}

export async function getProductById (id) {
    try {
        const response = await fetch(`http://localhost:8080/product/${id}`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAllCategories(){
    try {
        const response = await fetch('http://localhost:8080/product')
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        const categories = getCats(data)
        return categories
    } catch (error) {
        throw new Error(error)
    }
}

export async function getProductsByCategory(cat){
    try {
        const response = await fetch(`http://localhost:8080/product`)
        const data = await response.json()
        const filtered = data.filter((product) => product.category === cat)
        return filtered
    } catch (error) {
        throw new Error(error)
    }
}

export async function findProductByName(word){
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${word}`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

