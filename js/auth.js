document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const url =
        API_URL +
        "?action=login" +
        "&username=" + encodeURIComponent(username) +
        "&password=" + encodeURIComponent(password);

    try{

        const res = await fetch(url);

        const data = await res.json();

        if(data.status){

            localStorage.setItem("login","true");
            localStorage.setItem("nama",data.nama);
            localStorage.setItem("level",data.level);

            window.location="dashboard.html";

        }else{

            document.getElementById("pesan").innerHTML=data.message;

        }

    }catch(err){

        document.getElementById("pesan").innerHTML="Tidak dapat terhubung ke server.";

    }

});
