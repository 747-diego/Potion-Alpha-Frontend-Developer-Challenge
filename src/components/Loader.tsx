
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="fixed inset-0 bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 animate-pulse" />
      <div className="relative w-48 h-48">
        <img 
          src="/lovable-uploads/6b510c44-79be-42a1-9624-21e432d6c0cc.png"
          alt="Loading..."
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Loader;
