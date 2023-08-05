const body = document.body;
const menuToggle = document.getElementById("menu__toggle");
const roadmapBox = document.querySelector(".roadmap-box");
const allBox = document.querySelector(".all-box");




const feedBackBox = document.getElementById("feedBackBox");
const feedsCount = document.querySelector(".feeds-count");
const feedSort = document.getElementById("sort");

const all = document.querySelector(".all");
const ui = document.querySelector(".ui");
const ux = document.querySelector(".ux");
const enhancement = document.querySelector(".enhancement");
const bug = document.querySelector(".bug");
const feature = document.querySelector(".feature");

let data = [];

async function fetchAndRenderData() {
  try {
    const response = await fetch("../../Json/feedback.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    data = await response.json();

    feedBackBox.innerHTML = "";

    const statusCounts = {};

    data.forEach((item) => {
      const status = item.status;
      if (!statusCounts[status]) {
        statusCounts[status] = 1;
      } else {
        statusCounts[status]++;
      }

      feedsCount.innerHTML = `
        <li>${statusCounts.Planned || 0}</li>
        <li>${statusCounts["In-Progress"] || 0}</li>
        <li>${statusCounts.Live || 0}</li>`;

      const section = document.createElement("section");
      section.className = "add-feedback-box";

      const countFeedDiv = document.createElement("div");
      countFeedDiv.className = "count-feed";

      const countButton = document.createElement("button");
      const countImg = document.createElement("img");
      countImg.src = "./assets/icons/chevron-up.svg";
      countImg.alt = "up";

      const countReitin = document.createElement("span");
      countReitin.className = "countReitin";
      countReitin.textContent = item.rating;

      countButton.appendChild(countImg);
      countButton.appendChild(document.createElement("br"));
      countButton.appendChild(countReitin);
      countFeedDiv.appendChild(countButton);

      const textFeedBoxDiv = document.createElement("div");
      textFeedBoxDiv.className = "text-feed-box";

      const textFeedDiv = document.createElement("div");
      textFeedDiv.className = "text-feed";

      const titleHeading = document.createElement("h2");
      titleHeading.textContent = item.title;

      const textParagraph = document.createElement("p");
      textParagraph.textContent = item.text;

      const categoryButton = document.createElement("button");
      categoryButton.textContent = item.category;

      textFeedDiv.appendChild(titleHeading);
      textFeedDiv.appendChild(textParagraph);
      textFeedDiv.appendChild(categoryButton);

      const feedComDiv = document.createElement("div");
      feedComDiv.className = "feed-com";

      const commentImg = document.createElement("img");
      commentImg.src = "./assets/icons/comment.svg";
      commentImg.alt = "comment";

      const commentSpan = document.createElement("span");
      commentSpan.textContent = item.comment;

      feedComDiv.appendChild(commentImg);
      feedComDiv.appendChild(commentSpan);

      textFeedBoxDiv.appendChild(textFeedDiv);
      textFeedBoxDiv.appendChild(feedComDiv);

      section.appendChild(countFeedDiv);
      section.appendChild(textFeedBoxDiv);

      countButton.addEventListener("click", () => {
        item.rating++;
        countReitin.textContent = item.rating.toString();
      });

      feedBackBox.appendChild(section);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function filterAndDisplay(category) {
  const feedbackSections = feedBackBox.querySelectorAll(".add-feedback-box");
  feedbackSections.forEach((section) => {
    const categoryButton = section.querySelector(".text-feed button");
    if (categoryButton.textContent === category || category === "all") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

all.addEventListener("click", () => filterAndDisplay("all"));
ui.addEventListener("click", () => filterAndDisplay("UI"));
ux.addEventListener("click", () => filterAndDisplay("UX"));
enhancement.addEventListener("click", () => filterAndDisplay("Enhancement"));
bug.addEventListener("click", () => filterAndDisplay("Bug"));
feature.addEventListener("click", () => filterAndDisplay("Feature"));

function sortAndDisplay() {
  const value = feedSort.options[feedSort.selectedIndex].value;
  console.log(value);

  switch (value) {
    case "mostcom":
      data.sort((a, b) => (b.comment || 0) - (a.comment || 0));
      break;
    case "leastcom":
      data.sort((a, b) => (a.comment || 0) - (b.comment || 0));
      break;
    case "mostup":
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "leastup":
      data.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      break;
    default:
      break;
  }

  feedBackBox.innerHTML = ""; // Clear the existing content

  data.forEach((item) => {
    const section = document.createElement("section");
    section.className = "add-feedback-box";

    const countFeedDiv = document.createElement("div");
    countFeedDiv.className = "count-feed";

    const countButton = document.createElement("button");
    const countImg = document.createElement("img");
    countImg.src = "./assets/icons/chevron-up.svg";
    countImg.alt = "up";

    const countReitin = document.createElement("span");
    countReitin.className = "countReitin";
    countReitin.textContent = item.rating;

    countButton.appendChild(countImg);
    countButton.appendChild(document.createElement("br"));
    countButton.appendChild(countReitin);
    countFeedDiv.appendChild(countButton);

    const textFeedBoxDiv = document.createElement("div");
    textFeedBoxDiv.className = "text-feed-box";

    const textFeedDiv = document.createElement("div");
    textFeedDiv.className = "text-feed";

    const titleHeading = document.createElement("h2");
    titleHeading.textContent = item.title;

    const textParagraph = document.createElement("p");
    textParagraph.textContent = item.text;

    const categoryButton = document.createElement("button");
    categoryButton.textContent = item.category;

    textFeedDiv.appendChild(titleHeading);
    textFeedDiv.appendChild(textParagraph);
    textFeedDiv.appendChild(categoryButton);

    const feedComDiv = document.createElement("div");
    feedComDiv.className = "feed-com";

    const commentImg = document.createElement("img");
    commentImg.src = "./assets/icons/comment.svg";
    commentImg.alt = "comment";

    const commentSpan = document.createElement("span");
    commentSpan.textContent = item.comment;

    feedComDiv.appendChild(commentImg);
    feedComDiv.appendChild(commentSpan);

    textFeedBoxDiv.appendChild(textFeedDiv);
    textFeedBoxDiv.appendChild(feedComDiv);

    section.appendChild(countFeedDiv);
    section.appendChild(textFeedBoxDiv);

    countButton.addEventListener("click", () => {
      item.rating++;
      countReitin.textContent = item.rating.toString();
    });

    feedBackBox.appendChild(section);
  });
}

feedSort.addEventListener("change", sortAndDisplay);

fetchAndRenderData();
 
