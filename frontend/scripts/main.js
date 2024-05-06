// Fetch posts and display them on page load
window.addEventListener('DOMContentLoaded', async() => {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();; // Read the response as text


        // Display posts on the page (if needed)
        const postList = document.getElementById('post-list');
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>Created at: ${post.created_at}</p>
        <p>Upvotes: ${post.upvotes_count}</p>
        <a href="/update.html?id=${post.post_id}">Read more</a>
        <hr>
    `;
            postList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
});

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission behavior

    const searchQuery = document.getElementById('search-input').value.trim(); // Trim whitespace

    // Check if the search query is not empty
    if (searchQuery) {
        // Generate three posts with the search query and fake data
        const searchResults = generateSearchResults(searchQuery, 3);

        // Display the search results on the page
        displayPosts(searchResults);
    }
});


function generateSearchResults(searchQuery, count) {
    const searchResults = [];
    for (let i = 0; i < count; i++) {
        const randomCreatedAt = getRandomDate(new Date(2020, 0, 1), new Date());
        const randomUpvotes = getRandomNumber(0, 100);
        searchResults.push({
            title: searchQuery,
            created_at: randomCreatedAt,
            upvotes_count: randomUpvotes
        });
    }
    return searchResults;
}

// Function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random date between minDate and maxDate
function getRandomDate(minDate, maxDate) {
    const randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
    return new Date(randomTime).toISOString();
}

// Function to display posts on the page
function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // Clear previous posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p>Created at: ${post.created_at}</p>
            <p>Upvotes: ${post.upvotes_count}</p>
            <hr>
        `;
        postList.appendChild(postElement);
    });
}


const MAX_POSTS = 50;
const MAX_UPVOTES = 213;
const START_YEAR = 2004;
const YEAR_INTERVAL = 7;

// Function to generate random posts
function generateRandomPosts(count) {
    const posts = [];
    for (let i = 0; i < count; i++) {
        const year = START_YEAR + i % YEAR_INTERVAL;
        const upvotes = Math.floor(Math.random() * (MAX_UPVOTES + 1));
        posts.push({ title: `Post ${i + 1}`, year, upvotes });
    }
    return posts;
}

// Function to display posts
function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>Year: ${post.year}</p>
            <p>Upvotes: ${post.upvotes}</p>
            <hr>
        `;
        postList.appendChild(postElement);
    });
}
// Handle reset button click
document.getElementById('reset-button').addEventListener('click', () => {
    location.reload();
});


// Handle sort by year button click
document.getElementById('sort-by-year').addEventListener('click', () => {
    const sortedPosts = generateRandomPosts(MAX_POSTS).sort((a, b) => a.year - b.year);
    displayPosts(sortedPosts);
});

// Handle sort by upvotes button click
document.getElementById('sort-by-upvotes').addEventListener('click', () => {
    const sortedPosts = generateRandomPosts(MAX_POSTS).sort((a, b) => b.upvotes - a.upvotes);
    displayPosts(sortedPosts);
});