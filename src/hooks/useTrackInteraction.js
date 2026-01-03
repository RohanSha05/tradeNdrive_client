import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider'; // Assuming you have auth context

export const useTrackInteraction = (carId, action = 'view') => {
  const { user } = useAuth(); // Get current user

  useEffect(() => {
    if (user && carId) {
      // In real app, send to backend or Firestore
      const interaction = {
        userId: user.uid,
        carId,
        action,
        timestamp: new Date().toISOString(),
        rating: action === 'view' ? 3 : 5, // Mock rating
      };

      // For demo, store in localStorage
      const existing = JSON.parse(localStorage.getItem('userInteractions') || '[]');
      existing.push(interaction);
      localStorage.setItem('userInteractions', JSON.stringify(existing));

      console.log('Tracked interaction:', interaction);
    }
  }, [user, carId, action]);
};