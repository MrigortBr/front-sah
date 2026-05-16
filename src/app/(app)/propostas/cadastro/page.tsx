"use client";

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getCnes, createProposta, getInfo } from "@/services/api";
import { CnesEstabelecimento, Diligencia, TipoHabilitacao, Tecnico, SituacaoProposta, TipoFinanciamento } from "@/types";

const V = {
  verde: "#1B5E3B", verdeMed: "#2E7D52", verdeCla: "#3DA06A", verdeBg: "#EAF4EF",
  amarelo: "#FFCD00", amarBg: "#FFF9E0", azul: "#1565C0", azulCla: "#E3EEFF",
  laranja: "#E65100", larBg: "#FFF3E0", cinzaF: "#F4F6F4", cinzaB: "#E4EBE6",
  cinzaT: "#6B7B6E", texto: "#1A2E20", erro: "#C0392B",
};

// ── Fallback estático (usado se a API não responder) ───────────────────────────
const DILIGENCIAS_FALLBACK: string[] = [
  "Deliberação CIB",
  "Link do Plano de Atenção para o Diagnóstico e o Tratamento do Câncer",
  "Relatório de vistoria realizada pela Vigilância Sanitária",
  "Relatório do gestor sobre a necessidade dos serviços de saúde",
  "Termo de compromisso",
  "Cálculo de previsão financeira",
  "Declaração do responsável técnico médico",
  "Licença de operação emitida pela CNEN",
  "Formulário de Classificação e Verificação dos critérios mínimos para habilitação",
  "Parecer conclusivo do gestor",
  "Licença Sanitária",
];

const HAB_CHIPS_FALLBACK = [
  { cod: "17.04", nome: "Serviço Isolado de Radioterapia" },
  { cod: "17.06", nome: "UNACON" },
  { cod: "17.07", nome: "UNACON com Serviço de Radioterapia" },
  { cod: "17.08", nome: "UNACON com Serviço de Hematologia" },
  { cod: "17.09", nome: "UNACON com Serviço de Oncologia Pediátrica" },
  { cod: "17.10", nome: "UNACON Exclusiva de Hematologia" },
  { cod: "17.11", nome: "UNACON Exclusiva de Oncologia Pediátrica" },
  { cod: "17.12", nome: "CACON" },
  { cod: "17.13", nome: "CACON com Serviço de Oncologia Pediátrica" },
  { cod: "17.14", nome: "Hospital Geral com Cirurgia Oncológica" },
  { cod: "17.15", nome: "Serviço de Radioterapia de Complexo Hospitalar" },
];

const STEPS = [
  { n: 1, label: "Identificação do Processo", desc: "SAIPS, NUP, situação, diligência" },
  { n: 2, label: "Impacto Financeiro", desc: "Mensal, anual, parcela única" },
  { n: 3, label: "Localização", desc: "UF, município, região" },
  { n: 4, label: "Estabelecimento", desc: "CNES, CNPJ, nome" },
  { n: 5, label: "Habilitação", desc: "Código e tipo solicitado" },
  { n: 6, label: "Histórico", desc: "Primeira hab. e alterações" },
];

const SITUACOES = ["Enviada ao MS", "Em análise", "Em diligência", "Rejeitada", "Rejeitada por não atendimento à diligência", "Aprovada", "Portaria Publicada", "Enviada ao DRAC", "Proposta excluída", "Proposta concluída"];
const FINS = ["", "CHARR", "MAC", "FAEC", "MAC e FAEC", "Não há ônus para o MS"];

function FieldAuto({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: V.texto }}>{label}</label>
      <input readOnly value={value ?? ""} style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: V.cinzaT, background: "#f8fdf9", border: `1.5px solid ${V.cinzaB}`, borderRadius: 8, padding: "10px 14px", cursor: "not-allowed", width: "100%" }} />
    </div>
  );
}

function Field({ label, req, hint, children }: { label: string; req?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: V.texto }}>
        {label}{req && <span style={{ color: V.erro, marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {hint && <span style={{ fontSize: 11, color: V.cinzaT, lineHeight: 1.4 }}>{hint}</span>}
    </div>
  );
}

const inp = (extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'Sora',sans-serif", fontSize: 13, color: V.texto,
  background: V.cinzaF, border: `1.5px solid ${V.cinzaB}`,
  borderRadius: 8, padding: "10px 14px", outline: "none", width: "100%",
  transition: "border-color .2s,background .2s,box-shadow .2s", ...extra,
});

