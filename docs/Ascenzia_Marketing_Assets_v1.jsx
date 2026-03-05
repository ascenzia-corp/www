import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   ASCENZIA — Marketing Asset Factory
   Step 4 of 9 — Usine d'Actifs Marketing pour Site Web

   Hero banners, ad copy, email sequences, landing page copy,
   social posts, content outlines, A/B tests, visual direction
   ═══════════════════════════════════════════════════════════════ */

const T = {
  navy: { black: "#0F1419", dark: "#12172B", DEFAULT: "#1A202C", slate: "#2D3748", slateLight: "#4A5568" },
  gold: { DEFAULT: "#DDAC63", dark: "#B8860B", bronze: "#8B6914", cream: "#F5D89A", creamLight: "#FFF4D9" },
  neutral: { offWhite: "#EBEBEE", lightGray: "#DFDFE1", slateBlue: "#394E6C" },
  sem: { success: "#22C55E", warning: "#F59E0B", error: "#EF4444", info: "#3B82F6" },
  font: "'Telegraf','Inter',-apple-system,BlinkMacSystemFont,sans-serif",
  mono: "'JetBrains Mono','Fira Code',monospace",
  r: { sm: 4, md: 8, lg: 12, xl: 16 },
  m: { fast: "150ms ease", base: "250ms ease", slow: "400ms ease" }
};

// ═══════════════════════════════════════════════════
//  DATA: All marketing assets
// ═══════════════════════════════════════════════════

const messagingHierarchy = {
  M1: { level: "Positionnement", text: "L'infrastructure de contrôle souveraine pour vos agents IA." },
  M2: { level: "Tagline", text: "Agrégez. Observez. Sécurisez. Pilotez." },
  M3: { level: "Promesse", text: "Reprenez le contrôle de vos agents IA — en 5 jours." },
  M4: { level: "Preuve sociale", text: "80 % des Fortune 500 ont subi une faille liée à un agent IA autonome." },
  M5: { level: "Garantie", text: "3 cas d'usage ROI identifiés ou l'audit est offert." }
};

// ── HERO BANNERS ─────────────────────────────────
const heroBanners = [
  {
    id: "A",
    name: "Authority — Contrôle (Recommandé)",
    surtitre: "LA TOUR DE CONTRÔLE DE VOS AGENTS IA",
    headline: "Vos agents IA sont\nune bombe à retardement.",
    subhead: "12 agents en moyenne par entreprise. Zéro supervision centralisée. Ascenzia change la donne.",
    cta1: { label: "Auditer mes agents", style: "primary-gold" },
    cta2: { label: "Découvrir Sentinel", style: "ghost-white" },
    visual: "Particle grid animé — points lumineux connectés par des lignes dorées sur fond Navy.black. Les particules convergent vers un cockpit central.",
    gradient: "radial-gradient(ellipse at 30% 50%, #12172B 0%, #0F1419 70%)",
    abTest: "Variante A : peur + urgence. Headline négatif ('bombe à retardement') qui crée la tension. Surtitre positionne la solution. Optimal pour DSI/RSSI inquiets.",
    metrics: "Target CTR: 3.2% | Bounce < 35% | Scroll depth > 60%"
  },
  {
    id: "B",
    name: "Vision — Pilotage",
    surtitre: "PLATEFORME SENTINEL",
    headline: "Agrégez. Observez.\nSécurisez. Pilotez.",
    subhead: "Une plateforme souveraine. Quatre piliers. Le contrôle total de vos agents IA, depuis un cockpit unifié.",
    cta1: { label: "Réserver mon audit", style: "primary-gold" },
    cta2: { label: "Voir la plateforme", style: "ghost-white" },
    visual: "Dashboard Sentinel en 3D perspective (rotateX 5deg) flottant au centre. Stats animées : Score 94, 12 agents actifs, MTTR -47%.",
    gradient: "linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #12172B 100%)",
    abTest: "Variante B : confiance + solution. Les 4 verbes en headline. Montre le produit directement. Optimal pour profils techniques qui veulent voir avant d'agir.",
    metrics: "Target CTR: 2.8% | Bounce < 40% | Time on page > 45s"
  },
  {
    id: "C",
    name: "Social Proof — Marché",
    surtitre: "MARCHÉ IA AGENTIQUE : 7,3 Md$ → 139 Md$",
    headline: "79 % des entreprises\nadopteront l'IA agentique\nd'ici 2027.",
    subhead: "La question n'est plus « faut-il déployer ? » mais « comment garder le contrôle ? » Ascenzia a la réponse.",
    cta1: { label: "Auditer mes agents — 4 900 €", style: "primary-gold" },
    cta2: { label: "Télécharger le rapport", style: "ghost-white" },
    visual: "Graphique animé montrant la courbe exponentielle du marché (7.3B → 139B). Ligne Gold qui se dessine au scroll. Points de données qui apparaissent séquentiellement.",
    gradient: "linear-gradient(180deg, #0F1419 0%, #12172B 60%, #1A202C 100%)",
    abTest: "Variante C : données marché + FOMO. Chiffres massifs en headline. Prix visible dans CTA primaire (transparence). Optimal pour DG qui veut justifier l'investissement.",
    metrics: "Target CTR: 2.5% | Lead quality: higher | Avg deal size: +15%"
  }
];

