"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" asChild>
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-screen",
          className
        )}
        {...props}
      />
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
