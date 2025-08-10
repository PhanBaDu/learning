import { BookOpenText, GraduationCap, LucideIcon, Route } from 'lucide-react';

interface SidebarPaths {
  href: string;
  icon: LucideIcon;
  title: string;
  active: boolean;
}

export const sidebarPaths: SidebarPaths[] = [
  {
    href: '/',
    icon: GraduationCap,
    title: 'Trang chủ',
    active: true,
  },
  {
    href: '/learning',
    icon: Route,
    title: 'Lộ trình',
    active: false,
  },
  {
    href: '/blog',
    icon: BookOpenText,
    title: 'Bài viết',
    active: false,
  },
];
