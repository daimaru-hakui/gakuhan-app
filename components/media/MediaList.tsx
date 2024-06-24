import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MediaImage } from "./MediaModal";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/client";
import { useStore } from "@/store";
import { format } from "date-fns";
import { getfileCapacity } from "@/utils/calc";
import EmptyList from "../EmptyList";

interface Props {
  mediaImage: MediaImage | null;
  setMediaImage: (image: MediaImage) => void;
}

export default function MediaList({ mediaImage, setMediaImage }: Props) {
  const [images, setImages] = useState<MediaImage[]>();
  const user = useStore((state) => state.user);

  useEffect(() => {
    const mediaRef = collection(db, "media");
    if (!user) return;
    const q = query(
      mediaRef,
      orderBy("createdAt", "desc"),
      where("uid", "==", user.uid)
    );
    onSnapshot(q, {
      next: (snapshot) => {
        setImages(
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as MediaImage)
          )
        );
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }, [user]);

  function handleClickMedia(image: MediaImage) {
    setMediaImage(image);
  }

  if (images?.length === 0 || !images)
    return <EmptyList text="画像が見つかりませんでした。" />;

  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      <Table>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="min-w-[100px]">画像</TableHead>
            <TableHead className="min-w-[100px]">ファイル名</TableHead>
            <TableHead className="min-w-[100px]">形式</TableHead>
            <TableHead className="min-w-[100px]">容量</TableHead>
            <TableHead className="min-w-[200px]">作成者</TableHead>
            <TableHead className="min-w-[200px]">作成日時</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((image) => (
            <TableRow
              key={image.id}
              onClick={() => handleClickMedia(image)}
              className={cn(
                "cursor-pointer",
                image.id === mediaImage?.id ? "bg-primary-foreground" : ""
              )}
            >
              <TableCell className="font-medium">
                <Image
                  src={image.url}
                  width={100}
                  height={100}
                  alt={image.fileName}
                />
              </TableCell>
              <TableCell>{image.fileName}</TableCell>
              <TableCell>{image.contentType}</TableCell>
              <TableCell>{getfileCapacity(image.size)}</TableCell>
              <TableCell className="text-right">{image.createdBy}</TableCell>
              <TableCell>
                {image.createdAt &&
                  format(
                    new Date(image.createdAt?.toDate()),
                    "yyyy年MM月dd日 hh:mm:ss"
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
