import { WorkspaceView } from "@/components/workspace-view";

export default function EditorWorkspacePage() {
  return (
    <WorkspaceView
      kicker="Editorial workspace"
      title="Sàng lọc, phân công và chuẩn bị quyết định"
      description="Biên tập viên và tổng biên tập quản lý pipeline bản thảo, phản biện và quyết định học thuật."
      role="SECTION_EDITOR / EDITOR_IN_CHIEF"
      primaryAction={{ href: "/dashboard", label: "Mở dashboard" }}
      queues={[
        { label: "Cần sàng lọc", value: "35", helper: "Bản thảo mới" },
        { label: "Chờ phản biện", value: "21", helper: "7 hồ sơ quá hạn" },
        { label: "Sẵn sàng quyết định", value: "09", helper: "Đủ nhận xét" },
      ]}
      tasks={["Phân công biên tập viên cho CS-2026-011", "Mời phản biện thứ ba cho hồ sơ kinh tế số", "Chuẩn bị quyết định cho bản thảo đã đủ nhận xét"]}
    />
  );
}