// ── LANDING PAGE COPY ────────────────────────────
const landingPages = [
  {
    page: "Accueil",
    path: "/",
    sections: [
      { zone: "Hero", copy: { surtitre: "LA TOUR DE CONTRÔLE DE VOS AGENTS IA", h1: "Vos agents IA méritent un cockpit.", body: "L'infrastructure souveraine qui agrège, observe, sécurise et pilote tous vos agents IA — quel que soit le LLM, quel que soit le fournisseur.", cta: "Auditer mes agents", ctaSecondary: "Découvrir Sentinel" } },
      { zone: "Double Dette", copy: { surtitre: "LE PROBLÈME", h2: "Vos agents IA accumulent une double dette.", bodyLeft: "Dette technique — MTTR incontrôlé, coûts ×3 en 6 mois, agents fragiles sans monitoring.", bodyRight: "Dette sécuritaire — Surface d'attaque élargie, fuite de données, zéro audit trail, non-conformité AI Act.", transition: "Ascenzia résout les deux. Simultanément." } },
      { zone: "4 Piliers", copy: { surtitre: "LA SOLUTION", h2: "Une plateforme. Quatre piliers.", body: "Ascenzia Sentinel unifie le contrôle de vos agents IA en une infrastructure souveraine.", pillar1: "Agréger — Connectez tout agent, tout LLM, toute source. 300+ connecteurs. API unifiée.", pillar2: "Observer — Voyez tout en temps réel. Score de santé 0-100. Traces distribuées. Audit trail complet.", pillar3: "Sécuriser — Sécurité native, pas un add-on. Zero Trust. LUKS2-AES-XTS512. Kill-switch.", pillar4: "Piloter — Gardez le contrôle total. Self-healing. SOC 24/7. RBAC. MCO prédictif." } },
      { zone: "Dashboard Preview", copy: { surtitre: "EN ACTION", h2: "Votre cockpit de supervision IA.", body: "Visualisez la santé de chaque agent, détectez les anomalies avant qu'elles ne deviennent des incidents, et gardez le contrôle opérationnel depuis une interface unique.", stat1: "Score 94/100 — Santé globale", stat2: "12 agents actifs — Supervision temps réel", stat3: "-47% MTTR — Temps de résolution" } },
      { zone: "Social Proof", copy: { surtitre: "LE MARCHÉ", stats: ["7,3 Md$ — Marché IA agentique 2025", "×7 — Croissance en 5 ans", "79 % — Adoption prévue d'ici 2027", "45,8 % — TCAC jusqu'en 2034"], sources: "Sources : MarketsandMarkets, PwC, ZDNet" } },
      { zone: "CTA Band", copy: { h2: "Prêt à reprendre le contrôle ?", body: "3 cas d'usage ROI identifiés ou l'audit est offert. Garanti.", cta: "Réserver mon audit — 4 900 € HT", ctaSecondary: "ou découvrir la plateforme →" } }
    ]
  },
  {
    page: "Plateforme",
    path: "/plateforme",
    sections: [
      { zone: "Hero", copy: { surtitre: "PLATEFORME SENTINEL", h1: "L'infrastructure de contrôle pour vos agents IA.", body: "Agrégez, observez, sécurisez et pilotez tous vos agents depuis un cockpit unifié. LLM-agnostique. Souverain. Temps réel.", cta: "Demander une démo" } },
      { zone: "Pilier Agréger", copy: { h3: "Agrégez tout.", body: "Connectez n'importe quel agent IA, n'importe quel LLM, n'importe quelle source de données — en une API unifiée.", features: ["300+ connecteurs prêts à l'emploi", "LLM-agnostique : Claude, Gemini, Mistral, LLama, Kimi", "API unifiée REST + GraphQL", "Intégration en moins de 48h"] } },
      { zone: "Pilier Observer", copy: { h3: "Observez tout, en temps réel.", body: "Chaque action de chaque agent, tracée et scorée. Détectez les dérives avant qu'elles ne deviennent des incidents.", features: ["Score de santé 0-100 par agent", "Traces distribuées OpenTelemetry", "Audit trail complet et horodaté", "Dashboard de supervision en temps réel"] } },
      { zone: "Pilier Sécuriser", copy: { h3: "La sécurité n'est pas un module. C'est l'ADN.", body: "Chaque couche de Sentinel est conçue security-first. Pas de patch. Pas d'add-on. Du natif.", features: ["Architecture Zero Trust", "Chiffrement LUKS2-AES-XTS512", "EDR/MDR natif intégré", "Kill-switch instantané par agent"] } },
      { zone: "Pilier Piloter", copy: { h3: "Gardez le contrôle. Toujours.", body: "Opérationnel et stratégique. Du self-healing automatique aux décisions métier éclairées par la donnée.", features: ["Self-healing et auto-recovery", "SOC 24/7 avec alertes temps réel", "RBAC granulaire par rôle et périmètre", "MCO prédictif et anti-injection prompt"] } }
    ]
  },
  {
    page: "Audit",
    path: "/audit",
    sections: [
      { zone: "Hero", copy: { badge: "OFFRE D'ENTRÉE", h1: "Audit Tour de Contrôle IA", price: "4 900 € HT · 5 jours", body: "En 5 jours, nous auditons vos processus, identifions 3+ cas d'usage IA à fort ROI, et vous livrons une feuille de route actionnable.", guarantee: "Si nous ne trouvons pas 3 cas d'usage à fort ROI, l'audit est offert.", cta: "Réserver mon audit" } },
      { zone: "Process", copy: { h2: "5 jours. 3 cas d'usage. Garanti.", days: ["J1 — Cadrage & Kickoff : Alignement objectifs, cartographie SI, identification parties prenantes.", "J2 — Immersion Processus : Interviews métier, observation terrain, mapping des flux de données.", "J3 — Analyse IA : Scoring des processus, identification des gisements d'automatisation, pré-sélection agents.", "J4 — Design Agents : Architecture cible, calcul ROI par cas d'usage, matrice effort/impact.", "J5 — Livraison Roadmap : Présentation CODIR, feuille de route 90 jours, quick wins identifiés."] } },
      { zone: "Livrables", copy: { h2: "Ce que vous recevez.", items: ["Cartographie complète de vos processus IA-compatibles", "3+ cas d'usage détaillés avec ROI chiffré", "Architecture technique cible Sentinel", "Feuille de route 90 jours priorisée", "Présentation CODIR prête à l'emploi"] } }
    ]
  },
  {
    page: "Sécurité",
    path: "/securite",
    sections: [
      { zone: "Hero", copy: { surtitre: "SÉCURITÉ", h1: "La sécurité n'est pas un module.\nC'est l'ADN.", body: "Chaque agent est supervisé, chaque action tracée, chaque donnée chiffrée. Par défaut. Sans exception.", cta: "Voir l'architecture de sécurité" } },
      { zone: "Stats", copy: { stat1: "80 % des Fortune 500 ont subi une faille liée à un agent IA autonome — Microsoft Cyber Pulse 2026", stat2: "12 agents IA en moyenne par entreprise, sans supervision centralisée — ZDNet 2026" } }
    ]
  },
  {
    page: "Souveraineté",
    path: "/souverainete",
    sections: [
      { zone: "Hero", copy: { surtitre: "SOUVERAINETÉ", h1: "Vos données restent en France.\nToujours.", body: "Infrastructure 100 % FR/CH. Aucune dépendance hyperscaler US. Juridiction européenne exclusive. RGPD et AI Act natifs.", cta: "En savoir plus" } },
      { zone: "Specs", copy: { items: ["Hébergement : OVH, Scaleway, Infomaniak — 100 % FR/CH", "Chiffrement : LUKS2-AES-XTS512 — au repos et en transit", "Conformité : RGPD, AI Act, SecNumCloud-ready", "Juridiction : Européenne exclusive — aucune loi extraterritoriale US", "Audit : Trail complet, horodaté, non-altérable"] } }
    ]
  }
];

