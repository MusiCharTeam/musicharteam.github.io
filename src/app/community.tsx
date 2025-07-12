import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";

export default function Community() {
  return (
    <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
      <div className="w-full max-w-7xl bg-transparent">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
              {/* 標題區塊 */}
              <div className="space-y-4">
                <Typography as="h1" variant="h1" className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  加入我們的社群
                </Typography>
                <Typography as="p" variant="lead" className="text-base text-muted-foreground max-w-2xl">
                  與其他開發者交流，分享經驗，獲得最新更新和獨家內容。
                </Typography>
              </div>
              {/* 社群平台卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                <Card className="relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#5865F2] flex items-center justify-center">
                        <img src="/discord-brands.svg" alt="Discord" className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-left">Discord</CardTitle>
                        <CardDescription>加入我們的 Discord 伺服器</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Typography as="p" variant="muted" className="text-sm">
                      與其他開發者即時交流，參與技術討論，獲得最新更新。
                    </Typography>
                    <div className="flex items-center justify-between">
                      {/* <Badge variant="secondary">0 成員</Badge> */}
                      <Button variant="ghost" size="sm" className="gap-2">
                        加入
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                        <img src="/github-brands.svg" alt="GitHub" className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-left">GitHub</CardTitle>
                        <CardDescription>前往查看MusiChar開源專案</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Typography as="p" variant="muted" className="text-sm">
                      探索我們的開源專案，貢獻程式碼，參與專案開發。
                    </Typography>
                    <div className="flex items-center justify-between">
                      {/* <Badge variant="secondary">0 Stars</Badge> */}
                      <Button variant="ghost" size="sm" className="gap-2">
                        查看
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA 按鈕 */}
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 