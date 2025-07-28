const Contain = ({ children, className = "" }) => {
  return (
    <div className={`max-w-[1600px] w-[90%] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Contain;
