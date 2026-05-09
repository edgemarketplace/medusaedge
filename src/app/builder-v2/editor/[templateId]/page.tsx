import { GrapesEditor } from "@/modules/hub/components/builder/grapes-editor"
import { notFound } from "next/navigation"

interface EditorPageProps {
  params: {
    templateId: string
  }
}

export const dynamic = "force-dynamic"

export default function EditorPage({ params }: EditorPageProps) {
  const { templateId } = params

  if (!templateId) {
    notFound()
  }

  return (
    <div className="h-screen">
      <GrapesEditor templateId={templateId} />
    </div>
  )
}
