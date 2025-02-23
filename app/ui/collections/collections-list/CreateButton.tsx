import { cn } from "@/app/lib/utils"

export function CreateButton({
  className,
}: {
  className?: string
}) {
  return (
    <button className={cn("p-[30px] bg-black text-white", className)}>
      <p className="text-[32px] leading-8">CREATE LIST</p>
    </button>
  )
}

export const CreateButtonContainer = ({
  children
}: {
  children?: React.ReactNode
}) => {
  return (
    <div className="w-full h-fit flex justify-end">
      {children}
    </div>
  )
}