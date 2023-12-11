class TransliterationManager {
  constructor(
    transliterationContainer,
    toggleTransliteration,
    transliterations
  ) {
    this.transliterationContainer = transliterationContainer;
    this.toggleTransliteration = toggleTransliteration;
    this.transliterations = transliterations;
    this.initializeEventListeners();
    this.displayTransliterations();
    this.addIcon();
  }

  initializeEventListeners() {
    this.toggleTransliteration.addEventListener("click", () => {
      this.transliterationContainer.style.setProperty(
        "--transition-easing",
        "ease-out"
      );
      requestAnimationFrame(() => {
        this.transliterationContainer.classList.toggle("collapsed");
      });
    });
  }

  displayTransliterations() {
    const contentElement = this.transliterationContainer.querySelector(
      ".transliteration-section"
    );
    this.transliterations.forEach((translit) => {
      const paragraph = document.createElement("p");

      // Wrap the range in a <span> with a special class
      paragraph.innerHTML = `<span class="translit-range">${
        translit.range
      }</span> ${translit.text.replace(/\n/g, "<br>")}`;

      contentElement.appendChild(paragraph);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const transliterations = [
    {
      range: "1–12",
      text: `nin me <span class="char">š</span>ar<span class="sub">2</span>-ra ud dalla e<span class="sub">3</span>-a
      munus zid me-lem<span class="sub">4</span> gur<span class="sub">3</span>-ru ki a<span class="char">ĝ</span><span class="sub">2</span> an uraš-a
      nu-gig an-na su<span class="char">ḫ</span>-gir<span class="sub">11</span> gal-gal-la
      aga zid-de3 ki aĝ2 nam-en-na tum2-ma
      me 7-bi šu sa2 dug4-ga
      nin-ĝu10 me gal-gal-la saĝ keše2-bi za-e-me-en
      me mu-e-il2 me šu-zu-še3 mu-e-la2
      me mu-e-ur4 me gaba-za bi2-tab
      ušumgal-gin7 kur-re uš11 ba-e-šum2
      diškur-gin7 ki šegx(KA×LI) gi4-a-za dezina2 la-ba-e-ši-ĝal2
      a-ma-ru kur-bi-ta ed3-de3
      saĝ-kal an ki-a dinana-bi-me-en`,
    },

    {
      range: "13–19",
      text: `izi bar7-bar7-ra kalam-e šeĝ3-ĝa2
      an-ne2 me šum2-ma nin ur-ra u5-a
      inim kug an-na-ta inim dug4-dug4
      biludada gal-gal-la niĝ2-zu a-ba mu-un-zu
      ki aĝ2 den-lil2-la2 kalam-ma ni2 mi-ni-ri
      a2 aĝ2-ĝa2 an-na-ke4 ba-gub-be2-en`,
    },

    {
      range: "20–33",
      text: `nin-ĝu10 za-pa-aĝ2-zu-še3 kur i3-gam-gam-e
      ni2 me-lem4 u18-lu-da nam-lu2-ulu3
      niĝ2-me-ĝar ĝiri3-bi u3-mu-ri-gub
      me-ta me ḫuš-bi šu ba-e-re-ti 
      i-dub er2-ra-ke4 ĝal2 ma-ra-ab-taka4
      e2 a-nir gal-gal-la sila-ba mu-ri-du
      igi me3-ta niĝ2 ma-ra-ta-si-ig
      nin-ĝu10 a2 ni2-za na4zu2 zu2 i3-gu7-e
      ud du7-du7-gin7 i3-du7-du7-de3-en
      ud gu3 ra-ra-da gu3 im-da-ab-ra-ra-an
      diškur-da šegx(KA×LI) mu-da-an-gi4-gi4-in
      im-ḫul-im-ḫul-da im-da-kuš2-u3-de3-en
      ĝiri3-za nu-kuš2-u3 i3-im-si
      balaĝ a-nir-ra-ta i-lu im-da-ab-be2`,
    },

    {
      range: "34–41",
      text: `nin-ĝu10 da-nun-na diĝir gal-gal-e-ne
      su-dinmušen dal-la-gin7 du6-de3 mu-e-ši-ib-ra-aš
      igi ḫuš-a-za {la-ba-sug2-ge-de3-eš} la-ba-sug2-ge-eš-am3}
      saĝ-ki ḫuš-a-za saĝ nu-mu-un-de3-ĝa2-ĝa2
      šag4 ib2-ba-za a-ba ib2-te-en-te-en
      šag4 ḫul-ĝal2-la-za te-en-ten-bi maḫ-am3
      nin ur5 i3-sag9 nin šag4 i3-ḫul2  
      ib2-ba nu-te-en-te-en dumu gal dsuen-na   
     `,
    },

    {
      range: "42–59",
      text: `nin kur-ra dirig-ga a-ba ki-za ba-an-tum3
      {ḫur-saĝ ki-za} kur saĝ-ki-za} ba-e-de3-gid2-de3-en dezina2 niĝ2-gig-bi
      {abul-la-ba} e2-gal-la-ba} izi mu-ni-in-ri-ri
      id2-ba uš2 ma-ra-an-de2 uĝ3-bi {ma-ra-na8-na8} ba-ra-na8-na8}
      ugnim-bi ni2-bi-a ma-ra-ab-laḫ5-e
      zu2 keše2-bi ni2-bi-a ma-ra-ab-si-il-le
      ĝuruš a2-tuku-bi ni2-bi-a ma-ra-ab-sug2-ge-eš
      iri-ba ki-e-ne-di-ba mir i-ib2-si
      ĝuruš šag4-gan-bi LU2-eš2 ma-ra-ab-sar-re-eš
      iri kur za-ra li-bi2-in-dug4-ga-am3
      a-a ugu-zu li-bi2-in-eš-am3
      inim kug-zu bi2-in-dug4 ki ĝiri3-za ḫe2-eb-gi4
      šag4 tur3-bi-ta ĝiri3 ḫe2-eb2-ta-an-ze2-er
      munus-bi dam-a-ni-ta sag9-ga na-an-da-ab-be2
      ĝi6 u3-na ad na-an-di-ni-ib-gi4-gi4
      niĝ2 kug šag4-ga-na nam-mu-da-an-bur2-re
      u3-sumun2 zid-zid dumu gal dsuen-na
      nin an-ra dirig-ga a-ba ki-za ba-an-tum3  
     `,
    },

    {
      range: "60–65",
      text: `me zid-de3 nin gal nin-e-ne
      šag4 kug-ta e3-a ama ugu-ni-ir dirig-ga
      gal-zu igi-ĝal2 nin kur-kur-ra
      zi-ĝal2 uĝ3 lu-a šir3 kug-zu ga-am3-dug4
      diĝir zid me-a tum2-ma gal-bi dug4-ga-zu maḫ-am3
      šag4 su3-ra2 munus zid šag4 zalag-zalag-ga 
      {me-zu}me zid}me kug} ga-mu-ra-ab-dug4 
     `,
    },

    {
      range: "66–73",
      text: `ĝi6-par3 kug-ĝa2 ḫu-mu-ši-in-kur9-re-en
      en-me-en en-ḫe2-du7-an-na-me-en
      gima-sa2-ab i3-gur3-ru asil-la2 i3-dug4
      {ki-sig10-ga}kiĝ2-sig-ga-ĝu10} bi2-ib-ĝar 
      ĝe26-e nu-mu-un-til3-le-en
      ud-de3 ba-te ud mu-da-bil2
      ĝissu ne ba-te u18-lu-da im-mi-dul
      ka lal3-ĝu10 šu uḫ3-a ba-ab-dug4
      niĝ2 ur5 sag9-sag9-ĝu10 saḫar-ta ba-da-gi4 
     `,
    },

    {
      range: "74–80",
      text: `nam-ĝu10 dsuen lugal-an-ne2
      an-ra dug4-mu-na-ab an-ne2 ḫa-ma-du8-e
      a-da-lam an-ra ba-an-na-ab-be2-en an-ne2 mu-e-du8-e
      nam lugal-an-ne2 munus-e ba-ab-kar-re
      kur a-ma-ru ĝiri3-ni-še3 i3-nu2
      munus-bi in-ga-maḫ iri mu-un-da-ab-tuku4-e
      ka lal3-ĝu10 šu uḫ3-a ba-ab-dug4
      niĝ2 ur5 sag9-sag9-ĝu10 saḫar-ta ba-da-gi4 
     `,
    },

    {
      range: "81–90",
      text: `en-ḫe2-du7-an-na-me-en a-ra-zu ga-mu-ra-ab-dug4
      er2-ĝa2 kaš dug3-ga-gin7
      kug dinana-ra šu ga-mu-ni-ri-bar {di-zu} silim-ma} ga-mu-ra-ab-dug4
      daš-im2-babbar na-an-kuš2-u3-de3-en
      šu-luḫ an kug-ga-ke4 niĝ2-nam-ma-ni in-kur2
      an-da e2-an-na ḫa-ba-da-an-kar
      diĝir lu2 gu-la-ta ni2 ba-ra-ba-da-te
      e2-bi la-la-bi ba-ra-mu-un-gi4 ḫi-li-bi ba-ra-mu-un-til
      e2-bi e2 ḫul-a ḫu-mu-un-di-ni-in-kur9
      tab mu-ši-in-kur9-ra-ni ninim-ma-ni ḫu-mu-un-te
     `,
    },

    {
      range: "91–108",
      text: `dsumun2-zid-ĝu10 lu2 ḫu-mu-sar-re-en lu2 ḫe2-em-mi-dab5-be2-en
      ki zi-šag4-ĝal2-la-ka ĝe26-e a-na-me-en
      ki-bal ḫul gig dnanna-za-ke4-eš an-ne2 ḫa-ba-ab-šum2-mu
      iri-bi an-ne2 ḫa-ba-ra-an-si-il-le
      den-lil2-le nam ḫa-ba-da-an-kud-de3
      dumu er2 pad3-da-bi ama-ni na-an-sed4-e
      nin a-nir ki ĝar-rae
      ĝišma2 a-nir-ra-zu ki kur2-ra ḫe2-bi2-ib-taka4
      šir3 kug-ĝa2-ke4-eš i3-ug5-ge-de3-en
      ĝe26-e dnanna-ĝu10 { en3-ĝu10 ba-ra-an-tar }/ 
      di\-[ĝu10 ba]-ra-bi2-in-kud }
      ki-lul-la ḫe2-eb-gul-gul-en
      daš-im2-babbar-e di-ĝu10 ba-ra-bi2-in-dug4
      bi-in-dug4 nam-ĝu10 li-bi2-in-dug4 nam-ĝu10
      u3-ma gub-gub-ba e2-ta ba-ra-an-e3-en
      simmušen-gin7 ab-ta ba-ra-an-dal-en zi-ĝu10 im-mi-gu7
      ĝiškiši16 kur-ra-ke4 bi2-in-du-e-en
      {aga} tug2} zid nam-en-na mu-da-an-kar
      ĝiri2 ba-da-ra ma-an-šum2 a-ra-ab-du7 ma-an-dug4
     `,
    },

    {
      range: "109–121",
      text: `nin kal-kal-la an-ne2 ki aĝ2
      šag4 kug-zu maḫ-a ki-bi ḫa-ma-gi4-gi4
      nitalam ki aĝ2 dušumgal-an-na-ka
      an-ur2 an-pa nin gal-bi-me-en
      da-nun-na-ke4-ne gu2 ĝiš ma-ra-an-ĝar-re-eš
      u3-tud-da-ta nin ban3-da-me-en
      da-nun-na diĝir gal-gal-e-ne a-gin7 ba-e-ne-dirig-ga
      da-nun-na-ke4-ne nundum-nundum-bi-ta ki su-ub ma-ra-ak-ke4-ne
      di ni2-ĝa2 nu-mu-un-til di kur2 di-ĝu10-gin7 igi-ĝa2 mu-un-niĝin2
      ĝiš-nu2 {gi-rin-na} gi-rin-ĝa2} šu nu-um-mi-la2
      inim dug4-ga dnin-gal lu2-ra nu-mu-na-bur2
      en dadag-ga dnanna-me-en
      nin ki aĝ2 an-na-ĝu10 šag4-zu ḫa-ma-sed-de3
     `,
    },

    {
      range: "122–138",
      text: `ḫe2-zu ḫe2-zu-am3 dnanna li-bi2-in-dug4-ga 
      za-a-kam bi2-in-dug4-ga
      an-gin7 maḫ-a-za ḫe2-zu-am3
      ki-gin7 daĝal-la-za ḫe2-zu-am3
      ki-bal gul-gul-lu-za ḫe2-zu-am3
      kur-ra gu3 de2-e-za ḫe2-zu-am3
      saĝ ĝiš ra-ra-za ḫe2-zu-am3
      ur-gin7 ad6 gu7-u3-za ḫe2-zu-am3
      igi ḫuš-a-za ḫe2-zu-am3
      igi ḫuš-bi il2-il2-i-za ḫe2-zu-am3
      igi gun3-gun3-na-za ḫe2-zu-am3
      uru16-na nu-še-ga-za ḫe2-zu-am3
      u3-ma gub-gub-bu-za ḫe2-zu-am3
      dnanna li-bi2-in-dug4-ga za-a-kam bi2-in-dug4-ga
      nin-ĝu10 ib2-gu-ul-en i3-maḫ-en
      nin ki aĝ2 an-na-ĝu10 {mir-mir-za} barag-barag-/za\} ga-am3-dug4
      ne-mur mu-dub šu-luḫ si bi2-sa2
      e2-eš2-dam-kug ma-ra-ĝal2 šag4-zu na-ma-sed-de3
     `,
    },

    {
      range: "139–143",
      text: `im-ma-si im-ma-dirig-ga-ta nin UN-gal ma-ra-dug4
      niĝ2 ĝi6 u3-na ma-ra-an-dug4-ga-am3
      gala-e an-bar7-ka šu ḫu-mu-ra-ab-gi4-gi4
      dam dab5-ba-za-ke4-eš dumu dab5-ba-za-ke4-eš
      ib2-ba-zu ib2-gu-ul šag4-zu nu-te-en-te-en
      nin gu2-tuku nir-ĝal2 gu2-en-na-ke4
     `,
    },

    {
      range: "144–154",
      text: `sizkur2-ra-na šu ba-an-ši-in-ti
      šag4 kug dinana ki-bi ba-an-na-ab-gi4
      ud ba-an-na-dug3 la-la ba-an-sud-sud ḫi-li ma-az ba-an-du8-du8
      iti6 e3-a-gin7 la-la ba-an-guru3
      dnanna u6 zid-de3-eš mu-un-e3
      ama-ni dnin-gal-am3 šudu3 mu-na-an-ša4
      ĝiš-kan4-na-ke4 silim-ma mu-na-ab-be2
      nu-gig-ra dug4-ga-ni maḫ-am3
      kur gul-gul an-da me ba-a
      nin-ĝu10 ḫi-li gu2 e3 dinana za3-mi2
     `,
    },
  ];

  new TransliterationManager(
    document.getElementById("transliterationContainer"),
    document.getElementById("toggleTransliteration"),
    transliterations
  );
});


