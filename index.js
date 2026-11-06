const images = document.getElementById("gallery");
const loadMore = document.getElementById("load-more");

// search id
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");

let currentPage = 1;
let PageHaijBaigaUtga = "";

const main = async (currentPage) => {
  const response = await fetch(
    `https://api.unsplash.com/photos?page=${currentPage}`,
    {
      headers: {
        Authorization: "Client-ID IZbD4ej_XKzyL6m_ks68jlzl8kiSTBpknb4TZsvAbP8",
      },
    },
  );

  const result = await response.json();

  result.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.small;

    images.innerHTML += `<img src="${imageUrl}" class="rounded-[16px] mb-[22px]" alt="${id}">`;
  });
};

const searchimages = async (currentPage) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(PageHaijBaigaUtga)}&page=${currentPage}`,
    {
      headers: {
        Authorization: "Client-ID IZbD4ej_XKzyL6m_ks68jlzl8kiSTBpknb4TZsvAbP8",
      },
    },
  );
  const result = await response.json();

  result.results.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.small;

    images.innerHTML += `<img src="${imageUrl}" class="rounded-[16px] mb-[22px]" alt="${id}">`;
  });
};

main(currentPage);

loadMore.addEventListener("click", () => {
  currentPage++;

  if (PageHaijBaigaUtga) {
    searchimages(currentPage);
  } else {
    main(currentPage);
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(currentPage);

  PageHaijBaigaUtga = searchInput.value.trim();
  currentPage = 1;
  images.innerHTML = "";
  searchimages(currentPage);
});
