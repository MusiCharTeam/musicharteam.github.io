import { LoginForm } from "@/components/login-form"
import { HomeIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 mt-20 lg:mt-20 mx-5 lg:mx-0 relative">
      <div className="w-full max-w-sm bg-transparent">
        <LoginForm className="bg-transparent" />
      </div>
      {/* 回首頁按鈕 */}
      {/* 手機直接顯示按鈕 */}
      <button
        className="fixed left-1/2 -translate-x-1/2 bottom-20 z-50 bg-background/80 backdrop-blur-md opacity-80 border border-border shadow-lg rounded-full p-3 transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring sm:hidden"
        style={{ fontWeight: 700 }}
        onClick={() => navigate("/")}
        aria-label="回到主頁"
      >
        <HomeIcon className="w-6 h-6" />
      </button>
      
      {/* 桌面顯示帶 Tooltip 的按鈕 */}
      <div className="hidden sm:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="fixed left-1/2 -translate-x-1/2 bottom-20 z-50 bg-background/80 backdrop-blur-md opacity-80 border border-border shadow-lg rounded-full p-3 transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ fontWeight: 700 }}
              onClick={() => navigate("/")}
              aria-label="回到主頁"
            >
              <HomeIcon className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">回到主頁</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}