import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";

function parseChangelog(text: string) {
  const lines = text.split(/\r?\n/);
  const result: { title: string; content: string }[] = [];
  let current: { title: string; content: string[] } | null = null;
  const versionRegex = /^v[0-9.]+.*$/i;

  for (const line of lines) {
    if (versionRegex.test(line.trim())) {
      if (current) {
        result.push({ title: current.title, content: current.content.join('\n').trim() });
      }
      current = { title: line.trim(), content: [] };
    } else if (current) {
      current.content.push(line);
    }
  }
  if (current) {
    result.push({ title: current.title, content: current.content.join('\n').trim() });
  }
  return result;
}

export default function Changelog() {
  const [timeline, setTimeline] = useState<{ title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    fetch("/changelog.txt")
      .then(res => res.text())
      .then(text => {
        setTimeline(parseChangelog(text));
        setLoading(false);
        timer = setTimeout(() => setShowSkeleton(false), 400);
      });
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  if (loading || showSkeleton) {
    return (
      <div className="flex flex-col items-center bg-transparent pt-20 lg:pt-30 mx-15 lg:mx-10">
        <Skeleton className="text-3xl font-black mb-8 h-10 w-32" />
        <div className="w-full max-w-2xl mx-auto px-4 py-8">
          <ol className="relative border-l border-border">
            {[1, 2, 3].map((idx) => (
              <li key={idx} className="mb-10 md:mb-10 mb-16 ml-6">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full">
                  <Skeleton className="h-6 w-6 rounded-full" />
                </span>
                <div className="flex flex-col items-start text-lg font-semibold text-foreground mb-0 lg:mb-2">
                  {idx === 1 && (
                    <Skeleton className="mb-1 w-20 h-5 rounded" />
                  )}
                  <Skeleton className="h-6 w-48 rounded" />
                </div>
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
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent mt-20 lg:mt-20 mx-15 lg:mx-10">
      <h1 className="text-3xl font-black mb-8 mt-10">更新日誌</h1>
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <ol className="relative border-l border-border">
          {timeline.map((item, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" />
                </svg>
              </span>
              <h3 className="flex flex-col items-start text-lg font-semibold text-foreground mb-0 lg:mb-2">
                {idx === 0 && (
                  <Badge variant="secondary" className="mb-1 w-fit">最新版本</Badge>
                )}
                {item.title}
              </h3>
              <Typography as="ul" variant="muted" className="mb-2 list-disc pl-5">
                {item.content.split(/\r?\n/).filter(line => line.trim()).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </Typography>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
} 