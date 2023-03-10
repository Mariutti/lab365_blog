
const url = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20'



async function getAllPosts() {
  const posts = await fetch(url)
  .then((res) => res.json());  
  console.log(posts)
  return posts
 
}

const postsDiv = document.querySelector('.posts-div')

async function criarDivPostagens() {
  const criarDivComFetch = await getAllPosts();

  criarDivComFetch.forEach(post => {
    const div = document.createElement('div');
    div.id = post.id;
    div.className = 'postDiv'
    div.innerHTML = 
    `<p>Postagem número ${post.id}<p>
    <div class="title">
      <h2>${post.title}</h2>
    </div>
    <div class="post-body">
      <p>${post.body}</p>
    </div>
    <div class="user-id"><p>Usuário ${post.userId}</p></div>`
    

    postsDiv.appendChild(div)
  });
  
}

criarDivPostagens();

