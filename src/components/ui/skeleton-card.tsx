import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="pt-0">
      <div className="aspect-16/9 w-full overflow-hidden rounded-t-xl">
        <Skeleton className="rounded-t-xl w-full h-full" />
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold hover:underline md:text-xl">
          <Skeleton className="h-6 w-3/4 rounded" />
        </h3>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          <Skeleton className="h-4 w-full mb-2 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-foreground hover:underline">
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
  )
} 