// ── EMAIL SEQUENCES ──────────────────────────────
const emailSequences = [
  {
    name: "Séquence Post-Audit Signup",
    trigger: "Formulaire audit soumis",
    emails: [
      {
        id: "E1", day: "J+0", delay: "Immédiat",
        subject: "Votre audit Tour de Contrôle IA est confirmé",
        subjectAB: "✓ Audit confirmé — voici la suite",
        preview: "Merci [Prénom]. Voici ce qui va se passer dans les prochaines 48h.",
        body: "Bonjour [Prénom],\n\nMerci pour votre confiance. Votre audit Tour de Contrôle IA est confirmé.\n\nVoici les prochaines étapes :\n\n1. Sous 24h — Un membre de notre équipe vous contacte pour cadrer l'audit.\n2. J1 — Kickoff et alignement avec vos équipes.\n3. J5 — Livraison de votre feuille de route IA.\n\nRappel de notre garantie : si nous n'identifions pas 3 cas d'usage à fort ROI, l'audit est offert.\n\nÀ très vite,\nL'équipe Ascenzia",
        cta: "Préparer mon audit →",
        ctaUrl: "/audit/preparation",
        notes: "Tone: Rassurant, professionnel. Confirme la décision. Réduit l'anxiété post-achat."
      },
      {
        id: "E2", day: "J+2", delay: "48h après signup",
        subject: "80 % des Fortune 500 ont subi une faille agent IA",
        subjectAB: "Ce que les DSI découvrent (trop tard) sur leurs agents IA",
        preview: "Un chiffre qui devrait vous empêcher de dormir. Et comment l'éviter.",
        body: "Bonjour [Prénom],\n\n80 % des Fortune 500 ont subi une faille de sécurité liée à un agent IA autonome (Microsoft Cyber Pulse, 2026).\n\nLe problème n'est pas l'IA. C'est l'absence de supervision.\n\nEn moyenne, une entreprise utilise 12 agents IA sans supervision centralisée. Chacun de ces agents :\n\n• Accède à des données sensibles\n• Prend des décisions autonomes\n• N'a aucun audit trail\n\nVotre audit va cartographier exactement cette surface de risque — et vous montrer comment la maîtriser.\n\nUne question avant le kickoff ? Répondez directement à cet email.",
        cta: "Lire : Comment les ETI reprennent le contrôle →",
        ctaUrl: "/ressources/controle-agents-ia",
        notes: "Tone: Alerte sans panique. Données marché sourcées. Éduque avant de vendre."
      },
      {
        id: "E3", day: "J+5", delay: "Veille du kickoff",
        subject: "Demain, on audite vos agents IA",
        subjectAB: "Prêt pour demain ? Voici comment maximiser votre audit",
        preview: "3 choses simples à préparer pour que votre audit soit un succès.",
        body: "Bonjour [Prénom],\n\nDemain commence votre audit Tour de Contrôle IA. Pour maximiser la valeur de ces 5 jours, voici 3 choses à préparer :\n\n1. Liste de vos agents IA actuels — même les « non-officiels » (ChatGPT, Copilot, etc.)\n2. Cartographie SI simplifiée — les systèmes qui touchent à la donnée sensible\n3. Vos 3 processus métier les plus chronophages — ceux où l'IA pourrait avoir le plus d'impact\n\nPas de document formel nécessaire. Un simple email ou une conversation suffit.\n\nOn se retrouve demain pour le kickoff.\n\nCordialement,\nL'équipe Ascenzia",
        cta: "Accéder à ma checklist de préparation →",
        ctaUrl: "/audit/checklist",
        notes: "Tone: Pratique, actionnable. Réduit la friction. Montre qu'on respecte leur temps."
      },
      {
        id: "E4", day: "J+12", delay: "7 jours après livraison",
        subject: "Votre roadmap IA — prochaine étape ?",
        subjectAB: "Les 90 prochains jours : transformer le diagnostic en résultats",
        preview: "Votre audit a identifié [X] cas d'usage. Voici comment passer à l'action.",
        body: "Bonjour [Prénom],\n\nVotre audit Tour de Contrôle a identifié [X] cas d'usage à fort ROI. La feuille de route est entre vos mains.\n\nMaintenant, deux options :\n\nOption A — Vous avancez seul\nVotre roadmap est conçue pour être actionnable en autonomie. Nos specs sont suffisamment détaillées pour que vos équipes (ou un prestataire) puissent implémenter.\n\nOption B — On déploie ensemble\nAscenzia Sentinel peut être opérationnel en 3 à 6 mois. On prend en charge l'intégration, la sécurité, et le monitoring. Vous gardez le contrôle.\n\nDans les deux cas, vous avez gagné une vision claire de votre dette IA.\n\nSouhaitez-vous en discuter ? Un créneau de 30 minutes suffit.\n\nCordialement,\nLaurent Fontaine\nFondateur, Ascenzia",
        cta: "Réserver un créneau de 30 min →",
        ctaUrl: "/contact?source=post-audit",
        notes: "Tone: Respectueux du choix. Pas de pression. Montre les deux chemins. Signe du fondateur pour la confiance."
      },
      {
        id: "E5", day: "J+30", delay: "30 jours après livraison",
        subject: "Votre dette IA n'a pas disparu",
        subjectAB: "30 jours après l'audit : où en êtes-vous ?",
        preview: "Un check-in rapide pour faire le point sur votre roadmap IA.",
        body: "Bonjour [Prénom],\n\nCela fait 30 jours que nous vous avons livré votre feuille de route IA.\n\nDepuis, le marché n'a pas ralenti :\n• Le nombre d'agents IA par entreprise continue d'augmenter\n• Les régulateurs accélèrent sur l'AI Act\n• La fenêtre d'avantage concurrentiel se réduit\n\nVotre roadmap identifiait [X] cas d'usage pour un ROI estimé de [Y]€.\n\nSi vous avez avancé : félicitations. Si vous êtes bloqué : c'est normal. 70 % des roadmaps IA restent dans un tiroir.\n\nNous pouvons faire un point de 15 minutes — sans engagement — pour débloquer la situation.\n\nBien à vous,\nL'équipe Ascenzia\n\nP.S. — Notre offre Copilote Stratégique (3 000-8 000 €/mois) inclut exactement ce type d'accompagnement continu.",
        cta: "Débloquer ma roadmap →",
        ctaUrl: "/contact?source=nurture-30d",
        notes: "Tone: Empathique mais direct. Reconnaît la difficulté. N'humilie pas. Ouvre la porte au Copilote Stratégique."
      }
    ]
  },
  {
    name: "Séquence Newsletter — Thought Leadership",
    trigger: "Inscription newsletter / téléchargement ressource",
    emails: [
      { id: "N1", day: "J+0", delay: "Immédiat", subject: "Bienvenue dans la Tour de Contrôle", preview: "Chaque semaine, un signal clair dans le bruit de l'IA agentique.", body: "Welcome email. Positionne Ascenzia comme source de vérité. Promet : 1 insight actionnable par semaine. Pas de spam. Pas de buzzwords.", cta: "Lire notre dernier article →", notes: "Très court. 5 lignes max. Lien vers meilleur article." },
      { id: "N2", day: "J+7", delay: "1 semaine", subject: "La double dette IA que personne ne voit venir", preview: "Technique + sécuritaire = la bombe silencieuse de votre SI.", body: "Article format email sur le concept de double dette. Données marché. Positionne l'audit comme diagnostic.", cta: "Diagnostiquer ma dette IA →", notes: "Contenu éducatif. Lead magnet vers audit." },
      { id: "N3", day: "J+14", delay: "2 semaines", subject: "Pourquoi 'souverain' n'est pas un mot marketing", preview: "RGPD, AI Act, Cloud Act : ce que ça signifie concrètement pour vos agents IA.", body: "Explication concrète de la souveraineté. Comparaison hyperscaler US vs infrastructure FR/CH. Risques juridiques réels.", cta: "Voir notre architecture souveraine →", notes: "Éduque sur différenciateur clé. Pas de FUD, des faits." }
    ]
  }
];

