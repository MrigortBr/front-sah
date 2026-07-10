"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useRouter } from "next/navigation";
import { proposalService } from "@/services/proposal/Proposal";
import { SimpleProposal } from "@/services/proposal/type";
import {
    BackButton, FilterCount, FilterGroupChevron, FilterGroupHeader, FilterItem,
    FilterSearch, KpiChip, LegendBar, LegendEnds, LegendGradient, LoadingOverlay,
    Main, MapArea, ModalBtn, ModalCard, ModalClose, ModalEmpty, ModalHeader,
    ModalItem, ModalItemInfo, ModalItemMeta, ModalItemName, ModalList, ModalBadge,
    ModalOverlay, ModalSubtitle, ModalTitle, ModalTitleBlock,
    PageTitle, Sidebar, SidebarLabel, SidebarSection, SidebarTitle,
    Tooltip, TooltipRow, TooltipTitle, TooltipValue, TopBar, Wrapper,
    ZoomButton, ZoomControls,
    SidebarSectionChevron, SidebarSectionHeader,
} from "./styled";
import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GeoFeature {
    rsmKey: string;
    properties: Record<string, string | number | undefined | null>;
    geometry: unknown;
    type: string;
}

interface ContextData {
    name: string;
    proposals: SimpleProposal[];
}

// ─── GeoJSON sources ──────────────────────────────────────────────────────────
const STATES_GEO =
    "https://raw.githubusercontent.com/giuliano-macedo/geodata-br-states/main/geojson/br_states.json";
const MUN_GEO = (code: number) =>
    `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${code}-mun.json`;

// ─── UF configs ───────────────────────────────────────────────────────────────
const STATE_CFG: Record<string, { center: [number, number]; scale: number; ibge: number }> = {
    AC: { center: [-70.5, -9.0],  scale: 2200,  ibge: 12 },
    AL: { center: [-36.6, -9.5],  scale: 6000,  ibge: 27 },
    AM: { center: [-64.4, -4.1],  scale: 900,   ibge: 13 },
    AP: { center: [-51.8,  1.2],  scale: 2800,  ibge: 16 },
    BA: { center: [-41.7, -12.5], scale: 1300,  ibge: 29 },
    CE: { center: [-39.5, -5.2],  scale: 2600,  ibge: 23 },
    DF: { center: [-47.9, -15.8], scale: 18000, ibge: 53 },
    ES: { center: [-40.6, -19.6], scale: 4500,  ibge: 32 },
    GO: { center: [-49.6, -15.9], scale: 1700,  ibge: 52 },
    MA: { center: [-45.3, -5.4],  scale: 1600,  ibge: 21 },
    MG: { center: [-44.5, -18.5], scale: 1400,  ibge: 31 },
    MS: { center: [-54.8, -20.5], scale: 1700,  ibge: 50 },
    MT: { center: [-55.9, -12.6], scale: 1200,  ibge: 51 },
    PA: { center: [-52.0, -3.9],  scale: 900,   ibge: 15 },
    PB: { center: [-36.8, -7.2],  scale: 4500,  ibge: 25 },
    PE: { center: [-37.9, -8.4],  scale: 2500,  ibge: 26 },
    PI: { center: [-43.0, -7.5],  scale: 1900,  ibge: 22 },
    PR: { center: [-51.6, -24.7], scale: 2100,  ibge: 41 },
    RJ: { center: [-43.2, -22.4], scale: 4200,  ibge: 33 },
    RN: { center: [-36.5, -5.8],  scale: 4000,  ibge: 24 },
    RO: { center: [-62.8, -10.8], scale: 1700,  ibge: 11 },
    RR: { center: [-61.5,  2.1],  scale: 1700,  ibge: 14 },
    RS: { center: [-53.4, -30.0], scale: 1900,  ibge: 43 },
    SC: { center: [-50.4, -27.4], scale: 3200,  ibge: 42 },
    SE: { center: [-37.4, -10.6], scale: 6500,  ibge: 28 },
    SP: { center: [-48.5, -22.1], scale: 2100,  ibge: 35 },
    TO: { center: [-48.3, -10.2], scale: 1700,  ibge: 17 },
};

