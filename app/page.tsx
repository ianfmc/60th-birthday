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

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-glow" />
        <nav className="nav" aria-label="Page navigation">
          <a className="wordmark" href="#top">Celebrating Sixty</a>
          <a className="nav-link" href="#possibilities">The possibilities <span>↓</span></a>
        </nav>
        <div className="hero-content" id="top">
          <p className="eyebrow">October 2026 · Four destinations · Five beautiful ways</p>
          <h1>Five beautiful ways<br />to celebrate <em>you.</em></h1>
          <p className="hero-copy">Not simply a trip. Time set apart—somewhere beautiful, with nowhere more important to be than together.</p>
          <a className="round-link" href="#possibilities" aria-label="Explore the five possibilities">Explore <span>↘</span></a>
        </div>
        <p className="hero-note">For Diane, with all my love.</p>
      </section>

      <section className="intro" id="possibilities">
        <p className="section-label">The invitation</p>
        <div>
          <h2>The destination is yours.</h2>
          <p>Each of these would be wonderful. Each tells a different story: a private home, a familiar place made extraordinary, or a bungalow poised above a South Pacific lagoon. There is no wrong answer—only the one that feels most like us.</p>
        </div>
      </section>

      <section className="getting-there" aria-labelledby="getting-there-title">
        <div className="getting-there-heading">
          <p className="section-label">The journey</p>
          <div>
            <h2 id="getting-there-title">Comfort begins before we arrive.</h2>
            <p>Mexico begins in domestic First from Palm Springs. For the farther horizons, two very different premium cabins set the tone.</p>
          </div>
        </div>
        <div className="flight-grid">
          <article className="flight-card">
            <div className="flight-image flight-image-united">
              <img src="/places/united-first.jpg" alt="A pair of United First seats" />
            </div>
            <div className="flight-copy">
              <p className="section-label">Palm Springs → Hawaiʻi</p>
              <h3>United First</h3>
              <p>A comfortable two-seat start, one easy connection, and island time waiting on the other side.</p>
            </div>
          </article>
          <article className="flight-card">
            <div className="flight-image">
              <img src="/places/atn-manava-premium.jpg" alt="Air Tahiti Nui Mānava Premium seats in lagoon blue" />
            </div>
            <div className="flight-copy">
              <p className="section-label">Los Angeles → Tahiti</p>
              <h3>Mānava Premium</h3>
              <p>Wider lagoon-blue seats, generous legroom and a direct overnight flight aboard the Tahitian Dreamliner.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="journeys" aria-label="Five trip possibilities">
        {journeys.map((journey) => (
          <article className="journey" key={journey.name}>
            <div className="journey-image-wrap">
              <img className="journey-image" src={journey.image} alt={journey.alt} />
              <span className="journey-number">{journey.number}</span>
              <span className="journey-place">{journey.place}</span>
            </div>
            <div className="journey-copy">
              <p className="section-label">{journey.idea}</p>
              <h3>{journey.name}</h3>
              <p className="journey-date">{journey.date}</p>
              <p className="description">{journey.copy}</p>
              <ul>{journey.moments.map((moment) => <li key={moment}>{moment}</li>)}</ul>
              <div className="rhythm"><span>The rhythm</span><p>{journey.rhythm}</p></div>
              <div className="restaurant-edit">
                <p className="restaurant-kicker">Two evenings</p>
                <div className="restaurant-pair">
                  {journey.restaurants.map((restaurant) => (
                    <a className="restaurant" href={restaurant.href} key={restaurant.name} target="_blank" rel="noreferrer">
                      <span className="restaurant-image-wrap"><img src={restaurant.image} alt={restaurant.alt} /></span>
                      <span className="restaurant-name">{restaurant.name}<b aria-hidden="true">↗</b></span>
                      <span className="restaurant-note">{restaurant.note}</span>
                    </a>
                  ))}
                </div>
                <p className="dining-verdict"><span>Dining note</span>{journey.diningVerdict}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="recommendation" aria-labelledby="recommendation-title">
        <div className="recommendation-heading">
          <p className="section-label">Four beautiful rhythms</p>
          <div>
            <h2 id="recommendation-title">Each one feels complete.</h2>
            <p>Different settings, different rhythms, and four lovely ways to make the celebration entirely our own.</p>
          </div>
        </div>
        <ol className="recommendation-list">
          <li><span>01</span><div><h3>Puerto Vallarta</h3><p>20–27 October · Seven nights</p></div><p>The most effortless expression of villa luxury: a beautiful house, gracious staff and a place we already love.</p></li>
          <li><span>02</span><div><h3>Cabo</h3><p>13–20 October · Seven nights</p></div><p>Polished resort ease, private ocean views and the loveliest part of October stretching ahead.</p></li>
          <li><span>03</span><div><h3>Hawaiʻi</h3><p>20–27 October · Seven nights</p></div><p>A spectacular private home, unhurried island days and evenings gathered around the Pacific sunset.</p></li>
          <li><span>04</span><div><h3>Tahiti & Moʻorea</h3><p>21–27 October · Six nights</p></div><p>The most transporting choice: a beautifully concentrated escape into lagoon light and South Pacific stillness.</p></li>
        </ol>
      </section>

      <section className="closing">
        <p className="section-label">The only decision</p>
        <h2>Which horizon<br />calls to you?</h2>
        <p>The rest is already taken care of.</p>
        <div className="dates">OCTOBER 2026 <span>·</span> SIX OR SEVEN NIGHTS</div>
      </section>

      <footer>
        <p>Celebrating Sixty</p>
        <p className="credits">Private planning preview. Imagery courtesy of the respective villa, resort, airline and restaurant sources.</p>
      </footer>
    </main>
  );
}
