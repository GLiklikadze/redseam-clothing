import React, { PropsWithChildren } from "react";
const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-[1080px] w-[1920px] bg-[#FFFFFF]">{children}</div>
  );
};

export default PageContainer;
