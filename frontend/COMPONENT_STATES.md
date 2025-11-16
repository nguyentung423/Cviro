# 🎭 Component States Guide

## Overview
Comprehensive component library with loading, error, empty, and disabled states.

---

## 1. Button Component

### Basic Usage
```jsx
import Button from '@/components/Button/Button';
import { Save, Trash } from 'lucide-react';

// Primary button
<Button variant="primary">
  Lưu thay đổi
</Button>

// With icon
<Button variant="primary" icon={Save} iconPosition="left">
  Lưu
</Button>

// Loading state
<Button variant="primary" loading>
  Đang xử lý...
</Button>

// Disabled state
<Button variant="primary" disabled>
  Không khả dụng
</Button>
```

### Variants
```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Sizes
```jsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Full Width
```jsx
<Button fullWidth>Full Width Button</Button>
```

---

## 2. Input Component

### Basic Usage
```jsx
import Input, { Textarea } from '@/components/Input/Input';
import { Mail, Lock } from 'lucide-react';

// Basic input
<Input 
  label="Email"
  type="email"
  placeholder="example@email.com"
  required
/>

// With icon
<Input 
  label="Email"
  icon={Mail}
  type="email"
/>

// Password with toggle
<Input 
  label="Mật khẩu"
  type="password"
  icon={Lock}
/>

// Error state
<Input 
  label="Email"
  error="Email không hợp lệ"
  value="invalid"
/>

// Helper text
<Input 
  label="Username"
  helperText="Tối thiểu 6 ký tự, không dấu"
/>

// Disabled
<Input 
  label="Email"
  disabled
  value="locked@example.com"
/>
```

### Textarea
```jsx
<Textarea 
  label="Mô tả"
  rows={5}
  placeholder="Nhập mô tả..."
  helperText="Tối đa 500 ký tự"
/>
```

---

## 3. Loading States

### Spinner
```jsx
import Spinner from '@/components/Spinner/Spinner';

<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
```

### Loading Overlay
```jsx
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';

// Over specific content
<div className="relative min-h-[400px]">
  <YourContent />
  <LoadingOverlay visible={isLoading} message="Đang tải dữ liệu..." />
</div>

// Full screen
<LoadingOverlay 
  visible={isLoading}
  fullScreen
  message="Đang xử lý..."
/>

// Transparent overlay
<LoadingOverlay 
  visible={isLoading}
  transparent
/>
```

### Skeleton Loaders
```jsx
import Skeleton, { SkeletonCard, SkeletonList, SkeletonTable } from '@/components/Skeleton/Skeleton';

// Basic skeleton
<Skeleton variant="text" width="80%" />
<Skeleton variant="title" />
<Skeleton variant="button" width={200} />
<Skeleton variant="avatar" width={64} height={64} circle />

// Multiple skeletons
<Skeleton variant="text" count={3} />

// Pre-built patterns
<SkeletonCard />
<SkeletonList count={5} />
<SkeletonTable rows={10} />
```

---

## 4. Error States

### Error State Component
```jsx
import ErrorState from '@/components/ErrorState/ErrorState';

// Basic error
<ErrorState 
  title="Không thể tải dữ liệu"
  message="Đã xảy ra lỗi khi tải. Vui lòng thử lại."
  onRetry={() => refetch()}
/>

// Warning type
<ErrorState 
  type="warning"
  title="Cảnh báo"
  message="Một số tính năng có thể không hoạt động."
/>

// No retry button
<ErrorState 
  title="Truy cập bị từ chối"
  message="Bạn không có quyền xem nội dung này."
/>
```

---

## 5. Empty States

### Empty State Component
```jsx
import EmptyState from '@/components/EmptyState/EmptyState';
import { Briefcase } from 'lucide-react';

// Basic empty state
<EmptyState 
  title="Không có dữ liệu"
  message="Chưa có nội dung để hiển thị."
/>

// With action
<EmptyState 
  title="Chưa có công việc"
  message="Bạn chưa tạo công việc nào."
  action={() => navigate('/create-job')}
  actionLabel="Tạo công việc mới"
/>

// Preset types
<EmptyState type="search" />
<EmptyState type="noData" />
<EmptyState type="noJobs" />
<EmptyState type="noUsers" />

// Custom icon
<EmptyState 
  icon={Briefcase}
  title="Custom Empty State"
  message="Your custom message here."
/>
```

