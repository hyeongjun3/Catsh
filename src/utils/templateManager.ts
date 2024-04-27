import firebaseManager from "@Utils/firebaseManager";
import { hasOwn } from "@Utils/objectExtension";

export type StateType = "ready" | "preparing";

export type TemplateReadyType = {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string;
  previewVideoSrc: string;
  recordVideoSrc: string;
  state: "ready";
};

export type TemplatePreparingType = {
  id: string;
  title: string;
  thumbnailSrc: string;
  state: "preparing";
};

export type TemplateType = TemplateReadyType | TemplatePreparingType;

export async function getTemplate() {
  const templates = (await firebaseManager.getFile(
    "templates/templates.json",
    "json"
  )) as TemplateType[];

  const templateWithUrl = await Promise.all(
    templates.map(async (template) => {
      await Promise.all(
        (["thumbnailSrc", "previewVideoSrc", "recordVideoSrc"] as const).map(
          async (key) => {
            if (hasOwn(template, key)) {
              // @ts-ignore
              template[key] = await firebaseManager.getUrl(template[key]);
            }
          }
        )
      );

      return template;
    })
  );

  return templateWithUrl;
}
