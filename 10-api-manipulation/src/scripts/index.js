const githubProfile = "felipeex";
const githubApiUrl = "https://api.github.com";

async function githubApi(path) {
  const response = await fetch(`${githubApiUrl}/${path}`);
  return response;
}

const body = document.querySelector("body");

(async function () {
  /* const profile = await githubApi(`users/${githubProfile}`);
  if (!profile.ok) return; */

  const response = {
    /* faked */ login: "Felipeex",
    id: 70120728,
    node_id: "MDQ6VXNlcjcwMTIwNzI4",
    avatar_url: "https://avatars.githubusercontent.com/u/70120728?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Felipeex",
    html_url: "https://github.com/Felipeex",
    followers_url: "https://api.github.com/users/Felipeex/followers",
    following_url:
      "https://api.github.com/users/Felipeex/following{/other_user}",
    gists_url: "https://api.github.com/users/Felipeex/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Felipeex/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Felipeex/subscriptions",
    organizations_url: "https://api.github.com/users/Felipeex/orgs",
    repos_url: "https://api.github.com/users/Felipeex/repos",
    events_url: "https://api.github.com/users/Felipeex/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/Felipeex/received_events",
    type: "User",
    site_admin: false,
    name: "Felipe Lima",
    company: null,
    blog: "",
    location: "Tarabai, São Paulo, Brasil",
    email: null,
    hireable: null,
    bio: "Software Engineer",
    twitter_username: "FelipeexDev",
    public_repos: 20,
    public_gists: 0,
    followers: 164,
    following: 65,
    created_at: "2020-08-24T01:53:15Z",
    updated_at: "2024-02-13T12:32:01Z",
  };

  body.innerHTML = `
    <section class="profile">
      <img src="${response.avatar_url}"/>

      <div class="informations">
        <h1>${response.name}</h1>
        <span>${response.login}</span>
        <p>${response.bio}</p>
      </div>
    </section>

    <img src="./assets/contributions.png"/>
  `;
})();
