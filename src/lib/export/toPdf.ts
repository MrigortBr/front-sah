export async function exportPDF(headers: string[], rows: string[][], filename: string) {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({ orientation: "landscape" });

    autoTable(doc, {
        head: [headers],
        body: rows,
        styles: { font: "helvetica", fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [27, 94, 59], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [244, 246, 244] },
        margin: { top: 15, left: 10, right: 10 },
    });

    doc.save(`${filename}.pdf`);
}
