const queryString = window.location.search;

if (queryString !== "") {
    const urlParams = new URLSearchParams(queryString);

    console.log(queryString);
    console.log(urlParams);

    const code = urlParams.get('code');
    
    authenticateUser(code);
} else { 
    console.log("Please click on link to generate code")
}

async function authenticateUser(code) {
    try {
    
        const response = await fetch(`${backendUrl}/auth`, {
            method : "POST",
            body : JSON.stringify({code : code}),
            headers : {
                'Content-type' : "application/json"
            }
        });

        const jsonData = await response.json();

        console.log(jsonData);

        localStorage.setItem("id", jsonData.id);
        localStorage.setItem("name", jsonData.name);
        localStorage.setItem("avatar", jsonData.avatar);
        localStorage.setItem("accessToken", jsonData.accessToken);
        
        window.location.replace("/pages/home.html");

    } catch (error) {
        
        console.log(error.message, error.response.status, error.response);

        alert(error.message);
        
    }
}