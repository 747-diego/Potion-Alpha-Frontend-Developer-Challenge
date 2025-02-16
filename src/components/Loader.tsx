
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 via-purple-500/5 to-purple-600/10 animate-pulse blur-md" />
        <img 
          src="/lovable-uploads/8a230afc-b73e-4eb2-abed-f307a454ff5c.png"
          alt="Loading..."
          className="w-full h-full relative z-10"
        />
      </div>
    </div>
  );
};

export default Loader;
