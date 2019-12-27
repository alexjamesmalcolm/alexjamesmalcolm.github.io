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
      const imageUrl = `https://source.unsplash.com/featured/?programming,code,${repo.name}`;
      const projectsElement = document.querySelector(".projects");
      const languages = await fetch(repo.languages_url).then(response =>
        response.json()
      );
      const readMe = await fetch(
        `https://api.github.com/repos/alexjamesmalcolm/${repo.name}/readme`
      )
        .then(response => response.json())
        .then(obj => obj.content)
        .then(atob);
      const readMeTitles = readMe.match(/(?<=# ).*/gm);
      const readMeImages = readMe.match(/(?<=!\[.*\]\()[^ (){}]*/gm);
      const title = readMeTitles ? readMeTitles[0] : repo.name;
      projectsElement.appendChild(
        htmlToElement(`<article class="project">
      <div class="front side">
        <img alt="${title}" src="${
          readMeImages ? readMeImages[0] : imageUrl
        }" />
        <h3>
          <a href="${repo.homepage}">${title}</a>
        </h3>
      </div>
      <div class="back side">
        <h3>
          <a href="${repo.homepage}">${title}</a>
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
