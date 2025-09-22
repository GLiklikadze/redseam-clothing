const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mx-[100px] min-h-full">{children}</div>;
};

export default PageContainer;
