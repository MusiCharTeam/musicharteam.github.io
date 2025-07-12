import { useEffect, useRef, useState } from "react";

const Content1 = ({ animate }: { animate?: boolean }) => {
  const [displayNum, setDisplayNum] = useState(798500);
  const rafRef = useRef<number | null>(null);
  const startNum = 798500;
  const endNum = 799025;
  const duration = 700; // ms

  useEffect(() => {
    if (!animate) return;
    setDisplayNum(startNum);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(startNum + (endNum - startNum) * progress);
      setDisplayNum(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayNum(endNum);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className="flex items-center justify-center pt-40 md:pt-70">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col items-center">
          {/* 置中顯示的標題與統計數字 */}
          <div className="w-full flex flex-col items-center text-center mb-20 lg:mb-30">
            <h2 className="text-3xl font-black md:text-5xl lg:mb-5 mb-2">你知道嗎？</h2>
            <p className="text-muted-foreground text-lg md:max-w-2xl lg:mb-5 mb-2">
              根據教育局的2023-24 學年學生人數統計報告書，香港總共有
            </p>
            <h1 className="text-7xl lg:text-8xl lg:mb-5 mb-2">{displayNum.toLocaleString()}</h1>
            <p className="text-muted-foreground text-lg md:max-w-2xl">名學童*。</p>
            <p className="text-muted-foreground text-xs md:max-w-2xl pt-5">
            * 僅計算幼稚園，小學，中學，特殊學校以及設有特殊班的普通學校的學生人數。</p>
          </div>
          {/* flex 左文右圖 */}
        </div>
      </div>
    </div>
  );
};

export { Content1 };
