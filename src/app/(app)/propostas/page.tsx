"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTechnicians } from "@/hooks/useTechnicians";

const V = {
  verde: "#1B5E3B", verdeMed: "#2E7D52", verdeCla: "#3DA06A", verdeBg: "#EAF4EF",
  amarelo: "#FFCD00", amarBg: "#FFF9E0", azul: "#1565C0", azulCla: "#E3EEFF",
  laranja: "#E65100", larBg: "#FFF3E0", roxo: "#6A1B9A", roxoBg: "#F3E5F5",
  cinzaF: "#F4F6F4", cinzaB: "#E4EBE6", cinzaT: "#6B7B6E", texto: "#1A2E20",
};

// ── Dados mock ──────────────────────────────────────────────────────────────────
const PROPOSTAS = [
  { id:1, cnes:"2058790", nome:"Hospital Municipal Dr. Waldemar Tebaldi", uf:"SP", cod:"17.06", hab:"UNACON", situacao:"Em análise", tecnico:"Tayana Pinheiro", tecnicoId:1, entrada:"03/03/2025" },
  { id:2, cnes:"2023709", nome:"Santa Casa de Misericórdia de Itatiba", uf:"SP", cod:"17.06", hab:"UNACON", situacao:"Em análise", tecnico:"Thaynara Souza", tecnicoId:2, entrada:"14/03/2025" },
  { id:3, cnes:"5860490", nome:"Hospital Universitário de Marília", uf:"SP", cod:"17.06", hab:"UNACON", situacao:"Em diligência", tecnico:"Tatiana Cardoso", tecnicoId:3, entrada:"20/01/2025", diligencias:["Deliberação CIB","Relatório de vistoria realizada pela Vigilância Sanitária"] },
  { id:4, cnes:"9255400", nome:"Clínica Irradiar – Palmas", uf:"TO", cod:"17.15", hab:"Serv. Radioterapia", situacao:"Em análise", tecnico:"Thaynara Souza", tecnicoId:2, entrada:"01/04/2025" },
];

const PROPOSTAS_DRAC = [
  { id:5, cnes:"2784602", nome:"Hospital Augusto de Oliveira Camargo", uf:"SP", cod:"17.06", hab:"UNACON", situacao:"Enviada ao DRAC", tecnico:"Tayana Pinheiro", tecnicoId:1, envioDrac:"10/02/2025", financeiro:"R$ 3.241.080" },
  { id:6, cnes:"7400926", nome:"Fundação Hospital Regional do Câncer", uf:"SP", cod:"17.07", hab:"UNACON c/ Radioterapia", situacao:"Enviada ao DRAC", tecnico:"Tayana Pinheiro", tecnicoId:1, envioDrac:"05/03/2025", financeiro:"R$ 5.469.793" },
];

const DILIGENTES = [
  { id:3, cnes:"5860490", nome:"Hospital Universitário de Marília", uf:"SP", municipio:"Marília", cod:["17.06"], hab:["UNACON"] },
  { id:7, cnes:"7400926", nome:"Fundação Hospital Regional do Câncer", uf:"SP", municipio:"Presidente Prudente", cod:["17.06","17.07"], hab:["UNACON","UNACON c/ Radioterapia"] },
];

const COUNTS = { "Em análise": 9, "Enviada ao DRAC": 7, "Em diligência": 4, "Aprovada": 5, "Portaria Publicada": 3 };
const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  "Em análise":         { bg: V.amarBg,  color: "#7A5500" },
  "Em diligência":      { bg: V.larBg,   color: V.laranja },
  "Enviada ao DRAC":    { bg: V.azulCla, color: V.azul },
  "Aprovada":           { bg: V.verdeBg, color: V.verde },
  "Portaria Publicada": { bg: V.roxoBg,  color: V.roxo },
  "No DRAC":            { bg: V.azulCla, color: V.azul },
};

function Badge({ label }: { label: string }) {
  const c = BADGE_COLORS[label] ?? { bg: V.cinzaF, color: V.cinzaT };
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
      fontFamily: "'IBM Plex Mono',monospace", background: c.bg, color: c.color,
    }}>{label === "Enviada ao DRAC" ? "No DRAC" : label}</span>
  );
}

