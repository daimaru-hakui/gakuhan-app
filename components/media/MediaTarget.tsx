import { Button } from "../ui/button";
import { MediaImage } from "./MediaModal";

interface Props {
  mediaImage: MediaImage,
  handleClickImageSelect: (url: string) => void;
}

export default function MediaTarget({ mediaImage, handleClickImageSelect }: Props) {

  return (
    <div className="space-y-3">
      {mediaImage.id ? (
        <>
          <div className="w-full">
            <img src={mediaImage.url} width={150} height={150} className="w-full object-cover" />
          </div>
          <dl className="grid grid-cols-[80px_1fr] text-sm">
            <dt className="text-sm">作成日時</dt>
            <dd>2024年6月24日</dd>
            <dt className="text-sm">作成者</dt>
            <dd>{mediaImage.createdBy}</dd>
          </dl>
          <Button
            type="button"
            className="w-full"
            onClick={() => handleClickImageSelect(mediaImage.url)}
          >
            この画像を使用する
          </Button>
        </>
      ) : (
        <div className="text-center">
          No Image
        </div>
      )}
    </div>
  );
}