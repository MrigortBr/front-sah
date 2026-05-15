"use client";

import React, { useState } from "react";
import Link from "next/link";

const V = {
  verde: "#1B5E3B", verdeMed: "#2E7D52", verdeCla: "#3DA06A", verdeBg: "#EAF4EF",
  amarelo: "#FFCD00", cinzaF: "#F4F6F4", cinzaB: "#E4EBE6",
  cinzaT: "#6B7B6E", texto: "#1A2E20", erro: "#C0392B",
};

type Stage = "form" | "sent";

export default function SenhaPage() {
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrEmail(false);
    if (!email.trim() || !email.includes("@")) { setErrEmail(true); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStage("sent");
  };

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;font-family:'Sora',sans-serif;background:${V.cinzaF};color:${V.texto}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .inp-f:focus{border-color:${V.verdeMed}!important;background:#fff!important;box-shadow:0 0 0 3px rgba(46,125,82,.12)!important}
        .btn-h:hover:not(:disabled){background:${V.verdeMed}!important;transform:translateY(-1px);box-shadow:0 6px 20px rgba(27,94,59,.28)!important}
        .link-h:hover{text-decoration:underline}
        .back-h:hover{color:${V.verde}!important}
      `}</style>

      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", background:V.cinzaF }}>

        {/* Card */}
        <div style={{ width:"100%", maxWidth:420, background:"#fff", borderRadius:16, border:`1px solid ${V.cinzaB}`, boxShadow:"0 4px 32px rgba(27,94,59,.07)", overflow:"hidden", animation:"fadeUp .4s ease" }}>

          {/* Topo verde */}
          <div style={{ background:V.verde, padding:"28px 36px 24px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", bottom:-60, right:-60, width:160, height:160, border:`32px solid rgba(255,255,255,.05)`, borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize:"20px 20px", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              {/* Brand */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div style={{ width:32, height:32, background:V.amarelo, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, color:V.verde }}>MS</div>
                <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,.7)", letterSpacing:".06em", textTransform:"uppercase" }}>SAH · Acesso ao Sistema</div>
              </div>
              <div style={{ fontSize:24, fontWeight:700, color:"#fff", letterSpacing:"-.02em", lineHeight:1.2, marginBottom:6 }}>
                {stage === "form" ? "Recuperar senha" : "E-mail enviado!"}
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,.6)", fontWeight:300 }}>
                {stage === "form"
                  ? "Informe o e-mail institucional vinculado à sua conta."
                  : "Verifique sua caixa de entrada e siga as instruções."}
              </div>
            </div>
          </div>

          {/* Corpo */}
          <div style={{ padding:"32px 36px 28px" }}>

            {stage === "form" ? (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom:24 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:600, color:V.texto, marginBottom:7 }}>
                    E-mail institucional <span style={{ color:V.erro }}>*</span>
                  </label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:V.cinzaT, fontSize:15, pointerEvents:"none" }}>✉️</span>
                    <input
                      className="inp-f"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@saude.gov.br"
                      autoComplete="email"
                      style={{
                        width:"100%", padding:"12px 14px 12px 42px",
                        fontFamily:"'Sora',sans-serif", fontSize:14, color:V.texto,
                        background: errEmail ? "#fff8f8" : V.cinzaF,
                        border:`1.5px solid ${errEmail ? V.erro : V.cinzaB}`,
                        borderRadius:10, outline:"none",
                        transition:"border-color .2s,background .2s,box-shadow .2s",
                      }}
                    />
                  </div>
                  {errEmail && (
                    <div style={{ fontSize:11, color:V.erro, marginTop:5 }}>Informe um e-mail válido.</div>
                  )}
                </div>

                {/* Info box */}
                <div style={{ background:V.verdeBg, border:`1px solid ${V.cinzaB}`, borderRadius:8, padding:"12px 14px", marginBottom:24, display:"flex", gap:10 }}>
                  <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>ℹ️</span>
                  <div style={{ fontSize:12, color:V.verde, lineHeight:1.6 }}>
                    Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha em até 5 minutos.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-h"
                  style={{
                    width:"100%", padding:14, background:V.verde, color:"#fff",
                    fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:600,
                    border:"none", borderRadius:10, cursor: loading ? "not-allowed" : "pointer",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    transition:"all .2s", opacity: loading ? .75 : 1,
                  }}
                >
                  {loading
                    ? <span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />
                    : "Enviar link de recuperação →"
                  }
                </button>
              </form>
            ) : (
              /* Estado de sucesso */
              <div style={{ textAlign:"center", animation:"fadeUp .35s ease" }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:V.verdeBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 20px" }}>
                  ✅
                </div>
                <p style={{ fontSize:13, color:V.cinzaT, lineHeight:1.7, marginBottom:24 }}>
                  Um e-mail de recuperação foi enviado para{" "}
                  <strong style={{ color:V.texto }}>{email}</strong>.<br />
                  O link expira em <strong>30 minutos</strong>.
                </p>
                <div style={{ background:V.cinzaF, border:`1px solid ${V.cinzaB}`, borderRadius:8, padding:"12px 14px", marginBottom:24, fontSize:12, color:V.cinzaT, lineHeight:1.6, textAlign:"left" }}>
                  📌 Não encontrou o e-mail? Verifique sua pasta de spam ou lixo eletrônico. Em caso de dúvidas, contate o suporte.
                </div>
                <button onClick={() => setStage("form")}
                  style={{ fontSize:12, color:V.cinzaT, background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
                  Reenviar e-mail
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding:"16px 36px", borderTop:`1px solid ${V.cinzaB}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <Link href="/login" className="back-h"
              style={{ fontSize:12, color:V.cinzaT, textDecoration:"none", display:"flex", alignItems:"center", gap:5, transition:"color .2s" }}>
              ← Voltar ao login
            </Link>
            <span style={{ fontSize:10, color:"#b0bdb4", fontFamily:"'IBM Plex Mono',monospace" }}>SAH v1.0 · DECAN/MS</span>
          </div>
        </div>

      </div>
    </>
  );
}
