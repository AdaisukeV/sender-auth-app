import DesktopNav from "../components/desktop-nav";
import DashboardBreadcrumb from "../components/dashboard-breadcrumb";
import User from "../components/user";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen w-full flex-col">
            <DesktopNav />
            <div className="flex flex-col px-8 sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <DashboardBreadcrumb />
                    <User />
                </header>
                <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4">
                    {children}
                </main>
            </div>
        </main>
    );
}