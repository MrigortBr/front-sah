"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function RootPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticated = isAuthenticated();

        router.replace(authenticated ? "/home" : "/login");

        setLoading(false);
    }, [router]);

    if (!loading) return null;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <CircularProgress color="primary" />
        </Box>
    );
}
