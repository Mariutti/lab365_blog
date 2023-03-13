const postsDiv = document.querySelector(".posts-div");
const postPage = 1;
const postsNumber = 20;
let postPageCounter = postPage;
let postNumberCounter = postsNumber;

const btnGetPosts = document.querySelector("#getPosts");

const getAllPosts = async function getAllPosts(url) {
  const posts = await fetch(url).then((res) => res.json());
  // console.log(posts);
  // console.log(posts.length);
  return posts;
};

async function criarDivPostagens(postPage, postsNumber) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${postPage}&_limit=${postsNumber}`;
  const criarDivComFetch = await getAllPosts(url);
  const modal = document.querySelector(".modal");
  const closerModal = document.querySelector(".closer");

  criarDivComFetch.forEach((post) => {
    const div = document.createElement("div");
    div.id = post.id;
    div.className = "postDiv";
    div.innerHTML = `<p>postagem ${post.id}<p>
    <div class="title">
    <h2>${post.title}</h2>
    </div>
    <div class="post-body">
    <p>${post.body}</p>
    </div>`;

    postsDiv.appendChild(div);
    div.addEventListener("click", openModal);
  });

  // Open Modal
  function openModal(e) {
    function changeModal() {
      modal.style.display = "block";
    }
    let target = e.target;

    if (target.className != "postDiv") {
      target = target.closest(".postDiv");
      changeModal();
      return target;
    }
    changeModal();
    return target;
  }

  //Close Modal
  closerModal.addEventListener("click", closeModal);
  function closeModal(e) {
    modal.style.display = "none";
  }
}

criarDivPostagens(postPage, postsNumber);

btnGetPosts.addEventListener("click", getMorePosts);

async function getMorePosts() {
  postNumberCounter += postsNumber;
  postPageCounter += postPage;
  await criarDivPostagens(postPageCounter, postsNumber);

  const postsDivCounter = document.querySelectorAll(".postDiv");

  if (postsDivCounter.length < postNumberCounter) {
    btnGetPosts.style.display = "none";
    const p = document.createElement("p");
    p.innerText = "Não há mais postagens para carregar!";
    postsDiv.appendChild(p);
  }
}

function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}

async function doCommentsList() {
  const
}

// Crie uma variável para armazenar o post mais recente clicado (cou chamar de currentPost para poder fazer referência);

// Crie uma função que receba como parâmetro um id de post e faça uma consulta ao endpoint de comentários usando este id. O endpoint é: https://jsonplaceholder.typicode.com/posts/${postId}/comments;

// Retorne os comentários;

// Teste a função de busca de comentários;

// Crie uma função que receba como parâmetro id, body e title (de um post) e a partir disso carregue os posts usando a função do tópico 2, além disso, defina o calor da variável currentPost para os valores recebidos como parâmetro id, body, title e comments que foi carregado agora;

// Continuidade
