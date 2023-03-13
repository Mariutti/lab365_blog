const postsDiv = document.querySelector(".posts-div");
const postPage = 1;
const postsNumber = 20;
let postPageCounter = postPage;
let postNumberCounter = postsNumber;

const btnGetPosts = document.querySelector("#getPosts");

const getAllPosts = async function getAllPosts(url) {
  const posts = await fetch(url).then((res) => res.json());
  console.log(posts);
  console.log(posts.length);
  return posts;
};

async function criarDivPostagens(postPage, postsNumber) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${postPage}&_limit=${postsNumber}`;
  const criarDivComFetch = await getAllPosts(url);
  const modal = document.querySelector('.modal')
  const closerModal = document.querySelector('.closer')

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
    div.addEventListener("click", someFunction)
    
    
    function someFunction(e){
      function changeModal(){
        modal.style.display = 'block'
      }
      // e.stopPropagation();
      let target = e.target;

      if (target.className != "postDiv"){
        target = target.closest('.postDiv');
        console.log(target)
        changeModal()
        return target
      }  
      changeModal()
      console.log(target)
        return target
    };
  });
  closerModal.addEventListener('click', closeModal)
  function closeModal(e){
    console.log(e.target)
    modal.style.display = 'none'
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
