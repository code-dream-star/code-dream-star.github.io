!(function () {
    const date = new Date();
    const list = [
        [12, 13],
        [2, 21],
        [3, 21],
        [11,30]
    ];
    if (
        list
            .map((a) => {
                return JSON.stringify(a);
            })
            .includes(JSON.stringify([date.getMonth() + 1, date.getDate()]))
    ) {
        document.querySelector("html").style.filter = "grayscale(1)";
    }
})();

$(".app-header-right-navigate-div").each((_, a) => {
    a.addEventListener("click", function () {
        const lb = createloadborder();
        const f = fetch(a.getAttribute("url"))
        f.then(() => {
            lb.off();
            history.pushState({}, "", a.getAttribute("url"));
            $(".app-header-right-navigate-div").each((_, a) => {
                a.classList.remove("app-header-right-navigate-div-active");
            });
            $(a).addClass("app-header-right-navigate-div-active");
        });
        f.catch(() => {
            history.pushState({}, "", a.getAttribute("url"));
            ($("#app").html(`<div 404errornotpagediv><div class="app-paragraph">
                    <div class="app-paragraph-title">
                        <h2>OMG！Error Occurred！</h2>
                    </div>
                    <div class="app-paragraph-content"><div class="app-paragraph-content-textdark"></div></div>
                    <p><a href="" class="app-blue-button"><span>重新加载</span></a></p>
                </div></div>`))
        })
    })
})

function loadPR(username) {
    const config = {
        "1086-loves-programming": {
            img: "./static/img/headimg/1086.png",
            name: "1086爱编程",
            v: ["队长", "核心开发员"],
            d: "https://1086tech.github.io/",
            codemaoid: "13869990",
        },
        "xiaohong2022": {
            img: "./static/img/headimg/小宏.png",
            name: "小宏XeLa",
            v: ["核心开发员"],
            d: "az",
            codemaoid: "9232151",
        },
        "123213123123": {
            img: "./static/img/headimg/木水屑.png",
            name: "木水屑",
            v: ["积木制作", "核心开发员"],
            d: "- 暂无简介 -",
        },
    }
    const s =
        config[username]
        ||
        {
            img: "https://cdn-community.codemao.cn/community_frontend/asset/default_guest_3f731.png",
            name: "ERR_INVALID_USER",
            v: [],
            d: "",
            errormsg: "用户不存在！"
        };
    $(`<div class="app-user-detailed" username="${username}" ><div class="app-user-detailed-banner"><div class="app-user-detailed-container"><div class="app-user-detailed-container-left"><div class="app-user-detailed-container-left-headimg"><img src="${s.img}" class="app-user-detailed-container-left-headimg-imgroot" draggable="false"></div><div class="app-user-detailed-container-left-config"><div class="app-user-detailed-container-left-config-top"><span class="app-user-detailed-container-left-config-top-name">${s.name}</span>${s.v.map((a) => { return `<v class="app-user-detailed-container-left-config-top-tag">${a}</v>` }).join("")}</div><div class="app-user-detailed-container-left-config-d"><p class="app-user-detailed-container-left-config-d-p">${s.d}</p></div></div></div></div></div></div><div class="app-paragraph"><div class="app-paragraph-title"><h2>用户传送门</h2></div>${!s.errormsg ? `<a href="https://github.com/${username}" target="_blank" class="app-blue-button"><span>Github</span></a>${(s.codemaoid ? `<a href="https://shequ.codemao.cn/user/${s.codemaoid}" target="_blank" class="app-blue-button"><span>编程猫</span></a>` : "")}${s.box3id ? `<a href="https://box3.codemao.cn/u/${s.box3id}" target="_blank" class="app-blue-button"><span>Box3</span></a>` : ""}` : `<div class="app-paragraph-content-textdark">该用户好像还没有设置传送门呢</div><script>setTimeout(()=>{alert("用户不存在")},200)</script>`}</div></div>`)
        .appendTo($("#app > div:not([class])[peopleread]")[0])
}

function createloadborder() {
    const s = $("<div class='app-header-border'></div>")
    s.appendTo($("#app")[0])
    s.css("opacity", "1");
    let x = 0;
    setTimeout(() => {
        x = 10;
    }, 300)
    const w = setInterval(() => {
        s.css("width", x + "%");
        x += 0.5;
        if (x > 98) {
            clearInterval(w);
        }
    }, 250)
    return {
        off() {
            clearInterval(w);
            s.css("width", "100%")
            s.css("opacity", "0")
            setTimeout(() => {
                s[0].remove()
            }, 300)
        }
    }
}

