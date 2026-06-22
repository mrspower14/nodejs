// npm i @nestjs/serve-static@5
// npm i -D @types/multer

import {diskStorage } from 'multer';
import { BadRequestException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { extname } from "path";

export const UPLOAD_DIR = 'uploads';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; //5mb

const ALLOWED_MINE = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const imageUploadOptions = {
    storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, callback) => {
            //파일명을 무작위로
            const unique = randomUUID();
            const ext = extname(file.originalname).toLocaleLowerCase(); 
            callback(null, `${unique}${ext}`);
        }
    }),

    fileFilter: (_req, file, callback) => {
        if (!ALLOWED_MINE.includes(file.mimetype)) {
            callback(new BadRequestException(`이미지 파일만 올릴수 있어요`), false);
            return;
        }
        callback(null, true)
    },
    limit: {fileSize: MAX_FILE_SIZE},
}

