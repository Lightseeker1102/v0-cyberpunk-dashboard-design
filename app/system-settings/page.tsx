"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RotateCcw, Wifi, Camera, RotateCw, Cpu, FolderOpen, Terminal } from "lucide-react"

export default function SystemSettingsPage() {
  const [piIp, setPiIp] = useState("192.168.1.100")
  const [piPort, setPiPort] = useState("8000")
  const [pcPort, setPcPort] = useState("3001")
  const [totalSteps, setTotalSteps] = useState(36)
  const [motorSpeed, setMotorSpeed] = useState(200)
  const [photoDelay, setPhotoDelay] = useState(500)
  const [resolution, setResolution] = useState("4056x3040")
  const [outputFormat, setOutputFormat] = useState("obj")
  const [autoProcess, setAutoProcess] = useState(true)
  const [saveRawPhotos, setSaveRawPhotos] = useState(true)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SYSTEM SETTINGS</h1>
          <p className="text-sm text-neutral-400">Configure scanner parameters and connections</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button variant="outline" className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Defaults
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Configuration */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-cyan-400" />
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                NETWORK CONFIGURATION
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pi-ip" className="text-neutral-400 text-sm">
                  Raspberry Pi IP Address
                </Label>
                <Input
                  id="pi-ip"
                  value={piIp}
                  onChange={(e) => setPiIp(e.target.value)}
                  className="bg-neutral-800 border-neutral-600 text-white font-mono"
                  placeholder="192.168.1.100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pi-port" className="text-neutral-400 text-sm">
                  Raspberry Pi Port
                </Label>
                <Input
                  id="pi-port"
                  value={piPort}
                  onChange={(e) => setPiPort(e.target.value)}
                  className="bg-neutral-800 border-neutral-600 text-white font-mono"
                  placeholder="8000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pc-port" className="text-neutral-400 text-sm">
                  PC Backend Port
                </Label>
                <Input
                  id="pc-port"
                  value={pcPort}
                  onChange={(e) => setPcPort(e.target.value)}
                  className="bg-neutral-800 border-neutral-600 text-white font-mono"
                  placeholder="3001"
                />
              </div>
            </div>

            <div className="p-3 bg-neutral-800 rounded space-y-2">
              <div className="text-xs text-neutral-400 tracking-wider">API ENDPOINTS</div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Pi Start Scan:</span>
                  <span className="text-cyan-400">http://{piIp}:{piPort}/start</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">PC Photo Upload:</span>
                  <span className="text-cyan-400">http://localhost:{pcPort}/upload</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">PC Status:</span>
                  <span className="text-cyan-400">http://localhost:{pcPort}/status</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent">
              Test Connection
            </Button>
          </CardContent>
        </Card>

        {/* Motor Configuration */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <RotateCw className="w-5 h-5 text-cyan-400" />
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                MOTOR CONFIGURATION
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-neutral-400 text-sm">Rotation Steps (Photos)</Label>
                  <span className="text-cyan-400 font-mono">{totalSteps}</span>
                </div>
                <Slider
                  value={[totalSteps]}
                  onValueChange={([value]) => setTotalSteps(value)}
                  min={12}
                  max={72}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>12 (30° steps)</span>
                  <span>72 (5° steps)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-neutral-400 text-sm">Motor Speed (steps/sec)</Label>
                  <span className="text-cyan-400 font-mono">{motorSpeed}</span>
                </div>
                <Slider
                  value={[motorSpeed]}
                  onValueChange={([value]) => setMotorSpeed(value)}
                  min={50}
                  max={500}
                  step={10}
                  className="py-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-neutral-400 text-sm">Photo Delay (ms)</Label>
                  <span className="text-cyan-400 font-mono">{photoDelay}ms</span>
                </div>
                <Slider
                  value={[photoDelay]}
                  onValueChange={([value]) => setPhotoDelay(value)}
                  min={100}
                  max={2000}
                  step={50}
                  className="py-2"
                />
              </div>
            </div>

            <div className="p-3 bg-neutral-800 rounded">
              <div className="text-xs text-neutral-400 tracking-wider mb-2">CALCULATED VALUES</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Step Angle:</span>
                  <span className="text-white font-mono">{(360 / totalSteps).toFixed(1)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Est. Time:</span>
                  <span className="text-white font-mono">
                    {Math.ceil((totalSteps * (photoDelay + 500)) / 1000)}s
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Configuration */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-cyan-400" />
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                CAMERA CONFIGURATION
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neutral-400 text-sm">Resolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-600">
                    <SelectItem value="4056x3040">4056 x 3040 (Full)</SelectItem>
                    <SelectItem value="3280x2464">3280 x 2464 (High)</SelectItem>
                    <SelectItem value="1920x1080">1920 x 1080 (HD)</SelectItem>
                    <SelectItem value="1280x720">1280 x 720 (720p)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-sm">Exposure</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="bright">Bright</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-neutral-400 text-sm">White Balance</Label>
                  <Select defaultValue="daylight">
                    <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="daylight">Daylight</SelectItem>
                      <SelectItem value="tungsten">Tungsten</SelectItem>
                      <SelectItem value="fluorescent">Fluorescent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-400 text-sm">Save Raw Photos</Label>
                  <p className="text-xs text-neutral-500">Keep original JPEGs after processing</p>
                </div>
                <Switch checked={saveRawPhotos} onCheckedChange={setSaveRawPhotos} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Configuration */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                PHOTOGRAMMETRY SETTINGS
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neutral-400 text-sm">Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-600">
                    <SelectItem value="obj">OBJ (Wavefront)</SelectItem>
                    <SelectItem value="stl">STL (Stereolithography)</SelectItem>
                    <SelectItem value="ply">PLY (Polygon File)</SelectItem>
                    <SelectItem value="fbx">FBX (Autodesk)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-neutral-400 text-sm">Processing Engine</Label>
                <Select defaultValue="meshroom">
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-600">
                    <SelectItem value="meshroom">Meshroom (AliceVision)</SelectItem>
                    <SelectItem value="colmap">COLMAP</SelectItem>
                    <SelectItem value="openmvs">OpenMVS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neutral-400 text-sm">Auto-Process After Scan</Label>
                  <p className="text-xs text-neutral-500">Automatically start 3D reconstruction</p>
                </div>
                <Switch checked={autoProcess} onCheckedChange={setAutoProcess} />
              </div>
            </div>

            <div className="p-3 bg-neutral-800 rounded space-y-2">
              <div className="text-xs text-neutral-400 tracking-wider">MESHROOM PATH</div>
              <div className="flex gap-2">
                <Input
                  defaultValue="C:\Program Files\Meshroom\meshroom_batch.exe"
                  className="bg-neutral-700 border-neutral-600 text-white font-mono text-xs"
                  readOnly
                />
                <Button variant="outline" size="icon" className="border-neutral-600 text-neutral-400 hover:bg-neutral-700 bg-transparent">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GPIO Pin Configuration */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              GPIO PIN CONFIGURATION
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label className="text-neutral-400 text-sm">STEP Pin</Label>
              <Select defaultValue="17">
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  <SelectItem value="17">GPIO 17</SelectItem>
                  <SelectItem value="18">GPIO 18</SelectItem>
                  <SelectItem value="27">GPIO 27</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-400 text-sm">DIR Pin</Label>
              <Select defaultValue="27">
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  <SelectItem value="22">GPIO 22</SelectItem>
                  <SelectItem value="27">GPIO 27</SelectItem>
                  <SelectItem value="23">GPIO 23</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-400 text-sm">ENABLE Pin</Label>
              <Select defaultValue="22">
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  <SelectItem value="22">GPIO 22</SelectItem>
                  <SelectItem value="23">GPIO 23</SelectItem>
                  <SelectItem value="24">GPIO 24</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-400 text-sm">Microstepping</Label>
              <Select defaultValue="16">
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  <SelectItem value="1">Full Step (1)</SelectItem>
                  <SelectItem value="2">Half Step (1/2)</SelectItem>
                  <SelectItem value="4">Quarter (1/4)</SelectItem>
                  <SelectItem value="8">Eighth (1/8)</SelectItem>
                  <SelectItem value="16">Sixteenth (1/16)</SelectItem>
                  <SelectItem value="32">1/32</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-400 text-sm">Steps/Revolution</Label>
              <Input
                defaultValue="200"
                className="bg-neutral-800 border-neutral-600 text-white font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-400 text-sm">Direction</Label>
              <Select defaultValue="cw">
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  <SelectItem value="cw">Clockwise</SelectItem>
                  <SelectItem value="ccw">Counter-CW</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
