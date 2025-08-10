import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '../../../public/assets/logo.svg';
export default function Header() {
  return (
    <div className="p-5 border-b border-b-muted flex justify-between items-center">
      <div className="flex gap-2 items-center flex-1">
        <Logo width={100} height={40} />
      </div>
      <div className="flex-1">
        <Input
          placeholder="Tìm kiếm khóa học, bài viết, video..."
          className="p-2 rounded-xl h-11 shadow-none"
        />
      </div>
      <div className="flex-1 flex justify-end gap-5">
        <Button className="rounded-xl h-11 w-32 shadow-none" variant={'secondary'}>
          Đăng Ký
        </Button>
        <Button className="rounded-xl h-11 w-32 shadow-none" variant={'default'}>
          Đăng Nhập
        </Button>
      </div>
    </div>
  );
}
