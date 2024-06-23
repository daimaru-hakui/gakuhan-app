import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { RiImageAddLine } from "react-icons/ri";
import { useState } from "react";
import MediaList from "./MediaList";
import MediaTarget from "./MediaTarget";
import MediaHeader from "./MediaHeader";

interface Props {
  text: string;
  handleClickImageSelect: (url: string) => void;
}

export interface MediaImage {
  id: string,
  url: string,
  path: string,
  fileName: string,
  uid: string;
  createdBy: string;
}

export default function MediaModal({ text, handleClickImageSelect }: Props) {
  const [mediaImage, setMediaImage] = useState<MediaImage>({
    id: "",
    url: "",
    path: "",
    fileName: "",
    uid: "",
    createdBy: ""
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'
          className="border-2 border-dotted w-full h-36 bg-muted flex flex-col shadow-none"
        >
          <RiImageAddLine size={36} className="text-gray-500" />
          <p className="mt-2 text-sm text-gray-500">{text}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[900px] max-h-[calc(100vh-240px)]" >
        <DialogHeader>
          <DialogTitle>画像</DialogTitle>
        </DialogHeader>
        <MediaHeader />
        <div className="grid grid-cols-[1fr_260px] gap-6">
          <MediaList
            mediaImage={mediaImage}
            setMediaImage={setMediaImage}
          />
          <MediaTarget
            mediaImage={mediaImage}
            handleClickImageSelect={handleClickImageSelect}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}