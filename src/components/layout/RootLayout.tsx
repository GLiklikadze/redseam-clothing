import { Outlet } from "react-router";
import Header from "../header/Header";
import PageContainer from "./PageContainer";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Toaster />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
};

export default RootLayout;
