import { useGetList } from "../../react-query/query/list/listQuery";
import ProductContainer from "./components/ProductContainer";
import { Product } from "./types";

const ProductList = () => {
  const { data: productListResponse } = useGetList();
  console.log("productListData", productListResponse);
  return (
    <div className="">
      <h1 className="mb-8">Products</h1>
      <div className="flex gap-x-4 gap-y-8 flex-wrap ">
        {productListResponse?.data?.map((data: Product) => (
          <ProductContainer key={data?.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
