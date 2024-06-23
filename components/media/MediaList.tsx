import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { MediaImage } from "./MediaModal";
import { cn } from "@/lib/utils";

interface Props {
  mediaImage: MediaImage;
  setMediaImage: (image: MediaImage) => void;
}

export default function MediaList(
  { mediaImage, setMediaImage }: Props) {

  const images = [
    {
      id: "1",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: 'name',
      uid: 'uid',
      createdBy: "dd"
    },
    {
      id: "2",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: 'name',
      uid: 'uid',
      createdBy: "iwai"
    },
    {
      id: "3",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: 'name',
      uid: 'uid',
      createdBy: "iwai"
    },
    {
      id: "4",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: 'name',
      uid: 'uid',
      createdBy: "iwai"
    },
    {
      id: "5",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: 'name',
      uid: 'uid',
      createdBy: "nakamoto"
    },
    {
      id: "6",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: 'name',
      uid: 'uid',
      createdBy: "ikeda"
    },
    {
      id: "7",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: '001',
      uid: 'uid',
      createdBy: "iwai"
    },
    {
      id: "8",
      path: "path",
      url: 'https://images.microcms-assets.io/assets/c0b77175218848689cbbc179baf16440/dec771a5d8bd461f94bee51938485b0d/yagi-unilady-2023aw.jpg?w=64&h=64&fit=crop&crop=entropy&auto=format,compress',
      fileName: '002',
      uid: 'uid',
      createdBy: "mukai",
    },
  ];

  function handleClickMedia(image: MediaImage) {
    setMediaImage(image);
  }

  return (
    <div className="overflow-auto max-h-[calc(100vh-400px)]">
      <Table >
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((image) => (
            <TableRow
              key={image.id}
              onClick={() => handleClickMedia(image)}
              className={cn(
                "cursor-pointer",
                image.id === mediaImage.id ? "bg-primary-foreground" : "")
              }
            >
              <TableCell className="font-medium">
                <img src={image.url} width={150} height={150} alt={image.fileName} />
              </TableCell>
              <TableCell>{image.fileName}</TableCell>
              <TableCell>{image.fileName}</TableCell>
              <TableCell className="text-right">{image.uid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}