// ── AD COPY ──────────────────────────────────────
const adCopy = {
  google: [
    {
      campaign: "Search — Brand + Intent",
      keywords: "contrôle agents IA, supervision IA entreprise, sécurité agents IA, audit IA PME ETI",
      ads: [
        {
          headline1: "Tour de Contrôle Agents IA",
          headline2: "Audit 5j · 4 900€ · ROI Garanti",
          headline3: "100% Souverain FR/CH",
          desc1: "Vos agents IA échappent à tout contrôle ? Ascenzia les agrège, observe, sécurise et pilote depuis un cockpit unifié.",
          desc2: "3 cas d'usage ROI identifiés en 5 jours ou audit offert. Zero Trust natif. RGPD + AI Act.",
          sitelinks: ["Plateforme Sentinel", "Sécurité Zero Trust", "Cas d'usage Finance", "Réserver un audit"],
          abVariant: "A — Authority"
        },
        {
          headline1: "12 Agents IA Sans Supervision ?",
          headline2: "Reprenez le Contrôle en 5 Jours",
          headline3: "Ascenzia · Audit Tour de Contrôle",
          desc1: "80% des Fortune 500 ont subi une faille agent IA. Ne soyez pas le prochain. Audit complet en 5 jours.",
          desc2: "Infrastructure souveraine FR/CH. LLM-agnostique. 300+ connecteurs. Garantie ROI ou remboursé.",
          sitelinks: ["Qu'est-ce que Sentinel ?", "Architecture sécurité", "Cas d'usage Industrie", "Nous contacter"],
          abVariant: "B — Fear/Urgency"
        }
      ]
    },
    {
      campaign: "Search — Competitor",
      keywords: "alternative Dust.tt, plateforme IA souveraine, orchestration agents IA France",
      ads: [
        {
          headline1: "Orchestration IA Souveraine",
          headline2: "Alternative FR aux Plateformes US",
          headline3: "Ascenzia · Contrôle Total",
          desc1: "Pas un agent builder. L'infrastructure de contrôle qui manquait. Souverain, sécurisé, LLM-agnostique.",
          desc2: "Hébergement 100% France/Suisse. Pas de Cloud Act. Pas de dépendance. Le contrôle, pour de vrai.",
          sitelinks: ["Comparatif plateformes", "Souveraineté expliquée", "Migration depuis US", "Demo gratuite"],
          abVariant: "A — Differentiation"
        }
      ]
    }
  ],
  meta: [
    {
      campaign: "LinkedIn — Awareness DSI/CTO",
      targeting: "DSI, CTO, RSSI · ETI 250-5000 · France + Suisse · Secteurs : Finance, Industrie, Défense, Santé, BTP",
      formats: [
        {
          format: "Single Image",
          headline: "Vos agents IA ont besoin d'une tour de contrôle.",
          body: "12 agents IA par entreprise en moyenne. Zéro supervision centralisée. Ascenzia Sentinel change la donne : agrégez, observez, sécurisez et pilotez tous vos agents depuis un cockpit souverain.\n\n✓ LLM-agnostique · ✓ Zero Trust natif · ✓ 100% FR/CH\n\nAudit Tour de Contrôle — 4 900€ HT · 5 jours · ROI garanti.",
          cta: "Réserver mon audit",
          visual: "Dashboard Sentinel en 3D sur fond Navy.black. Score de santé 94/100 visible. Gold accents sur metrics clés. Logo Ascenzia en bas à droite.",
          abVariant: "A — Product-led"
        },
        {
          format: "Carousel (4 slides)",
          slides: [
            "Slide 1 : '12 agents IA. Zéro contrôle.' — Fond Navy, texte blanc, stat Gold",
            "Slide 2 : 'Agrégez tout.' — Icône connexion + '300+ connecteurs'",
            "Slide 3 : 'Sécurisez tout.' — Icône bouclier + 'Zero Trust natif'",
            "Slide 4 : 'Audit 4 900€ · ROI garanti' — CTA Gold proéminent"
          ],
          cta: "En savoir plus",
          abVariant: "B — Story-led (4 piliers)"
        },
        {
          format: "Video (30s)",
          script: "0-5s : Texte animé 'Vos agents IA échappent à tout contrôle.' (fade-in dramatique)\n5-12s : Dashboard Sentinel qui s'ouvre — agents qui apparaissent un par un\n12-20s : Les 4 piliers qui s'activent séquentiellement (icônes gold)\n20-25s : Stat '80% des Fortune 500 touchés' + 'Ne soyez pas le prochain'\n25-30s : Logo Ascenzia + CTA 'Audit 4 900€ — Réserver maintenant'",
          cta: "Réserver",
          abVariant: "C — Motion-led"
        }
      ]
    },
    {
      campaign: "LinkedIn — Retargeting visiteurs site",
      targeting: "Visiteurs site Ascenzia 30 derniers jours · Exclure : déjà clients",
      formats: [
        {
          format: "Single Image",
          headline: "Vous avez visité Ascenzia. Votre dette IA n'a pas disparu.",
          body: "3 cas d'usage ROI identifiés en 5 jours — ou l'audit est offert.\n\nPas de PowerPoint. Pas de promesses creuses. Des résultats mesurables.\n\nAscenzia · La Tour de Contrôle de vos Agents IA.",
          cta: "Réserver mon audit — 4 900€",
          visual: "Split screen : à gauche, agents IA désordonnés (fils emmêlés, rouge). À droite, dashboard Sentinel ordonné (lignes propres, gold).",
          abVariant: "A — Retargeting direct"
        }
      ]
    }
  ]
};

// ── SOCIAL POSTS ─────────────────────────────────
const socialPosts = [
  {
    platform: "LinkedIn",
    type: "Thought Leadership",
    posts: [
      {
        hook: "🚨 80 % des Fortune 500 ont subi une faille liée à un agent IA autonome.",
        body: "Ce chiffre vient de Microsoft Cyber Pulse 2026.\n\nLe problème n'est pas l'IA.\nLe problème, c'est l'absence de tour de contrôle.\n\nAujourd'hui, une entreprise moyenne utilise 12 agents IA.\nSans supervision centralisée.\nSans audit trail.\nSans kill-switch.\n\nC'est comme avoir 12 employés avec accès admin — sans manager.\n\nChez Ascenzia, on a construit l'infrastructure qui manquait :\n→ Agréger tous les agents\n→ Observer chaque action en temps réel\n→ Sécuriser par défaut (Zero Trust)\n→ Piloter depuis un cockpit unifié\n\n100% souverain. FR/CH. Pas d'hyperscaler US.\n\nLa question n'est plus « faut-il déployer l'IA ? »\nMais « comment garder le contrôle quand on le fait ? »",
        cta: "🔗 Audit Tour de Contrôle — 5 jours, 4 900€, ROI garanti.\nascenzia.fr/audit",
        hashtags: "#IA #Cybersécurité #Souveraineté #DSI #AgentsIA #AscenziaIA",
        notes: "Post flagship. À publier en priorité. Optimal mardi ou mercredi 8h-9h."
      },
      {
        hook: "« Déployez de l'IA ! » dit le DG.\n« Avec quel budget ? » répond le DSI.\n« Et quelle sécurité ? » ajoute le RSSI.",
        body: "Ce dialogue, on l'entend chaque semaine.\n\n3 personnes. 3 priorités différentes. Et pourtant, un seul besoin :\n\nReprendre le contrôle.\n\nLe DG veut des résultats.\nLe DSI veut de la stabilité.\nLe RSSI veut de la conformité.\n\nNotre audit Tour de Contrôle IA répond aux trois en 5 jours :\n→ 3+ cas d'usage ROI pour le DG\n→ Architecture maîtrisée pour le DSI\n→ Conformité RGPD/AI Act pour le RSSI\n\nPas de PowerPoint. Des résultats.",
        cta: "🔗 En savoir plus : ascenzia.fr/audit",
        hashtags: "#TransformationDigitale #IA #DSI #RSSI #ETI",
        notes: "Post storytelling — persona-driven. Résonne avec les 3 personas cibles."
      },
      {
        hook: "J'ai fondé Ascenzia pour une raison simple :\n\nLes entreprises européennes déploient des agents IA sans tour de contrôle.",
        body: "C'est comme faire décoller des avions sans contrôle aérien.\n\nChaque agent accède à des données sensibles.\nChaque agent prend des décisions autonomes.\nAucun n'a de supervision centralisée.\n\nEt pourtant, le marché explose :\n7,3 Md$ aujourd'hui → 139 Md$ en 2034.\n\nL'IA agentique va transformer chaque entreprise.\nMais sans infrastructure de confiance, c'est du risque non maîtrisé.\n\nAscenzia, c'est cette infrastructure.\nSouveraine. Sécurisée. Temps réel.\n\nAgrégez. Observez. Sécurisez. Pilotez.",
        cta: "🔗 ascenzia.fr",
        hashtags: "#Startup #IA #Entrepreneuriat #Souveraineté #Cybersécurité",
        notes: "Post fondateur — personal branding Laurent Fontaine. Authentique, vision."
      }
    ]
  },
  {
    platform: "X (Twitter)",
    type: "Micro-content",
    posts: [
      { text: "12 agents IA par entreprise.\nZéro supervision centralisée.\n\nC'est la norme en 2026.\nC'est aussi le problème.\n\nAscenzia = la tour de contrôle qui manquait.\n\n→ ascenzia.fr", notes: "Thread opener. Stat choc." },
      { text: "L'IA n'est pas le risque.\nL'absence de contrôle, si.\n\n80% des Fortune 500 touchés.\nVotre ETI est-elle protégée ?\n\nAudit 5j · 4 900€ · ROI garanti\nascenzia.fr/audit", notes: "Direct CTA. Urgence mesurée." },
      { text: "Agrégez. Observez. Sécurisez. Pilotez.\n\n4 verbes. 1 plateforme. 0 dépendance US.\n\nAscenzia Sentinel — votre cockpit IA souverain.", notes: "Brand tagline. Court et percutant." },
      { text: "« Si nous ne trouvons pas 3 cas d'usage à fort ROI, l'audit est offert. »\n\nC'est notre garantie.\nPas un slogan.\n\nascenzia.fr/audit", notes: "Guarantee-led. Confiance." }
    ]
  }
];

