/**
 * Utilitaires pour la gestion des dates et des délais
 */

/**
 * Vérifie si une date limite est dépassée
 * @param deadlineStr Date limite au format string (ISO)
 * @returns true si la date est dépassée, false sinon
 */
export const isExpired = (deadlineStr?: string): boolean => {
  if (!deadlineStr) return false;
  try {
    const deadlineDate = new Date(deadlineStr);
    const currentDate = new Date();
    return currentDate > deadlineDate;
  } catch (e) {
    console.error("Erreur lors de la vérification de la date:", e);
    return false;
  }
};

/**
 * Formate une date pour l'affichage
 * @param dateString Date au format string (ISO)
 * @param locale Locale pour le formatage (défaut: fr-FR)
 * @returns Date formatée sous forme de chaîne
 */
export const formatDate = (dateString: string, locale = 'fr-FR') => {
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (e) {
    console.error("Erreur lors du formatage de la date:", e);
    return dateString;
  }
};

/**
 * Calcule le nombre de jours restants avant une date limite
 * @param dateString Date limite au format string (ISO)
 * @returns Nombre de jours restants (négatif si dépassé)
 */
export const getDaysRemaining = (dateString: string): number => {
  try {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (e) {
    console.error("Erreur lors du calcul des jours restants:", e);
    return 0;
  }
};

/**
 * Obtient un message sur le délai restant
 * @param dateString Date limite au format string (ISO)
 * @returns Message sur le délai ou null si pas de date ou si > 7 jours
 */
export const getTimeRemainingMessage = (dateString?: string): string | null => {
  if (!dateString) return null;
  
  const days = getDaysRemaining(dateString);
  
  if (days <= 0) {
    return "Dernière chance !";
  } else if (days <= 7) {
    return `Plus que ${days} jour${days > 1 ? 's' : ''} !`;
  }
  
  return null;
};
