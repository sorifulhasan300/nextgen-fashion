export default function ProductSkeleton() {
  return (
    <div className="space-y-3.5">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-100">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100" />
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-16 rounded-full bg-neutral-100 animate-pulse" />
      </div>
      <div className="h-4 w-3/4 rounded-full bg-neutral-100 animate-pulse" />
      <div className="h-3.5 w-1/4 rounded-full bg-neutral-100 animate-pulse" />
    </div>
  );
}
