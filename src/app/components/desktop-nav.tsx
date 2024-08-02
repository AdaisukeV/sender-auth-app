import Link from 'next/link';
import {
    House,
    LineChart,
    Mail
} from 'lucide-react';
import { VercelLogo } from './icons'
import { Tooltip } from "@nextui-org/react";

export default function DesktopNav() {
    return(
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Tooltip
                    showArrow
                    content="Dashboard"
                    placement="right"
                    classNames={{
                        base: [
                          // arrow color
                          "before:bg-neutral-400 dark:before:bg-white",
                        ],
                        content: [
                          "py-2 px-4 shadow-xl",
                          "text-black bg-gradient-to-br from-white to-neutral-400",
                        ],
                    }}
                >
                    <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <House className="h-5 w-5" />
                    </Link>
                </Tooltip>
                <Tooltip
                    showArrow
                    content="Analytics"
                    placement="right"
                    classNames={{
                        base: [
                          // arrow color
                          "before:bg-neutral-400 dark:before:bg-white",
                        ],
                        content: [
                          "py-2 px-4 shadow-xl",
                          "text-black bg-gradient-to-br from-white to-neutral-400",
                        ],
                    }}
                >
                    <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <LineChart className="h-5 w-5" />
                    </Link>
                </Tooltip>
                <Tooltip
                    showArrow
                    content="Mail"
                    placement="right"
                    classNames={{
                        base: [
                          // arrow color
                          "before:bg-neutral-400 dark:before:bg-white",
                        ],
                        content: [
                          "py-2 px-4 shadow-xl",
                          "text-black bg-gradient-to-br from-white to-neutral-400",
                        ],
                    }}
                >
                    <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Mail className="h-5 w-5" />
                    </Link>
                </Tooltip>
            </nav>
        </aside>
    );
}