"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Box, Download, RotateCw, ZoomIn, ZoomOut, Maximize2, FileBox, Layers, Loader2 } from "lucide-react"

// Dynamically import the entire 3D viewer with SSR disabled
const ThreeViewer = dynamic(() => import("@/components/three-viewer"), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
})

function LoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
        <p className="text-neutral-400 text-sm">Loading 3D Viewer...</p>
      </div>
    </div>
  )
}

export default function ModelViewerPage() {
  const [selectedModel, setSelectedModel] = useState("SCAN-2025-001")
  const [autoRotate, setAutoRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)

  const models = [
    {
      id: "SCAN-2025-001",
      name: "Ceramic Vase",
      date: "2025-06-17",
      size: "12.4 MB",
      vertices: "125,432",
      faces: "248,920",
      format: "OBJ",
    },
    {
      id: "SCAN-2025-002",
      name: "Bronze Statue",
      date: "2025-06-16",
      size: "18.7 MB",
      vertices: "187,234",
      faces: "372,456",
      format: "STL",
    },
    {
      id: "SCAN-2025-005",
      name: "Wooden Figure",
      date: "2025-06-14",
      size: "9.8 MB",
      vertices: "98,234",
      faces: "194,512",
      format: "OBJ",
    },
    {
      id: "SCAN-2025-006",
      name: "Glass Ornament",
      date: "2025-06-13",
      size: "14.2 MB",
      vertices: "142,567",
      faces: "283,120",
      format: "STL",
    },
  ]

  const currentModel = models.find((m) => m.id === selectedModel) || models[0]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">3D MODEL VIEWER</h1>
          <p className="text-sm text-neutral-400">View and export scanned 3D models</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Model
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3D Viewer */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                {currentModel.name.toUpperCase()}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${autoRotate ? "text-cyan-400" : "text-neutral-400"} hover:text-cyan-400`}
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${wireframe ? "text-cyan-400" : "text-neutral-400"} hover:text-cyan-400`}
                  onClick={() => setWireframe(!wireframe)}
                >
                  <Layers className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-cyan-400">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-cyan-400">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-cyan-400">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800">
              <ThreeViewer autoRotate={autoRotate} />
            </div>

            <div className="mt-4 p-3 bg-neutral-800 rounded flex items-center justify-between text-xs">
              <div className="flex gap-4">
                <span className="text-neutral-400">
                  Drag to rotate | Scroll to zoom | Shift+Drag to pan
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-neutral-400">
                  Auto-rotate: <span className={autoRotate ? "text-cyan-400" : "text-neutral-500"}>
                    {autoRotate ? "ON" : "OFF"}
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Info & Selection */}
        <div className="lg:col-span-4 space-y-6">
          {/* Model Details */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">MODEL DETAILS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded flex items-center justify-center">
                  <Box className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{currentModel.name}</div>
                  <div className="text-xs text-cyan-400 font-mono">{currentModel.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-800 rounded">
                  <div className="text-xs text-neutral-400 mb-1">FILE SIZE</div>
                  <div className="text-white font-mono">{currentModel.size}</div>
                </div>
                <div className="p-3 bg-neutral-800 rounded">
                  <div className="text-xs text-neutral-400 mb-1">FORMAT</div>
                  <div className="text-white font-mono">{currentModel.format}</div>
                </div>
                <div className="p-3 bg-neutral-800 rounded">
                  <div className="text-xs text-neutral-400 mb-1">VERTICES</div>
                  <div className="text-white font-mono">{currentModel.vertices}</div>
                </div>
                <div className="p-3 bg-neutral-800 rounded">
                  <div className="text-xs text-neutral-400 mb-1">FACES</div>
                  <div className="text-white font-mono">{currentModel.faces}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-700 space-y-2">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download OBJ
                </Button>
                <Button variant="outline" className="w-full border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download STL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Model Selection */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">AVAILABLE MODELS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedModel === model.id
                        ? "bg-cyan-500/20 border border-cyan-500/50"
                        : "bg-neutral-800 hover:bg-neutral-700 border border-transparent"
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileBox
                          className={`w-5 h-5 ${selectedModel === model.id ? "text-cyan-400" : "text-neutral-500"}`}
                        />
                        <div>
                          <div className="text-sm text-white">{model.name}</div>
                          <div className="text-xs text-neutral-500 font-mono">{model.date}</div>
                        </div>
                      </div>
                      <Badge className="bg-neutral-700 text-neutral-300">{model.format}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
