import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const handleQuantityChange = (value: string) => {
    onQuantityChange(Number.parseInt(value));
  };

  return (
    <Select value={quantity.toString()} onValueChange={handleQuantityChange}>
      <SelectTrigger className="h-[42px] w-[70px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
