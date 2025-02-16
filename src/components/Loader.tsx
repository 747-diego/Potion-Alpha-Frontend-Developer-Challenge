
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-purple-600/20 animate-pulse blur-md" />
        <img 
          src="/lovable-uploads/6b510c44-79be-42a1-9624-21e432d6c0cc.png"
          alt="Loading..."
          className="w-full h-full relative z-10"
        />
      </div>
    </div>
  );
};

export default Loader;
