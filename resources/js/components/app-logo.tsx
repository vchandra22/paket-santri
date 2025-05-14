import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/logo-thursina-white.svg" width="80%" height="80%" alt="Thursina Logo" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-md">
                <span className="mb-0.5 truncate leading-none text-primary font-semibold">Thursina Paket Santri</span>
            </div>
        </>
    );
}
