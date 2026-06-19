"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    LogoutButton,
    MobileNavBar,
    NavButton,
    NavGroup,
    SessionTimer,
    TopbarBrand,
    TopbarContainer,
    TopbarLogo,
    TopbarName,
    TopbarRight,
    TopbarSub,
    UserAvatar,
    UserInfo,
    UserName,
    UserRole,
} from "./styled";
import { useAuth } from "@/context/auth/auth.context";
import { useAlert } from "@/providers/alert/page";
import { LoadingContainer } from "../module/styled";

const NAV_PAGES = [
    { label: "Ativos", href: "/ativos" },
    { label: "Módulos", href: "/modulos" },
    { label: "Propostas", href: "/propostas" },
];

function formatRemaining(seconds: number) {
    const s = Math.max(0, seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    const mm = String(m).padStart(2, "0");
    const sss = String(ss).padStart(2, "0");
    if (h > 0) return `${String(h).padStart(2, "0")}:${mm}:${sss}`;
    return `${mm}:${sss}`;
}

export default function Topbar() {
    const { user, isLoading, logout } = useAuth();
    const { callMessage } = useAlert();
    const pathname = usePathname();
    const router = useRouter();
    const [remaining, setRemaining] = useState(0);

    async function handleLogout() {
        const r = await logout();
        if (!r.status) callMessage(r.message, "error");
    }

    useEffect(() => {
        if (!user?.expires) return;

        const expMs = new Date(user.expires).getTime();

        const tick = () => {
            const secs = Math.floor((expMs - Date.now()) / 1000);
            if (secs <= 0) {
                setRemaining(0);
                handleLogout();
                return;
            }
            setRemaining(secs);
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.expires]);

    if (isLoading) return <LoadingContainer />;

    const name = user?.name ?? "Desconhecido";
    const surname = user?.surname ?? "Desconhecido";
    const role = user?.permission ?? "Desconhecido";

    const getInitials = (n?: string, s?: string) => `${n?.[0]?.toUpperCase() ?? ""}${s?.[0]?.toUpperCase() ?? ""}`;

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const navButtons = NAV_PAGES.map((page) => (
        <NavButton key={page.href} $active={isActive(page.href)} onClick={() => router.push(page.href)}>
            {page.label}
        </NavButton>
    ));

    return (
        <>
            <TopbarContainer>
                <TopbarBrand>
                    <TopbarLogo>MS</TopbarLogo>
                    <div>
                        <TopbarName>SAH</TopbarName>
                        <TopbarSub>Acompanhamento de Habilitações</TopbarSub>
                    </div>
                </TopbarBrand>

                <NavGroup>{navButtons}</NavGroup>

                <TopbarRight>
                    <SessionTimer>⏱ {formatRemaining(remaining)}</SessionTimer>
                    <UserInfo>
                        <UserAvatar>{getInitials(user?.name, user?.surname)}</UserAvatar>
                        <div>
                            <UserName>{`${name} ${surname}`}</UserName>
                            <UserRole>{role}</UserRole>
                        </div>
                    </UserInfo>
                    <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
                </TopbarRight>
            </TopbarContainer>

            <MobileNavBar>{navButtons}</MobileNavBar>
        </>
    );
}
