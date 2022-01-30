// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Doggo Sports",
  tagline: "Your dog's sporting event, simplified.",
  url: "https://doggo-sports.github.io",
  baseUrl: "/monorepo/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "doggo-sports", // Usually your GitHub org/user name.
  projectName: "doggo-sports.github.io", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Doggo",
        logo: {
          alt: "Doggo Sports",
          src: "img/logo.png",
        },
        items: [
          { to: "/docs/intro", label: "Docs", position: "left" },
          {
            href: "https://github.com/doggo-sports",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs/intro",
              },
            ],
          },
          // {
          //   title: "Community",
          //   items: [
          //     {
          //       label: "Discord",
          //       href: "https://discordapp.com/invite/docusaurus",
          //     },
          //     {
          //       label: "Twitter",
          //       href: "https://twitter.com/docusaurus",
          //     },
          //   ],
          // },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/doggo-sports",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Doggo Sports, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
