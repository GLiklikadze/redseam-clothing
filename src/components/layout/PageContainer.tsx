const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="w-[1920px] min-h-[1080px]">{children}</div>;
};

export default PageContainer;