function SidebarItem({ icon, label, active, count, countColor, onClick }: {
  icon: string; label: string; active: boolean; count?: number;
  countColor?: { bg: string; color: string }; onClick: () => void;
}) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
      borderRadius: 8, fontSize: 13, fontWeight: active ? 600 : 500,
      color: active ? V.verde : V.cinzaT,
      background: active ? V.verdeBg : "transparent",
      cursor: "pointer", marginBottom: 2, transition: "all .15s",
    }}>
      <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {count !== undefined && (
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
          fontFamily: "'IBM Plex Mono',monospace",
          background: countColor?.bg ?? V.cinzaF, color: countColor?.color ?? V.cinzaT,
        }}>{count}</span>
      )}
    </div>
  );
}

export default function PropostasPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { technicians } = useTechnicians();
  const [sitFilter, setSitFilter] = useState("Todas");
  const [tecFilter, setTecFilter] = useState("Todos");
  const [tab, setTab] = useState<"lista" | "notas">("lista");

  // Nota generator state
  const [notaUF, setNotaUF] = useState("");
  const [notaMun, setNotaMun] = useState("");
  const [notaBusca, setNotaBusca] = useState("");
  const [notaSel, setNotaSel] = useState<typeof DILIGENTES[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const initials = user ? `${user.nome[0]}${user.sobrenome[0]}` : "TP";
  const userName = user ? `${user.nome} ${user.sobrenome}` : "Tayana Pinheiro";
  const userRole = user?.perfil === "gestor" ? "Gestor · DECAN" : "Técnico · DECAN";

  const propFiltered = useMemo(() => PROPOSTAS.filter((p) => {
    if (sitFilter !== "Todas" && p.situacao !== sitFilter) return false;
    if (tecFilter !== "Todos" && p.tecnico !== tecFilter) return false;
    return true;
  }), [sitFilter, tecFilter]);

  const dracFiltered = useMemo(() => PROPOSTAS_DRAC.filter((p) => {
    if (tecFilter !== "Todos" && p.tecnico !== tecFilter) return false;
    return true;
  }), [tecFilter]);

  const notaFiltered = DILIGENTES.filter((d) => {
    if (notaUF && d.uf !== notaUF) return false;
    if (notaBusca) {
      const q = notaBusca.toLowerCase();
      if (!d.nome.toLowerCase().includes(q) && !d.cnes.includes(q) && !d.municipio.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const buildNota = (d: typeof DILIGENTES[0]) => {
    const habStr = d.hab.join(" e ");
    const codStr = d.cod.join(" e ");
    const pl = d.cod.length > 1 ? "s" : "";
    return `Em consulta ao Sistema de Apoio à Implementação de Políticas em Saúde (SAIPS), foi identificada a proposta referente à solicitação de habilitação na alta complexidade em oncologia como ${habStr} (código${pl} ${codStr}), do ${d.nome}, a qual se encontra em diligência.`;
  };

  const handleCopy = () => {
    if (!notaSel) return;
    navigator.clipboard.writeText(buildNota(notaSel));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tecnicoList = ["Tayana Pinheiro","Thaynara Souza","Tatiana Cardoso"];

  const th: React.CSSProperties = {
    textAlign: "left", padding: "10px 22px", fontSize: 11, fontWeight: 600,
    color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".07em",
    background: V.cinzaF, borderBottom: `1px solid ${V.cinzaB}`,
  };
  const td: React.CSSProperties = { padding: "13px 22px", fontSize: 13, borderBottom: `1px solid ${V.cinzaF}`, verticalAlign: "middle" };

  return (
    <>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Sora',sans-serif" }}>

        {/* ── Topbar ── */}
        <nav style={{
          background: V.verde, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 28px", height: 56,
          flexShrink: 0, position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: V.amarelo, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 700, color: V.verde }}>MS</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>SAH · Propostas SAIPS</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", letterSpacing: ".05em", textTransform: "uppercase" }}>Acompanhamento de Habilitações</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#fff" }}>{initials}</div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>{userName}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".06em" }}>{userRole}</div>
              </div>
            </div>
            <button className="btn-logout-h" onClick={() => { logout(); router.push("/login"); }}
              style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.7)", fontFamily: "'Sora',sans-serif", fontSize: 11, padding: "5px 12px", borderRadius: 6, cursor: "pointer", transition: "all .2s" }}>
              Sair
            </button>
          </div>
        </nav>

        {/* ── Layout ── */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>

          {/* Sidebar */}
          <div style={{ width: 220, flexShrink: 0, background: "#fff", borderRight: `1px solid ${V.cinzaB}`, display: "flex", flexDirection: "column", padding: "20px 0", position: "sticky", top: 56, height: "calc(100vh - 56px)", overflowY: "auto" }}>
            {/* Situação */}
            <div style={{ padding: "0 12px", marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".1em", padding: "0 8px", marginBottom: 6 }}>Situação</div>
              <SidebarItem icon="📋" label="Todas" active={sitFilter==="Todas"} onClick={()=>setSitFilter("Todas")} />
              <SidebarItem icon="🔄" label="Em análise" active={sitFilter==="Em análise"} count={COUNTS["Em análise"]} countColor={{ bg:V.amarBg, color:"#7A5500" }} onClick={()=>setSitFilter("Em análise")} />
              <SidebarItem icon="📤" label="Enviada ao DRAC" active={sitFilter==="Enviada ao DRAC"} count={COUNTS["Enviada ao DRAC"]} countColor={{ bg:V.azulCla, color:V.azul }} onClick={()=>setSitFilter("Enviada ao DRAC")} />
              <SidebarItem icon="⚠️" label="Em diligência" active={sitFilter==="Em diligência"} count={COUNTS["Em diligência"]} countColor={{ bg:V.larBg, color:V.laranja }} onClick={()=>setSitFilter("Em diligência")} />
              <SidebarItem icon="✅" label="Aprovadas" active={sitFilter==="Aprovada"} count={COUNTS["Aprovada"]} countColor={{ bg:V.verdeBg, color:V.verde }} onClick={()=>setSitFilter("Aprovada")} />
              <SidebarItem icon="📰" label="Portaria Publicada" active={sitFilter==="Portaria Publicada"} count={COUNTS["Portaria Publicada"]} countColor={{ bg:V.roxoBg, color:V.roxo }} onClick={()=>setSitFilter("Portaria Publicada")} />
            </div>
            {/* Técnico */}
            <div style={{ padding: "0 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".1em", padding: "0 8px", marginBottom: 6 }}>Técnico</div>
              <SidebarItem icon="👥" label="Todos" active={tecFilter==="Todos"} onClick={()=>setTecFilter("Todos")} />
              {tecnicoList.map((t) => (
                <SidebarItem key={t} icon="👤" label={t} active={tecFilter===t} onClick={()=>setTecFilter(t)} />
              ))}
            </div>
          </div>

          {/* Main */}
          <div style={{ flex: 1, padding: "32px 36px", background: V.cinzaF }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.01em" }}>Propostas SAIPS</div>
                <div style={{ fontSize: 13, color: V.cinzaT, marginTop: 3 }}>28 propostas em andamento · 2025</div>
              </div>
              <button className="btn-primary-h" onClick={() => router.push("/propostas/cadastro")}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: V.verde, color: "#fff", fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}>
                + Cadastrar nova proposta
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${V.cinzaB}`, marginBottom: 24 }}>
              {(["lista","notas"] as const).map((t) => (
                <div key={t} className="prop-tab-h" onClick={() => setTab(t)}
                  style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s",
                    color: tab===t ? V.verde : V.cinzaT,
                    borderBottom: `2px solid ${tab===t ? V.verde : "transparent"}`,
                    marginBottom: -2,
                  }}>
                  {t === "lista" ? "📋 Lista de Propostas" : "📝 Gerador de Notas"}
                </div>
              ))}
            </div>

            {/* ── Tab Lista ── */}
            {tab === "lista" && (
              <>
                {/* KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
                  {[
                    { label:"Em Análise", num:9, delta:"3 aguardando +30 dias", deltaType:"warn", icon:"🔄", accent:V.amarelo },
                    { label:"No DRAC", num:7, delta:"aguardando retorno", deltaType:"neu", icon:"📤", accent:V.azul },
                    { label:"Em Diligência", num:4, delta:"prazo próximo do venc.", deltaType:"warn", icon:"⚠️", accent:V.laranja },
                    { label:"Aprovadas 2025", num:8, delta:"↑ 2 vs. mesmo período", deltaType:"up", icon:"✅", accent:V.verdeCla },
                  ].map((k) => (
                    <div key={k.label} style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", border: `1px solid ${V.cinzaB}`, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: k.accent }} />
                      <div style={{ position: "absolute", top: 16, right: 18, fontSize: 28, opacity: .12 }}>{k.icon}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>{k.label}</div>
                      <div style={{ fontSize: 36, fontWeight: 700, color: V.texto, fontFamily: "'IBM Plex Mono',monospace", lineHeight: 1, marginBottom: 4 }}>{k.num}</div>
                      <div style={{ fontSize: 11, color: k.deltaType==="up" ? V.verdeMed : k.deltaType==="warn" ? V.laranja : V.cinzaT }}>{k.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Tabela Em análise / Em diligência */}
                <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${V.cinzaB}`, marginBottom: 24, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${V.cinzaB}` }}>
                    <div style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                      Em análise / Em diligência
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, fontFamily: "'IBM Plex Mono',monospace", background: V.amarBg, color: "#7A5500" }}>
                        {propFiltered.length} propostas
                      </span>
                    </div>
                    <button className="btn-sm-h" style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, cursor: "pointer", transition: "all .2s", border: `1px solid ${V.cinzaB}`, background: V.cinzaF, color: V.cinzaT }}>
                      Ver todas
                    </button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Estabelecimento","UF","Habilitação solicitada","Situação","Técnico","Entrada",""].map((h) => (
                          <th key={h} style={th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {propFiltered.map((p) => (
                        <tr key={p.id} className="prop-tr">
                          <td style={td}>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.nome}</div>
                            <div style={{ fontSize: 11, color: V.cinzaT, fontFamily: "'IBM Plex Mono',monospace" }}>CNES {p.cnes}</div>
                          </td>
                          <td style={td}>{p.uf}</td>
                          <td style={td}><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>{p.cod}</span> {p.hab}</td>
                          <td style={td}><Badge label={p.situacao} /></td>
                          <td style={td}>{p.tecnico.split(" ")[0].toLowerCase()}.{p.tecnico.split(" ").slice(1).join("").toLowerCase()}</td>
                          <td style={td}>{p.entrada}</td>
                          <td style={td}>
                            <button className="btn-edit" onClick={() => router.push(`/propostas/cadastro?id=${p.id}`)}
                              style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, cursor: "pointer", transition: "all .2s", border: `1px solid ${V.azul}`, background: V.azulCla, color: V.azul }}>
                              ✏️ Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tabela DRAC */}
                <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${V.cinzaB}`, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${V.cinzaB}` }}>
                    <div style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                      Enviadas ao DRAC
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, fontFamily: "'IBM Plex Mono',monospace", background: V.azulCla, color: V.azul }}>
                        {dracFiltered.length} propostas
                      </span>
                    </div>
                    <button className="btn-sm-h" style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, cursor: "pointer", transition: "all .2s", border: `1px solid ${V.cinzaB}`, background: V.cinzaF, color: V.cinzaT }}>
                      Ver todas
                    </button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Estabelecimento","UF","Habilitação solicitada","Envio ao DRAC","Financeiro anual","Situação",""].map((h) => (
                          <th key={h} style={th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dracFiltered.map((p) => (
                        <tr key={p.id} className="prop-tr">
                          <td style={td}>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.nome}</div>
                            <div style={{ fontSize: 11, color: V.cinzaT, fontFamily: "'IBM Plex Mono',monospace" }}>CNES {p.cnes}</div>
                          </td>
                          <td style={td}>{p.uf}</td>
                          <td style={td}><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>{p.cod}</span> {p.hab}</td>
                          <td style={td}>{p.envioDrac}</td>
                          <td style={{ ...td, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{p.financeiro}</td>
                          <td style={td}><Badge label={p.situacao} /></td>
                          <td style={td}>
                            <button className="btn-edit" onClick={() => router.push(`/propostas/cadastro?id=${p.id}`)}
                              style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, cursor: "pointer", transition: "all .2s", border: `1px solid ${V.azul}`, background: V.azulCla, color: V.azul }}>
                              ✏️ Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ── Tab Notas ── */}
            {tab === "notas" && (
              <div>
                {/* Gerador */}
                <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${V.cinzaB}`, padding: "28px 32px", marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2, display: "flex", alignItems: "center", gap: 8 }}>
                    ⚠️ Gerador de Notas — Proposta em Diligência
                  </div>
                  <div style={{ fontSize: 12, color: V.cinzaT, marginBottom: 22, paddingLeft: 2 }}>
                    Apenas propostas SAIPS <strong>em diligência</strong> (sem habilitação concluída). Filtre por estado, município ou busque pelo CNES/nome, selecione o estabelecimento e exporte a nota para Word.
                  </div>

                  {/* Filtros */}
                  <div style={{ display: "grid", gridTemplateColumns: "160px 200px 1fr", gap: 14, marginBottom: 18, alignItems: "end" }}>
                    {[
                      { label: "🗺️ Estado (UF)", type: "select", options: ["","AM","BA","CE","DF","GO","MG","PA","PB","PE","PR","RJ","RS","SC","SP","TO"], val: notaUF, set: setNotaUF },
                      { label: "📍 Município", type: "select", options: ["","Marília","Presidente Prudente"], val: notaMun, set: setNotaMun },
                    ].map((f) => (
                      <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".07em" }}>{f.label}</label>
                        <select className="inp-focus" value={f.val} onChange={(e) => f.set(e.target.value)}
                          style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, color: V.texto, background: V.cinzaF, border: `1.5px solid ${V.cinzaB}`, borderRadius: 8, padding: "8px 12px", outline: "none", cursor: "pointer" }}>
                          {f.options.map((o) => <option key={o} value={o}>{o || "Todos"}</option>)}
                        </select>
                      </div>
                    ))}
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".07em" }}>🔍 Busca (CNES, nome...)</label>
                      <input className="inp-focus" type="text" value={notaBusca} onChange={(e) => setNotaBusca(e.target.value)}
                        placeholder="Ex: 218623 · Fundação Hospital · Prudente"
                        style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: V.texto, background: V.cinzaF, border: `1.5px solid ${V.cinzaB}`, borderRadius: 8, padding: "9px 13px", outline: "none", width: "100%", transition: "border-color .2s,box-shadow .2s" }} />
                    </div>
                  </div>

                  {/* Lista diligentes */}
                  <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
                    Propostas em diligência · {notaFiltered.length}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 260, overflowY: "auto" }}>
                    {notaFiltered.map((d) => (
                      <div key={d.id} className="nota-item-h" onClick={() => setNotaSel(d)}
                        style={{ padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${notaSel?.id===d.id ? V.verdeMed : V.cinzaB}`, background: notaSel?.id===d.id ? V.verdeBg : "#fff", cursor: "pointer", transition: "all .15s" }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{d.nome}</div>
                        <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
                          <span style={{ fontSize: 11, color: V.cinzaT }}>CNES {d.cnes}</span>
                          <span style={{ fontSize: 11, color: V.cinzaT }}>📍 {d.uf}</span>
                          <span style={{ fontSize: 11, color: V.cinzaT }}>🏥 {d.hab.join(", ")}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Nota gerada */}
                  {notaSel && (
                    <div style={{ borderTop: `1.5px solid ${V.cinzaB}`, paddingTop: 20, marginTop: 4 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>
                        ⚠️ Nota gerada — proposta em diligência
                      </div>
                      <div style={{ background: "#fff", border: `1.5px solid ${V.cinzaB}`, borderRadius: 10, padding: "20px 24px", fontSize: 13, lineHeight: 1.8, color: V.texto }}>
                        {buildNota(notaSel)}
                      </div>
                      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                        <button className="btn-copiar-h" onClick={handleCopy}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: V.verdeBg, color: V.verde, fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, border: `1.5px solid ${V.verdeCla}`, borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
                          {copied ? "✅ Copiado!" : "📋 Copiar texto"}
                        </button>
                        <button className="btn-copiar-h"
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#1a5276", color: "#fff", fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, border: "1.5px solid #1a5276", borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
                          📄 Exportar Word (.docx)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modelo de exemplo */}
                <div style={{ background: V.larBg, border: "1.5px dashed #FFCC80", borderRadius: 12, padding: "28px 32px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#7A3800", marginBottom: 8 }}>
                    💡 Modelo de nota — proposta em diligência
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.85, color: V.texto }}>
                    Em consulta ao Sistema de Apoio à Implementação de Políticas em Saúde (SAIPS), foi identificada a proposta nº <strong>218623</strong>, referente à solicitação de habilitação na alta complexidade em oncologia como <strong>UNACON c/ Serviço de Radioterapia</strong> (códigos 17.06 e 17.07), do <strong>Fundação Hospital Regional do Câncer</strong>, a qual se encontra em diligência.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