// ── CONTENT OUTLINES ─────────────────────────────
const contentOutlines = {
  blog: [
    {
      title: "La double dette IA : pourquoi vos agents IA coûtent plus qu'ils ne rapportent",
      slug: "/ressources/double-dette-ia",
      persona: "DSI / CTO",
      funnel: "TOFU — Awareness",
      outline: ["Introduction : le paradoxe de l'IA agentique (plus d'agents ≠ plus de valeur)", "Section 1 : La dette technique — MTTR, coûts cachés, agents fragiles", "Section 2 : La dette sécuritaire — surface d'attaque, conformité, audit trail", "Section 3 : Pourquoi elles s'accumulent simultanément", "Section 4 : Le coût réel de l'inaction (chiffres marché)", "Conclusion : Comment diagnostiquer votre dette (CTA audit)"],
      seo: "dette IA, coût agents IA, sécurité agents IA, supervision IA",
      length: "1 800 mots",
      cta: "Diagnostiquer ma dette IA → Audit 4 900€"
    },
    {
      title: "AI Act 2026 : ce que change concrètement la réglementation pour vos agents IA",
      slug: "/ressources/ai-act-agents-ia",
      persona: "RSSI / DPO",
      funnel: "TOFU — Awareness",
      outline: ["Introduction : l'AI Act est entré en vigueur — êtes-vous prêt ?", "Section 1 : Ce que l'AI Act exige pour les systèmes à haut risque", "Section 2 : Agents IA et obligations de transparence / traçabilité", "Section 3 : Les sanctions (jusqu'à 35M€ ou 7% du CA mondial)", "Section 4 : Comment Ascenzia Sentinel simplifie la conformité", "Conclusion : Checklist conformité AI Act en 10 points (CTA)"],
      seo: "AI Act agents IA, conformité IA 2026, réglementation agents autonomes",
      length: "2 200 mots",
      cta: "Télécharger la checklist AI Act → Lead magnet"
    },
    {
      title: "Souveraineté numérique : pourquoi vos agents IA ne devraient pas dépendre d'un hyperscaler US",
      slug: "/ressources/souverainete-agents-ia",
      persona: "DSI / DG",
      funnel: "MOFU — Consideration",
      outline: ["Introduction : Cloud Act, FISA — le risque juridique réel", "Section 1 : Ce que 'souverain' signifie concrètement (pas juste un label)", "Section 2 : Hébergement FR/CH — options et comparatif", "Section 3 : Le cas Ascenzia — architecture 100% souveraine", "Conclusion : 5 questions à poser à votre fournisseur IA (CTA)"],
      seo: "souveraineté IA, hébergement souverain France, alternative cloud US",
      length: "1 500 mots",
      cta: "Auditer ma souveraineté IA → Contact"
    },
    {
      title: "Comment un DSI d'ETI industrielle a repris le contrôle de ses 8 agents IA en 90 jours",
      slug: "/ressources/cas-eti-industrielle",
      persona: "DSI / DG",
      funnel: "BOFU — Decision",
      outline: ["Contexte : ETI industrielle, 1200 collab., 8 agents non supervisés", "Problème : Shadow IT IA, coûts ×3, incident sécurité évité de justesse", "Solution : Audit Tour de Contrôle → déploiement Sentinel", "Résultats : MTTR -47%, coûts -35%, conformité AI Act atteinte", "Témoignage DSI (verbatim)", "CTA : Réserver votre audit"],
      seo: "cas d'usage Ascenzia, supervision agents IA ETI, ROI agents IA",
      length: "1 200 mots",
      cta: "Obtenir les mêmes résultats → Audit 4 900€"
    },
    {
      title: "Les 5 signaux d'alerte que vos agents IA sont hors de contrôle",
      slug: "/ressources/signaux-alerte-agents-ia",
      persona: "DSI / RSSI",
      funnel: "TOFU — Awareness",
      outline: ["Introduction : les agents IA ne préviennent pas avant de dérailler", "Signal 1 : Personne ne sait combien d'agents sont actifs", "Signal 2 : Pas d'audit trail sur les actions des agents", "Signal 3 : Les coûts API augmentent sans explication", "Signal 4 : Un agent a accédé à des données hors périmètre", "Signal 5 : Vous n'avez pas de kill-switch", "Conclusion : Auto-diagnostic en 5 minutes (CTA quiz interactif)"],
      seo: "risques agents IA, shadow IT IA, contrôle agents autonomes",
      length: "1 400 mots",
      cta: "Auto-diagnostic gratuit → Quiz interactif"
    }
  ],
  video: [
    {
      title: "Qu'est-ce qu'Ascenzia ? (Explainer 90s)",
      duration: "90 secondes",
      funnel: "TOFU — Awareness",
      script: [
        "0-10s : Hook — '12 agents IA. Zéro contrôle.' (texte animé, fond noir)",
        "10-25s : Problème — Animation : agents IA qui se multiplient, fils emmêlés, alertes rouges",
        "25-40s : La double dette — Split screen : technique (coûts) | sécuritaire (failles)",
        "40-60s : Solution — Dashboard Sentinel s'ouvre. Les 4 piliers s'activent un par un",
        "60-75s : Preuve — Stats animées (marché, adoption, failles)",
        "75-85s : Différenciateur — 'Souverain. Sécurisé. LLM-agnostique.'",
        "85-90s : CTA — Logo + 'Audit 4 900€ · ROI garanti · ascenzia.fr'"
      ],
      visual: "Style : Apple keynote meets SpaceX launch stream. Dark, clean, data-driven. Pas de robot bleu."
    },
    {
      title: "L'audit Tour de Contrôle en 60 secondes",
      duration: "60 secondes",
      funnel: "MOFU — Consideration",
      script: [
        "0-8s : Hook — 'En 5 jours, on reprend le contrôle de vos agents IA.'",
        "8-20s : Jour par jour — Timeline animée J1→J5 avec livrables",
        "20-35s : Livrables — Cards qui apparaissent (cartographie, cas d'usage, roadmap)",
        "35-45s : Garantie — '3 cas d'usage ROI ou l'audit est offert' (texte gold, bold)",
        "45-55s : Prix — '4 900€ HT. Pas de surprise.' (transparent)",
        "55-60s : CTA — 'Réservez maintenant' + URL"
      ],
      visual: "Style : Timeline horizontale animée. Clean, pro, pas de visages (universalité)."
    },
    {
      title: "Pourquoi souverain ? (Thought leadership 3min)",
      duration: "3 minutes",
      funnel: "MOFU — Education",
      script: [
        "0-15s : Hook — Laurent face caméra : 'Vos données IA transitent par des serveurs américains. Voici ce que ça signifie.'",
        "15-60s : Cloud Act expliqué — Animation simple, schéma juridictionnel",
        "60-120s : Ce que 'souverain' signifie chez Ascenzia — Architecture FR/CH, chiffrement, conformité",
        "120-160s : Comparatif — Tableau animé : Ascenzia vs hyperscaler US",
        "160-180s : CTA — 'Vos données méritent mieux. ascenzia.fr'"
      ],
      visual: "Style : Mix face caméra (crédibilité) + animations (clarté). Bureau dark mode visible en fond."
    }
  ]
};

