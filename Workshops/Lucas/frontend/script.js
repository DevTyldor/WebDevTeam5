function confetti() {
    var canvas = document.getElementById("confetti");
    var ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    var particles = [];

    for (var i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
            color: "hsl(" + Math.random() * 360 + ", 100%, 50%)"
        });
    }

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                particles.splice(i, 1);
                i--;
                continue;
            }

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 5, 5);
        }

        requestAnimationFrame(frame);
    }

    frame();
}

function toggle() {
    var toggle = document.getElementById("toggle");
    if (toggle.checked){
        alert("What have you done?!?");
        setTimeout(() => {
            toggle.checked = false;
        }, 1500);
    }
}

function login() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    if(password === "passwordTest0001" && username === "Nairo"){
        alert("Success");
        //confetti();
        
    } else {
        alert("Incorrect username and/or password");
    }

    document.querySelector(".login-card").reset();
}