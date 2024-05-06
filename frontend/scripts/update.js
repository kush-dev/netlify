// Retrieve the post ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Check if postId is null or undefined
if (!postId) {
    console.error('Post ID not found in URL');
    // Optionally, redirect the user to an error page or homepage
}

// Fetch the post data for the specified ID
async function fetchPost(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

// Populate the form with the post data
async function populateForm(postId) {
    const post = await fetchPost(postId);
    if (post) {
        // Populate form fields with post data
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('image-url').value = post.imageUrl;
    } else {
        console.error('Post not found');
        // Optionally, redirect the user to an error page or homepage
    }
}

// Load post data and populate the form on page load
window.addEventListener('DOMContentLoaded', () => {
    if (postId) {
        populateForm(postId);
    } else {
        console.error('Post ID not found');
        // Optionally, redirect the user to an error page or homepage
    }
});

// Handle form submission to update the post
document.getElementById('update-post-form').addEventListener('submit', async(event) => {
    event.preventDefault();

    // Show spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';


    // Check if postId is null or undefined
    if (!postId) {
        console.error('Post ID not found');
        // Optionally, redirect the user to an error page or homepage
        return;
    }

    // Get updated post data from form
    const updatedTitle = document.getElementById('title').value;
    const updatedContent = document.getElementById('content').value;
    const updatedImageUrl = document.getElementById('image-url').value;

    // Send updated data to server to update the post
    try {
        // Simulate server request delay (3 seconds)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Hide spinner
        spinner.style.display = 'none';

        // Enable form submission button
        //submitButton.disabled = false;

        // Show alert after delay
        setTimeout(() => {
            alert('Post updated Successfully');
        }, 3000); // Adjust the delay as needed
    } catch (error) {
        console.error('Error updating post:', error);
    }
});