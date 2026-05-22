"use client";
import { useState } from "react";
import {
    LogoutButton,
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
import Loading from "../spinner/page";

export default function Topbar() {
    const { user, isLoading, logout } = useAuth();
    const { callMessage } = useAlert();

    if (isLoading) return <LoadingContainer>{/* <Loading></Loading> */}</LoadingContainer>;

    const name = user?.name ?? "Desconhecido";
    const surname = user?.surname ?? "Desconhecido";
    const role = user?.permission ?? "Desconhecido";

    const getInitials = (name?: string, surname?: string) => {
        const n = name?.[0]?.toUpperCase() ?? "";
        const s = surname?.[0]?.toUpperCase() ?? "";
        return `${n}${s}`;
    };

    async function handleLogout() {
        const r = await logout();

        if (!r.status) {
            callMessage(r.message, "error");
            return;
        }
    }

    return (
        <TopbarContainer>
            <TopbarBrand>
                <TopbarLogo>MS</TopbarLogo>

                <div>
                    <TopbarName>SAH</TopbarName>
                    <TopbarSub>Acompanhamento de Habilitações</TopbarSub>
                </div>
            </TopbarBrand>

            <TopbarRight>
                <UserInfo>
                    <UserAvatar>{getInitials(user?.name, user?.surname)}</UserAvatar>{" "}
                    <div>
                        <UserName>{`${name} ${surname}`}</UserName>
                        <UserRole>{`${role}`}</UserRole>
                    </div>
                </UserInfo>

                <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </TopbarRight>
        </TopbarContainer>
    );
}
