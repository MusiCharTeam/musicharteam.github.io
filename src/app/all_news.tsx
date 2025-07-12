import { Latest } from "@/components/latest";
import { useEffect, useState } from "react";
import { SkeletonCardGrid } from "@/components/ui/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

export default function AllNews() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // 解析 blog_post.txt 檔案的函數
  const parseBlogPosts = (content: string): BlogPost[] => {
    const posts: BlogPost[] = [];
    
    // 清理內容，移除 \r 字符
    const cleanContent = content.replace(/\r/g, '');
    
    // 使用更簡單的方法來分割文章
    const sections = cleanContent.split('\n\n').filter(section => section.trim());
    
    sections.forEach((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const post: Partial<BlogPost> = {};
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line === '[time]' && i + 1 < lines.length) {
          const timeLine = lines[i + 1];
          if (timeLine && !timeLine.startsWith('[')) {
            // 解析時間格式 "11:31/5/7/2025"
            const parts = timeLine.split('/');
            if (parts.length >= 4) {
              // 格式: "11:31/5/7/2025" -> [time, day, month, year]
              const [, day, month, year] = parts;
              post.published = `${year}年${month}月${day}日`;
            }
          }
        } else if (line === '[title]' && i + 1 < lines.length) {
          const titleLine = lines[i + 1];
          if (titleLine && !titleLine.startsWith('[')) {
            post.title = titleLine;
          }
        } else if (line === '[img]' && i + 1 < lines.length) {
          const imgLine = lines[i + 1];
          if (imgLine && !imgLine.startsWith('[')) {
            post.image = `/blog_post/img/${imgLine}`;
          }
        } else if (line === '[summary]' && i + 1 < lines.length) {
          const summaryLine = lines[i + 1];
          if (summaryLine && !summaryLine.startsWith('[')) {
            post.summary = summaryLine;
          }
        }
      }
      
      if (post.title && post.summary && post.published && post.image) {
        post.id = `post-${index + 1}`;
        post.label = "最新消息";
        post.author = "MusiChar 團隊";
        post.url = "#";
        
        posts.push(post as BlogPost);
      }
    });
    
    return posts;
  };

  // 讀取 blog_post.txt 檔案
  const fetchBlogPosts = async () => {
    // 確保 skeleton 至少顯示 700ms
    const skeletonDelay = new Promise(resolve => setTimeout(resolve, 700));
    try {
      const response = await fetch('/blog_post/blog_post.txt');
      if (!response.ok) {
        throw new Error('無法讀取 blog_post.txt 檔案');
      }
      const content = await response.text();
      const allPosts = parseBlogPosts(content);
      await skeletonDelay;
      setBlogPosts(allPosts);
      setShowSkeleton(false);
    } catch (error) {
      console.error('讀取 blog_post.txt 時發生錯誤:', error);
      // 如果讀取失敗，使用預設資料
      const fallbackPosts = [
        {
          id: "news-1",
          title: "MusiChar v1.2.0 正式發布",
          summary: "全新版本帶來更多關卡圖譜、改進的節奏檢測算法，以及全新的用戶界面設計。為讀寫障礙兒童提供更好的學習體驗。",
          label: "版本更新",
          author: "MusiChar 團隊",
          published: "2024年1月15日",
          url: "/changelog",
          image: "/latest_new_img/news1.jpg",
        },
        {
          id: "news-2",
          title: "新增 50+ 精選關卡圖譜",
          summary: "我們新增了50多個精心設計的關卡圖譜，涵蓋從基礎到進階的各種難度，幫助孩子們逐步提升書寫能力。",
          label: "內容更新",
          author: "MusiChar 團隊",
          published: "2024年1月10日",
          url: "#",
          image: "/latest_new_img/news2.jpg",
        },
        {
          id: "news-3",
          title: "Discord 社群正式開放",
          summary: "加入我們的 Discord 社群，與其他玩家分享關卡圖譜，討論遊戲技巧，並獲得最新的開發更新。",
          label: "社群",
          author: "MusiChar 團隊",
          published: "2024年1月5日",
          url: "https://github.com/WuJoe826/Musichar",
          image: "/latest_new_img/news3.jpg",
        },
        {
          id: "news-4",
          title: "MusiChar v1.1.0 更新發布",
          summary: "修復了多個已知問題，優化了遊戲性能，並新增了更多輔助功能。",
          label: "版本更新",
          author: "MusiChar 團隊",
          published: "2024年1月1日",
          url: "/changelog",
          image: "/latest_new_img/news1.jpg",
        },
        {
          id: "news-5",
          title: "新增多語言支援",
          summary: "現在支援繁體中文、簡體中文和英文三種語言，讓更多用戶能夠享受遊戲。",
          label: "功能更新",
          author: "MusiChar 團隊",
          published: "2023年12月25日",
          url: "#",
          image: "/latest_new_img/news2.jpg",
        },
        {
          id: "news-6",
          title: "遊戲教學系統上線",
          summary: "全新的教學系統幫助新玩家快速上手，包含詳細的操作指南和練習模式。",
          label: "功能更新",
          author: "MusiChar 團隊",
          published: "2023年12月20日",
          url: "#",
          image: "/latest_new_img/news3.jpg",
        },
        {
          id: "news-7",
          title: "社群活動開始",
          summary: "參與我們的社群活動，分享你的創作，贏取精美獎品。",
          label: "社群",
          author: "MusiChar 團隊",
          published: "2023年12月15日",
          url: "#",
          image: "/latest_new_img/news1.jpg",
        },
        {
          id: "news-8",
          title: "性能優化更新",
          summary: "大幅優化了遊戲性能，減少了載入時間，提升了整體遊戲體驗。",
          label: "技術更新",
          author: "MusiChar 團隊",
          published: "2023年12月10日",
          url: "#",
          image: "/latest_new_img/news2.jpg",
        },
        {
          id: "news-9",
          title: "新增音效系統",
          summary: "全新的音效系統提供更好的聽覺反饋，讓遊戲體驗更加豐富。",
          label: "功能更新",
          author: "MusiChar 團隊",
          published: "2023年12月5日",
          url: "#",
          image: "/latest_new_img/news3.jpg",
        },
        {
          id: "news-10",
          title: "Beta 測試開始",
          summary: "MusiChar Beta 版本正式開始測試，歡迎玩家提供寶貴意見。",
          label: "測試",
          author: "MusiChar 團隊",
          published: "2023年12月1日",
          url: "#",
          image: "/latest_new_img/news1.jpg",
        },
      ];
      await skeletonDelay;
      setBlogPosts(fallbackPosts);
      setShowSkeleton(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogPosts.length === 0) {
      setShowSkeleton(true);
      fetchBlogPosts();
    } else {
      setShowSkeleton(false);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  // 計算分頁
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  // 分頁按鈕處理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 生成分頁項目
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // 如果總頁數少於等於最大可見頁數，顯示所有頁碼
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // 如果總頁數大於最大可見頁數，顯示部分頁碼
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // 調整起始頁，確保顯示最大可見頁數
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      // 添加第一頁
      if (startPage > 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        
        if (startPage > 2) {
          items.push(
            <PaginationItem key="ellipsis1">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }
      
      // 添加中間頁碼
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // 添加最後一頁
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(
            <PaginationItem key="ellipsis2">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    return items;
  };

  if (loading || showSkeleton) {
    return (
      <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
        <div className="w-full max-w-7xl bg-transparent">
          <section className="py-32">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
              <div className="text-center">
                <Skeleton className="h-7 w-32 md:h-8 md:w-48 lg:h-10 lg:w-64 mx-auto mb-3" />
                <Skeleton className="h-4 w-40 md:w-96 mx-auto mb-8" />
              </div>
              <SkeletonCardGrid count={9} />
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
      <div className="w-full max-w-7xl bg-transparent">
        <Latest
          heading="所有消息"
          description="查看 MusiChar 的所有更新、功能改進和社群動態。我們致力於為讀寫障礙兒童提供更好的音樂節奏學習體驗。"
          posts={currentPosts}
        />
        
        {/* 分頁控制 */}
        {totalPages > 1 && (
          <div className="mt-8 mb-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {generatePaginationItems()}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        {/* 頁面信息 */}
        <div className="text-center mt-4 mb-8 text-muted-foreground">
          顯示第 {startIndex + 1} - {Math.min(endIndex, blogPosts.length)} 篇文章，共 {blogPosts.length} 篇
        </div>
      </div>
    </div>
  );
} 