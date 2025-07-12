import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

export default function DownloadGame() {
  const [latestVersion, setLatestVersion] = useState("");

  useEffect(() => {
    fetch("/changelog.txt")
      .then(res => res.text())
      .then(text => {
        const match = text.match(/^v[\w.\-_]+/m);
        if (match) setLatestVersion(match[0]);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent mt-30 lg:mt-40 mx-10 lg:mx-20">
      <h1 className="text-3xl font-black mb-3">下載 MusiChar</h1>
      <Badge variant="secondary" className="text-bold font-bold">{latestVersion ? `目前版本：${latestVersion}` : "載入中..."}</Badge>
      <p className="text-sm lg:text-base text-muted-foreground mb-8 mt-5 text-center max-w-xl">
        歡迎下載 MusiChar 音樂遊戲！請點擊下方按鈕開始下載最新版本。<br/>
        若遇到任何問題，請聯絡我們的客服或參考說明文件。
      </p>
      <a href="#" download>
        <Button className="px-8 py-3 h-auto text-lg font-bold flex flex-col items-center">
          <span className="text-lg font-bold leading-tight">立即下載</span>
          <Typography variant="muted" className="text-xs text-black text-center leading-tight">Windows 8.1或更新版本（x64）版</Typography>
        </Button>
      </a>
        <a href="https://github.com/WuJoe826/Musichar/releases" target="_blank" rel="noopener noreferrer" className="text-sm lg:text-sm text-muted-foreground mb-1 mt-3 text-center max-w-xl hover:underline transition-all">下載歷史版本</a>
      {/* Demo Section with Typography */}
      <section className="w-full max-w-7xl mt-20 mb-10 px-2 sm:px-4 md:px-8 flex flex-col">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
            {/* Being radically open */}
            <div className="flex flex-col items-start text-left px-2 sm:px-4 py-4">
              <Typography as="h3" className="font-bold text-xl mb-4">1. 下載遊戲</Typography>
              <Typography as="p" variant="muted" className="text-base">
                點擊上方按鈕下載安裝檔並執行！
              </Typography>
            </div>
            {/* Moving the needle */}
            <div className="flex flex-col items-start text-left px-2 sm:px-4 py-4">
              <Typography as="h3" className="font-bold text-xl mb-4">2. 註冊帳號</Typography>
              <Typography as="p" variant="muted" className="text-base">
              進入遊戲後請根據提示登入或註冊帳號
              </Typography>
            </div>
            {/* Optimizing for empowerment */}
            <div className="flex flex-col items-start text-left px-2 sm:px-4 py-4">
            <Typography as="h3" className="font-bold text-xl mb-4">3. 下載關卡圖譜</Typography>
              <Typography as="p" variant="muted" className="text-base">
                瀏覽/下載玩家們自製的關卡圖譜！
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
