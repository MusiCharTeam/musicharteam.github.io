import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  published: string;
  image: string;
}

export default function BlogPost() {
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 添加一個測試用的文章
  const testPost: BlogPost = {
    id: "test",
    title: "測試文章",
    summary: "這是一個測試文章",
    content: "這是測試內容",
    author: "MusiChar 團隊",
    published: "2025年1月1日",
    image: "/blog_post/img/Discord-Symbol.png"
  };

  // 移除立即設定預設文章的邏輯，讓載入過程更自然

  // 解析 blog_post.txt 檔案的函數
  const parseBlogPost = (content: string, postId: string): BlogPost | null => {
    // 清理內容，移除 \r 字符
    const cleanContent = content.replace(/\r/g, '');
    
    // 使用更簡單的方法來分割文章
    const sections = cleanContent.split('\n\n').filter(section => section.trim());
    
    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];
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
              const [time, day, month, year] = parts;
              // 格式化為 dd/mm/yy xx:xx
              const formattedDay = day.padStart(2, '0');
              const formattedMonth = month.padStart(2, '0');
              const shortYear = year.slice(-2);
              post.published = `${formattedDay}/${formattedMonth}/${shortYear} ${time}`;
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
        } else if (line === '[content]' && i + 1 < lines.length) {
          const contentLine = lines[i + 1];
          if (contentLine && !contentLine.startsWith('[')) {
            post.content = contentLine;
          }
        }
      }
      
      if (post.title && post.summary && post.published && post.image) {
        post.id = `post-${index + 1}`;
        post.author = "MusiChar 團隊";
        
        // 檢查是否是要找的文章
        if (post.id === postId) {
          return post as BlogPost;
        }
      }
    }
    
    return null;
  };

  // 讀取特定的 blog post
  const fetchBlogPost = async (postId: string) => {
    try {
      // 確保至少顯示 700ms 的 skeleton
      const startTime = Date.now();
      
      const response = await fetch('/blog_post/blog_post.txt');
      if (!response.ok) {
        throw new Error('無法讀取 blog_post.txt 檔案');
      }
      
      const content = await response.text();
      const foundPost = parseBlogPost(content, postId);
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('找不到指定的文章');
      }
      
      // 確保總載入時間至少 700ms
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 700) {
        await new Promise(resolve => setTimeout(resolve, 700 - elapsedTime));
      }
    } catch (error) {
      console.error('讀取 blog_post.txt 時發生錯誤:', error);
      setError('載入文章時發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const postId = searchParams.get('id');
    
    // 重置狀態
    setLoading(true);
    setError(null);
    setPost(null);
    
    // 使用 setTimeout 確保狀態更新完成
    setTimeout(() => {
      if (postId) {
        fetchBlogPost(postId);
      } else {
        // 確保測試文章也有至少 700ms 的載入時間
        setTimeout(() => {
          setPost(testPost);
          setLoading(false);
        }, 700);
      }
    }, 0);
  }, [searchParams]);

  // 如果正在載入，顯示 skeleton
  if (loading) {
    return (
      <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
        <div className="w-full max-w-7xl bg-transparent">
          <section className="py-32">
            <div className="container">
              <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
                {/* 標題 skeleton */}
                <Skeleton className="max-w-3xl h-16 md:h-20 w-full rounded-lg" />
                {/* 副標 skeleton */}
                <Skeleton className="max-w-3xl h-6 md:h-8 w-3/4 rounded" />
                {/* 作者區塊 skeleton */}
                <div className="flex items-center gap-3 text-sm md:text-base">
                  <Skeleton className="h-8 w-8 rounded-full border" />
                  <div className="flex flex-col items-start gap-1">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-32 rounded" />
                  </div>
                </div>
                {/* 文章圖片 skeleton */}
                <AspectRatio ratio={16/9} className="mb-8 mt-4 w-full">
                  <Skeleton className="w-full h-full rounded-lg border object-cover" />
                </AspectRatio>
              </div>
            </div>
            <div className="container">
              <div className="prose dark:prose-invert mx-auto max-w-3xl">
                {/* 內文標題 skeleton */}
                <Skeleton className="h-8 w-48 mb-4 rounded" />
                {/* 內文段落 skeleton */}
                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                <Skeleton className="h-6 w-2/3 mb-4 rounded" />

                {/* 第二個標題 skeleton */}
                <Skeleton className="h-8 w-64 mb-4 rounded" />
                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-5/6 mb-4 rounded" />

                {/* Alert 區塊 skeleton */}
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-4 w-4 rounded-full flex-shrink-0 mt-1" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32 rounded" />
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                  </div>
                </div>

                {/* 第三個標題 skeleton */}
                <Skeleton className="h-8 w-56 mb-4 rounded" />
                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-4/5 mb-4 rounded" />

                {/* 表格 skeleton */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-3 border-b">
                          <Skeleton className="h-4 w-24 rounded" />
                        </th>
                        <th className="p-3 border-b">
                          <Skeleton className="h-4 w-28 rounded" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-muted" : ""}>
                          <td className="p-3 border-b">
                            <Skeleton className="h-4 w-16 rounded" />
                          </td>
                          <td className="p-3 border-b">
                            <Skeleton className="h-4 w-20 rounded" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-4/5 mb-4 rounded" />

                {/* 第四個標題 skeleton */}
                <Skeleton className="h-8 w-52 mb-4 rounded" />

                {/* 第二張圖片 skeleton */}
                <AspectRatio ratio={16/9} className="my-8 w-full">
                  <Skeleton className="w-full h-full rounded-md border object-cover" />
                </AspectRatio>

                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-5/6 mb-4 rounded" />

                {/* 引用區塊 skeleton */}
                <div className="border-l-4 border-primary pl-4 my-4">
                  <Skeleton className="h-6 w-full mb-2 rounded" />
                  <Skeleton className="h-6 w-4/5 rounded" />
                </div>

                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-3/4 mb-4 rounded" />

                {/* 列表 skeleton */}
                <ul className="space-y-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-4 w-48 rounded" />
                    </li>
                  ))}
                </ul>

                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-4/5 rounded" />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 如果沒有文章資料，顯示錯誤狀態
  if (!post) {
    return (
      <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
        <div className="w-full max-w-7xl bg-transparent">
          <div className="flex items-center justify-center py-32">
            <div className="text-lg text-red-500">
              {error || '找不到文章'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
      <div className="w-full max-w-7xl bg-transparent">
        <section className="py-32">
          <div className="w-full flex justify-center px-4">
            <div className="max-w-5xl flex flex-col items-center gap-4 text-center">
              <h1 className="max-w-3xl text-pretty text-3xl md:text-4xl font-semibold">
                {post.title}
              </h1>
              <h3 className="text-muted-foreground max-w-3xl text-base md:text-lg">
                {post.summary}
              </h3>
              <div className="flex items-center gap-3 text-sm md:text-base">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>
                  <a href="#" className="font-semibold">
                    {post.author}
                  </a>
                  <span className="ml-1 text-muted-foreground">在 {post.published} 發佈</span>
                </span>
              </div>
              <img
                src={post.image}
                alt={post.title}
                className="mb-8 mt-4 aspect-video w-full rounded-lg border object-cover"
              />
            </div>
          </div>
          <div className="w-full flex justify-center px-4 mt-8">
            <div className="max-w-3xl text-center">
              <p className="text-muted-foreground mt-2 text-lg">
                {post.content}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 