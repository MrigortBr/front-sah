import { PagesPermissions } from "@/data/pages";

export function iCanAcess(path: string, userPermission?: number) {
    const page = PagesPermissions[path];

    if (!page) {
        return {
            allowed: false,
            redirect: "/",
        };
    }

    // Página apenas para não logado
    if (page.perm.includes("-NL")) {
        return {
            allowed: userPermission === undefined,

            redirect: page.go,
        };
    }

    // Usuário não logado
    if (userPermission === undefined) {
        return {
            allowed: false,
            redirect: "/",
        };
    }

    return {
        allowed: page.perm.includes(userPermission),

        redirect: page.go,
    };
}
