import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const Content2 = () => {
  return (
    <div className="flex items-center justify-center pt-10 md:pt-20 pb-40 md:pb-70">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col items-center">
          {/* flex 左文右圖 */}
          <div className="flex flex-col lg:flex-row items-center w-full md:max-w-5xl mx-auto">
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <p className="text-muted-foreground text-lg md:max-w-2xl">
                而根據衞生署兒童體能智力測驗服務的數據，
                <br />
                約有<span className="text-2xl text-primary font-extrabold px-1 lg:px-2 ">9.7%</span>
                至<span className="text-2xl text-primary font-extrabold px-1 lg:px-2">12.6%</span>
                的學童患有讀寫障礙。
                <br />
                當中約<span className="text-2xl text-[#606060] font-extrabold px-1 lg:px-2">70%</span>
                屬輕微程度，<br className="block lg:hidden" />
                <span className="text-2xl text-[#aaaaaa] font-extrabold px-1 lg:px-2">20%</span>
                為中等程度，<br />
                餘下<span className="text-2xl text-[#ffffff] font-extrabold px-1 lg:px-2">10%</span>
                則屬嚴重程度。<br className="block lg:hidden" />
              </p>
              <div className="pb-10 lg:pb-0"></div>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-center my-5 lg:my-0 lg:pl-10 h-full">
              <div className="w-75 lg:w-110 flex flex-col items-center justify-center">
                <AspectRatio ratio={16/9}>
                  <img src="./src/assets/people_chart.png" alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
                <p className="text-muted-foreground text-base md:max-w-2xl">
              </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Content2 };
