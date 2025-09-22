import { useNavigate } from "react-router-dom";
import { Product } from "../types";

const ProductContainer: React.FC<{ data: Product }> = ({ data }) => {
  const navigate = useNavigate();
  const onProductClick = () => {
    console.log("Product clicked:", data.id);
    navigate(`/products/${data.id}`);
  };
  return (
    <div onClick={onProductClick} className="w-[412px] h-[614px]">
      <div className="bg-amber-100 h-[549px] w-[412px]">
        <img
          src={data?.cover_image}
          alt={data?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-[65px] w-[412px]">
        <div>Kids' Curved Hilfiger Graphic T-Shirt</div>
        <div>$ {data?.price}</div>
      </div>
    </div>
  );
};

export default ProductContainer;
