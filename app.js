const auth ="563492ad6f917000010000017adccb86a3f845558f1f58961e96a467"; 
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//event listiner
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue)

});
more.addEventListener("click",loadMore);

function updateInput(e){
    searchValue = e.target.value;
}
async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}
function genetarePicturs(data){
    data.photos.forEach(photo => {
        //console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        gallery.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Downlode</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&per_page=1";
    const data = await fetchApi(fetchLink)
    genetarePicturs(data);
}
async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink)
    genetarePicturs(data);

}
function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
}
async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}}+query&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&per_page=${page}`;
    }
    const data = await fetchApi(fetchLink)
    genetarePicturs(data); 
}
curatedPhotos(); 

