import { TimelineMax, Power2 } from "gsap";
import "./index.scss";

const hero = document.querySelector(".hero"),
      slider = document.querySelector(".slider"),
      logo = document.querySelector("#logo"),
      headline = document.querySelector(".headline");

const timeline = new TimelineMax();

timeline.fromTo(hero, 1, { height: "0%" }, { height: "70%" , ease: Power2.easeInOut})
.fromTo(hero, 1.2, {width: "100%"}, {width: "80%", ease: Power2.easeInOut})
.fromTo(slider, 1.2, {x:"-100%"}, {x: "0%", ease: Power2.easeInOut}, "-=1.2")
.fromTo(logo, 0.5, {opacity: 0, x:30}, {opacity: 1,x:0}, "-=0.5")
.fromTo(headline, 0.5, {opacity: 0, x:30}, {opacity: 1,x:0}, "-=0.5")
;