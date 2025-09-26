"use client";

import { Button } from "@/components/ui/button";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="flex gap-2">
      {sizes.map((size, index) => (
        <Button
          key={index}
          variant={selectedSize === size ? "default" : "outline"}
          size="sm"
          onClick={() => onSizeChange(size)}
          className={`w-[70px] h-[42px] text-base font-normal ${
            selectedSize === size
              ? "border-2 border-[#10151F] "
              : "hover:bg-muted"
          }`}
        >
          {size}
        </Button>
      ))}
    </div>
  );
}
