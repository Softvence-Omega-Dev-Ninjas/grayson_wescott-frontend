import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";

export function VideoLibrary() {
  const sortOptions = [
    { value: "notes", label: "Notes" },
    { value: "date", label: "Date" },
    { value: "name", label: "Name" },
  ];

  const qualityOptions = [
    { value: "auto", label: "Auto" },
    { value: "1080p", label: "1080p" },
    { value: "720p", label: "720p" },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <Play className="w-4 h-4" />
          Video Library
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm">Default Sort</label>
          <Select defaultValue="notes">
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {sortOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Autoplay</p>
            <p className="text-gray-400 text-xs">
              Automatically play next video
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Video Quality</label>
          <Select defaultValue="auto">
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {qualityOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
