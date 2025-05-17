import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ThemeToggle';
import { Github } from 'lucide-react';
import { Button } from './ui/button';

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  title?: string;
  navItems?: NavItem[];
  className?: string;
}

export function Header({
  title = "URL Summarizer",
  navItems = [
    { href: "/saved", label: "Saved summaries" }
  ],
  className,
}: HeaderProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-bold">
          {title}
        </Link>
        <div className="flex items-center gap-4">
          {navItems.length > 0 && (
            <nav className="flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <a href="https://github.com/patamimbre/url-summarizer" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}