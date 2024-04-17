const SubscribeUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 mb-12 flex  justify-between items-center gap-12">
      <div>
        <img
          className="w-56 h-36"
          src="https://i.ibb.co/nbwjHyj/xdaobiluhdfhru0v6vxv.webp"
          alt=""
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Subscribe to House Swift!</h1>
        <p className="text-base">
          Get the latest posts and more delivered straight to your inbox!
          Project how-tos, free downloads, home hacks, and design tips.
        </p>
        <div>
          <input type="email" placeholder="Your Email..." className="p-2" />
          <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-2 text-md px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer ml-2">
            Subscribe
          </button>
        </div>
        <div className="flex justify-start items-center gap-4">
          <input type="checkbox" />
          <p className="text-sm">I consent to receiving emails and personalized ads.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscribeUs;
