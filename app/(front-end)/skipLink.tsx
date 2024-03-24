import classes from "./skipLink.module.css";

export default function SkipLink() {
	return (
		<a href="#main-content" className={classes.a}>
			<span className={classes.span}>Skip to main content</span>
		</a>
	);
}
