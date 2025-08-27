export const DashboardTemplate = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNavigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto pb-6">{children}</div>
      </main>
    </div>
  );
};
