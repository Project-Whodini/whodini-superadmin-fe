import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopEntity } from "@shared/schema";

interface TopEntitiesProps {
  entities: TopEntity[];
}

export function TopEntities({ entities }: TopEntitiesProps) {
  return (
    <Card className="col-span-1 shadow-sm border-none h-full">
      <CardHeader>
        <CardTitle className="text-lg font-display">Top Entities by Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {entities.map((entity, i) => (
          <div key={entity.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                  <AvatarImage src={entity.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${entity.name}`} />
                  <AvatarFallback>{entity.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white text-[10px] font-bold text-orange-600">
                  {i + 1}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{entity.name}</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-primary">{entity.activityScore}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Actions</span>
            </div>
          </div>
        ))}
        {entities.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No entities found</p>
        )}
      </CardContent>
    </Card>
  );
}