export default function CadastroPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const mainRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);

  // ── Estado da API ─────────────────────────────────────────────────────────
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [diligencias, setDiligencias] = useState<string[]>(DILIGENCIAS_FALLBACK);
  const [habChips, setHabChips] = useState<{ cod: string; nome: string }[]>(HAB_CHIPS_FALLBACK);
  const [submitting, setSubmitting] = useState(false);

  // Etapa 1
  const [saips, setSaips] = useState("");
  const [nup, setNup] = useState("");
  const [situacao, setSituacao] = useState("Enviada ao MS");
  const [tipoFin, setTipoFin] = useState("FAEC");
  const [tecnicoId, setTecnicoId] = useState<number>(0);
  const [portaria, setPortaria] = useState("");
  const [diligSel, setDiligSel] = useState<string[]>([]);
  const [dtSaips, setDtSaips] = useState("");
  const [dtDecan, setDtDecan] = useState("");
  const [dtDrac, setDtDrac] = useState("");

  // Etapa 2
  const [mensal, setMensal] = useState("");
  const [parcela, setParcela] = useState("");
  const anual = mensal ? (parseFloat(mensal.replace(/\./g, "").replace(",", ".")) * 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "";

  // Etapa 3+4 (CNES)
  const [cnesVal, setCnesVal] = useState("");
  const [cnesLoading, setCnesLoading] = useState(false);
  const [cnesData, setCnesData] = useState<CnesEstabelecimento | null>(null);
  const [aceleradores, setAceleradores] = useState("");

  // Etapa 5
  const [habSel, setHabSel] = useState<string[]>([]);

  // Etapa 6
  const [histAno, setHistAno] = useState("");
  const [histCod, setHistCod] = useState("");
  const [alteracoes, setAlteracoes] = useState<{ ano: string; cod: string }[]>([]);

  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // ── Carrega dados da API ao montar ──────────────────────────────────────────
  useEffect(() => {
    getInfo()
      .then(({ technicians, diligencia, tipoHabilitacao }) => {
        if (technicians.length > 0) {
          setTecnicos(technicians);
          setTecnicoId(technicians[0].id);
        }
        if (diligencia.length > 0) {
          setDiligencias(diligencia.map((d) => d.title));
        }
        if (tipoHabilitacao.length > 0) {
          setHabChips(tipoHabilitacao.map((h) => ({ cod: h.codigo, nome: h.descricao })));
        }
      })
      .catch(() => { /* mantém fallbacks estáticos */ });
  }, []);

  // ── Scroll spy ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const sectionNums = [1, 2, 3, 4, 5, 6];
    const onScroll = () => {
      let active = 1;
      for (const n of sectionNums) {
        const el = document.getElementById(`sec-${n}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 80) active = n;
      }
      setStep(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = user ? `${user.nome[0]}${user.sobrenome[0]}` : "TP";
  const userName = user ? `${user.nome} ${user.sobrenome}` : "Tayana Pinheiro";

  // Restaura rascunho salvo
  useEffect(() => {
    const raw = localStorage.getItem("sah_rascunho");
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      if (d.saips !== undefined) setSaips(d.saips);
      if (d.nup !== undefined) setNup(d.nup);
      if (d.situacao) setSituacao(d.situacao);
      if (d.tipoFin) setTipoFin(d.tipoFin);
      if (d.tecnicoId) setTecnicoId(d.tecnicoId);
      if (d.portaria !== undefined) setPortaria(d.portaria);
      if (d.diligSel) setDiligSel(d.diligSel);
      if (d.dtSaips !== undefined) setDtSaips(d.dtSaips);
      if (d.dtDecan !== undefined) setDtDecan(d.dtDecan);
      if (d.dtDrac !== undefined) setDtDrac(d.dtDrac);
      if (d.mensal !== undefined) setMensal(d.mensal);
      if (d.parcela !== undefined) setParcela(d.parcela);
      if (d.cnesVal) { setCnesVal(d.cnesVal); }
      if (d.aceleradores !== undefined) setAceleradores(d.aceleradores);
      if (d.habSel) setHabSel(d.habSel);
      if (d.histAno !== undefined) setHistAno(d.histAno);
      if (d.histCod !== undefined) setHistCod(d.histCod);
      if (d.alteracoes) setAlteracoes(d.alteracoes);
    } catch { /* ignora rascunho corrompido */ }
  }, []);

  const salvarRascunho = () => {
    const data = {
      saips, nup, situacao, tipoFin, tecnicoId, portaria, diligSel,
      dtSaips, dtDecan, dtDrac, mensal, parcela,
      cnesVal, aceleradores, habSel, histAno, histCod, alteracoes,
    };
    localStorage.setItem("sah_rascunho", JSON.stringify(data));
    setToastMsg("💾 Rascunho salvo!");
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  // CNES lookup
  const onCnesInput = (val: string) => {
    setCnesVal(val);
    setCnesData(null);
    if (val.length < 7) return;
    setCnesLoading(true);
    getCnes(val.padStart(7, "0"))
      .then((data) => setCnesData(data))
      .catch(() => setCnesData(null))
      .finally(() => setCnesLoading(false));
  };

  // Toggle diligência
  const toggleDil = (d: string) =>
    setDiligSel((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  // Toggle hab
  const toggleHab = (cod: string) =>
    setHabSel((prev) => prev.includes(cod) ? prev.filter((x) => x !== cod) : [...prev, cod]);

  const habNomes = habSel.map((c) => habChips.find((h) => h.cod === c)?.nome ?? "").join(", ");

  const submitForm = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await createProposta({
        saips,
        nup,
        situacao: situacao as SituacaoProposta,
        tipoFinanciamento: tipoFin as TipoFinanciamento,
        tecnicoId,
        numPortaria: portaria,
        diligencias: diligSel,
        dataInicioSaips: dtSaips,
        dataEntradaDecan: dtDecan,
        dataEnvioDrac: dtDrac,
        impactoMensal: mensal ? parseFloat(mensal.replace(/\./g, "").replace(",", ".")) : undefined,
        parcelaUnica: parcela ? parseFloat(parcela.replace(/\./g, "").replace(",", ".")) : undefined,
        cnes: cnesVal.padStart(7, "0"),
        nomeEstabelecimento: cnesData?.nomeEstabelecimento,
        cnpj: cnesData?.cnpj,
        naturezaJuridica: cnesData?.naturezaJuridica,
        gestao: cnesData?.gestao,
        numAceleradores: aceleradores ? Number(aceleradores) : 0,
        uf: cnesData?.uf,
        ibgeMunicipio: cnesData?.ibgeMunicipio,
        nomeMunicipio: cnesData?.nomeMunicipio,
        regiaoSaude: cnesData?.regiaoSaude,
        ibgeRegiao: cnesData?.ibgeRegiao,
        macrorregiao: cnesData?.macrorregiao,
        codigosHabilitacao: habSel,
        historicoAlteracoes: [
          ...(histAno && histCod ? [{ ano: Number(histAno), codigos: histCod }] : []),
          ...alteracoes.map((a) => ({ ano: Number(a.ano), codigos: a.cod })),
        ],
      });
      localStorage.removeItem("sah_rascunho");
      setToastMsg("✅ Proposta enviada com sucesso!");
      setToast(true);
      setTimeout(() => { setToast(false); router.push("/propostas"); }, 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar proposta";
      setToastMsg(`❌ ${msg}`);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const sectionStyle: CSSProperties = {
    background: "#fff", borderRadius: 12, border: `1px solid ${V.cinzaB}`,
    padding: "28px 32px", marginBottom: 20, scrollMarginTop: 72,
  };

  const grid2: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 };
  const grid3: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 };

  return (
    <>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Sora',sans-serif" }}>

        {/* ── Topbar ── */}
        <nav style={{ background: V.verde, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 56, flexShrink: 0, position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: V.amarelo, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 700, color: V.verde }}>MS</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>SAH · Nova Proposta</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", letterSpacing: ".05em", textTransform: "uppercase" }}>Acompanhamento de Habilitações</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#fff" }}>{initials}</div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>{userName}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".06em" }}>Técnico · DECAN</div>
              </div>
            </div>
            <button className="btn-logout-h" onClick={() => router.push("/propostas")}
              style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.7)", fontFamily: "'Sora',sans-serif", fontSize: 11, padding: "5px 12px", borderRadius: 6, cursor: "pointer", transition: "all .2s" }}>
              ← Propostas
            </button>
          </div>
        </nav>

        {/* ── Layout ── */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>

          {/* Form Sidebar */}
          <div style={{ width: 220, flexShrink: 0, background: "#fff", borderRight: `1px solid ${V.cinzaB}`, padding: "20px 0", position: "sticky", top: 56, height: "calc(100vh - 56px)", overflowY: "auto" }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${V.cinzaB}`, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Nova proposta</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Etapas de preenchimento</div>
            </div>
            <div style={{ padding: "0 12px" }}>
              {STEPS.map((s) => (
                <div key={s.n} className="step-item-h" onClick={() => {
                  setStep(s.n);
                  document.getElementById(`sec-${s.n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: 10, borderRadius: 8, marginBottom: 4, cursor: "pointer",
                  background: step === s.n ? V.verdeBg : "transparent",
                  transition: "all .15s",
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    border: `2px solid ${step === s.n ? V.verdeMed : V.cinzaB}`,
                    background: step === s.n ? V.verdeMed : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700,
                    color: step === s.n ? "#fff" : V.cinzaT,
                    flexShrink: 0, marginTop: 1,
                  }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: step === s.n ? V.verde : V.cinzaT, lineHeight: 1.3 }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: V.cinzaT, marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Main */}
          <div ref={mainRef} style={{ flex: 1, padding: "32px 36px", background: V.cinzaF }}>

              {/* ── Seção 1: Identificação ── */}
              <div id="sec-1" style={sectionStyle}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: V.verdeMed, display: "inline-block", flexShrink: 0 }} />
                  Identificação do Processo
                </div>
                <div style={{ fontSize: 12, color: V.cinzaT, marginBottom: 22, paddingLeft: 18 }}>Dados de identificação e tramitação administrativa</div>
                <div style={grid2}>
                  <Field label="SAIPS" req hint="Número do processo no SAIPS">
                    <input className="inp-f" value={saips} onChange={(e) => setSaips(e.target.value)} placeholder="Ex: 1234567890" maxLength={10} style={inp()} />
                  </Field>
                  <Field label="NUP" req hint="">
                    <input className="inp-f" value={nup} onChange={(e) => setNup(e.target.value)} placeholder="00000.000000/0000-00" style={inp()} />
                  </Field>
                  <Field label="Situação" req>
                    <select className="inp-f" value={situacao} onChange={(e) => setSituacao(e.target.value)} style={inp()}>
                      {SITUACOES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Tipo de Financiamento">
                    <select className="inp-f" value={tipoFin} onChange={(e) => setTipoFin(e.target.value)} style={inp()}>
                      {FINS.map((f) => <option key={f} value={f}>{f || "Selecione..."}</option>)}
                    </select>
                  </Field>
                  <Field label="Técnico Responsável" req>
                    <select className="inp-f" value={tecnicoId} onChange={(e) => setTecnicoId(Number(e.target.value))} style={inp()}>
                      {tecnicos.map((t) => (
                        <option key={t.id} value={t.id}>{t.name} {t.surname}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Nº Portaria de Habilitação">
                    <input className="inp-f" value={portaria} onChange={(e) => setPortaria(e.target.value)} placeholder="Ex: PORTARIA GM/MS Nº 3.282, DE 7 DE MARÇO DE 2024" style={inp()} />
                  </Field>
                </div>

                {/* Diligências */}
                <div style={{ background: V.larBg, border: "1.5px solid #FFCC80", borderRadius: 10, padding: "16px 20px", marginTop: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#7A3800", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    ⚠️ Diligência(s)
                    <span style={{ fontSize: 10, fontWeight: 400, color: "#a0643a", marginLeft: 6 }}>Opcional — selecione uma ou mais</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {diligencias.map((d) => (
                      <div key={d} className="dil-chip-h" onClick={() => toggleDil(d)}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: `1.5px solid ${diligSel.includes(d) ? V.laranja : "#FFCC80"}`, fontSize: 11, fontWeight: diligSel.includes(d) ? 600 : 500, color: diligSel.includes(d) ? "#fff" : "#7A3800", cursor: "pointer", transition: "all .15s", background: diligSel.includes(d) ? V.laranja : "#fff", userSelect: "none" }}>
                        {d}
                      </div>
                    ))}
                  </div>
                  {diligSel.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#7A3800", textTransform: "uppercase", letterSpacing: ".07em" }}>Diligências selecionadas</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                        {diligSel.map((d) => (
                          <div key={d} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px", background: "#fff", border: "1px solid #FFCC80", borderRadius: 8, fontSize: 12 }}>
                            {d}
                            <button onClick={() => toggleDil(d)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: V.cinzaT, padding: 0, lineHeight: 1 }}>✕</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Datas */}
                <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".1em", paddingBottom: 12, borderBottom: `1px solid ${V.cinzaB}`, marginBottom: 18, marginTop: 24 }}>
                  Datas de tramitação
                </div>
                <div style={grid3}>
                  <Field label="Início no SAIPS" req hint="Resposta única e fixa">
                    <input className="inp-f" type="date" value={dtSaips} onChange={(e) => setDtSaips(e.target.value)} style={inp({ background: "#f8fdf9", color: V.cinzaT })} />
                  </Field>
                  <Field label="Entrada na DECAN" req hint="Resposta única e fixa">
                    <input className="inp-f" type="date" value={dtDecan} onChange={(e) => setDtDecan(e.target.value)} style={inp({ background: "#f8fdf9", color: V.cinzaT })} />
                  </Field>
                  <Field label="Envio ao DRAC" hint="Preencher somente quando situação = Enviada ao DRAC">
                    <input className="inp-f" type="date" value={dtDrac} onChange={(e) => setDtDrac(e.target.value)} style={inp()} />
                  </Field>
                </div>
              </div>

              {/* ── Seção 2: Financeiro ── */}
              <div id="sec-2" style={sectionStyle}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: V.laranja, display: "inline-block" }} />
                  Impacto Financeiro
                </div>
                <div style={{ fontSize: 12, color: V.cinzaT, marginBottom: 22, paddingLeft: 18 }}>Valores em R$ com até 2 casas decimais — campos obrigatórios</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, background: V.amarBg, borderRadius: 10, padding: 18, border: "1px solid #FFE082" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#7A5500" }}>Impacto Mensal <span style={{ color: V.erro }}>*</span></label>
                    <input className="inp-f" value={mensal} onChange={(e) => setMensal(e.target.value)} placeholder="0,00"
                      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 600, color: V.texto, background: "#fff", border: "1.5px solid #FFE082", borderRadius: 8, padding: "10px 14px", outline: "none", width: "100%" }} />
                    <span style={{ fontSize: 11, color: "#7A5500" }}>R$ por mês</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#7A5500" }}>Impacto Anual <span style={{ color: V.erro }}>*</span></label>
                    <input readOnly value={anual || ""} placeholder="calculado"
                      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 600, color: V.cinzaT, background: "#f8fdf9", border: "1.5px solid #FFE082", borderRadius: 8, padding: "10px 14px", width: "100%", cursor: "not-allowed" }} />
                    <span style={{ fontSize: 11, color: "#7A5500" }}>Calculado (× 12)</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#7A5500" }}>Parcela Única <span style={{ color: V.erro }}>*</span></label>
                    <input className="inp-f" value={parcela} onChange={(e) => setParcela(e.target.value)} placeholder="0,00"
                      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 600, color: V.texto, background: "#fff", border: "1.5px solid #FFE082", borderRadius: 8, padding: "10px 14px", outline: "none", width: "100%" }} />
                    <span style={{ fontSize: 11, color: "#7A5500" }}>R$ pagamento único</span>
                  </div>
                </div>
              </div>

              {/* ── Seção 3+4: CNES / Estabelecimento ── */}
              <div id="sec-3" style={sectionStyle}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6A1B9A", display: "inline-block" }} />
                  Estabelecimento e Localização
                </div>
                <div style={{ fontSize: 12, color: V.cinzaT, marginBottom: 22, paddingLeft: 18 }}>
                  Digite o CNES para preencher automaticamente os dados do estabelecimento e localização via banco do CNES 🔗
                </div>

                {/* CNES input */}
                <div style={{ background: V.cinzaF, border: `1.5px solid ${V.cinzaB}`, borderRadius: 10, padding: "18px 20px", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: "0 0 180px" }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: V.texto }}>CNES <span style={{ color: V.erro }}>*</span></label>
                      <div style={{ position: "relative" }}>
                        <input className="inp-f" value={cnesVal} onChange={(e) => onCnesInput(e.target.value)}
                          placeholder="0000000" maxLength={7}
                          style={{ ...inp(), paddingRight: 38 }} />
                        {cnesLoading && (
                          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>⏳</span>
                        )}
                        {!cnesLoading && cnesData && (
                          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: V.verdeCla }}>✓</span>
                        )}
                      </div>
                      <span style={{ fontSize: 11, color: V.cinzaT }}>7 dígitos — dados preenchidos automaticamente</span>
                    </div>
                    <div style={{ alignSelf: "center", fontSize: 12, color: V.cinzaT, paddingTop: 18 }}>
                      {cnesLoading ? "Consultando..." : cnesData ? `✅ ${cnesData.nomeEstabelecimento}` : cnesVal.length > 0 && cnesVal.length < 7 ? "Digite 7 dígitos" : ""}
                    </div>
                  </div>
                </div>

                {/* Fields (desabilitados até ter CNES) */}
                <div style={{ opacity: cnesData ? 1 : 0.4, pointerEvents: cnesData ? "auto" : "none", transition: "opacity .3s" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".1em", paddingBottom: 12, borderBottom: `1px solid ${V.cinzaB}`, marginBottom: 18, marginTop: 20 }}>
                    Dados do Estabelecimento
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                    <div style={{ gridColumn: "1/-1" }}><FieldAuto label="Nome do Estabelecimento" value={cnesData?.nomeEstabelecimento} /></div>
                    <FieldAuto label="CNPJ" value={cnesData?.cnpj} />
                    <FieldAuto label="Natureza Jurídica" value={cnesData?.naturezaJuridica} />
                    <FieldAuto label="Gestão" value={cnesData?.gestao} />
                    <Field label="Nº Aceleradores / Cobaltos" hint="Único campo a preencher manualmente">
                      <input className="inp-f" type="number" min="0" value={aceleradores} onChange={(e) => setAceleradores(e.target.value)} placeholder="Informar manualmente" style={inp()} />
                    </Field>
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".1em", paddingBottom: 12, borderBottom: `1px solid ${V.cinzaB}`, marginBottom: 18, marginTop: 8 }}>
                    Localização
                  </div>
                  <div id="sec-4" style={grid3}>
                    <FieldAuto label="UF" value={cnesData?.uf} />
                    <FieldAuto label="IBGE do Município" value={cnesData?.ibgeMunicipio} />
                    <FieldAuto label="Nome do Município" value={cnesData?.nomeMunicipio} />
                    <FieldAuto label="Região de Saúde" value={cnesData?.regiaoSaude} />
                    <FieldAuto label="IBGE Região de Saúde" value={cnesData?.ibgeRegiao} />
                    <FieldAuto label="Macrorregião de Saúde" value={cnesData?.macrorregiao} />
                  </div>
                </div>
              </div>

              {/* ── Seção 5: Habilitação ── */}
              <div id="sec-5" style={sectionStyle}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: V.amarelo, display: "inline-block" }} />
                  Habilitação Solicitada
                </div>
                <div style={{ fontSize: 12, color: V.cinzaT, marginBottom: 22, paddingLeft: 18 }}>Selecione o(s) código(s). Múltiplas seleções permitidas.</div>

                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                  Código(s) de habilitação <span style={{ color: V.erro }}>*</span>
                </div>
                <div style={{ fontSize: 11, color: V.cinzaT, marginBottom: 14 }}>
                  Clique no código — o nome da habilitação aparece abaixo automaticamente
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                  {habChips.map((h) => (
                    <div key={h.cod} className="hab-chip-h" onClick={() => toggleHab(h.cod)}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: `1.5px solid ${habSel.includes(h.cod) ? V.verdeMed : V.cinzaB}`, fontSize: 12, fontWeight: habSel.includes(h.cod) ? 600 : 500, color: habSel.includes(h.cod) ? V.verde : V.cinzaT, cursor: "pointer", transition: "all .15s", background: habSel.includes(h.cod) ? V.verdeBg : V.cinzaF, userSelect: "none" }}>
                      {h.cod}
                    </div>
                  ))}
                </div>

                {habSel.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Habilitação(ões) selecionada(s)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {habSel.map((cod) => {
                        const h = habChips.find((x) => x.cod === cod) ?? { cod, nome: cod };
                        return (
                          <div key={cod} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: V.verdeBg, borderRadius: 8, border: `1px solid ${V.cinzaB}` }}>
                            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 700, color: V.verde, background: "#fff", padding: "2px 8px", borderRadius: 4, border: `1px solid ${V.cinzaB}` }}>{cod}</span>
                            <span style={{ fontSize: 13 }}>{h.nome}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
                  <Field label="Habilitação(ões) — texto consolidado" hint="Preenchido automaticamente conforme código(s) selecionado(s)">
                    <input readOnly value={habNomes} placeholder="Selecione um ou mais códigos acima" style={{ ...inp(), background: "#f8fdf9", color: V.cinzaT, cursor: "not-allowed" }} />
                  </Field>
                </div>
              </div>

              {/* ── Seção 6: Histórico ── */}
              <div id="sec-6" style={sectionStyle}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: V.cinzaT, display: "inline-block" }} />
                  Histórico de Habilitação
                </div>
                <div style={{ fontSize: 12, color: V.cinzaT, marginBottom: 22, paddingLeft: 18 }}>Preencher somente se houver histórico anterior</div>

                {/* Primeira habilitação */}
                <div style={{ background: V.cinzaF, border: `1.5px solid ${V.cinzaB}`, borderRadius: 10, padding: "16px 18px", marginBottom: 12, position: "relative" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Primeira Habilitação</div>
                  <div style={grid2}>
                    <Field label="Ano da Primeira Habilitação">
                      <input className="inp-f" type="number" value={histAno} onChange={(e) => setHistAno(e.target.value)} placeholder="Ex: 1999" min="1990" max="2025" style={inp()} />
                    </Field>
                    <Field label="Código(s) de Habilitação">
                      <input className="inp-f" value={histCod} onChange={(e) => setHistCod(e.target.value)} placeholder="Ex: 17.01 e 17.04" style={inp()} />
                    </Field>
                  </div>
                </div>

                {/* Alterações */}
                {alteracoes.map((alt, i) => (
                  <div key={i} style={{ background: V.cinzaF, border: `1.5px solid ${V.cinzaB}`, borderRadius: 10, padding: "16px 18px", marginBottom: 12, position: "relative" }}>
                    <button onClick={() => setAlteracoes((p) => p.filter((_, j) => j !== i))}
                      style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: V.cinzaT }}>✕</button>
                    <div style={{ fontSize: 11, fontWeight: 600, color: V.cinzaT, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Alteração {i + 1}</div>
                    <div style={grid2}>
                      <Field label="Ano">
                        <input className="inp-f" type="number" value={alt.ano} onChange={(e) => setAlteracoes((p) => p.map((a, j) => j === i ? { ...a, ano: e.target.value } : a))} placeholder="Ex: 2010" style={inp()} />
                      </Field>
                      <Field label="Código(s)">
                        <input className="inp-f" value={alt.cod} onChange={(e) => setAlteracoes((p) => p.map((a, j) => j === i ? { ...a, cod: e.target.value } : a))} placeholder="Ex: 17.06" style={inp()} />
                      </Field>
                    </div>
                  </div>
                ))}

                <button className="btn-add-hist-h" onClick={() => setAlteracoes((p) => [...p, { ano: "", cod: "" }])}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: V.verdeBg, color: V.verde, fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, border: `1.5px dashed ${V.verdeCla}`, borderRadius: 8, cursor: "pointer", transition: "all .2s", marginTop: 8 }}>
                  ＋ Adicionar alteração no histórico
                </button>
              </div>

            {/* Footer bar */}
            <div style={{ background: "#fff", borderTop: `1px solid ${V.cinzaB}`, padding: "16px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <button className="btn-outline-h" onClick={() => router.push("/propostas")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "transparent", color: V.cinzaT, fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, border: `1.5px solid ${V.cinzaB}`, borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
                ← Cancelar
              </button>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-outline-h" onClick={salvarRascunho} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "transparent", color: V.cinzaT, fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, border: `1.5px solid ${V.cinzaB}`, borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
                  💾 Salvar rascunho
                </button>
                <button className="btn-primary-h" onClick={submitForm} disabled={submitting}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: V.verde, color: "#fff", fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
                  Enviar proposta →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, background: V.verde, color: "#fff", padding: "14px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,.2)", display: "flex", alignItems: "center", gap: 10 }}>
          {toastMsg}
        </div>
      )}
    </>
  );
}
