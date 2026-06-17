import { WorkspaceView } from "@/components/workspace-view";

export default function AuthorWorkspacePage() {
  return (
    <WorkspaceView
      kicker="Author workspace"
      title="Theo dõi bản thảo và vòng sửa"
      description="Tác giả quản lý bản thảo nháp, hồ sơ đã nộp, phản hồi yêu cầu sửa và thư giải trình."
      role="AUTHOR"
      primaryAction={{ href: "/nop-bai", label: "Nộp bản thảo" }}
      queues={[
        { label: "Bản thảo của tôi", value: "06", helper: "2 hồ sơ cần phản hồi" },
        { label: "Đang phản biện", value: "03", helper: "Theo dõi nhận xét" },
        { label: "Cần nộp bản sửa", value: "02", helper: "Hạn gần nhất 21/06" },
      ]}
      tasks={["Hoàn tất metadata cho bản thảo nháp", "Tải thư giải trình vòng 1", "Cập nhật ORCID trong hồ sơ cá nhân"]}
    />
  );
}