// ─── UF name → sigla ──────────────────────────────────────────────────────────
const UF_NAME_TO_SIGLA: Record<string, string> = {
    "Acre": "AC", "Alagoas": "AL", "Amapa": "AP", "Amazonas": "AM",
    "Bahia": "BA", "Ceara": "CE", "Distrito Federal": "DF",
    "Espirito Santo": "ES", "Goias": "GO", "Maranhao": "MA",
    "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
    "Para": "PA", "Paraiba": "PB", "Parana": "PR", "Pernambuco": "PE",
    "Piaui": "PI", "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS", "Rondonia": "RO", "Roraima": "RR",
    "Santa Catarina": "SC", "Sao Paulo": "SP", "Sergipe": "SE",
    "Tocantins": "TO",
};
function ufToSigla(uf: string): string { return UF_NAME_TO_SIGLA[uf] ?? uf; }

// ─── Routing helper ───────────────────────────────────────────────────────────
function getRoute(p: SimpleProposal): string {
    return p.situacao === "Proposta concluída"
        ? `/ativos/ler?id=${p.id_habilitacao}`
        : `/propostas/nova?id=${p.id_habilitacao}`;
}

// ─── Situação badge colours ───────────────────────────────────────────────────
function situacaoStyle(s: string): { bg: string; color: string } {
    if (s === "Proposta concluída")  return { bg: "#e8f5e9", color: "#1b5e3b" };
    if (s === "Aprovada")            return { bg: "#e3f2fd", color: "#1565c0" };
    if (s === "Portaria Publicada")  return { bg: "#e8f5e9", color: "#2e7d32" };
    if (s === "Rejeitada")           return { bg: "#fce4ec", color: "#b71c1c" };
    if (s === "Em diligência")       return { bg: "#fff8e1", color: "#f57f17" };
    if (s === "Em análise")          return { bg: "#e3f2fd", color: "#0d47a1" };
    return { bg: "#f5f5f5", color: "#555" };
}

const SITUATIONS = [
    { label: "Enviada ao MS",      icon: "📨" },
    { label: "Em análise",         icon: "🔄" },
    { label: "Em diligência",      icon: "⚠️" },
    { label: "Aprovada",           icon: "✅" },
    { label: "Portaria Publicada", icon: "📄" },
    { label: "Proposta concluída", icon: "✔️" },
    { label: "Rejeitada",          icon: "❌" },
    { label: "Enviada ao DRAC",    icon: "📤" },
];

const MIN_SCALE = 300;
const MAX_SCALE = 30000;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function norm(s: string): string {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function colorGreen(t: number): string {
    return `rgb(${Math.round(lerp(200, 27, t))},${Math.round(lerp(230, 94, t))},${Math.round(lerp(212, 59, t))})`;
}

// ─── Smooth projection hook ───────────────────────────────────────────────────
type ProjState = { center: [number, number]; scale: number };

function useSmoothProj(initCenter: [number, number], initScale: number) {
    const curRef  = useRef<ProjState>({ center: initCenter, scale: initScale });
    const fromRef = useRef<ProjState>({ center: initCenter, scale: initScale });
    const tgtRef  = useRef<ProjState>({ center: initCenter, scale: initScale });
    const rafRef  = useRef<number | null>(null);
    const t0Ref   = useRef(0);
    const [proj, setProj] = useState<ProjState>({ center: initCenter, scale: initScale });

    const moveTo = useCallback((center: [number, number], scale: number) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        fromRef.current = { ...curRef.current };
        tgtRef.current  = { center, scale };
        t0Ref.current   = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - t0Ref.current) / 700, 1);
            const e = easeInOutCubic(t);
            const next: ProjState = {
                center: [
                    lerp(fromRef.current.center[0], tgtRef.current.center[0], e),
                    lerp(fromRef.current.center[1], tgtRef.current.center[1], e),
                ],
                scale: lerp(fromRef.current.scale, tgtRef.current.scale, e),
            };
            curRef.current = next;
            setProj(next);
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    const setDirect = useCallback((center: [number, number], scale: number) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const next = { center, scale };
        curRef.current = next;
        tgtRef.current = next;
        setProj(next);
    }, []);

    return { proj, curRef, moveTo, setDirect };
}