function loadpage() {
    $(".app-header-right-navigate-div").each((_, a) => {
        a.classList.remove("app-header-right-navigate-div-active");
    });
    let sw = 0;
    $(".app-boards").css("display", "")
    $(`#app > div:not([class])[peopleread] *`).each((_, a) => { a.remove() })
    try {
        const s = location.search.slice(1).split("&").map((a) => { return a.split("=") });
        if (s[0][1]) {
            $(`.app-header-right-navigate-div[url="?page=${s[0][1]}"]`).addClass("app-header-right-navigate-div-active")
            $(`#app > div:not([class])`).each((_, a) => {
                if (s[0][1] in a.attributes) {
                    $(a).css("display", "")
                    sw++;
                } else {
                    $(a).css("display", "none")
                }
            })
        } else {
            $(`.app-header-right-navigate-div[url="?"]`).addClass("app-header-right-navigate-div-active")
            $(`#app > div:not([class])`).each((_, a) => {
                if ("home" in a.attributes) {
                    $(a).css("display", "")
                    sw++;
                } else {
                    $(a).css("display", "none")
                }
            })
        }
    } catch (e) {
        $(`.app-header-right-navigate-div[url="?"]`).addClass("app-header-right-navigate-div-active")
        $(`#app > div:not([class])`).each((_, a) => {
            if ("home" in a.attributes) {
                $(a).css("display", "")
                sw++;
            } else {
                $(a).css("display", "none")
            }
        })
    }
    const s1 = location.search.slice(1).split("&").map((a) => { return a.split("=") });
    try {
        if (s1[1][0] == "name") {
            loadPR(s1[1][1])
            $(".app-boards").css("display", "none")
        }
    } catch (e) { }
    if (sw == 0) {
        ($("#app").html(`<div 404errornotpagediv><div class="app-paragraph">
        <div class="app-paragraph-title">
            <h2>OMG！404 - Not Found！</h2>
        </div>
        <div class="app-paragraph-content"><div class="app-paragraph-content-textdark"></div></div>
        <p><a href="?" class="app-blue-button"><span>返回主页</span></a></p>
    </div></div>`))
    }
}

; (() => {
    let s = location.href
    setInterval(() => {
        if (location.href != s) {
            loadpage();
            s = location.href;
        }
    })
})();

window.boardsnow = 0;

window.addEventListener("load", () => {
    loadpage();
})

if (typeof window.$boardsdata != [][0] + []) {
    if (Array.isArray(window.$boardsdata)) {
        window.$boardsdata.forEach((e) => {
            $(`<div class="app-boards-root-img"><img src="${e.img}" url="${e.url}"></div>`).appendTo($(".app-boards-root")[0])
            $(`<div class="app-boards-bottom-buttons-div"></div>`).appendTo($(".app-boards-bottom-buttons")[0])
        });
    }
}

if (typeof window.$about_development_history_data != [][0] + []) {
    if (Array.isArray(window.$about_development_history_data)) {
        $(`<li></li>`).appendTo($(".about-development-history-select>ul")[0])
        window.$about_development_history_data.forEach((e) => {
            $(`<li class="about-development-history-text-div" date="${e.date}">
            <div class="about-development-history-div-date"><span>${e.date}</span></div>
            <div class="about-development-history-div-content">${e.data.map((v) => { return `<div class="about-development-history-div-content-div"><span>${v}</span></div>` }).join("")}</div>
            </li>`).appendTo($(".about-development-history .app-paragraph-content .text")[0]);
            $(`<li class="point"></li>`).appendTo($(".about-development-history .app-paragraph-content .axis")[0])
            for (let i in "0".repeat(e.data.length)) {
                $(`<li></li>`).appendTo($(".about-development-history .app-paragraph-content .axis")[0])
            }
        });
        $(`<li></li>`).appendTo($(".about-development-history-select>ul")[0])
    }
}


$(".app-paragraph-content-table-div[url]").each((_, a) => {
    a.addEventListener("click", function () {
        if (a.getAttribute("target") == "this") {
            const urlobject = new URL(`${location.href}`);
            urlobject.href = a.getAttribute("url")
            console.log(urlobject)
            const lb = createloadborder();
            const f = fetch(urlobject.href)
            f.then(() => {
                lb.off();
                history.pushState({}, "", a.getAttribute("url"));
            });
            f.catch(() => {
                history.pushState({}, "", a.getAttribute("url"));
                ($("#app").html(`<div 404errornotpagediv><div class="app-paragraph">
                    <div class="app-paragraph-title">
                        <h2>OMG！504 - Error Occurred！</h2>
                    </div>
                    <div class="app-paragraph-content"><div class="app-paragraph-content-textdark"></div></div>
                    <p><a href="" class="app-blue-button"><span>重新加载</span></a></p>
                </div></div>`))
            })
        } else if (a.getAttribute("target") == "thisotherpage") {
            location.href = a.getAttribute("url");
        } else {
            window.open(a.getAttribute("url"));
        }
    })
})

