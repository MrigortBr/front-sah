import { triggerDownload } from "./helpers";

export function exportCSV(headers: string[], rows: string[][], filename: string) {
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
    const blob = new Blob(["﻿" + lines], { type: "text/csv;charset=utf-8;" });
    triggerDownload(blob, `${filename}.csv`);
}
