import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("block w-full h-full bg-accent animate-pulse box-border rounded-xl", className)}
      {...props}
    />
  )
}

export { Skeleton }
