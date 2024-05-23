import "react";

///
/// This can be removed once @types/react is updated to include
/// support for the popover api.
///

declare module "react" {
	// eslint-disable-next-line no-unused-vars, no-undef
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		popover?: string;
		anchor?: string;
	}

	// eslint-disable-next-line no-unused-vars
	interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
		popovertarget?: string;
	}
}