---

## 6. Toast Notifications

### Basic Toast
```jsx
import Toast, { ToastContainer } from '@/components/Toast/Toast';

// Success toast
<Toast 
  type="success"
  title="Thành công"
  message="Dữ liệu đã được lưu."
  onClose={() => {}}
/>

// Error toast
<Toast 
  type="error"
  title="Lỗi"
  message="Không thể lưu dữ liệu."
/>

// Warning
<Toast 
  type="warning"
  title="Cảnh báo"
  message="Một số trường chưa được điền."
/>

// Info
<Toast 
  type="info"
  message="Có cập nhật mới."
/>
```

### Toast Container (with state management)
```jsx
import { useState } from 'react';
import { ToastContainer } from '@/components/Toast/Toast';

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts([...toasts, { id, ...toast }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter(t => t.id !== id));
  };

  return (
    <>
      <YourApp />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Trigger example */}
      <button onClick={() => addToast({
        type: 'success',
        title: 'Saved!',
        message: 'Your changes have been saved.'
      })}>
        Show Toast
      </button>
    </>
  );
}
```

---

## 7. Real-World Examples

### Form with All States
```jsx
import { useState } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { Mail, Lock } from 'lucide-react';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login();
      // Success
    } catch (error) {
      setErrors({ email: 'Email hoặc mật khẩu không đúng' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        label="Email"
        type="email"
        icon={Mail}
        error={errors.email}
        required
      />
      
      <Input 
        label="Mật khẩu"
        type="password"
        icon={Lock}
        required
      />
      
      <Button 
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
      >
        Đăng nhập
      </Button>
    </form>
  );
}
```

### Data List with Loading/Empty/Error
```jsx
import { useState, useEffect } from 'react';
import { SkeletonList } from '@/components/Skeleton/Skeleton';
import ErrorState from '@/components/ErrorState/ErrorState';
import EmptyState from '@/components/EmptyState/EmptyState';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonList count={5} />;
  
  if (error) return (
    <ErrorState 
      title="Không thể tải danh sách"
      message={error.message}
      onRetry={() => window.location.reload()}
    />
  );
  
  if (jobs.length === 0) return (
    <EmptyState 
      type="noJobs"
      action={() => navigate('/create-job')}
      actionLabel="Tạo công việc mới"
    />
  );

  return (
    <div className="space-y-4">
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
}
```

---

## 8. Accessibility Checklist

- [x] All interactive elements have focus states
- [x] Error messages linked with aria-describedby
- [x] Loading states announced to screen readers
- [x] Keyboard navigation supported
- [x] Color is not the only indicator (icons + text)
- [x] Proper ARIA attributes (aria-invalid, aria-disabled)
- [x] Toast auto-dismiss with configurable duration

---

## 9. Performance Tips

### Lazy Load Components
```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<SkeletonCard />}>
  <HeavyComponent />
</Suspense>
```

### Debounce Loading States
```jsx
import { useState, useEffect } from 'react';

const [showLoading, setShowLoading] = useState(false);

useEffect(() => {
  // Only show loading after 300ms to avoid flash
  const timer = setTimeout(() => {
    if (loading) setShowLoading(true);
  }, 300);
  
  return () => clearTimeout(timer);
}, [loading]);
```

---

## 10. Component Index

```
✅ Button - Full-featured button with all states
✅ Input - Text input with validation states
✅ Textarea - Multi-line input
✅ Spinner - Loading spinner
✅ Skeleton - Content placeholders
✅ LoadingOverlay - Full page/section loading
✅ ErrorState - Error messages with retry
✅ EmptyState - No data placeholders
✅ Toast - Notifications
```
