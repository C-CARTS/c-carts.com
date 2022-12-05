/* eslint-disable react/jsx-props-no-spreading */
import type { PortableTextComponents, PortableTextProps, PortableTextMarkComponentProps } from '@portabletext/react';
import type { PortableTextBlock, TypedObject } from '@portabletext/types';
import { PortableText as PortableTextComponent } from '@portabletext/react';

interface ExternalLinkProps {
	_type: string;
	href: string;
}

const portableTextComponents: PortableTextComponents = {
	block: {
		h1: ({ children }) => <h1>{children}</h1>,
		h2: ({ children }) => <h2>{children}</h2>,
		h3: ({ children }) => <h3>{children}</h3>,
		normal: ({ children }) => <p>{children}</p>
	},
	marks: {
		externalLink: ({ children, value }: PortableTextMarkComponentProps<ExternalLinkProps>) => {
			if (value) {
				const { href } = value;
				return <a href={href}>{children}</a>;
			}
			return <a href="_blank">{children}</a>;
		}
	}
};

export default function PortableText<B extends TypedObject = PortableTextBlock>(props: Exclude<PortableTextProps<B>, 'components'>) {
	return <PortableTextComponent {...props} components={portableTextComponents} />;
}
