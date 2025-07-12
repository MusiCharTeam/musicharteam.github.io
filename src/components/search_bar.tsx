import { useEffect, useState, useRef } from "react";
import { DialogNoClose, DialogNoCloseContent } from "@/components/ui/dialog-no-close";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, ArrowRightIcon, ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DUMMY_RESULTS = [
  { group: "快速開始", items: [
    { label: "最新消息", url: "/latest_news" },
    { label: "更新日志", url: "/changelog" },
    { label: "下載游戲", url: "/download_game" },
    { label: "前往Discord社群", url: "https://github.com/WuJoe826/Musichar" },
  ]}
];

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const items = DUMMY_RESULTS[0].items;
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
      if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        setActiveIdx(idx => {
          const total = items.length;
          if (event.key === 'ArrowDown') return (idx + 1) % total;
          if (event.key === 'ArrowUp') return (idx - 1 + total) % total;
          return idx;
        });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, items.length]);

  // 處理跳轉
  const handleNavigate = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      navigate(url);
    }
    onClose();
  };

  return (
    <DialogNoClose open={isOpen} onOpenChange={onClose}>
      <DialogNoCloseContent className="sm:max-w-lg bg-neutral-900/50 backdrop-blur rounded-2xl shadow-2xl p-0 overflow-hidden border border-neutral-700/50 ring-2 ring-neutral-700/20">
        {/* 搜尋框 */}
        <div className="p-4 border-b border-neutral-800">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="搜尋"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-3 text-base bg-neutral-800 text-white placeholder:text-neutral-500 rounded-lg border border-neutral-700/50 focus-visible:border-neutral-700/50 focus-visible:ring-0 focus-visible:outline-none"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const item = items[activeIdx];
                  if (item && item.url) {
                    handleNavigate(item.url);
                  }
                }
              }}
            />
          </div>
        </div>
        {/* 搜尋結果 */}
        <div 
          className="max-h-96 overflow-y-auto"
          onWheel={(e) => {
            e.stopPropagation();
            const target = e.currentTarget;
            const { scrollTop, scrollHeight, clientHeight } = target;
            const delta = e.deltaY;
            
            // 檢查是否可以滾動
            if ((delta > 0 && scrollTop < scrollHeight - clientHeight) || 
                (delta < 0 && scrollTop > 0)) {
              e.preventDefault();
            }
          }}
        >
          {DUMMY_RESULTS.map((group) => (
            <div key={group.group}>
              <div className="px-4 pt-4 pb-2 text-xs text-neutral-400 font-semibold">{group.group}</div>
              {group.items.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center px-4 py-2 cursor-pointer text-white transition-colors ${activeIdx === idx ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`}
                  tabIndex={0}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => item.url && handleNavigate(item.url)}
                >
                  <ArrowRightIcon className="h-4 w-4 mr-3 text-neutral-400" />
                  <span className={`font-medium ${activeIdx === idx ? 'text-white' : 'text-neutral-200'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* 底部快捷鍵提示 */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-neutral-800 bg-neutral-950 text-xs text-neutral-400">
          <span>按 <Badge variant="secondary" className="font-primary">Enter</Badge> 前往頁面</span>
          <span className="ml-auto flex items-center gap-1"><ArrowTurnDownLeftIcon className="h-4 w-4" /></span>
        </div>
      </DialogNoCloseContent>
    </DialogNoClose>
  );
}
