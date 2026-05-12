import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@livfit/ui";
import { Plus, BookOpen, Edit, Trash2 } from "lucide-react";

const blogPosts = [
  { id: 1, title: "10 Tips for Liver Health", author: "Dr. Aris", status: "Published", date: "2024-05-10" },
  { id: 2, title: "Nutrition Myths Debunked", author: "Dr. Meena", status: "Draft", date: "2024-05-08" },
  { id: 3, title: "Exercise for Chronic Disease", author: "Dr. Aris", status: "Published", date: "2024-05-05" },
];

export default function BlogManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage education content for patients.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">by {post.author} • {post.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={post.status === 'Published' ? 'secondary' : 'outline'}>
                  {post.status}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
