const PageContainer = ({ children, className = "", maxWidth = "max-w-6xl" }) => (
  <div className={`relative z-10 mx-auto ${maxWidth} px-6 ${className}`}>
    {children}
  </div>
);

export default PageContainer;
