import logo from "../../assets/HandEye.svg";
import cart from "../../assets/shopping-cart.svg";
import arrow from "../../assets/chevron-down.svg";

const Header = () => {
  return (
    <div className="flex h-[6.25rem] w-[1920px] items-center justify-between bg-gray-100 px-[100px]">
      <div className="flex justify-center items-center ">
        <img src={logo} alt="Redseam Clothing Logo" className="h-6 w-6" />
        <h1 className="text-[16px] font-semibold ">Redseam Clothing</h1>
      </div>
      <div className="flex justify-center items-center gap-[20px]">
        <img src={cart} alt="cart-logo" className="h-6 w-6" />
        <div className="flex justify-center items-center gap-[10px]">
          <div className="w-10 h-10 ">
            <div className="w-full h-full bg-amber-600 rounded-full"></div>
          </div>
          <img src={arrow} alt="arrow-logo" className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Header;
