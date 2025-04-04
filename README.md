# Catalogue de Destinations de Voyage

Une application web développée avec Next.js qui présente un catalogue de destinations touristiques, avec possibilité de réservation via WhatsApp.

## Fonctionnalités

- Design responsive adapté à tous les appareils
- Mode clair/sombre
- Gestion des données via Google Sheets
- Intégration avec WhatsApp pour les réservations
- Expérience utilisateur améliorée avec des animations Framer Motion
- Conformité RGPD avec gestion des cookies

## Technologies utilisées

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Backend** : Google Sheets API (comme base de données)
- **Déploiement** : Firebase Hosting

## Démarrage

1. Cloner le dépôt
```bash
git clone <repository-url>
cd catalogue
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
   - Copier `.env.local.example` vers `.env.local`
   - Remplir les valeurs nécessaires

4. Lancer le serveur de développement
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure des données

Les destinations sont stockées dans une feuille Google Sheets avec les colonnes suivantes :
- id
- slug
- name
- description
- content (HTML)
- price
- duration
- coverImage (URL)
- gallery (JSON string d'URLs)
- bestSeason
- featured (true/false)
- rating

## Déploiement

Pour déployer sur Firebase Hosting :

1. Installer Firebase CLI si ce n'est pas déjà fait
```bash
npm install -g firebase-tools
```

2. Se connecter à Firebase
```bash
firebase login
```

3. Déployer
```bash
npm run deploy
```

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT
