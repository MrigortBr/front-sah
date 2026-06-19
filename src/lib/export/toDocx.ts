import { triggerDownload } from "./helpers";

export async function exportDOCX(headers: string[], rows: string[][], filename: string) {
    const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType } =
        await import("docx");

    const makeCell = (text: string, bold = false) =>
        new TableCell({
            children: [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text, font: "Arial", size: 20, bold })],
                }),
            ],
        });

    const headerRow = new TableRow({ children: headers.map((h) => makeCell(h, true)) });
    const dataRows = rows.map((row) => new TableRow({ children: row.map((cell) => makeCell(cell)) }));

    const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [headerRow, ...dataRows],
    });

    const doc = new Document({ sections: [{ children: [table] }] });
    const blob = await Packer.toBlob(doc);
    triggerDownload(blob, `${filename}.docx`);
}
