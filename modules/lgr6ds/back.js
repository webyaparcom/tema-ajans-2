try {
  // Menu kısmı
  var pagesettingjson = webmakerdata.pagesetting.data.find(
    function(item) { return item.modulestatus && item.modulestatus.page; },
  );
  var backhtml = `<a href="${wxLangInternalHref('')}">@home@ </a>`;
  if (pagesettingjson) {
    // Iterate over the relevant data to create HTML content
    for (var iterator of webmakerdata[pagesettingjson.path].data) {
      if (iterator.status == "play" && iterator.category == "") {
        if (page.path == iterator.path) {
          backhtml += `<a class="modulex-menu-list-active" href="${wxLangInternalHref(
            iterator.path,
          )}">${iterator.name[json.lang]}</a>`;
        } else {
          backhtml += `<a href="${wxLangInternalHref(iterator.pathnext || iterator.path)}">${
            iterator.name[json.lang]
          }</a>`;
        }
      }
    }
    // Replace the placeholder {{html}} with the generated backhtml content
    html = html.replace(new RegExp("{{html}}", "g"), backhtml);
  }

  // Dil linkleri: bulunulan sayfada kalsın (ana sayfa değilse aynı path ile dil değişsin)
  langhtml = "";
  var langCount = 0;
  var currentPagePath = (page && typeof page === "object" && page.path !== undefined) ? page.path : "";
  var langNames = {
    tr: "TR",
    en: "EN",
    de: "DE",
    fr: "FR",
    es: "ES",
    it: "IT",
    ru: "RU",
    ar: "AR",
  };
  for (var key in webmakerdata.setting.langs) {
    if (webmakerdata.setting.langs[key] == true) {
      langCount++;
      var langUrl = wxLangHref(key, currentPagePath || "");
      var langText = langNames[key.toUpperCase()] || key.toUpperCase();
      var isActive = json.lang === key ? "modulex-lang-active" : "";
      langhtml += `<div class="modulexlanguages-mobile-item"><a class="${isActive}" href="${langUrl}" hreflang="${key}" lang="${key}"${json.lang === key ? ' aria-current="true"' : ""}>${langText}</a></div>`; /* G1: hreflang */
    }
  }
  // Eğer sadece 1 dil varsa dil seçiciyi gösterme
  if (langCount <= 1) {
    langhtml = "";
  }
  html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);

  // Slider kısmı
  var backimglist = "";
  for (var i = 0; i < json.data.length; i++) {
    var loadingAttr = i === 0 ? "" : 'loading="lazy"';
    backimglist += `<div class="swiper-slide"><img ${loadingAttr} src="/img/${json.id}/${json.data[i]["img"]}?v=${Date.now()}" alt="{{web-name}}" /></div>`;
  }
  html = html.replace(new RegExp("{{imglist}}", "g"), backimglist);
} catch (error) {
  console.log("menu-slider modül hatası:", error);
}

