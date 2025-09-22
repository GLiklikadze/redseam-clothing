interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div className="flex gap-2 ">
      {colors.map((color, index) => (
        <div
          className={`w-[48px] h-[48px] flex justify-center items-center  ${
            selectedColor === color
              ? "border-[2px] rounded-full border-[#E1DFE1]"
              : ""
          }`}
          key={index}
        >
          <button
            onClick={() => onColorChange(color)}
            className={`w-[38px] h-[38px] rounded-full border-[0.5px] `}
            style={{ backgroundColor: color }}
            title={color}
          />
        </div>
      ))}
    </div>
  );
}
