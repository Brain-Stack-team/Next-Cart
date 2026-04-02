export default function SubscribeSection() {
  return (
    <section className="bg-[#f8f9fa] py-12 sm:py-20 w-full mb-0">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#4f46e5] to-[#14b8a6] rounded-[24px] py-14 px-6 md:px-16 text-center shadow-lg relative overflow-hidden">
          {/* Background circles effect */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Stay Updated
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals,<br className="hidden sm:block" /> and special offers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto bg-white/10 p-2 rounded-[16px] backdrop-blur-sm border border-white/20">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-white/70 focus:outline-none text-sm"
              />
              <button className="px-8 py-2.5 bg-white text-[#4f46e5] font-bold rounded-[12px] hover:bg-gray-50 transition-colors shadow-sm text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
