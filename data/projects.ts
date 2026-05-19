export type Project = {
  slug: string
  title: string
  year: string
  meta: string
  desc: string
  role: string
  longDesc: string
  tags: string[]
  link?: string
}

export const categories = [
  { key: 'pro', label: 'Projet professionnel' },
  { key: 'perso', label: 'Projet personnel' },
  { key: 'ecole', label: "Projet d'école" }
] as const

export const projectsByCategory: Record<string, Project[]> = {
  pro: [
    {
      slug: 'incidents-manager',
      title: 'Incidents Manager',
      year: '2025',
      meta: 'Laravel - PrestaShop',
      desc: "Workflow d'incidents pour l'equipe support.",
      role: 'Développeur Backend',
      longDesc:
        "Système de ticketing interne développé pour centraliser et prioriser les incidents remontés par l'équipe support e-commerce. Les agents peuvent créer, commenter et escalader des incidents directement depuis leur interface PrestaShop. Un tableau de bord temps réel permet au manager de suivre les SLA et d'identifier les zones de friction récurrentes.",
      tags: ['Laravel', 'PrestaShop', 'MySQL', 'PHP 8', 'Livewire']
    },
    {
      slug: 'site-monitoring',
      title: 'Site Monitoring',
      year: '2024',
      meta: 'PHP - Brevo',
      desc: 'Alertes automatiques sur downtime.',
      role: 'Développeur Solo',
      longDesc:
        "Script de surveillance autonome qui interroge une liste de sites toutes les cinq minutes via cURL. En cas d'indisponibilité détectée, une alerte transactionnelle est envoyée par Brevo avec le code HTTP, le temps de réponse et un historique des incidents récents. Le tout tourne en CRON sur un VPS mutualisé, sans dépendance externe.",
      tags: ['PHP', 'Brevo API', 'cURL', 'CRON', 'VPS']
    },
    {
      slug: 'promo-sql',
      title: 'Promo SQL Auto',
      year: '2024',
      meta: 'MySQL - PrestaShop',
      desc: 'Generation automatique de promos saisonnieres.',
      role: 'Développeur SQL',
      longDesc:
        "Procédures stockées MySQL qui génèrent automatiquement des règles de promotion saisonnières dans PrestaShop en fonction d'un calendrier paramétrable. Réduit à zéro le travail manuel de création des offres (soldes, Black Friday, fêtes). Les règles respectent les structures internes de PrestaShop et s'activent / se désactivent sans intervention humaine.",
      tags: ['MySQL', 'PrestaShop', 'Procédures stockées', 'Automatisation']
    },
    {
      slug: 'catalog-restructure',
      title: 'Catalog Restructure',
      year: '2025',
      meta: 'SEO - Redirects',
      desc: '200+ URLs migrees sans perte de referencement.',
      role: 'Tech Lead SEO',
      longDesc:
        "Refonte de l'arborescence produit d'un catalogue e-commerce de 200+ références, pilotée par une analyse SEO préalable. Chaque ancienne URL a été mappée vers sa nouvelle destination via un fichier de redirections 301 généré automatiquement. Zéro perte de trafic organique mesurée à 90 jours post-migration. La nouvelle structure réduit la profondeur d'indexation de 4 niveaux à 2.",
      tags: ['SEO', 'Nginx', 'CSV', 'PrestaShop', 'Google Search Console']
    }
  ],
  perso: [
    {
      slug: 'el-fuego',
      title: 'El Fuego',
      year: '2025',
      meta: 'Flutter - Laravel',
      desc: 'Jeu de plateau multi-joueur.',
      role: 'Développeur Fullstack',
      longDesc:
        "Jeu de plateau en temps réel pour 2 à 4 joueurs, jouable sur mobile et desktop. La partie logique de jeu tourne côté serveur Laravel via WebSocket (Laravel Reverb), ce qui garantit une source de vérité unique et rend la triche impossible côté client. L'UI Flutter gère les animations de plateau, les tours, et les effets de cartes. Premier projet personnel à architecture client/serveur stricte.",
      tags: ['Flutter', 'Laravel', 'Reverb', 'WebSocket', 'Dart', 'PHP 8']
    },
    {
      slug: 'cookia',
      title: 'Cookia',
      year: '2025',
      meta: 'Vue - Groq AI',
      desc: 'Livre de recettes assiste par IA.',
      role: 'Développeur & Designer',
      longDesc:
        "Application web de gestion de recettes augmentée par intelligence artificielle. L'utilisateur saisit les ingrédients disponibles dans son frigo et Cookia génère des recettes adaptées via Groq (LLaMA 3). Les recettes sont sauvegardables, éditables et catégorisables. L'interface, construite en Vue 3 avec Nuxt, privilégie la rapidité de navigation et le confort de lecture. Un projet né d'un besoin réel.",
      tags: ['Vue 3', 'Nuxt', 'Groq AI', 'TypeScript', 'Pinia', 'LLaMA 3']
    },
    {
      slug: 'pokemon-tcg',
      title: 'Pokemon TCG',
      year: '2024',
      meta: 'React',
      desc: "Simulateur d'ouverture de booster.",
      role: 'Développeur Frontend',
      longDesc:
        "Simulateur d'ouverture de boosters Pokémon en React, avec animations de révélation carte par carte fidèles au jeu physique. Les données de cartes sont récupérées depuis l'API officielle Pokémon TCG. L'utilisateur choisit une extension, ouvre un booster, découvre ses cartes avec des animations CSS et peut consulter l'historique de ses ouvertures. Projet réalisé en un weekend.",
      tags: ['React', 'Pokémon TCG API', 'CSS Animations', 'TypeScript']
    },
    {
      slug: 'freelance-connect',
      title: 'FreelanceConnect',
      year: '2024',
      meta: 'Laravel - AdminLTE',
      desc: 'Plateforme freelance / client.',
      role: 'Développeur Fullstack',
      longDesc:
        "Plateforme de mise en relation entre freelances et clients, développée dans le cadre d'une exploration de Laravel. Les freelances peuvent créer des profils, publier des services et recevoir des demandes de devis. Les clients parcourent les offres et contactent les prestataires via un système de messagerie intégré. Le backoffice AdminLTE permet à l'admin de modérer les profils et les offres.",
      tags: ['Laravel', 'AdminLTE', 'MySQL', 'Bootstrap 5', 'Blade']
    }
  ],
  ecole: [
    {
      slug: 'movie-api',
      title: 'Movie API',
      year: '2024',
      meta: 'Java - Spring Boot',
      desc: 'REST API films.',
      role: 'Développeur Backend',
      longDesc:
        "API RESTful de gestion de catalogue cinématographique développée en Java avec Spring Boot. Expose des endpoints CRUD pour les films, réalisateurs et genres, avec authentification JWT et documentation Swagger auto-générée. Implémentation du pattern Repository avec Spring Data JPA. Testé avec JUnit 5 et Mockito. Projet de fin de module Java EE.",
      tags: ['Java 17', 'Spring Boot', 'Spring Security', 'JPA', 'JWT', 'Swagger']
    },
    {
      slug: 'hr-postgres',
      title: 'HR Postgres',
      year: '2024',
      meta: 'PostgreSQL',
      desc: 'Gestion RH normalisee 3NF.',
      role: 'Modélisation BDD',
      longDesc:
        "Base de données relationnelle de gestion RH conçue en troisième forme normale (3NF). Couvre les entités Employés, Contrats, Départements, Congés et Paie. Inclut des vues métier, des triggers d'audit automatique et des procédures stockées PL/pgSQL pour les calculs de paie. Le schéma gère les historiques de poste sans perte d'information. Documentation ERD complète.",
      tags: ['PostgreSQL', '3NF', 'PL/pgSQL', 'Triggers', 'ERD', 'SQL']
    },
    {
      slug: 'debian-lab',
      title: 'Debian Lab',
      year: '2025',
      meta: 'Packer - HCL2',
      desc: 'Provisioning Debian 12.',
      role: 'Ingénieur Système',
      longDesc:
        "Pipeline de provisioning automatisé pour créer des images VM Debian 12 reproducibles via Packer et HCL2. Le template configure le partitionnement, l'utilisateur système, les paquets de base et le SSH en mode non-interactif (preseed). Les images générées sont compatibles VirtualBox et QEMU. Le projet inclut un script de validation post-build qui vérifie la conformité de l'image via SSH.",
      tags: ['Packer', 'HCL2', 'Debian 12', 'QEMU', 'Bash', 'Preseed']
    }
  ]
}
