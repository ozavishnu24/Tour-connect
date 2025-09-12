// API service functions for interacting with the backend
class ApiService {
    constructor() {
        this.baseUrl = config.apiBaseUrl;
    }

    // Get all tours
    async getTours() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tour`);
            if (!response.ok) {
                throw new Error('Failed to fetch tours');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching tours:', error);
            throw error;
        }
    }

    // Create a new tour
    async createTour(tourData) {
        try {
            const response = await fetch(`${this.baseUrl}/api/tour`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tourData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to create tour');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating tour:', error);
            throw error;
        }
    }

    // Update a tour
    async updateTour(tourId, tourData) {
        try {
            const response = await fetch(`${this.baseUrl}/api/tour/${tourId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tourData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update tour');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating tour:', error);
            throw error;
        }
    }

    // Delete a tour
    async deleteTour(tourId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/tour/${tourId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete tour');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error deleting tour:', error);
            throw error;
        }
    }
}

// Create a singleton instance
const apiService = new ApiService();