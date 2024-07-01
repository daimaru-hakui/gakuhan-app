"use client";
import { db, storage } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { LuLoader2, LuPlus } from "react-icons/lu";

export default function MediaHeader() {
  const user = useStore((state) => state.user);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    if (!user) return;
    setLoading(true);
    try {
      const mediaRef = collection(db, "media");
      const file = e.target.files[0];
      if (file.size >= 2000000) {
        throw new Error("2MB以下の画像でアップロードしてください");
      }
      const filename = file.name;
      const time = format(new Date(), "yyyyMMddHHmm");
      const imageRef = ref(storage, `images/${user.uid}/${filename}_${time}`);
      const { metadata } = await uploadBytes(imageRef, file);
      const { fullPath, contentType, name, size, timeCreated } = metadata;
      const url = await getDownloadURL(imageRef);

      await addDoc(mediaRef, {
        url,
        path: fullPath,
        fileName: name,
        size,
        contentType,
        createdAt: new Date(timeCreated),
        uid: user.uid,
        createdBy: user.displayName || user.email || "",
      });
    } catch (e) {
      console.log(e);
    } finally {
      inputRef.current = null;
      setLoading(false);
    }
  }

  return (
    <div className="h-[50px] pb-[10px] border-b">
      <label
        htmlFor="file"
        className="w-36 h-8 bg-primary flex gap-3 justify-center items-center cursor-pointer "
      >
        {loading ? (
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin text-muted" />
        ) : (
          <>
            <LuPlus className="text-muted" />
            <span className="text-sm font-semibold text-muted">
              アップロード
            </span>
          </>
        )}
        <input
          type="file"
          hidden
          id="file"
          ref={inputRef}
          onChange={uploadImage}
        />
      </label>
    </div>
  );
}
