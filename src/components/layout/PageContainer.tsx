const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#FFFFFF] w-[1920px] min-h-[1080px]">{children}</div>
  );
};

export default PageContainer;
