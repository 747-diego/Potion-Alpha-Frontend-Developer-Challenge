
const Loader = () => {
  // Preload the image
  const imageUrl = "/lovable-uploads/6b510c44-79be-42a1-9624-21e432d6c0cc.png";
  new Image().src = imageUrl; // This will trigger immediate image loading

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="w-48 h-48">
        <img 
          src={imageUrl}
          alt="Loading..."
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Loader;
