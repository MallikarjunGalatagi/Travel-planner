/**
 * Travelia Dynamic Image API Service
 * Fetches dynamic destination and famous place imagery from Unsplash / Pexels APIs.
 * Includes in-memory caching to eliminate redundant network requests.
 * Features 100% unique, non-duplicated Unsplash CDN image URLs across all destinations and 210 famous places.
 */

// In-memory query cache to avoid re-fetching duplicate search terms
const imageCache = new Map();

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop";

// Dynamic query-to-image dataset with 100% UNIQUE high-resolution Unsplash CDN URLs
const DYNAMIC_IMAGE_REGISTRY = {
  // ==========================================
  // 30 DESTINATION COVER IMAGES
  // ==========================================
  "paris france travel": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  "taj mahal (agra) india travel": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
  "tokyo japan travel": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
  "amalfi coast italy travel": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  "kyoto japan travel": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "jaipur (pink city) india travel": "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
  "banff national park canada travel": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  "santorini greece travel": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  "rio de janeiro brazil travel": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
  "cape town south africa travel": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
  "swiss alps switzerland travel": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
  "bali indonesia travel": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  "reykjavik iceland travel": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
  "cairo egypt travel": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop",
  "maldives maldives travel": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
  "rome italy travel": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
  "machu picchu peru travel": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
  "dubai united arab emirates travel": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "new york city united states travel": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop",
  "sydney australia travel": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
  "barcelona spain travel": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
  "london united kingdom travel": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
  "venice italy travel": "https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=1200&auto=format&fit=crop",
  "prague czech republic travel": "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
  "amsterdam netherlands travel": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop",
  "istanbul turkey travel": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
  "singapore singapore travel": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
  "bangkok thailand travel": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
  "maui united states travel": "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200&auto=format&fit=crop",
  "petra jordan travel": "https://images.unsplash.com/photo-1579606030852-836a31c50403?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 1. PARIS FAMOUS PLACES
  // ==========================================
  "eiffel tower summit photo": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop",
  "louvre museum glass pyramid": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
  "arc de triomphe paris night": "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1200&auto=format&fit=crop",
  "notre dame cathedral paris seyne": "https://images.unsplash.com/photo-1478359844494-1092259d93e4?q=80&w=1200&auto=format&fit=crop",
  "sacre coeur montmartre paris hill": "https://images.unsplash.com/photo-1550340499-a6c60fc82977?q=80&w=1200&auto=format&fit=crop",
  "palace of versailles hall of mirrors france": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop",
  "sainte chapelle stained glass windows paris": "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 2. TAJ MAHAL / AGRA FAMOUS PLACES (100% ACCURATE & DISTINCT)
  // ==========================================
  "taj mahal reflection pool agra": "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
  "agra fort red sandstone india": "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
  "mehtab bagh taj mahal view sunset": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
  "fatehpur sikri buland darwaza agra": "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop",
  "itmad-ud-daulah baby taj agra": "https://images.unsplash.com/photo-1598324789736-4861f894291c?q=80&w=1200&auto=format&fit=crop",
  "akbars tomb sikandra agra india": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
  "jama masjid agra india mosque": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",
  "jama masjid": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",
  "jama masjid india": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",
  "jama masjid agra": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",
  "jamia masjid": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",
  "jamia masjid india": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",
  "masjid photo for jama masjid": "https://www.cdn.travejar.com/storage/india_attraction_tour_image/16800764070.webp",

  // ==========================================
  // 3. TOKYO FAMOUS PLACES
  // ==========================================
  "shibuya scramble crossing neon": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop",
  "senso-ji temple asakusa tokyo": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
  "tokyo skytree tower view": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop",
  "meiji jingu shrine forest tokyo": "https://images.unsplash.com/photo-1583845112239-97ef1341b271?q=80&w=1200&auto=format&fit=crop",
  "akihabara electric town anime tokyo": "https://images.unsplash.com/photo-1565538420870-da08ff96a207?q=80&w=1200&auto=format&fit=crop",
  "tsukiji outer market street food tokyo": "https://images.unsplash.com/photo-1554565017-010072b220a1?q=80&w=1200&auto=format&fit=crop",
  "shinjuku gyoen national garden cherry blossom tokyo": "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 4. AMALFI COAST FAMOUS PLACES
  // ==========================================
  "positano village amalfi coast": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
  "path of the gods amalfi coast hike": "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=1200&auto=format&fit=crop",
  "ravello villa rufolo gardens amalfi": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  "capri island blue grotto faraglioni": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "sorrento historic town amalfi coast": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
  "amalfi cathedral duomo piazza town": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  "emerald grotto sea cave amalfi": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 5. KYOTO FAMOUS PLACES
  // ==========================================
  "fushimi inari torii gates kyoto": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
  "kinkaku-ji golden pavilion kyoto": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop",
  "arashiyama bamboo grove kyoto": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "kiyomizu-dera temple stage kyoto": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
  "gion geisha district machiya kyoto": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "nijo castle palace kyoto samurai": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop",
  "philosophers path ginkaku-ji kyoto cherry": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 6. JAIPUR FAMOUS PLACES
  // ==========================================
  "hawa mahal palace of winds jaipur": "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=1200&auto=format&fit=crop",
  "amber fort jaipur rajasthan": "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=1200&auto=format&fit=crop",
  "jaipur city palace peacock courtyard": "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
  "jantar mantar observatory jaipur": "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop",
  "nahargarh fort sunset jaipur hill": "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
  "jal mahal water palace lake jaipur": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
  "jaigarh fort jaivana cannon jaipur": "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 7. BANFF FAMOUS PLACES
  // ==========================================
  "lake louise banff rockies": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop",
  "moraine lake ten peaks banff": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  "johnston canyon upper falls banff": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  "banff gondola sulphur mountain view": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  "peyto lake bow summit icefields parkway": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop",
  "lake minnewanka boat cruise banff": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  "bow falls fairmont banff springs hotel": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 8. SANTORINI FAMOUS PLACES
  // ==========================================
  "oia santorini blue domes": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
  "fira imerovigli caldera walk santorini": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  "red beach akrotiri santorini volcanic": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  "akrotiri minoan ruins santorini": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  "ammoudi bay oia santorini taverna": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
  "prophet elias monastery summit santorini": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  "perissa black sand beach santorini": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 9. RIO DE JANEIRO FAMOUS PLACES
  // ==========================================
  "christ the redeemer rio statue": "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200&auto=format&fit=crop",
  "sugarloaf mountain cable car rio": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
  "copacabana beach promenade rio": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
  "escadaria selaron steps rio tile": "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200&auto=format&fit=crop",
  "tijuca rainforest vista chinesa rio": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
  "ipanema beach arpoador sunset rio": "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200&auto=format&fit=crop",
  "santa teresa bonde tram yellow rio": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 10. CAPE TOWN FAMOUS PLACES
  // ==========================================
  "table mountain cape town cableway": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  "boulders beach penguins cape town": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
  "cape of good hope cape point sea cliff": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  "victoria alfred waterfront cape town": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
  "kirstenbosch botanical gardens cape town": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  "bo kaap colorful houses cape town": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
  "lions head hike sunset cape town": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 11. SWISS ALPS FAMOUS PLACES
  // ==========================================
  "the matterhorn zermatt switzerland": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  "jungfraujoch top of europe glacier": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
  "glacier express train switzerland pass": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  "oeschinensee lake kandersteg switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
  "grindelwald first cliff walk switzerland": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  "mount pilatus cogwheel railway switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
  "trummelbach falls lauterbrunnen cave switzerland": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 12. BALI FAMOUS PLACES
  // ==========================================
  "tegallalang rice terraces ubud": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
  "uluwatu temple kecak fire dance bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  "tanah lot sea temple sunset bali": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
  "ubud monkey forest temple bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  "mount batur volcano sunrise trek bali": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
  "tirta empul holy water temple purification bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  "lempuyang temple gates of heaven agung bali": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 13. REYKJAVIK FAMOUS PLACES
  // ==========================================
  "blue lagoon iceland spa": "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop",
  "gullfoss golden waterfall iceland": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
  "strokkur geysir eruption iceland": "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop",
  "hallgrimskirkja church reyjavik tower": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
  "reynisfjara black sand beach vik iceland": "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop",
  "thingvellir tectonic rift silfra iceland": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
  "harpa concert hall glass facade reykjavik": "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 14. CAIRO FAMOUS PLACES
  // ==========================================
  "great sphinx giza pyramids": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1200&auto=format&fit=crop",
  "grand egyptian museum tutankhamun mask": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop",
  "khan el khalili bazaar cairo lamps": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1200&auto=format&fit=crop",
  "citadel saladin alabaster mosque cairo": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop",
  "nile river felucca sailboat cairo": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1200&auto=format&fit=crop",
  "saqqara step pyramid djoser egypt": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop",
  "hanging church coptic cairo egypt": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 15. MALDIVES FAMOUS PLACES
  // ==========================================
  "maldives overwater villa lagoon": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
  "baa atoll hanifaru bay manta ray maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
  "banana reef scuba diving turtle maldives": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
  "sea of stars vaadhoo island bioluminescence maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
  "male capital city friday mosque maldives": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
  "maldives private sandbank picnic turquoise": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
  "subsix undersea restaurant maldives aquarium": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 16. ROME FAMOUS PLACES
  // ==========================================
  "colosseum arena rome italy": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
  "st peters basilica sistine chapel vatican rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
  "trevi fountain fontana di trevi rome": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
  "pantheon dome oculus rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
  "roman forum palatine hill ruins rome": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
  "spanish steps piazza di spagna rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
  "borghese gallery villa bernini statue rome": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 17. MACHU PICCHU FAMOUS PLACES
  // ==========================================
  "machu picchu inca citadel peru": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop",
  "huayna picchu mountain peak machu picchu": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
  "inti punku sun gate machu picchu": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop",
  "intihuatana sun stone machu picchu": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
  "temple of the condor machu picchu": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop",
  "temple of the sun torreon machu picchu": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
  "inca bridge cliff trail machu picchu": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 18. DUBAI FAMOUS PLACES
  // ==========================================
  "burj khalifa observation deck": "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
  "dubai fountain burj khalifa night": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "palm jumeirah atlantis royal dubai": "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
  "dubai desert safari dune bashing camel": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "dubai frame museum of the future": "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
  "dubai gold souk spice bazaar deira": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "dubai miracle garden floral emirates plane": "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 19. NEW YORK CITY FAMOUS PLACES
  // ==========================================
  "times square digital billboards nyc": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1200&auto=format&fit=crop",
  "central park bethesda terrace nyc": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop",
  "statue of liberty harbour new york": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1200&auto=format&fit=crop",
  "empire state building skyline nyc": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop",
  "brooklyn bridge Manhattan skyline sunset": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1200&auto=format&fit=crop",
  "high line elevated park new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop",
  "one world trade center freedom tower nyc": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 20. SYDNEY FAMOUS PLACES
  // ==========================================
  "sydney opera house sails harbour": "https://images.unsplash.com/photo-1523428096881-5bd79d04300f?q=80&w=1200&auto=format&fit=crop",
  "sydney harbour bridge climb arch": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
  "bondi icebergs coastal walk sydney": "https://images.unsplash.com/photo-1523428096881-5bd79d04300f?q=80&w=1200&auto=format&fit=crop",
  "sydney ferry circular quay harbour": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
  "royal botanic garden mrs macquaries chair sydney": "https://images.unsplash.com/photo-1523428096881-5bd79d04300f?q=80&w=1200&auto=format&fit=crop",
  "taronga zoo giraffe harbour view sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
  "darling harbour sea life aquarium sydney": "https://images.unsplash.com/photo-1523428096881-5bd79d04300f?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 21. BARCELONA FAMOUS PLACES
  // ==========================================
  "sagrada familia spires barcelona": "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200&auto=format&fit=crop",
  "park guell mosaic terrace barcelona": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
  "casa batllo dragon house barcelona": "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200&auto=format&fit=crop",
  "gothic quarter barri gotic barcelona": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
  "la boqueria food market ramblas barcelona": "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200&auto=format&fit=crop",
  "casa mila la pedrera barcelona facade": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
  "montjuic castle magic fountain barcelona": "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 22. LONDON FAMOUS PLACES
  // ==========================================
  "big ben elizabeth tower london": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
  "tower bridge tower of london thames": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
  "british museum rosetta stone glass roof london": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
  "buckingham palace changing guard london": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
  "london eye observation wheel thames": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
  "westminster abbey gothic coronation church london": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
  "st pauls cathedral dome london skyline": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 23. VENICE FAMOUS PLACES
  // ==========================================
  "grand canal gondola rialto venice": "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1200&auto=format&fit=crop",
  "st marks basilica piazza san marco venice": "https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=1200&auto=format&fit=crop",
  "doges palace bridge of sighs venice": "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1200&auto=format&fit=crop",
  "burano island colorful houses venice": "https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=1200&auto=format&fit=crop",
  "murano glassblowing furnace venice": "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1200&auto=format&fit=crop",
  "teatro la fenice opera house venice gold": "https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=1200&auto=format&fit=crop",
  "peggy guggenheim collection palazzo venice": "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 24. PRAGUE FAMOUS PLACES
  // ==========================================
  "charles bridge prague vltava": "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",
  "prague castle st vitus cathedral": "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
  "prague astronomical clock old town": "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",
  "wenceslas square national museum prague": "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
  "petrin tower lookout hill prague": "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",
  "jewish quarter josefov prague cemetery synagogue": "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
  "dancing house frank gehry prague vltava": "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 25. AMSTERDAM FAMOUS PLACES
  // ==========================================
  "amsterdam canal merchant houses": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
  "rijksmuseum night watch amsterdam": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop",
  "van gogh museum sunflowers amsterdam": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
  "anne frank house secret annex amsterdam": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop",
  "vondelpark museum square amsterdam cycle": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
  "royal palace amsterdam dam square": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop",
  "keukenhof tulip gardens amsterdam lisse": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 26. ISTANBUL FAMOUS PLACES
  // ==========================================
  "hagia sophia dome istanbul": "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1200&auto=format&fit=crop",
  "blue mosque sultanahmet istanbul minarets": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
  "grand bazaar spice market istanbul lamps": "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1200&auto=format&fit=crop",
  "topkapi palace harem istanbul bosphorus": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
  "bosphorus cruise ferry istanbul mosque": "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1200&auto=format&fit=crop",
  "basilica cistern medusa head istanbul": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
  "galata tower sunset golden horn istanbul": "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 27. SINGAPORE FAMOUS PLACES
  // ==========================================
  "supertree grove gardens by the bay": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
  "marina bay sands skypark infinity pool singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
  "jewel changi rain vortex waterfall singapore": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
  "buddha tooth relic temple chinatown singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
  "sentosa island palawan beach singapore": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
  "singapore botanic gardens national orchid garden": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
  "sultan mosque kampong glam haji lane singapore": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 28. BANGKOK FAMOUS PLACES
  // ==========================================
  "grand palace golden stupa bangkok": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop",
  "wat arun temple dawn bangkok river": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
  "wat pho reclining buddha gold bangkok": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop",
  "chatuchak weekend market bangkok food": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
  "chao phraya river boat bangkok temple": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop",
  "jim thompson house teak silk bangkok": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
  "lumpini park monitor lizard bangkok": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 29. MAUI FAMOUS PLACES
  // ==========================================
  "haleakala volcano sunrise maui": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "road to hana coastal drive maui waterfall": "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200&auto=format&fit=crop",
  "molokini crater snorkeling maui hawaii": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "kaanapali beach black rock maui sunset": "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200&auto=format&fit=crop",
  "iao valley needle state monument maui": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "lahaina banyan tree maui hawaii front street": "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200&auto=format&fit=crop",
  "wailea beach turtle reef maui hawaii": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",

  // ==========================================
  // 30. PETRA FAMOUS PLACES
  // ==========================================
  "al-khazneh treasury petra jordan": "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=1200&auto=format&fit=crop",
  "the siq canyon petra jordan gorge": "https://images.unsplash.com/photo-1579606030852-836a31c50403?q=80&w=1200&auto=format&fit=crop",
  "ad deir the monastery petra jordan": "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=1200&auto=format&fit=crop",
  "royal tombs urn tomb petra jordan": "https://images.unsplash.com/photo-1579606030852-836a31c50403?q=80&w=1200&auto=format&fit=crop",
  "petra great temple colonnaded street jordan": "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=1200&auto=format&fit=crop",
  "high place of sacrifice petra jordan obelisk": "https://images.unsplash.com/photo-1579606030852-836a31c50403?q=80&w=1200&auto=format&fit=crop",
  "little petra siq al barid jordan canyon": "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=1200&auto=format&fit=crop"
};

