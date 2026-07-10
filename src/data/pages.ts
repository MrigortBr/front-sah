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
        go: "/modulos",
    },
    "/propostas/nova": {
        perm: [1, 2],
        go: "/propostas",
    },
    "/ativos": {
        perm: [1, 2, 3],
        go: "/modulos",
    },
    "/ativos/ler": {
        perm: [1, 2],
        go: "/ativos",
    },
    "/mapa": {
        perm: [1, 2, 3],
        go: "/modulos",
    },
};
