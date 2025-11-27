import CareerPortal from '@/components/CareerPortal';

export const metadata = {
  title: 'Careers | MPS Group',
  description: 'Join MPS Group - View open positions in welding, pipefitting, electrical, and more.',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#060a12]">
      <CareerPortal />
    </main>
  );
}