$(`.app-boards-root`).each((_, a) => {
    var xasfw = 0;
    let now;
    let ct = 0;
    let backc = false;
    let opened = false;
    setInterval(() => {
        $(a).width($(window).width());
    })
    setInterval(() => {
        if (a.className.split(" ").includes("mouseenter")) {
            xasfw = 0;
            return
        }
        if (a.className.split(" ").includes("draging")) {
            xasfw = 0;
            return
        }
        if (xasfw > 3) {
            window.boardsnow += 1;
            if (window.boardsnow >= $(`.app-boards-root > div`).length) {
                window.boardsnow = 0;
            }
            xasfw = 0;
        } else {
            xasfw++
        }
    }, 1000);
    function dragfinish(e) {
        if (Date.now() - ct < 100) {
            try {
                if (e.target.localName == "img") {
                    window.open(e.target.getAttribute("url"));
                    opened = true;
                } else {
                    opened = false;
                }
            } catch (e) {
                opened = false;
            }
        };
        document.onmousemove = null;
        const s = window.boardsnow - ~~(window.boardsnow)
        console.log({ s, b: backc, t: Date.now() - ct, o: false })
        if (!backc) {
            if (s > 0.3) {
                window.boardsnow = ~~(window.boardsnow) + 1;
            } else {
                window.boardsnow = ~~(window.boardsnow);
            }
        } else {
            if (s > 0.6) {
                window.boardsnow = ~~(window.boardsnow) + 1;
            } else {
                window.boardsnow = ~~(window.boardsnow);
            }
        }
        a.classList.remove("mouseenter");
        a.classList.remove("draging");
        if (window.boardsnow >= $(`.app-boards-root > div`).length) {
            window.boardsnow = $(`.app-boards-root > div`).length - 1;
        }
        if (window.boardsnow < 0) {
            window.boardsnow = 0;
        }
    }
    a.addEventListener("mouseenter", function () {
        if (a.className.split(" ").includes("draging")) return;
        $(a).addClass("mouseenter");
    });
    a.addEventListener("mouseout", function () {
        if (a.className.split(" ").includes("draging")) dragfinish();
        if (a.className.split(" ").includes("draging")) return;
        a.classList.remove("mouseenter");
    });
    a.addEventListener("mousedown", function (e) {
        ct = Date.now();
        const { offsetX } = e;
        now = window.boardsnow;
        $(a).addClass("mouseenter");
        $(a).addClass("draging");
        document.onmousemove = (e1) => {
            const { pageX } = e1;
            window.boardsnow = now + (-(pageX - offsetX) / $(window).width());
            backc = String(-(pageX - offsetX) / $(window).width()).includes("-");
        }
    });
    a.addEventListener("mouseup", dragfinish);
})

$(`.app-boards-root > div,.app-boards-root > div > img`).each((_, a) => {
    setInterval(() => {
        $(a).width($(window).width());
    })
})

$(`.app-boards`).each((_, a) => {
    setInterval(() => {
        $(a).height($(".app-boards-root-img").height());
    })
})

$(`img`).each((_, a) => {
    a.setAttribute("draggable", "false");
})

$(`.app-boards-root > div`).each((i, a) => {
    setInterval(() => {
        $(a).width($(window).width());
        $(a).css("transform", `translateX(${-((window.boardsnow - i) * $(window).width())}px)`);
    })
});

$(`.app-boards-root > div`).each((i, a) => {
    setInterval(() => {
        $(a).width($(window).width());
        $(a).css("transform", `translateX(${-((window.boardsnow - i) * $(window).width())}px)`);
    })
});

$(`.app-header`).each((_, a) => {
    setInterval(() => {
        if ($("#app")[0].scrollTop > 20) {
            $(a).addClass("fixed");
        } else {
            a.classList.remove("fixed")
        }
    })
});

$(`#app`).each((_, a) => {
    let x = 0;
    setInterval(() => {
        if (x != a.scrollTop) {
            if (x - a.scrollTop > 0) {
                $(".app-header")[0].classList.remove("hide");
            } else {
                $(".app-header").addClass("hide");
            }
            x = a.scrollTop
        }
    }, 100)
});


window.addEventListener("load", () => {
    loadpage();
    console.log("loaded!");
    $("#loading").css("display", "none")
})

$(".environmental-monitoring-start")[0].addEventListener("click", function () {
    alert("未开发")
})
