'use client'

import {Breadcrumbs, BreadcrumbItem, Link} from "@nextui-org/react";

export default function DashboardBreadcrumb() {
    return(
        <Breadcrumbs>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Mail</BreadcrumbItem>
            <BreadcrumbItem>
                <Link href="/" color="foreground">Sender Authentication</Link>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}