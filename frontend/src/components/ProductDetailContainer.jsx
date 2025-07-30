
export const ProductDetailContainer = ({product}) => {
    return(
        <div className="flex justify-center items-center flex-col p-3">
            <img src={product.thumbnail} alt={product.title} className="w-1/2 border rounded border-amber-400"/>
            <h1 className="font-bold text-3xl">{product.title}</h1>
            <p className="font-semibold">{product.description}</p>
            <p className="font-semibold">{product.price}</p>
        </div>
    ) 
}