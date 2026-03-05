import { useState, useEffect } from "react";

// ─── BRAND TOKENS ───────────────────────────────────────────────────────────────
const C = {
  navy: { black: "#0F1419", dark: "#12172B", DEFAULT: "#1A202C", slate: "#2D3748", slateLight: "#4A5568" },
  gold: { DEFAULT: "#DDAC63", dark: "#B8860B", bronze: "#8B6914", cream: "#F5D89A", creamLight: "#FFF4D9" },
  neutral: { offWhite: "#EBEBEE", lightGray: "#DFDFE1", slateBlue: "#394E6C" },
  teal: "#52BEC0",
  sem: { success: "#22C55E", warning: "#F59E0B", error: "#EF4444", info: "#3B82F6" },
};
const FONT = "'Telegraf', 'Inter', -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const MOTION = "250ms cubic-bezier(0.4, 0, 0.2, 1)";

// ─── LOGO SVG COMPONENTS ────────────────────────────────────────────────────────
function LogoFull({ color = "white", goldColor = "#DDAC63", height = 48 }) {
  const scale = height / 89;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={464 * scale} height={height} viewBox="0 0 464 89" fill="none">
      <mask id="mf0" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="27" y="0" width="86" height="89"><path d="M27.5 0.297H112.922V88.693H27.5V0.297Z" fill="white"/></mask>
      <g mask="url(#mf0)"><path d="M49.307 29.109L28.037 86.063C27.516 87.453 28.542 88.927 30.021 88.927H48.115C49.016 88.927 49.818 88.359 50.115 87.516L55.167 73.214L61.281 54.896C61.427 54.464 61.427 53.995 61.287 53.563L53.313 29.193C52.688 27.287 50.005 27.229 49.307 29.109ZM79.344 0.292H63.203C61.74 0.292 60.719 1.734 61.198 3.109L70.26 29.245L70.271 29.208L85.146 73.214L90.302 87.526C90.604 88.37 91.406 88.927 92.297 88.927H110.839C112.323 88.927 113.349 87.453 112.828 86.063L81.328 1.677C81.021 0.844 80.229 0.292 79.344 0.292Z" fill={color}/></g>
      <path d="M143.725 88.063C139.736 88.063 135.819 87.375 131.975 86L128.309 71.521C130.694 73.469 133.147 75.016 135.663 76.167C138.189 77.323 140.954 77.896 143.954 77.896C146.34 77.896 148.194 77.458 149.517 76.583C150.835 75.708 151.496 74.5 151.496 72.958V72.792C151.496 72.042 151.355 71.386 151.079 70.813C150.814 70.245 150.293 69.708 149.517 69.208C148.736 68.708 147.663 68.208 146.288 67.708C144.923 67.208 143.147 66.688 140.954 66.146C138.314 65.495 135.918 64.771 133.767 63.979C131.626 63.177 129.809 62.188 128.309 61.021C126.809 59.844 125.647 58.386 124.829 56.646C124.006 54.896 123.6 52.724 123.6 50.125V49.979C123.6 47.594 124.043 45.438 124.934 43.521C125.835 41.594 127.1 39.932 128.725 38.542C130.35 37.141 132.277 36.063 134.517 35.313C136.767 34.563 139.236 34.188 141.934 34.188C145.767 34.188 149.288 34.766 152.496 35.917C155.715 37.073 158.673 38.719 161.371 40.854L155.392 49.542C153.043 47.948 150.746 46.688 148.496 45.771C146.256 44.844 144.017 44.375 141.767 44.375C139.527 44.375 137.85 44.813 136.725 45.688C135.6 46.552 135.038 47.636 135.038 48.938V49.083C135.038 49.932 135.194 50.667 135.517 51.292C135.85 51.917 136.439 52.479 137.288 52.979C138.131 53.479 139.293 53.953 140.767 54.396C142.236 54.844 144.09 55.365 146.329 55.958C148.98 56.667 151.34 57.458 153.413 58.333C155.48 59.198 157.225 60.24 158.642 61.458C160.069 62.682 161.147 64.12 161.871 65.771C162.59 67.412 162.954 69.375 162.954 71.667V71.833C162.954 74.417 162.475 76.724 161.517 78.75C160.569 80.766 159.251 82.458 157.559 83.833C155.861 85.208 153.84 86.261 151.496 86.979C149.147 87.698 146.559 88.063 143.725 88.063Z" fill={color}/>
      <path d="M228.201 34.938H267.701V45.188H239.639V55.813H264.326V66.063H239.639V77.063H268.076V87.313H228.201V34.938Z" fill={color}/>
      <path d="M197.505 88.208C193.672 88.208 190.109 87.511 186.818 86.125C183.526 84.724 180.677 82.813 178.276 80.396C175.886 77.979 174.016 75.125 172.672 71.833C171.323 68.542 170.651 65.021 170.651 61.271V61.125C170.651 57.391 171.323 53.891 172.672 50.625C174.016 47.349 175.886 44.479 178.276 42.021C180.677 39.552 183.547 37.604 186.88 36.188C190.224 34.761 193.922 34.042 197.964 34.042C200.406 34.042 202.636 34.245 204.651 34.646C206.677 35.052 208.511 35.599 210.151 36.292C211.802 36.99 213.323 37.833 214.714 38.833C216.115 39.833 217.412 40.932 218.609 42.125L211.276 50.583C209.234 48.74 207.151 47.292 205.026 46.25C202.912 45.198 200.531 44.667 197.88 44.667C195.682 44.667 193.651 45.094 191.776 45.938C189.912 46.787 188.307 47.958 186.964 49.458C185.615 50.958 184.568 52.698 183.818 54.667C183.068 56.625 182.693 58.729 182.693 60.979V61.125C182.693 63.375 183.068 65.5 183.818 67.5C184.568 69.49 185.599 71.229 186.922 72.729C188.255 74.219 189.849 75.396 191.714 76.271C193.589 77.146 195.641 77.583 197.88 77.583C200.88 77.583 203.412 77.037 205.484 75.938C207.552 74.844 209.609 73.349 211.651 71.458L218.984 78.854C217.636 80.302 216.24 81.599 214.797 82.75C213.349 83.906 211.766 84.891 210.047 85.708C208.323 86.531 206.443 87.146 204.401 87.563C202.359 87.99 200.057 88.208 197.505 88.208Z" fill={color}/>
      <path d="M278.33 34.938H288.955L313.476 67.188V34.938H324.851V87.313H315.059L289.684 54.021V87.313H278.33V34.938Z" fill={color}/>
      <path d="M335.854 78.563L364.666 45.042H336.749V34.938H379.479V43.688L350.666 77.208H379.479V87.313H335.854V78.563Z" fill={color}/>
      <path d="M390.941 34.938H402.462V87.313H390.941V34.938Z" fill={goldColor}/>
      <mask id="mf1" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="411" y="34" width="53" height="55"><path d="M411.234 34.927H463.875V88.563H411.234V34.927Z" fill="white"/></mask>
      <g mask="url(#mf1)"><path d="M424.469 52.427L411.552 87.021C411.234 87.865 411.859 88.766 412.755 88.766H423.745C424.292 88.766 424.781 88.417 424.964 87.906L428.031 79.219L431.745 68.089C431.833 67.828 431.833 67.547 431.745 67.281L426.901 52.479C426.526 51.323 424.896 51.287 424.469 52.427ZM442.714 34.927H432.911C432.026 34.927 431.401 35.797 431.693 36.635L437.198 52.51L437.208 52.49L446.24 79.219L449.375 87.912C449.557 88.422 450.042 88.766 450.583 88.766H461.849C462.75 88.766 463.37 87.865 463.057 87.026L443.922 35.766C443.734 35.26 443.255 34.927 442.714 34.927Z" fill={goldColor}/></g>
      <mask id="mf2" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="118" height="89"><path d="M0.651 0.297H117.667V88.693H0.651V0.297Z" fill="white"/></mask>
      <g mask="url(#mf2)"><path d="M77.662 0.297C77.662 0.297 51.318 0.797 52.073 7.823C52.823 14.849 103.245 22.625 97.729 31.401C92.208 40.182 0.646 45.479 0.901 88.734H66.391C66.391 88.734 58.844 65.516 76.406 54.229C93.964 42.943 126.323 36.922 114.031 26.135C101.74 15.349 57.417 12.313 57.589 7.068C57.729 2.948 77.662 0.297 77.662 0.297Z" fill={goldColor}/></g>
    </svg>
  );
}

