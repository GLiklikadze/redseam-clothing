import { Button } from "@/components/ui/button";
import { ColorSelector } from "@/pages/product-details/components/ColorSelector";
import { QuantitySelector } from "@/pages/product-details/components/QuantitySelector";
import { SizeSelector } from "@/pages/product-details/components/SizeSelector";
import { useAddToCart } from "@/react-query/mutation/productDetails/productDetailsMutation";
import { useGetProductDetails } from "@/react-query/query/productDetails/productDetailsQuery";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ProductDetails() {
  const { products_id } = useParams();
  const { data: productDetailsData } = useGetProductDetails(products_id ?? "");
  const navigate = useNavigate();

  const { mutate: mutateAddToCart } = useAddToCart();

  const [selectedSize, setSelectedSize] = useState(
    productDetailsData?.available_colors?.[0] ?? ""
  );
  const [selectedColor, setSelectedColor] = useState(
    productDetailsData?.available_colors?.[0] ?? ""
  );
  const [quantity, setQuantity] = useState(1);

  const onColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const onSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const onQuantityChange = (qty: number) => {
    setQuantity(qty);
  };
  useEffect(() => {
    if (productDetailsData) {
      setSelectedColor(productDetailsData.available_colors?.[0] ?? "");
      setSelectedSize(productDetailsData.available_sizes?.[0] ?? "");
    }
  }, [productDetailsData]);
  
const token = localStorage.getItem("auth_token");
  const handleAddToCart = () => {
    if(token){
      mutateAddToCart({
        product: productDetailsData?.id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
      });
      console.log(
        { product: productDetailsData?.id },
        {
          quantity: quantity,
          color: selectedColor,
          size: selectedSize,
        }
      );
    
    }else{
    (navigate("/login"))
    }
  };
  console.log("data", productDetailsData);
  return (
    <div className="bg-[#FFFFFF] px-[100px]">
      <p className="mt-[30px]">Listing / Product</p>
      <div className="mt-[49px] flex flex-row gap-[168px] pb-[100px]">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-[9px]">
            {productDetailsData?.images.map((_: string, index: number) => {
              return (
                <div key={index} className="h-[161px] w-[121px]">
                  <img
                    src={productDetailsData?.images?.[index]}
                    alt="product-photo"
                  />
                </div>
              );
            })}
          </div>
          <div className="h-[907px] w-[704px] rounded-[10px]">
            <img
              src={
                productDetailsData?.images?.[
                  productDetailsData?.available_colors?.indexOf(selectedColor)
                ] ?? " "
              }
              className="w-full object-cover"
              alt="main-photo"
            />
          </div>
        </div>
        <div className="h-[907px] w-[704px] space-y-6">
          {/* Product Title and Price */}
          <div className="space-y-2">
            <h1 className="text-foreground text-3xl font-bold text-balance capitalize">
              {productDetailsData?.name}
            </h1>
            <p className="text-foreground text-3xl font-bold">
              $ {productDetailsData?.price}
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">Color:</span>
              <span>{selectedColor}</span>
            </div>
            <ColorSelector
              colors={productDetailsData?.available_colors ?? []}
              selectedColor={selectedColor}
              onColorChange={onColorChange}
            />
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-medium">Size:</span>
              <span className="text-muted-foreground text-sm">
                {selectedSize}
              </span>
            </div>
            <SizeSelector
              sizes={productDetailsData?.available_sizes ?? []}
              selectedSize={selectedSize}
              onSizeChange={onSizeChange}
            />
          </div>

          {/* Quantity Selection */}
          <div className="space-y-3">
            <div className="mb-4 text-sm font-medium">Quantity</div>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            className="mb-[56px] w-full bg-[#ff4500] py-3 text-base font-medium text-white hover:bg-[#e63e00]"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to cart
          </Button>

          {/* Product Details */}
          <div className="border-border space-y-4 border-t pt-14">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-[20px] font-medium">Details</h3>
              <img
                src={productDetailsData?.brand?.image}
                alt="brand-logo"
                className="h-[61px] w-[109px]"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Brand:</span>{" "}
                {productDetailsData?.brand?.name}
              </p>
              <p className="text-muted-foreground overflow text-sm break-words whitespace-normal">
                {productDetailsData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
