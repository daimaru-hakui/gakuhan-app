"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { MediaImage } from "./MediaModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase/client";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";

interface Props {
  mediaImage: MediaImage | null;
  setMediaImage: (value: MediaImage | null) => void;
  handleClickImageSelect: (url: string) => void;
}

export default function MediaTarget({
  mediaImage,
  setMediaImage,
  handleClickImageSelect,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClickImageDelete() {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    if (!mediaImage) return;
    setLoading(true);
    try {
      const mediaRef = doc(db, "media", mediaImage.id);
      await deleteDoc(mediaRef);
      const desertRef = ref(storage, mediaImage.path);
      await deleteObject(desertRef);
      new Promise((resolve) => setTimeout(resolve, 2000));
      setMediaImage(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <LuLoader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-3 p-3 pt-0 overflow-auto max-h-[calc(100vh-200px)]">
      {!mediaImage ? (
        <div className="text-center">No Image</div>
      ) : (
        <>
          <div className="w-full">
            <Image
              src={mediaImage.url}
              width={150}
              height={150}
              alt={mediaImage.fileName}
              className="w-full object-cover"
            />
          </div>
          <dl className="grid grid-cols-[80px_1fr] text-sm">
            <dt className="text-sm">CreatedAt</dt>
            <dd>2024年6月24日</dd>
            <dt className="text-sm">Author</dt>
            <dd>{mediaImage.createdBy}</dd>
          </dl>
          <div className="flex w-full gap-3">
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-400"
              onClick={handleClickImageDelete}
            >
              削除
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => handleClickImageSelect(mediaImage.url)}
            >
              この画像を使用する
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