function LogoIcon({ goldColor = "#DDAC63", height = 56 }) {
  const scale = height / 89;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={118 * scale} height={height} viewBox="0 0 118 89" fill="none">
      <mask id="mi0" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="27" y="0" width="86" height="89"><path d="M27.5 0.297H112.922V88.693H27.5V0.297Z" fill="white"/></mask>
      <g mask="url(#mi0)"><path d="M49.307 29.109L28.037 86.063C27.516 87.453 28.542 88.927 30.021 88.927H48.115C49.016 88.927 49.818 88.359 50.115 87.516L55.167 73.214L61.281 54.896C61.427 54.464 61.427 53.995 61.287 53.563L53.313 29.193C52.688 27.287 50.005 27.229 49.307 29.109ZM79.344 0.292H63.203C61.74 0.292 60.719 1.734 61.198 3.109L70.26 29.245L70.271 29.208L85.146 73.214L90.302 87.526C90.604 88.37 91.406 88.927 92.297 88.927H110.839C112.323 88.927 113.349 87.453 112.828 86.063L81.328 1.677C81.021 0.844 80.229 0.292 79.344 0.292Z" fill="white"/></g>
      <mask id="mi2" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="118" height="89"><path d="M0.651 0.297H117.667V88.693H0.651V0.297Z" fill="white"/></mask>
      <g mask="url(#mi2)"><path d="M77.662 0.297C77.662 0.297 51.318 0.797 52.073 7.823C52.823 14.849 103.245 22.625 97.729 31.401C92.208 40.182 0.646 45.479 0.901 88.734H66.391C66.391 88.734 58.844 65.516 76.406 54.229C93.964 42.943 126.323 36.922 114.031 26.135C101.74 15.349 57.417 12.313 57.589 7.068C57.729 2.948 77.662 0.297 77.662 0.297Z" fill={goldColor}/></g>
    </svg>
  );
}

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.cdnfonts.com/css/telegraf');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:${FONT};background:${C.navy.black};color:${C.neutral.offWhite};-webkit-font-smoothing:antialiased}
::selection{background:${C.gold.DEFAULT};color:${C.navy.black}}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.navy.dark}}::-webkit-scrollbar-thumb{background:${C.navy.slateLight};border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
`;

// ─── REUSABLE ───────────────────────────────────────────────────────────────────
function SectionTitle({ num, title, sub }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.gold.DEFAULT, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8, fontFamily: MONO }}>{num}</div>
      <h2 style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.neutral.offWhite, letterSpacing: "-0.025em", marginBottom: 8 }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, color: C.neutral.slateBlue, maxWidth: 640, lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

function Card({ children, style: s = {}, glow = false }) {
  return <div style={{ padding: 28, background: C.navy.dark, borderRadius: 16, border: `1px solid ${glow ? C.gold.DEFAULT + "30" : C.navy.slate + "66"}`, ...s }}>{children}</div>;
}

function Tag({ children, color = C.gold.DEFAULT }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: `${color}15`, border: `1px solid ${color}30`, fontSize: 12, fontWeight: 600, color }}>{children}</span>;
}

// ─── CHAPTER 1: BRAND STRATEGY ──────────────────────────────────────────────────
function BrandStrategy() {
  return (
    <section id="strategy" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle num="01" title="Stratégie de Marque" sub="L'ADN d'Ascenzia : archétype, histoire fondatrice, matrice de voix et hiérarchie de messaging." />

        {/* ARCHETYPE */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
          <Card glow>
            <Tag>Archétype principal</Tag>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: C.neutral.offWhite, marginTop: 16, marginBottom: 8, letterSpacing: "-0.02em" }}>Le Souverain</h3>
            <p style={{ fontSize: 15, color: C.neutral.slateBlue, lineHeight: 1.7, marginBottom: 20 }}>
              L'archétype du Souverain incarne l'autorité, le contrôle et la responsabilité. Comme la tour de contrôle d'un aéroport, Ascenzia ne pilote pas les avions — elle garantit que chacun d'eux se pose en sécurité. Le Souverain crée l'ordre dans le chaos. Il rassure par la compétence, pas par la promesse.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Contrôle", "Vision", "Responsabilité", "Ordre", "Protection"].map(t => <Tag key={t} color={C.gold.cream}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <Tag color={C.teal}>Archétype secondaire</Tag>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: C.neutral.offWhite, marginTop: 16, marginBottom: 8, letterSpacing: "-0.02em" }}>L'Explorateur</h3>
            <p style={{ fontSize: 15, color: C.neutral.slateBlue, lineHeight: 1.7, marginBottom: 20 }}>
              L'Explorateur pousse les frontières de l'innovation souveraine. Tandis que le marché suit les géants US, Ascenzia trace une voie européenne indépendante. Ce n'est pas de la rébellion — c'est de la souveraineté technologique assumée. Comme SpaceX qui a redéfini l'accès à l'espace, Ascenzia redéfinit l'accès à l'IA de confiance.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Innovation", "Indépendance", "Audace", "Territoire", "Pionniers"].map(t => <Tag key={t} color={C.teal}>{t}</Tag>)}
            </div>
          </Card>
        </div>

        {/* ORIGIN STORY */}
        <Card style={{ marginBottom: 48, background: `linear-gradient(135deg, ${C.navy.dark} 0%, ${C.navy.slate}40 100%)` }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: C.gold.DEFAULT, marginBottom: 16 }}>Histoire Fondatrice</h3>
          <blockquote style={{ fontSize: 18, color: C.neutral.offWhite, lineHeight: 1.8, fontStyle: "italic", borderLeft: `3px solid ${C.gold.DEFAULT}`, paddingLeft: 24, maxWidth: 800 }}>
            "Les entreprises européennes se retrouvent avec 12 agents IA en moyenne, sans visibilité, sans contrôle. Personne ne construit l'infrastructure de confiance. Tout le monde veut créer des agents. Personne ne veut les rendre fiables. Ascenzia est née de ce constat : le marché a besoin d'une tour de contrôle, pas d'un énième cockpit."
          </blockquote>
          <p style={{ fontSize: 14, color: C.neutral.slateBlue, marginTop: 12 }}>— Laurent Fontaine, Fondateur & CSO</p>
        </Card>

        {/* VOICE MATRIX */}
        <h3 style={{ fontSize: 22, fontWeight: 700, color: C.neutral.offWhite, marginBottom: 20 }}>Matrice de Voix Tonale</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, borderRadius: 16, overflow: "hidden", marginBottom: 48 }}>
          {[
            { axis: "Industrielle", desc: "Rigueur, fiabilité, prévisibilité", tone: "Précis. Chaque mot compte. Pas de superlatif.", example: "Score de santé : 94/100. Latence : 120ms. Uptime : 99.97%.", color: C.gold.DEFAULT },
            { axis: "Souveraine", desc: "Maîtrise, indépendance, juridiction", tone: "Affirmé. Revendiqué. Jamais arrogant.", example: "Infrastructure 100% FR/CH. Aucune dépendance hyperscaler US.", color: C.teal },
            { axis: "Pragmatique", desc: "Concret, mesurable, actionnable", tone: "Direct. Résultats d'abord. Process first.", example: "3 cas d'usage à fort ROI en 5 jours, ou l'audit est offert.", color: C.sem.success },
            { axis: "Rassurante", desc: "Sérénité, accompagnement, confiance", tone: "Calme. Présent. La sérénité comme service.", example: "SOC 24/7. Self-healing. Vous dormez, Sentinel veille.", color: C.sem.info },
          ].map((v, i) => (
            <div key={i} style={{ padding: 24, background: C.navy.dark }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: v.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{v.axis}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 4 }}>{v.desc}</div>
              <div style={{ fontSize: 13, color: C.neutral.slateBlue, lineHeight: 1.6, marginBottom: 12 }}>{v.tone}</div>
              <div style={{ fontSize: 12, fontFamily: MONO, color: C.gold.cream, background: `${C.navy.slate}80`, padding: "8px 12px", borderRadius: 8, lineHeight: 1.5 }}>"{v.example}"</div>
            </div>
          ))}
        </div>

        {/* MESSAGING HIERARCHY */}
        <h3 style={{ fontSize: 22, fontWeight: 700, color: C.neutral.offWhite, marginBottom: 20 }}>Hiérarchie de Messaging</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { level: "M1 — Positionnement", msg: "La Tour de Contrôle Souveraine des Agents IA", context: "Toute communication. Pitch elevator. Bio LinkedIn.", size: 28, color: C.gold.DEFAULT },
            { level: "M2 — Tagline", msg: "Agrégez. Observez. Sécurisez. Pilotez.", context: "Hero section. Signature email. Slides.", size: 22, color: C.neutral.offWhite },
            { level: "M3 — Promesse", msg: "Ascenzia ne crée pas des agents. Ascenzia les rend dignes de confiance.", context: "Conclusion de présentation. CTA. Landing pages.", size: 18, color: C.gold.cream },
            { level: "M4 — Preuve sociale", msg: "×7 en 5 ans — 52,62 Md$ — 80% des Fortune 500 touchées — 12 agents sans supervision", context: "Data walls. Supports de vente. Sections chiffres clés.", size: 16, color: C.teal },
            { level: "M5 — Garantie", msg: "Si nous ne trouvons pas 3 cas d'usage à fort ROI, l'audit est offert.", context: "Pages pricing. Emails de closing. Séquences LinkedIn.", size: 15, color: C.sem.success },
          ].map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 260px", gap: 24, padding: "20px 24px", background: i % 2 === 0 ? `${C.navy.slate}30` : C.navy.dark, alignItems: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.gold.DEFAULT, fontFamily: MONO }}>{m.level}</div>
              <div style={{ fontSize: m.size, fontWeight: 700, color: m.color, letterSpacing: "-0.01em", lineHeight: 1.3, fontFamily: FONT }}>{m.msg}</div>
              <div style={{ fontSize: 12, color: C.neutral.slateBlue, lineHeight: 1.5 }}>{m.context}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 2: LOGO ────────────────────────────────────────────────────────────
function LogoChapter() {
  return (
    <section id="logo" style={{ padding: "80px 0", borderTop: `1px solid ${C.navy.slate}22` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle num="02" title="Logo & Marque" sub="Le logo Ascenzia se compose de trois éléments : la Vague (élan), le Double Chevron A (contrôle), et le IA doré (intelligence artificielle)." />

        {/* ANATOMY */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Anatomie du Logo</h3>
        <Card style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", padding: 48, background: `linear-gradient(135deg, ${C.navy.dark} 0%, ${C.navy.slate}30 100%)` }}>
          <div style={{ textAlign: "center" }}>
            <LogoFull height={64} />
            <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 32 }}>
              {[
                { label: "La Vague", desc: "Mouvement, élan, trajectoire ascendante", color: C.gold.DEFAULT },
                { label: "Double Chevron A", desc: "Contrôle, précision, structure", color: C.neutral.offWhite },
                { label: "SCENZI", desc: "Wordmark Telegraf Bold", color: C.neutral.offWhite },
                { label: "IA doré", desc: "Intelligence Artificielle — identité or", color: C.gold.DEFAULT },
              ].map((p, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, margin: "0 auto 8px" }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: C.neutral.slateBlue, maxWidth: 140 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* VARIATIONS */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Variations</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {/* Full on dark */}
          <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, background: C.navy.black }}>
            <LogoFull color="white" height={40} />
            <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: C.neutral.slateBlue }}>Full — Fond sombre</div>
            <Tag color={C.sem.success}>Primary</Tag>
          </Card>
          {/* Full on light */}
          <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, background: C.neutral.offWhite }}>
            <LogoFull color="#0D0A2C" height={40} />
            <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: C.navy.DEFAULT }}>Full — Fond clair</div>
            <Tag color={C.navy.DEFAULT}>Secondary</Tag>
          </Card>
          {/* Icon only */}
          <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, background: C.navy.dark }}>
            <LogoIcon height={48} />
            <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: C.neutral.slateBlue }}>Icône seule</div>
            <Tag color={C.gold.DEFAULT}>App / Favicon</Tag>
          </Card>
        </div>

        {/* SAFE ZONES */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Zone de protection & Taille minimale</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <Card style={{ textAlign: "center", padding: 40 }}>
            <div style={{ display: "inline-block", border: `2px dashed ${C.gold.DEFAULT}40`, padding: "32px 48px", borderRadius: 8 }}>
              <LogoFull height={36} />
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: C.neutral.slateBlue }}>Safe zone = hauteur du «A» doré sur chaque côté</div>
            <div style={{ fontSize: 12, fontFamily: MONO, color: C.gold.cream, marginTop: 4 }}>Minimum padding: 1× logo height</div>
          </Card>
          <Card style={{ padding: 32 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Tailles minimales</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { ctx: "Print", min: "25mm de large", icon: "🖨" },
                { ctx: "Digital (full)", min: "120px de large", icon: "🖥" },
                { ctx: "Digital (icon)", min: "32×32px", icon: "📱" },
                { ctx: "Favicon", min: "16×16px", icon: "🔖" },
              ].map(s => (
                <div key={s.ctx} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: `${C.navy.slate}40`, borderRadius: 8 }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.neutral.offWhite }}>{s.ctx}</div>
                    <div style={{ fontSize: 12, fontFamily: MONO, color: C.gold.cream }}>{s.min}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* DO'S & DON'TS */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Utilisation du Logo</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { ok: true, title: "Fond sombre uni", desc: "Navy Black ou Navy Dark recommandé" },
            { ok: true, title: "Fond clair uni", desc: "Off-White ou blanc pur" },
            { ok: true, title: "Monochrome blanc", desc: "Sur photos sombres, vidéos" },
            { ok: false, title: "Sur photo chargée", desc: "Jamais sans overlay sombre" },
            { ok: false, title: "Déformer ou pivoter", desc: "Toujours conserver les proportions" },
            { ok: false, title: "Changer les couleurs", desc: "Gold = #DDAC63 uniquement" },
          ].map((r, i) => (
            <div key={i} style={{ padding: 20, background: `${r.ok ? C.sem.success : C.sem.error}08`, borderRadius: 12, border: `1px solid ${r.ok ? C.sem.success : C.sem.error}25` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: r.ok ? C.sem.success : C.sem.error, marginBottom: 4 }}>{r.ok ? "✓ DO" : "✕ DON'T"} — {r.title}</div>
              <div style={{ fontSize: 13, color: C.neutral.slateBlue }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 3: COLORS ──────────────────────────────────────────────────────────
function ColorsChapter() {
  const palettes = [
    { title: "Navy", colors: [
      { name: "Navy Black", hex: "#0F1419", rgb: "15, 20, 25", cmyk: "40, 20, 0, 90", pantone: "Black 6 C" },
      { name: "Navy Dark", hex: "#12172B", rgb: "18, 23, 43", cmyk: "58, 47, 0, 83", pantone: "289 C" },
      { name: "Navy", hex: "#1A202C", rgb: "26, 32, 44", cmyk: "41, 27, 0, 83", pantone: "296 C" },
      { name: "Slate", hex: "#2D3748", rgb: "45, 55, 72", cmyk: "38, 24, 0, 72", pantone: "7545 C" },
      { name: "Slate Light", hex: "#4A5568", rgb: "74, 85, 104", cmyk: "29, 18, 0, 59", pantone: "7546 C" },
    ]},
    { title: "Gold", colors: [
      { name: "Gold", hex: "#DDAC63", rgb: "221, 172, 99", cmyk: "0, 22, 55, 13", pantone: "7407 C" },
      { name: "Gold Dark", hex: "#B8860B", rgb: "184, 134, 11", cmyk: "0, 27, 94, 28", pantone: "7555 C" },
      { name: "Bronze", hex: "#8B6914", rgb: "139, 105, 20", cmyk: "0, 24, 86, 45", pantone: "7556 C" },
      { name: "Cream", hex: "#F5D89A", rgb: "245, 216, 154", cmyk: "0, 12, 37, 4", pantone: "7403 C" },
      { name: "Cream Light", hex: "#FFF4D9", rgb: "255, 244, 217", cmyk: "0, 4, 15, 0", pantone: "7401 C" },
    ]},
  ];

  return (
    <section id="colors" style={{ padding: "80px 0", borderTop: `1px solid ${C.navy.slate}22` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle num="03" title="Système de Couleurs" sub="Navy + Gold : l'autorité du cockpit, la chaleur de la confiance. Hex, RGB, CMYK, Pantone." />

        {palettes.map(p => (
          <div key={p.title} style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>{p.title} Family</h3>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${p.colors.length}, 1fr)`, gap: 2, borderRadius: 16, overflow: "hidden" }}>
              {p.colors.map(c => {
                const isLight = ["#F5D89A", "#FFF4D9", "#EBEBEE"].includes(c.hex);
                return (
                  <div key={c.hex}>
                    <div style={{ height: 100, background: c.hex, display: "flex", alignItems: "flex-end", padding: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: isLight ? C.navy.DEFAULT : "white" }}>{c.name}</span>
                    </div>
                    <div style={{ padding: 16, background: C.navy.dark, fontSize: 12, fontFamily: MONO, color: C.neutral.slateBlue, lineHeight: 2 }}>
                      <div><span style={{ color: C.gold.cream }}>HEX</span> {c.hex}</div>
                      <div><span style={{ color: C.gold.cream }}>RGB</span> {c.rgb}</div>
                      <div><span style={{ color: C.gold.cream }}>CMYK</span> {c.cmyk}</div>
                      <div><span style={{ color: C.gold.cream }}>PMS</span> {c.pantone}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Color rationale */}
        <Card style={{ marginTop: 24, background: `linear-gradient(135deg, ${C.navy.dark}, ${C.navy.slate}30)` }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: C.gold.DEFAULT, marginBottom: 12 }}>Justification chromatique</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontSize: 14, color: C.neutral.slateBlue, lineHeight: 1.7 }}>
            <div><span style={{ fontWeight: 600, color: C.neutral.offWhite }}>Navy (Dark Palette)</span> — Inspiré des cockpits aéronautiques et des interfaces de mission control (NASA, SpaceX). Le bleu-noir profond évoque la précision, la fiabilité et l'immersion technologique. Il permet un contraste maximal avec les indicateurs de couleur et les données en temps réel.</div>
            <div><span style={{ fontWeight: 600, color: C.neutral.offWhite }}>Gold (Accent)</span> — L'or signale l'autorité, la valeur et la confiance. Contrairement aux bleus technologiques omniprésents dans la cybersécurité, le Gold différencie Ascenzia de la concurrence. Il est réservé aux éléments d'action et aux points d'attention — jamais décoratif. L'or est industriel, pas luxe.</div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── CHAPTER 4: TYPOGRAPHY ──────────────────────────────────────────────────────
