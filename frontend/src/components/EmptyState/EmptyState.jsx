import { Inbox, Search, FileX, Users, Briefcase } from 'lucide-react';
import Button from '../Button/Button';

/**
 * Empty State component for when no data is available
 */
const EmptyState = ({
  icon: Icon = Inbox,
  title = 'Không có dữ liệu',
  message = 'Chưa có nội dung để hiển thị.',
  action,
  actionLabel,
  type = 'default',
  className = '',
}) => {
  const presets = {
    search: {
      icon: Search,
      title: 'Không tìm thấy kết quả',
      message: 'Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm.',
    },
    noData: {
      icon: FileX,
      title: 'Chưa có dữ liệu',
      message: 'Dữ liệu sẽ xuất hiện ở đây khi có.',
    },
    noJobs: {
      icon: Briefcase,
      title: 'Chưa có công việc',
      message: 'Hiện tại chưa có công việc nào phù hợp. Hãy quay lại sau nhé!',
    },
    noUsers: {
      icon: Users,
      title: 'Chưa có người dùng',
      message: 'Danh sách người dùng trống.',
    },
  };

  const preset = type !== 'default' ? presets[type] : null;
  const FinalIcon = preset?.icon || Icon;
  const finalTitle = preset?.title || title;
  const finalMessage = preset?.message || message;

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center min-h-[400px] ${className}`}>
      <div className="bg-semantic-bg-secondary rounded-full p-8 mb-6">
        <FinalIcon className="w-16 h-16 text-semantic-text-muted" />
      </div>
      
      <h3 className="text-2xl font-heading font-bold text-semantic-text-primary mb-3">
        {finalTitle}
      </h3>
      
      <p className="text-semantic-text-secondary mb-8 max-w-md text-lg">
        {finalMessage}
      </p>
      
      {action && actionLabel && (
        <Button
          variant="primary"
          onClick={action}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
