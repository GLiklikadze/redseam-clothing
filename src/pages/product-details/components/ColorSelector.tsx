interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}
const colorMap: Record<string, string> = {
  Multi: "linear-gradient(45deg, red, blue, green)",
  "Navy Blue": "#001f3f",
};
export function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color, index) => (
        <div
          className={`flex h-[48px] w-[48px] items-center justify-center ${
            selectedColor === color
              ? "rounded-full border-[2px] border-[#E1DFE1]"
              : ""
          }`}
          key={index}
        >
          <button
            onClick={() => onColorChange(color)}
            className={`h-[38px] w-[38px] rounded-full border-[0.5px]`}
            style={{
              background: colorMap[color] || color,
            }}
            title={color}
          />
        </div>
      ))}
    </div>
  );
}
