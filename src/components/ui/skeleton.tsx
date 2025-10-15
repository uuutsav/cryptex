import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md p-2 bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
