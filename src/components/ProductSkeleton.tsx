import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
  return (
    <div className="space-y-3.5">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-100">
        <Skeleton className="absolute inset-0 rounded-none" />

        <div className="absolute inset-x-0 top-3 flex items-start justify-between px-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="size-3 rounded-full" />
        ))}
        <Skeleton className="ml-1 h-3 w-6 rounded-full" />
      </div>

      <Skeleton className="h-4 w-3/4 rounded-full" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-16 rounded-full" />
        <Skeleton className="h-3 w-16 rounded-full" />
      </div>
    </div>
  )
}
