import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function SkeletonPreview() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 gap-16">
      <h1 className="text-2xl font-bold mb-8">Skeleton 預覽</h1>

      {/* Blogpost1 Skeleton */}
      <div className="w-full max-w-7xl bg-card rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Blogpost1 Skeleton</h2>
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

      {/* Blog Post Skeleton */}
      <div className="w-full max-w-7xl bg-card rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Blog Post Skeleton</h2>
        <section className="py-8">
          <div className="w-full flex justify-center px-4">
            <div className="max-w-5xl flex flex-col items-center gap-4 text-center">
              {/* 標題 skeleton */}
              <Skeleton className="max-w-3xl h-12 md:h-16 w-full mb-4 rounded-lg" />
              {/* 副標 skeleton */}
              <Skeleton className="max-w-3xl h-6 md:h-8 w-3/4 mb-4 rounded" />
              {/* 作者區塊 skeleton */}
              <div className="flex items-center gap-3 text-sm md:text-base mb-4">
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
          <div className="w-full flex justify-center px-4 mt-8">
            <div className="max-w-3xl text-center">
              {/* 內文 skeleton 多行 mirror 真實段落 */}
              <Skeleton className="h-6 w-full mb-2 rounded" />
              <Skeleton className="h-6 w-3/4 mb-2 rounded" />
              <Skeleton className="h-6 w-2/3 mb-2 rounded" />
              <Skeleton className="h-6 w-1/2 mb-2 rounded" />
            </div>
          </div>
        </section>
      </div>

      {/* Changelog Skeleton */}
      <div className="w-full max-w-7xl bg-card rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Changelog Skeleton</h2>
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent mt-20 lg:mt-20 mx-15 lg:mx-10">
          {/* 主標題 skeleton */}
          <Skeleton className="text-3xl font-black mb-8 mt-10 h-10 w-32" />
          <div className="w-full max-w-2xl mx-auto px-4 py-8">
            <ol className="relative border-l border-border">
              {[1, 2, 3].map((idx) => (
                <li key={idx} className="mb-10 ml-6">
                  {/* 圓形點 skeleton */}
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full"> 
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </span>
                  {/* 版本標題區塊 */}
                  <div className="flex flex-col items-start text-lg font-semibold text-foreground mb-0 lg:mb-2">
                    {idx === 1 && (
                      <Skeleton className="mb-1 w-20 h-5 rounded" />
                    )}
                    <Skeleton className="h-6 w-48 rounded" />
                  </div>
                  {/* 內容列表 skeleton */}
                  <div className="mb-2 pl-5 space-y-2">
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-2 w-2 rounded-full mt-2 flex-shrink-0" />
                      <Skeleton className="h-4 w-full rounded" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-2 w-2 rounded-full mt-2 flex-shrink-0" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-2 w-2 rounded-full mt-2 flex-shrink-0" />
                      <Skeleton className="h-4 w-2/3 rounded" />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 