import { Card, CardContent, CardHeader, CardTitle, Button, YoutubePlayer } from "@livfit/ui";
import { Plus, Video, Trash2 } from "lucide-react";

const videos = [
  { id: 1, title: "Gentle Morning Stretch", category: "Exercise", youtubeId: "dQw4w9WgXcQ", isShort: false },
  { id: 2, title: "Quick Liver Fact", category: "Education", youtubeId: "EngW7tLk6R8", isShort: true },
  { id: 3, title: "Low Sodium Cooking", category: "Nutrition", youtubeId: "9bZkp7q19f0", isShort: false },
];

export default function VideoManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
          <p className="text-muted-foreground mt-1">Manage clinical video content via YouTube embeds.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add YouTube Video
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <YoutubePlayer 
              videoId={video.youtubeId} 
              title={video.title} 
              isVertical={video.isShort}
              className="rounded-none" 
            />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{video.title}</h3>
                  <p className="text-xs text-muted-foreground uppercase mt-1">{video.category}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
