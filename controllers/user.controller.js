const { User } = require('../models');

module.exports = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { name, email } = req.body;
            
            // Basic validation
            if (!name || !email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Name and email are required',
                    statusCode: 400
                });
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid email format',
                    statusCode: 400
                });
            }
            
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    status: 'error',
                    message: 'User already exists',
                    statusCode: 409
                });
            }
            
            // Create user
            const userData = await User.create({ name, email });
            
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: userData,
                statusCode: 201
            });
            
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                statusCode: 500
            });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                order: [['createdAt', 'DESC']]
            });
            
            return res.status(200).json({
                status: 'success',
                message: 'Users retrieved successfully',
                data: users,
                count: users.length,
                statusCode: 200
            });
            
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                statusCode: 500
            });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Valid user ID is required',
                    statusCode: 400
                });
            }
            
            const user = await User.findByPk(id);
            
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    statusCode: 404
                });
            }
            
            return res.status(200).json({
                status: 'success',
                message: 'User retrieved successfully',
                data: user,
                statusCode: 200
            });
            
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                statusCode: 500
            });
        }
    },

    // Update user
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            
            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Valid user ID is required',
                    statusCode: 400
                });
            }
            
            // Find user
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    statusCode: 404
                });
            }
            
            // Validate input
            if (!name && !email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'At least one field (name or email) is required',
                    statusCode: 400
                });
            }
            
            // Email format validation if provided
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Invalid email format',
                        statusCode: 400
                    });
                }
                
                // Check if email is already taken by another user
                const existingUser = await User.findOne({ 
                    where: { 
                        email,
                        id: { [require('sequelize').Op.ne]: id }
                    }
                });
                if (existingUser) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Email is already taken by another user',
                        statusCode: 409
                    });
                }
            }
            
            // Update user
            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            
            await user.update(updateData);
            
            return res.status(200).json({
                status: 'success',
                message: 'User updated successfully',
                data: user,
                statusCode: 200
            });
            
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                statusCode: 500
            });
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Valid user ID is required',
                    statusCode: 400
                });
            }
            
            // Find user
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    statusCode: 404
                });
            }
            
            // Delete user
            await user.destroy();
            
            return res.status(200).json({
                status: 'success',
                message: 'User deleted successfully',
                statusCode: 200
            });
            
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                statusCode: 500
            });
        }
    }
}; 