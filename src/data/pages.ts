type Permission = number | "-NL";

interface PagePermission {
    perm: Permission[];
    go: string;
}

export const PagesPermissions: Record<string, PagePermission> = {
    "/": {
        perm: ["-NL"],
        go: "/modulos",
    },

    "/modulos": {
        perm: [1, 2, 3],
        go: "/",
    },
    "/propostas": {
        perm: [1, 2, 3],
        go: "/",
    },
    "/propostas/nova": {
        perm: [1, 2],
        go: "/propostas",
    },
};
