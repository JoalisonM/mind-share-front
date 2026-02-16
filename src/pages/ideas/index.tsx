import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CalendarPlus,
  Lightbulb,
  MessageSquare,
  Plus,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { CreateIdeaDialog } from "./components/create-idea-dialog";
import { useQuery } from "@apollo/client/react";
import { LIST_IDEAS } from "@/graphql/queries/idea";
import type { Idea } from "@/dtos/idea";
import { IdeaCard } from "./components/idea-card";

export function Ideas() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

  const { data } = useQuery<{ listIdeas: Idea[] }>(LIST_IDEAS);

  const ideas = data?.listIdeas || [];

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setOpenDrawer(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-medium text-purple-600">Ideias</h1>
          <div className="flex items-center gap-2 text-gray-900">
            <div className="flex items-center gap-3 px-2 rounded-lg bg-purple-200">
              <Lightbulb className="h-4 w-4" />
              <div>
                <strong>2</strong> ideias
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 rounded-lg bg-indigo-200">
              <MessageSquare className="h-4 w-4" />
              <div>
                <strong>6</strong> comentários
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 rounded-lg bg-green-200">
              <ThumbsUp className="h-4 w-4" />
              <div>
                <strong>18</strong> votos
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Label>Ordenar por: </Label>
            <Button variant="outline">
              <CalendarPlus className="h-4 w-4" />
              Mais recentes
            </Button>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4" /> Nova ideia
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onClick={() => handleIdeaClick(idea.id)}
          />
        ))}
      </div>

      <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
}
