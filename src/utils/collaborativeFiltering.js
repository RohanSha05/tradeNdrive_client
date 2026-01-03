// Mock data for testing
const mockInteractions = [
  { userId: 'testUser1', carId: 1, action: 'view', rating: 4, timestamp: new Date().toISOString() },
  { userId: 'testUser1', carId: 2, action: 'view', rating: 3, timestamp: new Date().toISOString() },
  { userId: 'testUser1', carId: 3, action: 'buy', rating: 5, timestamp: new Date().toISOString() },
  { userId: 'testUser2', carId: 2, action: 'view', rating: 4, timestamp: new Date().toISOString() },
  { userId: 'testUser2', carId: 3, action: 'view', rating: 5, timestamp: new Date().toISOString() },
  { userId: 'testUser2', carId: 4, action: 'buy', rating: 4, timestamp: new Date().toISOString() },
  { userId: 'testUser2', carId: 1, action: 'view', rating: 3, timestamp: new Date().toISOString() },
  // Add your actual user with some sample interactions
  { userId: 'XukeWNbR7gPjla2yKANDE48cW872', carId: 5, action: 'view', rating: 4, timestamp: new Date().toISOString() },
  { userId: 'XukeWNbR7gPjla2yKANDE48cW872', carId: 6, action: 'view', rating: 3, timestamp: new Date().toISOString() },
  { userId: 'XukeWNbR7gPjla2yKANDE48cW872', carId: 7, action: 'view', rating: 5, timestamp: new Date().toISOString() },
];

// Load user interactions from localStorage or use mock
const loadInteractions = () => {
  const stored = localStorage.getItem('userInteractions');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored interactions:', error);
      return mockInteractions;
    }
  }
  return mockInteractions;
};

export const getSimilarUsers = (currentUserId, interactions = null) => {
  const data = interactions || loadInteractions();
  const userRatings = {};
  data.forEach(interaction => {
    if (!userRatings[interaction.userId]) userRatings[interaction.userId] = {};
    userRatings[interaction.userId][interaction.carId] = interaction.rating;
  });

  const currentUserRatings = userRatings[currentUserId] || {};
  const similarities = {};

  Object.keys(userRatings).forEach(userId => {
    if (userId === currentUserId) return;
    const otherUserRatings = userRatings[userId];
    const similarity = cosineSimilarity(currentUserRatings, otherUserRatings);
    similarities[userId] = similarity;
  });

  // Sort by similarity
  return Object.keys(similarities).sort((a, b) => similarities[b] - similarities[a]);
};

const cosineSimilarity = (vecA, vecB) => {
  const intersection = Object.keys(vecA).filter(key => key in vecB);
  if (intersection.length === 0) return 0;

  const dotProduct = intersection.reduce((sum, key) => sum + vecA[key] * vecB[key], 0);
  const normA = Math.sqrt(Object.values(vecA).reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(Object.values(vecB).reduce((sum, val) => sum + val * val, 0));

  return dotProduct / (normA * normB);
};

export const getRecommendations = (currentUserId, interactions = null, allCars) => {
  const data = interactions || loadInteractions();
  
  console.log('Current User ID:', currentUserId);
  console.log('Available interactions:', data.length);
  
  const similarUsers = getSimilarUsers(currentUserId, data);
  console.log('Similar users found:', similarUsers);
  
  const recommendedCars = new Set();

  // Get recommendations from similar users
  similarUsers.slice(0, 5).forEach(userId => {
    data
      .filter(interaction => interaction.userId === userId && interaction.rating >= 4)
      .forEach(interaction => {
        recommendedCars.add(interaction.carId);
      });
  });

  console.log('Recommended car IDs:', Array.from(recommendedCars));
  
  // If no recommendations from collaborative filtering, use popularity-based fallback
  if (recommendedCars.size === 0) {
    console.log('No collaborative recommendations found. Using popularity-based fallback.');
    // Get most popular cars (highest average ratings)
    const carRatings = {};
    data.forEach(interaction => {
      if (!carRatings[interaction.carId]) {
        carRatings[interaction.carId] = { total: 0, count: 0 };
      }
      carRatings[interaction.carId].total += interaction.rating;
      carRatings[interaction.carId].count += 1;
    });

    // Sort by average rating
    const sorted = Object.entries(carRatings)
      .map(([carId, data]) => ({
        carId: parseInt(carId),
        avgRating: data.total / data.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating);

    sorted.slice(0, 4).forEach(item => {
      recommendedCars.add(item.carId);
    });
    
    console.log('Using popular car IDs:', Array.from(recommendedCars));
  }

  return Array.from(recommendedCars)
    .map(carId => allCars.find(car => car.id === carId))
    .filter(Boolean);
};