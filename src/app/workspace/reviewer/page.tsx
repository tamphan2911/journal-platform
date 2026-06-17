import { WorkspaceView } from "@/components/workspace-view";

export default function ReviewerWorkspacePage() {
  return (
    <WorkspaceView
      kicker="Reviewer workspace"
      title="Lời mời và biểu mẫu phản biện"
      description="Phản biện viên xử lý lời mời, đọc bản thảo ẩn danh và gửi nhận xét có cấu trúc."
      role="REVIEWER"
      primaryAction={{ href: "/phan-bien", label: "Hướng dẫn phản biện" }}
      queues={[
        { label: "Lời mời mới", value: "04", helper: "Cần xác nhận" },
        { label: "Đang phản biện", value: "07", helper: "2 hồ sơ gần hạn" },
        { label: "Đã hoàn tất", value: "18", helper: "Trong năm 2026" },
      ]}
      tasks={["Xác nhận lời mời CS-2026-014", "Gửi nhận xét mật cho biên tập viên", "Khai báo xung đột lợi ích trước khi nhận lời"]}
    />
  );
}
