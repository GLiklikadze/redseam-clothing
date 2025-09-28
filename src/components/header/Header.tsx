import CartSheet from "@/components/cart/CartSheet";
import logo from "../../assets/HandEye.svg";
import arrow from "../../assets/chevron-down.svg";
import { useNavigate } from "react-router-dom";
import user_logo from "../../assets/user.svg";
import user_avatar from "../../assets/register-user-img.png";
import ProfileDropdown from "@/components/header/components/profileDropdown";
const Header = () => {
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate("/");
  };
  const auth_token = localStorage.getItem("auth_token");
  const saved_avatar = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).avatar
    : null;
  return (
    <div className="flex h-[6.25rem] items-center justify-between bg-gray-100 px-[100px]">
      <div
        onClick={onLogoClick}
        className="flex cursor-pointer items-center justify-center gap-1"
      >
        <img src={logo} alt="Redseam Clothing Logo" className="h-6 w-6" />
        <h1 className="text-[16px] font-semibold">Redseam Clothing</h1>
      </div>
      <div className="flex items-center justify-center gap-[20px]">
        <CartSheet />
        <div className="flex items-center justify-center">
          {auth_token ? (
            <ProfileDropdown>
              <div className="flex h-10 w-10 flex-row items-center gap-[10px]">
                <img
                  src={saved_avatar ? saved_avatar : user_avatar}
                  alt="user-avatar"
                  className="h-full w-full cursor-pointer rounded-full object-cover"
                />
                <img
                  src={arrow}
                  alt="arrow-logo"
                  className="h-6 w-6 cursor-pointer"
                />
              </div>
            </ProfileDropdown>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <img src={user_logo} alt="user-logo" className="h-5 w-5" />
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-[12px] font-medium"
              >
                Log in
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
