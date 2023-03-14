const postsDiv = document.querySelector(".posts-div");
const postPage = 1;
const postsNumber = 20;
let postPageCounter = postPage;
let postNumberCounter = postsNumber;
const divMessage = document.querySelector(".divMessage");

const btnGetPosts = document.querySelector("#getPosts");

const getAllPosts = async function getAllPosts(url) {
  const posts = await fetch(url).then((res) => res.json());
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
    // <div class="user-id"><p>Usuário ${post.userId}</p></div>

    postsDiv.appendChild(div);

    div.addEventListener("click", openModal);

    function openModal(e) {
      function changeModal() {
        modal.style.display = "block";
      }
      // e.stopPropagation();
      let target = e.target;

      if (target.className != "postDiv") {
        target = target.closest(".postDiv");
        // console.log(target);
        changeModal();
        postComments(post.id);
        return target;
      }

      closerModal.addEventListener("click", closeModal);

      changeModal();
      // console.log(target);
      return target;
    }
  });
  function getComments(postId) {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
  }
  async function postComments(postId) {
    const messages = await getComments(postId).then((res) => res.json());
    messages.forEach((message) => {
      const divPostagem = document.createElement("div");
      divPostagem.className = "postDiv";

      divPostagem.innerHTML += ` <h2 class="name">Nome: ${message.name}</h2>
      <p class="message">Message: ${message.body}</p>
      <p class="e-mail">e-mail: ${message.email}</p>
      `;
      divMessage.appendChild(divPostagem);
    });
  }

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
