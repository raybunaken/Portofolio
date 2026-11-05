"use client";

import React, { useRef, useState } from "react";
import { Trash2, Upload, Image as ImageIcon, Star, Layers } from "lucide-react";

interface CarouselManagerProps {
  coverImage: string;
  gallery: string[];
  onCoverChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}

export default function CarouselManager({
  coverImage,
  gallery,
  onCoverChange,
  onGalleryChange,
}: CarouselManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [newUrlInput, setNewUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Combine cover and gallery for unified display
  const allImages = [coverImage, ...gallery.filter((g) => g !== coverImage)].filter(Boolean);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const key = localStorage.getItem("admin_key") || "";

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-admin-key": key },
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        if (!coverImage) {
          onCoverChange(uploadedUrls[0]);
          if (uploadedUrls.length > 1) {
            onGalleryChange([...gallery, ...uploadedUrls.slice(1)]);
          }
        } else {
          onGalleryChange([...gallery, ...uploadedUrls]);
        }
      }
    } catch {
      alert("Gagal mengunggah foto");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddUrl = () => {
    if (!newUrlInput.trim()) return;
    const url = newUrlInput.trim();
    if (!coverImage) {
      onCoverChange(url);
    } else if (!gallery.includes(url)) {
      onGalleryChange([...gallery, url]);
    }
    setNewUrlInput("");
    setShowUrlInput(false);
  };

  const handleSetAsCover = (imgUrl: string) => {
    onCoverChange(imgUrl);
    // Remove from gallery if it was there
    onGalleryChange(gallery.filter((g) => g !== imgUrl));
  };

  const handleRemoveImage = (imgUrl: string) => {
    if (coverImage === imgUrl) {
      if (gallery.length > 0) {
        onCoverChange(gallery[0]);
        onGalleryChange(gallery.slice(1));
      } else {
        onCoverChange("");
      }
    } else {
      onGalleryChange(gallery.filter((g) => g !== imgUrl));
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-5 sm:p-6 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-800" />
            <h4 className="text-sm font-bold text-zinc-950">
              Main Sampul & Carousel Gallery ({allImages.length} Slide)
            </h4>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Foto pertama jadi sampul utama. Tambahkan foto lain untuk dijadikan carousel interaktif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? "Mengunggah..." : "+ Upload Foto/Slide"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer"
          >
            + URL Link
          </button>
        </div>
      </div>

      {showUrlInput && (
        <div className="flex items-center gap-2 mb-4 p-2 bg-white rounded-xl border border-zinc-200">
          <input
            type="text"
            value={newUrlInput}
            onChange={(e) => setNewUrlInput(e.target.value)}
            placeholder="Paste URL gambar (https://...)"
            className="flex-1 px-3 py-1.5 text-xs text-zinc-900 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
          >
            Tambah
          </button>
        </div>
      )}

      {/* Grid of Carousel Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-2">
        {allImages.map((img, idx) => {
          const isCover = img === coverImage;
          return (
            <div
              key={idx}
              className={`group relative rounded-xl overflow-hidden aspect-[16/10] bg-zinc-950 border-2 transition-all ${
                isCover
                  ? "border-zinc-950 ring-2 ring-zinc-900/30 shadow-xs"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <img src={img} alt={`slide-${idx}`} className="w-full h-full object-cover" />

              {/* Status pill */}
              <div className="absolute top-2 left-2">
                {isCover ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white bg-zinc-950 shadow-2xs">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    <span>Sampul</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-white bg-black/60 backdrop-blur-sm">
                    Slide {idx + 1}
                  </span>
                )}
              </div>

              {/* Action overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                {!isCover && (
                  <button
                    type="button"
                    onClick={() => handleSetAsCover(img)}
                    className="p-1.5 rounded-md bg-white text-zinc-900 hover:bg-zinc-100 text-[10px] font-bold shadow-xs cursor-pointer"
                    title="Jadikan Sampul Utama"
                  >
                    Set Sampul
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="p-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow-xs cursor-pointer"
                  title="Hapus slide ini"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {allImages.length === 0 && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="col-span-full border-2 border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white/50"
          >
            <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center mb-2">
              <ImageIcon className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-zinc-800">Belum ada foto sampul atau carousel</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Klik di sini untuk upload foto utama & screenshot pendukung
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
