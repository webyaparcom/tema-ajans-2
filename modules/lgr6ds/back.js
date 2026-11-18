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
          )}">${wmPickLang(iterator.name, json.lang)}</a>`;
        } else {
          backhtml += `<a href="${wxLangInternalHref(iterator.pathnext || iterator.path)}">${
            wmPickLang(iterator.name, json.lang)
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
      /* 17 Kas 2026 (Emir A, szj9): eskiden <div class="…-item"> basılıyordu → şablonun <ul>'ü içinde ul > div > a; mx-ui.js
         mxLangDd yalnız ul > li > a[hreflang] tanır, 24 dil açılır listeye dönmeden 1440'ta 2083 px'e taşıyordu.
         Artık <li> (mxLangDd >4 dilde açılır listeye çevirir). */
      /* Tur 3 (B3): wmLangLi değil — eski öğe biçimi bire bir (sınıf, a.modulex-lang-active, title yok), yalnız div → li */
      langhtml += `<li class="modulexlanguages-mobile-item"><a class="${isActive}" href="${langUrl}" hreflang="${key}" lang="${key}"${json.lang === key ? ' aria-current="true"' : ""}>${langText}</a></li>`;
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
    backimglist += `<div class="swiper-slide"><img ${loadingAttr} src="/img/${json.id}/${json.data[i]["img"]}?v={{random}}" alt="{{web-name}}" /></div>`;
  }
  html = html.replace(new RegExp("{{imglist}}", "g"), backimglist);
} catch (error) {
  console.log("menu-slider modül hatası:", error);
}

