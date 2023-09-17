!function () {
    window.BoardsStop = true
    !(function () {
        const date = new Date();
        const list = [
            [12, 13],
            [2, 21],
            [3, 21],
            [9, 18],
            [7, 7]
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

    function loadPR(username) {
        // $(`#app > div:not([class])[type="member-homepage"] *`).each((_, a) => { a.remove() })
        // const s =
        //     USERCONFIG[username]
        //     ||
        //     {
        //         img: "https://cdn-community.codemao.cn/community_frontend/asset/default_guest_3f731.png",
        //         name: "ERR_INVALID_USER",
        //         v: [],
        //         d: "",
        //         errormsg: "用户不存在！"
        //     };
        // $(`<div class="app-user-detailed" username="${username}" >
        // <div class="app-user-detailed-banner">
        // <div class="app-user-detailed-container">
        // <div class="app-user-detailed-container-left">
        // <div class="app-user-detailed-container-left-headimg">
        // <img src="${s.img == "q" ? "https://q1.qlogo.cn/g?b=qq&nk=" + s.qq + "&s=640" : s.img}" class="app-user-detailed-container-left-headimg-imgroot" draggable="false">
        // </div>
        // <div class="app-user-detailed-container-left-config">
        // <div class="app-user-detailed-container-left-config-top">
        // <span class="app-user-detailed-container-left-config-top-name">${s.name}</span>
        // ${s.v.map((a) => { return `<v class="app-user-detailed-container-left-config-top-tag">${a}</v>` }).join("")}
        // </div>
        // <div class="app-user-detailed-container-left-config-d">
        // <p class="app-user-detailed-container-left-config-d-p">${s.d}</p>
        // </div>
        // </div>
        // </div>
        // </div>
        // </div>
        // </div>
        // </div>`)
        //     .appendTo($("#app > div:not([class])[type=\"member-homepage\"]")[0])
        //         var x = HTMLToNode(`<div class="app-user-detailed" username="${username}">
        //         <div class="app-user-detailed-banner">
        //             <div class="app-user-detailed-container">
        //                 <div class="app-user-detailed-container-left">
        //                     <div class="app-user-detailed-container-left-headimg">
        //                         <img src="${e.img == "q" ? `https://q1.qlogo.cn/g?b=qq&nk=${e.qq}&s=640` : e.img}"
        //                             class="app-user-detailed-container-left-headimg-imgroot" draggable="false">
        //                     </div>
        //                     <div class="app-user-detailed-container-left-config">
        //                         <div class="app-user-detailed-container-left-config-top">
        //                             <span class="app-user-detailed-container-left-config-top-name">${s.name}</span>
        // ${s.v.map((a) => `<v class="app-user-detailed-container-left-config-top-tag">${a}</v>`).join("")}
        //                         </div>
        //                         <div class="app-user-detailed-container-left-config-d">
        //                             <p class="app-user-detailed-container-left-config-d-p">${s.d}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div></div>`);
        //         $("#app > div:not([class])[type=\"member-homepage\"]")[0].append(x);
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
        $("header").removeClass("nohome");
        let sw = 0;
        $(".app-boards").css("display", "")
        try {
            const s = location.search.slice(1).split("&").map((a) => { return a.split("=") });
            if (s[0][1]) {
                $("header").addClass("nohome");
                $(`.app-header-right-navigate-div[href="?p=${s[0][1]}"]`).addClass("app-header-right-navigate-div-active")
                $(`#app > div:not([class])`).each((_, a) => {
                    if (a.attributes.type.value == s[0][1]) {
                        $(a).css("display", "")
                        sw++;
                    } else {
                        $(a).css("display", "none")
                    }
                })
            } else {
                $(`.app-header-right-navigate-div[href="?"]`).addClass("app-header-right-navigate-div-active")
                $(`#app > div:not([class])`).each((_, a) => {
                    if (a.attributes.type.value == "home") {
                        $(a).css("display", "")
                        sw++;
                    } else {
                        $(a).css("display", "none")
                    }
                })
            }
        } catch (e) {
            $(`.app-header-right-navigate-div[href="?"]`).addClass("app-header-right-navigate-div-active")
            $(`#app > div:not([class])`).each((_, a) => {
                if (a.attributes.type.value == "home") {
                    $(a).css("display", "")
                    sw++;
                } else {
                    $(a).css("display", "none")
                }
            })
        }
        if (sw == 0) {
            ($("#app").html(`<div type="404errornotpagediv"><div class="app-paragraph">
        <div class="app-paragraph-title">
            <h2>好家伙！404 Not Found！</h2>
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

    if (typeof window.$boardsdata != [][0] + []) {
        if (Array.isArray(window.$boardsdata)) {
            window.$boardsdata.forEach((e) => {
                $(`<div class="app-boards-root-img"><img src="./static/img/boards/${e.img}" url="${e.url}"></div>`).appendTo($(".app-boards-root")[0])
                $(`<div class="app-boards-bottom-buttons-div"></div>`).appendTo($(".app-boards-bottom-buttons")[0])
            });
        }
    }

    if (typeof window.$about_development_history_data != [][0] + []) {
        if (Array.isArray(window.$about_development_history_data)) {
            window.$about_development_history_data.forEach((e) => {
                $(`<li class="about-development-history-text-div" date="${e.date}">
            <div class="about-development-history-div-date" length="${e.date.split("").filter(v => v == ".").length}"><span>${e.date}</span></div>
            <div class="about-development-history-div-content">${e.data.map((v) => { return `<div class="about-development-history-div-content-div"><span>${v}</span></div>` }).join("")}</div>
            </li>`).appendTo($(".about-development-history .app-paragraph-content .text")[0]);
                $(`<li class="point"></li>`).appendTo($(".about-development-history .app-paragraph-content .axis")[0])
                for (let i in "0".repeat(e.data.length)) {
                    $(`<li></li>`).appendTo($(".about-development-history .app-paragraph-content .axis")[0])
                }
            });

            var temp11111 = window.$about_development_history_data
            temp11111.reverse().forEach((e, i) => {
                if (i % 2 == 1) {
                    $(`<li class="about-development-history-text-div" date="${e.date}">
            <div class="about-development-history-div-content" length="${e.date.split("").filter(v => v == ".").length}">${e.data.map((v) => { return `<div class="about-development-history-div-content-div"><span>${v}</span></div>` }).join("")}</div>
            <div class="about-development-history-div-date"><span>${e.date}</span></div>
            </li>`).appendTo($(".development-history-page .app-paragraph-content .text.t1")[0]);
                } else {
                    $(`<li class="about-development-history-text-div" date="${e.date}">
                <div class="about-development-history-div-date" length="${e.date.split("").filter(v => v == ".").length}"><span>${e.date}</span></div>
                <div class="about-development-history-div-content">${e.data.map((v) => { return `<div class="about-development-history-div-content-div"><span>${v}</span></div>` }).join("")}</div>
                </li>`).appendTo($(".development-history-page .app-paragraph-content .text.t2")[0]);
                }

                $(`<li class="about-development-history-text-div" date="${e.date}">
        <div class="about-development-history-div-date" length="${e.date.split("").filter(v => v == ".").length}"><span>　</span></div>
        <div class="about-development-history-div-content">${e.data.map((v) => { return `<div class="about-development-history-div-content-div"><span>　</span></div>` }).join("")}</div>
        </li>`).appendTo($(".development-history-page .app-paragraph-content .text.t" + (i % 2 == 0 ? "1" : "2"))[0]);
                $(`<li class="point"></li>`).appendTo($(".development-history-page .app-paragraph-content .axis")[0])
                for (let i in "0".repeat(e.data.length)) {
                    $(`<li></li>`).appendTo($(".development-history-page .app-paragraph-content .axis")[0])
                }
            });
        }
    }

    Object.values(USERCONFIG).forEach((e, i) => {
        $(`<div><div class="app-paragraph-content-table-div">
            <div class="app-paragraph-content-table-div-icon">
                <img src="${e.img == "q" ? `https://q1.qlogo.cn/g?b=qq&nk=${e.qq}&s=640` : e.img}"
                    class="app-paragraph-content-table-div-icon-img">
            </div>
            <div class="app-paragraph-content-table-div-text">
                <span>${e.name}</span>
            </div>
        </div><div class="app-paragraph-content-table-div detail-data">
        <div class="page-works-table-div-top">
        <div class="app-paragraph-content-table-div-icon">
            <img src="${e.img == "q" ? `https://q1.qlogo.cn/g?b=qq&nk=${e.qq}&s=640` : e.img}"
                class="app-paragraph-content-table-div-icon-img">
        </div>
        <div class="page-works-table-div-right-div">
            <div class="app-paragraph-content-table-div-text">
                <span>${e.name}</span>
                <sub>${Object.keys(USERCONFIG)[i]}</sub>
            </div>
            <div class="page-works-table-div-e">${e.email == "q" ? `${e.qq}@qq.com` : e.email}</div>
            <div class="page-works-table-div-d">
                <span>${e.d}</span>
            </div>
        </div>
        </div>
        <div class="page-works-table-div-bottom">
        ${e.v.map((a) => { return `<v>${a}</v>` }).join("")}
        </div>
    </div></div>`).appendTo($(".core-member")[0]);
    });

    Object.values(PlatformTool).forEach((e, i) => {
        var x = $(`<div><img src=${e.icon}><div>`);
        x[0].addEventListener("click", function () {
            $(".app-home-platform-tool-bottom-buttons>div").each((_, a) => a.classList.remove("select"))
            x.addClass("select");
            $(`.app-home-platform-tool-root-left-img`).attr("src", e.interfaceImg);
            $(`.app-home-platform-tool-root-right-n`).text(e.name);
            $(`.app-home-platform-tool-root-right-x`).text(e.slogan);
            $(`.app-home-platform-tool-root-right-d`).html(e.d);
            $(`.app-home-platform-tool-root-right-u`).text(e.url);
            $(`.app-home-platform-tool-root-right-u`).attr("href", e.url);
        });
        x.appendTo($(".app-home-platform-tool-bottom-buttons")[0]);
        if (i == 0) {
            x[0].click();
        };
    });

    Object.values(PlatformTool).forEach((e, i) => {
        var x = $(`<a class="app-paragraph-content-table-div" href="${e.url}"
        target="_blank">
        <div class="app-paragraph-content-table-div-icon">
            <img src="${e.img2}"
                class="app-paragraph-content-table-div-icon-img">
        </div>
        <div class="page-works-table-div-right-div">
            <div class="app-paragraph-content-table-div-text">
                <span>${e.name}</span>
            </div>
            <div class="page-works-table-div-d">
                <span>${e.allD}</span>
            </div>
        </div>
    </a>`);
        x.appendTo($(".page-works-table")[1]);
    });
    Object.values(USERCONFIG).forEach((e, i) => {
        $(`<div class="app-paragraph-content-table-div">
        <div class="page-works-table-div-top">
        <div class="app-paragraph-content-table-div-icon">
            <img src="${e.img == "q" ? `https://q1.qlogo.cn/g?b=qq&nk=${e.qq}&s=640` : e.img}"
                class="app-paragraph-content-table-div-icon-img">
        </div>
        <div class="page-works-table-div-right-div">
            <div class="app-paragraph-content-table-div-text">
                <span>${e.name}</span>
                <sub>${Object.keys(USERCONFIG)[i]}</sub>
            </div>
            <div class="page-works-table-div-e">${e.email == "q" ? `${e.qq}@qq.com` : e.email}</div>
            <div class="page-works-table-div-d">
                <span>${e.d}</span>
            </div>
        </div>
        </div>
        <div class="page-works-table-div-bottom">
        ${e.v.map((a) => { return `<v>${a}</v>` }).join("")}
        </div>
    </div>`).appendTo($(".page-works-table")[0]);
    });

    function initlink() {
        $("a[href]").each((_, a) => {
            a.onclick = () => {
                if (a.getAttribute("target") !== "_blank") {
                    const urlobject = new URL(`${location.href}`);
                    urlobject.search = a.getAttribute("href");
                    const lb = createloadborder();
                    const f = fetch(urlobject.href)
                    f.then(() => {
                        lb.off();
                        history.pushState({}, "", a.getAttribute("href"));
                    });
                    f.catch(() => {
                        ($("#app").html(`<div type="404errornotpagediv"><div class="app-paragraph">
                    <div class="app-paragraph-title">
                        <h2>好家伙！出错了！</h2>
                    </div>
                    <div class="app-paragraph-content"><div class="app-paragraph-content-textdark"></div></div>
                    <p><a href="${a.getAttribute("href")}" class="app-blue-button"><span>重新加载</span></a></p>
                </div></div>`))
                    });
                } else {
                    window.open(a.getAttribute("href"))
                };
                return false
            }
        })
    }

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
            if (window.BoardsStop) {
                xasfw = 0;
                return
            }
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
            // console.log({ s, b: backc, t: Date.now() - ct, o: false })
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
            if (window.BoardsStop) return
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
            if ($("#app")[0].scrollTop > $(".app-boards-root-img").height() / 1.5) {
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
        $("#loading").css("display", "none");
        initlink();
    })

    $(".copyright").text(`Copyright ©️ 2022 - ${new Date().getFullYear()} Code Dream Star`);

    $(".about").on("click", function () {
        loadpage();
        if ($(`div[type="home"]`)[0].style.display == "") {
            $('#app').animate({ scrollTop: 0 });
        } else {
            history.pushState({}, "", "?");
            $('#app')[0].scrollTop = 0
        }
    })

    let startE = false;
    $(".environmental-monitoring-start")[0].addEventListener("click", function () {
        if (startE) return;
        startE = true;
        $(".environmental-monitoring-start>span").text("检测中");
        document.querySelector(".environmental-monitoring-start").style.opacity = .3;
        var a = $(".environmental-monitoring span");
        // var b = $(`<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0008;color:#fff;display: flex;align-items: center;justify-content: center;z-index:999999999999;font-size:30px">正在检测中，请耐心等待</div>`);
        // b.appendTo($("#app")[0]);
        var c = createloadborder();
        a.each((_, w) => $(w).text("检测中"))
        function end() {
            // b.remove();
            c.off();
            startE = false;
            document.querySelector(".environmental-monitoring-start").style.opacity = "";
            $(".environmental-monitoring-start>span").text("重新检测");
        };
        function sizedata(bytes) {
            if (bytes === 0) return '0B';
            var k = 1024,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            var c = (bytes / Math.pow(k, i)).toFixed(2);
            var f = `${c}${sizes[i]}`;
            return f
        };
        function init() {
            var h = NavigatorTools.getIEVersion();
            var i = NavigatorTools.getUserAgent();
            var j = NavigatorTools.getUserAgentApps();
            var k = "";
            var n = "";
            var q = "";
            var o = {
                "360": "360",
                "2345": "2345",
                "Baidu": "百度",
                "Chrome": "Google Chrome",
                "Edge": "Microsoft Edge",
                "Firefox": "火狐",
                "IE": "IE",
                "IE11": "IE",
                "Opera": "欧朋",
                "QQ": "QQ",
                "QQBrowser": "腾讯",
                "Safari": "苹果",
                "Sogou": "搜狗",
                "UC": "UC",
                "WeChat": "微信",
                "WeiBo": "微博",
                "Xiaomi": "小米",
            };
            var p = {
                "360": ["360EE", "360SE"],
                "2345": ["2345Explorer"],
                "Baidu": ["Baidu", "BIDUBrowser"],
                "Chrome": ["Chrome", "CriOS"],
                "Edge": ["Edge", "Edg"],
                "Firefox": ["Firefox"],
                "IE": ["IE"],
                "IE11": ["IE"],
                "Opera": ["Opera", "OPR"],
                "QQ": ["QQ"],
                "QQBrowser": ["MQQBrowser"],
                "Safari": ["Safari"],
                "Sogou": ["MetaSr", "Sogou"],
                "UC": ["UBrowser"],
                "WeChat": ["MicroMessenger"],
                "WeiBo": ["Weibo"],
                "Xiaomi": ["MiuiBrowser"],
            };
            for (let l in i.browser) {
                if (i.browser[l] === true) {
                    if (l === "isChrome" && i.browser.isEdge === true) {
                        k = o["Edge"];
                    } else {
                        k = o[l.slice(2)];
                    };
                    var x = p[l.slice(2)];
                    for (let y of x) {
                        var z = j._array.find(v => v.name === y);
                        if (z) {
                            if (z.version) {
                                k += (" " + z.version)
                                break
                            };
                        };
                    };
                    break;
                };
            };
            if (i.isPhone) {
                for (let m in i.equipment.mobile) {
                    if (i.equipment.mobile[m] == true) {
                        n = m.slice(2);
                        break;
                    };
                };
                let u = false;
                for (let m in i.terminal) {
                    if (i.terminal[m] == true) {
                        n = "[" + n + "] " + m.slice(2) + " ";
                        try {
                            if (m.slice(2) === "Android") {
                                var t = navigator.userAgent.match(/android [\d._]+/g).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".")
                                n += t;
                            } else if (m.slice(2) === "Ios") {
                                var t = navigator.userAgent.match(/os [\d._]+/g).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".")
                                n += t;
                            }
                        }
                        catch (v) {
                            n = "Mobile";
                        };
                        u = true;
                        break;
                    };
                };
                if (!u) {
                    n = "Mobile";
                };
            } else {
                for (let m in i.equipment.computer) {
                    if (i.equipment.computer[m] == true) {
                        n = m.slice(2);
                        if (n === "Windows") {
                            var r = j._array.find(v => v.name === "Mozilla").config;
                            var s = r.match(/Windows NT (.+); Win64; x(.+)/);
                            if (s[1] && s[2]) {
                                if (s[1] == "5.0") {
                                    s[1] = "2000";
                                }
                                else if (s[1] == "5.1") {
                                    s[1] = "xp";
                                }
                                else if (s[1] == "6.0") {
                                    s[1] = "vista";
                                }
                                else if (s[1] == "6.1") {
                                    s[1] = "7";
                                }
                                else if (s[1] == "6.2") {
                                    s[1] = "8";
                                }
                                else if (s[1] == "6.3") {
                                    s[1] = "8.1";
                                }
                                else {
                                    s[1] = Number(s[1]).toString();
                                }
                                n = "Win" + s[1] + " x" + s[2];
                            };
                        } else if (n === "MasOS") {
                            var t = navigator.userAgent.match(/os x [\d._]+/g).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".")
                            n = "MasOS " + t;
                        }
                        break;
                    };
                };
            }
            $(a[1]).text(k + " " + q);
            $(a[2]).text(n);
            end();
        };
        if (XMLHttpRequest) {
            if (navigator.onLine) {
                var d = new XMLHttpRequest();////
                d.open("GET", "https://kn-cdn.codemao.cn/application/detect/detect_new.jpg?" + Date.now(), true);
                var e = 0;
                var f = 0;
                var g = Date.now();
                d.onreadystatechange = function () {
                    if (d.status == 200) {
                        e += d.responseText.length;
                        f++;
                        $(a[0]).text((sizedata(~~(e / ((Date.now() - g) / 1000) / f))) + "/s");
                    }
                };
                d.onloadend = function () {
                    init();
                };
                d.onerror = function () {
                    $(a[0]).text("检测出错");
                };
                d.send();
            } else {
                $(a[0]).text("离线");
                init();
            }
        } else {
            alert("检测失败！请使用新版浏览器（推荐使用 Google Chrome）");
            end();
        }
    })
}();