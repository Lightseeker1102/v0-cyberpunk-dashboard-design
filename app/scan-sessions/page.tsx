"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Camera, Clock, Box, CheckCircle, XCircle, Loader2, Download, Eye, Trash2 } from "lucide-react"

export default function ScanSessionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[0] | null>(null)

  const sessions = [
    {
      id: "SCAN-2025-001",
      name: "Ceramic Vase",
      status: "complete",
      date: "2025-06-17 14:32",
      photos: 36,
      duration: "4m 23s",
      modelSize: "12.4 MB",
      vertices: "125,432",
      faces: "248,920",
      outputFormat: "OBJ",
    },
    {
      id: "SCAN-2025-002",
      name: "Bronze Statue",
      status: "complete",
      date: "2025-06-16 10:15",
      photos: 48,
      duration: "6m 12s",
      modelSize: "18.7 MB",
      vertices: "187,234",
      faces: "372,456",
      outputFormat: "STL",
    },
    {
      id: "SCAN-2025-003",
      name: "Mechanical Part",
      status: "processing",
      date: "2025-06-17 16:45",
      photos: 36,
      duration: "3m 58s",
      progress: 67,
      outputFormat: "OBJ",
    },
    {
      id: "SCAN-2025-004",
      name: "Art Sculpture",
      status: "failed",
      date: "2025-06-15 09:22",
      photos: 24,
      duration: "2m 45s",
      error: "Photogrammetry failed: Insufficient feature points",
      outputFormat: "OBJ",
    },
    {
      id: "SCAN-2025-005",
      name: "Wooden Figure",
      status: "complete",
      date: "2025-06-14 15:30",
      photos: 36,
      duration: "4m 10s",
      modelSize: "9.8 MB",
      vertices: "98,234",
      faces: "194,512",
      outputFormat: "OBJ",
    },
    {
      id: "SCAN-2025-006",
      name: "Glass Ornament",
      status: "complete",
      date: "2025-06-13 11:45",
      photos: 48,
      duration: "5m 34s",
      modelSize: "14.2 MB",
      vertices: "142,567",
      faces: "283,120",
      outputFormat: "STL",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-emerald-500/20 text-emerald-400"
      case "processing":
        return "bg-amber-500/20 text-amber-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4" />
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin" />
      case "failed":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredSessions = sessions.filter(
    (session) =>
      session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: sessions.length,
    complete: sessions.filter((s) => s.status === "complete").length,
    processing: sessions.filter((s) => s.status === "processing").length,
    failed: sessions.filter((s) => s.status === "failed").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SCAN SESSIONS</h1>
          <p className="text-sm text-neutral-400">View and manage scanning history</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Export All</Button>
          <Button variant="outline" className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
            Clear History
          </Button>
        </div>
      </div>

      {/* Stats and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL SCANS</p>
                <p className="text-2xl font-bold text-white font-mono">{stats.total}</p>
              </div>
              <Camera className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">COMPLETED</p>
                <p className="text-2xl font-bold text-emerald-400 font-mono">{stats.complete}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">PROCESSING</p>
                <p className="text-2xl font-bold text-amber-400 font-mono">{stats.processing}</p>
              </div>
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SCAN HISTORY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">SESSION</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">NAME</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">DATE</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">PHOTOS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">DURATION</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">FORMAT</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session, index) => (
                  <tr
                    key={session.id}
                    className={`border-b border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-850"
                    }`}
                    onClick={() => setSelectedSession(session)}
                  >
                    <td className="py-3 px-4 text-sm text-cyan-400 font-mono">{session.id}</td>
                    <td className="py-3 px-4 text-sm text-white">{session.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(session.status)}
                        <Badge className={getStatusColor(session.status)}>{session.status.toUpperCase()}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-300 font-mono">{session.date}</td>
                    <td className="py-3 px-4 text-sm text-white font-mono">{session.photos}</td>
                    <td className="py-3 px-4 text-sm text-neutral-300 font-mono">{session.duration}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-neutral-700 text-neutral-300">{session.outputFormat}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {session.status === "complete" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-neutral-400 hover:text-cyan-400"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-neutral-400 hover:text-emerald-400"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-neutral-400 hover:text-red-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-white tracking-wider">{selectedSession.name}</CardTitle>
                <p className="text-sm text-cyan-400 font-mono">{selectedSession.id}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedSession(null)}
                className="text-neutral-400 hover:text-white"
              >
                X
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                {getStatusIcon(selectedSession.status)}
                <Badge className={getStatusColor(selectedSession.status)}>
                  {selectedSession.status.toUpperCase()}
                </Badge>
              </div>

              {selectedSession.status === "processing" && selectedSession.progress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Processing Progress</span>
                    <span className="text-amber-400 font-mono">{selectedSession.progress}%</span>
                  </div>
                  <Progress value={selectedSession.progress} className="h-2" />
                </div>
              )}

              {selectedSession.status === "failed" && selectedSession.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                  <div className="text-sm text-red-400">{selectedSession.error}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">DATE</p>
                  <p className="text-sm text-white font-mono">{selectedSession.date}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">DURATION</p>
                  <p className="text-sm text-white font-mono">{selectedSession.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">PHOTOS</p>
                  <p className="text-sm text-white font-mono">{selectedSession.photos}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 tracking-wider mb-1">OUTPUT FORMAT</p>
                  <p className="text-sm text-white font-mono">{selectedSession.outputFormat}</p>
                </div>
              </div>

              {selectedSession.status === "complete" && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-700">
                  <div>
                    <p className="text-xs text-neutral-400 tracking-wider mb-1">MODEL SIZE</p>
                    <p className="text-sm text-cyan-400 font-mono">{selectedSession.modelSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 tracking-wider mb-1">VERTICES</p>
                    <p className="text-sm text-white font-mono">{selectedSession.vertices}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 tracking-wider mb-1">FACES</p>
                    <p className="text-sm text-white font-mono">{selectedSession.faces}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                {selectedSession.status === "complete" && (
                  <>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      <Box className="w-4 h-4 mr-2" />
                      View 3D Model
                    </Button>
                    <Button variant="outline" className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                {selectedSession.status === "failed" && (
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Retry Scan</Button>
                )}
                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20 bg-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
