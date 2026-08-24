import type { Metadata } from "next";
import { beautifulWeek, extraordinary } from "../data/beautiful-week";
import "./control.css";

export const metadata: Metadata = { title: "Trip Planning · Celebrating Sixty", robots: { index: false, follow: false } };
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function ControlPlane() {
  return <main className="control-shell">
    <header className="control-header"><div><p>Celebrating Sixty</p><h1>Trip planning</h1></div><span>Private · Ian only</span></header>
    <section className="collection-strip" aria-label="Planning collections">
      <article><p>Collection 01</p><h2>{extraordinary.label}</h2><strong>{extraordinary.target}</strong><span>{extraordinary.note}</span></article>
      <article className="active"><p>Collection 02</p><h2>{beautifulWeek.label}</h2><strong>{money.format(beautifulWeek.target.low)}–{money.format(beautifulWeek.target.high)}</strong><span>All-in target for two · hard ceiling {money.format(beautifulWeek.target.high)}</span></article>
    </section>
    <section className="control-note"><strong>Estimate discipline</strong><p>{beautifulWeek.assumptions.note}</p><span>Planning snapshot · {beautifulWeek.updatedAt}</span></section>
    <section className="scenario-grid">
      {beautifulWeek.destinations.map(destination => <article className="scenario" key={destination.id}>
        <header><div><p>{destination.dates}</p><h2>{destination.name}</h2></div><span className={`status ${destination.cost.confidence.replaceAll(" ", "-")}`}>{destination.cost.confidence}</span></header>
        <div className="total"><span>Modeled all-in total</span><strong>{money.format(destination.cost.total)}</strong><small>{money.format(beautifulWeek.target.high - destination.cost.total)} below ceiling</small></div>
        <dl className="costs"><div><dt>Lodging</dt><dd>{money.format(destination.cost.lodging)}</dd></div><div><dt>Airfare · two</dt><dd>{money.format(destination.cost.airfare)}</dd></div><div><dt>Local transport</dt><dd>{money.format(destination.cost.transport)}</dd></div><div><dt>Meals</dt><dd>{money.format(destination.cost.meals)}</dd></div><div><dt>Experiences</dt><dd>{money.format(destination.cost.experiences)}</dd></div><div><dt>Contingency</dt><dd>{money.format(destination.cost.contingency)}</dd></div></dl>
        <section className="control-section"><h3>Flight assumption</h3><p><b>{destination.flight.origin} → {destination.flight.destination}</b>{destination.flight.cabin}</p><span>{destination.flight.confidence}</span></section>
        <section className="control-section"><h3>Properties to monitor</h3>{destination.properties.map(property => <div className="property" key={property.name}><div><a href={property.source} target="_blank" rel="noreferrer">{property.name}</a><small>{property.role} · {property.inventory}</small></div><span className={`status ${property.confidence.replaceAll(" ", "-")}`}>{property.confidence}</span><p>{property.note}</p><em>{property.vegan}</em></div>)}</section>
        <section className="control-section two-col"><div><h3>Dining</h3><ul>{destination.dining.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>Experiences</h3><ul>{destination.experiences.map(item => <li key={item}>{item}</li>)}</ul></div></section>
      </article>)}
    </section>
  </main>;
}