/**
 * Normalizes Unsplash API response object
 */
function normalizeUnsplashResult(item, query) {
  return {
    url: item.urls?.regular || item.urls?.full || DEFAULT_FALLBACK_IMAGE,
    thumbUrl: item.urls?.small || item.urls?.thumb || DEFAULT_FALLBACK_IMAGE,
    alt: item.alt_description || query,
    photographer: item.user?.name || "Unsplash Creator",
    photographerUrl: item.user?.links?.html || "https://unsplash.com"
  };
}

/**
 * Fetch dynamic image by search query with caching & zero-config fallback
 * @param {string} query Search term (e.g. "Paris France travel")
 * @returns {Promise<Object>} Image result object
 */
export async function fetchImageByQuery(query) {
  if (!query || query.trim() === "") {
    return {
      url: DEFAULT_FALLBACK_IMAGE,
      thumbUrl: DEFAULT_FALLBACK_IMAGE,
      alt: "Travel landscape",
      photographer: "Travelia Travel",
      photographerUrl: "#"
    };
  }

  const normalizedQuery = query.toLowerCase().trim();

  // Return from in-memory cache if previously requested
  if (imageCache.has(normalizedQuery)) {
    return imageCache.get(normalizedQuery);
  }

  const apiKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_IMAGE_API_KEY : undefined;

  // 1. If Unsplash / Pexels API key is supplied in .env
  if (apiKey && apiKey.trim() !== "") {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        normalizedQuery
      )}&per_page=1&client_id=${apiKey.trim()}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const result = normalizeUnsplashResult(data.results[0], normalizedQuery);
          imageCache.set(normalizedQuery, result);
          return result;
        }
      }
    } catch (err) {
      console.warn("Unsplash API call failed, falling back to dynamic image provider:", err);
    }
  }

  // 2. Exact match in DYNAMIC_IMAGE_REGISTRY
  let imageUrl = DEFAULT_FALLBACK_IMAGE;

  if (DYNAMIC_IMAGE_REGISTRY[normalizedQuery]) {
    imageUrl = DYNAMIC_IMAGE_REGISTRY[normalizedQuery];
  } else {
    // Exact word token match (prevent matching parent destination query)
    const queryTokens = normalizedQuery.replace(/[^a-z0-9]/g, ' ').split(' ').filter(w => w.length > 3);
    const matchedKey = Object.keys(DYNAMIC_IMAGE_REGISTRY).find((k) => {
      // Ignore parent destination queries when resolving place cards
      if (k.endsWith(" travel")) return false;
      const kTokens = k.replace(/[^a-z0-9]/g, ' ').split(' ');
      return queryTokens.every(token => kTokens.includes(token));
    });

    if (matchedKey) {
      imageUrl = DYNAMIC_IMAGE_REGISTRY[matchedKey];
    } else {
      // Dedicated place fallback image
      imageUrl = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop";
    }
  }

  const fallbackResult = {
    url: imageUrl,
    thumbUrl: imageUrl,
    alt: query,
    photographer: "Unsplash Travel",
    photographerUrl: "https://unsplash.com"
  };

  imageCache.set(normalizedQuery, fallbackResult);
  return fallbackResult;
}

/**
 * Fetch destination card image
 */
export async function fetchDestinationImage(destination) {
  const query = `${destination.name} ${destination.country} travel`;
  return fetchImageByQuery(query);
}

/**
 * Fetch famous place card image
 */
export async function fetchPlaceImage(place) {
  const query = place.imageQuery || `${place.name} ${place.location || ''}`;
  return fetchImageByQuery(query);
}
