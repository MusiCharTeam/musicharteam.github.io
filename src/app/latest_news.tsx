import { Latest } from "@/components/latest";
import { useEffect, useState } from "react";
import { SkeletonCardGrid } from "@/components/ui/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function LatestNews() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // 解析 blog_post.txt 檔案的函數
  const parseBlogPosts = (content: string): BlogPost[] => {
    const posts: BlogPost[] = [];
    
    // 清理內容，移除 \r 字符
    const cleanContent = content.replace(/\r/g, '');
    
    console.log('清理後的內容:', cleanContent);
    
    // 使用更簡單的方法來分割文章
    const sections = cleanContent.split('\n\n').filter(section => section.trim());
    
    console.log('分割後的段落數量:', sections.length);
    
    sections.forEach((section, index) => {
      console.log(`處理段落 ${index + 1}:`, section);
      
      const lines = section.split('\n').filter(line => line.trim());
      const post: Partial<BlogPost> = {};
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line === '[time]' && i + 1 < lines.length) {
          const timeLine = lines[i + 1];
          if (timeLine && !timeLine.startsWith('[')) {
            // 解析時間格式 "11:31/5/7/2025"
            console.log('解析時間:', timeLine);
            const parts = timeLine.split('/');
            console.log('分割結果:', parts);
            if (parts.length >= 4) {
              // 格式: "11:31/5/7/2025" -> [time, day, month, year]
              const [, day, month, year] = parts;
              post.published = `${year}年${month}月${day}日`;
              console.log('解析後的日期:', post.published);
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
      
      console.log('解析到的文章資料:', post);
      
      if (post.title && post.summary && post.published && post.image) {
        post.id = `post-${index + 1}`;
        post.label = "最新消息";
        post.author = "MusiChar 團隊";
        post.url = "#";
        
        posts.push(post as BlogPost);
        console.log('成功添加文章:', post.title);
      } else {
        console.log('文章資料不完整，跳過:', post);
      }
    });
    
    console.log('最終解析到的文章數量:', posts.length);
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
      
      // 取最新的三個文章（從左到右 = 新到舊）
      const latestPosts = allPosts.slice(0, 3);
      
      // 等待 skeleton 顯示完成
      await skeletonDelay;
      
      setBlogPosts(latestPosts);
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
          url: "https://discord.gg/9e69BKPCzC",
          image: "/latest_new_img/news3.jpg",
        },
      ];
      
      // 等待 skeleton 顯示完成
      await skeletonDelay;
      
      setBlogPosts(fallbackPosts);
      setShowSkeleton(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  if (loading || showSkeleton) {
    return (
      <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
        <div className="w-full max-w-7xl bg-transparent">
          <section className="py-32">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
              <div className="text-center">
                <Skeleton className="h-7 w-32 md:h-8 md:w-48 lg:h-10 lg:w-64 mx-auto mb-3" />
                <Skeleton className="h-4 w-40 md:w-96 mx-auto mb-8" />
                <Skeleton className="h-5 w-24 md:h-6 md:w-32 mx-auto" />
              </div>
              <SkeletonCardGrid count={3} />
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
          heading="最新消息"
          description="了解 MusiChar 的最新更新、功能改進和社群動態。我們致力於為讀寫障礙兒童提供更好的音樂節奏學習體驗。"
          buttonText="前往所有消息"
          buttonUrl="/all_news"
          posts={blogPosts}
        />
      </div>
    </div>
  );
}
