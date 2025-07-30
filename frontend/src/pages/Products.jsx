import { useProducts } from "../hooks/useProducts.jsx";
import { ProductsContainer } from "../components/ProductsContainer.jsx";
import { Loader } from "../components/Loader.jsx";
import { useProductsCategories } from "../hooks/useProductsCategories.jsx";
export const Products = () => {
  const {productsD,loading} = useProducts()
  const {cat} = useProductsCategories()
  return (
    loading ? <Loader/> : <ProductsContainer products={productsD} cat={cat}/>
  );
}