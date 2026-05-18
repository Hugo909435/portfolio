export type Project = {
  slug: string
  title: string
  year: string
  meta: string
  desc: string
  image?: string
}

export const categories = [
  { key: 'pro', label: 'Projet professionnel' },
  { key: 'perso', label: 'Projet personnel' },
  { key: 'ecole', label: "Projet d'ecole" }
] as const

export const projectsByCategory: Record<string, Project[]> = {
  pro: [
    {
      slug: 'incidents-manager',
      title: 'Incidents Manager',
      year: '2025',
      meta: 'Laravel - PrestaShop',
      desc: "Workflow d'incidents pour l'equipe support."
    },
    {
      slug: 'site-monitoring',
      title: 'Site Monitoring',
      year: '2024',
      meta: 'PHP - Brevo',
      desc: 'Alertes automatiques sur downtime.'
    },
    {
      slug: 'promo-sql',
      title: 'Promo SQL Auto',
      year: '2024',
      meta: 'MySQL - PrestaShop',
      desc: 'Generation automatique de promos saisonnieres.'
    },
    {
      slug: 'catalog-restructure',
      title: 'Catalog Restructure',
      year: '2025',
      meta: 'SEO - Redirects',
      desc: '200+ URLs migrees sans perte de referencement.'
    }
  ],
  perso: [
    {
      slug: 'el-fuego',
      title: 'El Fuego',
      year: '2025',
      meta: 'Flutter - Laravel',
      desc: 'Jeu de plateau multi-joueur.'
    },
    {
      slug: 'cookia',
      title: 'Cookia',
      year: '2025',
      meta: 'Vue - Groq AI',
      desc: 'Livre de recettes assiste par IA.'
    },
    {
      slug: 'pokemon-tcg',
      title: 'Pokemon TCG',
      year: '2024',
      meta: 'React',
      desc: "Simulateur d'ouverture de booster."
    },
    {
      slug: 'freelance-connect',
      title: 'FreelanceConnect',
      year: '2024',
      meta: 'Laravel - AdminLTE',
      desc: 'Plateforme freelance / client.'
    }
  ],
  ecole: [
    {
      slug: 'movie-api',
      title: 'Movie API',
      year: '2024',
      meta: 'Java - Spring Boot',
      desc: 'REST API films.'
    },
    {
      slug: 'hr-postgres',
      title: 'HR Postgres',
      year: '2024',
      meta: 'PostgreSQL',
      desc: 'Gestion RH normalisee 3NF.'
    },
    {
      slug: 'debian-lab',
      title: 'Debian Lab',
      year: '2025',
      meta: 'Packer - HCL2',
      desc: 'Provisioning Debian 12.'
    }
  ]
}
