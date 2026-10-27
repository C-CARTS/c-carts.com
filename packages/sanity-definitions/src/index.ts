import gtfsFeed from "./documents/gtfsFeed";
import job from "./documents/job";
import navItem from "./documents/navItem";
import news from "./documents/news";
import page from "./documents/page";
import performance from "./documents/performance";
import siteConfig from "./documents/siteConfig";
import content from "./objects/content";
import fileAttachment from "./objects/fileAttachment";
import fixedRoute from "./objects/fixedRoute";
import imageWithAlt from "./objects/imageWithAlt";

export {
	content,
	fileAttachment,
	fixedRoute,
	gtfsFeed,
	imageWithAlt,
	job,
	navItem,
	news,
	page,
	performance,
	siteConfig,
};

export const schemaTypes = [
	job,
	navItem,
	news,
	page,
	gtfsFeed,
	performance,
	siteConfig,
	content,
	fileAttachment,
	fixedRoute,
	imageWithAlt,
];
