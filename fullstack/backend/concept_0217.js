// Implementation Date: 2024-05-26
// Author: Aditya Kr. Mishra

// Mongoose Advanced Schema Design
// Virtuals, Pre-save hooks, and Custom Validators

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' }
}, { timestamps: true });

// Virtual property for full name
UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Pre-save hook to hash password (mock logic)
UserSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) return next();
    console.log('Hashing password before saving user to database...');
    // this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

// const User = mongoose.model('User', UserSchema);
// module.exports = User;
