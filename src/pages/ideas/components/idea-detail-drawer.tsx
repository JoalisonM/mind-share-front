import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_IDEA } from "@/graphql/queries/idea";
import { useEffect, useState, type ComponentProps } from "react";
import type { Idea } from "@/dtos/idea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CommentsList } from "./comments-list";
import { CommentArea } from "./comment-area";
import { CREATE_COMMENT } from "@/graphql/mutations/comment";
import { toast } from "sonner";
import { TOGGLE_VOTE } from "@/graphql/mutations/vote";
import { DialogTitle } from "@/components/ui/dialog";

type IdeaDetailDrawerProps = ComponentProps<typeof Drawer> & {
  ideaId: string | null;
};

export function IdeaDetailDrawer({
  open,
  onOpenChange,
  ideaId,
}: IdeaDetailDrawerProps) {
  const [commentContent, setCommentContent] = useState("");

  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_IDEA, variables: { ideaId } }],
    onCompleted: () => {
      setCommentContent("");
    },
  });

  const [toggleVoteMutation] = useMutation(TOGGLE_VOTE, {
    refetchQueries: [{ query: GET_IDEA, variables: { ideaId } }],
  });

  const [getIdeaQuery, { data, loading }] = useLazyQuery<{ getIdea: Idea }>(
    GET_IDEA,
  );

  useEffect(() => {
    getIdeaQuery({
      variables: {
        ideaId,
      },
    });
  }, [ideaId]);

  const handleToggleVote = () => {
    toggleVoteMutation({
      variables: {
        ideaId,
      },
    });
  };

  const handleAddComment = () => {
    if (!commentContent) toast.error("Por favor insira um comentário");

    createCommentMutation({
      variables: {
        ideaId,
        data: {
          content: commentContent,
        },
      },
    });
  };

  const { getIdea: idea } = data || {};

  console.log("idea: ", idea);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="flex flex-col h-screen min-w-2xl">
        <div className="shrink-0 p-8 pt-10 bg-gray-100 ">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold pr-4 flex-1">
              {idea?.title || "Carregando..."}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange?.(false)}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {idea && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {idea?.description || ""}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <CommentsList comments={idea?.comments || []} loading={loading} />
        </div>

        <CommentArea
          commentContent={commentContent || ""}
          setCommentContent={setCommentContent}
          handleAddComment={handleAddComment}
          handleVote={handleToggleVote}
          idea={idea}
        />
      </DrawerContent>
    </Drawer>
  );
}
