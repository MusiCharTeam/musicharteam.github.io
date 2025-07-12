"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search_bar"
// import Cookies from "js-cookie"
import { useState } from "react"
import { useIsDesktop } from "@/hooks/useIsDesktop"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/small-screen-navbar-item"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const NAV_MENU = [
  {
    label: "主頁",
    items: [
      { label: "最新消息", to: "/latest_news", subtext: "前往查看最新消息。" },
      { label: "更新日志", to: "/changelog", subtext: "前往查看遊戲的更新日志。" },
      { label: "下載遊戲", to: "/download_game", subtext: "前往下載遊戲。" },
    ],
  },
  {
    label: "關卡",
    items: [
      { label: "關卡圖譜清單", to: "#", subtext: "前往查看關卡圖譜清單。" },
      { label: "精選關卡圖譜", to: "#", subtext: "前往查看精選關卡圖譜。" },
    ],
  },
  {
    label: "排行榜",
    items: [
      { label: "排行榜", to: "/rank", subtext: "前往查看排行榜。" },
    ],
  },
  {
    label: "社群",
    items: [
      { label: "加入社群", to: "/community", subtext: "前往加入我們的社群。" },
    ],
  },
  {
    label: "支援",
    items: [
      { label: "常見問題", to: "/faq", subtext: "前往查看使用者常見的問題。" },
      { label: "文檔", to: "#", subtext: "前往官方文檔，瞭解遊戲的玩法。" },
      { label: "支援服務", to: "#", subtext: "前往聯絡我們取得支援。" },
    ],
  },
]

const navMenuContent = (
  <>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">主頁</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4 font-normal">
          <li>
            <NavigationMenuLink asChild>
              <Link to="/latest_news">
                <div className="font-bold">最新消息</div>
                <div className="text-muted-foreground">前往查看最新消息。</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/changelog">
                <div className="font-bold">更新日志</div>
                <div className="text-muted-foreground">前往查看遊戲的更新日志。</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/download_game">
                <div className="font-bold">下載遊戲</div>
                <div className="text-muted-foreground">前往下載遊戲。</div>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">關卡</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4 font-normal">
          <li>
            <NavigationMenuLink asChild>
              <Link to="#">
                <div className="font-bold">關卡圖譜清單</div>
                <div className="text-muted-foreground">前往查看關卡圖譜清單。</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="#">
                <div className="font-bold">精選關卡圖譜</div>
                <div className="text-muted-foreground">前往查看精選關卡圖譜。</div>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">排行榜</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4 font-normal">
          <li>
            <NavigationMenuLink asChild>
              <Link to="/rank">
                <div className="font-bold">排行榜</div>
                <div className="text-muted-foreground">前往查看排行榜。</div>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">社群</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4 font-normal">
          <li>
            <NavigationMenuLink asChild>
              <Link to="/community">
                <div className="font-bold">加入社群</div>
                <div className="text-muted-foreground">前往加入我們的社群。</div>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">支援</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4 font-normal">
          <li>
            <NavigationMenuLink asChild>
              <Link to="/faq">
                <div className="font-bold">常見問題</div>
                <div className="text-muted-foreground">前往查看使用者常見的問題。</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="#">
                <div className="font-bold">文檔</div>
                <div className="text-muted-foreground">前往官方文檔，瞭解遊戲的玩法。</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="#">
                <div className="font-bold">支援服務</div>
                <div className="text-muted-foreground">前往聯絡我們取得支援。</div>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </>
)

