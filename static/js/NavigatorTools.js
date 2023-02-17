const NavigatorTools = {
    getUserAgent() {
        var u = navigator.userAgent;
        return {
            core: {
                isIE: u.indexOf('Trident') > -1, // 是 IE 内核
                isOpera: u.indexOf('Presto') > -1, // 是 opera 内核
                isWebKit: u.indexOf('AppleWebKit') > -1, // 是 苹果、谷歌 内核
                isFirefox: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 是 火狐内核
            },
            terminal: {
                isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // 是 ios 终端
                isAndroid: u.indexOf('Android') > -1, // 是 Android 终端
            },
            equipment: {
                computer: {
                    isLinux: u.indexOf('Linux') > -1, // 是 Linux
                    isMasOS: !!(u.match(/Macintosh/i) || u.match(/MacIntel/i)), // 是 Apple
                    isWindows: !!(u.match(/compatible/i) || u.match(/Windows/i)), // 是 Windows
                },
                mobile: {
                    isIPhone: u.indexOf('iPhone') > -1, // 是 iPhone
                    isIPad: u.indexOf('iPad') > -1, // 是 iPad
                    isMobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是 移动端
                }
            },
            browser: {
                isIE: (!!window.document.documentMode) || (u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1), // 是 IE 浏览器
                isIE11: ((window.document.documentMode || 0) >= 11) || (u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1), // 是 IE 浏览器
                isWeChat: /MicroMessenger/i.test(u), // 是 微信 浏览器
                isQQ: u.indexOf('QQ') > -1, // 是 QQ 浏览器
                isWeiBo: !!u.match(/Weibo/i), // 是 微博 浏览器
                isSogou: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1, // 是 搜狗 浏览器
                isXiaomi: u.indexOf('MiuiBrowser') > -1, // 是 小米 浏览器
                isBaidu: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1, // 是 百度 浏览器
                is360: u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1, // 是 360 浏览器
                is2345: u.indexOf('2345Explorer') > -1, // 是 2345 浏览器
                isEdge: u.indexOf('Edge') > -1 || u.indexOf('Edg') > -1, // 是 Edge 浏览器
                isFirefox: u.indexOf('Firefox') > -1, // 是 火狐 浏览器
                isSafari: u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1, // 是 苹果 浏览器
                isQQBrowser: u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1, // 是 腾讯（QQ）浏览器
                isOpera: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1, // 是 欧朋 浏览器
                isChrome: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1, // 是 谷歌 浏览器
                isUC: !!u.match(/UCBrowser/i) || u.indexOf('UBrowser') > -1, // 是 谷歌 浏览器
            },
            isPhone: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
            content: u,
        };
    },
    getLanguage() {
        return {
            now: (navigator.browserLanguage || navigator.language).replace(/-/g, "_"),
            all: (navigator.browserLanguages || navigator.languages).map((e) => {
                return e.replace(/-/g, "_")
            }),
        };
    },
    getIEVersion() {
        return window.document.documentMode || null
    },
    UserAgentAppData: class {
        constructor(u) {
            try {
                const l = u.split("/");
                var r = [], t = "", v, tr = {};
                for (const i in l) {
                    tr = {}
                    v = l[i];
                    if (!isNaN(Number(v[0]))) {
                        if (i != l.length - 1) {
                            tr.name = t;
                            let ta = /([0-9].+[0-9])\ .+/.exec(v);
                            if (ta) {
                                tr.version = ta[1];
                                let ct = /.+\ \((.+)\)\ .+/.exec(v);
                                if (ct) {
                                    tr.config = ct[1];
                                    let ce = /.+\ \(.+\)\ (.+)/.exec(v);
                                    if (ce) {
                                        t = ce[1]
                                    } else {
                                        throw "Error: An unknown error occurred. cet";
                                    }
                                } else {
                                    let ce = /.+\ (.+)/.exec(v);
                                    if (ce) {
                                        t = ce[1]
                                    } else {
                                        throw "Error: An unknown error occurred. ced";
                                    }
                                };
                                r.push(tr);
                            } else {
                                throw "Error: An unknown error occurred.";
                            };
                        } else {
                            tr.name = t;
                            let ta = /(.+)/.exec(v);
                            if (ta) {
                                tr.version = ta[1];
                                let ct = /.+\ \((.+)\)/.exec(v);
                                if (ct) {
                                    tr.config = ct[1];
                                }
                                r.push(tr);
                            } else {
                                throw "Error: An unknown error occurred.";
                            };
                        }
                    } else {
                        t = v;
                    };
                };
                r.forEach((v, i) => { this[i] = v });
                this._array = Object.freeze(r.map((v) => { return v }));
                this._userAgent = Object.freeze(String(u) + "");
            } catch (e) {
                console.log(e)
                throw "Error: Invalid Data.";
            };
        };
        toArray() {
            return this._array.map((v) => { return v });
        };
        toObject() {
            var r = {};
            for (const i in this._array) {
                const v = this._array[i];
                r[v.name] = v;
            };
            return r;
        };
    },
    getUserAgentApps() {
        return new this.UserAgentAppData(navigator.userAgent)
    },
};