import type {
	SanityAsset,
	SanityBlock,
	SanityDocument,
	SanityFile,
	SanityGeoPoint,
	SanityImage,
	SanityImageAsset,
	SanityImageCrop,
	SanityImageDimensions,
	SanityImageHotspot,
	SanityImageMetadata,
	SanityImagePalette,
	SanityImagePaletteSwatch,
	SanityKeyed,
	SanityKeyedReference,
	SanityReference
} from 'sanity-codegen';

export type {
	SanityReference,
	SanityKeyedReference,
	SanityAsset,
	SanityImage,
	SanityFile,
	SanityGeoPoint,
	SanityBlock,
	SanityDocument,
	SanityImageCrop,
	SanityImageHotspot,
	SanityKeyed,
	SanityImageAsset,
	SanityImageMetadata,
	SanityImageDimensions,
	SanityImagePalette,
	SanityImagePaletteSwatch
};

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
	_type: 'page';

	/**
	 * Title — `string`
	 *
	 *
	 */
	title?: string;

	/**
	 * Slug — `slug`
	 *
	 *
	 */
	slug?: { _type: 'slug'; current: string };

	/**
	 * Page sections — `array`
	 *
	 *
	 */
	content?: Array<SanityKeyed<Hero> | SanityKeyed<ImageSection> | SanityKeyed<TextSection>>;

	/**
	 * Description — `text`
	 *
	 * This description populates meta-tags on the webpage
	 */
	description?: string;

	/**
	 * Open Graph Image — `image`
	 *
	 * Image for sharing previews on Facebook, Twitter etc.
	 */
	openGraphImage?: {
		_type: 'image';
		asset: SanityReference<SanityImageAsset>;
		crop?: SanityImageCrop;
		hotspot?: SanityImageHotspot;
	};

	/**
	 * Include page in sitemap — `boolean`
	 *
	 * For search engines. Will be added to /sitemap.xml
	 */
	includeInSitemap?: boolean;

	/**
	 * Disallow in robots.txt — `boolean`
	 *
	 * Hide this route for search engines
	 */
	disallowRobots?: boolean;
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
	_type: 'author';

	/**
	 * Name — `string`
	 *
	 *
	 */
	name?: string;

	/**
	 * Slug — `slug`
	 *
	 *
	 */
	slug?: { _type: 'slug'; current: string };

	/**
	 * Image — `figure`
	 *
	 *
	 */
	image?: Figure;

	/**
	 * Bio — `array`
	 *
	 *
	 */
	bio?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Nav Item
 *
 *
 */
export interface NavItem extends SanityDocument {
	_type: 'navItem';

	/**
	 * Title — `string`
	 *
	 * Title to show at the top level.
	 */
	title?: string;

	/**
	 * Routes — `array`
	 *
	 *
	 */
	routes?: Array<SanityKeyedReference<Page>>;
}

/**
 * Site Configuration
 *
 * Configure global site settings.
 */
export interface SiteConfig extends SanityDocument {
	_type: 'siteConfig';

	/**
	 * Site Title — `string`
	 *
	 *
	 */
	title?: string;

	/**
	 * URL — `url`
	 *
	 * The main site URL. Used to create canonical url.
	 */
	url?: string;

	/**
	 * frontpage — `reference`
	 *
	 * Choose page to be the frontpage.
	 */
	frontpage?: SanityReference<Page>;

	/**
	 * Site Language — `string`
	 *
	 *
	 */
	lang?: string;

	/**
	 * Brand logo — `image`
	 *
	 * Best choice is to use an SVG.
	 */
	logo?: {
		_type: 'image';
		asset: SanityReference<SanityImageAsset>;
		crop?: SanityImageCrop;
		hotspot?: SanityImageHotspot;
	};

	/**
	 * Main Navigation — `array`
	 *
	 * Select pages for the top menu
	 */
	mainNavigation?: Array<SanityKeyedReference<NavItem | Page>>;

	/**
	 * Address — `text`
	 *
	 *
	 */
	address?: string;

	/**
	 * Phone — `string`
	 *
	 *
	 */
	phone?: string;

	/**
	 * Footer navigation items — `array`
	 *
	 *
	 */
	footerNavigation?: Array<SanityKeyedReference<Page>>;

	/**
	 * footerText — `simplePortableText`
	 *
	 *
	 */
	footerText?: SimplePortableText;
}

export type InternalLink = SanityReference<Page>;

export type ExternalLink = {
	_type: 'externalLink';
	/**
	 * URL — `url`
	 *
	 *
	 */
	href?: string;
};

export type BlockContent = Array<
	| SanityKeyed<SanityBlock>
	| SanityKeyed<{
			_type: 'image';
			asset: SanityReference<SanityImageAsset>;
			crop?: SanityImageCrop;
			hotspot?: SanityImageHotspot;
	  }>
>;

export type Figure = {
	_type: 'figure';
	asset: SanityReference<SanityImageAsset>;
	crop?: SanityImageCrop;
	hotspot?: SanityImageHotspot;

	/**
	 * Alt Text — `string`
	 *
	 * Alternative text. See: https://www.w3.org/WAI/tutorials/images/decision-tree/
	 */
	alt?: string;

	/**
	 * Figure Caption — `string`
	 *
	 * Optional caption for the image. This will be shown to all users.
	 */
	caption?: string;
};

export type Cta = {
	_type: 'cta';
	/**
	 * Title — `string`
	 *
	 *
	 */
	title?: string;

	/**
	 * Internal link — `reference`
	 *
	 * Use this to link between pages on the website
	 */
	route?: SanityReference<Page>;

	/**
	 * External link — `url`
	 *
	 *
	 */
	link?: string;
};

export type Hero = {
	_type: 'hero';
	/**
	 * Heading — `string`
	 *
	 *
	 */
	heading?: string;

	/**
	 * Tagline — `simplePortableText`
	 *
	 *
	 */
	tagline?: SimplePortableText;

	/**
	 * Background image — `image`
	 *
	 *
	 */
	backgroundImage?: {
		_type: 'image';
		asset: SanityReference<SanityImageAsset>;
		crop?: SanityImageCrop;
		hotspot?: SanityImageHotspot;
	};

	/**
	 * Call to actions — `array`
	 *
	 *
	 */
	ctas?: Array<SanityKeyed<Cta>>;
};

export type PortableText = Array<SanityKeyed<SanityBlock> | SanityKeyed<Figure>>;

export type SimplePortableText = Array<SanityKeyed<SanityBlock>>;

export type ImageSection = {
	_type: 'imageSection';
	/**
	 * Heading — `string`
	 *
	 *
	 */
	heading?: string;

	/**
	 * Label — `string`
	 *
	 *
	 */
	label?: string;

	/**
	 * Text — `simplePortableText`
	 *
	 *
	 */
	text?: SimplePortableText;

	/**
	 * Image — `figure`
	 *
	 *
	 */
	image?: Figure;

	/**
	 * Call to action — `cta`
	 *
	 *
	 */
	cta?: Cta;
};

export type TextSection = {
	_type: 'textSection';
	/**
	 * Label — `string`
	 *
	 *
	 */
	label?: string;

	/**
	 * Heading — `string`
	 *
	 *
	 */
	heading?: string;

	/**
	 * Text — `portableText`
	 *
	 *
	 */
	text?: PortableText;
};

export type Documents = Page | Author | NavItem | SiteConfig;
