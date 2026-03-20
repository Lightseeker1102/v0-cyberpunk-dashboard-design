"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Cpu,
  Camera,
  RotateCw,
  Wifi,
  Thermometer,
  HardDrive,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Zap,
} from "lucide-react"

export default function HardwareStatusPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const devices = [
    {
      id: "PI-001",
      name: "Raspberry Pi 3 B+",
      type: "Controller",
      status: "online",
      ip: "192.168.1.100",
      port: "8000",
      cpu: 23,
      memory: 45,
      temp: 52,
      uptime: "3 days 14:22:05",
    },
    {
      id: "MTR-001",
      name: "Nema 17 Stepper Motor",
      type: "Actuator",
      status: "standby",
      driver: "TB6600",
      currentPosition: 0,
      stepsPerRev: 200,
      microstepping: 16,
    },
    {
      id: "CAM-001",
      name: "Raspberry Pi Camera v2",
      type: "Sensor",
      status: "ready",
      resolution: "4056x3040",
      interface: "libcamera",
      fps: 30,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "ready":
        return "bg-cyan-500/20 text-cyan-400"
      case "standby":
        return "bg-neutral-500/20 text-neutral-300"
      case "active":
        return "bg-emerald-500/20 text-emerald-400"
      case "error":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "ready":
        return <CheckCircle className="w-4 h-4 text-cyan-400" />
      case "standby":
        return <Activity className="w-4 h-4 text-neutral-400" />
      case "active":
        return <Zap className="w-4 h-4 text-emerald-400" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-neutral-400" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">HARDWARE STATUS</h1>
          <p className="text-sm text-neutral-400">Monitor and configure scanner hardware components</p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh Status
          </Button>
          <Button variant="outline" className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
            Diagnostics
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">DEVICES ONLINE</p>
                <p className="text-2xl font-bold text-white font-mono">3/3</p>
              </div>
              <CheckCircle className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">PI TEMPERATURE</p>
                <p className="text-2xl font-bold text-white font-mono">52°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">NETWORK LATENCY</p>
                <p className="text-2xl font-bold text-white font-mono">12ms</p>
              </div>
              <Wifi className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">PI STORAGE</p>
                <p className="text-2xl font-bold text-white font-mono">12.4GB</p>
              </div>
              <HardDrive className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Raspberry Pi Details */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <div>
                <CardTitle className="text-sm font-medium text-white tracking-wider">RASPBERRY PI 3 B+</CardTitle>
                <p className="text-xs text-neutral-400">Main Controller Unit</p>
              </div>
            </div>
            <Badge className={getStatusColor("online")}>ONLINE</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Network Info */}
            <div className="space-y-3">
              <h4 className="text-xs text-neutral-400 tracking-wider">NETWORK</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">IP Address:</span>
                  <span className="text-white font-mono">192.168.1.100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Port:</span>
                  <span className="text-white font-mono">8000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Protocol:</span>
                  <span className="text-white font-mono">HTTP/REST</span>
                </div>
              </div>
            </div>

            {/* CPU Usage */}
            <div className="space-y-3">
              <h4 className="text-xs text-neutral-400 tracking-wider">CPU USAGE</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Load</span>
                  <span className="text-white font-mono">23%</span>
                </div>
                <Progress value={23} className="h-2" />
                <div className="text-xs text-neutral-500">4 cores @ 1.4GHz</div>
              </div>
            </div>

            {/* Memory Usage */}
            <div className="space-y-3">
              <h4 className="text-xs text-neutral-400 tracking-wider">MEMORY</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Used</span>
                  <span className="text-white font-mono">450MB / 1GB</span>
                </div>
                <Progress value={45} className="h-2" />
                <div className="text-xs text-neutral-500">LPDDR2 RAM</div>
              </div>
            </div>

            {/* System Info */}
            <div className="space-y-3">
              <h4 className="text-xs text-neutral-400 tracking-wider">SYSTEM</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Uptime:</span>
                  <span className="text-white font-mono">3d 14:22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">OS:</span>
                  <span className="text-white font-mono">Raspbian</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Python:</span>
                  <span className="text-white font-mono">3.11.2</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motor and Camera Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motor Details */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RotateCw className="w-6 h-6 text-cyan-400" />
                <div>
                  <CardTitle className="text-sm font-medium text-white tracking-wider">NEMA 17 STEPPER MOTOR</CardTitle>
                  <p className="text-xs text-neutral-400">Rotation Control</p>
                </div>
              </div>
              <Badge className={getStatusColor("standby")}>STANDBY</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">DRIVER</div>
                <div className="text-white font-mono">TB6600</div>
              </div>
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">STEPS/REV</div>
                <div className="text-white font-mono">200</div>
              </div>
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">MICROSTEPPING</div>
                <div className="text-white font-mono">1/16</div>
              </div>
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">CURRENT POS</div>
                <div className="text-cyan-400 font-mono">0°</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-neutral-400 tracking-wider">GPIO PINS</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">STEP:</span>
                  <span className="text-white font-mono ml-2">GPIO 17</span>
                </div>
                <div className="p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">DIR:</span>
                  <span className="text-white font-mono ml-2">GPIO 27</span>
                </div>
                <div className="p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">EN:</span>
                  <span className="text-white font-mono ml-2">GPIO 22</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
                Test Motor
              </Button>
              <Button variant="outline" className="flex-1 border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
                Home Position
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Details */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-cyan-400" />
                <div>
                  <CardTitle className="text-sm font-medium text-white tracking-wider">RASPBERRY PI CAMERA V2</CardTitle>
                  <p className="text-xs text-neutral-400">Image Capture Module</p>
                </div>
              </div>
              <Badge className={getStatusColor("ready")}>READY</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">RESOLUTION</div>
                <div className="text-white font-mono">4056x3040</div>
              </div>
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">SENSOR</div>
                <div className="text-white font-mono">Sony IMX219</div>
              </div>
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">INTERFACE</div>
                <div className="text-white font-mono">libcamera</div>
              </div>
              <div className="p-3 bg-neutral-800 rounded">
                <div className="text-xs text-neutral-400 mb-1">FORMAT</div>
                <div className="text-white font-mono">JPEG</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-neutral-400 tracking-wider">CAPTURE SETTINGS</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">Exposure:</span>
                  <span className="text-white font-mono">Auto</span>
                </div>
                <div className="flex justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">ISO:</span>
                  <span className="text-white font-mono">Auto</span>
                </div>
                <div className="flex justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">AWB:</span>
                  <span className="text-white font-mono">Daylight</span>
                </div>
                <div className="flex justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-neutral-400">Quality:</span>
                  <span className="text-white font-mono">95%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
                Test Capture
              </Button>
              <Button variant="outline" className="flex-1 border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Test */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">CONNECTION TEST</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-800 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">PC to Pi Ping</span>
                <span className="text-emerald-400 font-mono text-sm">12ms</span>
              </div>
              <Progress value={100} className="h-1" />
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle className="w-3 h-3" />
                <span>Connection stable</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-800 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">API Health Check</span>
                <span className="text-emerald-400 font-mono text-sm">OK</span>
              </div>
              <Progress value={100} className="h-1" />
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle className="w-3 h-3" />
                <span>All endpoints responding</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-800 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Photo Upload Speed</span>
                <span className="text-cyan-400 font-mono text-sm">~2.5 MB/s</span>
              </div>
              <Progress value={85} className="h-1" />
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Activity className="w-3 h-3" />
                <span>Good throughput</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
