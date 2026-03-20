"use client"

import { useState } from "react"
import { ChevronRight, Cpu, Settings, Camera, RotateCw, Box, Bell, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScannerControlPage from "./scanner-control/page"
import HardwareStatusPage from "./hardware-status/page"
import ScanSessionsPage from "./scan-sessions/page"
import ModelViewerPage from "./model-viewer/page"
import SystemSettingsPage from "./system-settings/page"

export default function ScannerDashboard() {
  const [activeSection, setActiveSection] = useState("control")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-70"} bg-neutral-900 border-r border-neutral-700 transition-all duration-300 fixed md:relative z-50 md:z-auto h-full md:h-auto ${!sidebarCollapsed ? "md:block" : ""}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`${sidebarCollapsed ? "hidden" : "block"}`}>
              <h1 className="text-cyan-400 font-bold text-lg tracking-wider">3D SCANNER</h1>
              <p className="text-neutral-500 text-xs">CONTROL SYSTEM v1.0</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-neutral-400 hover:text-cyan-400"
            >
              <ChevronRight
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`}
              />
            </Button>
          </div>

          <nav className="space-y-2">
            {[
              { id: "control", icon: RotateCw, label: "SCANNER CONTROL" },
              { id: "hardware", icon: Cpu, label: "HARDWARE STATUS" },
              { id: "sessions", icon: Camera, label: "SCAN SESSIONS" },
              { id: "viewer", icon: Box, label: "3D MODEL VIEWER" },
              { id: "settings", icon: Settings, label: "SYSTEM SETTINGS" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                  activeSection === item.id
                    ? "bg-cyan-500 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <item.icon className="w-5 h-5 md:w-5 md:h-5 sm:w-6 sm:h-6" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {!sidebarCollapsed && (
            <div className="mt-8 p-4 bg-neutral-800 border border-neutral-700 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-cyan-400">SYSTEM READY</span>
              </div>
              <div className="text-xs text-neutral-500">
                <div>PC: CONNECTED</div>
                <div>PI: 192.168.1.100</div>
                <div>MOTOR: STANDBY</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? "md:ml-0" : ""}`}>
        {/* Top Toolbar */}
        <div className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-400">
              3D SCANNER / <span className="text-cyan-400">CONTROL PANEL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-neutral-500">LAST SCAN: 05/06/2025 20:00 UTC</div>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-cyan-400">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-cyan-400">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          {activeSection === "control" && <ScannerControlPage />}
          {activeSection === "hardware" && <HardwareStatusPage />}
          {activeSection === "sessions" && <ScanSessionsPage />}
          {activeSection === "viewer" && <ModelViewerPage />}
          {activeSection === "settings" && <SystemSettingsPage />}
        </div>
      </div>
    </div>
  )
}