export function Navbar() {
  const [sheetOpen, setSheetOpen] = React.useState(false)
  // const [isDark, setIsDark] = React.useState(true)
  const [isLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isDesktop = useIsDesktop()

  // 初始化時根據 cookie 設定主題
  // React.useEffect(() => {
  //   const theme = Cookies.get('theme')
  //   if (theme === 'light') {
  //     document.documentElement.classList.remove('dark')
  //     setIsDark(false)
  //   } else {
  //     // 預設為深色模式
  //     document.documentElement.classList.add('dark')
  //     setIsDark(true)
  //     // 如果沒有 cookie，設定預設值
  //     if (!theme) {
  //       Cookies.set('theme', 'dark', { expires: 365 })
  //     }
  //   }
  // }, [])

  // const toggleTheme = () => {
  //   if (isDark) {
  //     document.documentElement.classList.remove('dark')
  //     Cookies.set('theme', 'light', { expires: 365 })
  //     setIsDark(false)
  //   } else {
  //     document.documentElement.classList.add('dark')
  //     Cookies.set('theme', 'dark', { expires: 365 })
  //     setIsDark(true)
  //   }
  // }

  const dropdownMenuContent = (
    <>
      <DropdownMenuLabel>歡迎，Test_User</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>我的資料</DropdownMenuItem>
      <DropdownMenuItem>好友</DropdownMenuItem>
      <DropdownMenuItem>設定</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>登出</DropdownMenuItem>
    </>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 lg:px-40 xl:px-75 sm:px-10 py-4 font-black" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
      {/* Mobile: Hamburger, Logo, Avatar */}
      <div className="flex items-center justify-between md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded focus:outline-none focus:ring"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="font-black overflow-y-auto max-h-screen my-10" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', direction: 'rtl' }}>
              <div className="mx-10" style={{ direction: 'ltr' }}>
                <div className="sticky top-0 z-10 bg-transparent flex gap-2 mb-4 pb-2 -mx-10 px-10">
                  {/* 搜尋按鈕 */}
                  {isDesktop ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                          <MagnifyingGlassIcon className="h-6 w-6" onClick={() => setSearchOpen(true)} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">搜尋</TooltipContent>
                    </Tooltip>
                  ) : (
                    <button className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                      <MagnifyingGlassIcon className="h-6 w-6" onClick={() => setSearchOpen(true)} />
                    </button>
                  )}
                  {/* <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Toggle theme"
                  >
                    {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                  </button> */}
                  {/* 通知按鈕 */}
                  {isDesktop ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                          <div className="relative">
                            <BellIcon className="h-6 w-6" />
                            <Badge className="absolute -top-1 -right-1 px-1 py-0 text-[10px] font-bold rounded-full">3</Badge>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">通知</TooltipContent>
                    </Tooltip>
                  ) : (
                    <div className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                      <div className="relative">
                        <BellIcon className="h-6 w-6" />
                        <Badge className="absolute -top-1 -right-1 px-1 py-0 text-[10px] font-bold rounded-full">3</Badge>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Accordion type="single" collapsible>
                    {NAV_MENU.map((menu) => (
                      <AccordionItem key={menu.label} value={menu.label}>
                        <AccordionTrigger>
                          <span>{menu.label}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-1 py-1">
                            {menu.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  className="block px-2 py-1 rounded-md hover:bg-muted font-normal"
                                  onClick={() => setSheetOpen(false)}
                                >
                                  <div className="font-bold">{item.label}</div>
                                  {item.subtext && (
                                    <div className="text-muted-foreground text-xs leading-tight">{item.subtext}</div>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1 flex justify-center ml-6">
          <Link to="/">
            <img 
              src={"/src/assets/logo_dark.png"} 
              alt="Logo" 
              className="h-10 cursor-pointer" 
            />
          </Link>
        </div>
        <div className="ml-4 flex items-center gap-4 mr-2">
          <div className="hidden md:flex items-center gap-2">
            {/* 搜尋按鈕 */}
            {isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                    <MagnifyingGlassIcon className="h-6 w-6" onClick={() => setSearchOpen(true)} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">搜尋</TooltipContent>
              </Tooltip>
            ) : (
              <button className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                <MagnifyingGlassIcon className="h-6 w-6" onClick={() => setSearchOpen(true)} />
              </button>
            )}
            {/* 通知按鈕 */}
            {isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                    <div className="relative">
                      <BellIcon className="h-6 w-6" />
                      <Badge className="absolute -top-1 -right-1 px-1 py-0 text-[10px] font-bold rounded-full">3</Badge>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">通知</TooltipContent>
              </Tooltip>
            ) : (
              <div className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                <div className="relative">
                  <BellIcon className="h-6 w-6" />
                  <Badge className="absolute -top-1 -right-1 px-1 py-0 text-[10px] font-bold rounded-full">3</Badge>
                </div>
              </div>
            )}
          </div>
          {!isLoggedIn ? (
            isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/login_page" tabIndex={0} className="outline-none focus:ring-2 focus:ring-ring rounded-full ml-[3px]">
                    <Avatar>
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">請先登入</TooltipContent>
              </Tooltip>
            ) : (
              <Link to="/login_page" tabIndex={0} className="outline-none focus:ring-2 focus:ring-ring rounded-full ml-[3px]">
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            )
          ) : (
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <div
                  tabIndex={0}
                  className="outline-none focus:ring-2 focus:ring-ring rounded-full ml-[3px]"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Avatar>
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={12} align="end" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                {dropdownMenuContent}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {/* Desktop: Navbar + Avatar at right */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <Link to="/">
            <img 
              src={"/src/assets/logo_dark.png"} 
              alt="Logo" 
              className="h-10 mr-6 cursor-pointer" 
            />
          </Link>
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="[&>*]:bg-transparent">
              {navMenuContent}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-4 flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {/* 搜尋按鈕 */}
            {isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                    <MagnifyingGlassIcon className="h-6 w-6" onClick={() => setSearchOpen(true)} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">搜尋</TooltipContent>
              </Tooltip>
            ) : (
              <button className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                <MagnifyingGlassIcon className="h-6 w-6" onClick={() => setSearchOpen(true)} />
              </button>
            )}
            {/* 通知按鈕 */}
            {isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                    <div className="relative">
                      <BellIcon className="h-6 w-6" />
                      <Badge className="absolute -top-1 -right-1 px-1 py-0 text-[10px] font-bold rounded-full">3</Badge>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">通知</TooltipContent>
              </Tooltip>
            ) : (
              <div className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                <div className="relative">
                  <BellIcon className="h-6 w-6" />
                  <Badge className="absolute -top-1 -right-1 px-1 py-0 text-[10px] font-bold rounded-full">3</Badge>
                </div>
              </div>
            )}
          </div>
          {!isLoggedIn ? (
            isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/login_page" tabIndex={0} className="outline-none focus:ring-2 focus:ring-ring rounded-full ml-[3px]">
                    <Avatar>
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">請先登入</TooltipContent>
              </Tooltip>
            ) : (
              <Link to="/login_page" tabIndex={0} className="outline-none focus:ring-2 focus:ring-ring rounded-full ml-[3px]">
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            )
          ) : (
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <div
                  tabIndex={0}
                  className="outline-none focus:ring-2 focus:ring-ring rounded-full ml-[3px]"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Avatar>
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={12} align="end" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                {dropdownMenuContent}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  )
}

export default Navbar
