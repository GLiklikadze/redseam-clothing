import { Button } from "@/components/ui/button";
import { ColorSelector } from "@/pages/product-details/components/ColorSelector";
import { QuantitySelector } from "@/pages/product-details/components/QuantitySelector";
import { SizeSelector } from "@/pages/product-details/components/SizeSelector";
import { useAddToCart } from "@/react-query/mutation/productDetails/productDetailsMutation";
import { useGetProductDetails } from "@/react-query/query/productDetails/productDetailsQuery";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ProductDetails() {
  const { products_id } = useParams();
  const { data: productDetailsData } = useGetProductDetails(products_id ?? "");

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
  const handleAddToCart = () => {
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
  };
  console.log("data", productDetailsData);
  return (
    <div className="bg-[#FFFFFF] px-[100px]">
      <p className="mt-[30px]">Listing / Product</p>
      <div className="flex flex-row gap-[168px] mt-[49px] pb-[100px]">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-[9px]">
            {productDetailsData?.images.map((_: string, index: number) => {
              return (
                <div key={index} className="w-[121px] h-[161px]">
                  <img
                    src={productDetailsData?.images?.[index]}
                    alt="product-photo"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-[704px] h-[907px] rounded-[10px]">
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
        <div className="space-y-6 w-[704px] h-[907px]">
          {/* Product Title and Price */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground capitalize text-balance">
              {productDetailsData?.name}
            </h1>
            <p className="text-3xl font-bold text-foreground">
              $ {productDetailsData?.price}
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base ">Color:</span>
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
              <span className="text-sm font-medium text-foreground">Size:</span>
              <span className="text-sm text-muted-foreground">
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
            <div className="text-sm font-medium mb-4">Quantity</div>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full mb-[56px] bg-[#ff4500] hover:bg-[#e63e00] text-white font-medium py-3 text-base"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to cart
          </Button>

          {/* Product Details */}
          <div className="space-y-4 pt-14 border-t border-border">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-[20px] font-medium ">Details</h3>
              <img
                src={productDetailsData?.brand?.image}
                alt="brand-logo"
                className="w-[109px] h-[61px] "
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium ">Brand:</span>{" "}
                {productDetailsData?.brand?.name}
              </p>
              <p className="text-sm text-muted-foreground overflow break-words whitespace-normal">
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
