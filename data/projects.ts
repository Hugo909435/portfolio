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
  links?: { label: string; url: string }[]
  images?: string[]
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
      meta: 'Laravel - Brevo - MySQL',
      desc: "Gestion d'incidents et base de connaissances.",
      role: 'Concepteur & Développeur',
      longDesc:
        "Solution de ticketing utilisée par l'ensemble de l'équipe pour transmettre des demandes ou signaler des problèmes aux responsables des projets web. L'application intègre une messagerie par ticket, des notifications par mail via Brevo pour chaque nouvel incident, et une gestion fine des rôles (utilisateurs/administrateurs). Au-delà du ticketing, elle sert de base de connaissances centralisant fiches techniques et solutions post-incidents.",
      tags: ['Laravel', 'Brevo', 'MySQL', 'PHP 8', 'Livewire', 'Ticketing'],
      images: [
        '/portfolio-gogo-home.png',
        '/portfolio-gogo-work-selector.png'
      ]
    },
    {
      slug: 'projet-monitoring',
      title: 'Projet Monitoring',
      year: '2024',
      meta: 'PHP - Brevo - Hostinger',
      desc: 'Alertes automatiques sur downtime.',
      role: 'Concepteur & Développeur',
      longDesc:
        "Script de surveillance autonome qui interroge une liste de sites toutes les 30 minutes. En cas d'indisponibilité détectée, un mail et un SMS sont envoyés via Brevo. Une notification est également envoyée lorsque les sites sont de nouveau en ligne. Le tout tourne en CRON sur Hostinger, sans dépendance externe.",
      tags: ['PHP', 'Brevo API', 'CRON', 'Hostinger', 'SMS']
    },
    {
      slug: 'doviris-lams',
      title: 'Prestashop',
      year: '2025 - 2026',
      meta: 'PrestaShop - International',
      desc: 'Gestion multi-boutique et maintenance.',
      role: 'Concepteur & Développeur',
      longDesc:
        "Gestion et maintenance de l'écosystème PrestaShop chez Doviris pour la marque de serres de jardin LAMS. Mon travail inclut la maintenance corrective et évolutive, l'ajout de nouvelles fonctionnalités et le déploiement de boutiques indépendantes pour l'international. Chaque marché dispose de sa propre instance dédiée : France, Belgique, Suisse, Allemagne, Espagne et Italie.",
      tags: ['PrestaShop', 'International', 'Doviris', 'LAMS', 'Multi-boutique'],
      link: 'https://serres-lams.com'
    },
    {
      slug: 'optitime',
      title: 'Optitime',
      year: '2024',
      meta: 'Laravel - API - O2Switch',
      desc: "Gestion d'activités scolaires multi-rôles.",
      role: 'Concepteur & Développeur',
      longDesc:
        "Projet réalisé en duo lors d'un stage de deuxième année de BTS au Lycée Sainte-Marie du Port (Les Sables-d'Olonne). Optitime est une application interne permettant la gestion des activités pour les élèves et les professeurs. L'architecture repose sur deux instances Laravel distinctes (une API et un Front), déployées sur O2Switch. Le système gère quatre interfaces dédiées selon les rôles : Administrateur, Vie Scolaire, Élève et Professeur.",
      tags: ['Laravel', 'API REST', 'O2Switch', 'MySQL', 'BTS SIO', 'Travail en duo']
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
      slug: 'mam-les-ptits-cocoons',
      title: "MAM Les P'tits Cocoons",
      year: '2024',
      meta: 'Site Vitrine - SEO - Google Ads',
      desc: "Site vitrine pour une Maison d'Assistantes Maternelles.",
      role: 'Développeur & SEO',
      longDesc:
        "Création complète d'un site vitrine pour une Maison d'Assistantes Maternelles (MAM). Le projet inclut un formulaire de contact fonctionnel, une optimisation SEO poussée pour le référencement local, ainsi que la mise en place et la gestion de la fiche Google Business et de campagnes Google Ads pour booster la visibilité.",
      tags: ['SEO local', 'Google Ads', 'Google Business', 'Site Vitrine', 'Marketing'],
      link: 'https://mamlesptitscocoons.com/'
    },
    {
      slug: 'projet-marketing',
      title: 'Projet Marketing',
      year: '2025',
      meta: 'SEO - GEO - Marketing',
      desc: 'Exploration du référencement et acquisition.',
      role: 'Marketing & SEO',
      longDesc:
        "Découverte d'une passion pour le marketing digital lors de mon alternance chez Doviris. Pour approfondir mes compétences, j'ai lancé deux projets centrés sur l'optimisation SEO (Search Engine Optimization) et GEO (Generative Engine Optimization). L'objectif est de comprendre les mécanismes d'acquisition de trafic et de visibilité sur les moteurs de recherche modernes.",
      tags: ['SEO', 'GEO', 'Marketing Digital', 'Acquisition'],
      links: [
        { label: 'mon-carburant.com', url: 'https://mon-carburant.com' },
        { label: 'ilovegta6.com', url: 'https://ilovegta6.com' }
      ]
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
      slug: 'pokemon-tcg',
      title: 'Pokemon TCG',
      year: '2024',
      meta: 'React',
      desc: "Simulateur d'ouverture de booster.",
      role: 'Développeur Frontend',
      longDesc:
        "Simulateur d'ouverture de boosters Pokémon en React, avec animations de révélation carte par carte fidèles au jeu physique. Les données de cartes sont récupérées depuis l'API officielle Pokémon TCG. L'utilisateur choisit une extension, ouvre un booster, découvre ses cartes avec des animations CSS et peut consulter l'historique de ses ouvertures.",
      tags: ['React', 'Pokémon TCG API', 'CSS Animations', 'TypeScript']
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
    },
    {
      slug: 'rocroccar',
      title: 'RocRocCar',
      year: '2024',
      meta: 'React Native - Expo - Google Maps',
      desc: 'Application mobile de covoiturage.',
      role: 'Développeur Mobile',
      longDesc:
        "Application mobile de covoiturage inspirée de BlaBlaCar, développée en React Native. L'application intègre l'API Google Maps pour la visualisation des trajets et la sélection des points de départ et d'arrivée. Le projet a été déployé et testé en local via Expo Go.",
      tags: ['React Native', 'Expo', 'Google Maps API', 'Mobile', 'JavaScript']
    },
    {
      slug: 'eco-tracker',
      title: 'Eco Tracker',
      year: '2024',
      meta: 'Vue 3 - Chart.js',
      desc: 'Suivi de consommation énergétique.',
      role: 'Développeur Frontend',
      longDesc: "Tableau de bord permettant de suivre sa consommation d'eau et d'électricité. Visualisation via des graphiques interactifs et conseils personnalisés pour réduire son empreinte.",
      tags: ['Vue 3', 'Chart.js', 'Vite', 'CSS Grid']
    },
    {
      slug: 'task-master',
      title: 'Task Master',
      year: '2023',
      meta: 'Node.js - MongoDB',
      desc: 'Gestionnaire de tâches collaboratif.',
      role: 'Backend Developer',
      longDesc: "API robuste gérant des listes de tâches partagées avec notifications en temps réel via WebSockets.",
      tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io']
    },
    {
      slug: 'portfolio-v1',
      title: 'Portfolio v1',
      year: '2023',
      meta: 'HTML - CSS - JS',
      desc: 'Première itération de mon portfolio.',
      role: 'Designer & Développeur',
      longDesc: "Mon tout premier portfolio en ligne, explorant les animations CSS de base et le design responsive.",
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
    },
    {
      slug: 'smart-garden',
      title: 'Smart Garden',
      year: '2024',
      meta: 'Python - Raspberry Pi',
      desc: 'Arrosage automatique connecté.',
      role: 'Développeur IoT',
      longDesc: "Système d'arrosage automatique contrôlé par un Raspberry Pi, avec interface web pour surveiller l'humidité du sol.",
      tags: ['Python', 'IoT', 'Raspberry Pi', 'Flask']
    },
    {
      slug: 'crypto-watch',
      title: 'Crypto Watch',
      year: '2024',
      meta: 'Swift - SwiftUI',
      desc: 'Widget de suivi de crypto-monnaies.',
      role: 'Développeur iOS',
      longDesc: "Application iOS et widget pour suivre les cours des crypto-monnaies en temps réel via l'API CoinGecko.",
      tags: ['Swift', 'SwiftUI', 'iOS', 'API REST']
    },
    {
      slug: 'fitness-pro',
      title: 'Fitness Pro',
      year: '2023',
      meta: 'Flutter - Firebase',
      desc: 'Suivi de séances de musculation.',
      role: 'Développeur Mobile',
      longDesc: "Application mobile pour enregistrer ses séances de sport, visualiser ses progrès et partager ses routines.",
      tags: ['Flutter', 'Firebase', 'Mobile', 'Dart']
    },
    {
      slug: 'recipe-finder',
      title: 'Recipe Finder',
      year: '2023',
      meta: 'React - Edamam API',
      desc: 'Recherche de recettes par ingrédients.',
      role: 'Frontend Developer',
      longDesc: "Application React utilisant l'API Edamam pour trouver des recettes basées sur les ingrédients saisis par l'utilisateur.",
      tags: ['React', 'API', 'CSS Modules', 'JavaScript']
    },
    {
      slug: 'chat-app',
      title: 'Secure Chat',
      year: '2024',
      meta: 'Go - React',
      desc: 'Messagerie instantanée chiffrée.',
      role: 'Fullstack Developer',
      longDesc: "Application de messagerie avec chiffrement de bout en bout, utilisant Go pour le backend performant et React pour le client.",
      tags: ['Go', 'React', 'WebSockets', 'Cryptography']
    }
  ]
}