// ─── Memoised geography layers ────────────────────────────────────────────────
interface StatesLayerProps {
    fillMap: Record<string, string>;
    onEnter:       (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => void;
    onMove:        (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => void;
    onLeave:       () => void;
    onClick:       (sigla: string) => void;
    onContextMenu: (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => void;
}
const StatesLayer = React.memo(function StatesLayer({
    fillMap, onEnter, onMove, onLeave, onClick, onContextMenu,
}: StatesLayerProps) {
    return (
        <Geographies geography={STATES_GEO}>
            {({ geographies }: { geographies: GeoFeature[] }) =>
                geographies.map((geo) => {
                    const sigla = (geo.properties.SIGLA ?? geo.properties.sigla ?? geo.properties.id ?? "") as string;
                    return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fillMap[sigla] ?? "#e8f0ec"}
                            stroke="#fff"
                            strokeWidth={0.6}
                            style={{
                                default: { outline: "none" },
                                hover:   { outline: "none", cursor: "pointer", fill: "#1b5e3b", opacity: 0.85 },
                                pressed: { outline: "none" },
                            }}
                            onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => onEnter(geo, e)}
                            onMouseMove={(e: React.MouseEvent<SVGPathElement>)  => onMove(geo, e)}
                            onMouseLeave={onLeave}
                            onClick={() => onClick(sigla)}
                            onContextMenu={(e: React.MouseEvent<SVGPathElement>) => onContextMenu(geo, e)}
                        />
                    );
                })
            }
        </Geographies>
    );
});

interface MunLayerProps {
    munGeo:        object;
    fillMap:       Record<string, string>;
    onEnter:       (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => void;
    onMove:        (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => void;
    onLeave:       () => void;
    onContextMenu: (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => void;
}
const MunLayer = React.memo(function MunLayer({
    munGeo, fillMap, onEnter, onMove, onLeave, onContextMenu,
}: MunLayerProps) {
    return (
        <Geographies geography={munGeo}>
            {({ geographies }: { geographies: GeoFeature[] }) =>
                geographies.map((geo) => {
                    const key = norm((geo.properties.name ?? geo.properties.nome ?? "") as string);
                    return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fillMap[key] ?? "#e8f0ec"}
                            stroke="#fff"
                            strokeWidth={0.3}
                            style={{
                                default: { outline: "none" },
                                hover:   { outline: "none", opacity: 0.8, cursor: "context-menu" },
                                pressed: { outline: "none" },
                            }}
                            onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => onEnter(geo, e)}
                            onMouseMove={(e: React.MouseEvent<SVGPathElement>)  => onMove(geo, e)}
                            onMouseLeave={onLeave}
                            onContextMenu={(e: React.MouseEvent<SVGPathElement>) => onContextMenu(geo, e)}
                        />
                    );
                })
            }
        </Geographies>
    );
});

// ─── Tooltip ──────────────────────────────────────────────────────────────────
interface TooltipData { x: number; y: number; name: string; count: number; uf?: string; }

