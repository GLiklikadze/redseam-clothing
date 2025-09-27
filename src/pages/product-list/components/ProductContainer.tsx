import { useNavigate } from "react-router-dom";
import { Product } from "./types";

const ProductContainer: React.FC<{ data: Product }> = ({ data }) => {
  const navigate = useNavigate();
  const onProductClick = () => {
    console.log("Product clicked:", data.id);
    navigate(`/products/${data.id}`);
  };
  return (
    <div
      onClick={onProductClick}
      className="h-[614px] w-[412px] cursor-pointer space-y-3"
    >
      <div className="h-[549px] w-[412px] bg-amber-100">
        <img
          src={data?.cover_image}
          alt={data?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-[65px] w-[412px] space-y-0.5">
        <div className="text-[18px] font-medium capitalize">{data?.name}</div>
        <div className="text-[16px] font-medium">$ {data?.price}</div>
      </div>
    </div>
  );
};

export default ProductContainer;
