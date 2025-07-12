import { useRef, useEffect, useState } from "react";
import { Hero1 } from "@/components/hero1"
import { Content1 } from "@/components/content1"
import { Content2 } from "@/components/content2"
import { ChevronDownIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function MainPage() {
  const [atBottom, setAtBottom] = useState(false);
  const [content1Animate, setContent1Animate] = useState(false);

  // 你可以在這裡繼續增加 section
  const sections = [
    <Hero1 
      key="hero"
      badge="立即加入我們的Discord社群" 
      heading="以節奏雕刻字形" 
      description-line1="MusiChar 是一款音樂節奏遊戲，"
      description-line2="主要幫助患有讀寫障礙的兒童在節奏中學習書寫文字。"
      buttons={{ primary: { text: "下載游戲Demo", url: "/download_game" }, 
      secondary: { text: "前往Github專案", url: "https://github.com/WuJoe826/Musichar" } }} 
      image={{ src: "demo.mp4", alt: "MusicChar" }}
    />,
    <Content1 key="content1" animate={content1Animate} />, 
    <Content2 key="content2" />,
    // 以後可繼續加 <MyNewSection key="new" />
  ];

  // 動態生成 refs
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentSection = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;
    const detectCurrentSection = () => {
      const scrollY = window.scrollY;
      const sectionTops = sectionRefs.current.map(ref => ref?.offsetTop ?? 0);
      let found = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (scrollY + window.innerHeight / 2 >= sectionTops[i]) {
          found = i;
        }
      }
      currentSection.current = found;
      setAtBottom(found === sections.length - 1);
      setContent1Animate(found === 1);
    };
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 禁用普通滾動
      detectCurrentSection(); // 每次滾動前自動校正 currentSection
      if (isScrolling.current) return;
      let direction = 0;
      if (e.deltaY > 0 && currentSection.current < sections.length - 1) {
        direction = 1;
      } else if (e.deltaY < 0 && currentSection.current > 0) {
        direction = -1;
      } else {
        return;
      }
      isScrolling.current = true;
      currentSection.current += direction;
      sectionRefs.current[currentSection.current]?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isScrolling.current = false;
        detectCurrentSection();
      }, 300);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", detectCurrentSection);
    detectCurrentSection();
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", detectCurrentSection);
    };
  }, [sections.length]);

  // 根據 index 決定 section 內容偏移樣式
  const getSectionClass = (idx: number) => {
    if (idx === 0) return "w-full min-h-screen flex items-start justify-center pt-[10vh]";
    if (idx === 1) return "w-full min-h-screen flex items-start justify-center sm:pt-[10vh] lg:pt-[0vh] pt-[10vh]";
    if (idx === sections.length - 1) return "w-full min-h-screen flex items-end justify-center sm:pt-[10vh] lg:pt-[0vh] pt-[10vh]";
    return "w-full min-h-screen flex items-center justify-center";
  };

  // 處理置頂按鈕點擊
  const handleScrollButton = () => {
    if (atBottom) {
      // 回到最頂部
      currentSection.current = 0;
      sectionRefs.current[0]?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 跳到下一個 section
      if (currentSection.current < sections.length - 1) {
        currentSection.current += 1;
        sectionRefs.current[currentSection.current]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="flex-1 bg-grid-pattern">
      {sections.map((Section, idx) => (
        <section
          key={idx}
          ref={(el: HTMLDivElement | null) => { sectionRefs.current[idx] = el; }}
          className={getSectionClass(idx)}
        >
          <div className="w-full mx-10 xl:mx-60 lg:mx-40 sm:mx-10">
            {Section}
          </div>
        </section>
      ))}
      {/* 置頂段落滾動按鈕，所有模式都顯示 */}
      {/* 手機直接顯示按鈕 */}
      <button
        className="fixed left-1/2 -translate-x-1/2 bottom-10 z-50 bg-background/80 backdrop-blur-md opacity-80 border border-border shadow-lg rounded-full p-3 transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring sm:hidden"
        style={{ fontWeight: 700 }}
        onClick={handleScrollButton}
        aria-label={atBottom ? "回到頂部" : "下一段"}
      >
        <ChevronDownIcon
          className={`w-6 h-6 transition-transform duration-300 ${atBottom ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      
      {/* 桌面顯示帶 Tooltip 的按鈕 */}
      <div className="hidden sm:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="fixed left-1/2 -translate-x-1/2 bottom-10 z-50 bg-background/80 backdrop-blur-md opacity-80 border border-border shadow-lg rounded-full p-3 transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ fontWeight: 700 }}
              onClick={handleScrollButton}
              aria-label={atBottom ? "回到頂部" : "下一段"}
            >
              <ChevronDownIcon
                className={`w-6 h-6 transition-transform duration-300 ${atBottom ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            前往下一部分
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default MainPage;