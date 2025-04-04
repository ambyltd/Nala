const RECEIVER_EMAIL = "amanjpaul@gmail.com";

interface EmailData {
  from?: string;
  subject: string;
  message: string;
  name?: string;
  phone?: string;
}

interface NewsletterData {
  subscriberEmail: string;
}

export async function sendContactForm(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Implémentation avec fetch pour envoyer au backend
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: RECEIVER_EMAIL,
        ...data
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de l\'envoi du formulaire');
    }
    
    return { success: true, message: 'Message envoyé avec succès' };
  } catch (error) {
    console.error('Erreur d\'envoi du formulaire:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Une erreur s\'est produite'
    };
  }
}

export async function subscribeToNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
  try {
    // Implémentation avec fetch pour envoyer au backend
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: RECEIVER_EMAIL,
        subscriberEmail: data.subscriberEmail
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de l\'inscription à la newsletter');
    }
    
    return { success: true, message: 'Inscription réussie' };
  } catch (error) {
    console.error('Erreur d\'inscription newsletter:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Une erreur s\'est produite'
    };
  }
}
