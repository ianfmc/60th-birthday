import type { Metadata } from "next";
import { beautifulWeek } from "../data/beautiful-week";
import "./more.css";

export const metadata: Metadata = {
  title: "Calimac Productions - More Possibilities",
  description: "Two more beautiful ways to celebrate together.",
  robots: { index: false, follow: false },
};

function formatExperienceDates(value: string) {
  const [startValue, endValue] = value.split("/");
  const start = new Date(`${startValue}T12:00:00Z`);
  const end = new Date(`${endValue}T12:00:00Z`);
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  const month = start.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  return `${start.getUTCDate()}–${end.getUTCDate()} ${month} · ${nights} ${nights === 1 ? "night" : "nights"}`;
}

export default function MorePossibilities() {
  return <main className="more-experience">
    <nav className="more-header"><a href="#begin">Calimac Productions</a><span>For Diane</span></nav>
    <section className="more-reveal" id="begin" aria-labelledby="more-opening">
      <div className="more-orbit" />
      <div className="reveal-copy">
        <p className="reveal-beat beat-one" id="more-opening">I had a feeling<br />you might say that.</p>
        <div className="reveal-beat beat-two"><p>It was never about how much we spend.</p><strong>It’s about going somewhere together.</strong></div>
        <div className="reveal-beat beat-three"><p>So… what if we did it differently?</p><strong>Two more possibilities.</strong><a href="#possibilities">Discover</a></div>
      </div>
    </section>

    <section className="more-invitation" id="possibilities">
      <p className="more-label">Chapter two</p><div><h1>Two more ways<br />to celebrate <em>you.</em></h1><p>Different places. Different rhythms. The very same reason for going.</p></div>
    </section>

    <section className="more-index" aria-label="Two more possibilities">
      {beautifulWeek.destinations.map((destination, index) => <a href={`#${destination.id}`} className="more-card" key={destination.id}>
        <img src={destination.hero} alt={destination.alt} /><span className="card-shade" /><span className="card-number">0{index + 1}</span><span className="card-copy"><small>{destination.eyebrow}</small><strong>{destination.title}</strong><span>{formatExperienceDates(destination.dates)}</span><span>{destination.moments[0]}</span><b>Step inside</b></span>
      </a>)}
    </section>

    {beautifulWeek.destinations.map((destination, index) => <section className="more-place" id={destination.id} key={destination.id} aria-labelledby={`${destination.id}-title`}>
      <header className="place-hero"><img src={destination.hero} alt={destination.alt} /><span className="place-shade" /><div><p>0{index + 1} · {destination.name} · {formatExperienceDates(destination.dates)}</p><h2 id={`${destination.id}-title`}>{destination.eyebrow}</h2></div></header>
      <div className="place-story"><p className="more-label">The possibility</p><div><h3>{destination.stayName}</h3><p>{destination.publicCopy}</p><ul>{destination.moments.map(moment => <li key={moment}>{moment}</li>)}</ul></div></div>
      <a className="place-next" href={index === beautifulWeek.destinations.length - 1 ? "#where-to" : `#${beautifulWeek.destinations[index + 1].id}`}>{index === beautifulWeek.destinations.length - 1 ? "One last thought" : "Next possibility"}</a>
    </section>)}

    <section className="more-closing" id="where-to"><p className="more-label">Just one question</p><h2>So… where to?</h2><p>Whichever horizon we choose, the best part is already decided.</p><a className="more-book-it" href="/control/">Book it</a></section>
    <footer className="more-footer"><p>Calimac Productions</p><p className="credits">Private planning preview. Imagery courtesy of the respective villa, resort, airline and restaurant sources.</p></footer>
  </main>;
}
