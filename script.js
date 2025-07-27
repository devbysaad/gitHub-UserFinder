let searchBtn = document.querySelector('.searchBtn')
let usernameInp = document.querySelector('.usernameInp')
let card = document.querySelector('.card')
let usernotfound = document.querySelector('.usernotfound')

function getUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error("Something went Worng")
        return raw.json()
    })
}

function getUserProfileRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
        if (!raw.ok) throw new Error("Something went Worng")
        return raw.json()
    })

}

function decurateProfileData(detail) {
console.log(detail);

    let data = `<div class="underCard">
            <!-- Avatar -->
            <div>
                <img src="${detail.avatar_url}" alt="GitHub Avatar"
                    class="w-28 h-28 rounded-full border-4 border-[#161b22] shadow-md" />
            </div>

            <!-- User Info -->
            <div class="flex-1 space-y-1">
                <h2 class="text-2xl font-semibold text-white">${detail.name}</h2>
                <p class="text-gray-400">${detail.login}</p>
                <p class="text-gray-300 mt-2">z
                   ${detail.bio ? detail.bio:""}
                </p>

                <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400">
                    <p><span class="font-medium text-white">Company:</span> ${detail.company ?detail.company:""}</p>
                    <p><span class="font-medium text-white">Location:</span> ${detail.location ? detail.location:""}</p>
                    <p><span class="font-medium text-white">Website:</span> <a href="${detail.devbysaad ? detail.devbysaad : ""}"
                            target="_blank" class="text-blue-500 hover:underline">github.blog</a></p>
                    <p><span class="font-medium text-white">Twitter:</span> <a href="${detail.login ? detail.login: " "}"
                            target="_blank" class="text-blue-400 hover:underline">${detail.login}</a></p>
                    <p><span class="font-medium text-white">Followers:</span> ${detail.followers}</p>
                    <p><span class="font-medium text-white">Following:</span> ${detail.following}</p>
                    <p><span class="font-medium text-white">Public Repos:</span> ${detail.public_repos}</p>
                </div>

                <div class="mt-4">
                    <a href="${detail.html_url}" target="_blank"
                        class="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </div>
        </div>`
    card.innerHTML = data;
}



searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let username = usernameInp.value.trim();
    if (username.length > 0) {
        getUserProfile(username).then((data) => {
            decurateProfileData(data)
        })
    } else { alert('Please Write the name to find the user'); }


})
