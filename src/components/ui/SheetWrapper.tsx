import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetWrapperProps {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  descpription?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const SheetWrapper: React.FC<SheetWrapperProps> = ({
  trigger,
  children,
  title,
  side,
  descpription,
}) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        side={side}
        className="bg-[#fff] rounded-t-xl border-none outline-none"
      >
        <SheetHeader className="items-center flex w-full">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{descpription}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
