"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-slate-200 last:border-b-0", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn("group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-extrabold text-slate-900 transition-colors outline-none hover:text-indigo-700 focus-visible:rounded-lg focus-visible:outline-3 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-50", className)} {...props}>
        {children}
        <svg className="size-5 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="overflow-hidden text-sm text-slate-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
      <div className={cn("pb-5 pr-8 leading-7", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
