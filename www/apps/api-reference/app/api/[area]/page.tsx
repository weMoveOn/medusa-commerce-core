import AreaProvider from "@/providers/area"
import AdminDescription from "../../_mdx/admin.mdx"
import StoreDescription from "../../_mdx/store.mdx"
import ClientLibraries from "../../_mdx/client-libraries.mdx"
import Section from "@/components/Section"
import Tags from "@/components/Tags"
import type { Area } from "@/types/openapi"
import DividedLayout from "@/layouts/Divided"
import { capitalize } from "docs-ui"
import PageTitleProvider from "../../../providers/page-title"

type ReferencePageProps = {
  params: {
    area: Area
  }
}

const ReferencePage = async ({ params: { area } }: ReferencePageProps) => {
  return (
    <AreaProvider area={area}>
      <PageTitleProvider>
        <h1 className="!text-h2 block lg:hidden">
          Medusa {capitalize(area)} API Reference
        </h1>
        <DividedLayout
          mainContent={
            <Section>
              <h1 className="!text-h2 hidden lg:block">
                Medusa {capitalize(area)} API Reference
              </h1>
              {area.includes("admin") && <AdminDescription />}
              {area.includes("store") && <StoreDescription />}
            </Section>
          }
          codeContent={<ClientLibraries />}
          className="flex-col-reverse"
        />
        <Tags />
      </PageTitleProvider>
    </AreaProvider>
  )
}

export default ReferencePage

export function generateMetadata({ params: { area } }: ReferencePageProps) {
  return {
    title: `Medusa ${capitalize(area)} API Reference`,
    description: `REST API reference for the Medusa ${area} API. This reference includes code snippets and examples for Medusa JS Client and cURL.`,
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  return [
    {
      area: "admin",
    },
    {
      area: "store",
    },
  ]
}
