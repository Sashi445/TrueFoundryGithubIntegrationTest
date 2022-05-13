async function getUserRepos() {
  try {
    const userId = localStorage.getItem("id");
    const response = await fetch(`${backendUrl}/repos/${userId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return await response.json();
  } catch (error) {
    alert(error.message);
    return null;
  }
}

function addRepoToDom(repo) {
  return `
        <a href="./create-repo-content.html?repo=${repo.name}">
        <div class="card shadow-4 mb-3">
        <div class="card-body">
            <!-- Title -->
            <div class="d-flex justify-content-between" >
              <div>
                <h6>${repo.name}</h6>
              </div>
              <div>
                <span class="badge bg-dark">${repo.private ? "private" : "public"}</span>
              </div>
            </div>
            <p class="mt-4 mb-6">
                ${repo.description}
            </p>
        </div>
    </div>
        </a>
    `;
}

getUserRepos().then((data) => {
  data.map((i) => {
    document.getElementById("repos").innerHTML += addRepoToDom(i);
  });
});

document.getElementById("username").innerHTML = `${localStorage.getItem(
  "name"
)}`;
