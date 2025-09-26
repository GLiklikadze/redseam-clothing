import logo from "../../assets/HandEye.svg";
import cart from "../../assets/shopping-cart.svg";
import arrow from "../../assets/chevron-down.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate("/");
  };
  const auth_token = localStorage.getItem("auth_token");
  return (
    <div className="flex h-[6.25rem]  items-center justify-between bg-gray-100 px-[100px]">
      <div
        onClick={onLogoClick}
        className="flex justify-center items-center cursor-pointer"
      >
        <img src={logo} alt="Redseam Clothing Logo" className="h-6 w-6" />
        <h1 className="text-[16px] font-semibold">Redseam Clothing</h1>
      </div>
      <div className="flex justify-center items-center gap-[20px]">
        {auth_token && (
          <img src={cart} alt="cart-logo" className="h-6 w-6 cursor-pointer" />
        )}
        <div className="flex justify-center items-center gap-[10px] ">
          {auth_token ? (
            <div className="w-10 h-10">
              <img
                src={
                  localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user") || "").avatar
                    : ""
                }
                alt="user-avatar"
                className="w-full h-full object-cover rounded-full cursor-pointer"
              />
            </div>
          ) : (
            <span
              onClick={() => navigate("/login")}
              className="text-[12px] font-medium cursor-pointer"
            >
              Log in
            </span>
          )}
          <img
            src={arrow}
            alt="arrow-logo"
            className="h-6 w-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
