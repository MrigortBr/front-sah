export async function exportXLSX(headers: string[], rows: string[][], filename: string) {
    const { utils, writeFile } = await import("xlsx");
    const ws = utils.aoa_to_sheet([headers, ...rows]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Propostas");
    writeFile(wb, `${filename}.xlsx`);
}
