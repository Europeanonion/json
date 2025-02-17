interface ExerciseData {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string[];
  image?: string;
}

export class ExerciseDataService {
  private static instance: ExerciseDataService;
  private exercises: Map<string, ExerciseData> = new Map();

  static getInstance(): ExerciseDataService {
    if (!ExerciseDataService.instance) {
      ExerciseDataService.instance = new ExerciseDataService();
    }
    return ExerciseDataService.instance;
  }

  async initialize(): Promise<void> {
    // Load exercise data from chosen database
    try {
      const response = await fetch('PATH_TO_EXERCISE_DB/exercises.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch exercises: ${response.statusText}`);
      }
      const data = await response.json();
      
      data.forEach((exercise: ExerciseData) => {
        this.exercises.set(exercise.id, exercise);
      });
      
      // Cache the data in IndexedDB for offline access
      await this.cacheExercises(data);
    } catch (error) {
      console.error('Failed to initialize exercise database:', error);
      // Try loading from cache if available
      await this.loadFromCache();
    }
  }

  async getExercise(id: string): Promise<ExerciseData | undefined> {
    return this.exercises.get(id);
  }

  async searchExercises(query: string): Promise<ExerciseData[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.exercises.values()).filter(exercise => 
      exercise.name.toLowerCase().includes(searchTerm) ||
      exercise.muscle.toLowerCase().includes(searchTerm)
    );
  }

  private async cacheExercises(data: ExerciseData[]): Promise<void> {
    // Implementation for IndexedDB caching
    try {
      const db = await this.getIndexedDB();
      const transaction = db.transaction(['exercises'], 'readwrite');
      const store = transaction.objectStore('exercises');
      data.forEach(exercise => store.put(exercise));
    } catch (error) {
      console.error('Failed to cache exercises:', error);
    }
  }

  private async loadFromCache(): Promise<void> {
    try {
      const db = await this.getIndexedDB();
      const transaction = db.transaction(['exercises'], 'readonly');
      const store = transaction.objectStore('exercises');
      const exercises = await store.getAll();
      exercises.forEach((exercise: ExerciseData) => {
        this.exercises.set(exercise.id, exercise);
      });
    } catch (error) {
      console.error('Failed to load exercises from cache:', error);
    }
  }

  private async getIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('WorkoutPWA', 1);
      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('exercises')) {
          db.createObjectStore('exercises', { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}