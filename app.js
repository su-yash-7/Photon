const auth ="563492ad6f917000010000017adccb86a3f845558f1f58961e96a467"; 
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
let searchValue;

async function curatedPhotos(){
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1",{
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    // console.log(data);
    data.photos.forEach(photo => {
        console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        gallery.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}
curatedPhotos(); 

