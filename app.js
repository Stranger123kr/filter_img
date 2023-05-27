// select all filter buttons and filterable card

let filter_buttons = document.querySelectorAll(".filter_buttons button");
const filterable_Cards = document.querySelectorAll(".filterable_Cards .card");
const filterable_Cards_2 = document.querySelector(".filterable_Cards");
const loading = document.querySelector(".loading");

// this is a function for loading

function show() {
  loading.classList.add("show");
}
function hide() {
  loading.classList.remove("show");
}

// Define the filter_cards functions

const filleter_Card = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  get_Category(e.target.getAttribute("data-name"));

  // Iterates over each filterable cards

  filterable_Cards.forEach((card) => {
    // add hide class to hide the card initially

    // check if the cards matches the selected filter or "all" is selected
    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
};

// Add click Event listener to each filter buttons

filter_buttons.forEach((button) =>
  button.addEventListener("click", filleter_Card)
);

get_Category();
// ==================================== fetch data from api  ==============

// ============== this is a function to fetch all data form server ==========================

async function get_Category(value, num) {
  show();
  let url = `https://pixabay.com/api/?key=36758041-1a16a3c3ed36636148e43569c&q=${
    value == undefined ? "all" : value
  }&image_type=photo&per_page=${num}`;

  const data = await fetch(url)
    .then((items) => items.json())
    .then((data) => {
      hide();
      get_images(data.hits, value);
    });
}

// =================================== this is function to get api data ===============
let phones = "";
let clothes = "";
let shoes = "";
let all = "";
function get_images(img, value) {
  // === this is all declare variables ===

  img.forEach((images) => {
    // <!-- =========== one filter Images ========== -->
    if (value === "phones") {
      phones += `
    
    <div class="card" data-name="phones">
    <img src="${images.webformatURL}" alt="Phones_img" />
    
    <!-- === Filter cards_body === -->
    <div class="card_body">
      <h6 class="card_title">Phones</h6>
      <p class="card_text">${images.tags}</p>
      </div>
      </div>
      
      
      `;
    }

    // <!-- =========== two filter Images ========== -->
    else if (value === "clothes") {
      clothes += `

    <div class="card" data-name="clothes">
    <img src="${images.webformatURL}" alt="clothes_img" />
    
    <!-- === Filter cards_body === -->
    <div class="card_body">
      <h6 class="card_title">Cloth</h6>
      <p class="card_text">${images.tags}</p>
      </div>
      </div>
      
      
      `;
    }

    // <!-- =========== three filter Images ========== -->
    else if (value === "shoes") {
      shoes += `

  <div class="card" data-name="shoes">
  <img src="${images.webformatURL}" alt="Shoes_img" />
  
  <!-- === Filter cards_body === -->
  <div class="card_body">
  <h6 class="card_title">Shoes</h6>
  <p class="card_text">${images.tags}</p>
  </div>
  </div>
  
 
`;
    }

    // <!-- =========== three filter Images ========== -->
    else if (value === "all") {
      all += `

  <div class="card" data-name="all">
  <img src="${images.webformatURL}" alt="Mix_content_img" />
  
  <!-- === Filter cards_body === -->
  <div class="card_body">
  <h6 class="card_title">Mix content</h6>
  <p class="card_text">${images.tags}</p>
  </div>
  </div>
  
 
`;
    }

    // <!-- =========== this is default filter Images ========== -->
    else {
      all += `

  <div class="card" data-name="all">
  <img src="${images.webformatURL}" alt="Mix_content_img" />
  
  <!-- === Filter cards_body === -->
  <div class="card_body">
  <h6 class="card_title">Mix content</h6>
  <p class="card_text">${images.tags}</p>
  </div>
  </div>
  
 
`;
    }
  });

  // this is a functionality to put items in display

  if (value === "phones") {
    filterable_Cards_2.innerHTML = phones;
  } else if (value === "clothes") {
    filterable_Cards_2.innerHTML = clothes;
  } else if (value === "shoes") {
    filterable_Cards_2.innerHTML = shoes;
  } else {
    filterable_Cards_2.innerHTML = all;
  }
}

window.addEventListener("scroll", (e) => {
  // console.log(document.documentElement.scrollTop);
  // console.log(window.innerHeight);
  // console.log(window.pageYOffset);
  // console.log(document.documentElement.offsetHeight);
  // console.log(document.documentElement.offsetHeight - window.innerHeight);

  if (
    document.documentElement.offsetHeight - window.innerHeight <=
    window.pageYOffset
  ) {
    increment();
  }
});

let increase = 0;
function increment() {
  get_Category(increase++);
}
