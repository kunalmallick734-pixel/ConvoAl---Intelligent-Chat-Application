"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { ClerkProvider } from '@clerk/nextjs'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-1 min-w-0 bg-gray-50 text-gray-900">
      <main className="flex w-full flex-1 min-w-0 flex-col bg-gray-50 dark:bg-black dark:text-white">
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <Provider store={store}>
          <DashboardLayout>{children}</DashboardLayout>
        </Provider>
      </SidebarProvider>
    </ClerkProvider>
  );
};

export default DashboardWrapper;
