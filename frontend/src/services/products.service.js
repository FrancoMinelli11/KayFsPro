export async function getProducts (limit,skip){
    try {
        const response = await fetch(`http://localhost:8080/product`);
        console.log(limit, skip)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
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
        console.log(error)
    }
}

export async function getAllCategories(){
    try {
        const response = await fetch('https://dummyjson.com/products/categories')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getProductsByCategory(cat){
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${cat}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function findProductByName(word){
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${word}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}