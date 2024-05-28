# C-CARTS.com

## Overview

This repository contains the codebase for the [C-CARTS.com][c-carts] website. The site is built using [NextJS][next] and [Sanity][sanity]

## Features

- **TypeScript**: The primary programming language used.
- **CSS**: Styling language for the website.
- **JavaScript**: Additional functionality.
- **NextJS**: Framework for server-rendered React applications.
- **Sanity**: Headless CMS for content management.

## Structure

- **components/**: Reusable UI components.
- **helpers/**: Utility functions.
- **hooks/**: Custom React hooks.
- **sanity/**: Configuration for the Sanity CMS.

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/C-CARTS/c-carts.com.git
```

2. The following environmental variables are required before building. If developing locally, add them to a `.env` file.

```env
NEXT_PUBLIC_SANITY_API_VERSION="2024-03-21"
NEXT_PUBLIC_SANITY_DATASET="<SANITY_DATASET_ID>"
NEXT_PUBLIC_SANITY_PROJECT_ID="<SANITY_PROJECT_ID>"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="<API_KEY_FOR_GOOGLE_MAPS>"
NEXT_PUBLIC_SETTINGS_DOC_NAME="siteConfig"
NEXT_PUBLIC_HOMEPAGE_DOC_NAME="homepage"
NEXT_PUBLIC_JOBS_PAGE_DOC_NAME="jobsPage"
NEXT_PUBLIC_NEWS_PAGE_DOC_NAME="newsPage"
NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME="performance"
NEXT_PUBLIC_MAX_IMAGE_SIZE=1500
SANITY_WEBHOOK_SECRET="<SECRET_STRING>"
NEXT_PUBLIC_BASE_URL="https://c-carts.com"
STATIC_SLUGS="jobs,news,performance,champaign-county-area-rural-transit-system,/"
```

3. Install packages

```sh
npm install
```

4. Run dev build

```sh
npm run dev
```

### Running Production Build

To run a production build, use the following commands:

```sh
npm run build:all
npm run start
```

## Sanity

This repo uses the `next-sanity` package to bundle the Sanity CMS scheme into the same project as the Next frontend. The Sanity Schema is configured in the `/sanity` directory.
Sanity Studio can be accessed at [https://c-carts.com/studio][studio]

## Caching

Since the site primarily generates static content at build time, it is necessary to rebuild pages when content changes in Sanity.
This is done by setting up a webhook in Sanity and pointing it to an API route (`/api/revalidate`) on our NextJS site.
This API route can selectively revalidate pages or clear the cache based on the payload of the hook.

## License

This project is licensed under the Apache-2.0 License. See the LICENSE file for details.

## Contact

For more information email [developer@mtd.org][dev]

[c-carts]: https://c-carts.com/
[next]: https://nextjs.org/
[sanity]: https://www.sanity.io/
[studio]: https://c-carts.com/studio
[dev]: mailto:developer@mtd.org
