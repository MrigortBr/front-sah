"use client";

import { useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";
import { SimpleProposal } from "@/services/proposal/type";
import { ColumnKey, buildRows } from "@/lib/export/helpers";
import { exportCSV } from "@/lib/export/csv";
import { exportXLSX } from "@/lib/export/toXlsx";
import { exportDOCX } from "@/lib/export/toDocx";
import { exportPDF } from "@/lib/export/toPdf";
import { useAlert } from "@/providers/alert/page";
import { Dropdown, DropdownItem, ExportButton, Wrapper } from "./styled";

type Props = {
    headers: string[];
    columns: ColumnKey[];
    data: SimpleProposal[];
    filename?: string;
};

const FORMATS = [
    { label: "Word (.docx)", icon: "📄", key: "docx" },
    { label: "Excel (.xlsx)", icon: "📊", key: "xlsx" },
    { label: "CSV (.csv)",   icon: "📋", key: "csv"  },
    { label: "PDF (.pdf)",   icon: "🖨️", key: "pdf"  },
] as const;

type FormatKey = (typeof FORMATS)[number]["key"];

export default function TableExport({ headers, columns, data, filename = "propostas" }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<FormatKey | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { callMessage } = useAlert();

    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    async function handleExport(format: FormatKey) {
        if (!data.length) {
            callMessage("Sem dados para exportar.", "error");
            return;
        }

        setLoading(format);
        setOpen(false);

        try {
            const exportColumns = columns.filter((c) => c !== "tecnico");
            const exportHeaders = headers.filter((_, i) => columns[i] !== "tecnico");
            const rows = buildRows(data, exportColumns);

            switch (format) {
                case "csv":  exportCSV(exportHeaders, rows, filename); break;
                case "xlsx": await exportXLSX(exportHeaders, rows, filename); break;
                case "docx": await exportDOCX(exportHeaders, rows, filename); break;
                case "pdf":  await exportPDF(exportHeaders, rows, filename); break;
            }

            callMessage("Arquivo exportado com sucesso!", "success");
        } catch {
            callMessage("Erro ao exportar. Tente novamente.", "error");
        } finally {
            setLoading(null);
        }
    }

    return (
        <Wrapper ref={wrapperRef}>
            <ExportButton onClick={() => setOpen((v) => !v)} disabled={!!loading}>
                <Download size={14} />
                {loading ? "Exportando..." : "Exportar"}
            </ExportButton>

            {open && (
                <Dropdown>
                    {FORMATS.map(({ label, icon, key }) => (
                        <DropdownItem key={key} onClick={() => handleExport(key)}>
                            {icon} {label}
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}