function TypoChapter() {
  return (
    <section id="typography" style={{ padding: "80px 0", borderTop: `1px solid ${C.navy.slate}22` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle num="04" title="Typographie" sub="Telegraf : géométrique, technique, lisible. Le choix d'une marque qui parle avec précision." />

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32, marginBottom: 48 }}>
          <Card>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.gold.DEFAULT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Primary — Telegraf</div>
            <div style={{ fontSize: 64, fontWeight: 700, color: C.neutral.offWhite, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 8 }}>Aa</div>
            <div style={{ fontSize: 24, fontWeight: 400, color: C.neutral.slateBlue, letterSpacing: "0.05em", marginBottom: 16 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            <div style={{ fontSize: 20, color: C.neutral.slateBlue, letterSpacing: "0.03em", marginBottom: 16 }}>abcdefghijklmnopqrstuvwxyz 0123456789</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[300, 400, 500, 600, 700].map(w => (
                <span key={w} style={{ padding: "6px 14px", borderRadius: 8, background: `${C.navy.slate}60`, fontSize: 14, fontWeight: w, color: C.neutral.offWhite }}>{w}</span>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.teal, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Monospace — JetBrains Mono</div>
            <div style={{ fontSize: 40, fontWeight: 500, fontFamily: MONO, color: C.neutral.offWhite, letterSpacing: "-0.02em", marginBottom: 8 }}>0xA3</div>
            <div style={{ fontSize: 14, fontFamily: MONO, color: C.neutral.slateBlue, lineHeight: 2 }}>
              <div>Score: 94/100</div>
              <div>LUKS2-AES-XTS512</div>
              <div>kill-switch: ACTIVE</div>
              <div>latency: 120ms</div>
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: C.neutral.slateBlue }}>Usage : données, métriques, code, spécifications techniques</div>
          </Card>
        </div>

        {/* Type scale */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Échelle Typographique — 9 niveaux</h3>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.navy.slate}44` }}>
          {[
            { name: "Display", size: 56, weight: 700, px: "72 → 40", use: "Landing hero, chiffre clé" },
            { name: "H1", size: 40, weight: 700, px: "56 → 32", use: "Titre de page" },
            { name: "H2", size: 32, weight: 700, px: "40 → 28", use: "Titre de section" },
            { name: "H3", size: 26, weight: 600, px: "32 → 24", use: "Sous-section" },
            { name: "H4", size: 22, weight: 600, px: "24 → 20", use: "Titre de carte" },
            { name: "H5", size: 18, weight: 500, px: "20 → 18", use: "Labels, catégories" },
            { name: "Body L", size: 17, weight: 400, px: "18 → 16", use: "Texte long premium" },
            { name: "Body", size: 15, weight: 400, px: "16 → 15", use: "Texte courant" },
            { name: "Caption", size: 13, weight: 400, px: "13 → 12", use: "Notes, metadata" },
          ].map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 120px 180px", alignItems: "baseline", padding: "16px 24px", background: i % 2 === 0 ? `${C.navy.slate}20` : "transparent", borderBottom: `1px solid ${C.navy.slate}22` }}>
              <span style={{ fontSize: 12, fontFamily: MONO, color: C.gold.DEFAULT }}>{t.name}</span>
              <span style={{ fontSize: Math.min(t.size, 42), fontWeight: t.weight, color: C.neutral.offWhite, letterSpacing: "-0.02em" }}>Tour de Contrôle</span>
              <span style={{ fontSize: 11, fontFamily: MONO, color: C.neutral.slateBlue, textAlign: "right" }}>{t.px}</span>
              <span style={{ fontSize: 12, color: C.neutral.slateBlue, textAlign: "right" }}>{t.use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 5: IMAGERY ─────────────────────────────────────────────────────────
function ImageryChapter() {
  return (
    <section id="imagery" style={{ padding: "80px 0", borderTop: `1px solid ${C.navy.slate}22` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle num="05" title="Style d'Imagerie" sub="Esthétique cockpit : dark, technique, data-driven. Jamais de robot bleu générique." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { title: "Dashboards & Data Viz", desc: "Captures d'écran stylisées de tableaux de bord. Scores de santé, traces, métriques temps réel. Dark mode obligatoire.", tags: ["Primary", "Hero sections"] },
            { title: "Schémas d'Architecture", desc: "Diagrammes techniques épurés montrant l'orchestration des agents. Lignes fines, nœuds Gold, flux directionnels.", tags: ["Features", "Documentation"] },
            { title: "Renders 3D & Abstract", desc: "Formes géométriques abstraites rappelant des réseaux neuronaux ou des constellations. Gold sur Navy. Blender/Three.js.", tags: ["Backgrounds", "Transitions"] },
          ].map((s, i) => (
            <Card key={i} style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 160, background: `linear-gradient(135deg, ${C.navy.dark} 0%, ${C.navy.slate} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {i === 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 20, width: "100%" }}>
                    {[94, 62, 87, 100].map((v, j) => (
                      <div key={j} style={{ padding: "8px 12px", background: `${C.navy.black}80`, borderRadius: 8, textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: MONO, color: v >= 80 ? C.sem.success : v >= 50 ? C.sem.warning : C.sem.error }}>{v}</div>
                        <div style={{ fontSize: 9, color: C.neutral.slateBlue }}>Agent {j + 1}</div>
                      </div>
                    ))}
                  </div>
                )}
                {i === 1 && (
                  <svg width="200" height="120" viewBox="0 0 200 120">
                    <circle cx="40" cy="60" r="16" fill="none" stroke={C.gold.DEFAULT} strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="100" cy="30" r="12" fill="none" stroke={C.gold.DEFAULT} strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="100" cy="90" r="12" fill="none" stroke={C.gold.DEFAULT} strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="160" cy="60" r="18" fill="none" stroke={C.gold.DEFAULT} strokeWidth="2"/>
                    <line x1="56" y1="52" x2="88" y2="35" stroke={C.gold.bronze} strokeWidth="1" opacity="0.4"/>
                    <line x1="56" y1="68" x2="88" y2="85" stroke={C.gold.bronze} strokeWidth="1" opacity="0.4"/>
                    <line x1="112" y1="35" x2="142" y2="55" stroke={C.gold.bronze} strokeWidth="1" opacity="0.4"/>
                    <line x1="112" y1="85" x2="142" y2="65" stroke={C.gold.bronze} strokeWidth="1" opacity="0.4"/>
                    <text x="160" y="64" textAnchor="middle" fill={C.gold.DEFAULT} fontSize="10" fontFamily={MONO}>CTRL</text>
                  </svg>
                )}
                {i === 2 && (
                  <div style={{ width: "100%", height: "100%", background: `radial-gradient(circle at 70% 40%, ${C.gold.DEFAULT}15, transparent 60%), radial-gradient(circle at 30% 70%, ${C.gold.bronze}10, transparent 50%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", border: `1px solid ${C.gold.DEFAULT}40`, animation: "float 3s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${C.gold.DEFAULT}20`, border: `1px solid ${C.gold.DEFAULT}50` }} />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: 20 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.neutral.offWhite, marginBottom: 6 }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: C.neutral.slateBlue, lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 6 }}>{s.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Do's / Don'ts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card style={{ background: `${C.sem.success}06`, border: `1px solid ${C.sem.success}20` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.sem.success, marginBottom: 12 }}>Style d'imagerie — DO</h4>
            {["Dashboards dark mode avec données réelles", "Schémas d'architecture minimalistes", "Photographies industrielles (data centers, cockpits)", "Renders 3D abstraits Gold sur Navy", "Animations subtiles de particules / réseaux", "Icônes filaires monochromes (Gold ou Off-White)"].map(d => (
              <div key={d} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: C.neutral.offWhite }}>
                <span style={{ color: C.sem.success }}>✓</span> {d}
              </div>
            ))}
          </Card>
          <Card style={{ background: `${C.sem.error}06`, border: `1px solid ${C.sem.error}20` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.sem.error, marginBottom: 12 }}>Style d'imagerie — DON'T</h4>
            {["Robot humanoïde bleu (cliché IA)", "Cerveaux lumineux ou neurones néon", "Stock photos génériques de bureau", "Illustrations flat design colorées", "Gradients arc-en-ciel ou violets", "Photos de personnes avec filtres IA"].map(d => (
              <div key={d} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: C.neutral.offWhite }}>
                <span style={{ color: C.sem.error }}>✕</span> {d}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 6: APPLICATIONS ────────────────────────────────────────────────────
function ApplicationsChapter() {
  return (
    <section id="applications" style={{ padding: "80px 0", borderTop: `1px solid ${C.navy.slate}22` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle num="06" title="Applications" sub="Favicon, OG images, icônes, signatures, templates — la marque en action." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {/* Favicon */}
          <Card style={{ textAlign: "center", padding: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: C.navy.DEFAULT, border: `1px solid ${C.navy.slate}`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <LogoIcon height={28} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.neutral.offWhite }}>Favicon</div>
            <div style={{ fontSize: 11, fontFamily: MONO, color: C.neutral.slateBlue }}>32×32 · 16×16</div>
            <div style={{ fontSize: 11, color: C.neutral.slateBlue, marginTop: 4 }}>Icône seule, fond Navy</div>
          </Card>
          {/* App icon */}
          <Card style={{ textAlign: "center", padding: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${C.navy.dark}, ${C.navy.DEFAULT})`, border: `1px solid ${C.navy.slate}`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogoIcon height={36} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.neutral.offWhite }}>App Icon</div>
            <div style={{ fontSize: 11, fontFamily: MONO, color: C.neutral.slateBlue }}>512×512 · 192×192</div>
            <div style={{ fontSize: 11, color: C.neutral.slateBlue, marginTop: 4 }}>PWA, App Store</div>
          </Card>
          {/* OG Image */}
          <Card style={{ textAlign: "center", padding: 32 }}>
            <div style={{ width: "100%", aspectRatio: "1200/630", borderRadius: 8, background: `linear-gradient(135deg, ${C.navy.black}, ${C.navy.dark})`, border: `1px solid ${C.navy.slate}`, margin: "0 auto 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 12 }}>
              <LogoFull height={16} />
              <div style={{ fontSize: 7, color: C.gold.DEFAULT, marginTop: 6, fontWeight: 700 }}>Tour de Contrôle IA</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.neutral.offWhite }}>OG / Meta Image</div>
            <div style={{ fontSize: 11, fontFamily: MONO, color: C.neutral.slateBlue }}>1200×630</div>
          </Card>
          {/* Email signature */}
          <Card style={{ textAlign: "center", padding: 32 }}>
            <div style={{ background: C.navy.dark, borderRadius: 8, padding: 12, border: `1px solid ${C.navy.slate}`, margin: "0 auto 16px", textAlign: "left" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.neutral.offWhite }}>Laurent Fontaine</div>
              <div style={{ fontSize: 8, color: C.gold.DEFAULT }}>Fondateur & CSO</div>
              <div style={{ height: 1, background: C.gold.DEFAULT, margin: "6px 0", opacity: 0.3 }} />
              <div style={{ fontSize: 7, color: C.neutral.slateBlue, lineHeight: 1.6 }}>
                laurent.fontaine@ascenzia.fr<br/>
                ascenzia.fr · FR/CH Souverain
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.neutral.offWhite }}>Email Signature</div>
            <div style={{ fontSize: 11, fontFamily: MONO, color: C.neutral.slateBlue }}>600×200 max</div>
          </Card>
        </div>

        {/* Icon system */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: C.neutral.offWhite, marginBottom: 16 }}>Système d'icônes</h3>
        <Card>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { icon: "⊕", label: "Agréger" }, { icon: "◉", label: "Observer" }, { icon: "⊘", label: "Sécuriser" }, { icon: "◈", label: "Piloter" },
              { icon: "⚡", label: "Kill-switch" }, { icon: "♦", label: "Score" }, { icon: "◎", label: "SOC" }, { icon: "⊞", label: "Dashboard" },
            ].map(ic => (
              <div key={ic.label} style={{ width: 72, height: 72, borderRadius: 12, background: `${C.navy.slate}60`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <span style={{ fontSize: 22 }}>{ic.icon}</span>
                <span style={{ fontSize: 10, color: C.neutral.slateBlue }}>{ic.label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: C.neutral.slateBlue }}>
            Style : filaire, 24×24, stroke 1.5px. Lucide React recommandé. Couleur : Gold (#DDAC63) pour les primaires, Off-White (#EBEBEE) pour les secondaires. Jamais de couleurs pleines (filled) — toujours outline.
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────────────────────────
function Sidebar({ active }) {
  const items = [
    { id: "strategy", label: "01 Stratégie" },
    { id: "logo", label: "02 Logo" },
    { id: "colors", label: "03 Couleurs" },
    { id: "typography", label: "04 Typographie" },
    { id: "imagery", label: "05 Imagerie" },
    { id: "applications", label: "06 Applications" },
  ];
  return (
    <nav style={{ position: "fixed", left: 0, top: 0, width: 190, height: "100vh", background: C.navy.dark, borderRight: `1px solid ${C.navy.slate}33`, padding: "24px 14px", display: "flex", flexDirection: "column", zIndex: 100 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gold.DEFAULT, letterSpacing: "-0.01em" }}>ASCENZIA</div>
        <div style={{ fontSize: 11, color: C.neutral.slateBlue }}>Brand Book v1.0</div>
      </div>
      {items.map(s => (
        <a key={s.id} href={`#${s.id}`} style={{ display: "block", padding: "8px 12px", borderRadius: 8, marginBottom: 2, fontSize: 13, fontWeight: active === s.id ? 600 : 400, color: active === s.id ? C.gold.DEFAULT : C.neutral.slateBlue, background: active === s.id ? `${C.gold.DEFAULT}10` : "transparent", textDecoration: "none", transition: MOTION, borderLeft: active === s.id ? `2px solid ${C.gold.DEFAULT}` : "2px solid transparent" }}>
          {s.label}
        </a>
      ))}
      <div style={{ marginTop: "auto", fontSize: 10, color: C.navy.slateLight, lineHeight: 1.6 }}>
        Confidentiel<br/>Ascenzia 2026
      </div>
    </nav>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────────
export default function AscenziaBrandBook() {
  const [active, setActive] = useState("strategy");

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Sidebar active={active} />
      <main style={{ marginLeft: 190, minHeight: "100vh" }}>
        {/* COVER */}
        <header style={{ padding: "100px 32px 80px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <LogoFull height={56} />
          <h1 style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.neutral.offWhite, letterSpacing: "-0.03em", marginTop: 32, lineHeight: 1.1 }}>
            Brand <span style={{ color: C.gold.DEFAULT }}>Book</span>
          </h1>
          <p style={{ fontSize: 18, color: C.neutral.slateBlue, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Identité de marque premium pour la Tour de Contrôle Souveraine des Agents IA
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            {["Archétype Souverain", "Navy + Gold", "Telegraf", "Dark-first", "Logo SVG", "Figma-ready"].map(t => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </header>

        <BrandStrategy />
        <LogoChapter />
        <ColorsChapter />
        <TypoChapter />
        <ImageryChapter />
        <ApplicationsChapter />
      </main>
    </>
  );
}
