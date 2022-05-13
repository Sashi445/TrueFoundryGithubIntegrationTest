module.exports = {
    backendUri : "https://api.github.com",
    contentType : "application/vnd.github.v3+json",
    generateHeaders : (accessToken) => {
        return ({
            authorization : `Bearer ${accessToken}`,
            accept : "application/vnd.github.v3+json"
        })
    }
}