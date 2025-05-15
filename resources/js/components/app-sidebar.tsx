import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Archive, LayoutGrid, Package, Shield, University, User2, UserCog2, Users, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from '@/components/nav-footer';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Paket',
        href: '/paket',
        icon: Package,
    },
    {
        title: 'Kategori Paket',
        href: '/kategori-paket',
        icon: Archive,
    },
    {
        title: 'Santri',
        href: '/santri',
        icon: UsersRound,
    },
    {
        title: 'Asrama',
        href: '/asrama',
        icon: University,
    },
];

const mainNavFooter: NavItem[] = [
    {
        title: 'User',
        href: '/admin/users',
        icon: User2,
    },
    {
        title: 'Roles',
        href: '/admin/roles',
        icon: UserCog2,
    },
    {
        title: 'Hak Akses',
        href: '/admin/permissions',
        icon: Shield,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavMain items={mainNavFooter} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
