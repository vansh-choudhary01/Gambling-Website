document.addEventListener("DOMContentLoaded", function () {
    // Reset Function
    // function reset() {
    //     // let random = Math.floor(Math.random() * 100000) + 10;
    //     // document.querySelector(".per ul").firstElementChild.innerText = 20240707010900 + random;
    //     // document.querySelector(".timer .remainingtime h3").innerText = 20240707010900 + random + 10;
    //     for (let i = 1; i <= 10; i++) {
    //         newChoice();
    //     }
    // }
    //Reset the Hole prev Colors and Sizes
    // reset();


    let time10 = document.getElementById("time10");
    let time1s = document.querySelectorAll("#time1");
    let minute = document.getElementById("minute");


    async function setInnerText(elem, text) {
        return new Promise(resolve => {
            setTimeout(function () {
                elem.innerText = text;
                resolve();
            }, 1000);
        });
    }

    async function startTimer() {
        try {
            // let currTime = new Date(Date.now()).getSeconds();
            // console.log(Number(currTime));
            let period = document.querySelector(".timer .remainingtime h3");
            period.innerText = parseInt(period.innerText) + 1;
            // setInnerText(minute, 0);
            let last5sec = document.querySelector(".last5sec");

            for (let i = (5 -  Math.floor(new Date(Date.now()).getSeconds()/10))%3; i >= 0; i--) {
                setInnerText(time10, i);
                for (let j = (9 -  new Date(Date.now()).getSeconds()%10); j >= 0; j--) {
                    for (let time1 of time1s) {
                        setInnerText(time1, j);
                    }
                    await setInnerText(time1s[0], j);
                    if (i == 0) {
                        if (j == 5) {
                            last5sec.classList.add("l5s");
                        }
                    }
                }
            }
            // await setInnerText(minute, 1);
            last5sec.classList.remove("l5s");
        } catch(e) {
            console.log(e);
        }
        location.reload();
    }

    startTimer();
});