// ── A/B TEST PLAN ────────────────────────────────
const abTests = [
  {
    element: "Hero Headline",
    control: "Agrégez. Observez. Sécurisez. Pilotez.",
    variant: "Vos agents IA sont une bombe à retardement.",
    hypothesis: "Le message négatif (peur) génère plus de clics CTA que le message positif (solution).",
    metric: "CTR sur CTA primaire",
    duration: "14 jours",
    traffic: "50/50",
    minSample: "2 000 visiteurs uniques"
  },
  {
    element: "CTA Primaire — Wording",
    control: "Réserver mon audit",
    variant: "Auditer mes agents — 4 900€",
    hypothesis: "Afficher le prix dans le CTA filtre les leads et augmente la qualité (MQL → SQL ratio).",
    metric: "Taux de conversion formulaire + qualité lead (SQL rate)",
    duration: "21 jours",
    traffic: "50/50",
    minSample: "500 clics CTA"
  },
  {
    element: "CTA Primaire — Couleur",
    control: "Gold (#DDAC63) sur fond Navy",
    variant: "White (#EBEBEE) sur fond Gold",
    hypothesis: "L'inversion du contraste (bouton blanc sur bande gold) attire plus l'attention dans le flux.",
    metric: "CTR sur CTA",
    duration: "14 jours",
    traffic: "50/50",
    minSample: "3 000 impressions"
  },
  {
    element: "Social Proof — Position",
    control: "Stats marché après les 4 piliers (section 5)",
    variant: "Stats marché juste après le hero (section 2)",
    hypothesis: "Montrer les données marché plus tôt renforce l'urgence et réduit le bounce rate.",
    metric: "Bounce rate + scroll depth",
    duration: "14 jours",
    traffic: "50/50",
    minSample: "2 000 sessions"
  },
  {
    element: "Email Subject Line — E2",
    control: "80 % des Fortune 500 ont subi une faille agent IA",
    variant: "Ce que les DSI découvrent (trop tard) sur leurs agents IA",
    hypothesis: "La curiosité (variant) génère un meilleur open rate que le chiffre choc (control).",
    metric: "Open rate + click rate",
    duration: "Envoi unique, 1 000 contacts min",
    traffic: "50/50",
    minSample: "1 000 envois"
  }
];


/* ════════════════════════════════════════════════════════════════
   REACT COMPONENT
   ════════════════════════════════════════════════════════════════ */

const sections = [
  { id: "messaging", label: "Messaging" },
  { id: "heroes", label: "Hero Banners" },
  { id: "landing", label: "Landing Pages" },
  { id: "emails", label: "Email Séquences" },
  { id: "google-ads", label: "Google Ads" },
  { id: "meta-ads", label: "Meta / LinkedIn" },
  { id: "social", label: "Posts Sociaux" },
  { id: "blog", label: "Blog Outlines" },
  { id: "video", label: "Vidéo Scripts" },
  { id: "ab-tests", label: "Tests A/B" }
];

const Badge = ({ children, v = "gold" }) => {
  const c = { gold: { bg: T.gold.DEFAULT+"22", c: T.gold.DEFAULT, b: T.gold.DEFAULT+"44" }, navy: { bg: T.navy.slate, c: T.neutral.offWhite, b: T.navy.slateLight }, green: { bg:"#22C55E22", c:"#22C55E", b:"#22C55E44" }, red: { bg:"#EF444422", c:"#EF4444", b:"#EF444444" }, blue: { bg:"#3B82F622", c:"#3B82F6", b:"#3B82F644" } }[v] || { bg: T.navy.slate, c: T.neutral.offWhite, b: T.navy.slateLight };
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:9999, fontSize:11, fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase", background:c.bg, color:c.c, border:`1px solid ${c.b}` }}>{children}</span>;
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: T.navy.dark, borderRadius: T.r.lg, padding: 20, border: `1px solid ${T.navy.slateLight}33`, ...style }}>{children}</div>
);

const Accordion = ({ title, badge, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: T.navy.slate+"88", border:`1px solid ${T.navy.slateLight}33`, borderRadius: T.r.lg, marginBottom: 12, overflow:"hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width:"100%", padding:"14px 20px", background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", color: T.neutral.offWhite, fontFamily: T.font, fontSize:14, fontWeight:600, textAlign:"left" }}>
        <span style={{ display:"flex", alignItems:"center", gap:10 }}>{title} {badge && <Badge v="navy">{badge}</Badge>}</span>
        <span style={{ transform: open?"rotate(180deg)":"rotate(0)", transition: T.m.fast, color: T.gold.DEFAULT }}>▼</span>
      </button>
      {open && <div style={{ padding:"0 20px 20px" }}>{children}</div>}
    </div>
  );
};

const CopyBlock = ({ label, text, mono = false }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize:11, color: T.gold.DEFAULT, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4, fontWeight:600 }}>{label}</div>
    <div style={{ background: T.navy.black, borderRadius: T.r.md, padding:"12px 16px", fontSize:13, lineHeight:1.7, color: T.neutral.offWhite, fontFamily: mono ? T.mono : T.font, whiteSpace:"pre-wrap", borderLeft:`3px solid ${T.gold.DEFAULT}33` }}>{text}</div>
  </div>
);

