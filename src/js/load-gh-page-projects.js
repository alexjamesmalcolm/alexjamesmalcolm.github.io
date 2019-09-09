/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

fetch("https://api.github.com/users/alexjamesmalcolm/repos?per_page=100")
  .then(response => response.json())
  .then(repos => repos.filter(repo => repo.homepage))
  .then(repos => repos.filter(repo => !repo.fork))
  .then(repos =>
    repos.forEach(async repo => {
      const imageUrl = `https://source.unsplash.com/random/?programming,code,${repo.name}`;
      const projectsElement = document.querySelector(".projects");
      const languagesResponse = await fetch(repo.languages_url);
      const languages = await languagesResponse.json();
      projectsElement.appendChild(
        htmlToElement(`<article class="project">
      <div class="front side">
        <img alt="${repo.name}" src="${imageUrl}" />
        <h3>
          <a href="${repo.homepage}">
            ${repo.name}
          </a>
        </h3>
      </div>
      <div class="back side">
        <h3>
          <a href="${repo.homepage}">
            ${repo.name}
          </a>
        </h3>
        <p>
          ${repo.description ? repo.description : ""}
        </p>
        <div class="tags">
          <ul class="tags">
            ${Object.keys(languages)
              .map(language => `<li class="tag">${language}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    </article>`)
      );
    })
  );
