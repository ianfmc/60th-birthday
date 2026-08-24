const journeys = [
  {
    number: "01", place: "Puerto Vallarta · México", name: "Casa Suhana", image: "/places/casa-suhana.webp",
    alt: "Infinity pool terrace at Casa Suhana in Puerto Vallarta", idea: "A return to a place we already know we love", date: "20–27 October · Seven nights",
    copy: "A fully staffed hillside villa just south of Old Town. Familiar enough to feel effortless, different enough to feel new—with the warmth of Puerto Vallarta, extraordinary views and meals prepared just for us.",
    moments: ["Two chef-prepared meals each day", "Daily housekeeping", "Seven minutes from Old Town"],
    rhythm: "The most looked-after week: arrive, exhale, and let the house take care of the rest.",
    restaurants: [
      { name: "Tintoque", image: "/restaurants/tintoque.jpg", alt: "Tintoque's riverfront dining room beside the Río Cuale", href: "https://tintoquerestaurant.com/", note: "The sophisticated birthday dinner · request a fully vegan tasting menu" },
      { name: "Mezcal & Sal", image: "/restaurants/mezcal-sal.png", alt: "The colorful dining room at Mezcal and Sal", href: "https://www.instagram.com/mezclaysal/", note: "Cocktails, creative tacos and a playful second evening" },
    ],
    diningVerdict: "The strongest overall vegan dining—one ceremonial evening, one wonderfully colorful night.",
  },
  {
    number: "02", place: "Los Cabos · México", name: "Casa Rayrae", image: "/places/casa-rayrae.webp",
    alt: "Casa Rayrae terrace and infinity pool above the Sea of Cortez", idea: "A contemporary sanctuary above the Sea of Cortez", date: "13–20 October · Seven nights",
    copy: "Private, ocean-facing and wonderfully easy. Casa Rayrae combines the intimacy of a home with the polish of a resort—and keeps a swimmable beach, San José and several remarkable dinners close at hand.",
    moments: ["Infinity pool & Jacuzzi", "Private beach access", "Flowers waiting in the primary suite"],
    rhythm: "First class from Palm Springs, a short private transfer, then nowhere we have to be.",
    restaurants: [
      { name: "Acre", image: "/restaurants/acre.jpg", alt: "Chef in Acre's farm-to-table open kitchen", href: "https://acreresort.com/restaurant/", note: "The polished birthday dinner · request the vegan tasting menu" },
      { name: "Flora Farms", image: "/restaurants/flora-farms.webp", alt: "Flora Farms Field Kitchen at dusk", href: "https://www.flora-farms.com/floras-field-kitchen", note: "A long lunch or early dinner among the gardens" },
    ],
    diningVerdict: "The most beautiful settings: Acre for the birthday, Flora Farms for a leisurely afternoon.",
  },
  {
    number: "03", place: "The Big Island · Hawaiʻi", name: "Hale Naiʻa", image: "/places/hale-naia.jpg",
    alt: "Infinity pool overlooking the Pacific at Hale Naiʻa", idea: "A private island home above the Pacific", date: "20–27 October · Seven nights",
    copy: "A sculptural, quietly spectacular home in Keauhou Estates. Mornings open slowly; afternoons belong to the infinity pool; every evening ends with the sun dropping into the Pacific.",
    moments: ["Private heated pool & spa", "Panoramic Kona sunsets", "A beautiful home entirely to ourselves"],
    rhythm: "Fly from Palm Springs, settle in once, and let the house become the destination.",
    restaurants: [
      { name: "‘Ulu", image: "/restaurants/ulu.jpg", alt: "Oceanfront terrace at Ulu at Four Seasons Hualalai", href: "https://www.fourseasons.com/hualalai/dining/restaurants/ulu/", note: "A genuinely luxurious oceanfront dinner · dedicated vegan menu" },
      { name: "Journey Café", image: "/restaurants/journey-cafe.jpg", alt: "Plant-filled interior of Journey Cafe in Kailua-Kona", href: "https://journeycafebigisland.com/", note: "Plant-based ease for lunch, crêpes and macadamia desserts" },
    ],
    diningVerdict: "‘Ulu delivers the guaranteed splurge; Journey makes the rest of the week effortless.",
  },
  {
    number: "04", place: "Moʻorea · French Polynesia", name: "The Lagoon House", image: "/places/moorea-villa.jpg",
    alt: "Private pool and lagoon at a Maharepa villa in Moorea", idea: "Our own front door into the lagoon", date: "21–27 October · Six nights",
    copy: "A private villa at the water’s edge in Maharepa. Step from the terrace into the pool, from the little beach into the lagoon, and paddle out together before breakfast.",
    moments: ["Direct lagoon access", "Private infinity pool", "Kayaks, paddleboard & village nearby"],
    rhythm: "Premium economy to Tahiti, one gentle overnight, then the morning ferry reveals Moʻorea in daylight.",
    restaurants: [
      { name: "K Restaurant", image: "/restaurants/k-restaurant.jpg", alt: "Romantic sand-floor dining at K Restaurant overlooking the Moorea lagoon", href: "https://www.sofitel-moorea-kiaora.com/dining/k/", note: "The romantic birthday night · reserve and arrange vegan courses ahead" },
      { name: "Ke‘iki", image: "/restaurants/keiki.webp", alt: "The relaxed open-air dining room at Keiki in Maharepa", href: "https://www.tripadvisor.com/Restaurant_Review-g303860-d24000155-Reviews-Ke_iki-Maharepa_Moorea_Society_Islands.html", note: "A small, local evening with a changing island menu" },
    ],
    diningVerdict: "Potentially lovely, with the vegan arrangements made part of the booking rather than improvised.",
  },
  {
    number: "05", place: "Moʻorea · French Polynesia", name: "Over the Water", image: "/places/sofitel-overwater.jpg",
    alt: "Overwater bungalow at Sofitel Kia Ora Moorea", idea: "The once-in-a-lifetime version", date: "21–27 October · Six nights",
    copy: "A horizon overwater villa at Sofitel Kia Ora: turquoise beneath the floor, Tahiti across the lagoon and a private platform leading directly into some of Moorea’s clearest water.",
    moments: ["Unobstructed lagoon horizon", "Exceptional snorkeling", "Breakfast, beach & full resort service"],
    rhythm: "The journey begins aboard Air Tahiti Nui and ends each day with our feet over the lagoon.",
    restaurants: [
      { name: "K Restaurant", image: "/restaurants/k-restaurant.jpg", alt: "Romantic sand-floor dining at K Restaurant overlooking the Moorea lagoon", href: "https://www.sofitel-moorea-kiaora.com/dining/k/", note: "The natural birthday-night choice · reserve and arrange vegan courses" },
      { name: "Ke‘iki", image: "/restaurants/keiki.webp", alt: "The relaxed open-air dining room at Keiki in Maharepa", href: "https://www.tripadvisor.com/Restaurant_Review-g303860-d24000155-Reviews-Ke_iki-Maharepa_Moorea_Society_Islands.html", note: "A more local, authentically Moʻorea evening" },
    ],
    diningVerdict: "K is the celebration; Ke‘iki brings a relaxed local counterpoint beyond the resort.",
  },
];

