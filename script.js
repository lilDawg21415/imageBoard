const form = document.getElementById('postForm');
const postsDiv = document.getElementById('posts');

// Load posts from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(post => addPost(post.text, post.image));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const text = document.getElementById('postText').value;
  const file = document.getElementById('postImage').files[0];

  let imageData = '';

  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      imageData = evt.target.result;
      savePost(text, imageData);
      addPost(text, imageData);
      form.reset();
    };
    reader.readAsDataURL(file);
  } else {
    savePost(text, imageData);
    addPost(text, imageData);
    form.reset();
  }
});

function savePost(text, image) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push({ text, image });
  localStorage.setItem('posts', JSON.stringify(posts));
}

function addPost(text, image) {
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  
  postDiv.innerHTML = `
    <p>${text}</p>
    ${image ? `<img src="${image}" alt="Posted Image">` : ''}
  `;

  postsDiv.prepend(postDiv);
}