export default function MarketingAssets() {
  const [active, setActive] = useState("messaging");
  const [heroBanner, setHeroBanner] = useState(0);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
    setActive(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const s = {
    wrap: { display:"flex", minHeight:"100vh", background: T.navy.black, color: T.neutral.offWhite, fontFamily: T.font },
    side: { width:200, position:"fixed", top:0, left:0, height:"100vh", background: T.navy.dark, borderRight:`1px solid ${T.navy.slateLight}33`, overflowY:"auto", padding:"20px 0", zIndex:50 },
    main: { marginLeft:200, flex:1, maxWidth:920, padding:"40px 36px 120px" },
    link: (a) => ({ display:"block", padding:"7px 18px", fontSize:12, color: a ? T.gold.DEFAULT : T.neutral.slateBlue, fontWeight: a?600:400, cursor:"pointer", borderLeft: a?`3px solid ${T.gold.DEFAULT}`:"3px solid transparent", background: a ? T.navy.slate+"44":"transparent", transition: T.m.fast, textDecoration:"none" }),
    h2: { fontSize:30, fontWeight:700, letterSpacing:"-0.02em", marginBottom:8 },
    sub: { fontSize:13, color: T.neutral.slateBlue, marginBottom:28 },
    hr: { border:"none", borderTop:`1px solid ${T.navy.slateLight}22`, margin:"44px 0" }
  };

  return (
    <div style={s.wrap}>
      <nav style={s.side}>
        <div style={{ padding:"0 18px 14px", borderBottom:`1px solid ${T.navy.slateLight}22`, marginBottom:10 }}>
          <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color: T.gold.DEFAULT, fontWeight:700 }}>Ascenzia</div>
          <div style={{ fontSize:13, fontWeight:600 }}>Marketing Assets</div>
          <div style={{ fontSize:10, color: T.neutral.slateBlue }}>Step 4 of 9</div>
        </div>
        {sections.map(sec => <a key={sec.id} style={s.link(active===sec.id)} onClick={() => scrollTo(sec.id)}>{sec.label}</a>)}
      </nav>

      <main style={s.main}>
        {/* Header */}
        <div style={{ marginBottom:44 }}>
          <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
            <Badge>Step 4/9</Badge><Badge v="navy">3 Hero Variants</Badge><Badge v="navy">5 Landing Pages</Badge><Badge v="navy">8 Emails</Badge><Badge v="navy">12+ Ads</Badge><Badge v="navy">5 A/B Tests</Badge>
          </div>
          <h1 style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.03em", margin:0, lineHeight:1.1 }}>Usine d'Actifs Marketing</h1>
          <p style={{ fontSize:15, color: T.neutral.slateBlue, maxWidth:620, lineHeight:1.6, marginTop:10 }}>Copie exacte, direction visuelle, CTAs, tests A/B. Tous les actifs marketing intégrés au site Ascenzia — prêts à déployer.</p>
        </div>

        {/* ═══ MESSAGING HIERARCHY ═══ */}
        <section id="messaging">
          <h2 style={s.h2}>Hiérarchie de Messaging</h2>
          <p style={s.sub}>5 niveaux de message. Chaque actif marketing puise dans cette pyramide.</p>
          <div style={{ display:"grid", gap:10 }}>
            {Object.entries(messagingHierarchy).map(([k, v]) => (
              <div key={k} style={{ display:"flex", alignItems:"center", gap:16, background: T.navy.dark, borderRadius: T.r.lg, padding:"14px 20px", border:`1px solid ${T.navy.slateLight}33` }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background: T.gold.DEFAULT+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color: T.gold.DEFAULT, flexShrink:0 }}>{k}</div>
                <div>
                  <div style={{ fontSize:11, color: T.gold.DEFAULT, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{v.level}</div>
                  <div style={{ fontSize:14, color: T.neutral.offWhite, marginTop:2 }}>{v.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={s.hr}/>

        {/* ═══ HERO BANNERS ═══ */}
        <section id="heroes">
          <h2 style={s.h2}>Hero Banners — 3 Variantes A/B</h2>
          <p style={s.sub}>3 directions créatives pour le hero principal. Test A/B recommandé avant lancement.</p>

          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            {heroBanners.map((h, i) => (
              <button key={h.id} onClick={() => setHeroBanner(i)} style={{ padding:"8px 14px", borderRadius: T.r.md, border:`1px solid ${heroBanner===i ? T.gold.DEFAULT : T.navy.slateLight}44`, background: heroBanner===i ? T.gold.DEFAULT+"18" : T.navy.slate, color: heroBanner===i ? T.gold.DEFAULT : T.neutral.offWhite, cursor:"pointer", fontFamily: T.font, fontSize:12, fontWeight:600, transition: T.m.fast }}>
                {h.id} — {h.name}
              </button>
            ))}
          </div>

          {(() => {
            const h = heroBanners[heroBanner];
            return (
              <div>
                {/* Visual Preview */}
                <div style={{ background: h.gradient, borderRadius: T.r.lg, padding:"60px 40px", marginBottom:16, border:`1px solid ${T.navy.slateLight}22`, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"relative", zIndex:2 }}>
                    <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", color: T.gold.DEFAULT, fontWeight:600, marginBottom:16 }}>{h.surtitre}</div>
                    <div style={{ fontSize:36, fontWeight:700, lineHeight:1.1, color: T.neutral.offWhite, whiteSpace:"pre-line", marginBottom:16, letterSpacing:"-0.02em" }}>{h.headline}</div>
                    <div style={{ fontSize:15, color: T.neutral.slateBlue, maxWidth:540, lineHeight:1.6, marginBottom:24 }}>{h.subhead}</div>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                      <button style={{ padding:"12px 24px", borderRadius: T.r.md, border:"none", background: T.gold.DEFAULT, color: T.navy.black, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily: T.font }}>{h.cta1.label}</button>
                      <button style={{ padding:"12px 24px", borderRadius: T.r.md, border:`1px solid ${T.neutral.offWhite}66`, background:"transparent", color: T.neutral.offWhite, fontSize:14, cursor:"pointer", fontFamily: T.font }}>{h.cta2.label}</button>
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <Card><CopyBlock label="Direction visuelle" text={h.visual} /></Card>
                  <Card><CopyBlock label="Stratégie A/B" text={h.abTest} /></Card>
                  <Card style={{ gridColumn:"1/-1" }}><CopyBlock label="Métriques cibles" text={h.metrics} mono /></Card>
                </div>
              </div>
            );
          })()}
        </section>

        <hr style={s.hr}/>

        {/* ═══ LANDING PAGES ═══ */}
        <section id="landing">
          <h2 style={s.h2}>Copie Landing Pages</h2>
          <p style={s.sub}>Copie exacte pour chaque section de chaque page. Prête à intégrer.</p>

          {landingPages.map(lp => (
            <Accordion key={lp.page} title={`${lp.page}`} badge={lp.path}>
              {lp.sections.map((sec, i) => (
                <div key={i} style={{ marginBottom:16, paddingBottom:16, borderBottom: i < lp.sections.length-1 ? `1px solid ${T.navy.slateLight}22` : "none" }}>
                  <div style={{ fontSize:12, color: T.gold.DEFAULT, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>{sec.zone}</div>
                  {Object.entries(sec.copy).map(([key, val]) => {
                    if (Array.isArray(val)) {
                      return (
                        <div key={key} style={{ marginBottom:8 }}>
                          <div style={{ fontSize:11, color: T.neutral.slateBlue, marginBottom:4 }}>{key}</div>
                          {val.map((item, j) => (
                            <div key={j} style={{ fontSize:13, color: T.neutral.offWhite, padding:"4px 0 4px 12px", borderLeft:`2px solid ${T.gold.DEFAULT}33` }}>{item}</div>
                          ))}
                        </div>
                      );
                    }
                    return <CopyBlock key={key} label={key} text={val} />;
                  })}
                </div>
              ))}
            </Accordion>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ EMAIL SEQUENCES ═══ */}
        <section id="emails">
          <h2 style={s.h2}>Séquences Email</h2>
          <p style={s.sub}>Emails complets avec subject lines A/B, preview text, body, CTAs et notes stratégiques.</p>

          {emailSequences.map(seq => (
            <div key={seq.name} style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:18, fontWeight:600, color: T.gold.DEFAULT, marginBottom:4 }}>{seq.name}</h3>
              <p style={{ fontSize:12, color: T.neutral.slateBlue, marginBottom:16 }}>Trigger : {seq.trigger}</p>

              {seq.emails.map(em => (
                <Accordion key={em.id} title={`${em.id} — ${em.subject}`} badge={em.day}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                    <CopyBlock label="Subject (Control)" text={em.subject} />
                    {em.subjectAB && <CopyBlock label="Subject (Variant B)" text={em.subjectAB} />}
                  </div>
                  {em.preview && <CopyBlock label="Preview text" text={em.preview} />}
                  <CopyBlock label="Body" text={em.body} />
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <CopyBlock label="CTA" text={em.cta} />
                    {em.ctaUrl && <CopyBlock label="URL" text={em.ctaUrl} mono />}
                  </div>
                  <div style={{ background: T.navy.black, borderRadius: T.r.md, padding:12, marginTop:8, borderLeft:`3px solid ${T.sem.info}` }}>
                    <span style={{ fontSize:11, color: T.sem.info, fontWeight:600 }}>NOTES STRATÉGIQUES</span>
                    <p style={{ fontSize:12, color: T.neutral.offWhite, margin:"4px 0 0", lineHeight:1.6 }}>{em.notes}</p>
                  </div>
                </Accordion>
              ))}
            </div>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ GOOGLE ADS ═══ */}
        <section id="google-ads">
          <h2 style={s.h2}>Google Ads</h2>
          <p style={s.sub}>Campagnes Search avec headlines, descriptions, sitelinks et variantes A/B.</p>

          {adCopy.google.map((camp, ci) => (
            <Accordion key={ci} title={camp.campaign} badge={`${camp.ads.length} ad${camp.ads.length>1?'s':''}`}>
              <CopyBlock label="Keywords" text={camp.keywords} mono />
              {camp.ads.map((ad, ai) => (
                <Card key={ai} style={{ marginTop:12 }}>
                  <Badge v="navy">{ad.abVariant}</Badge>
                  <div style={{ marginTop:12 }}>
                    <div style={{ fontSize:16, fontWeight:600, color: T.sem.info, marginBottom:2 }}>{ad.headline1}</div>
                    <div style={{ fontSize:14, color: T.sem.info }}>{ad.headline2} | {ad.headline3}</div>
                    <div style={{ fontSize:13, color: T.neutral.offWhite, margin:"8px 0", lineHeight:1.6 }}>{ad.desc1}</div>
                    <div style={{ fontSize:13, color: T.neutral.slateBlue, lineHeight:1.6 }}>{ad.desc2}</div>
                    <div style={{ marginTop:10, display:"flex", gap:8, flexWrap:"wrap" }}>
                      {ad.sitelinks.map((sl, si) => <Badge key={si} v="blue">{sl}</Badge>)}
                    </div>
                  </div>
                </Card>
              ))}
            </Accordion>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ META / LINKEDIN ADS ═══ */}
        <section id="meta-ads">
          <h2 style={s.h2}>Meta / LinkedIn Ads</h2>
          <p style={s.sub}>Campagnes LinkedIn avec ciblage, formats (image, carousel, vidéo) et direction visuelle.</p>

          {adCopy.meta.map((camp, ci) => (
            <Accordion key={ci} title={camp.campaign} badge={`${camp.formats.length} format${camp.formats.length>1?'s':''}`}>
              <CopyBlock label="Ciblage" text={camp.targeting} />
              {camp.formats.map((fmt, fi) => (
                <Card key={fi} style={{ marginTop:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <Badge v="gold">{fmt.format}</Badge>
                    <Badge v="navy">{fmt.abVariant}</Badge>
                  </div>
                  {fmt.headline && <CopyBlock label="Headline" text={fmt.headline} />}
                  {fmt.body && <CopyBlock label="Body" text={fmt.body} />}
                  {fmt.slides && (
                    <div style={{ marginBottom:12 }}>
                      <div style={{ fontSize:11, color: T.gold.DEFAULT, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontWeight:600 }}>Slides</div>
                      {fmt.slides.map((sl, si) => (
                        <div key={si} style={{ fontSize:13, color: T.neutral.offWhite, padding:"6px 0 6px 12px", borderLeft:`2px solid ${T.gold.DEFAULT}33`, marginBottom:4 }}>{sl}</div>
                      ))}
                    </div>
                  )}
                  {fmt.script && <CopyBlock label="Script" text={fmt.script} />}
                  {fmt.visual && <CopyBlock label="Direction visuelle" text={fmt.visual} />}
                  <CopyBlock label="CTA" text={fmt.cta} />
                </Card>
              ))}
            </Accordion>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ SOCIAL POSTS ═══ */}
        <section id="social">
          <h2 style={s.h2}>Posts Sociaux Embeddables</h2>
          <p style={s.sub}>Posts LinkedIn et X (Twitter) prêts à publier. Hooks, body, CTAs, hashtags.</p>

          {socialPosts.map((platform, pi) => (
            <div key={pi} style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:18, fontWeight:600, color: T.gold.DEFAULT, marginBottom:4 }}>{platform.platform} — {platform.type}</h3>
              {platform.posts.map((post, posti) => (
                <Accordion key={posti} title={post.hook ? post.hook.substring(0,60)+"..." : post.text.substring(0,60)+"..."} badge={`Post ${posti+1}`}>
                  {post.hook && <CopyBlock label="Hook (1ère ligne)" text={post.hook} />}
                  {post.body && <CopyBlock label="Body" text={post.body} />}
                  {post.text && !post.body && <CopyBlock label="Tweet" text={post.text} />}
                  {post.cta && <CopyBlock label="CTA" text={post.cta} />}
                  {post.hashtags && <CopyBlock label="Hashtags" text={post.hashtags} mono />}
                  <div style={{ background: T.navy.black, borderRadius: T.r.md, padding:10, marginTop:8, borderLeft:`3px solid ${T.sem.info}` }}>
                    <span style={{ fontSize:11, color: T.sem.info, fontWeight:600 }}>NOTES</span>
                    <p style={{ fontSize:12, color: T.neutral.offWhite, margin:"4px 0 0" }}>{post.notes}</p>
                  </div>
                </Accordion>
              ))}
            </div>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ BLOG OUTLINES ═══ */}
        <section id="blog">
          <h2 style={s.h2}>Blog — Outlines Content</h2>
          <p style={s.sub}>5 articles stratégiques avec outline, SEO keywords, persona cible et position dans le funnel.</p>

          {contentOutlines.blog.map((article, ai) => (
            <Accordion key={ai} title={article.title} badge={article.funnel.split("—")[0].trim()}>
              <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
                <Badge v="navy">{article.persona}</Badge>
                <Badge v="blue">{article.funnel}</Badge>
                <Badge v="navy">{article.length}</Badge>
              </div>
              <CopyBlock label="URL" text={article.slug} mono />
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, color: T.gold.DEFAULT, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontWeight:600 }}>Outline</div>
                {article.outline.map((sec, si) => (
                  <div key={si} style={{ fontSize:13, color: T.neutral.offWhite, padding:"6px 0 6px 12px", borderLeft:`2px solid ${T.gold.DEFAULT}33`, marginBottom:4 }}>
                    <span style={{ color: T.gold.DEFAULT, marginRight:6 }}>{si+1}.</span>{sec}
                  </div>
                ))}
              </div>
              <CopyBlock label="SEO Keywords" text={article.seo} mono />
              <CopyBlock label="CTA de fin d'article" text={article.cta} />
            </Accordion>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ VIDEO SCRIPTS ═══ */}
        <section id="video">
          <h2 style={s.h2}>Vidéo — Scripts & Outlines</h2>
          <p style={s.sub}>3 vidéos avec scripts séquencés, direction visuelle et durée par segment.</p>

          {contentOutlines.video.map((vid, vi) => (
            <Accordion key={vi} title={vid.title} badge={vid.duration}>
              <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                <Badge v="blue">{vid.funnel}</Badge>
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, color: T.gold.DEFAULT, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontWeight:600 }}>Script séquencé</div>
                {vid.script.map((line, li) => (
                  <div key={li} style={{ fontSize:13, color: T.neutral.offWhite, padding:"8px 0 8px 12px", borderLeft:`2px solid ${T.gold.DEFAULT}33`, marginBottom:4, lineHeight:1.5 }}>{line}</div>
                ))}
              </div>
              <CopyBlock label="Direction visuelle" text={vid.visual} />
            </Accordion>
          ))}
        </section>

        <hr style={s.hr}/>

        {/* ═══ A/B TESTS ═══ */}
        <section id="ab-tests">
          <h2 style={s.h2}>Plan de Tests A/B</h2>
          <p style={s.sub}>5 tests prioritaires avec hypothèses, métriques et taille d'échantillon minimale.</p>

          <div style={{ display:"grid", gap:12 }}>
            {abTests.map((test, ti) => (
              <Card key={ti}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                  <h4 style={{ margin:0, fontSize:15, fontWeight:600 }}>
                    <span style={{ color: T.gold.DEFAULT, marginRight:8 }}>#{ti+1}</span>{test.element}
                  </h4>
                  <div style={{ display:"flex", gap:6 }}>
                    <Badge v="navy">{test.duration}</Badge>
                    <Badge v="navy">{test.traffic}</Badge>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                  <div style={{ background: T.navy.black, borderRadius: T.r.md, padding:12 }}>
                    <div style={{ fontSize:10, color: T.neutral.slateBlue, textTransform:"uppercase", marginBottom:4 }}>Control (A)</div>
                    <div style={{ fontSize:13, color: T.neutral.offWhite }}>{test.control}</div>
                  </div>
                  <div style={{ background: T.navy.black, borderRadius: T.r.md, padding:12, borderLeft:`3px solid ${T.gold.DEFAULT}` }}>
                    <div style={{ fontSize:10, color: T.gold.DEFAULT, textTransform:"uppercase", marginBottom:4 }}>Variant (B)</div>
                    <div style={{ fontSize:13, color: T.neutral.offWhite }}>{test.variant}</div>
                  </div>
                </div>
                <CopyBlock label="Hypothèse" text={test.hypothesis} />
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <CopyBlock label="Métrique" text={test.metric} />
                  <CopyBlock label="Échantillon min." text={test.minSample} mono />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{ marginTop:60, padding:"20px 0", borderTop:`1px solid ${T.navy.slateLight}22`, textAlign:"center" }}>
          <p style={{ color: T.neutral.slateBlue, fontSize:11 }}>Ascenzia Marketing Asset Factory — Step 4/9 — {new Date().toLocaleDateString("fr-FR")}</p>
          <p style={{ color: T.neutral.slateBlue, fontSize:10, marginTop:2 }}>Messaging M1-M5 · Brand Book v1 · Design System v1 · UI/UX Patterns v1</p>
        </div>
      </main>
    </div>
  );
}