const destinations = [
  {
    id: "puerto-vallarta", number: "01", name: "Puerto Vallarta", place: "México", image: "/places/casa-suhana.webp",
    alt: "Infinity pool terrace at Casa Suhana in Puerto Vallarta", date: "20–27 October · Seven nights", idea: "Familiar warmth, made extraordinary.", journeyIndexes: [0],
    travel: "Domestic First from Palm Springs, then a short transfer into the hills above Old Town.",
  },
  {
    id: "cabo", number: "02", name: "Los Cabos", place: "México", image: "/places/casa-rayrae.webp",
    alt: "Casa Rayrae terrace above the Sea of Cortez", date: "13–20 October · Seven nights", idea: "Private, polished and wonderfully easy.", journeyIndexes: [1],
    travel: "Domestic First from Palm Springs and a private transfer to the Sea of Cortez.",
  },
  {
    id: "hawaii", number: "03", name: "Hawaiʻi", place: "The Big Island", image: "/places/hale-naia.jpg",
    alt: "Infinity pool overlooking the Pacific at Hale Naia", date: "20–27 October · Seven nights", idea: "Island days gathered around the sunset.", journeyIndexes: [2],
    travel: "United First from Palm Springs: two seats, one easy connection, then island time.", cabinImage: "/places/united-first.jpg", cabinAlt: "A pair of United First seats", cabinName: "United First",
  },
  {
    id: "moorea", number: "04", name: "Moʻorea", place: "French Polynesia", image: "/places/moorea-villa.jpg",
    alt: "A private villa opening onto the lagoon in Moorea", date: "21–27 October · Six nights", idea: "Two ways to live at the edge of the lagoon.", journeyIndexes: [3, 4],
    travel: "Mānava Premium to Tahiti, one gentle overnight, then the morning ferry reveals Moʻorea in daylight.", cabinImage: "/places/atn-manava-premium.jpg", cabinAlt: "Air Tahiti Nui Manava Premium seats", cabinName: "Mānava Premium",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="global-header" aria-label="Site navigation">
        <a className="wordmark" href="#start">Celebrating Sixty</a>
        <a className="header-dedication" href="/more/">For Diane</a>
      </nav>

      <section className="dedication" id="start" aria-labelledby="dedication-title">
        <div className="dedication-glow" />
        <a className="dedication-link" href="#letter">
          <span className="dedication-label">For your special day</span>
          <h1 id="dedication-title">“I want to do something special for your special day—and celebrate the beautiful, extraordinary life you’ve created.”</h1>
          <span className="dedication-signature">For Diane, with all my love.</span>
          <span className="dedication-begin">Begin</span>
        </a>
      </section>

      <section className="letter" id="letter" aria-labelledby="letter-title">
        <div className="letter-layout">
          <p className="section-label">A little time set apart</p>
          <div className="letter-copy">
            <h2 id="letter-title">Sixty is a special birthday.</h2>
            <p>It deserves time set apart: somewhere beautiful, with nothing more important to do than be together.</p>
            <p>So I imagined a few different ways we might celebrate you. Places where the days could unfold slowly, dinner could become an occasion, and we could make a memory worthy of everything this birthday represents.</p>
            <p className="letter-choice">I haven’t chosen the destination. <em>That part belongs to you.</em></p>
            <a className="letter-next" href="#top">Discover the possibilities</a>
          </div>
        </div>
        <p className="letter-page">01 / 02</p>
      </section>

      <section className="hero site-section" id="top">
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="eyebrow">October 2026 · Four destinations · Five beautiful ways</p>
          <h1>Five beautiful ways<br />to celebrate <em>you.</em></h1>
          <p className="hero-copy">Not simply a trip. Time set apart—somewhere beautiful, with nowhere more important to be than together.</p>
          <a className="round-link" href="#possibilities" aria-label="Explore the five possibilities">Explore</a>
        </div>
      </section>

      <section className="intro site-section" id="possibilities">
        <p className="section-label">The invitation</p>
        <div>
          <h2>The destination is yours.</h2>
          <p>Each of these would be wonderful. Each tells a different story: a private home, a familiar place made extraordinary, or a bungalow poised above a South Pacific lagoon. There is no wrong answer—only the one that feels most like us.</p>
        </div>
      </section>

      <section className="destination-index site-section" id="destinations" aria-labelledby="destination-index-title">
        <div className="destination-index-heading">
          <p className="section-label">Four horizons</p>
          <div><h2 id="destination-index-title">Where should we go?</h2><p>Choose a destination, then step inside the stay, the journey and two evenings worth remembering.</p></div>
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <a className="destination-card" href={`#${destination.id}`} key={destination.id}>
              <span className="destination-card-image"><img src={destination.image} alt={destination.alt} /></span>
              <span className="destination-card-number">{destination.number}</span>
              <span className="destination-card-copy">
                <span className="destination-place">{destination.place}</span>
                <strong>{destination.name}</strong>
                <span>{destination.idea}</span>
                <small>{destination.date}<b>Discover</b></small>
              </span>
            </a>
          ))}
        </div>
      </section>

      {destinations.map((destination) => (
        <section className="destination-detail site-section" id={destination.id} key={destination.id} aria-labelledby={`${destination.id}-title`}>
          <header className="detail-hero">
            <a className="back-link pill-light detail-back" href="#destinations">All destinations</a>
            <img src={destination.image} alt={destination.alt} />
            <div className="detail-hero-copy"><p>{destination.number} · {destination.place}</p><h2 id={`${destination.id}-title`}>{destination.name}</h2><span>{destination.idea}</span></div>
          </header>
          <div className="detail-intro">
            <p className="section-label">The journey</p>
            <div><h3>Comfort begins before we arrive.</h3><p>{destination.travel}</p></div>
            {destination.cabinImage && <figure><img src={destination.cabinImage} alt={destination.cabinAlt} /><figcaption>{destination.cabinName}</figcaption></figure>}
          </div>
          <div className="journeys" aria-label={`${destination.name} stay options`}>
            {destination.journeyIndexes.map((index) => {
              const journey = journeys[index];
              return (
                <article className="journey" key={journey.name}>
                  <div className="journey-image-wrap"><img className="journey-image" src={journey.image} alt={journey.alt} /><span className="journey-number">{journey.number}</span><span className="journey-place">{journey.place}</span></div>
                  <div className="journey-copy">
                    <p className="section-label">{journey.idea}</p><h3>{journey.name}</h3><p className="journey-date">{journey.date}</p><p className="description">{journey.copy}</p>
                    <ul>{journey.moments.map((moment) => <li key={moment}>{moment}</li>)}</ul>
                    <div className="rhythm"><span>The rhythm</span><p>{journey.rhythm}</p></div>
                    <div className="restaurant-edit"><p className="restaurant-kicker">Two evenings</p><div className="restaurant-pair">
                      {journey.restaurants.map((restaurant) => <a className="restaurant" href={restaurant.href} key={restaurant.name} target="_blank" rel="noreferrer"><span className="restaurant-image-wrap"><img src={restaurant.image} alt={restaurant.alt} /></span><span className="restaurant-name">{restaurant.name}</span><span className="restaurant-note">{restaurant.note}</span></a>)}
                    </div><p className="dining-verdict"><span>Dining note</span>{journey.diningVerdict}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="detail-ending"><p>Seen enough?</p><a href="#destinations">Choose another horizon</a></div>
        </section>
      ))}

      <section className="closing site-section">
        <p className="section-label">The only decision</p>
        <h2>Which horizon<br />calls to you?</h2>
        <p>The rest is already taken care of.</p>
        <div className="dates">OCTOBER 2026 <span>·</span> SIX OR SEVEN NIGHTS</div>
        <a className="book-it" href="/control/">Book it</a>
      </section>

      <footer className="site-footer">
        <p>Celebrating Sixty</p>
        <p className="credits">Private planning preview. Imagery courtesy of the respective villa, resort, airline and restaurant sources.</p>
      </footer>
    </main>
  );
}
