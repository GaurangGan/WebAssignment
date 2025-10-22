import { ScanLine } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ScanLine className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-foreground tracking-tight">
        Statement Snatcher
      </h1>
    </div>
  );
}
