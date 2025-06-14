import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // 일반적인 이미지 업로더 (기존)
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .middleware(async () => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.uploadedBy);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.uploadedBy };
    }),
    
  // 메뉴 이미지 전용 업로더 (메뉴 이미지는 크기가 클 수 있으므로 16MB까지 허용)
  menuImageUploader: f({ image: { maxFileSize: "16MB" } })
    .middleware(async () => {
      return { uploadedBy: "admin", category: "menu" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Menu image upload complete for:", metadata.uploadedBy);
      console.log("Menu image URL:", file.url);
      return { uploadedBy: metadata.uploadedBy, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;