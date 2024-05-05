import React from "react"
import { useNavigate } from "react-router-dom"
import AdminBuilder from "./edit/components/AdminBuilder"

const Site = () => {
  const navigate = useNavigate()
  return (
    <div className=" space-y-4">
      <div className=" space-y-4">
        <div className=" rounded-lg border p-4">
          <div className=" flex justify-between">
            <h2 className=" font-semibold">Design & branding</h2>
            <button
              onClick={() => navigate("edit")}
              className=" font-medium text-green-500"
            >
              Customize
            </button>
          </div>
          Customize the theme, colors, and layout of your site
        </div>
        <AdminBuilder
          designSystem={{ darkMode: false, fetchKoenigLexical: async () => {} }}
          framework={{
            externalNavigate: (link) => {
              // Use the expectExternalNavigate helper to test this dummy external linking
              window.location.href = `/external/${encodeURIComponent(
                JSON.stringify(link)
              )}`
            },
            ghostVersion: "5.x",
            sentryDSN: null,
            unsplashConfig: {
              Authorization: "",
              "Accept-Version": "",
              "Content-Type": "",
              "App-Pragma": "",
              "X-Unsplash-Cache": false,
            },
            onDelete: () => {},
            onInvalidate: () => {},
            onUpdate: () => {},
          }}
          officialThemes={[
            {
              name: "Source",
              category: "News",
              previewUrl: "https://source.ghost.io/",
              ref: "default",
              image: "assets/img/themes/Source.png",
              variants: [
                {
                  category: "Magazine",
                  previewUrl: "https://source-magazine.ghost.io/",
                  image: "assets/img/themes/Source-Magazine.png",
                },
                {
                  category: "Newsletter",
                  previewUrl: "https://source-newsletter.ghost.io/",
                  image: "assets/img/themes/Source-Newsletter.png",
                },
              ],
            },
            {
              name: "Casper",
              category: "Blog",
              previewUrl: "https://demo.ghost.io/",
              ref: "default",
              image: "assets/img/themes/Casper.png",
            },
            {
              name: "Headline",
              category: "News",
              url: "https://github.com/TryGhost/Headline",
              previewUrl: "https://headline.ghost.io",
              ref: "TryGhost/Headline",
              image: "assets/img/themes/Headline.png",
            },
            {
              name: "Edition",
              category: "Newsletter",
              url: "https://github.com/TryGhost/Edition",
              previewUrl: "https://edition.ghost.io/",
              ref: "TryGhost/Edition",
              image: "assets/img/themes/Edition.png",
            },
          ]}
          zapierTemplates={[]}
        />
      </div>
    </div>
  )
}

export default Site
