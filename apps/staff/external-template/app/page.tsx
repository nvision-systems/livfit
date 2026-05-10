import { Card, CardContent, CardHeader, CardTitle, Button } from "@livfit/ui";

export default function ExternalTemplatePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">External Vendor Template</h1>
        <p className="text-muted-foreground">
          Use this as a boilerplate for new staff-facing applications.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to LivFit Ecosystem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This app is pre-configured with:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Shared UI Components from <code>@livfit/ui</code></li>
            <li>Core logic and types from <code>@livfit/lib</code></li>
            <li>Consistent Tailwind CSS theme</li>
          </ul>
          <div className="pt-4">
            <Button>Explore Components</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
