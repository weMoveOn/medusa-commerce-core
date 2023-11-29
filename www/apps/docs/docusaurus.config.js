/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config"
import fs from "fs"
import { themes as prismThemes } from "prism-react-renderer"
const reverseSidebarItems = require("./src/utils/reverse-sidebar")
const excludeSidebarResults = require("./src/utils/exclude-sidebar-results")

const announcementBar = JSON.parse(fs.readFileSync("./announcement.json"))

/** @type {import('@medusajs/docs').MedusaDocusaurusConfig} */
const config = {
  title: "Medusa",
  tagline: "Explore and learn how to use Medusa",
  url: "https://docs.medusajs.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "medusajs",
  projectName: "medusajs/www",
  markdown: {
    mdx1Compat: {
      comments: true,
      admonitions: false,
      headingIds: false,
    },
  },
  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
    async function tailwindPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"))
          postcssOptions.plugins.push(require("autoprefixer"))
          return postcssOptions
        },
      }
    },
    function webpackPlugin() {
      return {
        name: "custom-webpack-plugin",
        configureWebpack() {
          return {
            devServer: {
              client: {
                overlay: {
                  runtimeErrors: (error) => {
                    if (
                      error.message ===
                      "ResizeObserver loop completed with undelivered notifications."
                    ) {
                      return false
                    }
                    return true
                  },
                },
              },
            },
          }
        },
      }
    },
  ],
  themeConfig: {
    image: "img/docs-meta.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    algoliaConfig: {
      appId: process.env.ALGOLIA_APP_ID || "temp",
      apiKey: process.env.ALGOLIA_API_KEY || "temp",
      indexNames: {
        docs: process.env.DOCS_ALGOLIA_INDEX_NAME,
        api: process.env.API_ALGOLIA_INDEX_NAME,
      },
      filters: [
        {
          value: "docs",
          label: "Docs",
        },
        {
          value: "user-guide",
          label: "User Guide",
        },
        {
          value: "admin",
          label: "Admin API",
        },
        {
          value: "store",
          label: "Store API",
        },
        {
          value: "plugins",
          label: "Plugins",
        },
        {
          value: "reference",
          label: "References",
        },
        {
          value: "ui",
          label: "UI",
        },
      ],
      defaultFiltersByPath: [
        {
          path: "/user-guide",
          filters: ["user-guide"],
        },
        {
          path: "/references",
          filters: ["reference"],
        },
        {
          path: "/plugins",
          filters: ["plugins"],
        },
      ],
      defaultFilters: ["docs"],
    },
    analytics: {
      apiKey: process.env.SEGMENT_API_KEY || "temp",
    },
    aiAssistant: {
      apiUrl: process.env.AI_ASSISTANT_URL || "temp",
      websiteId: process.env.AI_WEBSITE_ID || "temp",
      recaptchaSiteKey:
        process.env.AI_API_ASSISTANT_RECAPTCHA_SITE_KEY || "temp",
    },
    prism: {
      defaultLanguage: "ts",
      additionalLanguages: ["bash", "json"],
      plugins: ["line-numbers", "show-language"],
      theme: {
        ...prismThemes.vsDark,
        plain: {
          ...prismThemes.vsDark.plain,
          backgroundColor: "#111827",
        },
      },
    },
    zoom: {
      selector: ".markdown :not(.no-zoom-img) > img:not(.no-zoom-img)",
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: "Medusa",
        src: "img/logo-icon.png",
        srcDark: "img/logo-icon-dark.png",
        width: 20,
        height: 20,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "homepage",
          label: "Docs",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "userGuideSidebar",
          label: "User Guide",
          position: "left",
        },
        {
          href: `${process.env.API_URL}/api/store`,
          label: "Store API",
          prependBaseUrlToHref: true,
          target: "_blank",
          position: "left",
        },
        {
          href: `${process.env.API_URL}/api/admin`,
          label: "Admin API",
          prependBaseUrlToHref: true,
          target: "_blank",
          position: "left",
        },
        {
          href: `${process.env.API_URL}/ui`,
          label: "UI",
          prependBaseUrlToHref: true,
          target: "_blank",
          position: "left",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    navbarActions: [
      {
        type: "button",
        label: "Report an Issue",
        className: "max-[1014px]:hidden",
        href: "https://github.com/medusajs/medusa/issues/new?assignees=&labels=type%3A+docs&template=docs.yml",
      },
    ],
    mobileLogo: {
      alt: "Medusa",
      src: "img/logo-mobile.png",
      srcDark: "img/logo-mobile-dark.png",
      width: 82,
      height: 20,
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Medusa, Inc. All rights reserved.`,
    },
    socialLinks: [
      {
        type: "discord",
        href: "https://discord.gg/medusajs",
      },
      {
        type: "twitter",
        href: "https://twitter.com/medusajs",
      },
      {
        type: "linkedin",
        href: "https://www.linkedin.com/company/medusajs",
      },
      {
        type: "github",
        href: "https://github.com/medusajs/medusa",
      },
    ],
    reportCodeLinkPrefix:
      "https://github.com/medusajs/medusa/issues/new?assignees=&labels=type%3A+docs&template=docs.yml",
    footerFeedback: {
      event: "survey",
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    cloudinaryConfig: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
      flags: ["fl_lossy", "f_auto"],
      resize: {
        action: "pad",
        aspectRatio: "16:9",
      },
      roundCorners: 16,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/medusajs/medusa/edit/develop/www/apps/docs",
          path: "content",
          routeBasePath: "/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          showLastUpdateTime: true,
          // breadcrumbs: false,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return reverseSidebarItems(
              excludeSidebarResults(sidebarItems, args.item),
              args.item
            )
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-S7G7X3JYS3",
        },
        sitemap: {
          filename: "sitemap-docs.xml",
        },
      },
    ],
  ],
}

if (Object.keys(announcementBar).length) {
  config.themeConfig.announcementBar = announcementBar
}

export default config
