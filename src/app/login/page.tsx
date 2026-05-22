"use client";

import React, { CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PerfilUsuario } from "@/types";
import Link from "next/link";

const V = {
  verde: "#1B5E3B",
  verdeMed: "#2E7D52",
  verdeCla: "#3DA06A",
  verdeBg: "#EAF4EF",
  amarelo: "#FFCD00",
  cinzaF: "#F4F6F4",
  cinzaB: "#E4EBE6",
  cinzaT: "#6B7B6E",
  texto: "#1A2E20",
  erro: "#C0392B",
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [perfil, setPerfil] = useState<"tecnico" | "consulta">("tecnico");
  const [loginVal, setLoginVal] = useState(""); // armazena e-mail
  const [senha, setSenha] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errLogin, setErrLogin] = useState(false);
  const [errSenha, setErrSenha] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrLogin(false); setErrSenha(false);
    let ok = true;
    if (!loginVal.trim()) { setErrLogin(true); ok = false; }
    if (!senha.trim()) { setErrSenha(true); ok = false; }
    if (!ok) return;
    setLoading(true);
    try {
      await login(loginVal, senha, perfil as PerfilUsuario);
      router.push("/propostas");
    } catch {
      setErrLogin(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (err: boolean): CSSProperties => ({
    width: "100%", padding: "12px 14px 12px 42px",
    fontFamily: "'Sora', sans-serif", fontSize: 14, color: V.texto,
    background: err ? "#fff8f8" : V.cinzaF,
    border: `1.5px solid ${err ? V.erro : V.cinzaB}`,
    borderRadius: 10, outline: "none",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxSizing: "border-box",
  });

  return (
    <>

      <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 460px" }}>

        {/* ── Painel esquerdo ── */}
        <div style={{
          position: "relative", background: V.verde,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "48px 56px", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 80% 60% at 10% 110%,rgba(255,205,0,.15) 0%,transparent 60%),
                         radial-gradient(ellipse 60% 80% at 90% -10%,rgba(61,160,106,.25) 0%,transparent 55%)` }} />
          <div style={{
            position: "absolute", bottom: -120, right: -120, width: 420, height: 420,
            border: "60px solid rgba(255,255,255,.04)", borderRadius: "50%", pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.12) 1px,transparent 1px)",
            backgroundSize: "28px 28px", pointerEvents: "none"
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
              <div style={{
                width: 44, height: 44, background: V.amarelo, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: V.verde, fontFamily: "'IBM Plex Mono',monospace"
              }}>MS</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.9)" }}>Ministério da Saúde</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,.65)", letterSpacing: ".08em", textTransform: "uppercase" }}>
                  Departamento de Atenção ao Câncer
                </div>
              </div>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,205,0,.18)", border: "1px solid rgba(255,205,0,.35)",
              color: V.amarelo, fontSize: 10, fontWeight: 600,
              letterSpacing: ".12em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: 20, marginBottom: 24,
            }}>
              <span style={{
                width: 6, height: 6, background: V.amarelo, borderRadius: "50%",
                display: "inline-block", animation: "pulse 2s ease-in-out infinite"
              }} />
              Sistema em operação
            </div>

            <h1 style={{
              fontSize: "clamp(28px,3vw,42px)", fontWeight: 700, color: "#fff",
              lineHeight: 1.15, letterSpacing: "-.02em", marginBottom: 16
            }}>
              SAH<br /><em style={{ fontStyle: "normal", color: V.amarelo }}>Oncologia</em>
            </h1>

            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, maxWidth: 380, fontWeight: 300 }}>
              Sistema de Acompanhamento de Habilitações — gestão e monitoramento das habilitações oncológicas e novos serviços no SUS.
            </p>
          </div>

          <div style={{
            position: "relative", zIndex: 1, display: "flex", gap: 40,
            paddingTop: 40, borderTop: "1px solid rgba(255,255,255,.1)"
          }}>
            {[["300", "+", "Estabelecimentos"], ["27", "", "Unidades da Federação"], ["43", "", "Campos monitorados"]].map(([n, s, l]) => (
              <div key={l}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: "'IBM Plex Mono',monospace", lineHeight: 1, marginBottom: 4 }}>
                  {n}<span style={{ color: V.amarelo }}>{s}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Painel direito ── */}
        <div style={{
          background: "#fff", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "56px 52px", position: "relative"
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, width: 4, height: "100%",
            background: "linear-gradient(180deg,#FFCD00,#3DA06A)"
          }} />

          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: V.verdeMed, marginBottom: 10 }}>
            Acesso restrito
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: V.texto, letterSpacing: "-.02em", marginBottom: 6, lineHeight: 1.2 }}>
            Entrar no sistema
          </h2>
          <p style={{ fontSize: 13, color: V.cinzaT, marginBottom: 32, lineHeight: 1.6 }}>
            Use seu login institucional para acessar o SAH.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Perfil */}
            <p style={{ fontSize: 12, fontWeight: 600, color: V.texto, marginBottom: 10 }}>
              Perfil de acesso <span style={{ color: V.erro }}>*</span>
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {[
                { value: "tecnico", icon: "🔬", name: "Técnico", desc: "DECAN / MS" },
                { value: "consulta", icon: "📋", name: "Consulta", desc: "Somente leitura" },
              ].map((p) => (
                <label key={p.value} style={{ cursor: "pointer" }}>
                  <input type="radio" name="perfil" value={p.value}
                    checked={perfil === p.value}
                    onChange={() => setPerfil(p.value as "tecnico" | "consulta")}
                    style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  <div className="profile-card" style={{
                    display: "flex", alignItems: "center", gap: 12, padding: 16,
                    border: `1.5px solid ${perfil === p.value ? V.verdeMed : V.cinzaB}`,
                    borderRadius: 10, background: perfil === p.value ? "#eaf4ef" : V.cinzaF,
                    boxShadow: perfil === p.value ? "0 0 0 3px rgba(46,125,82,.1)" : "none",
                    transition: "all .2s",
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 8,
                      background: perfil === p.value ? V.verdeMed : V.verde,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0
                    }}>{p.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: V.texto }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: V.cinzaT }}>{p.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Login */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: V.texto, marginBottom: 7 }}>
                E-mail institucional <span style={{ color: V.erro }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: V.cinzaT, fontSize: 15, pointerEvents: "none" }}>👤</span>
                <input className="inp-focus" type="email" value={loginVal}
                  onChange={(e) => setLoginVal(e.target.value)}
                  placeholder="usuario@saude.gov.br" autoComplete="email"
                  style={inputStyle(errLogin)} />
              </div>
              {errLogin && <div style={{ fontSize: 11, color: V.erro, marginTop: 5 }}>Informe seu e-mail institucional.</div>}
            </div>

            {/* Senha */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: V.texto, marginBottom: 7 }}>
                Senha <span style={{ color: V.erro }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: V.cinzaT, fontSize: 15, pointerEvents: "none" }}>🔒</span>
                <input className="inp-focus" type={showPass ? "text" : "password"} value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ ...inputStyle(errSenha), paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: V.cinzaT, fontSize: 15, display: "flex" }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
                <Link href="/senha" className="link-forgot" style={{ fontSize: 12, color: V.verdeMed, textDecoration: "none", fontWeight: 500 }}>
                  Esqueceu a senha?
                </Link>
              </div>
              {errSenha && <div style={{ fontSize: 11, color: V.erro, marginTop: 5 }}>Informe sua senha.</div>}
            </div>

            <button type="submit" disabled={loading} className="btn-login"
              style={{
                width: "100%", padding: 14, background: V.verde, color: "#fff",
                fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600,
                border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 8, transition: "all .2s", opacity: loading ? .75 : 1,
                position: "relative", overflow: "hidden",
              }}>
              {loading
                ? <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
                : <><span>Entrar no sistema</span><span style={{ fontSize: 16, transition: "transform .2s" }}>→</span></>
              }
            </button>
          </form>

          <div style={{ marginTop: 28, paddingTop: 18, borderTop: `1px solid ${V.cinzaB}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: "#b0bdb4", fontFamily: "'IBM Plex Mono',monospace" }}>SAH v1.0 · 2025</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Suporte", "Manual", "Privacidade"].map((l) => (
                <a key={l} href="#" style={{ fontSize: 11, color: V.cinzaT, textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
