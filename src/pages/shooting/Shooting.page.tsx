import useLateTemplate from "@Hooks/useLateTemplate";
import ShootingSubPage from "@Pages/shooting/Shooting.subPage";
import { useParams } from "react-router-dom";

// HJ TODO: loading state 제거 및 ref useEffect로 넣어서 cleanup 실행
export default function ShootingPage() {
  const { templateId } = useParams();
  const templateQuery = useLateTemplate();

  if (templateQuery.status === "pending") return <div>loading</div>;
  if (templateQuery.status === "error") return <div>error</div>;

  const template = templateQuery.data.find(
    (template) => template.id === templateId
  );

  if (!template || template.state !== "ready") return <div>error</div>;

  return <ShootingSubPage template={template} />;
}
