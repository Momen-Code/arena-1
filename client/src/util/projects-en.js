const PROJECTS = [
	{
		title: "TITO's",
		slug: 'tito',
		thumbnail: 'tito-thumbnail.jpg',
		slides: [
			'tito-slide-1.jpg',
			'tito-slide-2.jpg',
			'tito-slide-3.jpg',
			'tito-slide-4.jpg',
			'tito-slide-5.jpg',
			'tito-slide-6.jpg',
			'tito-slide-7.jpg',
			'tito-slide-8.jpg',
			'tito-slide-9.jpg',
			'tito-slide-10.jpg',
			'tito-slide-11.jpg',
			'tito-slide-12.jpg',
		],
		description: 'We create a brand character design, shelf store design, and packaging design.',
	},
	{
		title: 'Oxi',
		slug: 'oxi',
		thumbnail: 'oxi-thumbnail.jpg',
		slides: ['oxi-slide-1.jpg', 'oxi-slide-2.jpg', 'oxi-slide-3.jpg', 'oxi-slide-4.jpg'],
		description: 'We came out with stunning packaging for Oxi white pro whitening strips.',
	},
	{
		title: 'Rocs',
		slug: 'rocs',
		thumbnail: 'rocs-thumbnail.jpg',
		slides: ['rocs-slide-1.jpg', 'rocs-slide-2.jpg', 'rocs-slide-3.jpg', 'rocs-slide-4.jpg'],
		description:
			'We made Social media posts and indoor designs for R.O.C.S shelf store passing by flyer designing and logo creation.',
	},
	{
		title: 'Greens',
		slug: 'greens',
		thumbnail: 'greens-thumbnail.jpg',
		slides: ['greens-slide-1.jpg', 'greens-slide-2.jpg', 'greens-slide-3.jpg', 'greens-slide-4.jpg'],
		description:
			'We built the brand for Greens pharmacies starting from Logo, fonts, Rollup design, business cards also giveaways, giveaways’ bag, and nametag.',
	},
	{
		title: 'BME - Beauty Made Easy',
		slug: 'beauty-made-easy',
		thumbnail: 'beauty-thumbnail.jpg',
		slides: ['bme-slide-1.jpg', 'bme-slide-2.jpg', 'bme-slide-3.jpg'],
		description: 'We made creative shelf store designs, and social media posts.',
	},
	{
		title: 'Elite',
		slug: 'elite',
		thumbnail: 'elite-thumbnail.jpg',
		slides: ['elite-slide-1.jpg'],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Amigos',
		slug: 'amigos',
		thumbnail: 'amigos-slide-1.jpg',
		slides: [
			'amigos-slide-1.jpg',
			'amigos-slide-2.jpg',
			'amigos-slide-3.jpg',
			'amigos-slide-4.jpg',
			'amigos-slide-5.jpg',
			'amigos-slide-6.jpg',
			'amigos-slide-7.jpg',
			'amigos-slide-8.jpg',
			'amigos-slide-9.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Atlas',
		slug: 'atlas',
		thumbnail: 'atlas-slide-1.jpg',
		slides: [
			'atlas-slide-1.jpg',
			'atlas-slide-2.jpg',
			'atlas-slide-3.jpg',
			'atlas-slide-4.jpg',
			'atlas-slide-5.jpg',
			'atlas-slide-6.jpg',
			'atlas-slide-7.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Block 99',
		slug: 'block99',
		thumbnail: 'block99-slide-1.jpg',
		slides: [
			'block99-slide-1.jpg',
			'block99-slide-2.jpg',
			'block99-slide-3.jpg',
			'block99-slide-4.jpg',
			'block99-slide-5.jpg',
			'block99-slide-6.jpg',
			'block99-slide-7.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Dexters',
		slug: 'dexters',
		thumbnail: 'dexters-slide-1.jpg',
		slides: [
			'dexters-slide-1.jpg',
			'dexters-slide-2.jpg',
			'dexters-slide-3.jpg',
			'dexters-slide-4.jpg',
			'dexters-slide-5.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Frango',
		slug: 'frango',
		thumbnail: 'frango-slide-1.jpg',
		slides: [
			'frango-slide-1.jpg',
			'frango-slide-2.jpg',
			'frango-slide-3.jpg',
			'frango-slide-4.jpg',
			'frango-slide-5.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Makatza',
		slug: 'makatza',
		thumbnail: 'makatza-slide-1.jpg',
		slides: [
			'makatza-slide-1.jpg',
			'makatza-slide-2.jpg',
			'makatza-slide-3.jpg',
			'makatza-slide-4.jpg',
			'makatza-slide-5.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: "Nagia's",
		slug: 'nagia',
		thumbnail: 'nagia-slide-1.jpg',
		slides: [
			'nagia-slide-1.jpg',
			'nagia-slide-2.jpg',
			'nagia-slide-3.jpg',
			'nagia-slide-4.jpg',
			'nagia-slide-5.jpg',
			'nagia-slide-6.jpg',
			'nagia-slide-7.jpg',
			'nagia-slide-8.jpg',
			'nagia-slide-9.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
	{
		title: 'Squad 10',
		slug: 'squad10',
		thumbnail: 'squad10-slide-1.jpg',
		slides: [
			'squad10-slide-1.jpg',
			'squad10-slide-2.jpg',
			'squad10-slide-3.jpg',
			'squad10-slide-4.jpg',
			'squad10-slide-5.jpg',
			'squad10-slide-6.jpg',
			'squad10-slide-7.jpg',
			'squad10-slide-8.jpg',
			'squad10-slide-9.jpg',
			'squad10-slide-10.jpg',
			'squad10-slide-11.jpg',
		],
		description:
			'We are able to plan and develop a brand starting from brand/ digital strategy passing by Business consulting, completed by application development, and custom web development.',
	},
];

export default PROJECTS;
