"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Square, RotateCw, Camera, Cpu, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"

export default function Home() {
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "processing" | "complete">("idle")
  const [photosReceived, setPhotosReceived] = useState(0)
  const [totalPhotos, setTotalPhotos] = useState(36)
  const [currentStep, setCurrentStep] = useState(0)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [logs, setLogs] = useState<Array<{ time: string; message: string; type: string }>>([
    { time: "10:45:23", message: "System initialized", type: "info" },
    { time: "10:45:24", message: "Raspberry Pi connection established", type: "success" },
    { time: "10:45:25", message: "Motor driver TB6600 ready", type: "success" },
    { time: "10:45:26", message: "Camera libcamera initialized", type: "success" },
    { time: "10:45:27", message: "Awaiting scan command...", type: "info" },
  ])

  const addLog = (message: string, type: string) => {
    const now = new Date()
    const time = now.toTimeString().split(" ")[0]
    setLogs((prev) => [...prev, { time, message, type }])
  }

  const startScan = () => {
    setScanStatus("scanning")
    setPhotosReceived(0)
    setCurrentStep(0)
    addLog("Scan initiated - sending trigger to Raspberry Pi", "info")
    addLog("POST /api/start-scan -> 192.168.1.100:8000", "info")
  }

  const stopScan = () => {
    setScanStatus("idle")
    addLog("Scan aborted by user", "warning")
  }

  // Simulate photo capture process
  useEffect(() => {
    if (scanStatus === "scanning" && photosReceived < totalPhotos) {
      const interval = setInterval(() => {
        setPhotosReceived((prev) => {
          const newCount = prev + 1
          setCurrentStep(newCount)
          addLog(`Photo ${newCount}/${totalPhotos} received from Pi`, "success")
          addLog(`Motor step ${newCount * 10}° complete`, "info")

          if (newCount >= totalPhotos) {
            setScanStatus("processing")
            addLog("All photos received - starting photogrammetry", "info")
            addLog("Triggering Meshroom/AliceVision CLI...", "info")
          }
          return newCount
        })
      }, 800)
      return () => clearInterval(interval)
    }
  }, [scanStatus, photosReceived, totalPhotos])

  // Simulate 3D processing
  useEffect(() => {
    if (scanStatus === "processing" && processingProgress < 100) {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            setScanStatus("complete")
            addLog("3D model generation complete!", "success")
            addLog("Output: /models/scan_001.obj", "success")
          }
          return Math.min(newProgress, 100)
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [scanStatus, processingProgress])

  const getStatusColor = () => {
    switch (scanStatus) {
      case "idle":
        return "bg-neutral-500"
      case "scanning":
        return "bg-cyan-500"
      case "processing":
        return "bg-amber-500"
      case "complete":
        return "bg-emerald-500"
    }
  }

  const getStatusText = () => {
    switch (scanStatus) {
      case "idle":
        return "STANDBY"
      case "scanning":
        return "SCANNING"
      case "processing":
        return "PROCESSING"
      case "complete":
        return "COMPLETE"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scan Control Panel */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SCAN CONTROL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Indicator */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className={`w-32 h-32 rounded-full ${getStatusColor()} opacity-20 animate-pulse absolute inset-0`}
                ></div>
                <div
                  className={`w-32 h-32 rounded-full ${getStatusColor()} flex items-center justify-center relative`}
                >
                  {scanStatus === "scanning" && <RotateCw className="w-12 h-12 text-white animate-spin" />}
                  {scanStatus === "processing" && <Loader2 className="w-12 h-12 text-white animate-spin" />}
                  {scanStatus === "idle" && <Camera className="w-12 h-12 text-white" />}
                  {scanStatus === "complete" && <CheckCircle className="w-12 h-12 text-white" />}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white font-mono">{getStatusText()}</div>
              <div className="text-xs text-neutral-500 mt-1">Current scanner state</div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={startScan}
                disabled={scanStatus === "scanning" || scanStatus === "processing"}
              >
                <Play className="w-4 h-4 mr-2" />
                START SCAN
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/20 bg-transparent"
                onClick={stopScan}
                disabled={scanStatus === "idle" || scanStatus === "complete"}
              >
                <Square className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-neutral-800 rounded">
                <div className="text-2xl font-bold text-white font-mono">{totalPhotos}</div>
                <div className="text-xs text-neutral-500">Total Steps</div>
              </div>
              <div className="text-center p-3 bg-neutral-800 rounded">
                <div className="text-2xl font-bold text-cyan-400 font-mono">10°</div>
                <div className="text-xs text-neutral-500">Step Angle</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Progress */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PHOTO CAPTURE PROGRESS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 text-sm">Photos Received</span>
              <span className="text-white font-mono text-lg">
                {photosReceived}/{totalPhotos}
              </span>
            </div>

            <Progress value={(photosReceived / totalPhotos) * 100} className="h-3" />

            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: totalPhotos }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded text-xs flex items-center justify-center font-mono ${
                    i < photosReceived
                      ? "bg-cyan-500 text-white"
                      : i === photosReceived && scanStatus === "scanning"
                        ? "bg-cyan-500/50 text-white animate-pulse"
                        : "bg-neutral-800 text-neutral-600"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {scanStatus === "scanning" && (
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <Camera className="w-4 h-4" />
                  <span>Capturing photo {photosReceived + 1}...</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">Motor position: {currentStep * 10}°</div>
              </div>
            )}

            {scanStatus === "processing" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">3D Processing</span>
                  <span className="text-amber-400 font-mono">{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} className="h-2" />
                <div className="text-xs text-neutral-500">Running Meshroom photogrammetry...</div>
              </div>
            )}

            {scanStatus === "complete" && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded">
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>3D Model Ready!</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">View in 3D Model Viewer tab</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hardware Quick Status */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">HARDWARE STATUS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Raspberry Pi 3 B+",
                status: "connected",
                detail: "192.168.1.100:8000",
                icon: Cpu,
              },
              {
                name: "Nema 17 Motor",
                status: scanStatus === "scanning" ? "active" : "standby",
                detail: "TB6600 Driver",
                icon: RotateCw,
              },
              {
                name: "Camera Module",
                status: scanStatus === "scanning" ? "capturing" : "ready",
                detail: "libcamera",
                icon: Camera,
              },
            ].map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <device.icon
                    className={`w-5 h-5 ${
                      device.status === "connected" || device.status === "ready"
                        ? "text-cyan-400"
                        : device.status === "active" || device.status === "capturing"
                          ? "text-emerald-400 animate-pulse"
                          : "text-neutral-500"
                    }`}
                  />
                  <div>
                    <div className="text-sm text-white">{device.name}</div>
                    <div className="text-xs text-neutral-500">{device.detail}</div>
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    device.status === "connected" || device.status === "ready"
                      ? "bg-cyan-400"
                      : device.status === "active" || device.status === "capturing"
                        ? "bg-emerald-400 animate-pulse"
                        : "bg-neutral-500"
                  }`}
                ></div>
              </div>
            ))}

            <div className="pt-2 border-t border-neutral-700">
              <div className="text-xs text-neutral-500 mb-2">API ENDPOINTS</div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-400">PC Backend:</span>
                  <span className="text-white">localhost:3001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Pi Worker:</span>
                  <span className="text-white">192.168.1.100:8000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SYSTEM LOG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-xs">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-2 rounded ${
                    log.type === "success"
                      ? "bg-emerald-500/10"
                      : log.type === "warning"
                        ? "bg-amber-500/10"
                        : log.type === "error"
                          ? "bg-red-500/10"
                          : "bg-neutral-800/50"
                  }`}
                >
                  <span className="text-neutral-500">[{log.time}]</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "warning"
                          ? "text-amber-400"
                          : log.type === "error"
                            ? "text-red-400"
                            : "text-neutral-300"
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scan Configuration */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SCAN CONFIGURATION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Rotation Steps</span>
                <span className="text-white font-mono">{totalPhotos}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Step Angle</span>
                <span className="text-white font-mono">10°</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Motor Speed</span>
                <span className="text-white font-mono">200 steps/s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Photo Delay</span>
                <span className="text-white font-mono">500ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Resolution</span>
                <span className="text-white font-mono">4056x3040</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Output Format</span>
                <span className="text-white font-mono">OBJ/STL</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
