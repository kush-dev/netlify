const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
//require('dotenv').config();

// Create Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = "https://mlbrgdjcwezckhrbgqsu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sYnJnZGpjd2V6Y2tocmJncXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NjMyMjUsImV4cCI6MjAzMDMzOTIyNX0.0caWKedYa6DawF2tshx0oYaWw0035GGx9cwsjbLgNHQ";
const supabase = createClient(supabaseUrl, supabaseKey);

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));
// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend/scripts'), { type: 'text/javascript' }));

// Define port
const PORT = process.env.PORT || 3000;

// Define routes

// Handle GET request to fetch existing posts
app.get('/api/posts', async(req, res) => {
    try {
        // Fetch existing posts from the database
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
            throw error;
        }

        // Respond with the fetched posts
        res.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Handle GET request to fetch posts with optional title query parameter
app.get('/api/posts', async(req, res) => {
    try {
        const { title } = req.query;
        let posts;

        if (title) {
            // If title query parameter is provided, filter posts by title
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .ilike('title', `%${title}%`);
            if (error) throw error;
            posts = data;
        } else {
            // If no title query parameter is provided, fetch all posts
            const { data, error } = await supabase.from('posts').select('*');
            if (error) throw error;
            posts = data;
        }

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});



// Handle POST request to create a new post
app.post('/api/posts', async(req, res) => {
    try {
        // Extract post data from the request body
        const { title, content, imageUrl } = req.body;

        // Insert the new post into the database
        const { data, error } = await supabase.from('posts').insert([{ title, content, imageUrl }]);
        if (error) {
            throw error;
        }

        // Respond with the newly created post data
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Error creating post' });
    }
});

// Define a route to handle GET requests for a specific post
app.get('/api/posts/:postId', async(req, res) => {
    try {
        // Extract the postId parameter from the request URL
        const postId = req.params.postId;

        // Query the database to retrieve the post with the specified ID
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('post_id', postId)
            .single();

        if (error) {
            throw error;
        }

        // Check if the post was found
        if (post) {
            // Send the post data as JSON response
            res.json(post);
        } else {
            // If post is not found, send a 404 Not Found response
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});