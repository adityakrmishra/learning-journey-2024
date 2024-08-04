// Implementation Date: 2024-08-04
// Author: Aditya Kr. Mishra

// Deep Object Destructuring and ES6+ Features
// Parsing complex nested JSON responses from APIs

const processApiResponse = (response) => {
    // Extracting nested properties with default values
    const {
        data: {
            user: { id, profile: { username, email = 'no-email@test.com', preferences: { theme = 'light', notifications } = {} } = {} },
            metadata: { lastLogin, ipAddress }
        },
        status
    } = response;

    if (status !== 200) throw new Error('Invalid response status');

    return {
        userId: id,
        username,
        email,
        theme,
        alertsEnabled: notifications?.email || false,
        lastLoginDate: new Date(lastLogin)
    };
};

const mockRes = {
    status: 200,
    data: {
        user: { id: 8847, profile: { username: 'coder_aditya', preferences: { notifications: { email: true } } } },
        metadata: { lastLogin: '2024-03-15T10:30:00Z', ipAddress: '192.168.1.1' }
    }
};

console.log(processApiResponse(mockRes));
