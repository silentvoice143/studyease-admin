"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { sidebarItems } from "@/libs/constants/menuItems";

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
  children?: SidebarItem[];
}

const MenuItem = ({
  item,
  level = 0,
  onItemClick,
  activeId,
  isDrawerOpen,
}: {
  item: SidebarItem;
  level?: number;
  onItemClick: (item: SidebarItem) => void;
  activeId: string;
  isDrawerOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;

  const handleClick = () => {
    if (hasChildren) setIsOpen(!isOpen);
    onItemClick(item);
  };

  const Icon = item.icon;

  if (!isDrawerOpen && level === 0) {
    return (
      <button
        onClick={handleClick}
        className={`w-full p-3 rounded-xl transition-all duration-200 relative group flex items-center justify-center ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
        title={item.label}
      >
        {Icon && <Icon size={20} />}
        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
          {item.label}
        </div>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left transition-all duration-200 group ${
          isActive
            ? "bg-white/10 text-white font-medium"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        <div className="flex items-center gap-3 flex-1">
          {Icon && <Icon size={18} />}
          <span className="text-sm">{item.label}</span>
        </div>
        {hasChildren && (
          <span
            className={`transition-transform duration-200 ${
              isActive ? "text-white" : "text-gray-500"
            }`}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>

      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
              activeId={activeId}
              isDrawerOpen={isDrawerOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [activeId, setActiveId] = useState("");

  React.useEffect(() => {
    const found = findActiveItem(sidebarItems, pathname);
    if (found) setActiveId(found.id);
  }, [pathname]);

  const handleItemClick = (item: SidebarItem) => {
    setActiveId(item.id);
    if (item.href) router.push(item.href);
  };

  return (
    <>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50 transition-all duration-300 ${
          isDrawerOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className={`py-6 ${
              isDrawerOpen ? "px-6" : "px-3"
            } border-b border-white/10`}
          >
            {isDrawerOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold ring-4 ring-white/10">
                  AS
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Andrew Smith
                  </h2>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold ring-4 ring-white/10">
                  AS
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-hidden py-6 px-4 space-y-2">
            {sidebarItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onItemClick={handleItemClick}
                activeId={activeId}
                isDrawerOpen={isDrawerOpen}
              />
            ))}
          </div>

          {/* Footer */}
          {isDrawerOpen ? (
            <div className="p-6 border-t border-white/10">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-white/10">
                <h3 className="text-white font-semibold text-sm mb-1">
                  Let's start!
                </h3>
                <p className="text-gray-400 text-xs mb-4">
                  Creating or adding new tasks couldn’t be easier
                </p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Plus size={18} />
                  Add New Task
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-t border-white/10">
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Drawer Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={`hidden md:flex fixed top-10 -translate-y-1/2 z-[60] p-1.5 bg-gray-800 rounded-full shadow-xl border-2 border-gray-700 transition-all duration-300 hover:scale-110 ${
          isDrawerOpen ? "left-[274px]" : "left-[68px]"
        }`}
      >
        {isDrawerOpen ? (
          <ChevronLeft className="text-gray-300" size={16} />
        ) : (
          <ChevronRight className="text-gray-300" size={16} />
        )}
      </button>
    </>
  );
};

function findActiveItem(
  items: SidebarItem[],
  path: string
): SidebarItem | null {
  for (const item of items) {
    if (item.href === path) return item;
    if (item.children) {
      const found = findActiveItem(item.children, path);
      if (found) return found;
    }
  }
  return null;
}

export default Sidebar;
