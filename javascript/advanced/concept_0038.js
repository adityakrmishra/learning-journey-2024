// Implementation Date: 2024-01-28
// Author: Aditya Kr. Mishra

// Advanced Promises and Async/Await error handling
// Understanding how to process multiple async requests in parallel vs sequentially

const fetchUserData = async (userId) => {
    // Simulating API call latency
    return new Promise((resolve) => setTimeout(() => resolve({ id: userId, name: `User${userId}`, status: 'active' }), 500));
};

const processUsers = async (userIds) => {
    console.log('Starting parallel processing...');
    try {
        // Parallel execution using Promise.all
        const promises = userIds.map(id => fetchUserData(id));
        const users = await Promise.all(promises);
        
        // Filter and process the results
        const activeUsers = users.filter(u => u.status === 'active');
        console.log(`Successfully processed ${activeUsers.length} users.`);
        return activeUsers;
    } catch (error) {
        console.error('Failed to process user batch:', error);
        throw new Error('Batch processing aborted');
    }
};

processUsers([101, 102, 103, 104]);
