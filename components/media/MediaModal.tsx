import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RiImageAddLine } from "react-icons/ri";
import { useState } from "react";
import MediaList from "./MediaList";
import MediaTarget from "./MediaTarget";
import MediaHeader from "./MediaHeader";
import { Timestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  handleClickImageSelect: (url: string) => void;
}

export interface MediaImage {
  id: string;
  url: string;
  path: string;
  fileName: string;
  contentType: string;
  uid: string;
  size: number;
  displayName: string;
  createdAt: Timestamp | null;
  createdBy: string;
}

export default function MediaModal({ text, handleClickImageSelect }: Props) {
  const [mediaImage, setMediaImage] = useState<MediaImage | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-2 border-dotted w-full h-36 bg-muted flex flex-col shadow-none"
        >
          <RiImageAddLine size={36} className="text-gray-500" />
          <p className="mt-2 text-sm text-gray-500">{text}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1300px] max-h-[calc(100vh-40px)]">
        <DialogHeader>
          <DialogTitle>画像</DialogTitle>
        </DialogHeader>
        <MediaHeader />
        <div
          className={cn(
            "grid gap-6",
            mediaImage
              ? "grid-cols-[1fr_250px] md:grid-cols-[1fr_300px]"
              : "grid-cols-[1fr] md:grid-cols-[1fr]"
          )}
        >
          <MediaList mediaImage={mediaImage} setMediaImage={setMediaImage} />
          {mediaImage && (
            <MediaTarget
              mediaImage={mediaImage}
              setMediaImage={setMediaImage}
              handleClickImageSelect={handleClickImageSelect}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
