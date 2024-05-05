// Implementation Date: 2024-05-05
// Author: Aditya Kr. Mishra

// Closures and Memoization Pattern
// Optimizing expensive function calls by caching previous results

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Fetching from cache for args:', args);
            return cache.get(key);
        }
        console.log('Calculating result for args:', args);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

const expensiveCalculation = (n) => {
    // Simulate heavy CPU work
    let sum = 0;
    for(let i = 0; i <= n; i++) sum += i;
    return sum;
};

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(10000)); // Calculates
console.log(memoizedCalc(10000)); // Returns from cache instantly
