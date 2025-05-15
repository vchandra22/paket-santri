import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Archive, LayoutGrid, Package, Shield, University, User2, UserCog2, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        permission: "dashboard_access",
    },
    {
        title: 'Paket',
        href: '/paket',
        icon: Package,
        permission: "paket_access",
    },
    {
        title: 'Kategori Paket',
        href: '/kategori-paket',
        icon: Archive,
        permission: "kategori_access",
    },
    {
        title: 'Santri',
        href: '/santri',
        icon: UsersRound,
        permission: "santri_access",
    },
    {
        title: 'Asrama',
        href: '/asrama',
        icon: University,
        permission: "asrama_access",
    },
];

const mainNavFooter: NavItem[] = [
    {
        title: 'User',
        href: '/admin/users',
        icon: User2,
        permission: "user_access",
    },
    {
        title: 'Roles',
        href: '/admin/roles',
        icon: UserCog2,
        permission: "role_access",
    },
    {
        title: 'Hak Akses',
        href: '/admin/permissions',
        icon: Shield,
        permission: "permission_access",
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
