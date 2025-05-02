import {
	type NewGallery,
	artists,
	create_db,
	exhibition,
	exhibition_artists,
	gallery,
	images,
	job_status,
} from "@monorepo-template/db";
import { sql } from "drizzle-orm";

async function seed() {
	const db = create_db();

	try {
		await db.delete(images);
		await db.delete(exhibition_artists);
		await db.delete(exhibition);
		await db.delete(artists);
		await db.delete(gallery);
		await db.delete(job_status);

		await db.execute(sql`ALTER SEQUENCE gallery_id_seq RESTART WITH 1`);
		await db.execute(sql`ALTER SEQUENCE exhibition_id_seq RESTART WITH 1`);
		await db.execute(sql`ALTER SEQUENCE artists_id_seq RESTART WITH 1`);
		await db.execute(sql`ALTER SEQUENCE images_id_seq RESTART WITH 1`);
		await db.execute(sql`ALTER SEQUENCE job_status_id_seq RESTART WITH 1`);
		
		console.log("Cleared existing data and reset sequence counters for all tables");
	} catch (error) {
		console.error("Error setting up tables:", error);
	}

	try {
		// Sample gallery data
				const galleryData = [
	// {
	// 	id: 1,
	// 	name: "198 Contemporary Arts & Learning",
	// 	url: "https://www.198.org.uk/whats-on",
	// 	description: "198 Contemporary Arts and Learning is a public art gallery and hub for social engagement, education and creative enterprise. Our work is deeply rooted in our local communities and is influenced by the radical history of Railton Road and the Brixton uprisings.\n\nEstablished in 1988, the organisation initially aimed to provide a platform for Afro-Caribbean and Asian artists as part of the blossoming Black Arts Movement. Over the last 35 years, our work has evolved, engaging with contemporary issues through exhibitions, workshops, educational projects, and critical debates with artists, thinkers, activists, young people, and local artistic communities. We advocate for diversity within the visual arts, offering opportunities for those aspiring to develop careers in the creative and cultural industries.",
	// 	recommended: false
	// },
	// {
	// 	id: 2,
	// 	name: "3812 Gallery London",
	// 	url: "https://www.3812gallery.com/exhibitions/london/",
	// 	description: "Co-founded by Calvin Hui and Mark Peaker, 3812 Gallery is a dynamic art space with locations in Hong Kong and London. In 2024, the London gallery will be relocated to a new and exciting destination, The Whiteley. 3812 represents both modern and contemporary Chinese artists, such as Hsiao Chin, a major post-war painter whose works can be found in prestigious institutions like M+ in Hong Kong and the Metropolitan Museum of Art in New York; and Ma Desheng, an internationally renowned Chinese artist based in Paris, who had a solo exhibition at Centre Pompidou in 2022. His works are collected by international institutions including Centre Pompidou, the British Museum, and M+ Museum. 3812 also highlights the significance of ink art, including the works of Raymond Fung from Hong Kong, whose works can be found in notable collections such as The Asian Art Museum of San Francisco and the Hong Kong Palace Museum. The gallery also represents Liu Guofu, a meticulous painter based in Nanjing, whose works are collected by Macau's MGM Chairman's Collection and the Shanghai Art Museum. 3812 continuously expands its artistic vision by working with contemporary artists from diverse genres. This includes celebrated Beijing-based artist Zhao Zhao, recipient of the Artist of the Year Award of Art China (AAC) in 2019, as well as the captivating porcelain creations of Li Hongwei, which have been collected by over 30 prominent institutions including the Art Institute of Chicago and the British Museum, among others.",
	// 	recommended: false
	// },
	// {
	// 	id: 3,
	// 	name: "A.I.",
	// 	url: "https://a-i-gallery.com/exhibitions/",
	// 	description: "Based in London, A.I. is a gallery platform which is committed to encouraging dialogue and challenging the notions of the East and West.",
	// 	recommended: false
	// },
	// {
	// 	id: 4,
	// 	name: "AB-ANBAR",
	// 	url: "https://ab-anbar.com/exhibitions/",
	// 	description: "Ab-Anbar is a contemporary art gallery that engages with the non-linear intersections of histories of Art and History. Often diasporic, Ab-Anbar represents artists from multiple latitudes and identities, who traverse the aesthetic and political, as well as social and psychological borders.\n\n \n\nAb-Anbar initially opened in 2014 in Tehran, Iran. The gallery is a conceptual representation of its name which means a water reservoir in Farsi. The word is made of two parts: 'ab' meaning water and 'anbar' meaning a reservoir. Thus, Ab-Anbar as a gallery is the architectural expression of a physical space that shapes malleable content, nurturing life and growth. The space, through its solidity and form, brings to sight the fluidity of art.\n\n \n\nSince its inception, the gallery has presented exhibitions as well as hosted and collaborated with a variety of cultural tenants, not-for-profits, independent publishers, musicians, and performers, fashioning a year-long programme of wide-reaching cultural engagement. \n\n \n\n2020 marked the beginning of Ab-Anbar’s program in London, UK. With its new permanent and sole space, open in September 2023 in London’s historical Fitzrovia, the gallery intends to expand the dialogue between artists, collectors, museums and curators towards an inclusion and understanding of marginalised realities.",
	// 	recommended: true
	// },
	// {
	// 	id: 5,
	// 	name: "Alison Jacques",
	// 	url: "https://alisonjacques.com/exhibitions",
	// 	description: "Founded in 2004 in London, Alison Jacques has long-since established an international reputation for its curatorially led approach to exhibition-making and its pioneering work with both under-acknowledged artists and contemporary artists alike.\n\nThese include Maria Bartuszová, Lygia Clark, the Gee’s Bend Quiltmakers, Birgit Jürgenssen, Nicola L., Ana Mendieta, Roy Oxlade, Betty Parsons, Carol Rhodes, Dorothea Tanning, Lenore Tawney and Hannah Wilke. Photographers include Gordon Parks and Robert Mapplethorpe, the Estate of whom the gallery has represented in the UK since 1999.\n\nIn addition, Alison Jacques represents major international contemporary artists such as Sophie Barber, Dan Fischer, Fernanda Gomes, Sheila Hicks, Ian Kiaer, Takuro Kuwata, Graham Little, Erika Verzutti, Alessandro Raho, Veronica Ryan and Michelle Stuart. In recent years, the gallery has staged landmark exhibitions of work by Tawney, Barber, Hicks, Rhodes, Verzutti and Parks, as well as online shows from such figures as Parsons and the Freedom Quilting Bee.",
	// 	recommended: false
	// },
	// {
	// 	id: 6,
	// 	name: "Albion Jeune",
	// 	url: "https://www.albionjeune.com/exhibitions/",
	// 	description: "Founded in 2023 by Lucca Hue-Williams, Albion Jeune inaugurated with an  exhibition by Esben Weile Kjær at its first location of 16-17 Little Portland Street on October 5th 2023. Albion Jeune presents a curated artist- led programme from its roster of emerging international artists, many of whom have significant institutional exhibition history. With a commitment to the continued survival of a truly ‘global art world,’ the gallery is established as a platform for cultural exchange. Albion Jeune operates an international roaming presentation through peer partnerships. The gallery presents a wide range of exhibitions, a public programme, and will publish books.  ",
	// 	recommended: true
	// },
	// {
	// 	id: 7,
	// 	name: "Alice Black",
	// 	url: "https://www.aliceblackgallery.com/exhibitions-main-page",
	// 	description: "ALICE BLACK is a London based art gallery, established in 2017. Initially working as a project space and itinerant exhibition programme, in 2022 the gallery formalised its roster and now represents seven post-war and contemporary artists working across a range of mediums and conceptual concerns. Our core aim is to support artists whose practices constitute materially driven investigations into the existential, socio-political and environmental realities of our global moment, whilst encouraging inclusive and generative artistic discourse in our audiences.  \n\nALICE BLACK was co-founded by Alice Black and Matt Symonds. Alice is a member of the Development Committee at the Institute of Contemporary Arts, London (ICA), a Mentor at the Sarabande Foundation established by the late Alexander McQueen and a visiting tutor at Goldsmiths, University of London (MFA). She is recognised by Forbes as a young leader in her field: Forbes 30 Under 30 Art & Culture (2020).\n\nRepresented artists; Rachael Bailey (b. 1975, UK); Ivan Black (b. 1972, UK), Dante Elsner (1920-1997, Poland), Matthew Harris (b. 1966, UK), Tristan Pigott (b. 1990, France), Amber Pinkerton (b. 1997, Jamaica) and Atalanta Xanthe (b. 1996, USA). ",
	// 	recommended: false
	// },
	// {
	// 	id: 8,
	// 	name: "Alice Amati",
	// 	url: "https://www.aliceamati.com/upcoming-exhibitions",
	// 	description: "Alice Amati is a contemporary art gallery established in London in June 2023.  The gallery is committed to fostering artists at the early stages of their career by often providing the opportunity for their first solo show in the city and a supportive context for artistic explorations and career development.\n\nConcerned with encouraging transnational dialogues around topical questions within society and art, Alice Amati brings together British and International artists through a challenging, experimental and rigorous exhibitions programme.\n\nJoining a cohort of young and established galleries in the burgeoning artistic scene of Fitzrovia, Alice Amati operates as a platform for new voices in the contemporary global artistic scene with a strong commitment to research, collaboration and diverse practices.",
	// 	recommended: false
	// },
	// {
	// 	id: 10,
	// 	name: "Alma Pearl",
	// 	url: "https://almapearl.com/exhibitions/",
	// 	description: "Founded in 2023 in London by Celeste Baracchi, Alma Pearl is a contemporary art gallery devoted to exhibiting the work of artists established and emerging who, through the qualities of their work and practice, deserve greater exposure. In its first two years, Alma Pearl has granted young artists their first exhibition opportunities while also highlighting the work of overlooked artists both within and beyond the gallery roster.\n\nAt the core of its inception is an aim to reposition a gallery as a conduit for community building, both amongst artists and at a local and global level. Alongside exhibitions, our programme includes talks, lectures, screenings and other events which represent the animating core of our programming activities. Sustainability, for both our climate as well as an artist’s practice, is central to all aspects of Alma Pearl.\n\nAlma Pearl believes in the urgent power art possesses to make a difference, be a force for good, and enrich the lives of all those who make and experience its power, irrespective of race, gender, and class. Alma Pearl is committed to fostering inclusive and equitable communities both in a physical and online space and believes that everybody should have equal access to creating and engaging with contemporary art. ",
	// 	recommended: false
	// },
	// {
	// 	id: 11,
	// 	name: "Almine Rech",
	// 	url: "https://www.alminerech.com/exhibitions/?l=london",
	// 	description: "Almine Rech is known for its representation of minimal, perceptual, and conceptual artists such as James Turrell, John McCracken, and Joseph Kosuth, occupying spaces in Paris, Brussels, London, New York, Shanghai and recent Gstaad and Monaco locations.\n\nAlmine Rech opened her first gallery in Paris in November 1989, with an exhibition featuring a James Turrell ‘Space Division’ light piece.\n\nIn 1997, the gallery relocated to a larger space in the 13th arrondissement with a solo show by John McCracken, followed by James Turrell's '‘Wedgework Milk Run III’, which is now part of the Aarhus Museum Collection. Throughout the years, Almine Rech has expanded, opening new locations throughout Europe, the United Kingdom, Asia, and the United States.\n\nIn addition to preserving long-standing relationships with renowned artists such as Joseph Kosuth, James Turrell, and De Wain Valentine, Almine Rech works with emerging artists like Farah Atassi, Oliver Beer, Andrea Marie Breiling, Genieve Figgis, Daniel Gibson, Nathaniel Mary Quinn, George Rouy, Vaughn Spann, Emma Stern, Claire Tabouret, Genesis Tramaine, Amanda Wall, Chloe Wise, and Huang Yuxing alongside established artists and estates, such as John M Armleder, Karel Appel, Alexander Calder, Ha Chong-Hyun, Günther Förg, Jeff Koons, Jannis Kounellis, Pablo Picasso, Antoni Tàpies, Mai-Thu, Richard Prince, Tom Wesselmann, and Kim Tschang-Yeul.\n\nIt remains Almine Rech’s mission to continually seek out and include new artists in its program, with a focus on excellence and originality in the painting tradition.\n\nArt is about freedom of expression. Almine Rech loves to make contact and develop relationships with artists who use this freedom to contribute to contemporary society. Art is thus embodied throughout history.\n\nIn 2006, the Paris gallery relocated to the Marais and opened with a group exhibition curated by French fashion designer and photographer Hedi Slimane.\n\nIn subsequent years Almine Rech opened spaces in Brussels, London, New York, and Shanghai. The inaugural exhibition in New York showcased works of Alexander Calder and Pablo Picasso.\n\nA second space opened in Paris on Avenue Matignon (with a further expansion of the space in 2022), and a second New York gallery in Tribeca opened in October 2023 with an exhibition by Vaughn Spann. In 2024, the gallery expanded in Monaco with the opening of a new space in the Carré d'Or district. In addition to exhibitions hosted in the various gallery locations, Almine Rech participates in numerous art fairs including Art Basel, TEFAF, Paris+, and Frieze.\n\nThe gallery presents its in-house published catalogs and editions through Almine Rech Editions, featuring a broad collection of new and limited-run books in print and online catalogs and select items can also be found at Almine Rech Paris, Brussels, London, New York, Monaco, and Shanghai.\n\nAlmine Rech is also the co-founder of FABA (Fundación Almine y Bernard Ruiz-Picasso), which is dedicated to upholding Pablo Picasso’s legacy and maintains an extensive archive of his works along with contributions to collaborations on modern and contemporary art with international institutions and exhibitions. Almine Rech and FABA collaborate on exhibitions in Pablo Picasso's studio at Château de Boisgeloup (Gisors, France) and at Palazzo Cavanis, Venice (Italy).",
	// 	recommended: false
	// },
	// {
	// 	id: 12,
	// 	name: "Alon Zakaim Fine Art",
	// 	url: "https://www.alonzakaim.com/exhibitions/",
	// 	description: "Alon Zakaim Fine Art specialises in Impressionist, Modern and Contemporary art. With an acute understanding of the art market, the gallery provides a knowledgeable, efficient and accessible service to all their clients and exhibits a distinguished collection of high quality paintings and sculptures throughout the calendar year.\n\nThe gallery handles a broad range of quality artworks by Impressionist masters, such as Monet, Sisley, Renoir and Pissarro, and key Modern painters, including Picasso, Léger, Matisse and Chagall. The gallery also features solo exhibitions of both up and coming artists and established names in the contemporary art market.",
	// 	recommended: false
	// },
	// {
	// 	id: 14,
	// 	name: "Amanda Wilkinson",
	// 	url: "https://amandawilkinsongallery.com/exhibitions/",
	// 	description: "Amanda Wilkinson Gallery is a contemporary art gallery with a strong focus on female artists and artists whose work explores issues around gender. The gallery represents an international group of artists and many take a multi-media approach to their work, these include Joan Jonas, Laurie Simmons, Heman Chong, Shimabuku and Dorota Gawęda and Eglė Kulbokaitė as well as several Estates including Derek Jarman, Ketty La Rocca and Jimmy DeSana. Brewer Street Press was set up in 2021 to publish books relating to the artists and exhibitions in the programme. ",
	// 	recommended: false
	// },
	// {
	// 	id: 15,
	// 	name: "David Zwirner",
	// 	url: "https://www.davidzwirner.com/events",
	// 	description: "David Zwirner is a contemporary art gallery with locations in New York, Los Angeles, London, Paris, and Hong Kong, and currently represents more than seventy artists and estates. The gallery has been home to innovative, singular, and pioneering exhibitions across a variety of media and genres. Active in both the primary and secondary markets, David Zwirner has helped foster the careers of some of the most influential artists working today and has maintained long-term representation of a wide-ranging, international group of artists.\n\nIn 1993, David Zwirner opened his eponymous gallery on Greene Street in New York’s SoHo neighborhood. In 2002, Zwirner relocated his gallery from SoHo to West 19th Street in Chelsea. In 2012, the gallery expanded, opening on Grafton Street in the heart of London’s Mayfair district. Coinciding with its twentieth anniversary in 2013, David Zwirner inaugurated a new five-story exhibition and project space on West 20th Street in New York.\n\nIn 2017, the gallery opened on the Upper East Side of Manhattan and launched David Zwirner Online, the gallery’s online viewing room. David Zwirner’s first gallery in Asia opened in 2018 in Hong Kong, and in 2019, David Zwirner opened its first Paris gallery. In 2021, David Zwirner opened 52 Walker, a gallery space in New York programmed and led by senior director Ebony L. Haynes. In 2023, David Zwirner opened its first gallery spaces in Los Angeles.\n\nIn addition to the gallery program, David Zwirner produces content through David Zwirner Online; David Zwirner Books, the gallery’s publishing arm that launched in 2014; the podcast Dialogues, which premiered its first season in 2018; and Utopia Editions, the gallery’s fine art print publisher, launched in the fall of 2021.\n\nIn 2021, David Zwirner also launched a new stand-alone company, Platform—an online destination for buying art from today’s most sought-after artists.",
	// 	recommended: false
	// },
	// {
	// 	id: 17,
	// 	name: "Annely Juda Fine Art",
	// 	url: "https://www.annelyjudafineart.co.uk/exhibitions/forthcoming/",
	// 	description: "Annely Juda (1914 – 2006) established the Molton Gallery (1960 – 1963) and then the Hamilton Galleries (1963 – 1967) in London before opening Annely Juda Fine Art with her son, David Juda, on 16th June 1968 in a warehouse space on London’s Tottenham Mews.  The first exhibition was ‘Now Open: Important Paintings of the 20thCentury and Young Artists’ and the presentation of the twentieth-century avant-garde works alongside contemporary art has carried on throughout the gallery’s history.  \n\nThe gallery became known for exhibiting works from Russian Constructivism, the Bauhaus and De Stijl movements, showing artists such as Kandinksy, Malevich, Mondrian, Tatlin, Gabo, Lissitzky and Rodchenko; something which was rare at the time in England.  The gallery has continued to represent contemporary British and international artists alongside its historical program, along with artists’ estates. \n\nIn 1990, the gallery moved to its current location at 23 Dering Street off New Bond Street in London’s Mayfair and remains under the directorship of David Juda.  The gallery presents exhibitions of its represented artists along with curated group exhibitions.",
	// 	recommended: false
	// },
	// {
	// 	id: 18,
	// 	name: "David Gill",
	// 	url: "https://www.davidgillgallery.com/exhibitions",
	// 	description: "For over 35 years, David Gill Gallery has been a pioneer in the world of collectible design and art. Founded in 1987 on the Fulham Road, Chelsea, the gallery first exhibited the works of historic masters such as Emile-Jacques Ruhlmann, Jean-Michel Frank and Line Vautrin soon adding contemporary artists, including Elizabeth Garouste and Mattia Bonetti, Grayson Perry and Donald Judd. From the outset, David Gill Gallery invigorated the London and global art scene with an original taste and perspective on art and design.\n\nThe gallery’s second location in Vauxhall in 1999 further encouraged these dynamic conversations, showing works in a custom-built space, including the now infamous ‘Yaa Hoo Town, Bunkhouse’ by Paul McCarthy. From 2012 the gallery took its place on King Street St. James’s, opening with Zaha Hadid’s now iconic Liquid Glacial series. The gallery continues to foster the talent of leading artists, architects and designers including Daniel Libeskind, Fredrikson Stallard and Chris Schanck.\n\nWorks from David Gill gallery can be found in esteemed private and public collections globally, including the Victoria & Albert Museum in London and the San Francisco Museum of Modern Art. David Gill has been honoured both with the Chevalier of the Ordre des Arts & des Lettres and as Officier of the Ordre des Arts & des Lettres. ",
	// 	recommended: false
	// },
	{
		id: 19,
		name: "Annka Kultys",
		url: "https://www.annkakultys.com/exhibitions/",
		description: "AKG is a hybrid commercial art project merging physical and digital experiences. Since its inception in 2015, the gallery has become a leading art space for artists who engage with technology, both in traditional and digital media.",
		recommended: false
	},
	{
		id: 20,
		name: "Soup",
		url: "https://www.soupldn.com/",
		description: `Soup is a contemporary art gallery in Elephant & Castle, South London, co-founded by Hector Campbell and Betty Guereta in May 2023. Soup presents ambitious exhibitions of emerging and early-career artists, across both floors of its East Street gallery space.

		Since opening, Soup has presented many artist’s debut solo exhibitions, including Alia Hamaoui, Divine Southgate-Smith, Jack Evans, Anna Clegg, Nina Silverberg, Mitch Vowles and Eleni Papazoglou. In December 2024, Soup presented Athen Kardashian & Nina Mhach Durban’s solo exhibition ‘04.) I’m Not A Girl, Not Yet A Woman⁣’ at The Shop, Sadie Coles HQ.

		Soup and its publishing partner Foolscap Editions produce a research-based micro-publication for each exhibition, featuring commissioned curatorial texts from writers such as Róisín Tapponi, Elaine ML Tam, Gwyneth Tambe-Green, Natalia González Martín, Ted Targett, Georgia Stephenson, Oluwatobiloba Ajayi and Kimi Zarate-Smith.`,
		recommended: false
	},
	// {
	// 	id: 20,
	// 	name: "Daniel Benjamin",
	// 	url: "https://www.db-gallery.com/exhibitions",
	// 	description: "Daniel Benjamin Gallery is a contemporary art gallery based in East London. Founded in 2018, the gallery supports selected living contemporary artists fulfilling their projects and helping them to get the exposure they deserve.",
	// 	recommended: false
	// },
	// {
	// 	id: 21,
	// 	name: "The Approach",
	// 	url: "https://www.theapproach.co.uk/exhibitions/upcoming",
	// 	description: "The Approach is co-directed by Jake Miller and Emma Robertson. Located in Bethnal Green above The Approach Tavern, for over twenty years it has operated an internationally recognised programme from its East London base. The gallery is known for discovering artists and establishing their careers as well as making inter-generational curated group shows a strong focus. \n\nThe list of represented artists includes the Estates of important overlooked female artists Heidi Bucher and Maria Pinińska Bereś, as well as seminal British collage artist John Stezaker, together with established and emerging artists including Magali Reus, Peter Davies, Lisa Oppenheim, Sandra Mujinga, Sara Cwynar, Sam Windett and Caitlin Keogh. \n\nOver the years the gallery has operated parallel programmes in additional gallery spaces in London’s West End (The Approach W1) and in Shoreditch (The Reliance). The gallery is currently based solely in its original East End location and continues to expand its programme, showcasing its represented artists in the main gallery space, and both represented and non-represented artists in The Annexe, a smaller, more experimental space at the back of the building.",
	// 	recommended: false
	// },
	// {
	// 	id: 23,
	// 	name: "CUBITT Gallery",
	// 	url: "https://www.cubittartists.org.uk/pages/category/current-exhibitions",
	// 	description: "Cubitt, established in 1991, is one of London's oldest and most established artist-run cooperatives. With 32 artist studios, gallery and event spaces, operating on and off site.",
	// 	recommended: false
	// },
	// {
	// 	id: 24,
	// 	name: "Cristea Roberts Gallery",
	// 	url: "https://cristearoberts.com/exhibitions/",
	// 	description: "Cristea Roberts Gallery is a leading international art gallery with a particular focus on original prints and works on paper.  Since its inception, the gallery has commissioned a significant number of editions by a wide range of artists, whilst also representing others for their unique works. The underlying ethos of the gallery has always been artist-led. It was originally founded in 1995 as the Alan Cristea Gallery and changed its name in September 2019 to Cristea Roberts Gallery. Acknowledged as one of the leading galleries in its field of speciality, the gallery's programme is dedicated to publishing, cataloguing, exhibiting and dealing in original prints and drawings by its roster of over 30 important international artists and Estates.\n\nIt participates in all the major international art fairs and has a dynamic programme of exhibitions hosted in its bespoke space in Pall Mall, London. The gallery works closely with international museums on acquisitions and loans, and examples of its editions are held in major public collections around the world including Tate, London; Metropolitan Museum of Art, New York; and Museum of Modern Art, New York. \n\nCristea Roberts Gallery is an equal opportunities employer. We believe in and are committed to ensuring equal opportunities to work and develop across the organisation are open to all. We are committed to ensuring that there is no sexual harassment or victimisation in our workplace, such behaviour in any form will not be tolerated.",
	// 	recommended: false
	// },
	// {
	// 	id: 25,
	// 	name: "Corvi Mora",
	// 	url: "https://www.corvi-mora.com/current/",
	// 	description: "Corvi-Mora is a contemporary art gallery based in Kennington, South London. The gallery represents emerging and established international artists including Turner Prize nominees Roger Hiorns and Lynette Yiadom-Boakye",
	// 	recommended: false
	// },
	// {
	// 	id: 26,
	// 	name: "Arcadia Missa",
	// 	url: "https://arcadiamissa.com/category/exhibition/",
	// 	description: "In 2015 Arcadia Missa established as a commercial gallery after running as a project space since 2011.\n\nArcadia Missa Publishers produces an annual publishing programme, composed of the journal How to Sleep Faster, artist and writer novellas, and occasional anthologies.",
	// 	recommended: false
	// },
	// {
	// 	id: 28,
	// 	name: "ASC Gallery",
	// 	url: "http://ascstudios.co.uk/events-exhibitions/gallery/",
	// 	description: "Originally established in 2010, the ASC Gallery hosts a curated programme of exhibitions, talks and creative events throughout the year. The gallery has been situated in a number of different venues over the years and is currently based at ASC’s creative hub and main office The Handbag Factory.",
	// 	recommended: false
	// },
	// {
	// 	id: 29,
	// 	name: "The Artist Room",
	// 	url: "https://theartistroom.com/",
	// 	description: "The Artist Room was founded by Milo Astaire in London in 2021. The gallery specialises in artworks and objects from twentieth-century and contemporary art, often exhibiting contemporary and historical works in dialogue within the context of a curated exhibition.\n\nIn 2023, the gallery moved into new premises in a converted townhouse at 20 Great Chapel Street in Soho. The building is also home to Plaster, a contemporary art magazine covering visual art and the world surrounding it.\n\nExhibitions at The Artist Room have received press in publications such as The Art Newspaper, Artnet, Financial Times, Frieze, ArtReview, Artsy, Ocula, 10 Magazine, HERO Magazine, The Week, Fantastic Man, Vogue Hong Kong, SHOWstudio, Astra Magazine, HypeArt, among many others.",
	// 	recommended: false
	// },
	// {
	// 	id: 30,
	// 	name: "Austin / Desmond Fine Art",
	// 	url: "https://austindesmond.com/exhibitions",
	// 	description: "Founded in 1979, Austin/Desmond Fine Art initially operated from stables near Ascot, opening their first gallery in 1986 at Sunninghill. Austin/Desmond moved to its current location in Bloomsbury in 1988.\n\nThe gallery’s primary focus over the past 30 years has been in Modern British art, promoting and exhibiting aspects of a genre that had become neglected and unfashionable. Our exhibitions and catalogues have mirrored a gradual reassessment of this period, making it an attractive option for new and more experienced collectors alike.\n\nAustin/Desmond has specialised in work associated with the St Ives group of artists, including; Ben Nicholson, Barbara Hepworth, Roger Hilton, Paul Feiler, Margaret Mellis, Terry Frost and Peter Lanyon. Selected artists who have been the subject of one-person shows are Prunella Clough, Francis Davison, Wyndham Lewis, David Jones, Keith Vaughan and Alfred Wallis. Works by Frank Auerbach, David Bomberg, Lucian Freud, Naum Gabo, Ivon Hitchens, Leon Kossoff, Bridget Riley and Graham Sutherland are exhibited on a regular basis. British Constructivist artists such as Victor Pasmore, Anthony Hill, Mary Martin and Kenneth Martin are also well represented.\n\nIn the last 10 years the gallery has participated in major European and American art fairs focusing on International Post-war art. European artists shown include Lucio Fontana, Piero Manzoni, Enrico Castellani, François Morellet and Günther Uecker. Featured American artists include Alexander Calder, Dan Flavin and Sol Lewitt.\n\nRecently the galley has formed an important collection of Concrete and Neo-Concrete art from Latin America. Artists include Hélio Oiticia, Lygia Clark, Carlos Cruz-Diez, Jesús Raphael Soto and Sergio Camargo.",
	// 	recommended: false
	// },
	// {
	// 	id: 31,
	// 	name: "COPPERFIELD",
	// 	url: "https://www.copperfieldgallery.com/exhibitions.html",
	// 	description: "Housed in an architecturally re-purposed former religious building just south of Tate Modern, Copperfield engages with emerging and established artists, focusing on concept led, multidisciplinary, multi-media practices. Diversity and sustainability have been a priority.",
	// 	recommended: false
	// },
	// {
	// 	id: 32,
	// 	name: "Cooke Latham",
	// 	url: "https://www.cookelathamgallery.com/exhibitions/",
	// 	description: "Cooke Latham Gallery launched in December 2018 in a 19th-century warehouse in London’s Battersea. The space aims to support emerging and mid-career artists. We hope to maintain a programme that continually challenges both us and our audiences and allows a forum for urgent questions both political and aesthetic to be aired.",
	// 	recommended: false
	// },
	// {
	// 	id: 33,
	// 	name: "Commonage Projects",
	// 	url: "https://www.commonageprojects.com/exhibitions/",
	// 	description: "Commonage is a project space in Bethnal Green, sharing the site with café The Common E2 and architecture studio Common Ground Workshop\n\nOur project space gallery is located in the basement, so regretfully is not fully accessible for some visitors.",
	// 	recommended: false
	// },
	// {
	// 	id: 34,
	// 	name: "COLNAGHI",
	// 	url: "https://colnaghi.com/exhibitions",
	// 	description: "Founded in 1760, Colnaghi is one of the most important commercial art galleries in the world. By the late 19th Century, the gallery had established itself in Europe and the United States as a leading dealer in Old Master paintings, prints, and drawings, selling masterpieces to the greatest collectors and museums of the Gilded Age. Today, Colnaghi offers clients expert advice and service, and an inspiring programme of exhibitions and events.\n\nBased in the heart of Mayfair in London, with galleries in New York, Brussels, and Madrid, Colnaghi organises and presents exhibitions showcasing the finest art and objects; from ancient works and Old Masters up to the 20th Century. Previous presentations have included a popup gallery space in Venice for the 58th Biennale, which provided a contemporary interpretation of the Grand Tour for the 21st Century traveller. These and numerous other exhibitions have offered collectors and the public with unique opportunities to cross-collect and enjoy masterworks from an array of diverse categories and eras.\n\nThe gallery’s leadership is helmed by Executive Director and owner Jorge Coll. Carlos A. Picón, longtime curator of Greek and Roman art at the Metropolitan Museum of Art in New York, oversees Antiquities at Colnaghi. Our international team uphold and advance the firm’s commitment to connoisseurship and cross-category collecting, as they extend the range of expertise and white glove client services for which the gallery has long been know.",
	// 	recommended: false
	// },
	// {
	// 	id: 35,
	// 	name: "Collective Ending HQ",
	// 	url: "https://www.collectivending.com/category/programme",
	// 	description: "Collective Ending is an artist-led initiative that supports emerging artists by providing them with opportunities to explore and develop their practices in ambitious and experimental settings.",
	// 	recommended: false
	// },
	// {
	// 	id: 36,
	// 	name: "Cob Gallery",
	// 	url: "http://cobgallery.com",
	// 	description: "Since it’s initial founding in 2011 as an artist-led project space and adjacent studios, Cob has committed itself to embolden and nurture multidisciplinary UK emerging talent. Cob gallery began representing artists and attending international art fairs in 2016 continuing its dedication to young or mid career artists and has since built a reputation as an early selector and nurturer of new artistic talent. \n\nCob’s core programming centres around a roster of UK-based artists whilst simultaneously inviting international practitioners to exhibit in London, often as their UK debut. Cob further supports artists with off-site projects and installations as well as editions and publications.  \n\nIn 2023, the gallery launched The Cob Award, an on site residency programme offered to two artists annually to develop their artistic practice and realise ambitious projects.\n\nCob undertakes working with all artists in good faith. The views of the artists Cob works with and exhibits do not necessarily represent Cob's. Cob is not liable for and takes no responsibility for the actions of artists that may result in legal action or dispute. ",
	// 	recommended: false
	// },
	// {
	// 	id: 37,
	// 	name: "Auto Italia",
	// 	url: "https://autoitaliasoutheast.org/projects/",
	// 	description: "Auto Italia is a non-profit visual arts institution dedicated to researching, producing and exhibiting work on the intersections of queer studies and social change.\n\nOur programme supports artists to develop critical discourse, active research and experimental projects through major commissions and process driven participation projects. This work is presented through exhibitions, performance and live work, international touring projects and creative learning activities for young people.\n\nLearning and research underpins all of our activities. We provide a unique context for artists and audiences to explore expanded ideas of community, identity and belonging, and play a sector leadership role in an international network of organisations foregrounding new approaches to artist-led institution building.\n\nAuto Italia is situated in the heart of a diverse residential neighbourhood in the London Borough of Tower Hamlets. We are active in facilitating local networks and partnerships that create new ways for audiences to engage with art, and which support children and young people to take active and empowered roles investigating contemporary issues on identity.\n\nAuto Italia is supported by Arts Council England as a National Portfolio Organisation, and Tower Hamlets Council through the Local Community Fund.",
	// 	recommended: false
	// },
	// {
	// 	id: 38,
	// 	name: "Chisenhale Gallery",
	// 	url: "https://chisenhale.org.uk/whats-on/",
	// 	description: "Chisenhale Gallery was founded by artists. The same experimental vision and spirit of possibility that changed an empty veneer factory and brewery warehouse into an art gallery guides our work today. We commission and produce contemporary art, publish books and online material, and actively engage in social projects.",
	// 	recommended: false
	// },
	// {
	// 	id: 39,
	// 	name: "Beers London",
	// 	url: "https://beerslondon.com/exhibitions/",
	// 	description: "Since 2012, BEERS London has forged an international reputation as one of London’s leading spaces for cutting-edge contemporary art. In 2021, the gallery moved to the heart of London’s regentrified Culture Mile: conveniently located within walking distance of St. Paul’s Cathedral, The Barbican, and the new Farringdon Tube Station with nearby access to the Elizabeth Line.\n \nThe gallery maintains a forward-thinking exhibition programme focusing on emerging and mid-career artists, primarily focusing on painting but also exhibiting sculpture, photography, and other media. Gallery Director Kurt Beers is the author of 100 Painters of Tomorrow (2014) and the award-winning 100 Sculptors of Tomorrow (2019), both published by Thames & Hudson.\n \nThe gallery prides itself on its internationally diverse representation, including artists heralding from Africa, Asia, South America, the United States, the United Kingdom, Europe, Australia, and Canada. The gallery frequently participates in international art fairs, as well as various endeavours and collaborations, including curating exhibitions at London’s world-renowned Saatchi Gallery. ",
	// 	recommended: false
	// },
	// {
	// 	id: 40,
	// 	name: "Chemist Gallery",
	// 	url: "http://chemistgallery.com",
	// 	description: "CHEMIST is a new South London artist-run gallery dedicated to poetic, speculative and collaborative art practices through exhibitions, workshops, sound performances and screenings.",
	// 	recommended: false
	// },
	// {
	// 	id: 41,
	// 	name: "Cell Project Space",
	// 	url: "https://www.cellprojects.org/exhibitions",
	// 	description: "Cell Project Space is a non-profit gallery and artist studios founded in 1999. The gallery was originally set up as an artist-run space and formed a registered charity, Cell Foundation, in 2014. Throughout the 24-year history of the organisation, Cell Studios has provided affordable workspace for artists, which in turn supports the gallery’s ongoing programme of exhibitions, and events. ",
	// 	recommended: false
	// },
	// {
	// 	id: 42,
	// 	name: "Cedric Bardawil",
	// 	url: "http://cedricbardawil.com",
	// 	description: "This is a series of exhibitions and stories that reflect my interest in contemporary art and music. I have ten years’ experience organising exhibitions, performances and live events, as well as researching and writing for various print publications and online platforms. In June 2022 I opened my first permanent space in London. All the photography and text is my own, unless stated.",
	// 	recommended: false
	// },
	// {
	// 	id: 43,
	// 	name: "Bartha Contemporary",
	// 	url: "https://www.barthacontemporary.com/",
	// 	description: "Bartha Contemporary was founded by Swiss-German couple Niklas and Daniela von Bartha in January 2000. The program reflects an interest in predominantly non-figurative and conceptual art by contemporary artists.",
	// 	recommended: false
	// },
	// {
	// 	id: 44,
	// 	name: "Cecilia Brunson Projects",
	// 	url: "https://www.ceciliabrunsonprojects.com/exhibitions/",
	// 	description: "Founded in London in 2013 by Cecilia Brunson, Cecilia Brunson Projects (CBP) is known for its specialist programming that increases the visibility and understanding of Latin American artists and their role in global art movements. The gallery uncovers overlooked Latin American artist’s estates and supports contemporary Latin American artists. This mission is centred around a carefully curated exhibition programme at CBP’s gallery space in Bermondsey, London. ",
	// 	recommended: false
	// },
	// {
	// 	id: 45,
	// 	name: "Castor",
	// 	url: "http://castorprojects.co.uk",
	// 	description: "Castor is a contemporary art gallery founded in 2016, now based at the historic Holy Trinity, a Grade 2 listed church on Cloudesley Square, Islington.\n\nSince inception Castor has focused on supporting emerging artists to realise ambitious presentations of their practice, often exploring social and personal narratives through sculpture, painting, video and installation. In recent years the gallery has worked with a number of estates and overlooked artists on survey exhibitions.\n\nHoly Trinity was constructed between 1827 - 29 and designed by Charles Barry, who was chief architect for the Houses of Parliament. Castor at Holy Trinity is split between two space, the more intimate South gallery alongside the cavernous East gallery with pitched roof rising to 5.5 metres at its highest point, boosting over 1000 sq ft of exhibition space and sculpture garden.\n\nCastor launched in 2016 in a basement space adjacent to Goldsmiths in New Cross with ten solo exhibitions in twelve months before operating from Resolution Way in Deptford between 2017 - 2022, where it continued to thrive within the South East London art scene. In 2022, Castor relocated to the heart of Fitzrovia, Central London where it operated until moving to its current space in April 2024.",
	// 	recommended: false
	// },
	// {
	// 	id: 46,
	// 	name: "Belmacz",
	// 	url: "https://belmacz.com/exhibitions/upcoming/",
	// 	description: "Belmacz is a contemporary art gallery and showroom based in central London.\n\nFounded by Julia Muggenburg in 2000, the gallery is devoted to collaboration, be this by supporting artists to grow their practices or by nurturing conversations. Belmacz contextualises these collaborations through renowned solo and group exhibitions as well as through expansive publishing and commissioning projects. The artists we have worked with have gone on to be awarded international accolades including Frieze Artist Award, the German Short Film Award, and the Paul Hamlyn Foundation Awards for Artists.\n\nBelmacz’s showroom is a design space displaying a selection of Muggenburg’s jewellery. Embracing numerous points of reference, Muggenburg’s jewels juxtapose the highest quality materials to create utterly unique pieces.\n\nAlluding to both Muggenburg’s founding vision for the gallery as well as her expansive design practice, ‘Belmacz’ is a composite name. Combining the male adjective ‘bel’ (from the French for beautiful), ‘maximum,’ and ‘cz’ (from the Slavic alphabet), the space’s title is a further allusion to the ground-breaking jeweller Suzanne Belperron.",
	// 	recommended: false
	// },
	// {
	// 	id: 47,
	// 	name: "CARLOS/ISHIKAWA",
	// 	url: "https://carlosishikawa.com/exhibitions/",
	// 	description: "Founded in 2011, Carlos/Ishikawa’s program is dedicated to considered and ambitious exhibitions that offer\n\ndiverse artists’ perspectives on structural, socio-cultural, and political questions. The program focuses on\n\ninternational artists with often wide-ranging, multi-disciplinary and experimental practices. There is an interest\n\nwithin the program of challenging the aesthetic conventions of conceptual art, and a focus on art that is able to\n\noperate on an affective, emotional level as well as a rigorous intellectual one. The gallery has offered many\n\nartists their first solo show, many of whom have gone on to receive recognition internationally.",
	// 	recommended: false
	// },
	// {
	// 	id: 48,
	// 	name: "Carl Kostyál | London",
	// 	url: "https://kostyal.com/location/london/",
	// 	description: "Carl Kostyál opened his eponymous gallery at no. 12a Savile Row, London W1 in 2010 with the first solo exhibition of British artist Helen Marten. The gallery has gone on to give many international artists their first platform in the UK or Sweden, among them Imre Bak, Gina Beavers, Petra Cortright, Sarah Cwynar, Alex Da Corte, Mandy El-Sayegh, Jane Euler, Claire Fontaine, Tibor Gayor, Mustafa Hulusi, Alex Israel, Sergej Jensen, Basil Kincaid, Klara Lidén, Hanna Lidén, Dóra Maurer, Adam McEwen, Oscar Murillo, David Ostrowski, Timur Si Qin, Cynthia Talmadge, Amalia Ulman, Fredrik Vaerslev, Emma Webster, Brittney Leeanne Williams and Jonas Wood.\n\nIn May 2021, after six years of staging ‘rogue’ exhibitions and hosting artist studios in spaces due for development in Stockholm and Malmö, Kostyál joined forces with the Gullringsbo Konstsamling, whose collection he had built over a fifteen-year period, to open the gallery’s new exhibition space, Hospitalet, in the 18th century former mental asylum known as Danvikens Hospital in Nacka, Stockholm, alongside a display of the Gullringsbo collection.\n\nKatharine Kostyál, Carl’s wife, former business partner of Jay Jopling at White Cube and former Curator at the South London Gallery, joined forces with her husband to co-run the gallery in late 2020. In her partnership with Jay Jopling, she identified artists whose work had been rarely seen in the UK or had been unfairly overlooked, introducing Günther Förg, Minjung Kim, Lee Seung-Taek, Dóra Maurer, Park Seo-Bo and Peter Schuyff to the gallery, researching, sourcing and curating exhibitions of their work at White Cube’s London and Hong Kong galleries.\n\nThe gallery programme is focused on emerging and mid-career artists from around the globe, showing them in London, Milan and Stockholm. The gallery spaces eschew the white cube: an18th century former townhouse in Mayfair, an 18th century former mental asylum in Stockholm and a late 19th century piano nobile apartment re-modelled in the early 1960s by the quintessential Milanese architect Luigi Caccia Dominioni. In addition to the gallery spaces, Kostyál regularly stages exhibitions in other unusual locations, most recently the Romantic castle Stora Sundby, in Sörmland, Sweden.\n\nThe gallery runs artist residencies in Milan, at Mohilef Studios in Los Angeles and in their home on Blidö, an island in the northern Stockholm archipelago.\n\nEach summer the Kostyáls host an invitational Draw Jam in the south of Italy, bringing artists together from all over the world to make art side by side and fostering new friendships and networks between them.\n\nThe gallery regularly publish artist monographs, most recently with Gina Beavers, Austin Lee, Bozó Szabolcs and Rebecca Ness.\n\nIn 2020, the gallery established a rolling Black Lives Matter Sponsorship Scheme, funding studies and providing work experience & industry connections for one student each year.",
	// 	recommended: false
	// },
	// {
	// 	id: 49,
	// 	name: "Ben Brown Fine Arts | London",
	// 	url: "https://www.benbrownfinearts.com/exhibitions/current/",
	// 	description: "In 2004, Ben Brown Fine Arts opened its first location in the heart of Mayfair, London. The gallery quickly established itself on the international art scene with exhibitions of long-term gallery artists Tony Bevan, Candida Höfer, Claude & François-Xavier Lalanne, and Heinz Mack, amongst others, as well as momentous exhibitions of 20th century masters including Alighiero Boetti, Lucio Fontana and Gerhard Richter. In 2009, Ben Brown Fine Arts opened an exhibition space in Hong Kong, becoming the first international gallery to move to the city that would soon become a major international art hub. In 2021, Ben Brown Fine Arts opened a third location in Palm Beach, Florida, with an inaugural exhibition celebrating the legacy of American and European 20th century, following with notable exhibitions of the gallery's roster of modern and contemporary artists. The galleries regularly exhibit and develop programming for our renowned stable of international, multi-disciplinarian artists, including the aforementioned as well as Yoan Capote, Awol Erizku, Vik Muniz, Nabil Nahas, José Parlá, Enoc Perez, Ena Swansea, Hank Willis Thomas, Gavin Turk and Jan Worst. The gallery is recognized for our depth of expertise and inventory in 20th century European and American art. Ben Brown Fine Arts participates in major art fairs worldwide, including Art Basel, Art Basel Hong Kong, Art Basel Miami Beach, Art Cologne, Art SG, The Armory Show, Frieze Masters, Frieze Seoul, Taipei Dangdai, TEFAF New York, and West Bund Art & Design.",
	// 	recommended: false
	// },
	// {
	// 	id: 50,
	// 	name: "Cardi Gallery",
	// 	url: "https://google.com",
	// 	description: "Cardi Gallery – originally ‘Galleria Cardi’ – was founded in Milan, Italy in April 1972 by Renato Cardi to foster the work of those modern and contemporary Italian artists that he had started to presciently collect in the late 1960s. Renato built a distinguished collection that included artists like Cy Twombly, Lucio Fontana, Piero Manzoni and many others, all relatively unknown at the time, and over the years acquired works ranging from Arte Povera to Spatialism. Thanks to both his inextinguishable passion for art and the subsequent success of Galleria Cardi, Renato earned a reputation as a critically engaged champion of developing artists, one who contributed significantly to launching many of their careers. Now led by Renato’s son Nicolo, Cardi Gallery continues to shape the cultural landscape in its hometown, Milan and since 2015 in London, its second home. It presents a regular programme of museum-quality exhibitions, each accompanied by a scholarly catalogue or an artist monograph often featuring texts by eminent international critics. Furthermore, Cardi Gallery exhibits at the top international art fairs across Asia, Europe and North America. Its presentations focus on masterworks by artists from movements such as Arte Povera, Minimalism and Zero Group, part of Cardi’s extensive Italian Modern, Post-War, and contemporary inventory. Cardi Gallery’s unique specialist expertise in Italian Modern, Post-War and Contemporary art – specifically in Arte Povera, Minimalism and Zero Group – has not only contributed to shaping significant exhibitions through its international museums’ loan programme: it has built some of the finest and most historically important private collections across Europe, the Americas and the Far East.",
	// 	recommended: false
	// },
	// {
	// 	id: 51,
	// 	name: "Ben Hunter",
	// 	url: "http://benhunter.gallery",
	// 	description: "Ben Hunter was founded in 2018. The gallery specialises in post war and contemporary art, focussing on a core group of artists across primary and secondary markets. \n\nAlongside its exhibitions, the gallery works closely with institutions and private individuals to build collections of exceptional quality paintings and sculpture. \n\nThe gallery is committed to publishing and regularly produces catalogues, monographs, and printed exhibition materials. ",
	// 	recommended: false
	// },
	// {
	// 	id: 52,
	// 	name: "Cadogan Gallery",
	// 	url: "https://cadogangallery.com/exhibitions/location/4/",
	// 	description: "Cadogan is an independent contemporary art gallery with spaces in London and Milan. For over forty years our mission has been to represent, support and curate the work of a diverse roster of emerging and established artists. We care deeply about longevity, developing the careers of our artists and the journey of our collectors.\n\nIn 1980, we opened the doors to our first gallery in South Kensington, London. In 2023, we added a new international perspective to our distinctive exhibitions programme by opening a gallery in Milan. With an artist-focussed approach and strong aesthetic identity, the new space highlights the works of artists that have evolved with us since the gallery's founding, as well as a new generation of emerging artists. \n\nCadogan Gallery is delighted to announce the opening of our new flagship space on Harriet Street and its inaugural presentation, Cadogan Gallery: A Group Exhibition. Our largest group exhibition to date will present new work by 21 of our artists. ",
	// 	recommended: false
	// },
	// {
	// 	id: 53,
	// 	name: "Blessed Foundation",
	// 	url: "https://www.blessed-foundation.org/projects",
	// 	description: "Blessed Foundation works at the intersection of art, design and emerging technologies bringing innovators from these respective fields together. We identify gaps and biases in existing knowledge and develop new work to help build sustainable and equal futures. We pursue solutions, prioritise mental health and social engagement through our research, public programme and exhibitions.",
	// 	recommended: false
	// },
	// {
	// 	id: 54,
	// 	name: "Berntson Bhattacharjee",
	// 	url: "https://www.bbgallery.art/exhibitions/",
	// 	description: "Berntson Bhattacharjee Gallery was founded in 2020 and is based in London with a satellite programme in Stockholm. In 2023, we converted what was once a car park into our permanent 2,500-square-foot space in the heart of Fitzrovia. \n\n \n\nWe are dedicated to celebrating and nurturing relationships with contemporary emerging artists, consistently prioritising their long-term aspirations. We are committed to fostering ambitious projects and maintaining a strong roster of artists whom we support during critical junctures in their careers.",
	// 	recommended: false
	// },
	// {
	// 	id: 55,
	// 	name: "Brooke Benington",
	// 	url: "https://www.brookebenington.com/exhibitions/current/",
	// 	description: "Brooke Benington was established in 2020 formed as a partnership between Directors Lily Brooke Day and George Mingozzi-Marsh after closing their respective galleries. The first two years of exhibitions were shaped by the global pandemic and the need to be flexible and innovative. Early exhibitions appeared online, and as collaboration in the UK and Europe, as well as continuing to run Contemporary Sculpture Fulmer (a commercial sculpture garden in Buckinghamshire 2017-2023). \n\nIn October 2022, Brooke Benington opened a new central London gallery space on Cleveland St in the historic area of Fitzrovia. The gallery works with UK and international artists running an interdisciplinary programme across media. Brooke Benington currently represents Viltė Fuller (London, UK), Yeni Mao (Mexico City, Mexico), Maria Szakats (Paris, France), Katie Tomlinson (Manchester, UK) and Ross Taylor (London, UK) with more artists to be announced in 2024.",
	// 	recommended: false
	// },
	// {
	// 	id: 56,
	// 	name: "Blue Shop Cottage",
	// 	url: "https://www.blueshopcottage.com/exhibitions",
	// 	description: "Ocki Magill has made it her mission to nurture emerging artists, providing a space to showcase their work to a wider audience and connect with other artists and collectors - without the stuffiness that often accompanies commercial galleries. Opening her first art space Blue Shop Cottage in Camberwell, south London in 2016, she's been working with fresh artistic talent ever since, curating sold out solo and group shows including a series of wildly popular online open calls for 'Works on Paper' exhibitions, in reaction to the pandemic. Realising there was potential for more, but limited by space, Ocki recently threw open the doors to her new larger Blue Shop Gallery nearby on Brixton Road in November 2022, christening it with an opening show by painter Jess Allen.\n\nBlue Shop Galleries is proud to have a female artist focus and has launched the careers of many including Jess Allen, Li Hei Di, Catherine Repko, Mary Herbert, Georg Wilson, Sophie Vallance-Cantor, Liorah Tchiprout, Alexis Soul-Gray, Plum Cloutman, Alice Hartley, Amy Beager, Nettle Grellier, Sarah Cunningham, Kemi Onabule, Charlie Boothright and many more.",
	// 	recommended: false
	// },
	// {
	// 	id: 57,
	// 	name: "Bernard Jacobson Gallery | London",
	// 	url: "https://www.jacobsongallery.com/exhibitions/current/",
	// 	description: "Bernard Jacobson Gallery was founded in 1969 with a focus on the publication and distribution of prints by artists including Robyn Denny, Lucian Freud, David Hockney, Leon Kossoff, Henry Moore, Richard Smith, Ed Ruscha, and William Tillyer. By the mid-1970s, having established himself as one of the major dealers in the international print boom, Jacobson started to show paintings and sculptures. After opening branches in Los Angeles and New York in the early 1980s, the gallery expanded its range of artists to include West Coast American artists such as Joe Goode and Larry Bell as well as modern British masters such as David Bomberg, Ivon Hitchens, Peter Lanyon, Ben Nicholson, William Scott, Stanley Spencer, and Graham Sutherland. From 1997, the gallery moved more firmly into American and international art and began exhibiting artists including Kenneth Noland, Jules Olitski, Larry Poons, and Frank Stella. From its location on Cork Street and subsequently Duke Street St. James's, the gallery has also held shows featuring American artists Robert Motherwell, Helen Frankenthaler, Robert Rauschenberg, Roy Lichtenstein, and Tom Wesselmann; European painters Georges Braque, Bram Bogart, Henri Matisse, and Pierre Soulages; and British artists William Tillyer, Bruce McLean, and Marc Vaux.",
	// 	recommended: false
	// },
	// {
	// 	id: 58,
	// 	name: "Browse & Darby",
	// 	url: "https://browseanddarby.co.uk/exhibitions/forthcoming/",
	// 	description: "In 1977 Lillian Browse and William Darby formed Browse & Darby, first opening on Cork Street in the space previously occupied by highly respected partnership, Roland, Browse & Delbanco who had specialised in 19th and 20th century art since the mid 1940s.\n\nIn autumn 2023, Browse & Darby opened their new gallery at 34 Bury Street in the heart of St James’s.\n\nBrowse & Darby opened in 1977 with a one-man exhibition of ten paintings by the highly acclaimed figurative painter Euan Uglow, who was represented by Browse & Darby until his death in 2000. The gallery has continued to champion figurative painting, mixing contemporary artists from the Euston Road, and Slade Schools: William Coldstream, Anthony Eyton, Patrick George, Anthony Fry, and Jeffrey Camp, with classic British and French artists, including Walter Richard Sickert, William Nicholson, Matthew Smith, Edgar Degas, Auguste Rodin, and other Post-Impressionist masters.",
	// 	recommended: false
	// },
	// {
	// 	id: 59,
	// 	name: "Bluerider ART | London",
	// 	url: "http://blueriderart.com/en/",
	// 	description: "Bluerider ART was established in 2013 in Taipei, Taiwan, by Elsa Wang, an IT entrepreneur. The gallery derives its name from Der Blaue Reiter (The Blue Rider), founded by artist Wassily Kandinsky, reflecting its commitment to the emphasis on spiritual expression in art. Bluerider ART specialises in representing and promoting internationally acclaimed artists with distinctive styles, offering a comprehensive range of high-quality collection services through a dedicated and professional team. \nThe gallery operates four strategic locations across Europe and Asia: Bluerider ART London•Mayfair, Bluerider ART Shanghai•The Bund, Bluerider ART Taipei•DunRen and Bluerider ART Taipei •RenAi. Bluerider ART is committed to fostering cross-cultural dialogue, preserving historical artistic legacies, and pioneering new paradigms in the contemporary art landscape.",
	// 	recommended: false
	// },
	// {
	// 	id: 60,
	// 	name: "Bosse & Baum",
	// 	url: "https://www.bosseandbaum.com/exhibitions/",
	// 	description: "Bosse & Baum was founded in 2014 by Alexandra Warder and Lana Churchill. The gallery occupies a unit in the post-industrial Bussey Building, in Peckham, South East London, and is expanding into online spaces. We are a commercial gallery seeking an active role in shaping art discourse by giving a platform to contemporary positions; representing an international roster of emerging artists whose work challenges dominant historical narratives and is socially engaged. We work to facilitate broader social access to art and contribute to the wider critical conversation on contemporary art through a public programme of exhibitions, talks and performances.",
	// 	recommended: false
	// },
	// {
	// 	id: 61,
	// 	name: "The Bomb Factory Art Foundation",
	// 	url: "https://www.bombfactory.org.uk/news",
	// 	description: "The Bomb Factory Art Foundation is a charitable arts organisation spanning four sites across London. We provide the public with opportunities to engage with contemporary art through a diverse range of activities, including  art exhibitions, educational workshops, film screenings, poetry evenings, music performances, talks, and other cultural events. Our commitment to fostering inclusivity and accessibility in the art world drives our extensive learning and participation programme, tailored to enriching local communities and schools.",
	// 	recommended: false
	// },
	// {
	// 	id: 62,
	// 	name: "Drawing Room",
	// 	url: "https://drawingroom.org.uk/whats-on/",
	// 	description: "Located in southeast London, our not-for-profit organisation features a gallery presenting inspiring free exhibitions of drawings, by artists of international standing and emerging promise. We have a unique open access research library, holding one of the largest collections of titles on contemporary drawing in the world, and a shop stocking selected books, drawing materials and artists’ editions. Our dynamic learning programme makes contemporary drawing relevant and accessible to our communities, encouraging self-expression through hands on making, in our dedicated Community Studio and throughout our local area. Our exhibitions, research and learning activities, together with talks, artist-led projects, special commissions and other events, nurture artistic talent through supporting the production of new work and share the diversity of drawing with an ever-widening audience. Together, this makes Drawing Room the UK & European centre for the exploration, appreciation and expression of drawing.\n\nDrawing Room was founded by curators Mary Doyle, Kate Macfarlane and Katharine Stout in 2002 and is a non-profit public organisation that champions the unlimited potential of drawing to help us understand ourselves, each other and our world, through exhibitions, learning projects and a unique library. As 90% of our income is self-generated, Drawing Room relies on the support of individuals, organisations and trusts, alongside the funding it receives from Arts Council England as a National Portfolio Organisation. We are indebted to our Drawing Circle and Drawing Room Network Members and to the many artists who donate drawings to our Biennial Fundraising exhibitions. Drawing Room is a division of Tannery Arts, which provides studio space, support and resources for artists, together forming Tannery Arts Ltd, a unique creative partnership.",
	// 	recommended: false
	// },
	// {
	// 	id: 63,
	// 	name: "Josh Lilley",
	// 	url: "https://www.joshlilley.com/exhibitions",
	// 	description: "Josh Lilley is a Contemporary Art Gallery established in London in 2009 representing emerging and mid-career artists.\n",
	// 	recommended: false
	// },
	// {
	// 	id: 64,
	// 	name: "JD Malat Gallery",
	// 	url: "https://www.jdmalat.com/exhibitions/",
	// 	description: "Since its establishment in 2017, JD Malat Gallery’s mission has been to support established and emerging artists. Specialising in contemporary art, the gallery represents over 20 international artists from a diverse range of media, from sculpture and painting to video and photography. JD Malat Gallery aims to provide a significant international audience for its artists through its wide-ranging programme and participation in art fairs across the globe and also endeavours to broaden its dialogue with artists outside of the gallery’s core programme.\n \nJD Malat Gallery is based on 30 Davies Street, London, Mayfair, W1K 4NB, and has previously showcased its programme at pop-up spaces in New York, USA and St. Moritz, Switzerland. JD Malat Gallery's second location in Dubai is on 13a Sheikh Mohammed bin Rashid Blvd - Downtown Dubai.",
	// 	recommended: false
	// },
	// {
	// 	id: 65,
	// 	name: "James Freeman Gallery",
	// 	url: "https://www.jamesfreemangallery.com/exhibitions/",
	// 	description: "James Freeman Gallery is a contemporary art gallery in Islington, London, UK.\n\nEstablished in 2003, the gallery explores contemporary approaches to historicism, presenting artists who combine current tendencies with art-historical references and research. In particular, the gallery aims to present artists who do this in a way that is both aesthetically powerful & technically accomplished. Wonderful artworks are what we look for, works that engage the eye, the heart and the mind.\n\nThe gallery programme presents a mixture of solo exhibitions and curated group shows that explore this historical focus. As well as exhibiting established artists, we often work with younger artists to give them an early platform to present and develop their practice. This discovery of young talent has been a focus of the gallery since the very beginning, and indeed the gallery has worked with many of our represented artists since their earliest stages.\n\nOver the years we have exhibited widely at both national and global level, including fairs and gallery collaborations in the USA, Europe and Asia. We continue to organise off-site shows both in the UK and abroad as a platform for our artists’ work. ",
	// 	recommended: false
	// },
	// {
	// 	id: 66,
	// 	name: "Ed Cross Gallery",
	// 	url: "https://www.edcrossfineart.com/exhibitions/",
	// 	description: "Ed Cross works with emerging and established artists across and beyond the African diaspora. The gallery seeks to stage conversations – between practitioners, international audiences and as guided by its artists – to amplify voices historically silenced, and to create space for their independent development. Since launching in 2009, Ed Cross has held exhibitions across the world: from New York to Paris, and London to Lagos, the gallery continues to build on its values of cooperation and curiosity.",
	// 	recommended: false
	// },
	// {
	// 	id: 67,
	// 	name: "jaggedart",
	// 	url: "https://www.jaggedart.com/exhibitions/",
	// 	description: "Founded in 2002,  jaggedart is renowned for its unique and very definite style, showcasing beautiful, intricate and sophisticated works of art. Our interest lies mainly in three-dimensional works made from ceramic, grasses, wood, paper, books, maps or textiles. Time is of essence to make the works, whether it is the growing of grasses, hand-cutting paper, layering, stitching, printing, giving form. The artists' knowledge of materials, their skills and craftsmanship result in poetic and organic pieces. The exhibitions in our gallery vary between themed and solo shows, but always offer an inspiring dialogue between the works.  Artists are invited to use the space in a dynamic way, creating site specific installations in the gallery and in our large shop frontage.\n\nWe showcase stimulating, organic and timeless pieces where there is an evident creative process. jaggedart appeals both to new and experienced collectors. Our clients include museums, public collections, interior designers and hotels.\n\nSince 2005, the gallery is situated off Marylebone High Street in central London, an area renowned for its individual businesses and this idea is reflected in the style of jaggedart.",
	// 	recommended: false
	// },
	// {
	// 	id: 68,
	// 	name: "IONE & MANN",
	// 	url: "https://www.ioneandmann.com/exhibitions",
	// 	description: "IONE & MANN is a London-based contemporary art gallery established in 2015.\nIndependent and female owned, artist focused and not driven by trends, the gallery is dedicated to thoughtfully curated exhibitions and championing early to mid career artists.\n\nIONE & MANN favours a personal, more considered approach to presenting, experiencing and engaging with art and artists, one that allows for long term relationships and ongoing dialogues between gallery, collectors, artists and the community.",
	// 	recommended: false
	// },
	// {
	// 	id: 69,
	// 	name: "Edel Assanti",
	// 	url: "https://edelassanti.com/exhibitions/forthcoming/",
	// 	description: "Edel Assanti was founded in 2010 by Jeremy Epstein and Charlie Fellowes. Established in London, the gallery works with international artists whose practices engage with the social, cultural or political realities of the moment in which they live. Our programme’s tendency towards interdisciplinary, research-led work demonstrates how artists are uniquely positioned to witness and distill the complex narratives that define our era.\n \nHaving been located in London’s Fitzrovia since 2014, in 2022 we opened our 4,000 square foot gallery in a renovated listed building on Little Titchfield Street. Our premises play host to a dynamic events programme in parallel to gallery exhibitions: talks, performances, screenings and live music. The gallery’s digital presence encompasses a multi-chapter series of artist video interviews, alongside short films published to accompany exhibitions.  \n \nEdel Assanti hosts a​n​ annual gallery residency, giving overseas colleagues an opportunity to present an exhibition in London. ​We also produce biannual expansive group presentations addressing subjects of cultural and societal urgency​.  \n \nIn 2021 Edel Assanti founded London Gallery Weekend (LGW), an annual celebration of London’s diverse gallery community bringing together 140 contemporary London galleries. Now in its third year, the gallery remains at LGW’s helm. Chief amongst LGW’s initiatives is an ambitious partnership with Art Fund enhancing the relationship between London’s galleries and regional museums across the UK, via a research focus group and a travel bursary scheme for regional curators.",
	// 	recommended: false
	// },
	// {
	// 	id: 70,
	// 	name: "indigo+madder",
	// 	url: "https://indigoplusmadder.com/london-art-exhibitions?category=current",
	// 	description: "Indigo+Madder is a London-based contemporary art gallery founded in 2019. The gallery presents local and international emerging artists, with a view towards generating cross-cultural discourse. ",
	// 	recommended: false
	// },
	// {
	// 	id: 71,
	// 	name: "IMT Gallery",
	// 	url: "https://imagemusictext.com/exhibitions/",
	// 	description: "For over 18 years, IMT has provided a free public programme of critical and innovative contemporary art exhibitions. We commission artists and invite independent curators to take risks and create unique audience experiences.\n\nPrevious exhibitions include: Light the lamp rarely, let the shadow come by Emma Tod; the five month online only exhibition commissioned during lockdown This is A Not-Me; Snow Crash curated by Kirsten Cooke that provided an alternative and queer infrastructure for staging collective practice; Trapped in a sticky shed with side chain compression by Benedict Drew, commissioned in collaboration with Forma; Wandering/WILDING: Blackness on the Internet, curated by Legacy Russell in homage to victims of police violence; Works from Survivor(F) by Suzanne Treister. All supported by the Arts Council England among others and reviewed in various journals, such as Art Monthly and Frieze… As well as the notably ambitious exhibition of 23 artists in Dead Fingers Talk – The Tape Experiments of William S Burroughs, curated by Mark Rohtmaa-Jackson as part of his doctoral research. For our full list of exhibitions click here",
	// 	recommended: false
	// },
	// {
	// 	id: 72,
	// 	name: "Elizabeth Xi Bauer | Exmouth Market",
	// 	url: "https://elizabethxibauer.com/exhibitions/",
	// 	description: "Founded in 2015, Elizabeth Xi Bauer began as an innovative online platform accompanied by pop-up exhibitions. In 2021, as the UK was exiting lockdown restrictions, the gallery took on the challenge to open a permanent space in South-East London. Since then, as well as an exhibition programme, Elizabeth Xi Bauer has collaborated on projects with international institutions, curators, and artists across various cities, such as São Paulo, Amsterdam, Brussels, and Lisbon.\n\nIn 2025, to mark its tenth anniversary, Elizabeth Xi Bauer opened a second gallery space in London’s vibrant Exmouth Market, in Clerkenwell. Expanding from its original home in Deptford, this new location furthered the gallery’s mission to foster cutting-edge contemporary art and support both emerging and established artists on a global stage.\n\nElizabeth Xi Bauer Deptford offers a residency programme, for both national and international artists to develop their practice. The studio offers artists the opportunity to work in proximity to where their art will later be exhibited, giving them creative freedom to experiment with new materials and ideas.",
	// 	recommended: false
	// },
	// {
	// 	id: 73,
	// 	name: "Ilenia",
	// 	url: "https://ilenia.co.uk/exhibitions/",
	// 	description: "Ilenia is a London-based gallery exhibiting international contemporary artists\n\nThe gallery was founded in October 2023 with a space on the first floor of 1A Old Nichol Street, a former industrial building around the corner from Arnold Circus, East London. The gallery's focus is to present ambitious exhibitions of emerging and mid-career artists, many of whom have not yet been exhibited in the UK, alongside a program of live events related to the exhibitions, and artists' publications. Ilenia is a member of the Gallery Climate Coalition.",
	// 	recommended: false
	// },
	// {
	// 	id: 74,
	// 	name: "Elizabeth Xi Bauer, Deptford",
	// 	url: "https://elizabethxibauer.com/location/deptford/?scroll=0",
	// 	description: "Founded in 2015, Elizabeth Xi Bauer began as an innovative online platform accompanied by pop-up exhibitions. In 2021, as the UK was exiting lockdown restrictions, the gallery took on the challenge to open a permanent space in South-East London. Since then, as well as an exhibition programme, Elizabeth Xi Bauer has collaborated on projects with international institutions, curators, and artists across various cities, such as São Paulo, Amsterdam, Brussels, and Lisbon.\n\nIn 2025, to mark its tenth anniversary, Elizabeth Xi Bauer opened a second gallery space in London’s vibrant Exmouth Market, in Clerkenwell. Expanding from its original home in Deptford, this new location furthered the gallery’s mission to foster cutting-edge contemporary art and support both emerging and established artists on a global stage.\n\nElizabeth Xi Bauer Deptford offers a residency programme, for both national and international artists to develop their practice. The studio offers artists the opportunity to work in proximity to where their art will later be exhibited, giving them creative freedom to experiment with new materials and ideas.",
	// 	recommended: false
	// },
	// {
	// 	id: 75,
	// 	name: "IKLECTIK",
	// 	url: "https://iklectik.org/#whats_on",
	// 	description: "Founded in 2014, IKLECTIK is a nonprofit creative organisation based in London.\n\nWe focus on experimentation within sound, art, new media, emerging technologies and cross disciplinary works. Our research initiatives and collaborations with academic institutions inform our curation and event selection. Through this, we explore processes and techniques whilst addressing social, political and cultural issues.\n\nOur dynamic programme spans sound and music events, workshops, residencies, talks, panel discussions, installation work, film screenings and readings aiming to catalyse education, growth and transformation within our community both in-person and online. \n\nOver the last 10 years we’ve hosted live performances from over 3000 emerging and established international artists across 1600+ live shows, 21 festivals and 23 fundraisers.\n\nIKLECTIK is a non-profit community interest company (CIC) since 2018.",
	// 	recommended: false
	// },
	// {
	// 	id: 76,
	// 	name: "Huxley-Parlour | Maddox Street",
	// 	url: "https://huxleyparlour.com/exhibitions/",
	// 	description: "Huxley-Parlour, founded in 2010, specialises in postwar and contemporary painting and photography, representing a select group of distinguished international artists and estates.",
	// 	recommended: false
	// },
	// {
	// 	id: 77,
	// 	name: "Erskine, Hall & Coe Ltd.",
	// 	url: "https://ehc.art/exhibitions",
	// 	description: "Erskine, Hall & Coe was founded in 2011. We specialise in Contemporary and 20th Century Ceramics, but also explore the interplay between ceramics and two dimensional art. We carry an extensive stock of works by classic artists including Hans Coper, Ruth Duckworth, Gwyn Hanssen Pigott, Lucie Rie, James Tower and Gertrud Vasegaard as well as the best of contemporary artists such as Yo Akiyama, Gordon Baldwin, Karen Bennicke, Claudi Casanovas, Sara Flynn, Genta Ishizuka, Jennifer Lee and Shozo Michikawa.",
	// 	recommended: false
	// },
	// {
	// 	id: 78,
	// 	name: "Huxley-Parlour | Swallow Street",
	// 	url: "https://huxleyparlour.com/exhibitions/",
	// 	description: "Huxley-Parlour, founded in 2010, specialises in postwar and contemporary painting and photography, representing a select group of distinguished international artists and estates.",
	// 	recommended: false
	// },
	// {
	// 	id: 79,
	// 	name: "The Horse Hospital",
	// 	url: "https://www.thehorsehospital.com/whats-on",
	// 	description: "The Horse Hospital is a three tiered progressive arts venue in London providing an encompassing umbrella for the related media of art, film, fashion, literature and music.\nIt provides a unique and distinctive arts and artist-led environment in which the arts can flourish for the benefit of local residents, tourists, visitors and practitioners.\n\nAs the only independent arts venue of its type in the UK, there is both a duty to aim for the broadest possible access to the arts across a broad range of artistic activity and practice and an opportunity to encourage risk, innovation and experimentation.\n\nThe building, its exhibitions and events, attract over 5000 visitors per year. Twenty-five years on and with a huge archive of rare films and access to a definitive wealth of underground artists, performance artists, filmmakers, alternative musicians, photographers, fashion designers and writers who participate in its success, The Horse Hospital is now firmly established in the London arts and fashion industries.\n\nPrestigious organisations such as the BFI, the Hayward Gallery, the Victoria & Albert Museum, the Barbican Centre, the Shishedo Gallery in Tokyo and the Brooklyn Museum of Modern Art in New York have all worked in conjunction with The Contemporary Wardrobe, The Chamber of Pop Culture and kinoKULTURE over the years giving the Horse Hospital international recognition.",
	// 	recommended: false
	// },
	// {
	// 	id: 80,
	// 	name: "Holtermann Fine Art",
	// 	url: "https://www.holtermannfineart.com/exhibitions",
	// 	description: "Holtermann Fine Art, founded by Marianne Holtermann in 1984, is a dealership and consultancy in post-war and contemporary art. With over thirty years’ experience in the international art world we have expertise in working with artists, collectors and museums world-wide.\n\nWe collaborate with artists on museum exhibitions and high profile projects and have developed important permanent and site-specific works with artists such as Claes Oldenburg, Tony Cragg, and Tony Oursler.\n\nWe work with dedicated collectors on developing collections in contemporary art where our long involvement allows privileged access and first hand opportunities to acquire both established and younger artists’ work.",
	// 	recommended: false
	// },
	// {
	// 	id: 81,
	// 	name: "Estorick Collection of Modern Italian Art",
	// 	url: "https://www.estorickcollection.com/exhibitions",
	// 	description: "The Estorick Collection brings together some of the finest and most important works created by Italian artists during the first half of the twentieth century, and is Britain’s only museum devoted to modern Italian art.\n\nIt is perhaps best known for its outstanding core of Futurist works. Founded in 1909 by the poet F. T. Marinetti, Futurism was Italy’s most significant contribution to twentieth-century European culture. Marinetti wanted to break with the oppressive weight of Italy’s cultural heritage and develop an aesthetic based on modern life and technology, particularly speed and the machine. His impassioned polemic immediately attracted the support of the young Milanese painters Umberto Boccioni, Carlo Carrà and Luigi Russolo, who wanted to extend Marinetti’s ideas to the visual arts. They were joined by the painters Gino Severini and Giacomo Balla, and together these artists represented Futurism’s first phase. The acknowledged Futurist masterpieces of the Collection are drawn from this pioneering period (1909-16) and include Boccioni’s Modern Idol, Carrà’s Leaving the Theatre, Russolo’s Music, Severini’s The Boulevard and Balla’s The Hand of the Violinist.\n\nHowever, many other artists whose work features in the Collection were not associated with this movement at all. These include Amedeo Modigliani – famous for his graceful, elongated portraits and figure studies – who is represented by a fine series of drawings and the late oil portrait of Dr François Brabander. Giorgio de Chirico, the founder of Metaphysical Art, whose enigmatic, dreamlike imagery was to exert a profound influence on the Surrealists, is represented by the important early work The Revolt of the Sage.\n\nIn addition, there is a large number of paintings and drawings by Mario Sironi and Massimo Campigli. Sironi was briefly affiliated with Futurism, but in the 1920s went on to become the leading artist of the Novecento movement during the Fascist era. Campigli’s painting was strongly influenced by Etruscan art. His painterly vision and friendship with Estorick means that his works hold a special place in the Collection, as do those of Zoran Music, whose atmospheric landscapes were inspired by his travels in Italy and Dalmatia. Estorick also knew Giorgio Morandi, and the museum owns a remarkable series of etchings and drawings that span the artist’s entire career.\n\nA number of sculptors are also represented in the Collection, including Medardo Rosso, whose wax and plaster sculpture Impressions of the Boulevard: Woman with a Veil (1893) is the earliest work on display. On the death of Rodin in 1917, Rosso was hailed as ‘the greatest living sculptor’ by the French writer and critic Apollinaire. The collection also contains works by Emilio Greco, Giacomo Manzù and Marino Marini, the latter two artists being credited with bringing about the rebirth of Italian sculpture in the twentieth century.",
	// 	recommended: false
	// },
	// {
	// 	id: 82,
	// 	name: "Hollybush Gardens",
	// 	url: "https://hollybushgardens.co.uk/exhbitions/",
	// 	description: "Hollybush Gardens was founded in 2005 by Lisa Panting and Malin Ståhl.\n\nThe gallery occupies a building in Clerkenwell, London and supports an international array of artists. Representing diverse voices and disciplines, Hollybush Gardens remains committed to sustaining the complexity of progressive practices, contributing to the production of related discourse as well as offsite projects and events. Hollybush Gardens' critical engagement includes an experimental curatorial programme, affirming the generative potential of the gallery space and the diversity of artistic practice. Alongside the exhibition programme, Hollybush Gardens produces exhibition publications, online content, talks, performances and events.\n\nGallery artists are represented in a broad range of private and museum collections worldwide and have participated in many prizes such as the Turner Prize (Lubaina Himid, Charlie Prodger, Andrea Büttner, Claudette Johnson, Jasleen Kaur), ars viva Prize for Visual Arts (Jumana Manna), Prix de Rome (Falke Pisano), Jarman Award (Kirshner & Panos, Charlie Prodger, Claire Hooper), Swiss Art Awards (Reto Pulfer), MaxMara Prize for Women (Andrea Büttner) amongst others.\n\nWe support artists by establishing their practices within new international contexts through leading curatorial programmes, and working with eminent museum and private collections.\n\n",
	// 	recommended: false
	// },
	// {
	// 	id: 83,
	// 	name: "HOFA Gallery",
	// 	url: "https://thehouseoffineart.com/exhibitions/",
	// 	description: "HOFA Gallery (House of Fine Art) specialises in contemporary and new media art by established and emerging international artists. HOFA is determined to feature a multitude of artistic disciplines with a focus on exceptional talent and cultural relevance.\n\nFounded in 2012, HOFA Gallery represents contemporary painters, sculptors, photographers and multidisciplinary new media artists from all over the world including China, Korea, United States, Italy, France, Argentina and Australia amongst many others. Since its inception, HOFA has provided government institutions, museums, art galleries and private collectors access to some of the most sought-after works of art.\n\nSince 2018 the gallery expanded its reach beyond the contemporary art programme, curating a series of highly acclaimed new media public art installations and immersive exhibitions; growing the artist portfolio in the generative Ai space, exploring the relationship between human and machine collaboration and its interaction with nature.",
	// 	recommended: false
	// },
	// {
	// 	id: 84,
	// 	name: "Herald St | 43 Museum Street",
	// 	url: "https://heraldst.com",
	// 	description: "Herald St was established in 2005 by Ash L’ange and Nicky Verber. With two spaces across London, Herald St represents twenty-seven international artists and regularly participates in Art Fairs including Art Basel, Art Basel Miami Beach, Art Basel Hong Kong, Frieze London amongst others. Works by Herald St artists are held in many museum collections, and are regularly included in exhibitions within public institutions.",
	// 	recommended: false
	// },
	// {
	// 	id: 86,
	// 	name: "FILET",
	// 	url: "https://www.filetfilet.uk/index.html",
	// 	description: "FILET is a space for experimental art production founded by Rut Blees Luxemburg and Uta Kögelsberger. Based in London in close proximity to the 'digital roundabout', FILET is a physical research organ that provides a platform for the production, dissemination and discourse of contemporary art. ",
	// 	recommended: false
	// },
	// {
	// 	id: 87,
	// 	name: "Herald St",
	// 	url: "https://heraldst.com",
	// 	description: "Herald St was established in 2005 by Ash L’ange and Nicky Verber. With two spaces across London, Herald St represents twenty-seven international artists and regularly participates in Art Fairs including Art Basel, Art Basel Miami Beach, Art Basel Hong Kong, Frieze London amongst others. Works by Herald St artists are held in many museum collections, and are regularly included in exhibitions within public institutions.",
	// 	recommended: false
	// },
	// {
	// 	id: 88,
	// 	name: "Helly Nahmad",
	// 	url: "https://hellynahmad.com",
	// 	description: "The Helly Nahmad Gallery is a leading commercial art gallery located in London at 8 St James' Square. Its extensive collection includes works ranging from the Impressionists to Modern Masters: including Pablo Picasso, Wassily Kandinsky, Fernand Léger, Henri Matisse, Claude Monet, René Magritte, and Joan Miró, among others. Helly Nahmad Gallery was established in 1998 and has curated exhibitions and retrospectives including Henri Matisse: Rêve De Bonheur, Max Ernst, Picasso: La Californie, Joan Miró: A Retrospective and Claude Monet. These exhibitions included major loans from various international museums including Tate Modern and the Kunsthaus Zurich.",
	// 	recommended: false
	// },
	// {
	// 	id: 89,
	// 	name: "Hazlitt Holland-Hibbert",
	// 	url: "https://hh-h.com/exhibitions/",
	// 	description: "Formed in 2002, Hazlitt Holland-Hibbert is an independent association between Hazlitt, the long-established London gallery, and James Holland-Hibbert. The gallery holds an extensive stock of paintings, drawings and sculpture by Modern and Contemporary British artists of international renown.\n\nSince its establishment Hazlitt Holland-Hibbert has held numerous museum-quality exhibitions with works borrowed from public and private collections, including: Lucian­ Freud – Early Works 1940-58; Barbara Hepworth | Ben Nicholson: Sculpture & Painting in the 1930s; Gerald Laing: Space, Speed, Sex; and David Hockney – The Complete Early Etchings 1961-64.­\n\n For over a decade Hazlitt Holland-Hibbert has fostered a close relationship with the artist Bridget Riley, organising the seminal exhibition ‘Bridget Riley: Works 1960-1966’ dedicated to her monochrome work of the 1960s. In 2019, the gallery announced its representation of the estates of Patrick Heron (1920-1999), Eduardo Paolozzi (1924-2005) and Richard Smith (1931-2016), and having worked closely with artists’ families and foundations in the past, looks forward to announcing further partnerships in the future.",
	// 	recommended: false
	// },
	// {
	// 	id: 90,
	// 	name: "Hauser & Wirth | London",
	// 	url: "https://www.hauserwirth.com/hauser-wirth-exhibitions/?date=forthcoming&location=10056-hauser-wirth-london",
	// 	description: "Hauser & Wirth opened its first London gallery in 2003, based in a historic, listed building designed by Sir Edwin Lutyens in 1922 on Piccadilly. The first exhibition was a major installation by Paul McCarthy.\n\nIn October 2010, Hauser & Wirth London opened in its current location at 23 Savile Row with the critically-acclaimed exhibition, ‘Louise Bourgeois. The Fabric Works.’ The gallery has two exhibition spaces, the North Gallery and the South Gallery, and runs a range of engaging events such as artist talks, film screenings and workshops, alongside its dynamic exhibition program. \n\nHauser & Wirth London is home to a bookshop that offers an extensive collection of books published by Hauser & Wirth, consisting of monographs, artists’ books, historic exhibition catalogues, collections of artists’ writings and catalogues raisonnés. The shop also features a selection of prints from Hauser & Wirth Editions which relate to the current exhibition.",
	// 	recommended: false
	// },
	// {
	// 	id: 91,
	// 	name: "Hannah Barry",
	// 	url: "https://hannahbarry.com",
	// 	description: "Hannah Barry Gallery’s programme is committed to emerging practice and focuses on realising ambitious solo exhibitions by represented artists in the gallery and internationally. Hannah Barry Gallery is committed to artists and exhibitions that value experimentation and risk, discussion and debate.\n\nThe gallery continues to operate according to the principles on which it was started: dedicated above all, to the progress of artists and their ideas, to develop a language and build a network of support around their work, and to bring the work to the widest possible audiences and range of institutions; including V&A, Venice Biennale, Hayward Gallery, Yorkshire Sculpture Park, Modern Art Oxford, Cartier Foundation, amongst others. Current represented artists work with installation, performance, poetry, painting and sculpture.\n\nIn 2007, Hannah Barry initiated Bold Tendencies, a not-for-profit organisation that commissions site-specific art (105 commissions since 2007) and new architecture and produces an ambitious live events programme of orchestral music, opera, dance and literature. Bold Tendencies has run for 12 summer seasons in London. Hannah Barry is also on the board of Artangel.",
	// 	recommended: false
	// },
	// {
	// 	id: 92,
	// 	name: "greengrassi",
	// 	url: "https://www.greengrassi.com/artists-shows/",
	// 	description: "greengrassi opened in 1997 in London on Fitzroy Street, in 2004 it moved to a larger premises in Kennington. The gallery represents a diverse list of artists working in a variety of media. The gallery works directly with its artists and supports them in all aspects and at all stages of their career.",
	// 	recommended: false
	// },
	// {
	// 	id: 93,
	// 	name: "Hales Gallery",
	// 	url: "https://halesgallery.com/exhibitions/location/1/",
	// 	description: "Founded by Paul Hedge and Paul Maslin over 30 years ago, Hales opened in 1992 as a contemporary art space in Deptford, South London. In 2004 the gallery moved to the Tea Building, a dynamic and creative hub in London's East End on the border of Shoreditch and the business district. In February 2016 Hales opened a by-appointment office and viewing room in New York's Lower East side district, which as of September 2017 became the 'Hales Project Room', a space dedicated to hosting focused exhibitions that highlight specific artist projects and dialogues. In October 2018, Hales opened a primary New York location in Chelsea, Manhattan - continuing the gallery's meaningful commitment to North America. Complementing the gallery's presence in London, Hales New York is committed to offering its international roster of artists a greater platform to showcase their work, as well as welcoming new figures to the programme.\n \nSince its formation, Hales has formed an important environment for the development and distribution of artworks and ideas. At the core of the gallery's principles is the fostering of emerging talents alongside historically significant figures. The gallery prides itself on consistently and attentively supporting its artist's careers, as well as its work to stimulate important re-evaluations of the careers of 20th and 21st century artists. \n \nHales regularly places its artists' works in the collections of the world's most significant private and public collections and works closely with respected curators in doing this. Some examples of the museum collections which have acquired works by Hales artists include Tate, London; Victoria & Albert Museum, London; The Whitney Museum of American Art, NY; Museum of Modern Art, NY; The Metropolitan Museum of Art, NY; and the Brooklyn Museum, NY. Hales is a founding member of the The Society of London Art Dealers (SLAD) and a member of the Art Dealers Association of America (ADAA).",
	// 	recommended: false
	// },
	// {
	// 	id: 94,
	// 	name: "Halcyon Gallery",
	// 	url: "https://halcyongallery.com",
	// 	description: "Founded in 1982 by Paul Green in Birmingham, UK, Halcyon has championed emerging and established international artists who display exceptional talent, technical skill and intrinsic creativity. From the first gallery at Birmingham New Street Station to Bond Street today, Halcyon curates a competitive, annual modern art programme including large-scale public installations and important museum-scale exhibitions within the UK and worldwide. ",
	// 	recommended: false
	// },
	// {
	// 	id: 95,
	// 	name: "HackelBury Fine Art",
	// 	url: "https://hackelbury.co.uk/exhibitions/",
	// 	description: "HackelBury was founded over twenty-five years ago by Marcus Bury and Sascha Hackel. We are committed to championing artists working with the visual arts who push the boundaries of their medium to create meaningful and contemplative work.\n\nThe London-based gallery initially showcased classic photography from the 20th century, including Henri Cartier-Bresson, Berenice Abbott, and Malick Sidibe. The transition from traditional photography to more conceptual work was as intuitive as it was organic, beginning with artists such as Pascal Kern, Doug and Mike Starn, Garry Fabian Miller, Katja Liebmann, Ian McKeever, Stephen Inggs and Bill Armstrong. In recent years the gallery has also taken on emerging artists such as Oli Kellett, Nadezda Nikolova and Alys Tomlinson.\n\nEach artist, whether emerging or established, creates work defined by a depth of thought and consistency of approach. The small group of artists with whom HackelBury work represent a diversity of practice yet share an artistic integrity which we are fully committed to supporting in the long term.",
	// 	recommended: false
	// },
	// {
	// 	id: 96,
	// 	name: "Five Years Gallery",
	// 	url: "http://www.fiveyears.org.uk/index.html",
	// 	description: "Five Years consists of a membership of twelve contributors, each of whom may present two exhibition projects in the gallery every 18 months. Each contributor can choose to include their own work in one of these slots if they wish, but the other show must be purely invitational. Aside from these basic rules, each member acts autonomously of the others in deciding the nature and content of their contributions to Five Years’ exhibition programme. The creative freedom that this structure allows operates like an engine, generating a continuous, rapid succession of new projects and continuously branching out into unpredictable territory, beyond the control of any individual directorship.\n\nFive Years is an artist-run organisation. Founded in 1998, Five Years’ initial aim was to set up a gallery which was artist-run and where programming would maintain a direct relationship to practice. Five Years continues to develop this aim of maintaining close links between the production and exhibition of work, and the discourse which informs it.",
	// 	recommended: false
	// },
	// {
	// 	id: 97,
	// 	name: "Grosvenor Gallery",
	// 	url: "grosvenorgallery.com",
	// 	description: "Grosvenor Gallery was first established by the American sociologist and writer Eric Estorick (1913-1993) who began to collect works of art when he came to live in England after the Second World War. Estorick moved to England in 1947 after his marriage to Salome Dessau. In the initial years, the couple developed a major collection of Italian art, which at one time was considered the most important collection of Italian art outside Italy. It was then that Estorick became a full time art dealer and went on to establish the Grosvenor Gallery in 1960, with its first premise on Davies Street. It was the largest and best equipped gallery in England at the time. The old Grosvenor Gallery that specialized in the Pre-Raphaelites had closed in 1906. \n\nGrosvenor Gallery went on to exhibit some of the major European artists of the time - some for the first time in London such as Magritte, Picasso, Sironi, Chagall, Lissitzky and Archipenko.  Grosvenor Gallery also represented an impressive group of young artists such as Michael Ayrton, Jack Smith, Prunella Clough, John Hoskin and Karl Weschke. Estorick also added the already well-known artists Francis Newton Souza and Paul Feiler.\n\nApart from Western European art, the Gallery was the principal outlet in the West for modern art from Eastern Europe. It also sold works by living Soviet artists, which was a major accomplishment for a Western gallery. Furthermore Estorick championed several South African artists notably Irma Stern, Feni Dumile and Sydney Kumalo.\n\nIn 2006, Grosvenor Gallery collaborated with Vadehra Art Gallery in New Delhi to form Grosvenor Vadehra. The purpose of this collaboration was to promote international art in India and Indian art in the UK. In this guise it has held international exhibitions in India including a Pablo Picasso exhibition in 2006 and a highly acclaimed exhibition of Lucien Freud and Francis Bacon along with Tyeb Mehta and Francis Newton Souza in 2007.\n\nThe artist Francis Newton Souza has been a focus for the gallery, his first show being The Human and the Divine Predicament (1964), followed by Black Art and Other Paintings (1966) followed by shows in 1998, 2001, 2002, 2005 at the Tate Britain in London and 2 shows in New York in 2005 and 2008.\n\nSince then the Gallery has continued to exhibit modern and contemporary art from Inida, Pakistan and Sri Lanka, predominantly the work of mid-20th century modernists such as the Bombay Progressives, the 43 Group, as well as Abdur Rahman Chughtai, Ismail Gulgee and Syed Sadequain from Pakistan.\n\n Our contemporary program includes exhibitions of work by Rasheed Araeen, Faiza Butt, Olivia Fraser and Dhruva Mistry amongst others.\n\nThe gallery is owned and run by Conor Macklin and Charles Moore. Going forward Grosvenor Gallery will continue to focus on showing the best modern and contemporary Art from South Asia from our premises at 35 Bury Street.",
	// 	recommended: false
	// },
	// {
	// 	id: 98,
	// 	name: "GRIMM",
	// 	url: "https://grimmgallery.com",
	// 	description: "GRIMM represents over thirty international artists with locations in Amsterdam (NL), New York (US) and London (UK). Since its establishment in 2005, it has been the gallery’s mission to represent and support the work of emerging and mid-career artists.    ",
	// 	recommended: false
	// },
	// {
	// 	id: 99,
	// 	name: "Flat Time House",
	// 	url: "https://flattimeho.org.uk/exhibitions/",
	// 	description: "Flat Time House (FTHo) was the studio home of John Latham (1921-2006), recognised as one of the most significant and influential British post-war artists. In 2003, Latham declared the house a living sculpture, naming it FTHo after his theory of time, ‘Flat Time’. Until his death, Latham opened his door to anyone interested in thinking about art. It is in this spirit that Flat Time House opened in 2008 as a gallery with a programme of exhibitions and events exploring the artist's practice, his theoretical ideas and their continued relevance. It also provides a centre for alternative learning, which includes the John Latham archive, and an artist's residency space. ",
	// 	recommended: false
	// },
	// {
	// 	id: 100,
	// 	name: "Goldsmiths Centre for Contemporary Art",
	// 	url: "https://goldsmithscca.art/exhibitions/",
	// 	description: "Located on the campus of Goldsmiths, University of London, Goldsmiths Centre for Contemporary Art is open to everyone. Hosting world-class exhibitions by international artists, and providing a space for established and emergent practices, the institution aims to enhance Goldsmiths’ reputation for excellence and innovation in the arts. The exhibition programme has been devised to encompass a wide-range of exhibition-making, including new commissions, historical presentations, survey exhibitions, and long-term research projects. These are in dialogue with the spaces that make up the institution, ranging from top lit white cubes to a converted iron-lined Victorian water tank.\n\nThe institution’s modes of address are responsive to a diverse range of audiences, through community engagement, educational projects, publications, an online journal, and roving public programme. The latter will be hosted in the Oak Foundation Gallery; a double height space set in the centre of the building. Punctured by apertures from other galleries, it spatially emphasises a porosity between artistic practice and theory. Hosting talks, performances, screenings and other events related to the wider exhibition programme, alongside a series of shorter-term exhibitions, this space is the discursive heart of the institution.\n\nA Grade II listed building, designed by Turner Prize winners Assemble, CCA totals just under 1000m², with 700m² of gallery space, and was formerly a Victorian bathhouse. As an academic space on campus, and physically adjoining the Art Department’s studio spaces, CCA will engage with the student population of Goldsmiths University and draw on the research excellence of the college, creating a feedback loop between emergent and established practices, and academia. CCA reaches out beyond the university through staging a series of exhibitions and events with multiple entry points, appealing to inhabitants of Lewisham, London, and internationally.",
	// 	recommended: false
	// },
	// {
	// 	id: 101,
	// 	name: "Flowers | Cork Street",
	// 	url: "https://www.flowersgallery.com/exhibitions/",
	// 	description: "Since 1970 Flowers Gallery has represented international contemporary artists and estates, working with a wide range of media. Over the past five decades the gallery has presented more than 900 exhibitions across its global locations, also supporting the production of editions and publications, and installations at art fairs, public galleries, museums and institutions around the world. \n\nThe gallery programme includes regular major survey shows and renowned recurring London exhibitions such as Artist of the Day and Small is Beautiful, which have formed significant platforms for emerging artists.",
	// 	recommended: false
	// },
	// {
	// 	id: 102,
	// 	name: "Ginny on Frederick",
	// 	url: "ginnyonfrederick.com",
	// 	description: "Ginny on Frederick is a gallery in London’s Smithfield Market, founded in 2020. It’s named after founder Freddie Powell’s mother, and the street where the first branch opened on Frederick Terrace, in Hackney.",
	// 	recommended: false
	// },
	// {
	// 	id: 103,
	// 	name: "Flowers | Kingsland Road",
	// 	url: "https://www.flowersgallery.com/exhibitions/",
	// 	description: "Since 1970 Flowers Gallery has represented international contemporary artists and estates, working with a wide range of media. Over the past five decades the gallery has presented more than 900 exhibitions across its global locations, also supporting the production of editions and publications, and installations at art fairs, public galleries, museums and institutions around the world. \n\nThe gallery programme includes regular major survey shows and renowned recurring London exhibitions such as Artist of the Day and Small is Beautiful, which have formed significant platforms for emerging artists.",
	// 	recommended: false
	// },
	// {
	// 	id: 104,
	// 	name: "Gillian Jason Gallery",
	// 	url: "https://gillianjason.com",
	// 	description: "Gillian Jason Gallery works with female-identifying artists from across the generations to present engaging exhibitions about the most resonant ideas of our time. A combination of attuned cultural consciousness, people-first relationships, and a 40-year history of exhibiting work by pioneering artists, makes GJG a go-to reference point for those looking to support and collect art from beyond the white male canon that addresses today’s critical shifts.",
	// 	recommended: false
	// },
	// {
	// 	id: 105,
	// 	name: "Gerald Moore Gallery",
	// 	url: "https://geraldmooregallery.org/exhibitions/",
	// 	description: "Nestled within the premises of Eltham College stands the Gerald Moore Gallery, a vibrant hub dedicated to contemporary art.\n\nSince its inception in 2012, this modern two-storey gallery has been a beacon of collaborative practice and shared learning. Embodying a spirit of liberation and encouragement, it provides a nurturing environment where individuals of all ages can explore what art can be. Supported by a team of talented professionals, the gallery offers guidance to children, young people, and adults, fostering a deeper understanding of the diverse expressions that art encompasses. By emphasising the significance of art in educational settings and beyond, the Gerald Moore Gallery advocates for the invaluable role art plays in our lives, promoting collaborative learning experiences.\n\nThe gallery stands as an invaluable resource for the local community. It regularly hosts a diverse range of exhibitions and events featuring artwork and sculptures, inviting the public to immerse themselves in the dynamic world of contemporary art. These exhibitions serve as engaging platforms that celebrate creativity, allowing visitors to engage with and appreciate the spectrum of artistic expressions.",
	// 	recommended: false
	// },
	// {
	// 	id: 106,
	// 	name: "Gazelli Art House",
	// 	url: "https://gazelliarthouse.com/exhibitions/location/london/",
	// 	description: "Founded in 2010 by Mila Askarova, Gazelli Art House, London champions international artists at the height of their practice through exhibitions, events, and art fairs.\n\n Along with its sister site in Baku, Gazelli Art House specialises in promoting art from Azerbaijan and its neighbours to introduce a greater understanding of the rich linguistic, religious and historical ties that connect these areas to international audiences.\n\n In 2015, the gallery further expanded to support artists working in digital art through online platform GAZELL.iO, comprising: an online Residency programme, NFT drops and collaborations, a dedicated Project Space holding monthly exhibitions, and a permanently installed VR Library.",
	// 	recommended: false
	// }
]

		// Insert gallery items
		const galleryMap: Record<string, number> = {}; // To track generated IDs

		for (const item of galleryData) {
			const result = await db
				.insert(gallery)
				.values({
					created_at: new Date(),
					name: item.name,
					url: item.url,
					description: item.description,
					recommended: item.recommended,
				} satisfies NewGallery)
				.returning({ id: gallery.id });

			// Store the mapping from the original ID to the generated one
			galleryMap[item.id] = result[0].id;
			console.log(`Mapped ${item.id} to actual ID: ${result[0].id}`);

			console.log(`Added gallery item: ${item.name}`);
		}

		// Sample artists data
		const artistsData = [
			{
				id: "artist-1",
				name: "Jane Smith",
				instagram_handle: "@janesmith_art",
			},
			{
				id: "artist-2",
				name: "John Doe",
				instagram_handle: "@johndoe_creates",
			},
			{
				id: "artist-3",
				name: "Alex Johnson",
				instagram_handle: "@alexj_artist",
			},
			{
				id: "artist-4",
				name: "Maria Garcia",
				instagram_handle: "@maria_garcia_art",
			},
			{
				id: "artist-5",
				name: "David Kim",
				instagram_handle: "@david_kim_studio",
			},
		];
		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error inserting data:", error);
		throw error;
	} finally {
		process.exit(0);
	}
}

// Run the seed function
seed().catch((e) => {
	console.error("Error seeding database:", e);
	process.exit(1);
});
