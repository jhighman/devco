// Import chapter icons from chapterIcons.js
import { chapterIcons } from './chapterIcons.js';

// Environment detection
export const currentEnvironment = window.location.hostname === 'localhost' ? 'development' : 'production';

// Base URL configuration for different environments
export const baseUrl = {
    development: '',  // Empty string for development since server.js now handles parent directory paths
    production: ''    // Empty string for production as well to match the actual server configuration
};

// Debug the current environment and base URL
console.log(`Current environment: ${currentEnvironment}, Base URL: ${baseUrl[currentEnvironment]}`);

// Chapter data with full panel content from YAML files
export const chapters = [
    {
        number: 1,
        title: "Velvet Dancers",
        panels: [
            {
                id: 1,
                title: "CITY SKYLINE",
                background: "bg-gradient-to-b from-black-void via-navy to-black-void",
                text: "The city is a cancer of glass and LED, and tonight it hums like a broken amp. Down on 14th, the traffic's jammed with rideshare drones and guys selling knockoff pills out of the hoods of parked cars. Everybody's tuned into their own soundtrack, little earbuds whispering Top 40 like prayers to gods who died in the eighties. The skyline flickers in glitches, as if reality itself is buffering.",
                quote: null,
                text_after: null
            },
            {
                id: 2,
                title: "VELVET CURTAIN",
                background: "bg-gradient-to-b from-[#4A0000] via-[#800020] to-[#4A0000]",
                text: "And tucked between two shuttered bodegas is a velvet curtain. No sign, no door, just this blood-colored fabric swaying like it's breathing. Behind it, bass leaks out in subsonic pulses. It's the kind of bass that rewrites your heartbeat whether you want it or not.\n\nI push through.",
                quote: null,
                text_after: null
            },
            {
                id: 3,
                title: "CLUB INTERIOR",
                background: "bg-gradient-to-r from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "The air inside is thick, like the club is running on oxygen siphoned from another dimension. Lights move in lazy strobes, purple and gold, spilling over a floor that's already slick with sweat. There's no bar, no menu, just shadows that sell you what you want if they decide you're worth the bother.\n\nAnd then there are the dancers.",
                quote: null,
                text_after: null
            },
            {
                id: 4,
                title: "VELVET DANCERS",
                background: "bg-gradient-to-b from-[#1A0E25] via-[#2D0A31] to-[#1A0E25]",
                text: "Velvet on their skin, velvet in their movements, velvet like the smooth part of a blade before the edge cuts. They move as if they're running a program: flawless, slow, then impossibly fast. Every single one of them wears the same patch stitched near the shoulder — a circle with sunrays stitched in gold thread. The insignia.\n\nThey don't look at you. They look through you, like you're another light on the floor, one more pattern in the algorithm.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 5,
                title: "BLIND SINGER",
                background: "bg-gradient-to-b from-[#000000] via-[#1A0E25] to-[#000000]",
                text: "In the corner, a blind man sings. No mic, no amp, just raw voice cut against the bass. He's chanting words like they're half-forgotten scripture, or maybe the last pirate broadcast before the collapse:",
                quote: "She comes, she comes… burning houses in the distance. Lights up the night. She comes.",
                text_after: "Nobody claps. Nobody even reacts. The crowd moves in sync, eyes half-lidded, as though they're hypnotized. Like they already know the words. Like they were born knowing."
            },
            {
                id: 6,
                title: "WOMAN IN RED",
                background: "bg-gradient-to-b from-[#4A0000] via-[#800020] to-[#4A0000]",
                text: "That's when I see her.\n\nShe's in red. Not neon red, not digital red — real red, the kind that stains. Her dress is cut from velvet so dark it looks wet. Same sun insignia stitched into the fabric. She's not one of the dancers, though. She moves against the rhythm, like she's inside her own soundtrack. And when she locks eyes with me, it feels less like attraction and more like conscription.\n\nShe doesn't ask. She just takes my hand.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 7,
                title: "MIRROR HALLWAY",
                background: "bg-gradient-to-r from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "Her fingers are cold, but not corpse cold — cold like the first second of an ice cube against skin, the kind that burns after. She pulls me through the moving bodies. Deeper. Back through a hallway lined with mirrors that don't reflect right. In one, I'm younger. In another, I'm someone else entirely.\n\n\"Where are we going?\" I ask.\n\nShe doesn't answer.",
                quote: null,
                text_after: null
            },
            {
                id: 8,
                title: "BLIND PROPHET",
                background: "bg-gradient-to-b from-[#000000] via-[#1A0E25] to-[#000000]",
                text: "Behind us, the blind man's voice climbs a register. He's in full prophecy mode now:",
                quote: "Pop song summer. Velvet dancers. Insignia of the sun.",
                text_after: "The hallway splits into three. She doesn't hesitate, pulls me left. The music distorts here — like cassette tape warping, like turntables melting under too much heat. Smells like ozone and perfume, a cocktail that says you're too far in to walk back.",
                neon_title: true,
                neon_color: "teal"
            },
            {
                id: 9,
                title: "RITUAL CHAMBER",
                background: "bg-gradient-to-b from-[#1A0E25] via-[#2D0A31] to-[#1A0E25]",
                text: "And then we're in the back room.\n\nIt looks like a church, if the architects were high on disco and conspiracy theory. Columns of light instead of stone, a floor that ripples under your feet like water. At the center: a circle, burned into the ground, glowing faint red.\n\nThe dancers are here too. More of them. Moving slower now, almost ritualistic. The insignia on their clothes glows like it's alive.\n\nI pull my hand free. \"What is this?\"\n\nShe finally speaks, voice low, like someone reading a poem to the apocalypse.\n\n\"This is where she comes.\"\n\n\"Who's she?\"\n\nHer smile is too sharp to be warm. \"You'll see.\"",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 10,
                title: "PULSING FLOOR",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#4A0000] to-[#2D0A31]",
                text: "And then the floor pulses. Once, twice, syncing with my heartbeat. The dancers accelerate, spinning faster than physics should allow, velvet blurring into streaks of blood and shadow.\n\nThe blind man's voice isn't in the room, but I still hear it. Inside my skull:",
                quote: "She comes. Out to the other side. Into the pop song summer.",
                text_after: null
            },
            {
                id: 11,
                title: "BURNING HOUSES",
                background: "bg-gradient-to-b from-[#800020] via-[#FF3300] to-[#800020]",
                text: "The walls dissolve into horizon. Burning houses flicker in the distance. I know it isn't real — but my body doesn't care. Every nerve screams run.\n\nI back up, trip, catch myself against the edge of the circle. It's hot, too hot, like touching the rim of the sun.",
                quote: null,
                text_after: null,
                has_burning: true
            },
            {
                id: 12,
                title: "SUN INSIGNIA",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "The woman in red grabs my wrist, turns my palm up. She's holding something — a patch, identical to the ones on the dancers. The sun insignia.\n\n\"Put it on,\" she says.\n\n\"What happens if I do?\"\n\nHer smile widens. \"You'll see her. You'll be part of the summer.\"",
                quote: null,
                text_after: null,
                has_insignia: true,
                large_insignia: true
            },
            {
                id: 13,
                title: "THE CHOICE",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#2D0A31] to-[#1A2A44]",
                text: "I look at the patch. It's warm in my hand, like it's been sitting in the sun. The gold thread catches light that isn't there.\n\nThe blind man's voice is still in my head:",
                quote: "She comes, she comes...",
                text_after: "I should run. I know I should run. But there's something about the way the dancers move, something about the promise of seeing her...",
                split_screen: true
            },
            {
                id: 14,
                title: "THE DECISION",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#26A69A] to-[#1A2A44]",
                text: "\"Fine,\" I say, and take the patch. It's heavier than it looks. I press it against my shoulder, and it burns through my shirt, fusing to skin. I gasp, but the pain is gone as quickly as it came.\n\nThe woman in red steps back. \"Now you're one of us.\"\n\nThe dancers stop. All at once. They turn to look at me, and for the first time, I see their eyes clearly. They're normal eyes. Human eyes. But they're all looking at something beyond me.",
                quote: null,
                text_after: null
            },
            {
                id: 15,
                title: "SHE ARRIVES",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "The circle on the floor cracks open. Light pours out, not like stage lights or LEDs, but like sunlight through stained glass. It's too bright to look at directly, but I can't look away.\n\nAnd then she's there.\n\nI can't describe her face. It shifts too fast, like flipping through radio stations. But she's beautiful in a way that hurts. She's wearing a dress made of summer itself — the kind of summer you remember from childhood, all endless days and popsicle-stained fingers.\n\nThe dancers bow. The woman in red bows. I find myself bowing too, though I didn't mean to.\n\nShe speaks, and her voice is a pop song I've heard a thousand times but can never remember the name of:",
                quote: "The houses are burning. The old world is dying. Are you ready for summer?",
                text_after: null,
                has_light_rays: true
            },
            {
                id: 16,
                title: "THE ANSWER",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#26A69A] to-[#1A2A44]",
                text: "I find my voice. \"Yes.\"\n\nShe smiles, and it's like watching the sun rise over a world that's never seen daylight before. She extends her hand, and there's a key in it. Old brass, worn smooth from use.\n\n\"Then take this. Find the door.\"\n\nI take the key. It's hot, like the patch was, but I don't drop it.",
                quote: null,
                text_after: null
            },
            {
                id: 17,
                title: "TRANSFORMATION",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "The dancers begin to move again, but differently now. Their movements are sharper, more urgent. The velvet of their clothes ripples like it's alive. Their patches glow brighter, pulsing in time with mine.\n\nThe woman in red is watching me, her eyes reflecting the light from the circle. \"It's starting,\" she says. \"The pop song summer.\"\n\nThe blind man's voice rises again, but now it's coming from everywhere:",
                quote: "Burning houses in the distance. Lights up the night.",
                text_after: null,
                has_insignia: true
            },
            {
                id: 18,
                title: "THE DOOR",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "The air splits open. There's no other way to describe it. Like someone took a knife to reality and cut a door-shaped hole. Through it, I can see... something else. Not the club, not the city. Something golden and endless.\n\nShe — the woman from the circle, the one made of summer — is gone. But her voice lingers:",
                quote: "The key fits the door. The door leads to summer. Will you come?",
                text_after: "I look at the woman in red. \"What's on the other side?\"\n\nShe shrugs. \"I've never gone through. I just bring people to her. That's my job.\"\n\nThe key burns hotter in my palm. The patch on my shoulder pulses like a second heart.",
                has_door: true
            },
            {
                id: 19,
                title: "DECISION POINT",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#26A69A] to-[#1A2A44]",
                text: "I look back at the club behind me. Through the door, I can still see the dancers, the blind man, the city beyond. My old life.\n\nI look at the key in my hand. At the door in front of me. At whatever waits on the other side.\n\nThe woman in red watches me, her face unreadable. \"Choose,\" she says.",
                quote: null,
                text_after: null,
                split_screen: true
            },
            {
                id: 20,
                title: "KEY TURNS",
                background: "bg-gradient-to-b from-[#FFC107] via-[#1A2A44] to-[#FFC107]",
                text: "I step forward. Insert the key into the lock. It fits perfectly, like it was made for this moment. For me.\n\nI turn it.\n\nThe sound it makes isn't a click. It's a chord — the perfect final chord of a pop song you've been waiting your whole life to hear.",
                quote: null,
                text_after: null,
                has_key: true
            },
            {
                id: 21,
                title: "THRESHOLD",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FFFFFF] to-[#FFC107]",
                text: "The door swings open. Light floods out, so bright it erases the club, the dancers, the woman in red. Everything.\n\nI step through.\n\nThe last thing I hear is the blind man's voice, no longer chanting but laughing, joyful:",
                quote: "Pop song summer begins!",
                text_after: "And then I'm gone.",
                has_light_burst: true
            },
            {
                id: 22,
                title: "DESERT ROAD",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF9800] to-[#FFC107]",
                text: "Somewhere, on a desert highway, under a sun that never sets, a figure walks. The asphalt shimmers with heat. In the distance, a city burns, but the figure doesn't look back.\n\nOn their shoulder: a patch with the sun insignia.\n\nIn their ears: the perfect pop song, playing on repeat.\n\nIt's summer. It's always summer now.\n\nAnd she is coming.",
                quote: null,
                text_after: null,
                has_road: true,
                has_sun: true,
                epilogue: true
            }
        ]
    },
    {
        number: 2,
        title: "Insignia of the Sun",
        panels: [
            {
                id: 1,
                title: "MORGUE",
                background: "bg-gradient-to-b from-[#1A1A1A] via-[#4A4A4A] to-[#1A1A1A]",
                text: "The first time I saw the insignia was on a body bag. White vinyl, zipped to the chin, toes tagged. On the sleeve: a sunburst in gold thread, twelve rays, perfect circle, too clean for a morgue. The coroner, chewing a burrito over an EVIDENCE folder, catches me staring. 'Not county,' he says, voice like sandpaper. 'Some club, maybe.' I tell him clubs don't stitch couture onto body bags. He shrugs, uninterested.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 2,
                title: "PHOTO FLASH",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "I'm a stringer, chasing tragedies for gas money. The patch burns a hole in my vision. 'Mind if I shoot it?' I ask. The coroner smirks, 'Shoot anything that can't shoot back.' I take three photos: wide for context, close for thread, angled for pop. On my camera screen, the gold moirés into a halo, like it knows it's being watched.",
                quote: null,
                text_after: null
            },
            {
                id: 3,
                title: "INDEX CARD",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "On the morgue's bulletin board, among missing persons and grief group flyers, a 3×5 index card: TWELVE RAYS / TWELVE DOORS / SHE COMES WITH THE SUN. Below, a number: 555-0199. No name, just cult-startup confidence. I've seen the mark before—gas station graffiti, a thrift store book, a flyer for a band that never played. It's a breadcrumb I can't unsee.",
                quote: null,
                text_after: null
            },
            {
                id: 4,
                title: "DEAD LINE",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "In my car, I call the number. One ring, then a dial tone like a flatline. The city flickers outside, an arcade left on after hours. I drive to the overpass by the old mall, where the body was found. A shrine waits: candles, a wax-splotched Polaroid, bodega flowers. On the concrete pillar, a spray-painted sunburst, twelve rays, glitter and ash caught in the paint.",
                quote: null,
                text_after: null
            },
            {
                id: 5,
                title: "SHRINE MESSAGE",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "Under the spray paint, in felt-tip: WE RETURN WHAT WE TAKE. My shoe slides on candle wax, and my palm catches the pillar, leaving a crescent of black. Across the street, a woman's silhouette passes a TV's blue glow. Not in red. I exhale. The morgue shots on my camera make the gold thread brighter than the world around it.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 6,
                title: "APARTMENT 3B",
                background: "bg-gradient-to-b from-[#1A0E25] via-[#2D0A31] to-[#1A0E25]",
                text: "A tip leads me to the dead man's apartment. Room 3B is urban decay in a mold: empty cabinets, mattress on the floor, cinder-block bookshelf. Twelve books, counted on reflex: Neuromancer, Valis, a zine titled INSIGNIA with a gold-leaf sunburst. Its pages are poem-prayers, each ending with 555-0199. A shoebox under the mattress holds pay stubs, a yearbook photo, and three gold-thread patches.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 7,
                title: "HIDDEN NOTE",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#4A0000] to-[#2D0A31]",
                text: "Inside the shoebox lid: RETURN LIGHT / RETURN BODY / RETURN NAME. Below: WED, 9PM, UNIT 413. No address, but I know a self-storage place nearby with a unit 413. I pocket the note, not the patch, though shame and thrill fight under my tongue. The zine's first poem haunts: 'Draw the circle, count the rays. She comes.'",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 8,
                title: "STORAGE UNIT",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "The storage place is a tin-box maze. I slip past the gate and roll under unit 413's half-open door. Inside: twelve red candles in a circle, a milk crate altar with a duct-taped cassette player, INSIGNIA zines, and a jar of sunburst patches. A woman's voice from the cassette: 'She comes. What do you return?' Name, light, body. The tape stops. Silence.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 9,
                title: "HELIOGRAPH",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "Footsteps. The door rolls up. A tall, androgynous figure with a sunburst jacket steps in. 'You're early,' they say. 'Or late.' They call it Heliograph—an instrument to talk to the sun. 'We don't own the insignia,' they say. 'It owns us.' A second figure sets up a folding table, wax on their cuff. 'Meeting's at nine,' they warn. I leave before it starts.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 10,
                title: "SUNBURST SIGHTINGS",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "The insignia stalks me. On a painter's cuff, a web ad, a thrift store jacket. A disco song about horizons hums on the radio. At a coffee shop, a guy with a sunburst patch calls it 'vintage.' His calendar has twelve events marked 'return.' The air wobbles. I'm chasing a symbol that's chasing me back.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 11,
                title: "LIBRARY DIG",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "At the library, Mari pulls microfiche. We find twelve house fires over eleven summers, a band called Insignia of the Sun that blacked out a grid, a singer with a gold-thread sunburst. Two fires at storage units, one near a freeway. A bulletin board card reads: RETURN LIGHT / RETURN NAME / RETURN BODY. WEDS 9PM / UNIT 413. The pin has a sunburst head.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 12,
                title: "RITUAL NIGHT",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "Wednesday, 9PM. Unit 413 is alive. Twelve people, twelve candles, a new speaker. The androgynous host stands watch. A woman's voice—not from the speaker—starts the call: 'She comes. What do you return?' Name, light, body. The candles light clockwise, a clock that ignores time. The woman in red steps in, her sunburst humming.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 13,
                title: "CIRCLE OF RETURN",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "She hands me a patch. It's heavy, not hot. 'You brought him here,' she says, meaning the dead man. I protest, but she says I know everyone—it's my job. The group hums, a frequency that turns the unit into a throat. The candles gutter backward. The door ceases to be a boundary. On the horizon: fire.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 14,
                title: "BODY RETURNED",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "She kisses the patch, presses it to the concrete. It burns a sunburst into the floor. A body bag appears in the circle, white vinyl, sunburst on the sleeve. 'Returns make us real,' she says. Two people lift the bag. The host draws a chalk sunburst. 'No photos,' they say. I hadn't tried.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 15,
                title: "PATCH FOUND",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "At home, the morgue's index card falls from my notebook. With it: a sunburst patch I didn't take. My heart snaps. I dial the second number. My own voice answers: 'Return what isn't yours.' The city blinks a sunburst in red exit-sign light. I sleep badly. In the morning, the patch is pinned to my jacket.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 16,
                title: "WRITING THE SUN",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "I write to pin the story down. Morgue, body bag, candles, clock. The radio plays the horizon song. My phone buzzes. Her voice: 'Start with the name.' I delete my byline. The cursor blinks. The patch weighs like an oath. Outside, sirens call. A kid's chalk sunburst on the floor says: 'She comes. We're ready.'",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 17,
                title: "WALKING THE CIRCLE",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "I step into the morning. The insignia isn't a brand—it's a receipt. You borrow light, you return it. Across the street, the woman in red pauses, her sunburst flaring. She looks through me, like I'm a pattern in the algorithm. I walk, patch unpinned, toward a city of twelve doors. The horizon burns. She comes.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true
            }
        ]
    },
    {
        number: 3,
        title: "Burning Houses (in the Distance)",
        panels: [
            {
                id: 1,
                title: "MOTEL ESCAPE",
                background: "bg-gradient-to-b from-[#4A0000] via-[#1A1A1A] to-[#4A0000]",
                text: "The night we decided to run, the horizon burned with real flames chewing the suburbs. The motel parking lot smelled of pine resin, drywall, gasoline, and denial. Cars idled like nervous animals, the ice machine died, and a CASH ONLY sign hung on the vending machine. She sat on the curb, red coat fraying, flicking ash toward the glow. 'We could stay,' I said. 'That's what everybody says before they burn,' she replied, tugging my sleeve. We packed toothbrushes, socks, water, pretzels, and a metal box with cash, a half-used gift card, and two gold-thread sunburst patches. She pinned one to her coat, handed me the other. 'It's not a club,' she said. 'It's a receipt for light.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 2,
                title: "ROAD AND RADIO",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "The freeway was a parking lot, so we took side streets where houses held their breath and sprinklers made useless halos. In the rearview, smoke rose like a theater curtain. At a four-way stop, a woman in a bathrobe glared, teens pushed a cart of water and dog food, and the radio crackled to life with a woman's voice singing about horizons and burning houses, disco bones under velvet neon. Gas cost a miracle, the terminal OFFLINE. She stood under the floodlight, patch glowing, and told a man the wind had already shifted. Ash fell like soft lies, smearing gray streaks on the windshield. 'I left the photo,' she said, of her mother on a beach. 'Memory is a copy of a copy. Fire is an eraser.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 3,
                title: "SPACESHIP DINER",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "We stopped at a diner shaped like a spaceship, its open sign glowing with plastic optimism. Waitresses moved like marathoners, serving coffee and calm. We ordered pancakes—round things for the end of the world. Flo, the waitress, eyed our patches but didn't blink. 'You two headed where?' 'Out,' I said. In the corner, a blind man sang against the radio: *She comes, burning houses in the distance. Lights up the night.* A kid drew a chalk sunburst with twelve rays under a table. 'Ready to return?' he asked me, grave as a judge. The blind man warned, 'Leave before the wind changes.' Outside, the sky turned a color without a name, and she kissed me hard. 'For luck,' she said.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 4,
                title: "HIGHWAY FLIGHT",
                background: "bg-gradient-to-b from-[#800020] via-[#FFC107] to-[#800020]",
                text: "Highway south, traffic darted like fish or stampeded. We passed an overturned camper, its owner in a smoking jacket waving an apology. Sirens wove a new music, emergency crawlers contradicting each other: *Do Not Use This Route. Use Only This Route.* On a hill, we saw a neighborhood burn, houses like they'd stored up fire. 'Fire is the truest currency,' she said. 'You give it anything, it gives you heat and light. Until it takes it all.' A culvert bore a spray-painted sunburst: WE RETURN WHAT WE TAKE. My phone rang, a voice saying, 'You're early or late. You already joined.' She smirked. 'Heliograph?' 'Everything's a door if it keeps you from burning.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 5,
                title: "CHECKPOINT AND CROSSING",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "At the county line, a checkpoint of cones and uniformed men stopped us. A deputy saw her patch. 'Friends of the sun?' 'Borrowers,' she said. 'Remain on County 12. No promises past the bridge.' We crossed, the river below moving like a spine, a canoe with two silhouettes and a dog gliding beneath. On the other side, trees lay like pickup sticks, a billboard advertised a boiled waterpark, and the radio replayed the horizon song. We passed a roller rink turned shelter, kids skating between cots, a mascot's grin pleading. The sign read TONIGHT: ADULTS ONLY, with WITH CHILDREN added in duct tape.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "DESERT BAR",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "Past midnight, we hit a forgotten town with a gas station, a bar, and a church that skipped weekdays. The bar's neon OPEN lied. Inside, four men stared at a TV painting the world orange. She ordered water and something brown. A man noticed her patch. 'My sister said pin it and pray in a storage unit.' 'It's a receipt,' she said, 'for what you keep.' The bartender handed me water bottles. 'Return what isn't yours.' Outside, she blessed the car's hood like a casket. 'One more push,' she said. 'Up.' The wind carried smoke south, the sun hid in ash, and a deer, charred at the edges, crossed our path, betrayed by evolution.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 7,
                title: "OUT TO THE OTHER SIDE",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "We climbed switchbacks to a crest where the world unrolled: north, an orange bruise; south, a black morning waiting for the right ticket. 'You said I looked like trouble,' she said. 'And I said you could carry it.' We laughed, her pulse against my ribs, the air smelling of sage and dust. She'd once lit a match at eleven, burning her father's junk, the smoke making a new sky. Now, the fireline redrew itself below, a strict calligraphy. 'It stops being yours,' she said of fire. The radio sang *She comes, burning houses in the distance.* We drove south, patches heavy, into a morning that insisted on itself, the road writing its song in fading lines.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 4,
        title: "On the Corner, Reading Poetry",
        panels: [
            {
                id: 1,
                title: "CHALK CIRCLE",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "I pick the corner for its honesty: four directions, one promise. Crosswalk chirps like a toy apocalypse, buses sigh like fat dragons. I set the milk crate down, chalk a sunburst with twelve rays on the concrete, and climb up to be taller than I am. 'Good evening,' I say to the city. 'There will be a test.' People pass, phones glowing, selecting the least painful world. A woman with groceries slows, then hurries on. Two teenagers on scooters hover, curious. A man in a suit scowls at the word poetry. I read: *Inventory at Sundown*—sun pinned like a receipt, twelve doors ajar, houses burning politely. *She comes, like a rumor with shoes on.* Coins clink into my hat.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 2,
                title: "SUNBURST REFLECTION",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "Across the street, the glass tower splits the city: one chilled inside, one dusted with ash out here. The low sun copies my chalk sunburst, making me think I drew the sky. A kid kneels, drawing a smaller twelve-ray circle with bright chalk, tongue out for accuracy. 'Receipt for the sun,' he says. 'My mom. And the other one.' A scooter kid with a sunburst patch on his sleeve asks for requests. 'No,' I say, 'but stay.' He does. A woman in a red coat, gold-thread sunburst on her cuff, watches without tipping, her gaze more costly. The dog at the bike rack sleeps through the city's lullaby.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 3,
                title: "POETRY AND POLICE",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "I read: *Urban Survival Guide, Verse Edition*—carry water, receipts, don't argue with wind. *She comes—you do not have to open the door. She is the door.* A bus unloads commuters. A girl in a floral mask drops a dollar, a painter exhales his day. Two cops in sunglasses ask for a permit. 'Five-oh-one,' I say. 'Freedom of speech, polite decibels.' They eye the chalk sunburst. 'Just math,' I say. 'Wheel of the year's little brother.' The red-coat woman grades the exchange, her patch brighter. 'Move along after ten,' the cop says, tipping two fingers. The corner collects us, doesn't promise to keep us.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 4,
                title: "BLIND MAN'S SONG",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "The blind man arrives, taps the chalk circle with his cane, and sits on his crate. 'Evening,' I say. He sings, braiding my poem: *She comes, burning houses in the distance—lights up the night.* The scooter kids chime in, delighted. The red-coat woman's patch pulses. The tower's reflection shows a burning horizon. A man at the bus stop asks if this is art or warning. 'Both,' I say. Another asks if I write the flyers with the number. 'Sometimes me, sometimes the sun.' His laugh is nervous. The blind man's song makes a woman cry without permission, the melody slipping into a corridor of notes.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 5,
                title: "ORANGES AND ANGER",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "A drone drops a bag of oranges, spilling like small suns at the red-coat woman's feet. 'Leave them,' she says, and they stop at the chalk circle's edge. A man mutters about devil circles, eats half a flyer, then confesses his brother's house burned last summer. 'We watched it like a show,' he says, eyes wet, leaving the unchewed flyer in my hat. I read: *Call & Answer*—who keeps the ledger? Not the bank. What burns slowest? Memory. *She comes. Make room.* The kid with chalk nods at my circle. A woman with a sign—RETURN WHAT ISN'T YOURS—chews a marker, staring at traffic.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "RETURN ROLL CALL",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "The red-coat woman kneels, one palm in the circle, one out, asking, 'What do you return?' 'Name,' I say, wincing as it leaves. The blind man says, 'Light,' removing his glasses, eyes quivering. The kid says, 'Body,' patting his ribs. Her smile cools the air. Sirens pass, not for us. I hand out *Return Slip* zines, cheap and smudging, taken like communion. The cop across the street points at his watch: ten. I call, 'Last one,' and read: *Twelve Doors*—names, light, bodies, luck, ashes, receipts. *She comes. We make room.* Silence is my applause, four seconds before the city resumes.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "DRIVING THE OTHER SIDE",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "The red-coat woman presses a car key into my hand, sunburst on its head. 'You'll be returning it to motion,' she says, nodding to a blue sedan. 'I have a bike,' I argue. 'You have a corner,' she counters, then vanishes. I pack the crate, wipe the chalk, leaving a ghost sun. The sedan's engine catches, a map on the seat marked OUT TO THE OTHER SIDE. 'Ready?' her voice hums in the corner. 'To return,' it says. I drive, the horizon bruising behind, the road promising what it can't keep. *She comes,* the city whispers, into the pop song summer.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 5,
        title: "A Blind Man Singing",
        panels: [
            {
                id: 1,
                title: "BLANK TAPE",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "The first time I recorded his voice, the tape was blank—levels jumped, needles danced, but playback gave silence, a shape in the noise like heat on a road. In a subway tunnel smelling of metal and bread, he sang five feet from my mic, cane tapping, no hat for tips. The song braided through footsteps and coins. 'Your recorder's fine,' he said. 'Hearing isn't playing back.' His sunglasses showed white eyes, a fact like weather. 'What's your name?' I asked. 'No,' he said, kind. 'Today I'm a channel. Names are what you return.' I run Sunroom Radio, a pirate station above a pawn shop, broadcasting lonely songs and storm warnings.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 2,
                title: "CHALK AND CORNER",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "I followed him, two paces back, to a corner where a kid drew a chalk sun with twelve uneven rays. He tapped the circle's edge, singing, *She comes, burning houses in the distance. Lights up the night.* The kid added a thirteenth ray, testing us. 'You sang that last week,' I said. 'Whenever the city forgets,' he replied. A woman mouthed the refrain at a bus stop, a teen's phone flashed *Insignia of the Sun*. 'I'm Mira,' I offered. 'Return it when you can,' he said, walking into a bruised sky, his cane punctuation, leaving me with a blank tape and a city turned radio.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 3,
                title: "STUDIO INVITATION",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "Two days later, call-ins led me to 8th and Marlow, where his voice 'aligned the air.' He sat on a milk crate, a chalk sun beneath, a sunburst patch on his frayed hat. 'Studio,' I said. 'One hour, no money, walk out anytime.' He asked for a reel-to-reel. I lied, 'Yes,' though mine's ancient. 'Point the mic at the empty chair,' he said in my studio, rubbing his cane like a match. He sang of burning horizons, names returned, a woman in a red coat. The tape spilled, needles swung, my eyes prickled. Playback: silence, but a pressure like altitude.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 4,
                title: "BROADCAST ABSENCE",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "He grinned at the silence. 'The room remembering,' he called it. I broadcast it live: 'Sunroom listeners, this blank tape isn't blank. Breathe like you're with a stranger.' The city held its breath for two minutes. Phones lit: an old man's clock kept time, a nurse's monitors calmed, a woman heard humming from nowhere. 'Aim the antenna at the bridges,' he said. 'They'll need exits.' 'Is there a fire?' 'There's always a fire.' He left the tape, labeled *RETURN WHAT ISN'T YOURS*, and walked out, sunglasses catching the pawnshop neon.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 5,
                title: "BRIDGE PROCESSION",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "Dusk brought a fire's smell from three exits north. I pointed the antenna at the river, played the silence: 'If you're on foot to the bridges, go slow.' On the 9th Street bridge, he sang, conducting people and cars with his voice. *She comes, lights up the night.* A woman in a red coat led a column, her sunburst pulsing. A stroller, a dog, an ambulance moved in rhythm. 'Records are being set,' I said. 'Play the absence,' he replied. 'It lets the city hear itself.' A boy with a trombone case whispered, 'Ready to return?' The bridge sang without his mouth moving.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "CANE AND CASSETTE",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "He tapped the bridge's seam three times, a note in my bones. I lost him in the smoke. At the rail, his cane leaned, a sunburst patch tied to it, a cassette taped on: *FOR WHEN THE WIND FINDS YOU*. I ran to the station, played it. My voice sang the refrain, a crowd and city woven in. Phones lit; I let them. At dawn, the chalk corner waited, twelve rays needing supervision. The kid approved my thirteenth ray. The woman in red passed, touching her sunburst cuff. 'Ready?' the kid asked. 'To return,' I said, laughing into the morning.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "CHORUS OF RETURN",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "At ten, a cop signaled to move along. I left the chalk sun's ghost. A sticky note on the board read *OUT TO THE OTHER SIDE*, circled with twelve marks. The tape ran without me, singing my voice, the city's chorus: *She comes, into the pop song summer.* Someone hummed, carrying a stroller; another turned a key in a blue sedan, calling it a return. Houses burned closer than they appear. I'm Mira, until I return that. The station is Sunroom, until a better name. Play the absence, draw the circle, wait for the wind. The city answers, a choir without rehearsals.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 6,
        title: "Out to the Other Side",
        panels: [
            {
                id: 1,
                title: "FAIRGROUND TICKET",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "The river roared under a STATE FAIR IS COMIN' BACK banner, sagging between light poles. The ferris wheel's skeleton stood like a rib cage. Out of work, I stopped at a red barn selling lemonade and lottery tickets. A girl with a ballpoint sun tattoo on her wrist handed me a peach-colored ticket stamped with a gold-foil sunburst, twelve rays. 'Souvenir,' she said. 'Makes folks spend brave.' I tucked it behind my license. A blind man sang by the gate: *She is out on the horizon, in the white gold of the evening light.* The ferris wheel caught and returned the sun. I filled the tank, the radio playing a woman's voice about the open road.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 2,
                title: "DINER HELIOGRAPH",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "At a shotgun-shack diner, a chalkboard promised PIE THAT FORGIVES. A woman in a red coat sat by the window, her sunburst patch glowing like a heliograph. Time bent around her; the jukebox skipped to a future song. A coffee I didn't order appeared. 'You headed out?' Lucy, the waitress, asked. 'To the other side,' I said. 'You got a reason?' I glanced at the woman, who smiled elsewhere. 'Low on reasons,' I said. The blind man's song drifted in: *There's a world of freedom waiting.* She left cash and walked into daylight. Lucy said, 'She'll be on the horizon. All of them.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 3,
                title: "ROAD AND MAP",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "The two-lane west shrank the fair's sign to rumor. Fields buffered into billboards. The radio replayed the song—*She is on my mind*—and I found a map in the passenger seat, marked in white pencil across counties. At a town, fair crew tents waited, a ferris wheel in pieces. A man smoking drew a sun in ash. 'Got a receipt?' he asked. I showed the ticket; he nodded. 'Don't stop where the freeway says. Stop where the river does.' The wind shifted, the sky turned nickel. He ground the ash sun under his heel, a ritual with jokes.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 4,
                title: "CITY OF ANGELS",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "Past sundown, the City of Angels glowed like a sea of lights. The song returned: *Out on the other side.* I took a wrong exit to Whittier, finding warehouses and a chalk sunburst under an overpass, twelve rays. A woman in a red coat leaned on a blue sedan, map folded on the dash, her sunburst patch pulsing. 'You took the wrong exit,' she said, pleased. 'Tradition,' she corrected my 'Habit.' She placed a velvet sunburst patch on the hood. 'It's a toll to cross.' 'Cross what?' 'Pick one,' she said, smiling half her mouth. 'Return what isn't yours, the bridge appears.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 5,
                title: "BRIDGE TOLL",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "We drove to a bridge, the river below engineered into submission. A man with a sign—RETURN WHAT ISN'T YOURS—traded my toll change for a sunburst sticker. The blind man sang from a folding chair: *In the white gold of the evening light.* Drivers opened windows, nodding like conspirators. Over the radio, her voice: 'Feel that?' 'Like driving uphill on a flat line.' 'That's the toll,' she said. 'Keep your foot in it.' The skyline lifted, the car aligned with its blueprint. A billboard promised OTHER SIDE OF SUMMER. My voice sang softly on the radio, unasked.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "DESERT CONFESSION",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "Past the city, the freeway faded to a frontage road, stars unguarded. We pulled over, the desert cold settling in the car. She stood on the sedan's hood, red coat a climate, sunburst answering stars. 'What happens on the other side?' I asked. 'You return what isn't yours, keep what keeps you.' 'Do we get each other?' Her look held a cure's cost. 'In pieces. In chorus.' The wind tugged her coat. Far off, a ferris wheel turned, a blind man counted beats. A kid erased a chalk ray. 'Forward,' she said, and we drove until the map forgot us.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "WHITE GOLD HORIZON",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "Dawn broke in a county spelling freedom simply. The fair was a rumor, the river its own mind. At a turnout, she touched my wrist, our pulses agreeing we were alive. The ticket's gold had printed onto my wallet, a staying receipt. The radio played the song, *A world of freedom waiting.* We passed a chalk circle, a diner with PIE STILL TRYING, a mural of a ferris wheel and red coat. 'You ready?' she asked. 'To return,' I said, honoring tradition. The patch lightened, the car wrote our attendance in rubber and light, out to the other side, horizon burning white gold.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 7,
        title: "Second Lover, Over and Under",
        panels: [
            {
                id: 1,
                title: "DINER BOOTH",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "The diner's neon sign flickers, casting a red glow over the parking lot. Inside, Flo pours coffee without asking, her sunburst patch catching the light. Across from me, she sits—not the woman in red, but someone familiar. Her eyes reflect nothing, like black mirrors. 'You don't remember me,' she says, stirring coffee she doesn't drink. I don't, but my body does—a phantom ache, like a missing limb. The jukebox plays a song about horizons and second chances. Outside, a blind man taps his cane three times on the sidewalk, and the ground seems to shift beneath us.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 2,
                title: "MEMORY FRAGMENTS",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "She slides a photograph across the table—us, standing by a ferris wheel, my arm around her waist. The date stamp says 1985, but I wasn't born then. 'That's not possible,' I say. She smiles. 'Time isn't what you think.' Her fingers trace a pattern on the table—a sunburst with twelve rays. 'You were my second lover, over and under the wheel of time.' The coffee tastes like ash. Through the window, I see houses burning on the horizon, though the news reports no fires. 'What did you return?' she asks. I don't know what she means, but my mouth answers: 'Light.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 3,
                title: "UNDER THE TABLE",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "A child crawls under the next table, drawing a chalk sunburst on the floor. Twelve rays, then a thirteenth that shouldn't fit but does. 'He's one of us,' she says. 'We all are, when we remember.' The jukebox skips, playing a song that hasn't been released yet. Flo winks at me, tapping her patch. 'The receipt is coming due,' she says, refilling cups that aren't empty. My companion reaches across the table, her fingers cold against mine. 'You promised to meet me here, thirty-seven years ago. You're late.' The diner shifts around us, chrome becoming brass, then plastic, then something I don't have a name for.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 4,
                title: "MIRROR BOOTH",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "The booth's vinyl seat cracks under my weight, revealing a mirror beneath. In it, I see myself—younger, older, wearing clothes I've never owned. She watches me see. 'The first time we met, you were running from the fire. The second time, you were running toward it.' Outside, the woman in red walks past, her coat a climate. She doesn't look in, but raises a hand in greeting. My companion nods back. 'She finds the doors. I help people remember why they need them.' The mirror-me mouths words I can't hear. The blind man's song drifts in: *She comes, like a memory you can't quite place.*",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 5,
                title: "COFFEE RIPPLES",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "She touches her coffee, and ripples spread outward, defying physics. The liquid shows scenes: a roller rink, a storage unit, a bridge with exodus traffic. 'You've been busy,' she says. 'Following the signs.' I see myself in each scene, though I've only lived some of them. 'Time isn't linear,' she explains. 'It's a wheel, and we're all spokes, connected at the hub.' The ripples reach the cup's edge and continue across the table, across my skin. The diner patrons freeze mid-motion, except for Flo and the child with chalk. 'What happens when the wheel stops?' I ask. 'It never does,' she says. 'But sometimes, it changes direction.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "BILL AND RECEIPT",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "Flo brings the check—not for the coffee, but for 'Time Borrowed: 37 years, 4 months, 12 days.' My companion slides a sunburst patch across the table. 'Your payment.' I pin it to my jacket, feeling thread bite skin. The patch burns, then cools, leaving a mark I know will never fade. 'Now we're even,' she says, standing. 'Until the next cycle.' She walks to the door, pausing to whisper something to the child. Outside, a blue sedan waits, engine running. The woman in red holds the passenger door open. 'Where are they going?' I ask Flo. She points to the horizon. 'Out. To the other side.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "DINER DEPARTURE",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "I leave a tip—not money, but a name written on a napkin. It feels right, though I don't know why. Outside, the air smells like summer and smoke. The blind man stands at the corner, singing about horizons and returns. The child's chalk drawing has spread beyond the diner, marking a path down the street. I follow it, each step aligning with a memory I'm only now receiving. The jukebox plays one last song as the door swings shut behind me: *She comes, second lover, over and under.* My patch pulses with my heartbeat, a receipt for time borrowed and returned. Ahead, the horizon burns with promise.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 8,
        title: "1985 (Disco Time Machine)",
        panels: [
            {
                id: 1,
                title: "THRIFT STORE FIND",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "In a thrift store in a dead mall, a crate of $1 disco records hides a white-label 12-inch, stamped with a gold-foil sunburst, twelve rays, etched with *HELIOGRAPH / 12 DOORS / +6% / -6% / FOR RETURN*. The clerk, in an I'M NOT A ROBOT shirt, says it's not for sale. I set a five on the counter. He slides it to me in a sleeve smelling of winter. 'Don't play it loud,' he says. 'I don't do anything loud,' I lie. The air smells of dust and forgotten decisions, the mall's neon sign half-lit: FOA FO A WEAR.",
                quote: null,
                text_after: null,
                has_insignia: true
            },
            {
                id: 2,
                title: "TIME MACHINE DECK",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "At home, my Technics 1200s are a religion. I place the white-label on the left deck, superstitious. The needle drops; silence hums like a dog expecting its name. Then: hi-hat like a subway gate, bass thick as nostalgia, strings curving air. A woman's voice sings, *She comes…* The pitch fader at +6% yellows the room; my phone flickers into a walkman, a landline rings in a kitchen without one. The street grows Datsuns, neon reads FOAM AND FORMALWEAR. At -6%, the snare modernizes, the room snaps back. The runoff groove whispers: *Return what isn't yours. Wednesday, nine, unit four-thirteen.*",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 3,
                title: "ROLLER RINK REVIVAL",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "The dead mall's roller rink opens Fridays, promising ADULTS ONLY TONIGHT. The DJ, in a DON'T PANIC hoodie, eyes the sunburst record. 'You a member?' 'It's a toll,' I say. At eleven, I drop the needle. The hi-hat rumors, the voice reefs the ceiling: *Pop song summer.* At +6%, lights warm, the mirror ball infects, jackets grow shoulder pads. Skaters sing, *She comes,* unrehearsed. A woman in a red coat skates, her sunburst patch catching lasers. The rink becomes 1985; a ferris wheel turns in the glass. A kid redraws a chalk sunburst on the wall.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 4,
                title: "SKATING THROUGH TIME",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "The house DJ says, 'Lift at the bridge—now.' I push the fader to +10%; time dilates, wheels spark. The red-coat woman skates backward, laughing silently, her patch a corrected laser. Skaters mouth lyrics they didn't learn: *Pop song summer.* In the snack bar glass, houses burn four cities away. A man asks, 'What is this?' 'Receipt for time,' she says. The runoff groove repeats: *Return what isn't yours. Resist seven.* The rink breathes like a survivor. The DJ slides the record back: 'It'll want a toll.' 'What you stole,' she says. I know better.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 5,
                title: "PAYPHONE CALL",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "In the mall, a dead payphone rings. I answer; a woman's voice, not the red-coat's, says, 'You're early or late. Either works.' 'I have the record,' I say. 'You have a door. Bring nothing. Return everything.' The call ends. I pack the white-label like a loved hostage. The neon flickers to FOA FO A WEAR. A kid outside draws a chalk sunburst, adding a thirteenth ray. The rink's lights dim, the city in the glass shows burning houses. The record's weight lies; it's the same, but I'm not. The toll is what I stole: time, her, a name I scuff on my license.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "UNIT 413 RITUAL",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "Unit 413, in a storage facility, yawns open. Inside: candles circle a milk crate altar with a cassette deck, a jar of sunburst patches, a chalk diagram of twelve notches. An androgynous figure with a sunburst patch says, 'You brought it.' I set the record down; it warms under my palm. 'What did you steal?' they ask. 'Time. Her.' They nod, administrative. I place my license down, scraping my name. 'Return what isn't yours,' they say. The red-coat woman appears in the doorway, her patch glowing. 'Wednesday,' she says. 'Nine,' I reply. The cassette exhales a skating tone.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "RETURN AND KEEP",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "'Ready to return?' the figure asks. I leave the record, keep the song. Stepping around the chalk circle, I exit to a night smelling like 1985. At home, the slipmat holds a sunburst ghost. The radio, unasked, plays Sunroom's frequency, my voice singing a chorus I didn't write. A kid's chalk circle outside counts to thirteen. The blind man's note hums from a bridge. The red-coat woman lifts a hand in the glass. *She comes,* the city sings, into the pop song summer. I press the slipmat's mark, feeling thread bite. Wednesday, nine, unit 413. I don't plan to go. I'm going.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 9,
        title: "Shadow Drifter",
        panels: [
            {
                id: 1,
                title: "BRIDGE CROSSING",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "The bridges stretch out like skeletal fingers over water that reflects nothing. I walk between worlds, a shadow drifting through places that shouldn't exist but somehow do. My footsteps echo twice—once beneath me, once beside me, where my shadow walks upright, independent. It's been this way since the storage unit, since the patch, since she came. The city behind me burns slowly, not with fire but with forgetting. Ahead, twelve bridges span to twelve shores, each promising a different return. A chalk sunburst marks the entrance to each, twelve rays perfectly spaced.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 2,
                title: "SHADOW COMPANION",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#000000] to-[#1A2A44]",
                text: "My shadow turns to face me, its edges blurring in the half-light. 'You're early,' it says with my voice, but older. 'Or late. Either works.' I've stopped being surprised by impossible things. 'Which bridge?' I ask. It points to the seventh, where a woman in red stands midway, her coat catching non-existent wind. 'She's waiting,' my shadow says. 'She's always waiting.' I touch the sunburst patch on my shoulder, feeling thread bite skin. 'What am I returning?' My shadow smiles with teeth I can't see. 'Everything you borrowed. Nothing you earned.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 3,
                title: "SEVENTH BRIDGE",
                background: "bg-gradient-to-b from-[#4A4A4A] via-[#2D2D2D] to-[#4A4A4A]",
                text: "The seventh bridge creaks beneath my feet, metal singing like memory. Halfway across, the woman in red waits, her sunburst patch pulsing with my heartbeat. 'You've been collecting,' she says, nodding to my shadow. 'It happens when you cross too many times.' Below, the river flows in both directions simultaneously. A blind man stands at the far end, tapping his cane in rhythm with the bridge's song. 'He's counting,' she explains. 'Every crossing changes something.' My shadow stretches between us, touching both but belonging to neither. 'I don't remember crossing before,' I admit. She smiles. 'That's the toll.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 4,
                title: "RIVER REFLECTION",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "We lean over the railing, looking down at water that should show our faces but instead reveals other bridges, other crossings. I see myself in a roller rink, in a diner, in a storage unit with candles. 'Echoes,' the woman in red explains. 'Every choice creates them.' My shadow points to one reflection where I'm burning, another where I'm singing. 'Which is real?' I ask. 'All of them,' she says. 'None of them.' The blind man's song reaches us: *She comes, like a shadow drifting between worlds.* The water ripples with the melody, bridges shifting like cards being shuffled. 'It's time to choose,' she says. 'Which return?'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 5,
                title: "BRIDGE TOLL",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "At the center of the bridge, a toll booth appears that wasn't there before. Inside, a child with chalk-stained fingers holds out a hand. 'The fee,' he says. My shadow reaches into my pocket, removing a name I'd written on a napkin, a key to a blue sedan, a cassette tape labeled 'For When the Wind Finds You.' The child takes them, nodding. 'And the last?' The woman in red touches my patch. 'He keeps that,' she says. 'It's a receipt, not a payment.' The child stamps my hand with a sunburst, twelve rays plus one that shouldn't fit but does. 'You may proceed,' he says. 'To the chorus.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 6,
                title: "CHORUS BRIDGE",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "As we walk, the bridge fills with others—the DJ with her white-label record, the painter with his canvas, Flo from the diner, the lemonade girl from the fair. Each bears a sunburst, each walks with a shadow that isn't quite right. 'The chorus,' the woman in red explains. 'We're all returning together.' The blind man's song grows louder, joined by voices I recognize from radio, from corners, from dreams. *She comes, burning houses in the distance. Lights up the night.* My shadow stretches ahead, becoming a path of its own. The woman takes my hand. 'Don't be afraid,' she says. 'You've done this before.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "FINAL CROSSING",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "The far shore glows with a light that isn't sunrise or sunset but something older. My shadow rejoins me as we reach the end, melding back but leaving memories that weren't mine before. The blind man nods as we pass, still singing. The chorus disperses, each taking a different path into the light. 'Where do we go?' I ask the woman in red. 'Forward,' she says. 'Always forward.' She points to a fairground in the distance, a ferris wheel turning against a sky that shouldn't exist. 'The end of everything,' she says. 'The beginning of returns.' My patch pulses one final time as we step off the bridge, shadows stretching behind us like promises kept.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true,
                epilogue: true,
                neon_title: true,
                neon_color: "red"
            }
        ]
    },
    {
        number: 10,
        title: "The End of Everything",
        panels: [
            {
                id: 1,
                title: "FINAL INSIGNIA",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "At the end of the road stands a massive version of the sun insignia from the club. It towers over everything, a golden monument to something ancient and powerful. The woman in red waits beneath it.",
                quote: "This is where it begins. This is where it ends.",
                text_after: null,
                has_insignia: true,
                large_insignia: true
            },
            {
                id: 2,
                title: "GATHERING OF RETURNS",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#FFC107] to-[#1A2A44]",
                text: "They've all gathered here—the blind singer, the poet from the corner, the DJ with her white-label record, the painter with his canvas, the lemonade girl from the fair. Each wears the sunburst patch, each stands in a circle around the massive insignia. The woman in red moves among them, touching shoulders, whispering words that sound like thank you. My shadow stretches toward the center, eager to join the ritual.",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 3,
                title: "TWELVE DOORS",
                background: "bg-gradient-to-b from-[#2D0A31] via-[#1A0E25] to-[#2D0A31]",
                text: "Around the insignia, twelve doors stand in a perfect circle, each leading somewhere impossible—a roller rink in 1985, a burning suburb, a bridge crossing between worlds, a velvet club with dancers moving in algorithm patterns. 'All returns,' the woman in red explains, 'lead here eventually.' The blind man taps his cane twelve times, and each door opens slightly, leaking light and music and memory. The child with chalk draws a connecting line between each door, completing a web of light.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_door: true
            },
            {
                id: 4,
                title: "SHE ARRIVES",
                background: "bg-gradient-to-b from-[#800020] via-[#4A0000] to-[#800020]",
                text: "The ground trembles. The insignia begins to spin, slowly at first, then faster, gold thread catching impossible light. The woman in red raises her hands, and everyone's patches pulse in unison, a heartbeat shared across time and space. 'She comes,' the blind man sings, and the chorus joins: *She comes, burning houses in the distance. Lights up the night.* The center of the insignia cracks open, and light pours through—not sunlight, but something older, something that remembers when the world was new.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_light_rays: true,
                neon_title: true,
                neon_color: "red"
            },
            {
                id: 5,
                title: "SUMMER INCARNATE",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FFFFFF] to-[#FFC107]",
                text: "And then she's there—the woman from the velvet club, the one made of summer itself. Her face shifts too quickly to memorize, beautiful in a way that hurts. Her dress is woven from light and memory, from pop songs and burning horizons. She steps forward, and the circle widens to receive her. 'You've all returned what wasn't yours,' she says, her voice a melody that's been playing since before records existed. 'Now it's time to receive what is.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_light_burst: true
            },
            {
                id: 6,
                title: "THE GIFT",
                background: "bg-gradient-to-b from-[#1A2A44] via-[#26A69A] to-[#1A2A44]",
                text: "She touches each person in turn—the blind man sees, the poet speaks in tongues, the DJ hears music that hasn't been written. When she reaches me, her fingers are warm against my forehead. 'You've carried the story,' she says. 'Now carry the summer.' The patch on my shoulder melts into my skin, becoming a tattoo that pulses with my heartbeat. The woman in red watches, nodding approval. 'The receipt is paid,' she says. 'The debt is cleared.'",
                quote: null,
                text_after: null,
                has_insignia: true,
                neon_title: true,
                neon_color: "gold"
            },
            {
                id: 7,
                title: "CYCLE COMPLETE",
                background: "bg-gradient-to-b from-[#FFC107] via-[#FF3300] to-[#FFC107]",
                text: "The twelve doors begin to close, one by one. The woman made of summer smiles, and it's like watching the sun rise over a world that's never seen daylight before. 'The cycle is complete,' she says. 'The wheel turns. The pop song summer continues.' She steps back into the light at the center of the insignia. The woman in red follows, pausing only to look back once. 'Until next time,' she says. The light intensifies, then collapses into a single point before vanishing completely. The insignia stops spinning. The patch on my shoulder cools.",
                quote: null,
                text_after: null,
                has_insignia: true,
                has_burning: true
            },
            {
                id: 8,
                title: "NEW BEGINNING",
                background: "bg-gradient-to-b from-[#2D2D2D] via-[#1A1A1A] to-[#2D2D2D]",
                text: "We stand in silence, strangers connected by something beyond words. One by one, people begin to leave, returning to lives that will never be quite the same. The blind man—no longer blind—folds his cane and walks away singing a new song. The child with chalk draws a final sunburst, adding a thirteenth ray that shouldn't fit but does. I touch my shoulder, feeling the outline of the insignia beneath my shirt. The horizon no longer burns. The houses stand intact. But somewhere, a velvet curtain sways between two bodegas, waiting for someone new to push through.",
                quote: null,
                text_after: null,
                has_insignia: true,
                epilogue: true
            }
        ]
    }
];

// Centralized chapter assets including images, SVGs, and audio
export const chapterAssets = {
    0: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-velvet-dancers-song-header-ar3x1-3k-rgb-v001-20250831-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch01_velvet-dancers.mp3`
    },
    1: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-insignia-of-the-sun-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch02_insignia-of-the-sun.mp3`
    },
    2: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-burning-houses-in-the-distance-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch03_burning-houses-in-the-distance.mp3`
    },
    3: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-on-the-corner-reading-poetry-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch04_on-the-corner-reading-poetry.mp3`
    },
    4: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-a-blind-man-singing-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch05_a-blind-man-singing.mp3`
    },
    5: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-out-to-the-other-side-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch06_out-to-the-other-side.mp3`
    },
    6: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-second-lover-over-and-under-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch07_second-lover-over-and-under.mp3`
    },
    7: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-1985-disco-time-machine-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch08_1985-disco-time-machine.mp3`
    },
    8: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-shadow-drifter-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch09_shadow-drifter.mp3`
    },
    9: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-the-end-of-everything-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch10_the-end-of-everything.mp3`
    },
    default: {
        headerImage: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-velvet-dancers-song-header-ar3x1-3k-rgb-v001-20250831-jh-final.png`,
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        audio: `${baseUrl[currentEnvironment]}/music/pss_ch01_velvet-dancers.mp3`
    }
};

// Global assets for reference (from original hardcodedAssets)
export const globalAssets = {
    insignia_of_the_sun: {
        title: "Insignia of the Sun (Primary Motif)",
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg`,
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-4k-rgb-v001-20250831-jh-final.png`,
        used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    woman_in_red: {
        title: "Woman in Red (Archetype)",
        svg: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-svg-v001-20250831-jh-final.svg`,
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-4k-rgb-v001-20250831-jh-final.png`,
        used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    burning_houses: {
        title: "Burning Houses on the Horizon",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-burning-houses-horizon-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "burning",
        used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    door: {
        title: "Door",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-door-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "door",
        used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    light_rays: {
        title: "Light Rays",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-light-rays-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "light",
        used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    desert_road: {
        title: "Desert Road",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-desert-road-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "road",
        used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    velvet_curtain: {
        title: "The Velvet Curtain",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-velvet-curtain-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "curtain",
        used_in_chapters: [1]
    },
    club_interior: {
        title: "Club Interior",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-club-interior-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "club",
        used_in_chapters: [1]
    },
    velvet_dancers: {
        title: "Velvet Dancers",
        png: `${baseUrl[currentEnvironment]}/assets/images/pss/pss-velvet-dancers-ar16x9-4k-rgb-v001-20250902-jh-final.png`,
        type: "dancers",
        used_in_chapters: [1]
    }
};

// Re-export chapterIcons from chapterIcons.js
export { chapterIcons };