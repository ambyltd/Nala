const express = require('express');
const path = require('path');
const app = express();

// Définition du dossier contenant les fichiers statiques
const staticDir = path.join(__dirname, 'out');

// Configuration du middleware pour servir les fichiers statiques
app.use(express.static(staticDir));

// Pour toutes les routes non trouvées, servir index.html (nécessaire pour le routage côté client)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// Définir le port d'écoute (utiliser le port fourni par l'environnement ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
