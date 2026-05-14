# SAH — front-sah

Sistema de Acompanhamento de Habilitações · Next.js 16 + MUI v6 + TypeScript

---

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
cp .env.local.example .env.local
# Editar NEXT_PUBLIC_API_URL se necessário

# 3. Rodar em desenvolvimento
npm run dev
```

---

## Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx               # Root layout (MUI providers + AuthProvider)
│   ├── page.tsx                 # Redirect /login ou /home
│   ├── login/
│   │   └── page.tsx             # Tela de login
│   └── (app)/                   # Grupo autenticado (redireciona para /login se não logado)
│       ├── layout.tsx           # FormDataProvider + guard de auth
│       ├── home/page.tsx        # Home com os dois módulos
│       ├── habilitacoes/page.tsx
│       └── propostas/
│           ├── page.tsx         # Lista de propostas
│           └── cadastro/page.tsx # Formulário completo
├── components/layout/
│   └── Topbar.tsx               # Topbar com usuário do JWT
├── contexts/
│   ├── AuthContext.tsx          # user, login(), logout()
│   └── FormDataContext.tsx      # GET /form/list — tipoHabilitacao, diligencia, technicians, cnes
├── lib/
│   ├── api.ts                   # Axios instance (base URL + Authorization header)
│   └── auth.ts                  # Mock login, JWT decode, token storage
├── theme/
│   └── theme.ts                 # MUI theme com paleta verde/amarela do SAH
└── types/
    └── index.ts                 # Todos os tipos TypeScript
```

---

## Decisões de arquitetura

| Tópico | Decisão |
|---|---|
| **Framework** | Next.js 16 App Router |
| **UI** | MUI v6 + emotion |
| **Auth** | Mock local — token JWT falso em `localStorage` |
| **API** | `axios` com interceptor de Authorization |
| **User no header** | Decodificado do JWT com `jwt-decode` |
| **Situações** | Estáticas (não consomem API) |
| **Técnicos** | Via `GET /form/list` → `data.technicians` |
| **Diligências** | Via `GET /form/list` → `data.info.diligencia` |
| **CNES lookup** | Mock local (CNES_DB no próprio componente) |
| **Data de trabalho** | `DatePicker` habilitado com `@mui/x-date-pickers` |

---

## TODO — integrar com API real

### 1. Login real
Em `src/lib/auth.ts`, substituir o bloco mock em `login()`:

```ts
// ANTES (mock)
await new Promise((r) => setTimeout(r, 1000));
const mockToken = buildMockJwt({ ... });
saveToken(mockToken);

// DEPOIS (real)
const res = await api.post<{ token: string }>('/login', credentials);
saveToken(res.data.token);
```

### 2. Salvar proposta
Em `src/app/(app)/propostas/cadastro/page.tsx`:
- `handleSaveDraft()` → `PUT /form/:id` com `options.existing: true`
- `handleSubmit()` → `PUT /form/:id` com payload completo

### 3. CNES real
Substituir `CNES_DB` em `cadastro/page.tsx` por chamada à API do DATASUS
ou endpoint próprio quando disponível.

---

## Variáveis de ambiente

| Variável | Descrição | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL da API | `http://localhost:2000` |