// ─── Main component ───────────────────────────────────────────────────────────
export default function MapaComponent() {
    const router = useRouter();
    const [proposals,  setProposals]  = useState<SimpleProposal[]>([]);
    const [loading,    setLoading]    = useState(true);
    const [selectedUF, setSelectedUF] = useState<string | null>(null);
    const [munGeo,     setMunGeo]     = useState<object | null>(null);
    const [munLoading, setMunLoading] = useState(false);
    const [tooltip,    setTooltip]    = useState<TooltipData | null>(null);
    const [contextData, setContextData] = useState<ContextData | null>(null);

    // ── filters ───────────────────────────────────────────────────────────────
    const [situacoes, setSituacoes] = useState<string[]>([]);
    const [tecnicos,  setTecnicos]  = useState<string[]>([]);
    const [codigos,   setCodigos]   = useState<string[]>([]);
    const [habSearch, setHabSearch] = useState("");
    const [openCats,    setOpenCats]    = useState<Set<string>>(new Set());
    const [openSections, setOpenSections] = useState<Set<string>>(new Set(["situacao", "tecnico", "habs"]));
    const toggleSection = useCallback((s: string) => {
        setOpenSections((p) => { const n = new Set(p); n.has(s) ? n.delete(s) : n.add(s); return n; });
    }, []);

    const toggleSituacao = useCallback((label: string) => {
        setSituacoes((p) => p.includes(label) ? p.filter((s) => s !== label) : [...p, label]);
    }, []);
    const toggleTecnico = useCallback((t: string) => {
        setTecnicos((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
    }, []);
    const toggleCodigo = useCallback((c: string) => {
        setCodigos((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
    }, []);
    const toggleCat = useCallback((cat: string) => {
        setOpenCats((p) => { const n = new Set(p); n.has(cat) ? n.delete(cat) : n.add(cat); return n; });
    }, []);

    const { proj, curRef, moveTo, setDirect } = useSmoothProj([-54, -15], 750);
    const mapAreaRef = useRef<HTMLDivElement>(null);

    // ── fetch ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        proposalService.getSimpleProposal().then((r) => {
            if (r.status) setProposals(r.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!selectedUF) { setMunGeo(null); return; }
        const cfg = STATE_CFG[selectedUF];
        if (!cfg) return;
        setMunLoading(true);
        fetch(MUN_GEO(cfg.ibge))
            .then((r) => r.json())
            .then((data: object) => { setMunGeo(data); setMunLoading(false); })
            .catch(() => setMunLoading(false));
    }, [selectedUF]);

    // ── close modal on Escape ─────────────────────────────────────────────────
    useEffect(() => {
        if (!contextData) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setContextData(null); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [contextData]);

    // ── scroll wheel zoom ─────────────────────────────────────────────────────
    useEffect(() => {
        const el = mapAreaRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
            const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, curRef.current.scale * factor));
            setDirect(curRef.current.center, newScale);
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [setDirect, curRef]);

    // ── zoom buttons ──────────────────────────────────────────────────────────
    const zoomIn  = useCallback(() =>
        moveTo(curRef.current.center, Math.min(MAX_SCALE, curRef.current.scale * 1.5)), [moveTo, curRef]);
    const zoomOut = useCallback(() =>
        moveTo(curRef.current.center, Math.max(MIN_SCALE, curRef.current.scale / 1.5)), [moveTo, curRef]);

    // ── tipos de habilitação ──────────────────────────────────────────────────
    const tiposGrouped = useMemo(() => {
        const map = new Map<string, { codigo: string; descricao: string }[]>();
        proposals.forEach((p) => {
            p.tipohabilitacao.forEach((t) => {
                const cat = (t.categoria && t.categoria.trim()) ? t.categoria.trim() : t.descricao;
                if (!map.has(cat)) map.set(cat, []);
                const arr = map.get(cat)!;
                if (!arr.find((x) => x.codigo === t.codigo))
                    arr.push({ codigo: t.codigo, descricao: t.descricao });
            });
        });
        map.forEach((arr) => arr.sort((a, b) => a.codigo.localeCompare(b.codigo)));
        return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
    }, [proposals]);

    const countByCodigo = useMemo(() => {
        const m: Record<string, number> = {};
        proposals.forEach((p) =>
            p.tipohabilitacao.forEach((t) => { m[t.codigo] = (m[t.codigo] ?? 0) + 1; })
        );
        return m;
    }, [proposals]);

    // ── filtered proposals ────────────────────────────────────────────────────
    const filtered = useMemo(() => proposals.filter((p) => {
        const okSit = situacoes.length === 0 || situacoes.includes(p.situacao);
        const okTec = tecnicos.length  === 0 || tecnicos.includes(p.tecnico);
        const okHab = codigos.length   === 0 || p.tipohabilitacao.some((h) => codigos.includes(h.codigo));
        return okSit && okTec && okHab;
    }), [proposals, situacoes, tecnicos, codigos]);

    const countByUF = useMemo(() => {
        const m: Record<string, number> = {};
        filtered.forEach((p) => { const s = ufToSigla(p.uf_estabelecimento); m[s] = (m[s] ?? 0) + 1; });
        return m;
    }, [filtered]);

    const countByMun = useMemo(() => {
        if (!selectedUF) return {} as Record<string, number>;
        const m: Record<string, number> = {};
        filtered
            .filter((p) => ufToSigla(p.uf_estabelecimento) === selectedUF)
            .forEach((p) => { const k = norm(p.municipio); m[k] = (m[k] ?? 0) + 1; });
        return m;
    }, [filtered, selectedUF]);

    const maxUF  = useMemo(() => Math.max(1, ...Object.values(countByUF)),  [countByUF]);
    const maxMun = useMemo(() => Math.max(1, ...Object.values(countByMun)), [countByMun]);

    const stateFillMap = useMemo(() => {
        const m: Record<string, string> = {};
        Object.entries(countByUF).forEach(([s, c]) => { m[s] = colorGreen(c / maxUF); });
        return m;
    }, [countByUF, maxUF]);

    const munFillMap = useMemo(() => {
        const m: Record<string, string> = {};
        Object.entries(countByMun).forEach(([k, c]) => { m[k] = colorGreen(c / maxMun); });
        return m;
    }, [countByMun, maxMun]);

    const technicians = useMemo(() =>
        [...new Set(proposals.map((p) => p.tecnico).filter(Boolean))].sort(), [proposals]);

    const habSearchNorm = norm(habSearch);
    const tiposFiltrados = useMemo(() =>
        tiposGrouped
            .map(({ 0: cat, 1: items }) => ({
                cat,
                items: habSearchNorm
                    ? items.filter((i) => norm(i.codigo + " " + i.descricao).includes(habSearchNorm))
                    : items,
            }))
            .filter(({ items }) => items.length > 0),
    [tiposGrouped, habSearchNorm]);

    // ── handlers ──────────────────────────────────────────────────────────────
    const handleStateClick = useCallback((sigla: string) => {
        const cfg = STATE_CFG[sigla];
        if (!cfg) return;
        setSelectedUF(sigla);
        moveTo(cfg.center, cfg.scale);
    }, [moveTo]);

    const handleBack = useCallback(() => {
        setSelectedUF(null);
        setMunGeo(null);
        moveTo([-54, -15], 750);
    }, [moveTo]);

    const totalFiltered = selectedUF
        ? filtered.filter((p) => ufToSigla(p.uf_estabelecimento) === selectedUF).length
        : filtered.length;

    // ── right-click handlers ──────────────────────────────────────────────────
    const onStateContextMenu = useCallback(
        (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => {
            e.preventDefault();
            const sigla = (geo.properties.SIGLA ?? geo.properties.sigla ?? geo.properties.id ?? "") as string;
            const nome  = (geo.properties.NOME  ?? geo.properties.nome  ?? sigla) as string;
            const stateProposals = filtered.filter((p) => ufToSigla(p.uf_estabelecimento) === sigla);
            setContextData({ name: `${nome} (${sigla})`, proposals: stateProposals });
        },
        [filtered],
    );

    const onMunContextMenu = useCallback(
        (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => {
            e.preventDefault();
            const munName = (geo.properties.name ?? geo.properties.nome ?? "") as string;
            const munProposals = filtered.filter(
                (p) => ufToSigla(p.uf_estabelecimento) === selectedUF && norm(p.municipio) === norm(munName)
            );
            setContextData({ name: munName, proposals: munProposals });
        },
        [filtered, selectedUF],
    );

    // ── tooltip handlers ──────────────────────────────────────────────────────
    const onStateEnter = useCallback(
        (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => {
            const sigla = (geo.properties.SIGLA ?? geo.properties.sigla ?? geo.properties.id ?? "") as string;
            const nome  = (geo.properties.NOME  ?? geo.properties.nome  ?? sigla) as string;
            setTooltip({ x: e.clientX, y: e.clientY, name: nome, count: countByUF[sigla] ?? 0, uf: sigla });
        }, [countByUF]);

    const onStateMove = useCallback((_geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => {
        setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }, []);

    const onMunEnter = useCallback(
        (geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => {
            const munName = (geo.properties.name ?? geo.properties.nome ?? "") as string;
            setTooltip({ x: e.clientX, y: e.clientY, name: munName, count: countByMun[norm(munName)] ?? 0 });
        }, [countByMun]);

    const onMunMove = useCallback((_geo: GeoFeature, e: React.MouseEvent<SVGPathElement>) => {
        setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }, []);

    const clearTooltip = useCallback(() => setTooltip(null), []);

    return (
        <Wrapper>
            {/* ── Sidebar ── */}
            <Sidebar>
                <SidebarTitle>Filtros</SidebarTitle>

                <SidebarSection>
                    <SidebarSectionHeader onClick={() => toggleSection("situacao")}>
                        <SidebarLabel style={{ margin: 0, padding: 0 }}>Situação</SidebarLabel>
                        <SidebarSectionChevron $open={openSections.has("situacao")}>›</SidebarSectionChevron>
                    </SidebarSectionHeader>
                    {openSections.has("situacao") && <>
                    <FilterItem $active={situacoes.length === 0} onClick={() => setSituacoes([])}>
                        <span>📋 Todas</span>
                        <FilterCount>{proposals.length}</FilterCount>
                    </FilterItem>
                    {SITUATIONS.map(({ label, icon }) => (
                        <FilterItem key={label} $active={situacoes.includes(label)} onClick={() => toggleSituacao(label)}>
                            <span>{icon} {label}</span>
                            <FilterCount>{proposals.filter((p) => p.situacao === label).length}</FilterCount>
                        </FilterItem>
                    ))}
                    </>}
                </SidebarSection>

                <SidebarSection>
                    <SidebarSectionHeader onClick={() => toggleSection("tecnico")}>
                        <SidebarLabel style={{ margin: 0, padding: 0 }}>Técnico</SidebarLabel>
                        <SidebarSectionChevron $open={openSections.has("tecnico")}>›</SidebarSectionChevron>
                    </SidebarSectionHeader>
                    {openSections.has("tecnico") && <>
                    <FilterItem $active={tecnicos.length === 0} onClick={() => setTecnicos([])}>
                        <span>👥 Todos</span>
                    </FilterItem>
                    {technicians.map((t) => (
                        <FilterItem key={t} $active={tecnicos.includes(t)} onClick={() => toggleTecnico(t)}>
                            <span>👤 {t}</span>
                        </FilterItem>
                    ))}
                    </>}
                </SidebarSection>

                <SidebarSection>
                    <SidebarSectionHeader onClick={() => toggleSection("habs")}>
                        <SidebarLabel style={{ margin: 0, padding: 0 }}>Tipo de Habilitação</SidebarLabel>
                        <SidebarSectionChevron $open={openSections.has("habs")}>›</SidebarSectionChevron>
                    </SidebarSectionHeader>
                    {openSections.has("habs") && <>
                    <FilterItem $active={codigos.length === 0} onClick={() => setCodigos([])}>
                        <span>🏷️ Todos</span>
                        <FilterCount>{proposals.length}</FilterCount>
                    </FilterItem>
                    <FilterSearch
                        placeholder="Buscar código ou descrição…"
                        value={habSearch}
                        onChange={(e) => setHabSearch(e.target.value)}
                    />
                    {tiposFiltrados.map(({ cat, items }) => (
                        <React.Fragment key={cat}>
                            <FilterGroupHeader onClick={() => toggleCat(cat)}>
                                {cat}
                                <FilterGroupChevron $open={openCats.has(cat)}>›</FilterGroupChevron>
                            </FilterGroupHeader>
                            {(openCats.has(cat) || habSearchNorm !== "") && items.map(({ codigo, descricao }) => (
                                <FilterItem
                                    key={codigo}
                                    $active={codigos.includes(codigo)}
                                    onClick={() => toggleCodigo(codigo)}
                                    style={{ paddingLeft: 24, fontSize: "0.75rem" }}
                                >
                                    <span title={descricao}>
                                        <b>{codigo}</b> {descricao.length > 28 ? descricao.slice(0, 28) + "…" : descricao}
                                    </span>
                                    <FilterCount>{countByCodigo[codigo] ?? 0}</FilterCount>
                                </FilterItem>
                            ))}
                        </React.Fragment>
                    ))}
                    </>}
                </SidebarSection>
            </Sidebar>

            {/* ── Main ── */}
            <Main>
                <TopBar>
                    {selectedUF && <BackButton onClick={handleBack}>← Brasil</BackButton>}
                    <PageTitle>
                        {selectedUF ? `${selectedUF} — Municípios` : "Mapa de Habilitações"}
                    </PageTitle>
                    <KpiChip $bg="#e8f5e9" $color="#1b5e3b">🏥 {totalFiltered} habilitações</KpiChip>
                    {selectedUF && <KpiChip $bg="#e3f2fd" $color="#1565c0">📍 {selectedUF}</KpiChip>}
                    {situacoes.length > 0 && (
                        <KpiChip $bg="#fff3e0" $color="#e65100">
                            {situacoes.length === 1 ? situacoes[0] : `${situacoes.length} situações`}
                        </KpiChip>
                    )}
                    {tecnicos.length > 0 && (
                        <KpiChip $bg="#f3e5f5" $color="#6a1b9a">
                            {tecnicos.length === 1 ? tecnicos[0] : `${tecnicos.length} técnicos`}
                        </KpiChip>
                    )}
                    {codigos.length > 0 && (
                        <KpiChip $bg="#e8eaf6" $color="#283593">
                            {codigos.length === 1 ? codigos[0] : `${codigos.length} tipos`}
                        </KpiChip>
                    )}
                </TopBar>

                <MapArea ref={mapAreaRef}>
                    {(loading || munLoading) && (
                        <LoadingOverlay>
                            ⏳ {munLoading ? "Carregando municípios…" : "Carregando dados…"}
                        </LoadingOverlay>
                    )}

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ center: proj.center, scale: proj.scale }}
                        width={960}
                        height={600}
                        style={{ width: "100%", height: "100%" }}
                    >
                        {!selectedUF && (
                            <StatesLayer
                                fillMap={stateFillMap}
                                onEnter={onStateEnter}
                                onMove={onStateMove}
                                onLeave={clearTooltip}
                                onClick={handleStateClick}
                                onContextMenu={onStateContextMenu}
                            />
                        )}
                        {selectedUF && munGeo && (
                            <MunLayer
                                munGeo={munGeo}
                                fillMap={munFillMap}
                                onEnter={onMunEnter}
                                onMove={onMunMove}
                                onLeave={clearTooltip}
                                onContextMenu={onMunContextMenu}
                            />
                        )}
                    </ComposableMap>

                    <ZoomControls>
                        <ZoomButton onClick={zoomIn}  title="Aproximar">+</ZoomButton>
                        <ZoomButton onClick={zoomOut} title="Afastar">−</ZoomButton>
                    </ZoomControls>

                    <LegendBar>
                        <span>Habilitações</span>
                        <LegendGradient />
                        <LegendEnds>
                            <span>0</span>
                            <span>{selectedUF ? maxMun : maxUF}</span>
                        </LegendEnds>
                    </LegendBar>
                </MapArea>
            </Main>

            {/* Floating tooltip */}
            {tooltip && !contextData && (
                <Tooltip style={{ left: tooltip.x + 14, top: tooltip.y - 70 }}>
                    <TooltipTitle>{tooltip.name}{tooltip.uf ? ` (${tooltip.uf})` : ""}</TooltipTitle>
                    <TooltipRow>
                        Habilitações <TooltipValue>{tooltip.count}</TooltipValue>
                    </TooltipRow>
                    {tooltip.uf && (
                        <TooltipRow style={{ marginTop: 2, fontSize: "0.7rem", fontStyle: "italic" }}>
                            {tooltip.count > 0
                                ? "Clique para ver municípios · Botão direito para listar"
                                : "Sem registros — clique para detalhar"}
                        </TooltipRow>
                    )}
                </Tooltip>
            )}

            {/* Right-click modal */}
            {contextData && (
                <ModalOverlay onClick={() => setContextData(null)}>
                    <ModalCard onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitleBlock>
                                <ModalTitle>🏥 {contextData.name}</ModalTitle>
                                <ModalSubtitle>
                                    {contextData.proposals.length === 0
                                        ? "Nenhuma habilitação encontrada"
                                        : `${contextData.proposals.length} habilitaç${contextData.proposals.length === 1 ? "ão" : "ões"} encontrada${contextData.proposals.length === 1 ? "" : "s"}`}
                                </ModalSubtitle>
                            </ModalTitleBlock>
                            <ModalClose onClick={() => setContextData(null)}>✕</ModalClose>
                        </ModalHeader>

                        <ModalList>
                            {contextData.proposals.length === 0 ? (
                                <ModalEmpty>Nenhuma habilitação corresponde aos filtros ativos.</ModalEmpty>
                            ) : (
                                contextData.proposals.map((p) => {
                                    const { bg, color } = situacaoStyle(p.situacao);
                                    const isAtivo = p.situacao === "Proposta concluída";
                                    return (
                                        <ModalItem key={p.id_habilitacao}>
                                            <ModalItemInfo>
                                                <ModalItemName title={p.nome_estabelecimento}>
                                                    {p.nome_estabelecimento}
                                                </ModalItemName>
                                                <ModalItemMeta>
                                                    {p.tipohabilitacao.map((h) => h.codigo).join(" · ")}
                                                    {" · CNES "}{p.cnes_estabelecimento}
                                                </ModalItemMeta>
                                            </ModalItemInfo>
                                            <ModalBadge $bg={bg} $color={color}>
                                                {isAtivo ? "✔ Ativo" : p.situacao}
                                            </ModalBadge>
                                            <ModalBtn onClick={() => window.open(getRoute(p), "_blank")}>
                                                Ver
                                            </ModalBtn>
                                        </ModalItem>
                                    );
                                })
                            )}
                        </ModalList>
                    </ModalCard>
                </ModalOverlay>
            )}
        </Wrapper>
    );
}
