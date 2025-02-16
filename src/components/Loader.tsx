
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 via-purple-500/5 to-purple-600/10 animate-pulse blur-md" />
        <img 
          src="/lovable-uploads/b8bf6ec8-5402-4484-9cf7-124b1a815d98.png"
          alt="Loading..."
          className="w-full h-full relative z-10 animate-bounce"
        />
      </div>
    </div>
  );
};

export default Loader;
