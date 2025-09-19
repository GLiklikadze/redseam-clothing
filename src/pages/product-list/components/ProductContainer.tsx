import { Product } from "../types";

const ProductContainer: React.FC<{ data: Product }> = ({ data }) => {
  return (
    <div className="w-[412px] h-[614px] basis-1/4">
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
