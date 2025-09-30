import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NoteTip {
  id: string;
  author: string;
  avatar: string;
  content: string;
  role?: string;
}

interface NotesTipsProps {
  notes: NoteTip[];
}

export function NotesTips({ notes }: NotesTipsProps) {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-white">Notes & Tips</h3>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-primary-200 border border-secondary  p-4"
          >
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={note.avatar || "/placeholder.svg"}
                  alt={note.author}
                />
                <AvatarFallback>{note.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">
                    {note.author}
                  </span>
                  {note.role && (
                    <span className="text-blue-400 text-xs">{note.role}</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{note.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
