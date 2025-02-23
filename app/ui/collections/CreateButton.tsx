import { cn } from "@/app/lib/utils"

export function CreateButton({
  className,
}: {
  className?: string
}) {
  return (
    <button className={cn("h-[60px] w-[120px] p-[30px] bg-black text-white", className)}>
      CREATE LIST
    </button>
  )
}