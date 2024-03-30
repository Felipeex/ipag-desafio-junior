import { languagesColors } from "../utils/laguages-colors.js";

const githubProfile = "felipeex";
const githubApiUrl = "https://api.github.com";

const headers = {
  headers: {
    Authorization:
      "Bearer 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",
  },
};

async function githubApi(path) {
  const response = await fetch(`${githubApiUrl}/${path}`, headers);
  return response.json();
}

async function fetchManyLanguages(url) {
  const response = await fetch(url, headers);
  return response.json();
}

const body = document.querySelector("body");

(async function () {
  const profile = await githubApi(`users/${githubProfile}`);
  const repos = await githubApi(`users/${githubProfile}/repos`);
  if (!profile.id || !repos.length) return;

  await Promise.all(
    repos.map(async (repo) => {
      const laguangesUrl = repo.languages_url;
      const languages = await fetchManyLanguages(laguangesUrl);
      repo.languages = Object.keys(languages);
    })
  );

  body.innerHTML = `
  <main>
    <section class="profile">
      <img src="${profile.avatar_url}"/>
      <div class="informations">
        <h1>${profile.name}</h1>
        <span>${profile.login}</span>
        <p>${profile.bio}</p>
      </div>
    </section>

    <img src="./assets/contributions.png" class="contributions"/>

    <h1 class="title_repos">Repositories</h1>
    <section class="repos">
      ${mountRepo(repos)}
    </section>
  </main>
  `;
})();

function mountRepo(repos) {
  return repos
    .map((repo) => {
      return `
      <div class="repo">
      <span>${repo.name}</span>
      <p>${repo.description ?? "Sem descrição"}</p>

      <div class="tags">
        ${
          repo.languages.length > 0
            ? `<div class="languages">${mountManyLanguagePerRepo(repo)}</div>`
            : ""
        }
        
        <div class="stars">
          <iconify-icon icon="mdi:star-outline" width="16" height="16"></iconify-icon>
          <span>${repo.stargazers_count}</span>
        </div>
      </div>
    </div>
    `;
    })
    .join(" ");
}

function mountManyLanguagePerRepo(repo) {
  return repo.languages
    .map((languageName) => {
      return `
      <div class="language">
          <div class="bullet" style="background: ${languagesColors[languageName]};"></div>
          <span>${languageName}</span>
      </div>
      `;
    })
    .join(" ");
}
