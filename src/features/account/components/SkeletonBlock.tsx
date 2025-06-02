
export default function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
    className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`}
    aria-hidden="true"
  />
  )
}
